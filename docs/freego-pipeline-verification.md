# Freego Pipeline — CLAUDE.md 人工驗證紀錄

## 目的與方法

CLAUDE.md 新增了 Freego pipeline 的詳細說明(`src/serve-test-cases.js`、`src/parse-freego-report.js`、`src/generate-implementation-report.js`、`examples/generate-report.js`）。本文件記錄逐項人工驗證這些說明是否與實際行為一致的過程與結果。

**驗證方式**:每一項由 Claude 提供操作指令與檢查點,使用者親自執行並回報結果(一致/不一致),Claude 針對回報內容(必要時讀程式碼)分析根因並記錄,再進入下一項。**指令一律由使用者本人執行,Claude 不代為執行**(這是使用者明確要求的流程規則)。

**測試資料(fixtures)**:
- `examples/fixtures/htm-reports/ACT-R Testcases.htm` — 使用者本人手動掃描結果。Freego 版本 **Dec 19 2025**,server port **5500**,受測網頁 **1570** 個、逾時 6 個、涵蓋 **95** 個 ruleId。
- `examples/fixtures/htm-reports/testcases.html` — 典範專案掃描結果。Freego 版本 **Sep 27 2024**,server port **8000**,受測網頁 **1516** 個、逾時 7 個、涵蓋 **94** 個 ruleId。**非本專案 `--serve` 指令產出**(port 不同,推測是他們自己環境跑出來的)。
- `examples/fixtures/htm-reports/README.md` — 已有簡短說明,記錄用途是測試 HTM 解析與 EARL 轉檔功能。
- `examples/results/manual-scan-verify-2026-07-16/freego.verify-consistency.json` — 使用者驗證項目 4 時，用自訂輸出路徑產生的相容性報告（未沿用建議的 `examples/results/freego.verify.json`，使用者自訂了帶日期的資料夾）。

---

## 已完成驗證項目

### 項目 1/9:`npm run generate-report -- --serve` 基本行為 — ⚠️ 部分不一致/有補充事項

**基本檢查點**(啟動訊息、瀏覽器可看到目錄列表、`examples/testcases/` 下載檔案、`testcases-snapshot.json` 產生):全部通過。

**額外發現 1(已釐清,非問題)**:`--` 是 npm 的語法(`npm run <script> -- <args>`,把後面參數原封不動傳給底層指令),不是多餘或筆誤。`examples/generate-report.js:41-53` 的 `parseArgs()` 直接讀 `process.argv`,沒有對 `--` 做特殊處理。若省略 `--`,npm 會把 `--serve` 誤判成自己的旗標,程式收不到參數。**CLAUDE.md 應補充這個語法說明**(見下方「累積問題清單」B)。

**額外發現 2(真實架構問題,見問題清單 A)**:只下載 32~33 項 testcase,遠少於 WAI 官方約 90 條活躍規則的 testcase 總數。根因在 `src/load-test-cases.js:34-50` 的 filter,只保留 `ruleId` 存在於 `rulesMap.js` 且有對應偵測碼的 test case;`examples/generate-report.js` 的 `--serve` 模式沿用了這個為 axe-core 參考分支設計的篩選邏輯。這與專案目的(所有規則與其 testcase 都要用 Freego 檢測,`rulesMap.js` 應只是偵測碼對應的元資料)矛盾。

### 項目 2/9:`localUrl()` URL 轉換規則 — ✅ 一致(有補充說明)

檢查點全部通過。

**補充問題 1 回答**:轉換不是網路 redirect,是純字串轉換(`src/serve-test-cases.js:177-184`),無 I/O、無效能疑慮。存在原因是 Freego 報告裡的 URL 是本地 server URL,而 ACT API 載入的 test case `url` 欄位是遠端 URL,需要正規化成同一格式才能比對。

**補充問題 2 回答**:已完全自動化,不需手動介入。`localUrl()` 在 `src/generate-implementation-report.js:118` 內部被自動呼叫,而該函式又是 `--htm` 模式(`examples/generate-report.js:152`)自動觸發的一部分。**CLAUDE.md 應補充「這是內部自動呼叫的函式,不是獨立 CLI 步驟」**(見問題清單 C)。

### 項目 3/9:HTM 解析(`parseFreegoReport`) — ✅ 一致(有兩項重要發現)

檢查點全部通過(`pages`/`timedOut` 結構、`code`/`level` 格式、區塊標題)。

**補充問題 1 回答 — pages count 與《檢測基本資料》受測網頁總數的落差**:
- `pages` 陣列只從「軟體檢測未通過項目」區塊解析(`src/parse-freego-report.js:39-66`),只包含**有違規的頁面**;《檢測基本資料》的「受測網頁」則是 Freego **實際爬過的所有頁面**(含全部通過、無違規的頁面)。落差是設計上必然結果,不是解析錯誤。
- **但延伸出真實漏洞**(見問題清單 D):`parseFreegoReport()` 完全沒有解析「受測網頁：XXXX」這個總數,程式也沒有比對「Freego 是否真的爬到了每一個 test case 頁面」。目前邏輯(`generate-implementation-report.js:127`)把「頁面從未被爬到」與「頁面被爬到但通過」**視為同一種情況**,兩者都判定為 `earl:passed`。也就是說,若 Freego 漏掃某些頁面,目前會被誤判成「通過檢測」而非「未檢測」。

**補充問題 2 回答 — 本地目錄索引頁是否污染結果**:
- 追查 `src/generate-implementation-report.js:108-118`,比對迴圈以 ACT test case 清單為主軸查找,索引頁的本地 URL(`.../` 或 `.../ruleId`)永遠不等於任何 test case 的 `tcLocalUrl`(`.../ruleId/檔名.html`),因此**不會**混入本專案輸出的 EARL/相容性報告。
- 但確實會被 Freego 爬蟲進入並判定違規,污染 **Freego 原生報告**的統計數字(受測網頁總數、違規頁清單)、浪費掃描時間。根因是 `src/serve-test-cases.js:101-102` 的 `directoryListing()` 產出的 HTML **缺少 `lang` 屬性**等基本語意結構(見問題清單 E)。
- **已在項目 4 的額外調查中實測驗證**:手動掃描結果的第一筆違規頁面就是 `http://127.0.0.1:5500/`(根目錄索引頁本身),證實此推論成立。

### 項目 4/9:比對引擎 `generateImplementationReport` — ✅ 一致

**檢查點 1(Total 數字合理性)**:已用輔助指令(比對 `testCases.length × rulesMap 對應偵測碼數` 的理論總和 vs `--htm` 印出的 Total)交叉確認,數量合理。

**檢查點 2(consistency json 結構)**:確認 `{summary, details: [{url, ruleId, code, actExpected, freegoOutcome, consistency}]}` 結構正確。

**檢查點 3(人工抽查分類邏輯)**:抽查 1 筆 `inconsistent-FP` + 1 筆 `inconsistent-invalid`,人工回去 htm 原始檔核對,分類邏輯正確。

**額外調查 — 兩份 htm(手動掃描 vs 典範專案)testcase 總數落差原因**:
- 兩者涵蓋的 ruleId 範圍幾乎相同(手動 95、典範 94,只差 1 條 `kb1m8s`),**都遠超過 `rulesMap.js` 的 33 條** → 再次獨立佐證問題清單 A(兩次真實掃描都涵蓋接近全部 ACT 規則,證明"全部下載"是正確且可行的做法)。
- 頁面總數落差(1570 vs 1516,約 3.5%)**不是規則涵蓋範圍差異造成**,而是:
  1. Freego 版本不同(Dec 19 2025 vs Sep 27 2024,相差逾一年,期間 ACT test case 內容本身會被社群持續修訂)
  2. Server port 不同(5500 vs 8000)→ 典範專案的掃描並非用本專案 `--serve` 指令產出,是在他們自己的環境獨立產生的
- 已確認**不是**「典範專案多了人工判斷資訊」造成的落差。

---

## 待驗證項目(5~9)— 含具體指令與檢查點

### 項目 5/9:輸出檔案格式

**指令**:使用項目 4 產生的 `freego.verify.json`(或使用者自訂路徑下的檔案)。

**檢查點**:
1. 是否為 act-implementor 期待的 EARL schema(無 `earl:` 前綴)— 可實際上傳 https://act-implementor.netlify.app/#/start 確認能否成功解析顯示
2. `*-consistency.json` 是否含 `summary` 計數與 `details` 逐筆 `consistent`/`inconsistent-FP`/`inconsistent-invalid`/`not-implemented`(此點項目 4 已間接驗證過,可快速確認即可)

### 項目 6/9:可重複執行性(idempotency)

**指令**:對同一份 `report.htm`(例如 `ACT-R Testcases.htm`)重新執行一次完整 `--htm` 流程,產生第二份輸出檔,例如:
```bash
node examples/generate-report.js --htm "examples/fixtures/htm-reports/ACT-R Testcases.htm" --out examples/results/freego.verify2.json --testcases-json examples/testcases/testcases-snapshot.json
```

**檢查點**:比對兩次輸出的 `freego.json`/`freego-consistency.json`(或使用者自訂檔名)是否一致(除了 `release.created` 這個時間戳欄位外,其餘內容應完全相同)。

### 項目 7/9:`DETECTION_CODE_WCAG_MAP` 抽查

**檢查點**:抽查 `src/generate-implementation-report.js:12-30` 裡幾筆 MODA code → WCAG SC 對應(例如 `HM1110100C → WCAG2, SC 1.1.1`),確認是否正確反映在項目 4/5 產生的 EARL 輸出裡對應 assertion 的 `test.isPartOf`。

### 項目 8/9:`TESTCASES_JSON` 設定值核對

**指令**:
```bash
node -e "console.log(require('./package.json').config.TESTCASES_JSON)"
```

**檢查點**:確認輸出網址與 CLAUDE.md「Architecture」段落所寫的 `https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases.json` 一致。

### 項目 9/9:axe-core 參考分支對照

**指令**:
```bash
npm run example
```

**檢查點**:
1. 確認產生 `examples/results/output.jsonld`
2. 確認其 EARL schema(`earl:` 前綴,見 `examples/to-earl.js`)與 Freego 分支的 `freego.json`(無前綴,見項目 5)明顯是不同 schema
3. 確認兩個分支彼此獨立運作,互不比對(即目前沒有程式碼會拿 axe-core 結果去跟 Freego 結果做交叉比對)

---

## 累積問題清單(全部驗證完成後,需與使用者討論修正方案)

| 編號 | 問題 | 根因位置 | 性質 |
|---|---|---|---|
| A | `rulesMap.js` 被當作「要不要下載/測試某規則」的篩選依據,導致只下載 33/90 條規則的 testcase,與專案目的(全部規則都要測)矛盾 | `src/load-test-cases.js:34-50`,被 `examples/generate-report.js` 的 `--serve` 模式沿用 | **架構邏輯問題**,需要修正程式(有兩次真實掃描的實測數據佐證,見項目1、4) |
| B | CLAUDE.md 未說明 `npm run generate-report -- --serve` 中 `--` 是 npm 必要語法,容易誤解為筆誤 | 文件缺漏 | 文件補充 |
| C | CLAUDE.md 未說明 `localUrl()` 是內部自動呼叫的函式,不是獨立手動步驟 | 文件缺漏 | 文件補充 |
| D | 目前無法區分「Freego 從未爬到某頁」vs「Freego 爬到且判定通過」,兩者都被當成 `earl:passed`,可能把漏測頁面誤判為通過 | `src/parse-freego-report.js` 未解析「受測網頁」總數;`src/generate-implementation-report.js:127` 的預設值邏輯 | **潛在的報告準確度問題**,需要討論是否修正(例如解析受測網頁總數並比對,或另外標記「未檢測」狀態) |
| E | `src/serve-test-cases.js` 的 `directoryListing()` 產出的索引頁 HTML 缺少 `lang` 屬性等語意結構,會被 Freego 判定違規,污染 Freego 原生報告統計(不影響本專案轉出的 EARL/相容性報告),已有實測數據佐證(手動掃描違規清單第一筆就是根目錄) | `src/serve-test-cases.js:101-102` | 建議修正(補齊 `lang` 屬性),或討論用 `robots.txt` 排除索引頁被爬蟲進入 |

---

## 如何繼續

下次對話請從**「驗證項目 5/9」**開始,依上方「待驗證項目」段落的指令與檢查點逐一進行,流程規則維持:**Claude 給指令,使用者自己執行並回報,Claude 記錄結果、視需要讀程式碼分析根因,再進下一項**。全部 9 項驗證完成後,再與使用者討論「累積問題清單」A~E 的修正方案(屬於後續的程式碼修改動作,需另外取得確認)。