const executeTestCase = require('../execute-test-case')

test.each(['success', 'navigation', 'injection', 'evaluation'])(
  'closes page after %s',
  async stage => {
    const error = new Error(stage)
    const page = {
      goto: jest.fn().mockResolvedValue(),
      addScriptTag: jest.fn().mockResolvedValue(),
      evaluate: jest.fn().mockResolvedValue('result'),
      exposeFunction: jest.fn().mockResolvedValue(),
      close: jest.fn().mockResolvedValue()
    }
    if (stage === 'navigation') page.goto.mockRejectedValueOnce(error)
    if (stage === 'injection') page.addScriptTag.mockRejectedValueOnce(error)
    if (stage === 'evaluation') page.evaluate.mockRejectedValueOnce(error)
    const globals = { rulesMap: {}, callback: () => 'value' }
    const pending = executeTestCase({
      browser: { newPage: async () => page },
      testcase: { url: 'https://example.test/' },
      options: {
        globals,
        evaluate: () => 'result',
        injectScripts: ['script.js']
      }
    })
    if (stage === 'success') {
      await expect(pending).resolves.toBe('result')
      expect(page.exposeFunction).toHaveBeenCalledWith(
        'callback',
        globals.callback
      )
      expect(globals).not.toHaveProperty('testcase')
    } else {
      await expect(pending).rejects.toBe(error)
    }
    expect(page.close).toHaveBeenCalledTimes(1)
  }
)
