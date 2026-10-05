jest.mock('axios', () => ({ get: jest.fn() }))
const axios = require('axios')
const loadTestCases = require('../load-test-cases')

const cases = [
  { ruleId: 'a', url: 'https://example.test/pass.html' },
  { ruleId: 'a', url: 'https://example.test/skip.html' },
  { ruleId: 'a', url: 'https://example.test/vector.svg' },
  { ruleId: 'b', url: 'https://example.test/other.html' },
  { ruleId: 'empty', url: 'https://example.test/empty.html' },
  { ruleId: 'unknown', url: 'https://example.test/unknown.html' }
]
const config = {
  TESTCASES_JSON: 'https://example.test/testcases.json',
  TESTCASES_KEY: 'testcases'
}
const rulesMap = { a: ['HM1'], b: ['HM2'], empty: [] }

beforeEach(() => axios.get.mockResolvedValue({ data: { testcases: cases } }))

test('uses optional skip defaults and excludes unmapped rules', async () => {
  await expect(loadTestCases({ config, rulesMap })).resolves.toEqual(
    cases.slice(0, 4)
  )
})

test('combines runOnly with all skip filters', async () => {
  await expect(
    loadTestCases({
      config,
      rulesMap,
      runOnly: ['pass.html', 'skip.html', 'vector.svg', 'other.html'],
      skipTests: {
        ruleIds: ['b'],
        testCases: ['skip.html'],
        fileExtensions: ['svg']
      }
    })
  ).resolves.toEqual([cases[0]])
})

test('propagates Axios failures', async () => {
  const error = new Error('network failed')
  axios.get.mockRejectedValueOnce(error)
  await expect(loadTestCases({ config, rulesMap })).rejects.toBe(error)
})
