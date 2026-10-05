'use strict'

const { summarizeTestcaseScenario } = require('../summarize-testcase-scenario')

describe('summarizeTestcaseScenario', () => {
  test('summarizes a unique document title', () => {
    const scenario = summarizeTestcaseScenario({
      ruleId: '2779a5',
      html: '<html><head><title>Example page</title></head></html>'
    })

    expect(scenario).toBe('文件包含標題「Example page」。')
  })

  test('summarizes the ARIA attributes of a unique role element', () => {
    const scenario = summarizeTestcaseScenario({
      ruleId: '5f99a7',
      html: '<div role="checkbox" aria-not-checked="true">Option</div>'
    })

    expect(scenario).toContain('role="checkbox"')
    expect(scenario).toContain('aria-not-checked="true"')
  })

  test('omits a summary when multiple candidates are present', () => {
    const scenario = summarizeTestcaseScenario({
      ruleId: '674b10',
      html: '<span role="lnik">One</span><span role="button">Two</span>'
    })

    expect(scenario).toBeNull()
  })

  test('omits a summary for unsupported rules', () => {
    const scenario = summarizeTestcaseScenario({
      ruleId: 'unsupported',
      html: '<main>Ambiguous content</main>'
    })

    expect(scenario).toBeNull()
  })
})
