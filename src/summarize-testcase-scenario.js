'use strict'

const DIRECT_ATTRIBUTE_RULES = {
  '5c01ea': ['role'],
  '6cfa84': ['aria-hidden'],
  '674b10': ['role'],
  a25f45: ['headers'],
  bf051a: ['lang'],
  de46e4: ['lang']
}

function normalizeText(value) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncate(value, length = 48) {
  return value.length > length ? `${value.slice(0, length)}…` : value
}

function parseAttributes(source) {
  const attributes = new Map()
  const pattern = /([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g
  let match
  while ((match = pattern.exec(source))) {
    const value =
      match[2] !== undefined
        ? match[2]
        : match[3] !== undefined
          ? match[3]
          : match[4] !== undefined
            ? match[4]
            : ''
    attributes.set(match[1].toLowerCase(), value)
  }
  return attributes
}

function elementsWithAttribute(html, attribute) {
  const elements = []
  const pattern = /<([a-z][\w:-]*)\b([^>]*)>/gi
  let match
  while ((match = pattern.exec(html))) {
    const attributes = parseAttributes(match[2])
    if (attributes.has(attribute)) {
      elements.push({ tag: match[1].toLowerCase(), attributes })
    }
  }
  return elements
}

function summarizeTitle(html) {
  const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)]
  if (titles.length !== 1) return null
  const text = normalizeText(titles[0][1])
  return text
    ? `文件包含標題「${truncate(text)}」。`
    : '文件的 title 元素沒有文字內容。'
}

function summarizeDirectAttribute(ruleId, html) {
  const preferredAttributes = DIRECT_ATTRIBUTE_RULES[ruleId]
  if (!preferredAttributes) return null

  for (const attribute of preferredAttributes) {
    const candidates = elementsWithAttribute(html, attribute)
    if (candidates.length !== 1) continue
    const candidate = candidates[0]
    const value = candidate.attributes.get(attribute)
    const detail =
      value === ''
        ? `包含 ${attribute} 屬性`
        : `將 ${attribute} 設為「${truncate(value)}」`
    return `頁面中的 <${candidate.tag}> 元素${detail}。`
  }
  return null
}

function summarizeAriaAttributes(html, includeMissing = false) {
  const roleElements = elementsWithAttribute(html, 'role')
  if (roleElements.length !== 1) return null
  const element = roleElements[0]
  const role = element.attributes.get('role')
  const ariaAttributes = [...element.attributes]
    .filter(([name]) => name.startsWith('aria-'))
    .map(([name, value]) => `${name}="${truncate(value)}"`)

  if (ariaAttributes.length === 0) {
    return includeMissing
      ? `頁面中的 <${element.tag}> 元素設為 role="${truncate(role)}"，且未設定 ARIA 狀態或屬性。`
      : null
  }
  return `頁面中的 <${element.tag}> 元素設為 role="${truncate(role)}"，並使用 ${ariaAttributes.join('、')}。`
}

function summarizeTestcaseScenario({ ruleId, html }) {
  if (ruleId === '2779a5') return summarizeTitle(html)
  if (ruleId === '4e8ab6') return summarizeAriaAttributes(html, true)
  if (ruleId === '5f99a7' || ruleId === '6a7281')
    return summarizeAriaAttributes(html)
  return summarizeDirectAttribute(ruleId, html)
}

module.exports = { summarizeTestcaseScenario }
