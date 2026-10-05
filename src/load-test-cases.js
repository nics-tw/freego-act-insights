const axios = require('axios')

/**
 * Load test cases to execute
 * @param {Object} options options to load testcases
 * @property {Object} options.config configuration object passed to testrunner
 * @property {Object} options.rulesMap mapping of ACT testcase Ids to Test tool Ids
 * @property {Object} options.skipTests list of testcases to skip from the ACT testcases
 * @property {Array} options.runOnly only run these rules
 */
async function loadTestCases({ config, rulesMap, skipTests = {}, runOnly }) {
  const {
    ruleIds: skipRuleIds = [],
    testCases: skipTestCases = [],
    fileExtensions: skipExtensions = []
  } = skipTests

  const response = await axios.get(config.TESTCASES_JSON)
  const testCases = response.data[config.TESTCASES_KEY]

  return testCases.filter(({ url, ruleId }) => {
    const filename = url.split('/').pop()
    const extension = filename.split('.').pop()
    return (
      (!runOnly || !runOnly.length || runOnly.includes(filename)) &&
      Object.hasOwn(rulesMap, ruleId) &&
      rulesMap[ruleId].length > 0 &&
      !skipRuleIds.includes(ruleId) &&
      !skipTestCases.includes(filename) &&
      !skipExtensions.includes(extension)
    )
  })
}

module.exports = loadTestCases
