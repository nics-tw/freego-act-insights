'use strict'

const fs = require('fs')
const path = require('path')
const { buildRuleMatrix } = require('../src/build-rule-matrix')
const {
  buildImprovementOverview
} = require('../src/build-improvement-overview')
const actCatalog = require('../docs/act-rule-catalog.json')
const actTestcaseCounts = require('../docs/act-testcase-counts.json')
const {
  DETECTION_CODE_WCAG_MAP
} = require('../src/generate-implementation-report')
const {
  summarizeTestcaseScenario
} = require('../src/summarize-testcase-scenario')

const ROOT = path.join(__dirname, '..')
const REPORTS_DIR = path.join(ROOT, 'tools-act-report')
const OUTPUT_DIR = path.join(ROOT, 'reports')
const CONSISTENCY_PATH = path.join(OUTPUT_DIR, 'freego-consistency.json')
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'freego-improvement-report.html')
const DETECTION_CODE_LINKS_PATH = path.join(
  ROOT,
  'docs',
  'freego-detection-code-links.md'
)

const TOOL_FILES = [
  ['AccessLint', 'accesslint-core-0.8.8.md'],
  ['Alfa', 'alfa-0.114.3.md'],
  ['axe-core', 'axe-core-4.10.2.md'],
  ['Equal Access', 'equal-access-3.1.42.md'],
  ['QualWeb', 'qualweb-3.0.0.md'],
  ['SortSite', 'sortsite-6.55.md'],
  ['Total Validator', 'total-validator-browser-17.4.0.md'],
  ['UsableNet AQA', 'usablenet-aqa-auto-2.5.1.md'],
  ['Webmate', 'webmate-accessibility-workbench.md']
]

const ACT_RULE_NAMES_ZH = {
  '0va7u6': 'HTML 圖片不包含文字',
  '1ea59c': '影片元素的視覺內容具有口述影像',
  '1ec09b': '影片元素的視覺內容具有嚴格的無障礙替代內容',
  '5b7ae0': 'HTML 頁面的 lang 與 xml:lang 屬性值相符',
  '7677a9': '裝置動作引發的內容變更也可透過使用者介面操作',
  '80af7b': '可聚焦元素不會造成鍵盤陷阱',
  '9bd38c': '以視覺特徵指示的內容具有替代說明',
  '9eb3f6': '圖片檔名作為圖片的無障礙名稱',
  a1b64e: '可聚焦元素可透過標準導覽方式離開鍵盤陷阱',
  ab4d13: '影片元素內容是文字的媒體替代內容',
  c249d5: '可停用裝置動作引發的內容變更',
  c5a4ea: '影片元素的視覺內容具有無障礙替代內容',
  eac66b: '影片元素的音訊內容具有無障礙替代內容',
  ebe86a: '可聚焦元素可透過非標準導覽方式離開鍵盤陷阱',
  efbfc7: '自動變更的文字內容可暫停、停止或隱藏',
  f51b46: '影片元素的音訊內容具有字幕',
  ffbc54: '鍵盤快捷鍵不僅使用可列印字元',
  in6db8: 'ARIA 必要的 ID 參照存在',
  '047fe0': '文件具有非重複內容的標題',
  '09o5cg': '文字符合增強對比度',
  '0ssw9k': '可捲動內容可透過循序焦點導覽到達',
  '1a02b0': '影片元素的音訊與視覺內容具有逐字稿',
  '23a2a8': '圖片具有非空白的無障礙名稱',
  '24afc2': '樣式屬性的重要字距足夠寬',
  '2779a5': 'HTML 頁面具有非空白的標題',
  '2eb176': '音訊元素內容具有逐字稿',
  '2ee8b8': '可見標籤是無障礙名稱的一部分',
  '2t408d': 'HTML 頁面標題具有描述性',
  '2t702h': '摘要元素具有非空白的無障礙名稱',
  '307n5z': '具有展示型子元素的元素不包含可聚焦內容',
  '36b590': '錯誤訊息描述無效的表單欄位值',
  '3e12e1': '重複內容區塊可以收合',
  '46ca7f': '標示為裝飾性的元素不會暴露於無障礙樹',
  '4b1c6c': '無障礙名稱相同的 iframe 元素具有相同用途',
  '4c31df': '自動播放的音訊或影片元素具有控制機制',
  '4e8ab6': '具有 role 屬性的元素包含必要的狀態與屬性',
  '59796f': '圖片按鈕具有非空白的無障礙名稱',
  '59br37': '放大後的文字節點不會被 CSS overflow 裁切',
  '5c01ea': 'ARIA 狀態或屬性可用於該元素',
  '5effbb': '連結在其脈絡中具有描述性',
  '5f99a7': 'ARIA 屬性已在 WAI-ARIA 中定義',
  '674b10': 'role 屬性具有有效值',
  '6a7281': 'ARIA 狀態或屬性具有有效值',
  '6cfa84': '具有 aria-hidden 的元素在循序焦點導覽中不包含內容',
  '73f2c2': 'autocomplete 屬性具有有效值',
  '78fd32': '樣式屬性的重要行高足夠寬',
  '7d6734': '具有明確角色的 SVG 元素具有非空白的無障礙名稱',
  '80f0bf': '音訊或影片元素避免自動播放音訊',
  '8fc3b6': '呈現非文字內容的 object 元素具有非空白的無障礙名稱',
  '97a4e1': '按鈕具有非空白的無障礙名稱',
  '9e45ec': '樣式屬性的重要字詞間距足夠寬',
  a25f45: '儲存格的 headers 屬性參照同一個表格元素中的儲存格',
  aaa1bf: '自動播放的音訊或影片元素沒有超過三秒的音訊',
  afb423: '音訊元素內容是文字的媒體替代內容',
  afw4f7: '文字符合最低對比度',
  aizyf1: '連結具有描述性',
  akn7bn: '包含互動元素的 iframe 未從 Tab 順序中排除',
  b20e66: '無障礙名稱相同的連結具有相同用途',
  b33eff: '頁面方向未受 CSS transform 限制',
  b40fd1: '文件具有包含非重複內容的地標',
  b49b2e: '標題具有描述性',
  b4f0c3: 'meta viewport 允許縮放',
  b5c3f8: 'HTML 頁面具有 lang 屬性',
  bc4a75: 'ARIA 元素包含必要的擁有元素',
  bc659a: 'meta 元素沒有延遲重新整理',
  bf051a: 'HTML 頁面的 lang 屬性具有有效的語言標籤',
  bisz58: 'meta 元素沒有延遲重新整理例外',
  c3232f: '影片元素的純視覺內容具有無障礙替代內容',
  c487ae: '連結具有非空白的無障礙名稱',
  c4a8a4: 'HTML 頁面標題具有描述性',
  cae760: 'iframe 元素具有非空白的無障礙名稱',
  cc0f0a: '表單欄位標籤具有描述性',
  cf77f2: '可略過重複內容區塊',
  d0f69e: '表格標題儲存格已指派對應的資料儲存格',
  d7ba54: '影片元素的純視覺內容具有替代音軌',
  de46e4: '具有 lang 屬性的元素使用有效的語言標籤',
  e086e5: '表單欄位具有非空白的無障礙名稱',
  e7aa44: '音訊元素內容具有文字替代內容',
  e88epe: '不在無障礙樹中的圖片為裝飾性圖片',
  ee13b5: '影片元素的純視覺內容具有逐字稿',
  fd26cf: '影片元素的純視覺內容是文字的媒體替代內容',
  fd3a94: '無障礙名稱與脈絡相同的連結具有相同用途',
  ff89c9: 'ARIA 元素具有必要的脈絡角色',
  ffd0e9: '標題具有非空白的無障礙名稱',
  kb1m8s: '未在禁止使用的位置使用 ARIA 全域屬性',
  m6b1q3: '選單項目具有非空白的無障礙名稱',
  off6ek: 'HTML 元素的語言子標籤與語言相符',
  oj04fd: '循序焦點順序中的元素具有可見焦點',
  qt1vmo: '圖片的無障礙名稱具有描述性',
  ucwvc8: 'HTML 頁面的語言子標籤與預設語言相符',
  ye5d6e: '文件具有將焦點移至非重複內容的機制'
}

const DETECTION_CODE_DESCRIPTIONS = {
  HM1110100C: '圖片替代文字',
  HM1110101C: '連結的無障礙名稱',
  HM1110104C: '圖片按鈕的無障礙名稱',
  HM1110105C: 'object 元素的替代內容',
  HM1110106C: '裝飾性圖片',
  HM1130101C: '表格標題與資料儲存格關聯',
  HM1130104C: '表單欄位與按鈕名稱',
  HM1240200C: '網頁標題',
  HM1240400C: '相同名稱連結的一致用途',
  HM1240401C: '連結目的',
  HM1310100C: '網頁語言聲明',
  HM1410200C: 'ARIA 名稱、角色、狀態與屬性',
  HM1410201C: 'iframe 的無障礙名稱與用途',
  HM2310200C: '頁面局部內容的語言聲明',
  HM3240900C: '僅由連結文字判斷連結目的',
  HM3241000C: '區段標題',
  HM3330500C: '操作說明與協助資訊'
}

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function parseDetectionCodeLinks(markdown) {
  const links = new Map()
  const rowPattern =
    /^\|\s*`(HM\d+C)`\s*\|[^\n]*?\|[^\n]*?\|\s*(https:\/\/accessibility\.moda\.gov\.tw\/[^\s|]+)\s*\|$/gm
  let match
  while ((match = rowPattern.exec(markdown))) {
    if (links.has(match[1]))
      throw new Error(`Duplicate detection code link: ${match[1]}`)
    links.set(match[1], match[2])
  }
  return links
}

function testcaseScenario(ruleId, url) {
  const testcaseId = path.basename(new URL(url).pathname, '.html')
  const testcasePath = path.join(
    ROOT,
    'examples',
    'testcases',
    ruleId,
    `${testcaseId}.html`
  )
  if (!fs.existsSync(testcasePath)) return null
  return summarizeTestcaseScenario({ ruleId, html: read(testcasePath) })
}

function parseToolRules(markdown) {
  const rules = new Map()
  const tablePattern =
    /\|\s*\d+\s*\|[^\n]*?\/rules\/([a-z0-9]+)(?:\/proposed)?\/[^\n]*?\|\s*([^|\n]*(?:Consistent|Partial)[^|\n]*)\|/gi
  let match
  while ((match = tablePattern.exec(markdown))) {
    rules.set(match[1], /Consistent/i.test(match[2]) ? 'consistent' : 'partial')
  }

  const sectionPattern =
    /\*\*ACT Rule ID:\*\*\s*(?:\[)?`?([a-z0-9]+)`?[^\n]*[\s\S]*?\*\*一致性:\*\*\s*([^\n]+)/gi
  while ((match = sectionPattern.exec(markdown))) {
    rules.set(match[1], /Consistent/i.test(match[2]) ? 'consistent' : 'partial')
  }
  return rules
}

function plainMarkdown(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`/g, '')
    .trim()
}

function parseToolMetadata(markdown, displayName) {
  const metadata = { name: displayName }
  const fields = {
    版本: 'version',
    開發者: 'developer',
    開發語言: 'language',
    工具類型: 'type',
    標準: 'standard'
  }
  const rowPattern = /^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/gm
  let match
  while ((match = rowPattern.exec(markdown))) {
    const key = fields[match[1].trim()]
    if (key) metadata[key] = plainMarkdown(match[2])
  }
  return metadata
}

function parseRuleNames(markdown) {
  const names = new Map()
  const tablePattern =
    /\|\s*\d+\s*\|\s*\[([^\]]+)\]\([^\n]+?\/rules\/([a-z0-9]+)(?:\/proposed)?\//gi
  let match
  while ((match = tablePattern.exec(markdown))) names.set(match[2], match[1])

  const sectionPattern =
    /^###\s+規則\s+\d+：([^\n]+)[\s\S]*?\*\*ACT Rule ID:\*\*\s*(?:\[)?`?([a-z0-9]+)`?/gim
  while ((match = sectionPattern.exec(markdown)))
    names.set(match[2], match[1].trim())
  return names
}

function parseRuleLinks(markdown) {
  const links = new Map()
  const linkPattern =
    /https:\/\/www\.w3\.org\/WAI\/standards-guidelines\/act\/rules\/([a-z0-9]+)(?:\/proposed)?\//gi
  let match
  while ((match = linkPattern.exec(markdown))) {
    if (!links.has(match[1])) links.set(match[1], match[0])
  }
  return links
}

function parseFreegoRules(markdown) {
  const rules = new Map()
  const rowPattern =
    /\|\s*\d+\s*\|\s*\[([^\]]+)\]\([^\n]+?\/rules\/([a-z0-9]+)(?:\/proposed)?\/\)\s*\|[^\n]*?\|\s*((?:`HM[^`]+`(?:,\s*)?)+)\s*\|\s*([^|]+)\|/gi
  let match
  while ((match = rowPattern.exec(markdown))) {
    rules.set(match[2], {
      id: match[2],
      name: match[1],
      nameZh: ACT_RULE_NAMES_ZH[match[2]] || match[1],
      codes: [...match[3].matchAll(/`([^`]+)`/g)].map(code => code[1]),
      status: /Consistent/i.test(match[4]) ? 'consistent' : 'partial'
    })
  }
  return rules
}

function aggregateRules(consistency, freegoRules, peers, detectionCodeLinks) {
  const grouped = new Map()
  for (const detail of consistency.details) {
    if (!grouped.has(detail.ruleId)) grouped.set(detail.ruleId, [])
    grouped.get(detail.ruleId).push(detail)
  }

  return [...grouped.entries()]
    .map(([ruleId, details]) => {
      const metadata = freegoRules.get(ruleId) || {
        id: ruleId,
        name: ruleId,
        nameZh: ACT_RULE_NAMES_ZH[ruleId] || ruleId,
        codes: [...new Set(details.map(detail => detail.code))],
        status: 'partial'
      }
      const falseNegatives = details.filter(
        detail => detail.consistency === 'inconsistent-invalid'
      ).length
      const falsePositives = details.filter(
        detail => detail.consistency === 'inconsistent-FP'
      ).length
      const consistent = details.filter(
        detail => detail.consistency === 'consistent'
      ).length
      const notImplemented = details.filter(
        detail => detail.consistency === 'not-implemented'
      ).length
      const peerResults = peers.map(peer => ({
        tool: peer.name,
        status: peer.rules.get(ruleId) || 'not-reported'
      }))
      const reportedPeers = peerResults.filter(
        result => result.status !== 'not-reported'
      )
      const consistentPeers = reportedPeers.filter(
        result => result.status === 'consistent'
      ).length
      const partialPeers = reportedPeers.filter(
        result => result.status === 'partial'
      ).length
      const unreportedPeers = peerResults.length - reportedPeers.length
      const peerConfidence =
        reportedPeers.length === 0
          ? 0
          : Math.round((consistentPeers / reportedPeers.length) * 100)
      const accuracy = Math.round((consistent / details.length) * 100)
      const peerMaturity = Math.round(
        ((consistentPeers + partialPeers * 0.5) / peerResults.length) * 100
      )
      const priorityScore =
        metadata.status === 'consistent'
          ? 0
          : Math.round(accuracy * 0.6 + peerMaturity * 0.4)
      const priority =
        priorityScore >= 80 ? 'high' : priorityScore >= 55 ? 'medium' : 'low'
      return {
        ...metadata,
        total: details.length,
        consistent,
        falseNegatives,
        falsePositives,
        notImplemented,
        accuracy,
        codeDetails: metadata.codes.map(code => ({
          code,
          description: DETECTION_CODE_DESCRIPTIONS[code] || '國內無障礙檢測碼',
          criteria: DETECTION_CODE_WCAG_MAP[code] || [],
          guideUrl: detectionCodeLinks.get(code)
        })),
        peerConfidence,
        peerCounts: {
          consistent: consistentPeers,
          partial: partialPeers,
          unreported: unreportedPeers
        },
        peerMaturity,
        priorityScore,
        priority,
        peerResults,
        failures: details
          .filter(detail => detail.consistency !== 'consistent')
          .map(detail => ({
            url: detail.url,
            code: detail.code,
            testcaseId: path.basename(new URL(detail.url).pathname, '.html'),
            scenario: testcaseScenario(ruleId, detail.url),
            expected: detail.actExpected,
            actual: String(detail.freegoOutcome).replace(/^earl:/, ''),
            type: detail.consistency
          }))
      }
    })
    .sort((left, right) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return (
        priorityOrder[left.priority] - priorityOrder[right.priority] ||
        right.priorityScore - left.priorityScore ||
        right.accuracy - left.accuracy ||
        left.id.localeCompare(right.id)
      )
    })
    .map(({ priorityScore: _priorityScore, ...rule }) => rule)
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

function renderHtml(data) {
  return `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>FreeGo ACT Insights｜FreeGo ACT 規則分析與改善報告</title>
  <style>
    :root { --ink:#17201d; --muted:#66706b; --paper:#f4f5f0; --surface:#fff; --line:#d9ddd7; --red:#c83d32; --red-soft:#f8e5e1; --amber:#c17918; --amber-soft:#f7ecd7; --green:#197052; --green-soft:#dff0e8; --blue:#23668d; --shadow:0 12px 30px rgba(23,32,29,.08); }
    * { box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { margin:0; color:var(--ink); background-color:var(--paper); background-image:linear-gradient(rgba(23,32,29,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(23,32,29,.035) 1px,transparent 1px); background-size:24px 24px; font-family:"Avenir Next","PingFang TC","Noto Sans TC",sans-serif; font-size:17px; letter-spacing:0; }
    button,input,select { font:inherit; letter-spacing:0; }
    button { cursor:pointer; }
    .app-header { background:var(--ink); color:#fff; border-bottom:5px solid var(--red); }
    .header-inner,.main { width:min(1440px,calc(100% - 40px)); margin:auto; }
    .header-inner { min-height:104px; display:flex; align-items:center; justify-content:space-between; gap:24px; }
    .brand { display:flex; align-items:center; gap:15px; }
    .brand-mark { width:50px; height:50px; display:grid; place-items:center; background:var(--red); color:#fff; font-family:Georgia,serif; font-size:25px; font-weight:700; border-radius:4px; }
    .brand h1 { margin:0; font-family:Georgia,"Noto Serif TC",serif; font-size:28px; font-weight:600; }
    .brand > div:last-child { min-width:0; }
    .brand-mark { flex-shrink:0; }
    .brand p { margin:5px 0 0; color:#bcc5c0; font-size:15px; }
    .header-meta { text-align:right; color:#d5dcd8; font-size:15px; line-height:1.7; }
    .main { padding:28px 0 56px; }
    .tabs { display:flex; gap:4px; border-bottom:1px solid var(--line); margin-bottom:24px; overflow:auto; }
    .tab { border:0; background:transparent; padding:12px 18px; color:var(--muted); white-space:nowrap; border-bottom:3px solid transparent; }
    .tab[aria-selected="true"] { color:var(--ink); border-color:var(--red); font-weight:700; }
    .panel { display:none; }
    .panel.active { display:block; animation:enter .28s ease both; }
    @keyframes enter { from { opacity:0; transform:translateY(6px); } }
    .summary-grid { display:grid; grid-template-columns:1.4fr repeat(3,1fr); gap:14px; }
    .summary-card { min-height:154px; padding:20px; background:var(--surface); border:1px solid var(--line); border-radius:6px; box-shadow:var(--shadow); }
    .summary-card.lead { background:var(--ink); color:#fff; display:flex; align-items:center; gap:22px; }
    .metric-label { color:var(--muted); font-size:15px; font-weight:700; }
    .lead .metric-label { color:#bdc7c1; }
    .metric-value { margin-top:10px; font-family:Georgia,serif; font-size:40px; line-height:1; }
    .metric-foot { margin-top:12px; color:var(--muted); font-size:14px; }
    .lead .metric-foot { color:#bdc7c1; }
    .donut { width:92px; aspect-ratio:1; border-radius:50%; display:grid; place-items:center; flex:0 0 auto; background:conic-gradient(var(--green) 0 var(--value),#35413c var(--value) 100%); }
    .donut::after { content:""; width:64px; aspect-ratio:1; border-radius:50%; background:var(--ink); }
    .section-head { margin:30px 0 14px; display:flex; align-items:end; justify-content:space-between; gap:16px; }
    .section-head h2 { margin:0; font-family:Georgia,"Noto Serif TC",serif; font-size:24px; }
    .section-head p { margin:5px 0 0; color:var(--muted); font-size:15px; }
    .table-shell { overflow:auto; border:1px solid var(--line); background:var(--surface); box-shadow:var(--shadow); }
    table { width:100%; border-collapse:collapse; font-size:15px; }
    th { position:sticky; top:0; z-index:1; text-align:left; padding:12px 14px; background:#edf0eb; color:#4f5954; border-bottom:1px solid var(--line); white-space:nowrap; }
    td { padding:13px 14px; border-bottom:1px solid #e7e9e5; vertical-align:middle; }
    tbody tr:hover { background:#f8f9f6; }
    .rule-button { border:0; background:transparent; color:var(--blue); padding:0; text-align:left; font-weight:700; }
    .rule-name { display:block; margin-top:4px; color:var(--ink); font-weight:700; max-width:380px; }
    .rule-name-en { display:block; margin-top:3px; color:var(--muted); font-size:13px; font-weight:500; max-width:380px; }
    .badge { display:inline-flex; align-items:center; min-width:54px; justify-content:center; padding:5px 9px; border-radius:999px; font-size:13px; font-weight:800; }
    .partial { color:#86520d; background:var(--amber-soft); } .consistent { color:#155c43; background:var(--green-soft); } .not-reported { color:#59625e; background:#e7eae6; }
    .priority-high { color:#94281f; background:var(--red-soft); }
    .priority-medium { color:#86520d; background:var(--amber-soft); }
    .priority-low { color:#315f79; background:#e2edf3; }
    .priority-recommended { color:#155c43; background:var(--green-soft); white-space:nowrap; }
    .priority-unassessed { color:#59625e; background:#e7eae6; }
    .priority-summary { display:flex; flex-wrap:wrap; align-items:center; gap:10px; margin:0 0 14px; font-size:15px; }
    .priority-filter { min-height:44px; padding:8px 14px; border:2px solid transparent; }
    .priority-filter[aria-pressed="true"] { border-color:currentColor; box-shadow:0 0 0 2px var(--surface); }
    .priority-filter[aria-pressed="true"]::before { content:'✓'; margin-right:6px; }
    .priority-filter:focus-visible { outline:3px solid var(--blue); outline-offset:3px; }
    .rule-button:focus-visible { outline:3px solid var(--blue); outline-offset:4px; }
    .peer-evidence { min-width:150px; }
    .peer-evidence span { display:block; color:var(--muted); font-size:13px; line-height:1.6; white-space:nowrap; }
    .status-inline { margin:0 2px; vertical-align:1px; }
    .outcome { display:inline-flex; min-width:68px; justify-content:center; padding:5px 9px; border:1px solid transparent; border-radius:4px; font-size:14px; font-weight:800; }
    .outcome-passed { color:#115b40; background:#dff0e8; border-color:#9dcdb9; }
    .outcome-failed { color:#8f241d; background:#f8e5e1; border-color:#e3a59e; }
    .outcome-inapplicable { color:#4f5954; background:#edf0eb; border-color:#cbd1cc; }
    .outcome-canttell { color:#82500c; background:#f7ecd7; border-color:#dfc38f; }
    .bar { width:110px; height:7px; background:#e4e7e2; overflow:hidden; border-radius:99px; }
    .bar span { display:block; height:100%; background:var(--green); }
    .number-bad { color:var(--red); font-weight:800; }
    .number-warn { color:var(--amber); font-weight:800; }
    .code { font-family:"SFMono-Regular",Consolas,monospace; font-size:13px; white-space:nowrap; }
    .comparison-section { margin-top:30px; }
    .panel > .comparison-section:first-child { margin-top:0; }
    .comparison-table { min-width:980px; }
    .comparison-table td { min-width:132px; }
    .comparison-table .tool-cell { min-width:180px; font-weight:800; }
    .consistency-list { display:grid; gap:10px; counter-reset:consistency-rule; }
    .matrix-filters { margin:0 0 18px; padding:16px; border:1px solid var(--line); border-radius:6px; background:var(--surface); }
    .matrix-filter-actions { display:flex; flex-wrap:wrap; align-items:center; gap:10px; }
    .matrix-filter-button,.matrix-filter-clear { min-height:44px; padding:9px 14px; border:1px solid #87958d; border-radius:5px; background:#fff; color:var(--ink); font-size:15px; font-weight:700; }
    .matrix-filter-button::before { content:'＋'; margin-right:6px; }
    .matrix-filter-button[aria-pressed="true"] { background:var(--green-soft); color:#155c43; border-color:var(--green); }
    .matrix-filter-button[aria-pressed="true"]::before { content:'✓'; }
    .matrix-filter-button:focus-visible,.matrix-filter-clear:focus-visible { outline:3px solid var(--blue); outline-offset:3px; }
    .matrix-filter-clear { color:var(--blue); border-color:var(--line); }
    .matrix-filter-clear:disabled { color:var(--muted); cursor:default; }
    .matrix-filter-help { margin:12px 0 6px; color:var(--muted); font-size:14px; line-height:1.6; }
    .matrix-filter-count { margin:0; font-size:15px; font-weight:700; }
    .consistency-item { position:relative; display:grid; grid-template-columns:minmax(260px,1fr) minmax(0,2.4fr); overflow:hidden; background:var(--surface); border:1px solid #cbd1cc; border-left:5px solid var(--ink); box-shadow:0 3px 10px rgba(23,32,29,.05); counter-increment:consistency-rule; transition:border-color .16s ease,box-shadow .16s ease,transform .16s ease; }
    .consistency-item:nth-child(even) { background:#f7f8f5; }
    .consistency-item:hover { border-color:#8e9993; box-shadow:0 8px 20px rgba(23,32,29,.1); transform:translateY(-1px); }
    .consistency-rule { padding:16px 18px; border-right:1px solid var(--line); }
    .consistency-rule::before { content:"規則 " counter(consistency-rule); display:block; margin-bottom:8px; color:var(--muted); font-size:11px; font-weight:800; letter-spacing:0; }
    .consistency-rule .rule-name { max-width:none; white-space:normal; }
    .consistency-rule .rule-name-en { max-width:none; }
    .consistency-rule .code { color:var(--blue); }
    .rule-standards { display:flex; flex-wrap:wrap; gap:6px; margin-top:10px; }
    .rule-testcase-meta { display:block; margin-top:10px; }
    .standard-badge { display:inline-flex; align-items:center; padding:4px 8px; border-radius:3px; font-size:12px; font-weight:800; }
    .standard-origin-20 { color:#4e5b55; background:#e7eae6; }
    .standard-origin-21 { color:#86520d; background:var(--amber-soft); }
    .standard-current { color:#155c43; background:var(--green-soft); }
    .rule-page-link { display:block; color:inherit; text-decoration:none; }
    .rule-page-link .code::after { content:" ↗"; }
    .rule-page-link:hover .rule-name,.rule-page-link:focus-visible .rule-name { color:var(--blue); text-decoration:underline; text-underline-offset:3px; }
    .rule-page-link:focus-visible { outline:3px solid var(--blue); outline-offset:5px; border-radius:2px; }
    .consistency-statuses { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); }
    .tool-status { min-width:0; padding:12px; border-right:1px solid #e7e9e5; border-bottom:1px solid #e7e9e5; text-align:center; }
    .tool-status:nth-child(5n) { border-right:0; }
    .tool-status:nth-last-child(-n+5) { border-bottom:0; }
    .tool-name { display:block; min-height:34px; margin-bottom:6px; color:var(--muted); font-size:12px; font-weight:800; line-height:1.4; overflow-wrap:anywhere; }
    .definitions { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:30px 0 20px; }
    .definition { padding:16px 18px; background:#fff; border:1px solid var(--line); border-left:4px solid var(--red); }
    .definition.false-positive { border-left-color:var(--amber); }
    .definition h3 { margin:0 0 6px; font-size:17px; }
    .definition p { margin:0; color:var(--muted); font-size:15px; line-height:1.65; }
    dialog { width:min(840px,calc(100% - 28px)); max-height:86vh; padding:0; overflow:auto; border:0; border-radius:7px; box-shadow:0 24px 80px rgba(0,0,0,.28); }
    dialog::backdrop { background:rgba(16,23,20,.65); }
    .dialog-head { position:sticky; top:0; display:flex; justify-content:space-between; gap:20px; padding:20px 22px; background:var(--ink); color:#fff; z-index:2; }
    .dialog-head h2 { margin:0; font-family:Georgia,serif; font-size:22px; }
    .dialog-title-en { margin-top:5px; color:#bdc7c1; font-size:14px; }
    .icon-button { width:36px; height:36px; border:1px solid #59645f; border-radius:4px; background:transparent; color:#fff; font-size:22px; line-height:1; }
    .dialog-body { padding:22px; }
    .detail-metrics { display:grid; grid-template-columns:repeat(6,1fr); gap:10px; margin-bottom:20px; }
    .detail-metric { padding:12px; background:#f1f3ef; }
    .detail-metric strong { display:block; font-size:22px; }
    .code-explanation { margin:20px 0; padding:16px 18px; background:#f7f8f5; border:1px solid var(--line); }
    .code-explanation h3 { margin:0 0 6px; }
    .code-explanation > p { margin:0 0 12px; color:var(--muted); font-size:15px; line-height:1.6; }
    .code-detail { display:grid; grid-template-columns:120px 1fr; gap:12px; padding:10px 0; border-top:1px solid var(--line); }
    .code-detail:first-of-type { border-top:0; }
    .code-link { color:var(--blue); font-size:14px; font-weight:800; text-decoration-thickness:1px; text-underline-offset:3px; }
    .code-link:hover { text-decoration-thickness:2px; }
    .testcase-id { white-space:normal; overflow-wrap:anywhere; }
    .scenario-summary { min-width:220px; color:#414b46; line-height:1.55; }
    .code-detail strong { font-size:15px; }
    .code-detail span { display:block; color:var(--muted); font-size:14px; line-height:1.55; }
    .failure-list { border:1px solid var(--line); }
    .empty { padding:34px; text-align:center; color:var(--muted); }
    @media (max-width:1100px) { .consistency-statuses { grid-template-columns:repeat(3,minmax(0,1fr)); } .tool-status:nth-child(5n) { border-right:1px solid #e7e9e5; } .tool-status:nth-last-child(-n+5) { border-bottom:1px solid #e7e9e5; } .tool-status:nth-child(3n) { border-right:0; } .tool-status:nth-last-child(-n+1) { border-bottom:0; } }
    @media (max-width:900px) { .summary-grid { grid-template-columns:1fr 1fr; } .summary-card.lead { grid-column:1/-1; } .detail-metrics { grid-template-columns:repeat(3,1fr); } .consistency-item { grid-template-columns:1fr; } .consistency-rule { border-right:0; border-bottom:1px solid var(--line); } }
    @media (max-width:620px) { .header-inner,.main { width:min(100% - 24px,1440px); } .header-inner { align-items:flex-start; padding:20px 0; } .header-meta { display:none; } .brand { gap:10px; } .brand h1 { font-size:21px; white-space:nowrap; } .brand p { font-size:14px; } .brand-mark { width:42px; height:42px; font-size:21px; } .main { padding-top:18px; } .summary-grid { grid-template-columns:1fr; } .summary-card.lead { grid-column:auto; } .section-head { align-items:flex-start; flex-direction:column; } .toolbar,.search { width:100%; min-width:0; } .table-shell table { min-width:1040px; } .definitions { grid-template-columns:1fr; } .detail-metrics { grid-template-columns:1fr 1fr; } .consistency-statuses { grid-template-columns:repeat(2,minmax(0,1fr)); } .tool-status:nth-child(3n) { border-right:1px solid #e7e9e5; } .tool-status:nth-child(2n) { border-right:0; } .tool-status:nth-last-child(-n+2) { border-bottom:0; } .code-detail { grid-template-columns:1fr; gap:3px; } .failure-list table { font-size:14px; } .testcase-list thead { display:none; } .testcase-list table,.testcase-list tbody,.testcase-list tr,.testcase-list td { display:block; width:100%; } .testcase-list tr { padding:12px; border-bottom:1px solid var(--line); } .testcase-list tr:last-child { border-bottom:0; } .testcase-list td { padding:5px 0; border:0; overflow-wrap:anywhere; } .testcase-list td::before { display:block; margin-bottom:2px; color:var(--muted); font-size:12px; font-weight:800; } .testcase-list td:nth-child(1)::before { content:'Testcase ID'; } .testcase-list td:nth-child(2)::before { content:'ACT 預期'; } .testcase-list td:nth-child(3)::before { content:'FreeGo'; } .testcase-list .has-scenarios td:nth-child(2)::before { content:'情境摘要'; } .testcase-list .has-scenarios td:nth-child(3)::before { content:'ACT 預期'; } .testcase-list .has-scenarios td:nth-child(4)::before { content:'FreeGo'; } .scenario-summary { min-width:0; } .scenario-summary:empty { display:none; } }
  </style>
</head>
<body>
  <header class="app-header">
    <div class="header-inner">
      <div class="brand"><div class="brand-mark" aria-hidden="true">FG</div><div><h1 style="white-space:normal">FreeGo ACT 規則分析與改善報告</h1><p>FreeGo ACT Insights · 獨立專案，非 FreeGo 官方產品</p></div></div>
      <div class="header-meta">FreeGo Dec 19 2025<br>資料更新：2026-09-15 · 10 項工具</div>
    </div>
  </header>
  <main class="main">
    <nav class="tabs" aria-label="報告檢視">
      <button class="tab" data-tab="overview" aria-selected="true">改善總覽</button>
      <button class="tab" data-tab="peers" aria-selected="false">規則一致性列表</button>
      <button class="tab" data-tab="technology" aria-selected="false">技術堆疊</button>
    </nav>
    <section id="overview" class="panel active">
      <div class="summary-grid">
        <article class="summary-card lead"><div class="donut" style="--value:${data.ruleSummary.consistencyRate}%" aria-hidden="true"></div><div><div class="metric-label">全部規則一致率</div><div class="metric-value" id="overview-consistency-rate">${data.ruleSummary.consistencyRate}%</div><div class="metric-foot" id="overview-consistency-count">${data.ruleSummary.consistent} / ${data.ruleSummary.total} 條規則達成一致</div><div class="metric-foot">分母包含部分一致與未回報規則，不以測項加權</div></div></article>
        <article class="summary-card"><div class="metric-label">FreeGo 已回報規則</div><div class="metric-value" id="overview-reported">${data.ruleSummary.reported}</div><div class="metric-foot">一致 ${data.ruleSummary.consistent} 條 · 部分一致 ${data.ruleSummary.partial} 條</div></article>
        <article class="summary-card"><div class="metric-label">FreeGo 未回報規則</div><div class="metric-value" id="overview-unreported">${data.ruleSummary.unreported}</div><div class="metric-foot">未回報不等於不支援，也不視為測項失敗</div></article>
        <article class="summary-card"><div class="metric-label">值得實作回報的規則</div><div class="metric-value" id="overview-recommended">${data.ruleSummary.recommended}</div><div class="metric-foot">FreeGo 未回報，且至少 5 項其他工具已一致</div></article>
      </div>
      <div class="definitions" aria-label="漏報與誤報說明">
        <article class="definition"><h3>漏報測項</h3><p>ACT 預期結果為失敗，但 FreeGo 沒有回報失敗的測項。漏報可能使真實的無障礙問題未被發現。</p></article>
        <article class="definition false-positive"><h3>誤報測項</h3><p>ACT 預期結果不是失敗，但 FreeGo 回報失敗的測項。誤報會增加人工檢查與排除問題的成本。</p></article>
      </div>
      <div class="section-head"><div><h2 id="improvement-list-title">規則改善清單</h2><p>先列已回報規則（依原開發優先級），再列值得實作回報及其他待評估規則。未回報規則不推測檢測碼、測項一致率或漏報／誤報數。</p></div></div>
      <div class="priority-summary" role="group" aria-label="優先度與回報狀態篩選">
        <strong>優先度／狀態</strong>
        ${[
          ['high', '高'],
          ['medium', '中'],
          ['low', '低'],
          ['recommended', '值得實作'],
          ['unassessed', '待評估']
        ]
          .map(
            ([priority, label]) =>
              `<button type="button" class="badge priority-filter priority-${priority}" id="priority-count-${priority}" data-overview-filter="${priority}" aria-pressed="false" aria-controls="all-rules">${label}：${data.rules.filter(rule => rule.priority === priority).length} 項</button>`
          )
          .join('')}
        <button type="button" id="clear-overview-filters" class="matrix-filter-clear" aria-controls="all-rules" disabled>清除篩選</button>
      </div>
      <div class="table-shell"><table><thead><tr><th>優先級／建議</th><th>狀態</th><th>ACT 規則</th><th>FreeGo 檢測碼</th><th>測項一致率</th><th>漏報測項</th><th>誤報測項</th><th>同業情報</th></tr></thead><tbody id="all-rules"></tbody></table></div>
    </section>
    <section id="peers" class="panel">
      <section class="comparison-section" aria-labelledby="matrix-title">
        <div class="section-head"><div><h2 id="matrix-title">ACT 規則一致性列表（${data.ruleMatrix.length} 條）</h2></div></div>
        <div class="matrix-filters" role="group" aria-label="規則一致性篩選" aria-describedby="matrix-filter-help">
          <div class="matrix-filter-actions">
            <button type="button" id="filter-freego-consistent" class="matrix-filter-button" aria-pressed="false" aria-controls="consistency-list">FreeGo 已一致</button>
            <button type="button" id="filter-peers-consistent" class="matrix-filter-button" aria-pressed="false" aria-controls="consistency-list">至少 5 項其他工具已一致</button>
            <button type="button" id="clear-matrix-filters" class="matrix-filter-clear" aria-controls="consistency-list" disabled>清除篩選</button>
          </div>
          <p id="matrix-filter-help" class="matrix-filter-help">僅計算「一致」，不包含「部分一致」；其他工具限 FreeGo 以外的 9 項。兩個條件同時開啟時取交集，再按一次可取消單一條件。</p>
          <p id="matrix-filter-count" class="matrix-filter-count" role="status" aria-live="polite" aria-atomic="true"></p>
        </div>
        <div id="consistency-list" class="consistency-list"></div>
      </section>
    </section>
    <section id="technology" class="panel">
      <section class="comparison-section" aria-labelledby="stack-title">
        <div class="section-head"><div><h2 id="stack-title">十項工具技術堆疊</h2><p>資料取自各工具 ACT 實作報告；閉源產品未公開的技術以「官方未公開」標示。</p><p>規則一致率＝達成「一致」的規則數 ÷ 全部 ${data.ruleMatrix.length} 條規則；部分一致與未回報僅計入分母，不以測項加權。</p></div></div>
        <div class="table-shell"><table class="comparison-table"><thead><tr><th>工具</th><th>規則一致率（${data.ruleMatrix.length} 條）</th><th>版本</th><th>開發者</th><th>開發語言／執行環境</th><th>類型</th><th>標準範圍</th></tr></thead><tbody id="technology-stack"></tbody></table></div>
      </section>
    </section>
  </main>
  <dialog id="rule-dialog"><div class="dialog-head"><div><div class="metric-label" id="dialog-id"></div><h2 id="dialog-title"></h2><div class="dialog-title-en" id="dialog-title-en"></div></div><button class="icon-button" id="close-dialog" aria-label="關閉">×</button></div><div class="dialog-body" id="dialog-body"></div></dialog>
  <script>
    const DATA = ${safeJson(data)};
    const statusLabel = value => value === 'consistent' ? '一致' : value === 'partial' ? '部分一致' : '未回報';
    const statusBadge = value => '<span class="badge ' + value + '">' + statusLabel(value) + '</span>';
    const priorityLabel = value => ({ high: '高', medium: '中', low: '低', recommended: '值得實作', unassessed: '待評估' }[value]);
    const priorityBadge = rule => '<span class="badge priority-' + rule.priority + '">' + priorityLabel(rule.priority) + '</span>';
    const outcomeLabel = value => ({ passed: '通過', failed: '失敗', inapplicable: '不適用', cantTell: '無法判定', untested: '未測試' }[value] || value);
    const outcome = value => '<span class="outcome outcome-' + String(value).toLowerCase() + '">' + outcomeLabel(value) + '</span>';
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
    const ruleLink = rule => '<button class="rule-button" data-rule="' + rule.id + '"><span class="code">' + rule.id + '</span><span class="rule-name">' + rule.nameZh + '</span><span class="rule-name-en">' + rule.name + '</span></button>';
    const row = rule => '<tr data-overview-id="' + rule.id + '"><td>' + priorityBadge(rule) + '</td><td>' + statusBadge(rule.status) + '</td><td>' + ruleLink(rule) + '</td><td class="code">' + (rule.codes.join('<br>') || '未提供') + '</td><td>' + (rule.hasTestData ? '<div class="bar"><span style="width:' + rule.accuracy + '%"></span></div><strong>' + rule.accuracy + '%</strong>' : '無回報資料') + '</td><td class="number-bad">' + (rule.falseNegatives ?? '—') + '</td><td class="number-warn">' + (rule.falsePositives ?? '—') + '</td><td class="peer-evidence"><span>一致 ' + rule.peerCounts.consistent + '</span><span>部分 ' + rule.peerCounts.partial + '</span><span>未提供 ' + rule.peerCounts.unreported + '</span></td></tr>';

    function activateTab(id) {
      document.querySelectorAll('.tab').forEach(tab => tab.setAttribute('aria-selected', String(tab.dataset.tab === id)));
      document.querySelectorAll('.panel').forEach(panel => panel.classList.toggle('active', panel.id === id));
    }
    document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => activateTab(tab.dataset.tab)));

    let overviewFilter = null;
    const overviewFilterButtons = document.querySelectorAll('[data-overview-filter]');
    const clearOverviewFilters = document.getElementById('clear-overview-filters');
    function renderRules() {
      const filtered = DATA.rules.filter(rule => !overviewFilter || rule.priority === overviewFilter);
      overviewFilterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.overviewFilter === overviewFilter)));
      clearOverviewFilters.disabled = !overviewFilter;
      document.getElementById('all-rules').innerHTML = filtered.length ? filtered.map(row).join('') : '<tr><td colspan="8" class="empty">沒有符合條件的規則。可取消分類或清除篩選。</td></tr>';
    }
    overviewFilterButtons.forEach(button => button.addEventListener('click', () => {
      overviewFilter = overviewFilter === button.dataset.overviewFilter ? null : button.dataset.overviewFilter;
      renderRules();
    }));
    clearOverviewFilters.addEventListener('click', () => {
      overviewFilter = null;
      overviewFilterButtons[0].focus();
      renderRules();
    });
    renderRules();

    const metadataValue = value => escapeHtml(value || '未提供');
    document.getElementById('technology-stack').innerHTML = DATA.technologyStack.map(tool => {
      const toolIndex = DATA.matrixTools.indexOf(tool.name);
      const total = DATA.ruleMatrix.length;
      const consistent = DATA.ruleMatrix.filter(rule => rule.statuses[toolIndex] === 'consistent').length;
      const rate = total ? Math.round(consistent / total * 1000) / 10 : 0;
      return '<tr><td class="tool-cell">' + metadataValue(tool.name) + '</td><td class="tool-consistency"><strong>' + rate + '%</strong><br><span>' + consistent + ' / ' + total + ' 條</span></td><td>' + metadataValue(tool.version) + '</td><td>' + metadataValue(tool.developer) + '</td><td>' + metadataValue(tool.language) + '</td><td>' + metadataValue(tool.type) + '</td><td>' + metadataValue(tool.standard) + '</td></tr>';
    }).join('');

    const freegoFilter = document.getElementById('filter-freego-consistent');
    const peersFilter = document.getElementById('filter-peers-consistent');
    const clearMatrixFilters = document.getElementById('clear-matrix-filters');
    function renderConsistencyRules() {
      const freegoOnly = freegoFilter.getAttribute('aria-pressed') === 'true';
      const peersOnly = peersFilter.getAttribute('aria-pressed') === 'true';
      const filtered = DATA.ruleMatrix.filter(rule =>
        (!freegoOnly || rule.statuses[0] === 'consistent') &&
        (!peersOnly || rule.statuses.slice(1).filter(status => status === 'consistent').length >= 5)
      );
      clearMatrixFilters.disabled = !freegoOnly && !peersOnly;
      const activeFilters = [freegoOnly && 'FreeGo 已一致', peersOnly && '至少 5 項其他工具已一致'].filter(Boolean);
      document.getElementById('matrix-filter-count').textContent = '顯示 ' + filtered.length + ' / ' + DATA.ruleMatrix.length + ' 條規則 · ' + (activeFilters.join(' ＋ ') || '未套用篩選');
      document.getElementById('consistency-list').innerHTML = filtered.length ? filtered.map(rule => {
      const statuses = rule.statuses.map((status, index) => '<div class="tool-status"><span class="tool-name">' + escapeHtml(DATA.matrixTools[index]) + '</span>' + statusBadge(status) + '</div>').join('');
      const catalogLabel = { approved: '已核准', proposed: '提案', deprecated: '已棄用', historical: '歷史 ID／未列於現行索引' }[rule.catalogStatus];
      const versionBadges = rule.wcagVersions.map(version => '<span class="standard-badge standard-origin-' + version.replace('.', '') + '">WCAG ' + escapeHtml(version) + ' 起</span>').join('');
      const fallbackBadge = rule.wcagVersions.length ? '' : '<span class="standard-badge standard-origin-20">' + (rule.aria ? 'ARIA／無直接 WCAG 準則' : 'WCAG 版本未確認') + '</span>';
      const standards = '<span class="rule-standards"><span class="standard-badge standard-origin-20">' + escapeHtml(catalogLabel) + '</span>' + versionBadges + fallbackBadge + (rule.wcag22Applicable ? '<span class="standard-badge standard-current">WCAG 2.2 適用</span>' : '') + (rule.allUnreported ? '<span class="standard-badge standard-origin-21">十項工具皆未回報</span>' : '') + '</span>';
      const testcaseBadge = '<span class="standard-badge standard-origin-20 rule-testcase-count" title="W3C 官方測項快照：' + escapeHtml(DATA.testcaseCatalog.retrievedAt.slice(0, 10)) + '；非 FreeGo 掃描筆數">測項數：' + (rule.testcaseCount === null ? '未提供' : rule.testcaseCount + ' 筆') + '</span>';
      const ruleLabel = '<span class="code">' + escapeHtml(rule.id) + '</span><span class="rule-name">' + escapeHtml(rule.nameZh) + '</span><span class="rule-name-en">' + escapeHtml(rule.nameEn) + '</span><span class="rule-testcase-meta">' + testcaseBadge + '</span>' + standards;
      const ruleHeading = rule.url ? '<a class="rule-page-link" href="' + escapeHtml(rule.url) + '" target="_blank" rel="noopener noreferrer" aria-label="在新分頁開啟 ACT 規則：' + escapeHtml(rule.nameZh) + '">' + ruleLabel + '</a>' : ruleLabel;
      return '<article class="consistency-item" data-act-id="' + escapeHtml(rule.id) + '" data-report-group="' + rule.reportGroup + '"><div class="consistency-rule">' + ruleHeading + '</div><div class="consistency-statuses">' + statuses + '</div></article>';
      }).join('') : '<div class="empty">沒有符合條件的規則。請取消其中一個條件，或按「清除篩選」查看全部規則。</div>';
    }
    [freegoFilter, peersFilter].forEach(button => button.addEventListener('click', () => {
      button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
      renderConsistencyRules();
    }));
    clearMatrixFilters.addEventListener('click', () => {
      [freegoFilter, peersFilter].forEach(button => button.setAttribute('aria-pressed', 'false'));
      freegoFilter.focus();
      renderConsistencyRules();
    });
    renderConsistencyRules();

    const dialog = document.getElementById('rule-dialog');
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-rule]');
      if (!button) return;
      const rule = DATA.rules.find(item => item.id === button.dataset.rule);
      document.getElementById('dialog-id').textContent = rule.id + ' · ' + rule.codes.join(', ');
      document.getElementById('dialog-title').textContent = rule.nameZh;
      document.getElementById('dialog-title-en').textContent = rule.name;
      const peerRows = rule.peerResults.map(peer => '<tr><td>' + peer.tool + '</td><td>' + statusBadge(peer.status) + '</td></tr>').join('');
      if (!rule.hasTestData) {
        document.getElementById('dialog-body').innerHTML = '<p>' + statusBadge(rule.status) + ' ' + priorityBadge(rule) + '</p><p>' + (rule.recommended ? '值得實作回報：' : '') + rule.peerCounts.consistent + ' / 9 項其他工具達成一致。</p><p>目前沒有此規則的 FreeGo 測項回報資料，無法計算測項一致率或漏報／誤報數；未回報不等於不支援。</p><p><a class="code-link" href="' + escapeHtml(rule.url) + '" target="_blank" rel="noopener noreferrer">查看官方 ACT 規則 ↗</a></p><h3>同業規則狀態</h3><div class="failure-list"><table><thead><tr><th>工具</th><th>狀態</th></tr></thead><tbody>' + peerRows + '</tbody></table></div>';
        dialog.showModal();
        return;
      }
      const hasScenarios = rule.failures.some(failure => failure.scenario);
      const scenarioHeading = hasScenarios ? '<th>情境摘要</th>' : '';
      const failures = rule.failures.map(failure => '<tr><td><a class="code code-link testcase-id" href="' + failure.url + '" target="_blank" rel="noopener noreferrer">' + failure.testcaseId + ' ↗</a></td>' + (hasScenarios ? '<td class="scenario-summary">' + escapeHtml(failure.scenario || '') + '</td>' : '') + '<td>' + outcome(failure.expected) + '</td><td>' + outcome(failure.actual) + '</td></tr>').join('');
      const codeDetails = rule.codeDetails.map(item => '<div class="code-detail"><a class="code code-link" href="' + item.guideUrl + '" target="_blank" rel="noopener noreferrer" aria-label="在新分頁開啟網站無障礙規範：' + item.code + '">' + item.code + ' ↗</a><div><span>' + item.description + '</span><span>' + (item.criteria.length ? '對應 ' + item.criteria.join('、') : '尚無 WCAG 成功準則對照資料') + '</span></div></div>').join('');
      document.getElementById('dialog-body').innerHTML = '<div class="detail-metrics"><div class="detail-metric"><span>優先級</span><strong>' + priorityBadge(rule) + '</strong></div><div class="detail-metric"><span>狀態</span><strong>' + statusBadge(rule.status) + '</strong></div><div class="detail-metric"><span>一致率</span><strong>' + rule.accuracy + '%</strong></div><div class="detail-metric"><span>測項總數</span><strong>' + rule.total + '</strong></div><div class="detail-metric"><span>漏報</span><strong class="number-bad">' + rule.falseNegatives + '</strong></div><div class="detail-metric"><span>誤報</span><strong class="number-warn">' + rule.falsePositives + '</strong></div></div><section class="code-explanation"><h3>FreeGo 檢測碼說明</h3><p>國內檢測碼是 FreeGo 實際執行的檢測項目；一條 ACT 規則可能對應一個或多個檢測碼。</p>' + codeDetails + '</section><h3>不一致 testcase</h3><div class="failure-list testcase-list"><table class="' + (hasScenarios ? 'has-scenarios' : '') + '"><thead><tr><th>Testcase ID</th>' + scenarioHeading + '<th>ACT 預期</th><th>FreeGo</th></tr></thead><tbody>' + (failures || '<tr><td colspan="' + (hasScenarios ? '4' : '3') + '" class="empty">沒有不一致 testcase</td></tr>') + '</tbody></table></div><h3>同業規則狀態</h3><div class="failure-list"><table><thead><tr><th>工具</th><th>狀態</th></tr></thead><tbody>' + peerRows + '</tbody></table></div>';
      dialog.showModal();
    });
    document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  </script>
</body>
</html>\n`
}

function main() {
  const consistency = JSON.parse(read(CONSISTENCY_PATH))
  const freegoMarkdown = read(path.join(REPORTS_DIR, 'freego-dec-19-2025.md'))
  const freegoRules = parseFreegoRules(freegoMarkdown)
  const detectionCodeLinks = parseDetectionCodeLinks(
    read(DETECTION_CODE_LINKS_PATH)
  )
  const peers = TOOL_FILES.map(([name, filename]) => {
    const markdown = read(path.join(REPORTS_DIR, filename))
    return {
      name,
      metadata: parseToolMetadata(markdown, name),
      links: parseRuleLinks(markdown),
      names: parseRuleNames(markdown),
      rules: parseToolRules(markdown)
    }
  })
  const usedCodes = new Set(
    [...freegoRules.values()].flatMap(rule => rule.codes)
  )
  const missingLinks = [...usedCodes].filter(
    code => !detectionCodeLinks.has(code)
  )
  if (missingLinks.length) {
    throw new Error(`Missing detection code links: ${missingLinks.join(', ')}`)
  }
  const reportedRules = aggregateRules(
    consistency,
    freegoRules,
    peers,
    detectionCodeLinks
  )
  const matrixTools = ['FreeGo', ...peers.map(peer => peer.name)]
  const ruleNames = new Map()
  const ruleLinks = parseRuleLinks(freegoMarkdown)
  for (const rule of freegoRules.values()) ruleNames.set(rule.id, rule.name)
  for (const peer of peers) {
    for (const [ruleId, name] of peer.names) {
      if (!ruleNames.has(ruleId)) ruleNames.set(ruleId, name)
    }
    for (const [ruleId, url] of peer.links) {
      if (!ruleLinks.has(ruleId)) ruleLinks.set(ruleId, url)
    }
  }
  const ruleMatrix = buildRuleMatrix({
    catalog: actCatalog,
    toolRules: [
      new Map([...freegoRules].map(([id, rule]) => [id, rule.status])),
      ...peers.map(peer => peer.rules)
    ],
    names: ruleNames,
    links: ruleLinks,
    namesZh: ACT_RULE_NAMES_ZH,
    testcaseCounts: actTestcaseCounts.counts
  })
  const { rules, ruleSummary } = buildImprovementOverview({
    ruleMatrix,
    reportedRules,
    matrixTools
  })
  const data = {
    summary: consistency.summary,
    ruleSummary,
    rules,
    matrixTools,
    ruleMatrix,
    catalog: {
      source: actCatalog.source,
      retrievedAt: actCatalog.retrievedAt,
      active: ruleMatrix.length
    },
    testcaseCatalog: {
      source: actTestcaseCounts.source,
      retrievedAt: actTestcaseCounts.retrievedAt
    },
    technologyStack: [
      parseToolMetadata(freegoMarkdown, 'FreeGo'),
      ...peers.map(peer => peer.metadata)
    ]
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
  fs.writeFileSync(OUTPUT_PATH, renderHtml(data), 'utf8')
  console.log(`FreeGo improvement dashboard: ${OUTPUT_PATH}`)
  console.log(
    `Rules: ${rules.length}; matrix rules: ${ruleMatrix.length}; peer reports: ${peers.length}; assertions: ${consistency.summary.total}`
  )
}

main()
