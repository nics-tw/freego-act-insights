'use strict'

const { localUrl } = require('./serve-test-cases')

const FREEGO_HOMEPAGE =
  'https://accessibility.moda.gov.tw/Download/Category/70/1'
const FREEGO_REVISION = 'Dec 19 2025'

/**
 * Mapping of Taiwan MODA detection codes to WCAG 2.1 success criteria.
 * Used to populate test.isPartOf in EARL assertions.
 */
const DETECTION_CODE_WCAG_MAP = {
  HM1110100C: ['WCAG2, SC 1.1.1'],
  HM1110101C: ['WCAG2, SC 1.1.1'],
  HM1110104C: ['WCAG2, SC 1.1.1'],
  HM1110105C: ['WCAG2, SC 1.1.1'],
  HM1110106C: ['WCAG2, SC 1.1.1'],
  HM1130101C: ['WCAG2, SC 1.3.1'],
  HM1130104C: ['WCAG2, SC 1.3.1', 'WCAG2, SC 4.1.2'],
  HM1240200C: ['WCAG2, SC 2.4.2'],
  HM1240400C: ['WCAG2, SC 2.4.4'],
  HM1240401C: ['WCAG2, SC 2.4.4'],
  HM1310100C: ['WCAG2, SC 3.1.1'],
  HM1410200C: ['WCAG2, SC 4.1.2'],
  HM1410201C: ['WCAG2, SC 4.1.2'],
  HM2310200C: ['WCAG2, SC 3.1.2'],
  HM3240900C: ['WCAG2, SC 2.4.9'],
  HM3241000C: ['WCAG2, SC 2.4.10'],
  HM3330500C: ['WCAG2, SC 3.3.5']
}

/**
 * Consistency categories (matching PDIS Freego-Implementation-Report terminology)
 */
const CONSISTENCY = {
  CONSISTENT: 'consistent',
  INCONSISTENT_FP: 'inconsistent-FP', // false positive: Freego flags violation where ACT expects pass/inapplicable
  INCONSISTENT_INVALID: 'inconsistent-invalid', // Freego misses violation where ACT expects fail
  NOT_IMPLEMENTED: 'not-implemented'
}

/**
 * Determine the consistency category for a single (testCase, detectionCode) pair.
 *
 * @param {string} actExpected - ACT expected outcome: 'passed' | 'failed' | 'inapplicable'
 * @param {boolean} freegoFlagged - Whether Freego flagged this detection code on this page
 * @returns {string} CONSISTENCY value
 */
function classifyConsistency(actExpected, freegoFlagged) {
  if (actExpected === 'passed' || actExpected === 'inapplicable') {
    return freegoFlagged ? CONSISTENCY.INCONSISTENT_FP : CONSISTENCY.CONSISTENT
  }
  if (actExpected === 'failed') {
    return freegoFlagged
      ? CONSISTENCY.CONSISTENT
      : CONSISTENCY.INCONSISTENT_INVALID
  }
  return CONSISTENCY.CONSISTENT
}

/**
 * Generate a Freego implementation report in ACT Implementation Generator format.
 *
 * @param {Object} opts
 * @param {Array<{url: string, violations: Array<{code: string, level: string}>, timedOut: boolean}>} opts.freegoPages
 *   Parsed Freego report pages (from parse-freego-report.js)
 * @param {string[]} opts.timedOut
 *   URLs that timed out during Freego scan
 * @param {Array<{url: string, ruleId: string, expected: string}>} opts.testCases
 *   ACT test cases (from load-test-cases.js)
 * @param {Object} opts.rulesMap
 *   ACT Rule ID → detection codes mapping
 * @param {string} [opts.baseUrl='http://127.0.0.1:5500']
 *   Base URL used when Freego scanned (to reconstruct local URLs)
 * @param {string} [opts.freegoRevision]
 *   Freego version string (default: 'Dec 19 2025')
 * @returns {{ report: Object, summary: Object, consistencyDetails: Array }}
 */
function generateImplementationReport(opts) {
  const {
    freegoPages,
    timedOut = [],
    testCases,
    rulesMap,
    baseUrl = 'http://127.0.0.1:5500',
    freegoRevision = FREEGO_REVISION
  } = opts

  // Build lookup: local URL → Set of detection codes that Freego flagged
  const flaggedCodes = new Map() // localUrl → Set<code>
  for (const page of freegoPages) {
    const codes = new Set(page.violations.map(v => v.code))
    flaggedCodes.set(page.url, codes)
  }
  const timedOutSet = new Set(timedOut)

  // Summary counters
  const summary = {
    consistent: 0,
    inconsistentFP: 0,
    inconsistentInvalid: 0,
    notImplemented: 0,
    timedOut: 0,
    total: 0
  }

  const assertions = []
  const consistencyDetails = []

  for (const tc of testCases) {
    const detectionCodes = rulesMap[tc.ruleId]

    // Rule not in rulesMap (shouldn't happen since testCases is already filtered, but guard anyway)
    if (!detectionCodes || detectionCodes.length === 0) {
      summary.notImplemented++
      summary.total++
      continue
    }

    const tcLocalUrl = localUrl(tc.url, baseUrl)

    // Handle timed-out pages
    if (timedOutSet.has(tcLocalUrl)) {
      summary.timedOut++
      summary.total++
      continue
    }

    const pageFlaggedCodes = flaggedCodes.get(tcLocalUrl) || new Set()

    // Create one assertion per detection code mapped to this ACT rule
    for (const code of detectionCodes) {
      const freegoFlagged = pageFlaggedCodes.has(code)
      const outcome = freegoFlagged ? 'earl:failed' : 'earl:passed'
      const consistency = classifyConsistency(tc.expected, freegoFlagged)

      // EARL-compliant assertion (matches PDIS freego.json schema exactly)
      assertions.push({
        '@type': 'Assertion',
        subject: {
          '@type': 'TestSubject',
          source: tc.url
        },
        test: {
          '@type': 'TestCase',
          title: code,
          isPartOf: (DETECTION_CODE_WCAG_MAP[code] || []).map(title => ({
            '@type': 'TestRequirement',
            title
          }))
        },
        result: {
          '@type': 'TestResult',
          outcome
        }
      })

      // Consistency analysis kept separate (not in EARL output)
      consistencyDetails.push({
        url: tc.url,
        ruleId: tc.ruleId,
        code,
        actExpected: tc.expected,
        freegoOutcome: outcome,
        consistency
      })

      // Update summary
      summary.total++
      if (consistency === CONSISTENCY.CONSISTENT) summary.consistent++
      else if (consistency === CONSISTENCY.INCONSISTENT_FP)
        summary.inconsistentFP++
      else if (consistency === CONSISTENCY.INCONSISTENT_INVALID)
        summary.inconsistentInvalid++
      else if (consistency === CONSISTENCY.NOT_IMPLEMENTED)
        summary.notImplemented++
    }
  }

  const report = {
    '@context': 'https://act-rules.github.io/earl-context.json',
    '@type': ['Assertor', 'Project'],
    name: 'Freego',
    shortdesc:
      'The official automated test tool released and used by Ministry of Digital Affairs, Taiwan.',
    description: `The automated test tool Freego is part of the Web Accessibility Accreditation methodology by Taiwan government. Its latest version, ${freegoRevision}, is derived from WCAG 2.1 Level A, AA, and AAA.`,
    homepage: FREEGO_HOMEPAGE,
    release: {
      '@type': 'Version',
      created: new Date().toISOString().split('T')[0],
      revision: freegoRevision
    },
    assertedThat: assertions
  }

  return { report, summary, consistencyDetails }
}

module.exports = {
  generateImplementationReport,
  CONSISTENCY,
  DETECTION_CODE_WCAG_MAP
}
