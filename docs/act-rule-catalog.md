# ACT 規則一致性列表資料範圍

列表使用 [W3C All ACT Rules](https://www.w3.org/WAI/standards-guidelines/act/rules/) 的本機快照 [act-rule-catalog.json](act-rule-catalog.json)，只納入官方狀態為 `approved` 或 `proposed` 的非棄用規則，再填入十份工具報告結果。一般產生報告不連線，也不使用只涵蓋 FreeGo 規則的 testcase snapshot 作為完整底表。

2026-09-30 擷取的官方索引包含 90 個不同 ID：37 條已核准、50 條提案、3 條已棄用。納入 A／AA／AAA、ARIA 與隱藏的已棄用項目，並將同時對應多個成功準則的同一 ID 去重。官方狀態取自索引資料，不從 URL 是否包含 `proposed` 猜測。

快照保留完整來源，但列表排除 3 條已棄用規則及工具報告中未列於此次官方索引的 `2t408d`，僅顯示 **87 條非棄用規則**。原始工具報告不刪改，也不將歷史 ID 的結果轉移到名稱相同的規則。

排序與回報狀態：

1. FreeGo 有回報：32 條。
2. FreeGo 未回報，但其他工具有回報：40 條。
3. 十項工具皆未回報：15 條。

各組內按 ACT ID 字典序排列。官方規則狀態與工具「一致／部分一致／未回報」分開顯示；沒有工具回報不代表不支援。既有結果不因新增底表而變動，FreeGo 改善總覽仍只使用其實測資料。

WCAG 標籤依官方索引關聯的成功準則首次引入版本計算；關聯也可能是間接／次要關聯，不表示 ACT 規則完整測試該成功準則。跨版本可有多個標籤；ARIA 專屬規則不猜測 WCAG 版本。

## 更新

- `npm run update-act-rule-catalog`：連線擷取官方索引並更新快照。需要已安裝的 Puppeteer 瀏覽器；只解析索引，停用頁面 JS 並封鎖子資源請求。
- 檢查規則增刪、狀態、準則與名稱；新中文譯名加入工作台產生器。缺少中文時會先顯示官方英文，不捏造規則名稱或版本。
- `npm run generate-improvement-report`：離線重新產生工作台。
- `npm test -- --runInBand` 與 `npm run test:integration`：檢查非棄用篩選、去重、排序、全未回報、原有結果及桌面／手機版。

官方規則目錄與 FreeGo 掃描用的 testcase snapshot 用途不同。更新規則目錄不會重下載測試頁、改動掃描範圍或重新計算既有檢測結果。