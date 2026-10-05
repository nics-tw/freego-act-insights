'use strict'

const ACT_RULE_BASE_URL =
  'https://www.w3.org/WAI/standards-guidelines/act/rules'
const MODA_GUIDE_URL = 'https://accessibility.moda.gov.tw/Accessible/Guide/68'

function outcomeName(outcome) {
  return String(outcome || 'earl:untested').replace(/^earl:/, '')
}

function isConsistent(expected, outcomes) {
  if (outcomes.length === 0 || outcomes.includes('untested')) return false
  if (expected === 'failed')
    return outcomes.every(outcome => outcome === 'failed')
  if (expected === 'passed' || expected === 'inapplicable') {
    return outcomes.every(outcome => outcome !== 'failed')
  }
  return true
}

function escapeTableCell(value) {
  return String(value == null ? '' : value)
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, '<br>')
}

function ruleIdFromUrl(url) {
  const match = String(url || '').match(/\/testcases\/([^/]+)\//)
  return match ? match[1] : null
}

function expectedRequirements(testCase) {
  const requirements = testCase.ruleAccessibilityRequirements || {}
  return Object.entries(requirements)
    .filter(
      ([key, value]) => /^wcag\d*:/.test(key) && value && value.forConformance
    )
    .map(([key]) => key.split(':')[1])
    .sort()
}

function reportedRequirements(assertions) {
  const requirements = new Set()
  for (const assertion of assertions) {
    for (const requirement of assertion.test.isPartOf || []) {
      const match = String(requirement.title || '').match(/(\d+\.\d+\.\d+)/)
      if (match) requirements.add(match[1])
    }
  }
  return [...requirements].sort()
}

function buildRules(report, testCases) {
  if (!report || !Array.isArray(report.assertedThat)) {
    throw new Error('FreeGo report must contain an assertedThat array')
  }
  if (!Array.isArray(testCases)) {
    throw new Error('ACT testcases must be an array')
  }

  const testCaseByUrl = new Map(
    testCases.map(testCase => [testCase.url, testCase])
  )
  const assertionsByUrl = new Map()

  for (const assertion of report.assertedThat) {
    const url = assertion.subject && assertion.subject.source
    if (!url) continue
    if (!assertionsByUrl.has(url)) assertionsByUrl.set(url, [])
    assertionsByUrl.get(url).push(assertion)
  }

  const rules = new Map()
  for (const testCase of testCases) {
    const assertions = assertionsByUrl.get(testCase.url) || []
    if (assertions.length === 0) continue

    const ruleId = testCase.ruleId || ruleIdFromUrl(testCase.url)
    if (!ruleId) continue

    if (!rules.has(ruleId)) {
      rules.set(ruleId, {
        id: ruleId,
        name: testCase.ruleName || ruleId,
        page: testCase.rulePage || `${ACT_RULE_BASE_URL}/${ruleId}/`,
        testCases: [],
        codes: new Set(),
        expectedRequirements: new Set()
      })
    }

    const rule = rules.get(ruleId)
    assertions.forEach(assertion => rule.codes.add(assertion.test.title))
    expectedRequirements(testCase).forEach(requirement =>
      rule.expectedRequirements.add(requirement)
    )
    rule.testCases.push({ testCase, assertions })
  }

  for (const [url] of assertionsByUrl) {
    if (!testCaseByUrl.has(url)) {
      throw new Error(
        `No ACT testcase metadata found for assertion subject: ${url}`
      )
    }
  }

  return [...rules.values()].map(rule => {
    const codes = [...rule.codes].sort()
    const rows = rule.testCases.map(({ testCase, assertions }) => {
      const outcomes = Object.fromEntries(codes.map(code => [code, 'untested']))
      for (const assertion of assertions) {
        outcomes[assertion.test.title] = outcomeName(
          assertion.result && assertion.result.outcome
        )
      }
      const approved = testCase.approved !== false
      const consistent =
        approved &&
        codes.every(code => isConsistent(testCase.expected, [outcomes[code]]))
      return { testCase, outcomes, approved, consistent }
    })

    const assertions = rule.testCases.flatMap(item => item.assertions)
    const reported = reportedRequirements(assertions)
    const requirementsCovered = [...rule.expectedRequirements].every(
      requirement => reported.includes(requirement)
    )
    return {
      ...rule,
      codes,
      rows,
      reportedRequirements: reported,
      consistent:
        requirementsCovered &&
        rows.filter(row => row.approved).every(row => row.consistent)
    }
  })
}

function formatRequirements(requirements) {
  return requirements.length > 0 ? requirements.join(', ') : 'None'
}

function formatOutcome(outcome) {
  return outcome === 'untested' ? 'untested' : outcome
}

function generateFreegoMarkdown({
  report,
  testCases,
  sourcePath = 'examples/results/freego.json'
}) {
  const rules = buildRules(report, testCases)
  const revision =
    report.release && report.release.revision
      ? report.release.revision
      : '(unknown)'
  const created =
    report.release && report.release.created
      ? report.release.created
      : '(unknown)'
  const consistentRules = rules.filter(rule => rule.consistent).length
  const partialRules = rules.length - consistentRules
  const assertionCount = report.assertedThat.length

  const lines = [
    `# Freego ${revision} — ACT Rules 實作報告`,
    '',
    '| 欄位 | 資訊 |',
    '|------|------|',
    `| 工具名稱 | ${escapeTableCell(report.name || 'Freego')} |`,
    `| 版本 | ${escapeTableCell(revision)} |`,
    `| 開發者 | [Ministry of Digital Affairs, Taiwan](${escapeTableCell(report.homepage || '')}) |`,
    '| 開發語言 | Java |',
    '| 工具類型 | Automated |',
    '| 標準 | WCAG 2.1 Level A, AA, AAA |',
    '| W3C ACT 頁面 | 尚未登錄 |',
    `| 官方網站 | ${escapeTableCell(report.homepage || '')} |`,
    `| EARL 測試報告 | ${escapeTableCell(sourcePath)} |`,
    `| 規則邏輯文件 | ${MODA_GUIDE_URL} |`,
    `| 最後更新 | ${escapeTableCell(created)} |`,
    `| 一致規則數 | ${consistentRules} |`,
    `| 部分一致規則數 | ${partialRules} |`,
    '',
    '> **結果說明：** `Consistent` 表示該 ACT 規則下所有已核准 testcase 與所有對應 FreeGo 檢測碼均符合預期；`Partial` 表示至少一筆結果不一致或未測。ACT 預期為 `inapplicable` 而 FreeGo 回報 `passed` 時視為一致。',
    '',
    '---',
    '',
    '## 實作規則總表',
    '',
    '| # | 規則名稱 | ACT 規則 ID | FreeGo 檢測碼 | 一致性 |',
    '|---|---------|------------|---------------|--------|'
  ]

  rules.forEach((rule, index) => {
    const status = rule.consistent ? '✅ Consistent' : '⚠️ Partial'
    lines.push(
      `| ${index + 1} | [${escapeTableCell(rule.name)}](${rule.page}) | [${rule.id}](${rule.page}) | ${rule.codes.map(code => `\`${code}\``).join(', ')} | ${status} |`
    )
  })

  lines.push('', '## 實作規則詳細表格', '')

  rules.forEach((rule, index) => {
    const status = rule.consistent ? '✅ Consistent' : '⚠️ Partial'
    const expected = formatRequirements([...rule.expectedRequirements].sort())
    const reported = formatRequirements(rule.reportedRequirements)
    const outcomeHeaders = rule.codes.map(code => `\`${code}\``)

    lines.push(
      `### 規則 ${index + 1}：${rule.name}`,
      '',
      `- **ACT Rule ID:** [${rule.id}](${rule.page})`,
      `- **FreeGo 檢測碼:** ${rule.codes.map(code => `\`${code}\``).join(', ')}`,
      `- **規則邏輯文件:** ${MODA_GUIDE_URL}`,
      `- **一致性:** ${status}`,
      `- **成功標準差異:** Expected: ${expected} → Reported: **${reported}**`,
      '',
      `| 測試案例 | 預期結果 | ${outcomeHeaders.join(' | ')} | 一致？ |`,
      `|---------|---------|${rule.codes.map(() => '---------').join('|')}|-------|`
    )

    for (const row of rule.rows) {
      const testCase = row.testCase
      const title =
        testCase.testcaseTitle || testCase.testcaseId || testCase.url
      const approvedSuffix = row.approved ? '' : ' *'
      const expectedOutcome = row.approved ? testCase.expected : '(untested)'
      const outcomes = rule.codes.map(code => formatOutcome(row.outcomes[code]))
      const consistency = row.approved
        ? row.consistent
          ? '✅'
          : '❌'
        : '— (untested)'
      lines.push(
        `| [${escapeTableCell(title)}](${testCase.url})${approvedSuffix} | ${expectedOutcome} | ${outcomes.join(' | ')} | ${consistency} |`
      )
    }

    if (rule.rows.some(row => !row.approved)) {
      lines.push('', '*\\* 此例子尚未經核准納入規則，結果不計入一致性判定。*')
    }
    lines.push('')
  })

  const approvedRows = rules
    .flatMap(rule => rule.rows)
    .filter(row => row.approved)
  const consistentRows = approvedRows.filter(row => row.consistent).length
  const inconsistentRows = approvedRows.length - consistentRows

  lines.push(
    '## 摘要',
    '',
    '| 指標 | 數值 |',
    '|------|------|',
    `| 已實作規則總數 | ${rules.length} |`,
    `| 完全一致規則數 | ${consistentRules} |`,
    `| 部分一致規則數 | ${partialRules} |`,
    `| EARL assertions | ${assertionCount} |`,
    `| 已核准 testcase | ${approvedRows.length} |`,
    `| 一致 testcase | ${consistentRows} |`,
    `| 不一致 testcase | ${inconsistentRows} |`,
    ''
  )

  return `${lines.join('\n')}\n`
}

module.exports = { generateFreegoMarkdown }
