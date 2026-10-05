# 規則測項數

規則一致性列表的「測項數」取自 W3C 官方完整 testcases JSON，快照保存在 [act-testcase-counts.json](act-testcase-counts.json)。

- 依 `ruleId` 分組，按 `testcaseId` 去重。
- 包含 passed、failed、inapplicable，以及所有檔案類型；不套用 FreeGo 的規則對照篩選。
- 不是 FreeGo 實際掃描數或 assertion 數，也不代表各工具歷史實作報告使用相同版本的測項。
- 無對應資料時顯示「未提供」，不是 0。
- 快照附來源網址與擷取時間，列表測項標籤的提示文字顯示日期。

更新方式：執行 `npm run update-act-testcase-counts`，再執行 `npm run generate-improvement-report`。只有更新快照需要網路；一般報表產生仍讀取本機資料。