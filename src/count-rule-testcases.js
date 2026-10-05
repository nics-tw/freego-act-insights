'use strict'

function countRuleTestcases(testcases) {
  if (!Array.isArray(testcases) || !testcases.length)
    throw new Error('ACT testcases must be a non-empty array')
  const grouped = new Map()
  for (const testcase of testcases) {
    if (!testcase.ruleId || !testcase.testcaseId)
      throw new Error('ACT testcase requires ruleId and testcaseId')
    if (!grouped.has(testcase.ruleId)) grouped.set(testcase.ruleId, new Set())
    grouped.get(testcase.ruleId).add(testcase.testcaseId)
  }
  return Object.fromEntries(
    [...grouped]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([id, cases]) => [id, cases.size])
  )
}

module.exports = { countRuleTestcases }
