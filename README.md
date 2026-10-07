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

### 3. 產生 HTML 分析報告

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

## 相容性

本專案的 ACT 測項執行基礎以 [ACT Rules TestRunner repository](https://github.com/act-rules/testrunner) 為開發參考；本專案文件與操作流程聚焦於 FreeGo 報告分析。

## 開發與驗證

- 需要 **Node.js 24 以上版本**；執行 `npm ci` 安裝鎖定版本的相依套件。
- `npm test` 執行單元測試；`npm run test:integration` 執行整合驗證。
- `npm run lint:check` 與 `npm run fmt:check` 執行不修改檔案的靜態檢查；`npm run build` 會依序格式化、lint 並執行單元測試。
- 主要使用流程與輸入輸出位置請以上方 FreeGo 操作說明為準；全部指令列於 [package.json](package.json)。

