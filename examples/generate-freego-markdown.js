'use strict'

const fs = require('fs')
const path = require('path')
const { generateFreegoMarkdown } = require('../src/freego-report-to-markdown')

const DEFAULT_REPORT = path.join(__dirname, '..', 'reports', 'freego.json')
const DEFAULT_TESTCASES = path.join(
  __dirname,
  'testcases',
  'testcases-snapshot.json'
)

function parseArgs(argv) {
  const args = {}
  for (let index = 2; index < argv.length; index++) {
    if (argv[index] === '--input') args.input = argv[++index]
    else if (argv[index] === '--testcases-json')
      args.testcasesJson = argv[++index]
    else if (argv[index] === '--out') args.out = argv[++index]
    else throw new Error(`Unknown argument: ${argv[index]}`)
  }
  return args
}

function readJson(filePath, label) {
  const resolved = path.resolve(filePath)
  if (!fs.existsSync(resolved))
    throw new Error(`${label} not found: ${resolved}`)
  return { resolved, value: JSON.parse(fs.readFileSync(resolved, 'utf8')) }
}

function outputPathFor(report) {
  const revision =
    report.release && report.release.revision
      ? report.release.revision
      : 'unknown-version'
  const slug = revision
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return path.join(__dirname, '..', 'tools-act-report', `freego-${slug}.md`)
}

function main() {
  const args = parseArgs(process.argv)
  const input = readJson(args.input || DEFAULT_REPORT, 'FreeGo report')
  const testcases = readJson(
    args.testcasesJson || DEFAULT_TESTCASES,
    'ACT testcases JSON'
  )
  const testCases = testcases.value.testcases || testcases.value
  const output = path.resolve(args.out || outputPathFor(input.value))
  const sourcePath = path
    .relative(path.dirname(output), input.resolved)
    .split(path.sep)
    .join('/')
  const markdown = generateFreegoMarkdown({
    report: input.value,
    testCases,
    sourcePath
  })

  fs.mkdirSync(path.dirname(output), { recursive: true })
  fs.writeFileSync(output, markdown, 'utf8')
  console.log(`FreeGo ACT implementation report: ${output}`)
}

try {
  main()
} catch (error) {
  console.error(`Error: ${error.message}`)
  process.exit(1)
}
