'use strict'

const fs = require('fs')
const path = require('path')
const axios = require('axios')
const { countRuleTestcases } = require('../src/count-rule-testcases')

async function main() {
  const source =
    'https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases.json'
  const { data } = await axios.get(source, { timeout: 60000 })
  const counts = countRuleTestcases(data.testcases)
  const snapshot = {
    source,
    retrievedAt: new Date().toISOString(),
    scope:
      'All official testcases; unique testcaseId per ruleId; all outcomes and file extensions, no rulesMap filtering. Missing rules have unknown counts, not zero.',
    total: Object.values(counts).reduce((sum, count) => sum + count, 0),
    counts
  }
  fs.writeFileSync(
    path.join(__dirname, '../docs/act-testcase-counts.json'),
    JSON.stringify(snapshot, null, 2) + '\n'
  )
  console.log(
    `Saved ${snapshot.total} unique testcases across ${Object.keys(counts).length} rules`
  )
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
