const isUrl = require('is-url')

/**
 * Inject an given set of scripts into the puppeteer page
 * @param {Object} param meta data constraining details of scripts to inject in the puppeteer page object
 * @property {Object} param.page puppeteer page
 * @property {Array} param.scripts array of scripts to inject into the page
 */
async function scriptInjector({ page, scripts = [] }) {
  for (const script of scripts || []) {
    const key = isUrl(script) ? 'url' : 'path'
    await page.addScriptTag({ [key]: script })
  }
}

module.exports = scriptInjector
