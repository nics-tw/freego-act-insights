# FreeGo ACT Insights

**FreeGo ACT 分析平台** — 將 FreeGo 檢測結果轉換為 ACT 規則一致性分析、改善建議與工具比較的 HTML 報告。

> 本專案為獨立開源專案，非 FreeGo 官方產品，亦不代表 W3C 的認證或背書。FreeGo 掃描仍須透過桌面應用程式手動操作。

## 報告內容

- **改善總覽**：呈現規則一致率、漏報／誤報測項、開發優先度及值得實作回報的規則。
- **規則一致性列表**：比較十項工具的規則狀態，附官方 ACT 規則連結與測項數。
- **技術堆疊**：整理各工具的版本、技術資訊及全規則一致率。

目前官方目錄快照涵蓋 87 條非棄用規則；一致率依「一致規則數 ÷ 全部規則數」計算，不以測項加權。「未回報」不等於「不支援」。

最終報告：[FreeGo ACT 規則分析與改善報告](reports/freego-improvement-report.html)。完成下列三個步驟，即可從 FreeGo 原始掃描報告產生 HTML 分析報告。

## 使用流程

### 事前準備

- 安裝 **Node.js 24 以上版本**與 FreeGo 桌面應用程式。
- 在專案根目錄執行 `npm ci` 安裝相依套件；首次安裝與下載測試網頁需要網路。
- 下列指令皆在專案根目錄執行。FreeGo 與測試站需在同一台電腦執行，才能透過 `127.0.0.1` 存取。

### 1. 啟動測試站，讓 FreeGo 掃描

```sh
npm run serve:testcases
```

此指令會準備 ACT 測試網頁與測項快照，並啟動本機測試站。終端機顯示 `Ready` 後：

1. 保持測試站執行，開啟 FreeGo。
2. 將檢測網址設為 **http://127.0.0.1:5500/**。
3. 執行 FreeGo「全部檢測」，等待掃描完成並匯出 HTM 報告。
4. 匯出完成後，可回到終端機按 `Ctrl+C` 停止測試站。

> 請保留 [測項快照](examples/testcases/testcases-snapshot.json) 與下載的測試頁，後續報告必須使用與這次掃描相同的測項資料。啟動服務可能沿用既有快照與已下載頁面，不保證重新取得最新 ACT 資料。目前測試範圍由 [rulesMap.js](rulesMap.js) 篩選，並非全部官方 ACT 規則。

### 2. 將原始報告命名為 freego.htm

將 FreeGo 匯出的報告改名為 **freego.htm**，放入 [freego-report](freego-report) 資料夾，固定位置為 [freego-report/freego.htm](freego-report/freego.htm)。

重新掃描時，以新的報告取代此檔案；若要保留歷次原始結果，請先另外備份。

### 3. 一個指令產生 HTML 分析報告

```sh
npm run generate:all
```

此指令依序完成以下工作，任一步驟失敗即停止：

1. 解析原始 HTM，產生 EARL JSON 與 ACT 一致性 JSON。
2. 由本次 EARL 與測項快照產生 FreeGo ACT Markdown，存入 [tools-act-report](tools-act-report)。
3. 結合其他工具的 ACT Markdown 與官方目錄快照，產生最終 HTML。

完成後，以瀏覽器開啟 **[reports/freego-improvement-report.html](reports/freego-improvement-report.html)** 即可查看分析結果，不需要繼續執行測試站。

此指令不會操作 FreeGo、不會重新掃描，也不會更新其他工具的 Markdown；會覆寫同名的 FreeGo JSON、Markdown 與 HTML 產物。其他工具比較資料須保留在 [tools-act-report](tools-act-report)。

## 輸入與輸出位置

| 位置 | 用途 |
| --- | --- |
| [freego-report/freego.htm](freego-report/freego.htm) | 手動匯入的 FreeGo 原始掃描報告 |
| [tools-act-report](tools-act-report) | 各工具的 ACT Markdown；FreeGo Markdown 由指令產生，其餘為比較輸入 |
| [reports/freego.json](reports/freego.json) | 產生的 EARL JSON-LD |
| [reports/freego-consistency.json](reports/freego-consistency.json) | 產生的一致性明細 |
| [reports/freego-improvement-report.html](reports/freego-improvement-report.html) | 最終 HTML 分析報告 |

### 進階：分段執行

- `npm run generate-report`：只將固定位置的原始報告轉成 JSON。仍可使用 `-- --htm <路徑>`、`--out`、`--testcases-json`、`--base-url` 覆寫設定。
- `npm run generate-freego-markdown`：只由 JSON 與測項快照產生 FreeGo Markdown。
- `npm run generate-improvement-report`：只由現有 JSON、Markdown 與官方目錄產生 HTML。
- `npm run generate-report -- --serve`：保留原本啟動測試站的用法，等同 `npm run serve:testcases`。

上述三步驟採用預設連接埠 5500 與預設測項目錄。若使用自訂連接埠或測項快照，請分段執行並傳入相符的參數；`generate:all` 不會轉送自訂參數。

舊的 [examples/results](examples/results) 保留作為歷史 JSON 結果／回歸驗證基準，新 FreeGo 產物不再寫入此位置；HTML 位於 [reports](reports)，獨立 axe-core 範例輸出路徑不變。

## 名稱與相容性

- 專案名稱：**FreeGo ACT Insights**；建議 GitHub Repository 名稱：`freego-act-insights`。
- 套件識別名稱：`freego-act-insights`，保留 `private: true` 避免誤發布至 npm；這不限制 GitHub 開源。
- 保留既有 `testRunner` API、npm 指令及報告輸出路徑，避免更名影響原有流程。
- 本專案沿用 [ACT Rules TestRunner](https://github.com/act-rules/testrunner) 的測試執行基礎，並加入 FreeGo 分析與報告流程。新的 GitHub 網址確定後，再補上本專案的 repository、homepage 與 issues 設定。

以下保留開發環境與底層 `testRunner` 的使用說明；axe-core 參考流程與 FreeGo 手動掃描流程彼此獨立。

## Local setup and verification

- Requires **Node.js 24 or newer** (Node.js 24 LTS recommended). The upgraded Puppeteer and ESLint toolchain no longer supports the original Node.js versions.
- Use `npm ci` to reproduce the versions in [package-lock.json](package-lock.json). Puppeteer's install step downloads matching Chrome for Testing binaries and needs network access. Do not skip install scripts when a browser has not yet been installed.
- npm publishing is blocked by `private: true`; local commands and public GitHub hosting are unaffected.
- `npm test -- --runInBand`: unit tests, including filtering, script ordering and browser/page cleanup.
- `npm run test:integration`: real Axios/Chrome/axe smoke tests, FreeGo fixture parsing, CLI output comparisons, and desktop/mobile dashboard checks. Uses ephemeral loopback ports and temporary output, then closes browsers/servers and removes temporary files. Does not overwrite existing reports or require a live ACT API.
- Integration comparisons require the checked-in report inputs/results plus the local ACT snapshot under [examples/testcases/testcases-snapshot.json](examples/testcases/testcases-snapshot.json), which is ignored by Git. Keep the snapshot that matches the scan; do not replace it with today's live dataset for a historical comparison.
- `npm run lint:check` / `npm run fmt:check`: read-only code checks. `npm run lint` / `npm run fmt` apply fixes. Formatting is limited to source/configuration; ACT HTML fixtures, snapshots and generated reports are not reformatted.
- `npm run build` retains the format → lint → unit-test sequence; run the integration command as well after dependency changes.

Puppeteer pages and browsers are now closed on success and failure, and injected scripts run in the supplied order. Do not pass secrets or privileged callbacks as `globals`: test pages can access them. FreeGo GUI scanning remains manual. Updating axe-core may change future axe results; existing FreeGo results are preserved, not reinterpreted against the new axe version.

## Usage of TestRunner

Code snippet, showing various ways to use the `testRunner`.

```js
const testRunner = require('./src')
// Run from the repository root; the exported API remains testRunner.

// execute async
const results = await testRunner(config);

// or execute as a promise chain
testRunner(options)
  .then(results => {
    // explore results
  })
  .catch(error => {
    // handle error
  })
```

## Configuration Object for TestRunner

Members of the `config` object passed to the `testRunner`.

| Name                      | Type              | Default Value                                                                    | Description                                                                                                                                                                              |
| ------------------------- | ----------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config.debug`            | `Boolean`         | `false`                                                                          | (Optional) Runs the `testRunner` in `debug` mode, which launches each test case page in a chromium (non-headless) mode                                                                   |
| `config.injectScripts`    | `Array<String>[]` | `undefined`                                                                      | (Optional) A list of `path` or `url` of scripts to be injected into the `puppeteer` page context                                                                                         |
| `config.globals`          | `Object`          | `undefined`                                                                      | (Mandatory) An object containing `key-value` pairs of `variables` or `functions` to be mounted as a global variable in the `puppeteer` page context for usage by the `evaluate` function |
| `config.globals.rulesMap` | `Object`          | -                                                                                | (Mandatory) An object containing `key-value` pairs of `ruleId` of each `act-r` rule mapped to a `uniqueId` of rule(s) to run against a chosen test tool                              |
| `config.evaluate`         | `Function`        | -` | (Mandatory) A function containing logic to be evaluated on the page context |

An example configuration object is as below:

```js
const config = {
  debug: false,
  injectScripts: [
    'https://code.jquery.com/jquery-3.3.1.min.js'
    // can be relative paths to any scripts as well, (eg: `../../myscript.js`)
  ],
  globals: {
    rulesMap
    // this can also contain functions to be made available on the page context
    // eg: myLogger: function(data) { console.log(data) }
  },
  evaluate: () => {
    // logic to be evaluated within the page context.
  }
}
```
To help define a `1 to 1` or `1 to Many` relationship between [ACT Rules](https://act-rules.github.io/rules/) and the test tool, an object of `key-value` pairs must be defined with the key `rulesMap` in the `config.globals`.

A sample template to build mappings, showing each of the [ACT Rules](https://act-rules.github.io/rules/) with their ids, can be [seen here](https://act-rules.github.io/testcases.json)

An example mapping is as below:

```js
const rulesMap = {
  'act-rule-id': ['DETECTION_CODE_1', 'DETECTION_CODE_2']
}
```

If no mapping is defined an error is thrown by the module.

### Using a Separate rulesMap File (Recommended)

For better organization and maintainability, especially when managing multiple rule mappings, you can define your `rulesMap` in a separate file and import it.

**Structure: ACT Rule ID → Detection Codes**

The `rulesMap` object uses ACT Rule IDs (6-character strings) as keys, and arrays of your tool's detection codes as values. This structure allows `testRunner` to filter test cases by ACT Rule ID and then map results to one or more detection codes.

```js
const rulesMap = {
  'act-rule-id': ['DETECTION_CODE_1', 'DETECTION_CODE_2'],
  '5f99a7': ['HM1410200C'],
  'b5c3f8': ['HM1310100C'],
  'c487ae': ['HM1110101C', 'HM1240401C', 'HM1410200C', 'HM3240900C'],
  // ...
}
```

**Example: Create `rulesMap.js` in your project root**

```js
/**
 * ACT Rules to Detection Codes mapping
 */
const rulesMap = {
  // Image has non-empty accessible name → HM1110100C
  '23a2a8': ['HM1110100C'],

  // Link has non-empty accessible name → multiple detection codes
  'c487ae': ['HM1110101C', 'HM1240401C', 'HM1410200C', 'HM3240900C'],

  // HTML page has lang attribute → HM1310100C

  // Add more ACT Rule mappings...
}

module.exports = rulesMap
```

**Then import and use it:**

```js
const testRunner = require('./src')
const rulesMap = require('./rulesMap')

const config = {
  debug: false,
  globals: {
    rulesMap  // ACT Rule IDs → Detection Codes mapping
  },
  evaluate: async () => {
    // Your test logic - rulesMap available as window.rulesMap
    // window.testcase is also available with the current test case info
    const detectionCodes = window.rulesMap[window.testcase.ruleId] || []
    // ... run your checks and return results
  }
}

testRunner(config).then(results => console.log(results))
```

**Key Points:**

- **Keys**: ACT Rule IDs (6-character strings, e.g., `'5f99a7'`) — must match the `ruleId` field in the ACT test cases JSON
- **Values**: Arrays of your tool's detection codes (e.g., `['HM1410200C']`)
- **1-to-Many**: One ACT Rule can map to multiple detection codes
- **No Empty Arrays**: Only include ACT Rules with corresponding detection codes
- **`window.rulesMap`**: Available in the `evaluate` function's page context

**Reference:**
- [ACT Rules](https://act-rules.github.io/rules/)
- [Test Cases JSON](https://act-rules.github.io/testcases.json)

## Development & Contributing

Source is checked with ESLint flat configuration and formatted with Prettier (single quotes, no semicolons).

Some notable libraries used to build this module are:

* [axios](https://www.npmjs.com/package/axios) for `XMLHttpRequest` management.
* [puppeteer](https://www.npmjs.com/package/puppeteer) for executing a given test case in a headless chromium page context.
* [jest](https://www.npmjs.com/package/jest) for testing.

For a full list of dependencies refer [package.json](package.json)

### Directory Structure

* `src` directory contains the library code.
* `src/__tests__` directory contains testing code.
* `examples` directory shows a sample usage of the module with axe-core and EARL JSON-LD output.

### NPM Scripts

There is no `build` mechanism for this module. The entry point is set to `src/index.js`

* `npm run build` runs `prettier` to format, then `lint`, then `test`.
* `npm run lint` runs `eslint` across all `.js` files in `src/`.
* `npm run test` runs tests with jest.
* `npm run fmt` runs `prettier` on the code base to format to `standard` code style.
* `npm run example` runs the example in `examples/run.js` (requires axe-core, outputs EARL JSON-LD to `examples/results/output.jsonld`).
* `npm run generate-freego-markdown` converts `reports/freego.json` into a detailed Markdown ACT implementation report under `tools-act-report/`. Use `-- --input <path> --testcases-json <path> --out <path>` to override the default paths.

For a full list of scripts refer [package.json](package.json)
