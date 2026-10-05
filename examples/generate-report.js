'use strict'

/**
 * examples/generate-report.js
 *
 * Generate a Freego implementation report in ACT Implementation Generator format.
 *
 * Prerequisites:
 *   1. ACT test case pages have been downloaded and served locally (see --serve mode)
 *   2. Freego 全部檢測 has been run against http://127.0.0.1:5500/ to produce an HTM report
 *
 * Usage:
 *   # Download test cases and start local server (then run Freego manually):
 *   node examples/generate-report.js --serve [--dir <dir>] [--port <port>]
 *
 *   # Generate EARL report from a Freego HTM report:
 *   node examples/generate-report.js --htm <path/to/report.htm> [--out <output.json>] [--base-url <url>]
 *
 * Options:
 *   --serve                Download test cases and start local server for Freego to scan
 *   --htm <path>           Path to the Freego HTM report file
 *   --out <path>           Output path for the EARL JSON report (default: reports/freego.json)
 *   --dir <path>           Local directory for downloaded test case files (default: examples/testcases)
 *   --port <number>        Port for the local server (default: 5500)
 *   --base-url <url>       Base URL used during Freego scan (default: http://127.0.0.1:5500)
 *   --testcases-json <path> Path to a custom ACT testcases JSON file (overrides snapshot and live API)
 */

const path = require('path')
const fs = require('fs')
const loadTestCases = require('../src/load-test-cases')
const parseFreegoReport = require('../src/parse-freego-report')
const {
  generateImplementationReport
} = require('../src/generate-implementation-report')
const { downloadTestCases, startServer } = require('../src/serve-test-cases')
const rulesMap = require('../rulesMap')

const TESTCASES_DIR = path.join(__dirname, 'testcases')
const RESULTS_DIR = path.join(__dirname, '..', 'reports')

// ── CLI arg parsing ─────────────────────────────────────────────────────────
function parseArgs(argv) {
  const args = {}
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--serve') args.serve = true
    else if (argv[i] === '--htm') args.htm = argv[++i]
    else if (argv[i] === '--out') args.out = argv[++i]
    else if (argv[i] === '--dir') args.dir = argv[++i]
    else if (argv[i] === '--port') args.port = parseInt(argv[++i], 10)
    else if (argv[i] === '--base-url') args.baseUrl = argv[++i]
    else if (argv[i] === '--testcases-json') args.testcasesJson = argv[++i]
  }
  return args
}

// ── Shared: load ACT test cases filtered by rulesMap ───────────────────────
// Priority: --testcases-json > snapshot from --serve > live API
// Using the snapshot ensures URL hash consistency with the Freego scan.
async function loadFilteredTestCases(serveDir, testcasesJsonPath) {
  // 1. Explicit --testcases-json path
  if (testcasesJsonPath) {
    const resolved = path.resolve(testcasesJsonPath)
    console.log(`  Using testcases JSON: ${resolved}`)
    const raw = JSON.parse(fs.readFileSync(resolved, 'utf8'))
    const allCases = raw.testcases || raw
    return allCases.filter(
      tc => rulesMap[tc.ruleId] && rulesMap[tc.ruleId].length > 0
    )
  }

  // 2. Snapshot saved by --serve
  const snapshotPath = path.join(
    serveDir || TESTCASES_DIR,
    'testcases-snapshot.json'
  )
  if (fs.existsSync(snapshotPath)) {
    console.log(`  Using snapshot: ${snapshotPath}`)
    return JSON.parse(fs.readFileSync(snapshotPath, 'utf8'))
  }

  // 3. Live ACT API
  const config = {
    TESTCASES_JSON:
      'https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases.json',
    TESTCASES_KEY: 'testcases'
  }
  return loadTestCases({
    config,
    rulesMap,
    skipTests: {
      ruleIds: [],
      testCases: [],
      fileExtensions: ['xhtml', 'xml', 'svg', 'js']
    },
    runOnly: []
  })
}

// ── Mode: --serve ─────────────────────────────────────────────────────────
async function serveMode(args) {
  const serveDir = args.dir || TESTCASES_DIR
  const port = args.port || 5500

  console.log('Loading ACT test cases...')
  const testCases = await loadFilteredTestCases() // serve mode always fetches live
  console.log(
    `Found ${testCases.length} test cases across ${Object.keys(rulesMap).length} rules`
  )

  // Save snapshot for use by --htm mode (ensures URL hash consistency)
  const snapshotPath = path.join(serveDir, 'testcases-snapshot.json')
  fs.mkdirSync(serveDir, { recursive: true })
  fs.writeFileSync(snapshotPath, JSON.stringify(testCases, null, 2), 'utf8')
  console.log(`Saved test case snapshot: ${snapshotPath}`)

  console.log(`Downloading test case files to ${serveDir} ...`)
  await downloadTestCases(testCases, serveDir)

  const { baseUrl } = await startServer(serveDir, { port })
  console.log(`\nReady. Point Freego at: ${baseUrl}`)
  console.log('Run Freego 全部檢測, save the HTM report, then run:')
  console.log(`  node examples/generate-report.js --htm <report.htm>`)
  console.log('\nPress Ctrl+C to stop the server.')

  // Keep process alive until Ctrl+C
  process.on('SIGINT', () => {
    console.log('\nServer stopped.')
    process.exit(0)
  })
}

// ── Mode: --htm (generate report) ─────────────────────────────────────────
async function generateMode(args) {
  if (!args.htm) {
    console.error('Error: --htm <path> is required')
    process.exit(1)
  }

  const htmPath = path.resolve(args.htm)
  if (!fs.existsSync(htmPath)) {
    console.error(`Error: HTM file not found: ${htmPath}`)
    process.exit(1)
  }

  const outputPath = args.out
    ? path.resolve(args.out)
    : path.join(RESULTS_DIR, 'freego.json')

  const baseUrl = args.baseUrl || 'http://127.0.0.1:5500'

  // 1. Parse Freego HTM report
  console.log(`Parsing Freego report: ${htmPath}`)
  const { pages, timedOut } = parseFreegoReport(htmPath)
  console.log(`  Pages with violations: ${pages.length}`)
  console.log(`  Pages timed out: ${timedOut.length}`)

  // 2. Load ACT test cases (prefer snapshot from --serve for URL consistency)
  const serveDir = args.dir || TESTCASES_DIR
  console.log('Loading ACT test cases...')
  const testCases = await loadFilteredTestCases(serveDir, args.testcasesJson)
  console.log(`  Test cases: ${testCases.length}`)

  // 3. Generate EARL report
  console.log('Generating implementation report...')
  const { report, summary, consistencyDetails } = generateImplementationReport({
    freegoPages: pages,
    timedOut,
    testCases,
    rulesMap,
    baseUrl
  })

  // 4. Write outputs
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })

  // EARL-compliant report for ACT Implementation Generator
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf8')

  // Separate consistency analysis (not in EARL schema)
  const consistencyPath = outputPath.replace(/\.json$/, '-consistency.json')
  fs.writeFileSync(
    consistencyPath,
    JSON.stringify({ summary, details: consistencyDetails }, null, 2),
    'utf8'
  )

  console.log(`\nEARL report:         ${outputPath}`)
  console.log(`Consistency report:  ${consistencyPath}`)
  console.log(`Assertions: ${report.assertedThat.length}`)
  console.log('\nConsistency summary:')
  console.log(`  Consistent:           ${summary.consistent}`)
  console.log(`  Inconsistent (FP):    ${summary.inconsistentFP}`)
  console.log(`  Inconsistent (miss):  ${summary.inconsistentInvalid}`)
  console.log(`  Not implemented:      ${summary.notImplemented}`)
  console.log(`  Timed out (skipped):  ${summary.timedOut}`)
  console.log(`  Total:                ${summary.total}`)
}

// ── Entry point ─────────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs(process.argv)

  if (args.serve) {
    await serveMode(args)
  } else if (args.htm) {
    await generateMode(args)
  } else {
    console.log('Usage:')
    console.log(
      '  node examples/generate-report.js --serve [--dir <dir>] [--port <port>]'
    )
    console.log(
      '  node examples/generate-report.js --htm <report.htm> [--out <output.json>] [--base-url <url>] [--testcases-json <path>]'
    )
    process.exit(0)
  }
}

main().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
