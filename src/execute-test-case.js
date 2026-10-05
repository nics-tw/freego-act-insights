const scriptInjector = require('./script-injector')

/**
 * Mount a given set of values as globals on the Page
 * @param {Object} page Page or Window object on which the globals have to be mounted
 * @param {Object} globals Key Value Pair of globals to mount on the Page
 */
async function injectGlobals(page, globals) {
  const keys = Object.keys(globals)
  await Promise.all(
    keys.map(async key => {
      const value = globals[key]
      if (typeof value === 'function') {
        await page.exposeFunction(key, value)
      }
      if (typeof value !== 'function') {
        await page.evaluate(
          async function (object) {
            return (window[object.key] = object.value)
          },
          { key, value }
        )
      }
    })
  )
}

/**
 * Execute given test case
 * @param {Object} param meta data used to execute an ACT testcase
 * @property {Object} param.browser Puppeteer browser object
 * @property {Object} param.testcase ACT testcase
 * @property {Object} param.options opts
 */
async function executeTestCase({ browser, testcase, options }) {
  const { globals, evaluate } = options
  const page = await browser.newPage()
  try {
    await page.goto(testcase.url, { waitUntil: 'load' })
    await scriptInjector({ page, scripts: options.injectScripts })
    await injectGlobals(page, { ...globals, testcase })
    return await page.evaluate(evaluate)
  } finally {
    await page.close()
  }
}

module.exports = executeTestCase
