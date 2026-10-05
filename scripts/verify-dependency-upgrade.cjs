const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const http = require('node:http')
const vm = require('node:vm')
const { createRequire } = require('node:module')
const { execFileSync } = require('node:child_process')
const { pathToFileURL } = require('node:url')
const puppeteer = require('puppeteer')
const axios = require('axios')
const pkg = require('../package.json')
const testRunner = require('../src')
const loadTestCases = require('../src/load-test-cases')
const { downloadTestCases, startServer } = require('../src/serve-test-cases')
const parseFreegoReport = require('../src/parse-freego-report')
const {
  generateImplementationReport
} = require('../src/generate-implementation-report')
const toEarl = require('../examples/to-earl')

const root = path.join(__dirname, '..')
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'))
const close = server =>
  new Promise((resolve, reject) => {
    server.close(error => (error ? reject(error) : resolve()))
    server.closeAllConnections()
  })

async function main() {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'testrunner-upgrade-'))
  const originalConfig = { ...pkg.config }
  const servers = []
  let browser
  try {
    // All generated output stays outside the workspace. No production report is overwritten.
    const pages = {
      '/testcases/abc123/pass.html':
        '<!doctype html><html lang="en"><title>Pass</title><main><h1>Pass</h1><img alt="Example" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="></main></html>',
      '/testcases/abc123/fail.html':
        '<!doctype html><html lang="en"><title>Fail</title><main><h1>Fail</h1><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="></main></html>'
    }
    let testcases = []
    const source = http.createServer((req, res) => {
      if (req.url === '/testcases.json') {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ testcases }))
      } else if (req.url === '/second.js') {
        res.setHeader('Content-Type', 'application/javascript')
        res.end('window.injectedOrder.push("second")')
      } else if (Object.hasOwn(pages, req.url)) {
        res.setHeader('Content-Type', 'text/html')
        res.end(pages[req.url])
      } else {
        res.writeHead(404)
        res.end('Not found')
      }
    })
    await new Promise((resolve, reject) => {
      source.once('error', reject)
      source.listen(0, '127.0.0.1', resolve)
    })
    servers.push(source)
    const base = `http://127.0.0.1:${source.address().port}`
    testcases = Object.keys(pages).map(url => ({
      ruleId: 'abc123',
      url: base + url,
      expected: url.endsWith('/pass.html') ? 'passed' : 'failed'
    }))
    pkg.config.TESTCASES_JSON = `${base}/testcases.json`
    const rulesMap = { abc123: ['HM1110100C'] }
    const loaded = await loadTestCases({ config: pkg.config, rulesMap })
    assert.deepEqual(loaded, testcases)
    const serveDir = path.join(temp, 'testcases')
    await downloadTestCases(loaded, serveDir)
    await downloadTestCases(loaded, serveDir)
    const served = await startServer(serveDir, { port: 0 })
    servers.push(served.server)
    assert.match((await axios.get(served.baseUrl)).data, /abc123/)
    assert.match(
      (await axios.get(`${served.baseUrl}/abc123/`)).data,
      /pass.html/
    )
    for (const [url, html] of Object.entries(pages)) {
      assert.equal(
        (await axios.get(served.baseUrl + url.replace('/testcases', ''))).data,
        html
      )
    }
    await assert.rejects(
      axios.get(`${served.baseUrl}/missing`),
      error => error.response.status === 404
    )
    console.log(
      'PASS: Axios JSON loading, downloading, cache reuse, local server and 404'
    )

    const firstScript = path.join(temp, 'first.js')
    fs.writeFileSync(firstScript, 'window.injectedOrder = ["first"]')
    const options = {
      globals: { rulesMap, callback: value => `node:${value}` },
      injectScripts: [
        firstScript,
        `${base}/second.js`,
        require.resolve('axe-core')
      ],
      evaluate: async function () {
        const result = await axe.run(document, { runOnly: ['image-alt'] })
        return {
          testcase: window.testcase,
          detectionCodes: window.rulesMap[window.testcase.ruleId],
          outcome: result.violations.length ? 'earl:failed' : 'earl:passed',
          order: window.injectedOrder,
          callbackResult: await window.callback('ok')
        }
      }
    }
    const results = await testRunner(options)
    assert.deepEqual(
      results.map(result => result.outcome),
      ['earl:passed', 'earl:failed']
    )
    for (const result of results) {
      assert.deepEqual(result.order, ['first', 'second'])
      assert.equal(result.callbackResult, 'node:ok')
    }
    const earl = toEarl(results)
    assert.equal(earl['@graph'].length, 2)
    fs.writeFileSync(path.join(temp, 'axe.jsonld'), JSON.stringify(earl))
    const reference = await testRunner({
      globals: { rulesMap },
      injectScripts: [require.resolve('axe-core')],
      evaluate: require('../examples/evaluate')
    })
    assert.equal(reference.length, 2)
    assert(
      reference[1].axeResults.violations.some(
        violation => violation.id === 'image-alt'
      )
    )
    await assert.rejects(
      testRunner({
        ...options,
        evaluate: () => {
          throw new Error('expected-smoke-failure')
        }
      }),
      /expected-smoke-failure/
    )
    console.log(
      'PASS: real Chrome, local/URL script injection, callbacks, axe reference evaluator, EARL and failure cleanup'
    )

    const snapshot = path.join(
      root,
      'examples/testcases/testcases-snapshot.json'
    )
    const testCases = readJson(snapshot)
    for (const [file, port, count, timeouts] of [
      ['examples/fixtures/htm-reports/ACT-R Testcases.htm', 5500, 1534, 6],
      ['examples/fixtures/htm-reports/testcases.html', 8000, 1481, 7]
    ]) {
      const parsed = parseFreegoReport(path.join(root, file))
      assert.equal(parsed.pages.length, count)
      assert.equal(parsed.timedOut.length, timeouts)
      const result = generateImplementationReport({
        freegoPages: parsed.pages,
        timedOut: parsed.timedOut,
        testCases,
        rulesMap: require('../rulesMap'),
        baseUrl: `http://127.0.0.1:${port}`
      })
      assert.deepEqual(result.summary, {
        consistent: 445,
        inconsistentFP: 42,
        inconsistentInvalid: 164,
        notImplemented: 0,
        timedOut: 0,
        total: 651
      })
    }
    const reportPath = path.join(temp, 'freego.json')
    execFileSync(
      process.execPath,
      [
        'examples/generate-report.js',
        '--htm',
        'freego-report/freego.htm',
        '--testcases-json',
        snapshot,
        '--out',
        reportPath
      ],
      { cwd: root, stdio: 'pipe', timeout: 30000 }
    )
    assert.deepEqual(
      readJson(path.join(temp, 'freego-consistency.json')),
      readJson(path.join(root, 'examples/results/freego-consistency.json'))
    )
    const actual = readJson(reportPath)
    const expected = readJson(path.join(root, 'examples/results/freego.json'))
    actual.release.created = expected.release.created
    assert.deepEqual(actual, expected)
    const markdownPath = path.join(temp, 'freego.md')
    execFileSync(
      process.execPath,
      [
        'examples/generate-freego-markdown.js',
        '--input',
        reportPath,
        '--testcases-json',
        snapshot,
        '--out',
        markdownPath
      ],
      { cwd: root, stdio: 'pipe', timeout: 30000 }
    )
    assert.match(fs.readFileSync(markdownPath, 'utf8'), /ACT Rules/)
    console.log(
      'PASS: three HTM inputs, CLI EARL + consistency equality (651 assertions), Markdown generation'
    )

    // Exercise the documented npm workflow in isolation, without replacing
    // the workspace's FreeGo Markdown or historical comparison baselines.
    const workflowRoot = path.join(temp, 'workflow')
    fs.mkdirSync(workflowRoot)
    for (const entry of [
      'package.json',
      'rulesMap.js',
      'src',
      'examples',
      'docs',
      'tools-act-report',
      'freego-report'
    ]) {
      fs.cpSync(path.join(root, entry), path.join(workflowRoot, entry), {
        recursive: true
      })
    }
    fs.symlinkSync(
      path.join(root, 'node_modules'),
      path.join(workflowRoot, 'node_modules'),
      'dir'
    )
    execFileSync('npm', ['run', 'generate:all'], {
      cwd: workflowRoot,
      stdio: 'pipe',
      timeout: 30000
    })
    assert.deepEqual(
      readJson(path.join(workflowRoot, 'reports/freego-consistency.json')),
      readJson(path.join(temp, 'freego-consistency.json'))
    )
    assert.match(
      fs.readFileSync(
        path.join(workflowRoot, 'tools-act-report/freego-dec-19-2025.md'),
        'utf8'
      ),
      /\.\.\/reports\/freego\.json/
    )
    const workflowHtmlPath = path.join(
      workflowRoot,
      'reports/freego-improvement-report.html'
    )
    const workflowHtml = fs.readFileSync(workflowHtmlPath, 'utf8')
    const workflowData = JSON.parse(workflowHtml.match(/const DATA = (.*);/)[1])
    assert.equal(workflowData.ruleMatrix.length, 87)
    assert.equal(workflowData.summary.total, 651)
    fs.rmSync(path.join(workflowRoot, 'freego-report/freego.htm'))
    assert.throws(
      () =>
        execFileSync('npm', ['run', 'generate:all'], {
          cwd: workflowRoot,
          stdio: 'pipe',
          timeout: 30000
        }),
      error => error.status !== 0 && /HTM file not found/.test(error.stderr)
    )
    assert.equal(fs.readFileSync(workflowHtmlPath, 'utf8'), workflowHtml)
    console.log(
      'PASS: single-command workflow creates reports/ from freego-report/freego.htm and stops on missing input'
    )

    const generator = path.join(
      root,
      'examples/generate-freego-improvement-html.js'
    )
    const dashboardPath = path.join(temp, 'dashboard.html')
    const localRequire = createRequire(generator)
    vm.runInNewContext(
      fs.readFileSync(generator, 'utf8'),
      {
        require: name =>
          name === 'fs'
            ? {
                ...fs,
                readFileSync: (file, ...args) =>
                  fs.readFileSync(
                    file === path.join(root, 'reports/freego-consistency.json')
                      ? path.join(temp, 'freego-consistency.json')
                      : file,
                    ...args
                  ),
                mkdirSync: () => {},
                writeFileSync: (_file, ...args) =>
                  fs.writeFileSync(dashboardPath, ...args)
              }
            : localRequire(name),
        __dirname: path.dirname(generator),
        URL,
        console
      },
      { filename: generator }
    )
    const dashboard = fs.readFileSync(dashboardPath, 'utf8')
    const baseline = fs.readFileSync(
      path.join(root, 'reports/freego-improvement-report.html'),
      'utf8'
    )
    const data = html => JSON.parse(html.match(/const DATA = (.*);/)[1])
    assert.deepEqual(data(dashboard), data(baseline))
    const matrix = data(dashboard).ruleMatrix
    const testcaseSnapshot = readJson(
      path.join(root, 'docs/act-testcase-counts.json')
    )
    assert(
      matrix.every(
        rule =>
          rule.testcaseCount === (testcaseSnapshot.counts[rule.id] ?? null)
      )
    )
    const official = readJson(path.join(root, 'docs/act-rule-catalog.json'))
    const matrixIds = new Set(matrix.map(rule => rule.id))
    assert.equal(matrixIds.size, matrix.length)
    const active = official.rules.filter(rule =>
      ['approved', 'proposed'].includes(rule.status)
    )
    assert.deepEqual([...matrixIds].sort(), active.map(rule => rule.id).sort())
    assert.equal(matrix.length, 87)
    assert(!matrixIds.has('2t408d'))
    assert.equal(matrix.filter(rule => rule.reportGroup === 0).length, 32)
    assert.equal(matrix.filter(rule => rule.reportGroup === 1).length, 40)
    const unreported = matrix.filter(rule => rule.allUnreported)
    assert.equal(unreported.length, 15)
    assert(
      unreported.every(
        rule =>
          rule.statuses.length === 10 &&
          rule.statuses.every(status => status === 'not-reported')
      )
    )
    assert(
      matrix.every(
        rule =>
          rule.nameZh !== rule.id && rule.nameZh !== rule.nameEn && rule.url
      )
    )
    assert.deepEqual(
      matrix.map(rule => rule.id),
      [...matrix]
        .sort(
          (a, b) => a.reportGroup - b.reportGroup || a.id.localeCompare(b.id)
        )
        .map(rule => rule.id)
    )
    const overview = data(dashboard)
    assert.deepEqual(
      overview.rules.map(rule => rule.id).sort(),
      [...matrixIds].sort()
    )
    const recommendations = matrix.filter(
      rule =>
        rule.statuses[0] === 'not-reported' &&
        rule.statuses.slice(1).filter(status => status === 'consistent')
          .length >= 5
    )
    const consistentRuleCount = matrix.filter(
      rule => rule.statuses[0] === 'consistent'
    ).length
    const expectedRate =
      Math.round((consistentRuleCount / matrix.length) * 1000) / 10
    assert.equal(overview.ruleSummary.total, 87)
    assert.equal(overview.ruleSummary.consistencyRate, expectedRate)
    assert.equal(overview.ruleSummary.recommended, recommendations.length)
    assert.equal(overview.ruleSummary.unreported, 55)
    assert.equal(overview.rules.filter(rule => rule.hasTestData).length, 32)
    assert(
      overview.rules
        .filter(rule => rule.status === 'not-reported')
        .every(
          rule =>
            rule.accuracy === null &&
            rule.total === null &&
            rule.falseNegatives === null &&
            rule.falsePositives === null &&
            rule.codes.length === 0 &&
            !rule.hasTestData
        )
    )
    browser = await puppeteer.launch()
    const page = await browser.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(pathToFileURL(dashboardPath).href)
    assert.equal(
      await page.title(),
      'FreeGo ACT Insights｜FreeGo ACT 規則分析與改善報告'
    )
    assert.equal(
      await page.$eval('h1', node => node.textContent),
      'FreeGo ACT 規則分析與改善報告'
    )
    assert.match(
      await page.$eval('.brand', node => node.textContent),
      /獨立專案，非 FreeGo 官方產品/
    )
    const manifest = readJson(path.join(root, 'package.json'))
    const lock = readJson(path.join(root, 'package-lock.json'))
    assert.equal(manifest.name, 'freego-act-insights')
    assert.equal(lock.name, manifest.name)
    assert.equal(lock.packages[''].name, manifest.name)
    assert.equal(await page.$$eval('#all-rules tr', rows => rows.length), 87)
    assert.equal(
      await page.$eval('#overview-consistency-rate', node => node.textContent),
      `${expectedRate}%`
    )
    assert.equal(
      await page.$eval('#overview-consistency-count', node => node.textContent),
      `${consistentRuleCount} / 87 條規則達成一致`
    )
    assert(
      !(await page.$eval('.summary-grid', node =>
        node.textContent.includes('ASSERTION')
      ))
    )
    assert.equal(await page.$('#recommendation-list'), null)
    assert.equal(await page.$('.recommendation-card'), null)
    const overviewCategories = [
      ['high', '高'],
      ['medium', '中'],
      ['low', '低'],
      ['recommended', '值得實作'],
      ['unassessed', '待評估']
    ]
    const categoryRules = category =>
      overview.rules.filter(rule => rule.priority === category)
    assert.equal(categoryRules('unassessed').length, 41)
    assert(categoryRules('unassessed').every(rule => !rule.recommended))
    assert.equal(await page.$('#priority-count-not-reported'), null)
    async function checkOverview(expected, selected = null) {
      assert.deepEqual(
        await page.$$eval('#all-rules [data-rule]', buttons =>
          buttons.map(button => button.dataset.rule)
        ),
        expected.map(rule => rule.id)
      )
      assert.deepEqual(
        await page.$$eval(
          '[data-overview-filter][aria-pressed="true"]',
          buttons => buttons.map(button => button.dataset.overviewFilter)
        ),
        selected ? [selected] : []
      )
      assert.equal(await page.$('#overview-filter-count'), null)
      assert.equal(await page.$('#overview-filter-help'), null)
      for (const [category, label] of overviewCategories) {
        assert.equal(
          await page.$eval(
            `#priority-count-${category}`,
            node => node.textContent
          ),
          `${label}：${categoryRules(category).length} 項`
        )
      }
      assert.equal(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth
        ),
        false
      )
    }
    for (const width of [1440, 390]) {
      await page.setViewport({ width, height: 900 })
      await checkOverview(overview.rules)
      assert.equal(
        await page.$eval('#clear-overview-filters', button => button.disabled),
        true
      )
      // Switching categories replaces the previous choice; clicking again cancels.
      for (const [category] of overviewCategories) {
        await page.click(`#priority-count-${category}`)
        await checkOverview(categoryRules(category), category)
      }
      await page.click('#priority-count-unassessed')
      await checkOverview(overview.rules)
      await page.focus('#priority-count-recommended')
      await page.keyboard.press('Space')
      await checkOverview(categoryRules('recommended'), 'recommended')
      await page.click('[data-tab="peers"]')
      await page.click('[data-tab="overview"]')
      await checkOverview(categoryRules('recommended'), 'recommended')
      await page.focus('#priority-count-high')
      await page.keyboard.press('Enter')
      await checkOverview(categoryRules('high'), 'high')
      assert.equal(await page.$('#search'), null)
      assert.equal(
        await page.$eval('#improvement-list-title', node => node.textContent),
        '規則改善清單'
      )
      assert.equal(
        await page.$eval('#clear-overview-filters', button => button.disabled),
        false
      )
      await page.click('#clear-overview-filters')
      await checkOverview(overview.rules)
    }
    console.log(
      'PASS: search removed, simplified heading, all five overview tags, single selection, cancellation, reset, tab persistence and keyboard at desktop/mobile widths'
    )
    const priorityCounts = {}
    for (const [priority, label] of [
      ['high', '高'],
      ['medium', '中'],
      ['low', '低']
    ]) {
      priorityCounts[priority] = overview.rules.filter(
        rule => rule.priority === priority
      ).length
      assert.equal(
        await page.$eval(
          `#priority-count-${priority}`,
          node => node.textContent
        ),
        `${label}：${priorityCounts[priority]} 項`
      )
      assert.equal(
        await page.$$eval(
          `#all-rules .priority-${priority}`,
          badges => badges.length
        ),
        priorityCounts[priority]
      )
    }
    assert.deepEqual(
      (
        await page.$$eval('#all-rules tr:has(.priority-recommended)', rows =>
          rows.map(row => row.dataset.overviewId)
        )
      ).sort(),
      recommendations.map(rule => rule.id).sort()
    )
    await page.click('#all-rules [data-rule]')
    assert.equal(await page.$eval('#rule-dialog', dialog => dialog.open), true)
    assert.match(
      await page.$eval('#dialog-body', node => node.textContent),
      /不一致 testcase/
    )
    await page.click('#close-dialog')
    for (const width of [1440, 390]) {
      await page.setViewport({ width, height: 900 })
      assert.equal(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth
        ),
        false
      )
      await page.focus('#all-rules tr:has(.priority-recommended) [data-rule]')
      await page.keyboard.press('Enter')
      assert.equal(
        await page.$eval('#rule-dialog', dialog => dialog.open),
        true
      )
      const text = await page.$eval('#dialog-body', node => node.textContent)
      assert.match(text, /值得實作回報/)
      assert.match(text, /目前沒有此規則的 FreeGo 測項回報資料/)
      assert(!/null|undefined|NaN|沒有不一致 testcase/.test(text))
      assert.equal(
        await page.$$eval('#dialog-body tbody tr', rows => rows.length),
        9
      )
      await page.click('#close-dialog')
    }
    await page.click('#priority-count-unassessed')
    await checkOverview(categoryRules('unassessed'), 'unassessed')
    assert.match(
      await page.$eval('#all-rules', node => node.textContent),
      /無回報資料/
    )
    await page.click('#all-rules [data-rule]')
    assert.match(
      await page.$eval('#dialog-body', node => node.textContent),
      /待評估/
    )
    await page.click('#close-dialog')
    await page.click('#clear-overview-filters')
    await checkOverview(overview.rules)
    for (const [priority, label] of [
      ['high', '高'],
      ['medium', '中'],
      ['low', '低']
    ]) {
      assert.equal(
        await page.$eval(
          `#priority-count-${priority}`,
          node => node.textContent
        ),
        `${label}：${priorityCounts[priority]} 項`
      )
    }
    console.log(
      `PASS: recommendation cards removed, table recommendations retained, priority counts ${JSON.stringify(priorityCounts)} unchanged by filtering`
    )
    await page.click('[data-tab="peers"]')
    const freegoButton = '#filter-freego-consistent'
    const peersButton = '#filter-peers-consistent'
    const clearButton = '#clear-matrix-filters'
    const freegoMatches = matrix.filter(
      rule => rule.statuses[0] === 'consistent'
    )
    const peerMatches = matrix.filter(
      rule =>
        rule.statuses.slice(1).filter(status => status === 'consistent')
          .length >= 5
    )
    const bothMatches = peerMatches.filter(
      rule => rule.statuses[0] === 'consistent'
    )
    async function checkFiltered(expected, freego, peers) {
      assert.deepEqual(
        await page.$$eval('.rule-testcase-count', badges =>
          badges.map(badge => badge.textContent)
        ),
        expected.map(
          rule =>
            `測項數：${rule.testcaseCount === null ? '未提供' : rule.testcaseCount + ' 筆'}`
        )
      )
      assert.deepEqual(
        await page.$$eval('.consistency-item', rows =>
          rows.map(row => row.dataset.actId)
        ),
        expected.map(rule => rule.id)
      )
      assert.equal(
        await page.$eval(freegoButton, button =>
          button.getAttribute('aria-pressed')
        ),
        String(freego)
      )
      assert.equal(
        await page.$eval(peersButton, button =>
          button.getAttribute('aria-pressed')
        ),
        String(peers)
      )
      assert.equal(
        await page.$eval(clearButton, button => button.disabled),
        !freego && !peers
      )
      assert.match(
        await page.$eval('#matrix-filter-count', node => node.textContent),
        new RegExp('顯示 ' + expected.length + ' / ' + matrix.length + ' 條')
      )
      assert.equal(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth
        ),
        false
      )
    }
    for (const width of [1440, 390]) {
      await page.setViewport({ width, height: 900 })
      assert.equal(
        await page.$$eval('.consistency-item', rows => rows.length),
        matrix.length
      )
      assert.equal(
        await page.$$eval('.rule-standards', rows => rows.length),
        matrix.length
      )
      assert.equal(
        await page.$$eval('[data-report-group="2"]', rows => rows.length),
        unreported.length
      )
      assert.equal(
        await page.$$eval(
          '[data-report-group="2"] .tool-status .not-reported',
          badges => badges.length
        ),
        unreported.length * 10
      )
      assert.equal(
        await page.$$eval(
          '.rule-page-link',
          links =>
            links.filter(
              link =>
                !link.href.startsWith(
                  'https://www.w3.org/WAI/standards-guidelines/act/rules/'
                )
            ).length
        ),
        0
      )
      assert.equal(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth
        ),
        false
      )
      await checkFiltered(matrix, false, false)
      await page.click(freegoButton)
      await checkFiltered(freegoMatches, true, false)
      await page.click(peersButton)
      await checkFiltered(bothMatches, true, true)
      await page.click(freegoButton)
      await checkFiltered(peerMatches, false, true)
      await page.click(peersButton)
      await checkFiltered(matrix, false, false)
      await page.focus(peersButton)
      await page.keyboard.press('Space')
      await checkFiltered(peerMatches, false, true)
      await page.click('[data-tab="overview"]')
      await page.click('[data-tab="peers"]')
      await checkFiltered(peerMatches, false, true)
      await page.focus(freegoButton)
      await page.keyboard.press('Enter')
      await checkFiltered(bothMatches, true, true)
      await page.click(clearButton)
      await checkFiltered(matrix, false, false)
    }
    // Exercise the threshold and empty state even when live report data changes.
    const synthetic = data(dashboard)
    synthetic.ruleMatrix = [
      ['four-plus-freego', 'consistent', 4],
      ['five-peers', 'partial', 5],
      ['six-peers', 'not-reported', 6]
    ].map(([id, freego, count]) => ({
      ...matrix[0],
      id,
      statuses: [
        freego,
        ...Array.from({ length: 9 }, (_, index) =>
          index < count ? 'consistent' : 'partial'
        )
      ]
    }))
    const fixturePage = await browser.newPage()
    fixturePage.on('pageerror', error => errors.push(error.message))
    try {
      await fixturePage.setContent(
        dashboard.replace(
          /const DATA = (.*);/,
          () =>
            'const DATA = ' +
            JSON.stringify(synthetic).replace(/</g, '\\u003c') +
            ';'
        )
      )
      await fixturePage.click('[data-tab="peers"]')
      await fixturePage.click(peersButton)
      assert.deepEqual(
        await fixturePage.$$eval('.consistency-item', rows =>
          rows.map(row => row.dataset.actId)
        ),
        ['five-peers', 'six-peers']
      )
      await fixturePage.click(freegoButton)
      assert.equal(
        await fixturePage.$$eval('.consistency-item', rows => rows.length),
        0
      )
      assert.match(
        await fixturePage.$eval(
          '#consistency-list .empty',
          node => node.textContent
        ),
        /沒有符合條件/
      )
      assert.match(
        await fixturePage.$eval(
          '#matrix-filter-count',
          node => node.textContent
        ),
        /顯示 0 \/ 3 條/
      )
      assert.equal(
        await fixturePage.$eval(clearButton, button => button.disabled),
        false
      )
      await fixturePage.click(clearButton)
      assert.equal(
        await fixturePage.$$eval('.consistency-item', rows => rows.length),
        3
      )
    } finally {
      await fixturePage.close()
    }
    console.log(
      `PASS: matrix filters (FreeGo ${freegoMatches.length}, peers >=5 ${peerMatches.length}, both ${bothMatches.length}), toggle/clear, keyboard, empty state and 4/5/6-peer boundary`
    )
    await page.click('[data-tab="technology"]')
    assert.equal(
      await page.$$eval('#technology-stack tr', rows => rows.length),
      10
    )
    const expectedTechnology = overview.technologyStack.map(tool => {
      const index = overview.matrixTools.indexOf(tool.name)
      assert(index >= 0)
      const count = matrix.filter(
        rule => rule.statuses[index] === 'consistent'
      ).length
      const rate = Math.round((count / matrix.length) * 1000) / 10
      return {
        name: tool.name,
        rate: `${rate}%`,
        count: `${count} / ${matrix.length} 條`,
        columns: 7
      }
    })
    for (const width of [1440, 390]) {
      await page.setViewport({ width, height: 900 })
      assert.deepEqual(
        await page.$$eval('#technology-stack tr', rows =>
          rows.map(row => ({
            name: row.querySelector('.tool-cell').textContent,
            rate: row.querySelector('.tool-consistency strong').textContent,
            count: row.querySelector('.tool-consistency span').textContent,
            columns: row.cells.length
          }))
        ),
        expectedTechnology
      )
      assert.equal(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth
        ),
        false
      )
    }
    console.log(
      'PASS: all ten technology consistency rates use consistent-only / 87, with exact counts at desktop/mobile widths'
    )
    assert.deepEqual(errors, [])
    console.log(
      `PASS: overview ${overview.rules.length} rules, rule consistency ${expectedRate}%, ${recommendations.length} implementation recommendations; matrix ${matrix.length} rules (${unreported.length} all-unreported), 10 tools, filters/dialog/tabs, desktop/mobile, no JS errors`
    )
    console.log(`Browser: ${await browser.version()}`)
  } finally {
    Object.assign(pkg.config, originalConfig)
    try {
      if (browser) await browser.close()
    } finally {
      try {
        await Promise.all(servers.map(close))
      } finally {
        fs.rmSync(temp, { recursive: true, force: true })
      }
    }
  }
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
