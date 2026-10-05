# 產生的分析報告

本資料夾集中存放 FreeGo 分析產物：

將原始掃描報告放入 `freego-report/freego.htm` 後，在專案根目錄執行 `npm run generate:all` 即可一次產生 JSON、FreeGo ACT Markdown 與本資料夾的最終 HTML。Markdown 存入 `tools-act-report/`。

- `freego.json`：EARL JSON-LD，由 `npm run generate-report` 產生。
- `freego-consistency.json`：ACT 一致性明細，由同一指令產生。
- `freego-improvement-report.html`：最終分析報告，由 `npm run generate-improvement-report` 產生。

原始 FreeGo HTM 放在 `freego-report/`；ACT Markdown 報告放在 `tools-act-report/`。上述路徑皆相對於專案根目錄。產生器會自動建立輸出資料夾。