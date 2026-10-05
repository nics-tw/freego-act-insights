/**
 * examples/evaluate.js
 *
 * 在 Puppeteer 頁面 context 中執行的檢測函式。
 *
 * 注意：此函式會被序列化後傳入瀏覽器執行，因此：
 * - 不能使用 require()
 * - 只能存取 browser API 及已注入至頁面的全域變數
 * - axe-core 須已透過 injectScripts 注入頁面（由 run.js 負責）
 * - window.testcase 及 window.rulesMap 由測試流程注入
 *
 * @returns {Object} 包含測試案例資訊與 axe-core 執行結果
 */
module.exports = async function evaluate() {
  // window.testcase 包含 { ruleId, url, expected, ... }
  const testcase = window.testcase

  // 取得此 ACT Rule 對應的國內檢測碼陣列
  const detectionCodes = window.rulesMap[testcase.ruleId] || []

  // 若 axe-core 未成功注入（例如非 HTML 頁面），回傳 inapplicable
  if (typeof axe === 'undefined') {
    return {
      testcase,
      detectionCodes,
      outcome: 'earl:inapplicable',
      axeResults: null
    }
  }

  // 執行 axe-core 全頁掃描
  const axeResults = await axe.run(document, {
    resultTypes: ['violations', 'passes', 'incomplete', 'inapplicable']
  })

  // 判斷此測試案例的結果
  // ACT testcase 的 expected 值為 'passed' | 'failed' | 'inapplicable'
  const hasViolations = axeResults.violations.length > 0
  const outcome = hasViolations ? 'earl:failed' : 'earl:passed'

  return {
    testcase,
    detectionCodes,
    outcome,
    axeResults: {
      violations: axeResults.violations.map(v => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.length
      })),
      passes: axeResults.passes.map(p => ({
        id: p.id,
        description: p.description
      })),
      incomplete: axeResults.incomplete.map(i => ({
        id: i.id,
        description: i.description
      })),
      inapplicable: axeResults.inapplicable.map(i => ({
        id: i.id
      }))
    }
  }
}
