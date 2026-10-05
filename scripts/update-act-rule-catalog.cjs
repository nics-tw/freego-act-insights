const fs = require('node:fs')
const path = require('node:path')
const axios = require('axios')
const puppeteer = require('puppeteer')

const SOURCE = 'https://www.w3.org/WAI/standards-guidelines/act/rules/'

async function main() {
  const { data: html } = await axios.get(SOURCE, { timeout: 30000 })
  const browser = await puppeteer.launch()
  let rules
  try {
    const page = await browser.newPage()
    await page.setJavaScriptEnabled(false)
    await page.setRequestInterception(true)
    page.on('request', request => request.abort())
    await page.setContent(html)
    rules = await page.evaluate(() => {
      const rulesById = new Map()
      const headings = [
        ...document.querySelectorAll('main h2, main h3, main h4')
      ]
      for (const item of document.querySelectorAll(
        'li.act-rule[data-status]'
      )) {
        const link = item.querySelector('a[href*="/act/rules/"]')
        const href = link?.getAttribute('href')
        const id = href?.match(/\/rules\/([a-z0-9]{6})\//)?.[1]
        if (!id) continue
        const heading = headings
          .filter(
            node =>
              node.compareDocumentPosition(link) &
              Node.DOCUMENT_POSITION_FOLLOWING
          )
          .reverse()
          .find(node =>
            /^\d+\.\d+\.\d+\s|^ARIA Rules$/.test(node.textContent.trim())
          )
        const criterion = heading?.textContent
          .trim()
          .match(/^\d+\.\d+\.\d+/)?.[0]
        if (!rulesById.has(id)) {
          const name = [...link.childNodes]
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .map(node => node.textContent)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim()
          rulesById.set(id, {
            id,
            name,
            url: new URL(href, 'https://www.w3.org').href,
            status: item.dataset.status,
            criteria: [],
            aria: false
          })
        }
        const rule = rulesById.get(id)
        if (rule.status !== item.dataset.status)
          throw new Error(`Conflicting status: ${id}`)
        if (criterion && !rule.criteria.includes(criterion))
          rule.criteria.push(criterion)
        if (heading?.textContent.trim() === 'ARIA Rules') rule.aria = true
      }
      return [...rulesById.values()].sort((a, b) => a.id.localeCompare(b.id))
    })
  } finally {
    await browser.close()
  }
  if (
    !rules.length ||
    rules.some(
      rule =>
        !rule.name ||
        !['approved', 'proposed', 'deprecated'].includes(rule.status)
    )
  ) {
    throw new Error(
      'Unexpected W3C rule index format; existing catalog was not changed'
    )
  }
  const catalog = {
    source: SOURCE,
    retrievedAt: new Date().toISOString(),
    scope:
      'All entries in W3C All ACT Rules, including A/AA/AAA, ARIA, proposed and deprecated rules; deduplicated by ACT Rule ID.',
    rules
  }
  const output = path.join(__dirname, '../docs/act-rule-catalog.json')
  fs.writeFileSync(output, JSON.stringify(catalog, null, 2) + '\n')
  console.log(
    JSON.stringify(
      {
        total: rules.length,
        counts: rules.reduce((counts, rule) => {
          counts[rule.status] = (counts[rule.status] || 0) + 1
          return counts
        }, {})
      },
      null,
      2
    )
  )
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
