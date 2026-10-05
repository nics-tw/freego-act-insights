const { countRuleTestcases } = require('../count-rule-testcases')
const { buildRuleMatrix } = require('../build-rule-matrix')
const catalog = require('../../docs/act-rule-catalog.json')
const snapshot = require('../../docs/act-testcase-counts.json')

test('counts unique testcase IDs per rule across all outcomes and file types', () => {
  expect(
    countRuleTestcases([
      { ruleId: 'a', testcaseId: 'one', expected: 'passed', url: 'x.html' },
      { ruleId: 'a', testcaseId: 'one', expected: 'passed', url: 'x.html' },
      { ruleId: 'a', testcaseId: 'two', expected: 'failed', url: 'x.svg' },
      {
        ruleId: 'a',
        testcaseId: 'three',
        expected: 'inapplicable',
        url: 'x.xhtml'
      },
      { ruleId: 'b', testcaseId: 'one' }
    ])
  ).toEqual({ a: 3, b: 1 })
})

test('rejects empty or malformed data instead of saving a misleading snapshot', () => {
  expect(() => countRuleTestcases([])).toThrow()
  expect(() => countRuleTestcases({})).toThrow()
  expect(() => countRuleTestcases([{ ruleId: 'a' }])).toThrow()
})

const matrix = testcaseCounts =>
  buildRuleMatrix({
    catalog,
    toolRules: Array.from({ length: 10 }, () => new Map()),
    names: new Map(),
    links: new Map(),
    namesZh: {},
    testcaseCounts
  })

test('bundled snapshot covers all active rules even if no tool reports them', () => {
  const rows = matrix(snapshot.counts)
  expect(rows).toHaveLength(87)
  expect(
    rows.every(
      row => Number.isInteger(row.testcaseCount) && row.testcaseCount > 0
    )
  ).toBe(true)
  expect(rows.reduce((sum, row) => sum + row.testcaseCount, 0)).toBe(
    snapshot.total
  )
})

test('missing counts stay unknown and explicit zero stays zero', () => {
  const id = catalog.rules.find(rule => rule.status === 'approved').id
  const rows = matrix({ [id]: 0 })
  expect(rows.find(row => row.id === id).testcaseCount).toBe(0)
  expect(
    rows.filter(row => row.id !== id).every(row => row.testcaseCount === null)
  ).toBe(true)
})
