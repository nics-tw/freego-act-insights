'use strict'

const { generateFreegoMarkdown } = require('../freego-report-to-markdown')

const testcaseUrl =
  'https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/abc123/example.html'

function assertion(code, outcome, requirements = []) {
  return {
    subject: { source: testcaseUrl },
    test: {
      title: code,
      isPartOf: requirements.map(title => ({ title }))
    },
    result: { outcome: `earl:${outcome}` }
  }
}

function testcase(expected = 'failed') {
  return {
    ruleId: 'abc123',
    ruleName: 'Fixture rule',
    rulePage: 'https://example.com/rule',
    ruleAccessibilityRequirements: {
      'wcag20:1.1.1': { forConformance: true }
    },
    expected,
    testcaseId: 'example',
    testcaseTitle: 'Failed Example 1',
    url: testcaseUrl,
    approved: true
  }
}

function report(assertedThat) {
  return {
    name: 'Freego',
    homepage: 'https://example.com',
    release: { revision: 'Test Version', created: '2026-09-15' },
    assertedThat
  }
}

describe('generateFreegoMarkdown', () => {
  test('renders a consistent rule and its testcase details', () => {
    const markdown = generateFreegoMarkdown({
      report: report([assertion('HM1', 'failed', ['WCAG2, SC 1.1.1'])]),
      testCases: [testcase()]
    })

    expect(markdown).toContain('# Freego Test Version — ACT Rules 實作報告')
    expect(markdown).toContain('| 開發語言 | Java |')
    expect(markdown).toContain('| 完全一致規則數 | 1 |')
    expect(markdown).toContain('Failed Example 1](https://www.w3.org')
    expect(markdown).toContain('| failed | failed | ✅ |')
  })

  test('marks a rule partial when one mapped detection code misses a failure', () => {
    const markdown = generateFreegoMarkdown({
      report: report([
        assertion('HM1', 'failed', ['WCAG2, SC 1.1.1']),
        assertion('HM2', 'passed')
      ]),
      testCases: [testcase()]
    })

    expect(markdown).toContain('| 部分一致規則數 | 1 |')
    expect(markdown).toContain('`HM1`, `HM2`')
    expect(markdown).toContain('| failed | failed | passed | ❌ |')
  })

  test('marks a rule partial when a required success criterion is not reported', () => {
    const markdown = generateFreegoMarkdown({
      report: report([assertion('HM1', 'failed')]),
      testCases: [testcase()]
    })

    expect(markdown).toContain('| 部分一致規則數 | 1 |')
    expect(markdown).toContain('Expected: 1.1.1 → Reported: **None**')
  })

  test('rejects assertions without matching testcase metadata', () => {
    expect(() =>
      generateFreegoMarkdown({
        report: report([assertion('HM1', 'passed')]),
        testCases: []
      })
    ).toThrow('No ACT testcase metadata found')
  })
})
