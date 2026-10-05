'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

const DEFAULT_PORT = 5500
const DEFAULT_HOST = '127.0.0.1'

/**
 * Download ACT test case HTML files to a local directory, mirroring the
 * remote path structure: <ruleId>/<filename>.html
 *
 * @param {Array<{url: string, ruleId: string}>} testCases
 * @param {string} serveDir - Local directory to save files into
 */
async function downloadTestCases(testCases, serveDir) {
  if (!fs.existsSync(serveDir)) {
    fs.mkdirSync(serveDir, { recursive: true })
  }

  // Group by ruleId to create rule directories
  const byRule = {}
  for (const tc of testCases) {
    if (!byRule[tc.ruleId]) byRule[tc.ruleId] = []
    byRule[tc.ruleId].push(tc)
  }

  let downloaded = 0
  const total = testCases.length

  for (const [ruleId, cases] of Object.entries(byRule)) {
    const ruleDir = path.join(serveDir, ruleId)
    if (!fs.existsSync(ruleDir)) {
      fs.mkdirSync(ruleDir, { recursive: true })
    }

    for (const tc of cases) {
      // Extract filename from URL
      const filename = tc.url.split('/').pop()
      const localPath = path.join(ruleDir, filename)

      // Skip if already downloaded
      if (fs.existsSync(localPath)) {
        downloaded++
        continue
      }

      try {
        const response = await axios.get(tc.url, {
          responseType: 'text',
          timeout: 15000
        })
        fs.writeFileSync(localPath, response.data, 'utf8')
        downloaded++
        if (downloaded % 50 === 0) {
          process.stdout.write(`\rDownloaded ${downloaded}/${total}`)
        }
      } catch (err) {
        console.warn(`\nWarning: failed to download ${tc.url} — ${err.message}`)
      }
    }
  }

  process.stdout.write(`\rDownloaded ${downloaded}/${total}\n`)
}

/**
 * Build a URL-to-local-path index for all downloaded test case files.
 * Maps URL path (e.g. /ruleId/file.html) → absolute local file path.
 *
 * @param {string} serveDir
 * @returns {Map<string, string>}
 */
function buildFileIndex(serveDir) {
  const index = new Map()
  if (!fs.existsSync(serveDir)) return index

  for (const ruleId of fs.readdirSync(serveDir)) {
    const ruleDir = path.join(serveDir, ruleId)
    if (!fs.statSync(ruleDir).isDirectory()) continue

    for (const filename of fs.readdirSync(ruleDir)) {
      const urlPath = `/${ruleId}/${filename}`
      index.set(urlPath, path.join(ruleDir, filename))
    }
  }
  return index
}

/**
 * Generate an HTML directory listing page with links to sub-paths.
 *
 * @param {string} urlPath - URL path of the directory (e.g. "/" or "/ruleId")
 * @param {string[]} entries - Names of entries in this directory
 * @returns {string} HTML page
 */
function directoryListing(urlPath, entries) {
  const base = urlPath.endsWith('/') ? urlPath : urlPath + '/'
  const items = entries
    .map(e => `<li><a href="${base}${e}">${e}</a></li>`)
    .join('\n')
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Index of ${urlPath}</title></head>
<body><h1>Index of ${urlPath}</h1><ul>\n${items}\n</ul></body></html>`
}

/**
 * Start a local HTTP file server for downloaded ACT test case files.
 * Serves files from serveDir with auto-generated directory listings so
 * Freego's crawler can discover all test case pages.
 *
 * @param {string} serveDir - Directory containing downloaded test case files
 * @param {{ port?: number, host?: string }} [opts]
 * @returns {Promise<{ server: http.Server, baseUrl: string, stop: () => void }>}
 */
function startServer(serveDir, opts = {}) {
  const port = opts.port ?? DEFAULT_PORT
  const host = opts.host || DEFAULT_HOST
  const fileIndex = buildFileIndex(serveDir)

  const server = http.createServer((req, res) => {
    // Strip query string
    const urlPath = req.url.split('?')[0]

    // Serve individual test case file
    if (fileIndex.has(urlPath)) {
      const localPath = fileIndex.get(urlPath)
      const content = fs.readFileSync(localPath, 'utf8')
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(content)
      return
    }

    // Directory: root listing
    if (urlPath === '/' || urlPath === '') {
      const ruleDirs = fs.existsSync(serveDir)
        ? fs
            .readdirSync(serveDir)
            .filter(e => fs.statSync(path.join(serveDir, e)).isDirectory())
        : []
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(directoryListing('/', ruleDirs))
      return
    }

    // Directory: rule-level listing (e.g. /047fe0 or /047fe0/)
    const ruleId = urlPath.replace(/^\//, '').replace(/\/$/, '')
    const ruleDir = path.join(serveDir, ruleId)
    if (fs.existsSync(ruleDir) && fs.statSync(ruleDir).isDirectory()) {
      const files = fs.readdirSync(ruleDir)
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(directoryListing('/' + ruleId, files))
      return
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not found')
  })

  return new Promise((resolve, reject) => {
    server.listen(port, host, () => {
      const baseUrl = `http://${host}:${server.address().port}`
      console.log(`Server listening at ${baseUrl}`)
      resolve({
        server,
        baseUrl,
        stop: () => server.close()
      })
    })
    server.on('error', reject)
  })
}

/**
 * Construct the local URL for an ACT test case given its remote URL and the server baseUrl.
 *
 * @param {string} remoteUrl - e.g. https://act-rules.github.io/testcases/047fe0/abc.html
 * @param {string} baseUrl - e.g. http://127.0.0.1:5500
 * @returns {string} e.g. http://127.0.0.1:5500/047fe0/abc.html
 */
function localUrl(remoteUrl, baseUrl) {
  // Extract path after /testcases/
  const match = remoteUrl.match(/\/testcases\/(.+)$/)
  if (match) return `${baseUrl}/${match[1]}`
  // Fallback: use last two path segments
  const parts = remoteUrl.split('/')
  return `${baseUrl}/${parts.slice(-2).join('/')}`
}

module.exports = { downloadTestCases, startServer, localUrl }
