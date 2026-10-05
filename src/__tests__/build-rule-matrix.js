const { buildRuleMatrix } = require('../build-rule-matrix')
const officialCatalog = require('../../docs/act-rule-catalog.json')

function build(overrides = {}) {
  return buildRuleMatrix({
    catalog: { rules: [] },
    toolRules: [new Map(), new Map()],
    names: new Map(),
    links: new Map(),
    namesZh: {},
    ...overrides
  })
}

const rule = (id, criteria = ['1.1.1'], status = 'approved') => ({
  id,
  name: `Official ${id}`,
  url: `https://www.w3.org/WAI/standards-guidelines/act/rules/${id}/`,
  status,
  criteria,
  aria: false
})

test('includes official unreported rules but excludes deprecated and report-only IDs even if reported', () => {
  const rows = build({
    catalog: {
      rules: [
        rule('official'),
        rule('unused', ['1.1.1'], 'proposed'),
        rule('old', ['1.1.1'], 'deprecated')
      ]
    },
    toolRules: [
      new Map([
        ['official', 'partial'],
        ['old', 'consistent']
      ]),
      new Map([['legacy', 'consistent']])
    ],
    names: new Map([['legacy', 'Legacy name']]),
    links: new Map([['legacy', 'https://example.test/legacy/']]),
    namesZh: { unused: '未回報規則' }
  })
  expect(rows.map(row => row.id)).toEqual(['official', 'unused'])
  expect(rows[0].statuses).toEqual(['partial', 'not-reported'])
  expect(rows[1]).toMatchObject({
    catalogStatus: 'proposed',
    nameZh: '未回報規則',
    allUnreported: true,
    statuses: ['not-reported', 'not-reported']
  })
})

test('sorts FreeGo first, other reports next, all-unreported last; IDs sort inside each group', () => {
  const rows = build({
    catalog: { rules: ['z', 'a', 'y', 'b', 'x', 'c'].map(id => rule(id)) },
    toolRules: [
      new Map([
        ['z', 'partial'],
        ['a', 'consistent']
      ]),
      new Map([
        ['y', 'consistent'],
        ['b', 'partial']
      ])
    ]
  })
  expect(rows.map(row => row.id)).toEqual(['a', 'z', 'b', 'y', 'c', 'x'])
  expect(rows.map(row => row.reportGroup)).toEqual([0, 0, 1, 1, 2, 2])
})

test('does not infer a WCAG version for ARIA-only rules and marks mixed versions accurately', () => {
  const rows = build({
    catalog: {
      rules: [
        { ...rule('aria', []), aria: true },
        rule('mixed', ['1.4.4', '1.4.10']),
        rule('new', ['2.5.8']),
        rule('old', ['4.1.1'], 'deprecated')
      ]
    }
  })
  expect(rows.find(row => row.id === 'aria')).toMatchObject({
    wcagVersions: [],
    wcag22Applicable: false,
    aria: true
  })
  expect(rows.find(row => row.id === 'mixed').wcagVersions).toEqual([
    '2.0',
    '2.1'
  ])
  expect(rows.find(row => row.id === 'new').wcagVersions).toEqual(['2.2'])
  expect(rows.find(row => row.id === 'old')).toBeUndefined()
})

test('rejects duplicate IDs in the official snapshot', () => {
  expect(() =>
    build({ catalog: { rules: [rule('same'), rule('same')] } })
  ).toThrow('Duplicate')
})

test('bundled catalog includes exactly the 87 active rules even when all ten reports are empty', () => {
  const rows = build({
    catalog: officialCatalog,
    toolRules: Array.from({ length: 10 }, () => new Map())
  })
  const active = officialCatalog.rules.filter(rule =>
    ['approved', 'proposed'].includes(rule.status)
  )
  expect(rows).toHaveLength(87)
  expect(rows.map(rule => rule.id).sort()).toEqual(
    active.map(rule => rule.id).sort()
  )
  expect(
    rows.every(row => row.allUnreported && row.statuses.length === 10)
  ).toBe(true)
  expect(
    rows.every(row =>
      row.url.startsWith(
        'https://www.w3.org/WAI/standards-guidelines/act/rules/'
      )
    )
  ).toBe(true)
  expect(rows.some(row => row.catalogStatus === 'deprecated')).toBe(false)
  expect(rows.find(row => row.id === 'ffbc54').wcagVersions).toEqual(['2.1'])
  expect(rows.find(row => row.id === 'ffd0e9')).toMatchObject({
    aria: true,
    wcagVersions: []
  })
})
