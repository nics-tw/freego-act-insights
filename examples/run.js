/**
 * examples/run.js
 *
 * 執行入口：呼叫 testRunner，注入 axe-core，收集結果後輸出 EARL JSON-LD
 *
 * 執行方式:
 *   node examples/run.js
 * 或透過 npm script:
 *   npm run example
 */

'use strict'

const path = require('path')
const fs = require('fs')
const testRunner = require('../src/index')
const rulesMap = require('../rulesMap')
const evaluate = require('./evaluate')
const toEarl = require('./to-earl')

const axeCorePath = require.resolve('axe-core')
const resultsDir = path.join(__dirname, 'results')
const outputPath = path.join(resultsDir, 'output.jsonld')

async function main() {
  console.log('Examples: 開始執行無障礙檢測...')

  const results = await testRunner({
    globals: { rulesMap },
    evaluate,
    injectScripts: [axeCorePath],
    skipTests: {
      ruleIds: [],
      testCases: [],
      fileExtensions: ['xhtml', 'xml', 'svg', 'js']
    }
  })

  const earl = toEarl(results)

  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true })
  }

  fs.writeFileSync(outputPath, JSON.stringify(earl, null, 2), 'utf8')
  console.log(`Examples: 完成，結果已寫入 ${outputPath}`)
  console.log(`Examples: 共 ${earl['@graph'].length} 筆 EARL Assertion`)
}

main().catch(err => {
  console.error('Examples: 執行失敗', err)
  process.exit(1)
})
