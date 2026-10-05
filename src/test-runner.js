const pkg = require('../package.json')
const puppeteer = require('puppeteer')
const loadTestCases = require('./load-test-cases')
const executeTestCase = require('./execute-test-case')

/**
 * Asynchronously executes ACT test cases against a given test tool and returns the results.
 * @param {Object} options ACT test execution options
 */
async function testRunner(options) {
  console.log('TestRunner: Start.')

  const { debug = false, globals, skipTests, runOnly } = options

  if (!globals) {
    throw new Error(
      'TestRunner: No `globals` object defined via configuration.'
    )
  }

  const { rulesMap = undefined } = globals
  if (!rulesMap) {
    throw new Error(
      'TestRunner: No `rulesMap` object defined in `globals` via configuration.'
    )
  }

  const rulesMappedIds = Object.keys(rulesMap)
  if (!rulesMappedIds || !rulesMappedIds.length) {
    throw new Error(
      'TestRunner: `rulesMap` does not contain `act-r` rule id(s).'
    )
  }

  const testcases = await loadTestCases({
    config: pkg.config,
    rulesMap,
    skipTests,
    runOnly
  })
  if (!testcases || !testcases.length) {
    throw new Error(
      'TestRunner: No test cases are defined. Ensure test cases are supplied.'
    )
  }

  const browser = await puppeteer.launch({
    ...(debug && { headless: false, slowMo: 500, devtools: true })
  })
  try {
    const results = []
    for (const [index, testcase] of testcases.entries()) {
      console.log(
        `Executing Testcase: ${index + 1} of ${testcases.length} \n Testcase URL: ${testcase.url} \n`
      )
      results.push(await executeTestCase({ browser, testcase, options }))
    }
    console.log('TestRunner: End.')
    return results
  } finally {
    await browser.close()
  }
}

module.exports = testRunner
