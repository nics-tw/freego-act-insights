const { buildImprovementOverview } = require('../build-improvement-overview')

const matrixTools = [
  'FreeGo',
  ...Array.from({ length: 9 }, (_, i) => `Peer ${i}`)
]
const rule = (id, freego, consistentPeers, rest = 'partial') => ({
  id,
  nameEn: `Rule ${id}`,
  nameZh: `規則 ${id}`,
  url: `https://www.w3.org/WAI/standards-guidelines/act/rules/${id}/`,
  statuses: [
    freego,
    ...Array.from({ length: 9 }, (_, i) =>
      i < consistentPeers ? 'consistent' : rest
    )
  ]
})
const build = (ruleMatrix, reportedRules = []) =>
  buildImprovementOverview({ ruleMatrix, reportedRules, matrixTools })

test('counts all catalog rules equally, independently of assertion volume', () => {
  const matrix = [
    rule('yes', 'consistent', 0),
    rule('partial', 'partial', 9),
    rule('missing', 'not-reported', 0, 'not-reported')
  ]
  const evidence = [
    { id: 'yes', total: 1, consistent: 1 },
    { id: 'partial', total: 1000, consistent: 999 },
    { id: 'historical', total: 50, status: 'consistent' }
  ]
  const { rules, ruleSummary } = build(matrix, evidence)
  expect(rules).toHaveLength(3)
  expect(ruleSummary).toEqual({
    total: 3,
    consistent: 1,
    partial: 1,
    reported: 2,
    unreported: 1,
    recommended: 0,
    consistencyRate: 33.3
  })
  expect(
    build(
      matrix,
      evidence.map(item => ({ ...item, total: 10000 }))
    ).ruleSummary
  ).toEqual(ruleSummary)
})

test('recommends only unreported rules with at least five of nine consistent peers', () => {
  const { rules, ruleSummary } = build([
    rule('four', 'not-reported', 4),
    rule('five', 'not-reported', 5),
    rule('six', 'not-reported', 6),
    rule('reported-partial', 'partial', 9),
    rule('reported-consistent', 'consistent', 4),
    rule('all-missing', 'not-reported', 0, 'not-reported')
  ])
  expect(rules.filter(item => item.recommended).map(item => item.id)).toEqual([
    'six',
    'five'
  ])
  expect(ruleSummary.recommended).toBe(2)
  expect(rules.find(item => item.id === 'four').peerCounts).toEqual({
    consistent: 4,
    partial: 5,
    unreported: 0
  })
  expect(rules.find(item => item.id === 'five').peerResults).toHaveLength(9)
  expect(rules.find(item => item.id === 'five').peerResults[0].tool).toBe(
    'Peer 0'
  )
})

test('does not invent testcase evidence or detection codes for unreported rules', () => {
  const { rules } = build(
    [rule('missing', 'not-reported', 5)],
    [{ id: 'missing', total: 100, accuracy: 100, codes: ['HM0000000C'] }]
  )
  expect(rules[0]).toMatchObject({
    status: 'not-reported',
    recommended: true,
    priority: 'recommended',
    hasTestData: false,
    total: null,
    consistent: null,
    accuracy: null,
    falseNegatives: null,
    falsePositives: null,
    notImplemented: null,
    codes: [],
    codeDetails: [],
    failures: []
  })
})

test('preserves reported evidence and priority order, then recommendations and pending rules', () => {
  const evidence = [
    {
      id: 'z',
      total: 4,
      accuracy: 75,
      priority: 'high',
      failures: [{ type: 'inconsistent-invalid' }]
    },
    { id: 'a', total: 2, accuracy: 50, priority: 'low' }
  ]
  const before = JSON.stringify(evidence)
  const { rules } = build(
    [
      rule('pending', 'not-reported', 0),
      rule('a', 'partial', 5),
      rule('recommended', 'not-reported', 5),
      rule('z', 'partial', 5)
    ],
    evidence
  )
  expect(rules.map(item => item.id)).toEqual([
    'z',
    'a',
    'recommended',
    'pending'
  ])
  expect(rules[0]).toMatchObject({ ...evidence[0], hasTestData: true })
  expect(JSON.stringify(evidence)).toBe(before)
})

test('handles an empty catalog without NaN or false recommendations', () => {
  expect(build([])).toEqual({
    rules: [],
    ruleSummary: {
      total: 0,
      consistent: 0,
      partial: 0,
      reported: 0,
      unreported: 0,
      recommended: 0,
      consistencyRate: 0
    }
  })
})
