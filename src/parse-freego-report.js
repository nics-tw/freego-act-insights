'use strict'

const fs = require('fs')

/**
 * Parse a Freego HTM scan report into structured per-page results.
 *
 * @param {string} htmPath - Absolute path to the Freego .htm report file
 * @returns {{
 *   pages: Array<{url: string, violations: Array<{code: string, level: string, description: string}>, timedOut: boolean}>,
 *   timedOut: string[]
 * }}
 *
 * Report structure (relevant HTML):
 *   Failures section (《軟體檢測未通過項目》):
 *     <li class="url">N.檢測網址<URL></li>
 *     <ol class="upper-roman">
 *       <li><a href="...">CODE:description</a>(LEVEL)</li>
 *       ...
 *     </ol>
 *   Timeout section (《頁面載入逾時(30秒)》):
 *     <a href="<URL>">...</a><br />
 */
function parseFreegoReport(htmPath) {
  const html = fs.readFileSync(htmPath, 'utf8')
  const pages = []
  const timedOut = []

  // ── Locate section boundaries ──────────────────────────────────────────────
  const FAILURES_START = '《軟體檢測未通過項目》'
  const TIMEOUT_START = '《頁面載入逾時'
  const TIMEOUT_END = '《ME1320200C'

  const failuresIdx = html.indexOf(FAILURES_START)
  const timeoutIdx = html.indexOf(TIMEOUT_START)
  const timeoutEndIdx = html.indexOf(TIMEOUT_END)

  // ── Parse failures section ─────────────────────────────────────────────────
  if (failuresIdx !== -1) {
    const failuresEnd = timeoutIdx !== -1 ? timeoutIdx : html.length
    const failuresHtml = html.slice(failuresIdx, failuresEnd)

    // Split on each URL entry — each starts with <li class="url">
    const urlBlockPattern =
      /<li class="url">[^<]*?(?:檢測網址)?(https?:\/\/[^<]+)<\/li>([\s\S]*?)(?=<li class="url">|$)/g

    let match
    while ((match = urlBlockPattern.exec(failuresHtml)) !== null) {
      const url = match[1].trim()
      const block = match[2]
      const violations = []

      // Each violation: <a href="...">CODE:description</a>(LEVEL)
      // Detection code format: 2 letters + 7 digits + 1 letter (e.g. HM1130104C)
      const violationPattern =
        />\s*([A-Z]{2}\d+[A-Z]):([^<]*)<\/a>\(([A-Z]+)\)/g
      let vm
      while ((vm = violationPattern.exec(block)) !== null) {
        violations.push({
          code: vm[1],
          description: vm[2].trim(),
          level: vm[3]
        })
      }

      pages.push({ url, violations, timedOut: false })
    }
  }

  // ── Parse timeout section ──────────────────────────────────────────────────
  if (timeoutIdx !== -1) {
    const end = timeoutEndIdx !== -1 ? timeoutEndIdx : html.length
    const timeoutHtml = html.slice(timeoutIdx, end)
    const timeoutPattern = /<a href="(https?:\/\/[^"]+)"/g
    let tm
    while ((tm = timeoutPattern.exec(timeoutHtml)) !== null) {
      timedOut.push(tm[1])
    }
  }

  return { pages, timedOut }
}

module.exports = parseFreegoReport
