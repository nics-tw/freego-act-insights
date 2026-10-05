/**
 * examples/to-earl.js
 *
 * 將 testRunner 回傳的結果陣列轉換為 EARL 1.0 JSON-LD 格式。
 *
 * @see https://www.w3.org/TR/EARL10-Schema/
 *
 * @param {Array} results - testRunner 回傳的結果陣列，每項由 evaluate.js 產生
 * @returns {Array} EARL JSON-LD Assertion 陣列
 */
'use strict'

const ACT_RULES_BASE = 'https://act-rules.github.io/rules/'
const DETECTION_CODE_BASE =
  'https://accessibility.moda.gov.tw/Accessible/Guide/68#'

/**
 * 將單一測試結果轉為一組 EARL Assertion（可能對應多個國內檢測碼）
 * @param {Object} result - evaluate.js 回傳的單筆結果
 * @returns {Array} EARL Assertion 陣列
 */
function resultToAssertions(result) {
  const { testcase, detectionCodes, outcome, axeResults } = result

  const info =
    axeResults && axeResults.violations.length
      ? axeResults.violations.map(v => `[${v.id}] ${v.description}`).join('; ')
      : ''

  // 基底 Assertion（以 ACT Rule 為測試主體）
  const baseAssertion = {
    '@context': ['http://www.w3.org/ns/earl#', 'http://www.w3.org/ns/prov#'],
    '@type': 'earl:Assertion',
    'earl:subject': {
      '@type': 'earl:TestSubject',
      '@id': testcase.url
    },
    'earl:test': {
      '@type': 'earl:TestCase',
      '@id': `${ACT_RULES_BASE}${testcase.ruleId}`,
      'dc:title': testcase.ruleId
    },
    'earl:result': {
      '@type': 'earl:TestResult',
      'earl:outcome': { '@id': outcome },
      'earl:info': info,
      'earl:pointer': testcase.url
    },
    'earl:assertedBy': {
      '@type': 'earl:Software',
      'doap:name': 'axe-core',
      'doap:homepage': 'https://github.com/dequelabs/axe-core'
    },
    'earl:mode': { '@id': 'earl:automatic' },
    // 對應的國內檢測碼
    detectionCodes: detectionCodes,
    // 對應的國內檢測碼 URI
    detectionCodeRefs: detectionCodes.map(
      code => `${DETECTION_CODE_BASE}${code}`
    ),
    // ACT testcase 預期結果（passed / failed / inapplicable）
    actExpected: testcase.expected || null
  }

  return [baseAssertion]
}

/**
 * 將所有測試結果轉為 EARL JSON-LD 文件
 * @param {Array} results
 * @returns {Object} EARL JSON-LD 文件
 */
function toEarl(results) {
  const assertions = results.flatMap(resultToAssertions)

  return {
    '@context': [
      'http://www.w3.org/ns/earl#',
      { dc: 'http://purl.org/dc/terms/', doap: 'http://usefulinc.com/ns/doap#' }
    ],
    '@graph': assertions
  }
}

module.exports = toEarl
