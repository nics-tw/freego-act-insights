jest.mock('puppeteer', () => ({ launch: jest.fn() }))
jest.mock('../load-test-cases', () => jest.fn())
jest.mock('../execute-test-case', () => jest.fn())

const puppeteer = require('puppeteer')
const loadTestCases = require('../load-test-cases')
const executeTestCase = require('../execute-test-case')
const testRunner = require('../index')

describe('testRunner lifecycle', () => {
  let browser
  const options = { globals: { rulesMap: { abc123: ['HM1'] } } }

  beforeEach(() => {
    browser = { close: jest.fn().mockResolvedValue() }
    puppeteer.launch.mockResolvedValue(browser)
    loadTestCases.mockResolvedValue([
      { ruleId: 'abc123', url: 'https://example.test/' }
    ])
    executeTestCase.mockResolvedValue({ outcome: 'earl:passed' })
  })

  test('returns results and closes the browser', async () => {
    await expect(testRunner(options)).resolves.toEqual([
      { outcome: 'earl:passed' }
    ])
    expect(browser.close).toHaveBeenCalledTimes(1)
  })

  test('preserves execution errors and closes the browser', async () => {
    const error = new Error('evaluation failed')
    executeTestCase.mockRejectedValueOnce(error)
    await expect(testRunner(options)).rejects.toBe(error)
    expect(browser.close).toHaveBeenCalledTimes(1)
  })

  test('does not launch a browser when no testcases match', async () => {
    loadTestCases.mockResolvedValueOnce([])
    await expect(testRunner(options)).rejects.toThrow('No test cases')
    expect(puppeteer.launch).not.toHaveBeenCalled()
  })

  test('passes debug launch options through', async () => {
    await testRunner({ ...options, debug: true })
    expect(puppeteer.launch).toHaveBeenCalledWith({
      headless: false,
      slowMo: 500,
      devtools: true
    })
  })
})
