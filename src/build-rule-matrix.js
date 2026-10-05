'use strict'

const WCAG_21_CRITERIA = new Set([
  '1.3.4',
  '1.3.5',
  '1.3.6',
  '1.4.10',
  '1.4.11',
  '1.4.12',
  '1.4.13',
  '2.1.4',
  '2.2.6',
  '2.3.3',
  '2.5.1',
  '2.5.2',
  '2.5.3',
  '2.5.4',
  '2.5.5',
  '2.5.6',
  '4.1.3'
])
const WCAG_22_CRITERIA = new Set([
  '2.4.11',
  '2.4.12',
  '2.4.13',
  '2.5.7',
  '2.5.8',
  '3.2.6',
  '3.3.7',
  '3.3.8',
  '3.3.9'
])

function buildRuleMatrix({
  catalog,
  toolRules,
  names,
  links,
  namesZh,
  testcaseCounts = {}
}) {
  const official = new Map(catalog.rules.map(rule => [rule.id, rule]))
  if (official.size !== catalog.rules.length)
    throw new Error('Duplicate ACT catalog rule ID')
  return [...official.values()]
    .filter(rule => ['approved', 'proposed'].includes(rule.status))
    .map(rule => rule.id)
    .map(id => {
      const rule = official.get(id)
      const criteria = rule?.criteria || []
      const statuses = toolRules.map(rules => rules.get(id) || 'not-reported')
      const allUnreported = statuses.every(status => status === 'not-reported')
      const reportGroup =
        statuses[0] !== 'not-reported' ? 0 : allUnreported ? 2 : 1
      const wcagVersions = [
        ...new Set(
          criteria.map(criterion =>
            WCAG_22_CRITERIA.has(criterion)
              ? '2.2'
              : WCAG_21_CRITERIA.has(criterion)
                ? '2.1'
                : '2.0'
          )
        )
      ].sort()
      return {
        id,
        testcaseCount: testcaseCounts[id] ?? null,
        nameZh: namesZh[id] || rule?.name || names.get(id) || id,
        nameEn: rule?.name || names.get(id) || id,
        url: rule?.url || links.get(id),
        catalogStatus: rule?.status || 'historical',
        criteria,
        aria: rule?.aria || false,
        wcagVersions,
        wcag22Applicable:
          criteria.some(criterion => criterion !== '4.1.1') &&
          rule?.status !== 'deprecated',
        statuses,
        allUnreported,
        reportGroup
      }
    })
    .sort((a, b) => a.reportGroup - b.reportGroup || a.id.localeCompare(b.id))
}

module.exports = { buildRuleMatrix }
