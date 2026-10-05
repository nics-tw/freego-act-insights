const scriptInjector = require('../script-injector')

test('waits for each script in dependency order', async () => {
  let finishFirst
  const page = {
    addScriptTag: jest
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise(resolve => {
            finishFirst = resolve
          })
      )
      .mockResolvedValueOnce()
  }
  const pending = scriptInjector({
    page,
    scripts: ['first.js', 'https://example.test/second.js']
  })
  expect(page.addScriptTag).toHaveBeenCalledTimes(1)
  finishFirst()
  await pending
  expect(page.addScriptTag.mock.calls).toEqual([
    [{ path: 'first.js' }],
    [{ url: 'https://example.test/second.js' }]
  ])
})

test('stops and propagates a script load failure', async () => {
  const error = new Error('script failed')
  const page = { addScriptTag: jest.fn().mockRejectedValue(error) }
  await expect(
    scriptInjector({ page, scripts: ['first.js', 'second.js'] })
  ).rejects.toBe(error)
  expect(page.addScriptTag).toHaveBeenCalledTimes(1)
})

test.each([undefined, null, []])(
  'accepts an empty script list: %s',
  async scripts => {
    const page = { addScriptTag: jest.fn() }
    await scriptInjector({ page, scripts })
    expect(page.addScriptTag).not.toHaveBeenCalled()
  }
)
