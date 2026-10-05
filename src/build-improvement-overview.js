'use strict'

// The active catalog, not the available testcase results, defines the denominator.
function buildImprovementOverview({ ruleMatrix, reportedRules, matrixTools }) {
  const details = new Map(reportedRules.map(rule => [rule.id, rule]))
  const reportedOrder = new Map(
    reportedRules.map((rule, index) => [rule.id, index])
  )
  const rules = ruleMatrix.map(rule => {
    const status = rule.statuses[0]
    const peerResults = rule.statuses.slice(1).map((peerStatus, index) => ({
      tool: matrixTools[index + 1],
      status: peerStatus
    }))
    const peerCounts = {
      consistent: peerResults.filter(peer => peer.status === 'consistent')
        .length,
      partial: peerResults.filter(peer => peer.status === 'partial').length,
      unreported: peerResults.filter(peer => peer.status === 'not-reported')
        .length
    }
    const recommended = status === 'not-reported' && peerCounts.consistent >= 5
    const evidence =
      status === 'not-reported' ? undefined : details.get(rule.id)
    return {
      codes: [],
      codeDetails: [],
      failures: [],
      total: null,
      consistent: null,
      falseNegatives: null,
      falsePositives: null,
      notImplemented: null,
      accuracy: null,
      priority: recommended ? 'recommended' : 'unassessed',
      ...evidence,
      id: rule.id,
      name: rule.nameEn,
      nameZh: rule.nameZh,
      url: rule.url,
      status,
      hasTestData: Boolean(evidence && evidence.total > 0),
      recommended,
      peerResults,
      peerCounts
    }
  })
  rules.sort((a, b) => {
    const aReported = a.status !== 'not-reported'
    const bReported = b.status !== 'not-reported'
    if (aReported !== bReported) return aReported ? -1 : 1
    if (aReported) {
      return (
        (reportedOrder.get(a.id) ?? Infinity) -
          (reportedOrder.get(b.id) ?? Infinity) || a.id.localeCompare(b.id)
      )
    }
    return (
      Number(b.recommended) - Number(a.recommended) ||
      (a.recommended ? b.peerCounts.consistent - a.peerCounts.consistent : 0) ||
      a.id.localeCompare(b.id)
    )
  })
  const consistent = rules.filter(rule => rule.status === 'consistent').length
  const partial = rules.filter(rule => rule.status === 'partial').length
  const unreported = rules.filter(rule => rule.status === 'not-reported').length
  return {
    rules,
    ruleSummary: {
      total: rules.length,
      consistent,
      partial,
      reported: rules.length - unreported,
      unreported,
      recommended: rules.filter(rule => rule.recommended).length,
      consistencyRate: rules.length
        ? Math.round((consistent / rules.length) * 1000) / 10
        : 0
    }
  }
}

module.exports = { buildImprovementOverview }
