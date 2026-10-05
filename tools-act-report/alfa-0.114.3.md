# Alfa (fully automated) 0.114.3 — ACT Rules 實作報告

| 欄位 | 資訊 |
|------|------|
| 工具名稱 | Alfa (fully automated) |
| 版本 | 0.114.3 |
| 開發者 | [Siteimprove](https://www.siteimprove.com/) |
| 開發語言 | TypeScript（編譯為 JavaScript） |
| 工具類型 | Automated |
| 標準 | WCAG 2.2 Level A, AA, AAA；WAI-ARIA 1.2 |
| W3C ACT 頁面 | https://www.w3.org/WAI/standards-guidelines/act/implementations/alfa/ |
| 官方網站 | https://alfa.siteimprove.com/ |
| EARL 測試報告 | https://raw.githubusercontent.com/Siteimprove/alfa-act-r/main/reports/alfa-automated-report.json |
| 規則邏輯文件 | https://alfa.siteimprove.com/rules/（各規則以 sia-rXXX 命名） |
| 最後更新 | 2026-04-20 |
| 一致規則數 | 27 WCAG + 3 Proposed |
| 部分一致規則數 | 2 WCAG + 7 Proposed |

> **結果說明：**
> - `Consistent` = 所有測試案例結果完全一致
> - `Partial` = 部分一致（通常因測試案例 cannot tell 或成功標準差異）
> - `cannot tell` = 技術限制無法判斷
> - `untested` = 尚未核准的例子（`*` 標記者）
> - `inapplicable` = 工具判定不適用

---

## WCAG 2 Rules

### 規則 1：Role attribute has valid value
- **ACT Rule ID:** `674b10`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/674b10/
- **Procedure ID:** `sia-r110`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r110
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: None → Reported: **1.3.1 Info and Relationships**（工具額外回報，但一致性仍符合）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 * | (untested) | inapplicable | — |

---

### 規則 2：ARIA state or property has valid value
- **ACT Rule ID:** `6a7281`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/6a7281/
- **Procedure ID:** `sia-r19`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r19
- **一致性:** ✅ Consistent
- **成功標準差異:** 無
- **備註:** 涵蓋 21 例中的 20 例；1 例回報 `cannot tell`

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | passed | ✅ |
| Passed Example 7 | passed | passed | ✅ |
| Passed Example 8 | passed | passed | ✅ |
| Passed Example 9 | passed | passed | ✅ |
| Passed Example 10 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Failed Example 5 | failed | failed | ✅ |
| Failed Example 6 | failed | failed | ✅ |
| Failed Example 7 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | cannot tell | ⚠️ cannot tell |

---

### 規則 3：ARIA attribute is defined in WAI-ARIA
- **ACT Rule ID:** `5f99a7`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/5f99a7/
- **Procedure ID:** `sia-r20`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r20
- **一致性:** ✅ Consistent
- **成功標準差異:** 無

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Passed Example 2 * | (untested) | passed | — |

---

### 規則 4：Element with lang attribute has valid language tag
- **ACT Rule ID:** `de46e4`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/de46e4/
- **Procedure ID:** `sia-r7`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r7
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 3.1.2 → Reported: **3.1.2**（完全一致）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Failed Example 5 | failed | failed | ✅ |
| Failed Example 6 | failed | failed | ✅ |
| Failed Example 7 | failed | failed | ✅ |
| Failed Example 8 | failed | failed | ✅ |
| Failed Example 9 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | inapplicable | ✅ |

---

### 規則 5：Menuitem has non-empty accessible name
- **ACT Rule ID:** `m6b1q3`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/m6b1q3/
- **Procedure ID:** `sia-r94`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r94
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 4.1.2 → Reported: **4.1.2**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |

---

### 規則 6：Important letter spacing in style attributes is wide enough
- **ACT Rule ID:** `24afc2`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/24afc2/
- **Procedure ID:** `sia-r91`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r91
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.4.12 → Reported: **1.4.12**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 6 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 7 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 8 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 9 | inapplicable | inapplicable | ✅ |

---

### 規則 7：Important word spacing in style attributes is wide enough
- **ACT Rule ID:** `9e45ec`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/9e45ec/
- **Procedure ID:** `sia-r92`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r92
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.4.12 → Reported: **1.4.12**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–6 | passed | passed | ✅ |
| Failed Example 1–4 | failed | failed | ✅ |
| Inapplicable Example 1–9 | inapplicable | inapplicable | ✅ |

---

### 規則 8：Autocomplete attribute has valid value
- **ACT Rule ID:** `73f2c2`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/73f2c2/
- **Procedure ID:** `sia-r10`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r10
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.3.5 → Reported: **1.3.5**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–9 | passed | passed | ✅ |
| Failed Example 1–10 | failed | failed | ✅ |
| Inapplicable Example 1–9 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 8 * | (untested) | inapplicable | — |
| Inapplicable Example 9 * | (untested) | inapplicable | — |

---

### 規則 9：Button has non-empty accessible name
- **ACT Rule ID:** `97a4e1`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/97a4e1/
- **Procedure ID:** `sia-r12`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r12
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 4.1.2 → Reported: **4.1.2**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–7 | passed | passed | ✅ |
| Failed Example 1–5 | failed | failed | ✅ |
| Inapplicable Example 1–5 | inapplicable | inapplicable | ✅ |

---

### 規則 10：Element marked as decorative is not exposed
- **ACT Rule ID:** `46ca7f`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/46ca7f/
- **Procedure ID:** `sia-r86`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r86
- **一致性:** ✅ Consistent
- **成功標準差異:** 無

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–6 | passed | passed | ✅ |
| Failed Example 1–3 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |

---

### 規則 11：Form field has non-empty accessible name
- **ACT Rule ID:** `e086e5`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/e086e5/
- **Procedure ID:** `sia-r8`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r8
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 4.1.2 → Reported: **4.1.2**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–8 | passed | passed | ✅ |
| Failed Example 1–8 | failed | failed | ✅ |
| Inapplicable Example 1–3 | inapplicable | inapplicable | ✅ |
| Passed Example 8 * | (untested) | passed | — |
| Passed Example 9 * | (untested) | passed | — |
| Failed Example 9 * | (untested) | failed | — |

---

### 規則 12：HTML page lang attribute has valid language tag
- **ACT Rule ID:** `bf051a`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/bf051a/
- **Procedure ID:** `sia-r5`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r5
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 3.1.1 → Reported: **3.1.1**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |

---

### 規則 13：HTML page has non-empty title
- **ACT Rule ID:** `2779a5`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/2779a5/
- **Procedure ID:** `sia-r1`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r1
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 2.4.2 → Reported: **2.4.2**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–5 | passed | passed | ✅ |
| Failed Example 1–5 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Passed Example 2 * | (untested) | passed | — |
| Failed Example 6 * | (untested) | failed | — |

---

### 規則 14：Image button has non-empty accessible name
- **ACT Rule ID:** `59796f`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/59796f/
- **Procedure ID:** `sia-r28`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r28
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.1.1, 4.1.2 → Reported: **1.1.1, 4.1.2**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–4 | passed | passed | ✅ |
| Failed Example 1–3 | failed | failed | ✅ |
| Inapplicable Example 1–5 | inapplicable | inapplicable | ✅ |

---

### 規則 15：Image has non-empty accessible name
- **ACT Rule ID:** `23a2a8`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/23a2a8/
- **Procedure ID:** `sia-r2`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r2
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.1.1 → Reported: **1.1.1**
- **備註:** Passed Example 5–8 工具回報 `inapplicable`（裝飾性圖片），仍符合一致性

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | inapplicable | ✅ |
| Passed Example 6 | passed | inapplicable | ✅ |
| Passed Example 7 | passed | inapplicable | ✅ |
| Passed Example 8 | passed | inapplicable | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Failed Example 5 | failed | failed | ✅ |
| Inapplicable Example 1–5 | inapplicable | inapplicable | ✅ |

---

### 規則 16：Link has non-empty accessible name
- **ACT Rule ID:** `c487ae`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/
- **Procedure ID:** `sia-r11`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r11
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 4.1.2, 2.4.4 → Reported: **2.4.4, 2.4.9, 4.1.2**（額外回報 2.4.9，仍符合一致性）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–11 | passed | passed | ✅ |
| Failed Example 1–11 | failed | failed | ✅ |
| Inapplicable Example 1–6 | inapplicable | inapplicable | ✅ |

---

### 規則 17：SVG element with explicit role has non-empty accessible name
- **ACT Rule ID:** `7d6734`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/7d6734/
- **Procedure ID:** `sia-r43`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r43
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.1.1 → Reported: **1.1.1**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–3 | passed | passed | ✅ |
| Failed Example 1–4 | failed | failed | ✅ |
| Inapplicable Example 1–3 | inapplicable | inapplicable | ✅ |

---

### 規則 18：Element with presentational children has no focusable content
- **ACT Rule ID:** `307n5z`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/307n5z/
- **Procedure ID:** `sia-r90`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r90
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 4.1.2 → Reported: **4.1.2**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–3 | passed | passed | ✅ |
| Failed Example 1–3 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Passed Example 4 * | (untested) | passed | — |
| Failed Example 4 * | (untested) | failed | — |
| Failed Example 5 * | (untested) | failed | — |
| Inapplicable Example 1 * | (untested) | inapplicable | — |
| Inapplicable Example 2 * | (untested) | inapplicable | — |

---

### 規則 19：Headers attribute specified on a cell refers to cells in the same table element
- **ACT Rule ID:** `a25f45`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/a25f45/
- **Procedure ID:** `sia-r45`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r45
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.3.1 → Reported: **1.3.1**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–8 | passed | passed | ✅ |
| Failed Example 1–4 | failed | failed | ✅ |
| Inapplicable Example 1–5 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 * | (untested) | inapplicable | — |
| Inapplicable Example 6 * | (untested) | inapplicable | — |

---

### 規則 20：Meta element has no refresh delay
- **ACT Rule ID:** `bc659a`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/bc659a/
- **Procedure ID:** `sia-r9`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r9
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 2.2.1 → Reported: **2.2.1, 2.2.4, 3.2.5**（額外回報，仍符合一致性）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–3 | passed | passed | ✅ |
| Failed Example 1–4 | failed | failed | ✅ |
| Inapplicable Example 1–8 | inapplicable | inapplicable | ✅ |

---

### 規則 21：Meta viewport allows for zoom
- **ACT Rule ID:** `b4f0c3`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/b4f0c3/
- **Procedure ID:** `sia-r47`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r47
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.4.4 → Reported: **1.4.4**
- **備註:** Passed Example 3 回報 `inapplicable`，仍符合一致性

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | inapplicable | ✅ |
| Failed Example 1–4 | failed | failed | ✅ |
| Inapplicable Example 1–4 | inapplicable | inapplicable | ✅ |
| Passed Example 2 * | (untested) | passed | — |
| Passed Example 5 * | (untested) | passed | — |
| Failed Example 2 * | (untested) | failed | — |
| Failed Example 3 * | (untested) | failed | — |
| Failed Example 7 * | (untested) | failed | — |

---

### 規則 22：Object element rendering non-text content has non-empty accessible name
- **ACT Rule ID:** `8fc3b6`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/8fc3b6/
- **Procedure ID:** `sia-r63`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r63
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.1.1 → Reported: **1.1.1**
- **備註:** Inapplicable Example 1 回報 `passed`，仍符合一致性

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–4 | passed | passed | ✅ |
| Failed Example 1–6 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | passed | ✅ |
| Inapplicable Example 2–8 | inapplicable | inapplicable | ✅ |

---

### 規則 23：HTML page has lang attribute
- **ACT Rule ID:** `b5c3f8`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/b5c3f8/
- **Procedure ID:** `sia-r4`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r4
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 3.1.1 → Reported: **3.1.1**
- **備註:** 涵蓋 7 例中的 6 例；Inapplicable Example 2 回報 `cannot tell`

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | cannot tell | ⚠️ cannot tell |

---

### 規則 24：HTML page title is descriptive
- **ACT Rule ID:** `2t408d`（依 sia-r114 對應）
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/2t408d/
- **Procedure ID:** `sia-r114`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r114
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 2.4.2 → Reported: **2.4.2**（成功標準正確，但覆蓋率僅 1/7）
- **備註:** 涵蓋 7 例中僅 1 例（Inapplicable Example 1）；其餘 6 例均回報 `cannot tell`

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 2 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 3 | passed | cannot tell | ⚠️ cannot tell |
| Failed Example 1 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 2 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 3 | failed | cannot tell | ⚠️ cannot tell |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |

---

### 規則 25：Element in sequential focus order has visible focus
- **ACT Rule ID:** `oj04fd`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/oj04fd/
- **Procedure ID:** `sia-r65`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r65
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 2.4.7 → Reported: **2.4.7**（成功標準正確，但覆蓋率僅 4/7）
- **備註:** 3 例回報 `cannot tell`（技術限制）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 4 | passed | cannot tell | ⚠️ cannot tell |
| Failed Example 1 | failed | cannot tell | ⚠️ cannot tell |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Passed Example 4 * | (untested) | cannot tell | — |
| Inapplicable Example 2 * | (untested) | inapplicable | — |

---

### 規則 26：Meta element has no refresh delay (no exception)
- **ACT Rule ID:** `bisz58`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/bisz58/
- **Procedure ID:** `sia-r96`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r96
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 2.2.4, 3.2.5 → Reported: **2.2.4, 3.2.5**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–2 | passed | passed | ✅ |
| Failed Example 1–3 | failed | failed | ✅ |
| Inapplicable Example 1–8 | inapplicable | inapplicable | ✅ |

---

### 規則 27：Orientation of the page is not restricted using CSS transforms
- **ACT Rule ID:** `b33eff`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/b33eff/
- **Procedure ID:** `sia-r44`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r44
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.3.4 → Reported: **1.3.4**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 * | (untested) | inapplicable | — |

---

### 規則 28：Element with role attribute has required states and properties
- **ACT Rule ID:** `4e8ab6`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/4e8ab6/
- **Procedure ID:** `sia-r16`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r16
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: None → Reported: **1.3.1, 4.1.2**（工具額外回報，仍符合一致性）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Failed Example 5 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |

---

### 規則 29：Summary element has non-empty accessible name
- **ACT Rule ID:** `2t702h`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/2t702h/
- **Procedure ID:** `sia-r116`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r116
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 4.1.2 → Reported: **4.1.2**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |

---

## Proposed Rules（提案中的規則）

### 規則 30：ARIA global properties not used where prohibited
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/kb1m8s/proposed/
- **Procedure ID:** `sia-r18`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r18
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: None → Reported: **None**（成功標準相符，但部分案例結果不一致）
- **備註:** 涵蓋 9 例中的 7 例；部分 Failed/Passed 案例回報為 inapplicable

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | inapplicable | ⚠️ 不一致 |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | inapplicable | ⚠️ 不一致 |
| Failed Example 4 | failed | failed | ✅ |
| Failed Example 5 | failed | inapplicable | ⚠️ 不一致 |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |

---

### 規則 31：ARIA required context role
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/ff89c9/
- **Procedure ID:** `sia-r42`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r42
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.3.1 → Reported: **1.3.1**
- **備註:** Inapplicable Example 2、5 回報 passed，仍符合一致性

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | passed | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | passed | ✅ |

---

### 規則 32：ARIA required owned elements
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/bc4a75/
- **Procedure ID:** `sia-r68`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r68
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.3.1 → Reported: **1.3.1**（成功標準正確，但 Failed Example 6、7 回報 passed）
- **備註:** 涵蓋 24 例中的 22 例

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | passed | ✅ |
| Passed Example 7 | passed | passed | ✅ |
| Passed Example 8 | passed | passed | ✅ |
| Passed Example 9 | passed | passed | ✅ |
| Passed Example 10 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Failed Example 5 | failed | failed | ✅ |
| Failed Example 6 | failed | passed | ❌ 不一致 |
| Failed Example 7 | failed | passed | ❌ 不一致 |
| Failed Example 8 | failed | failed | ✅ |
| Failed Example 9 | failed | failed | ✅ |
| Failed Example 10 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |

---

### 規則 33：ARIA state or property is permitted
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/5c01ea/
- **Procedure ID:** `sia-r18`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r18
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: None → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | passed | ✅ |
| Passed Example 7 | passed | passed | ✅ |
| Passed Example 8 | passed | passed | ✅ |
| Passed Example 9 | passed | passed | ✅ |
| Passed Example 10 | passed | passed | ✅ |
| Passed Example 11 | passed | passed | ✅ |
| Passed Example 12 | passed | passed | ✅ |
| Passed Example 13 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |

---

### 規則 34：Heading is descriptive
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/b49b2e/
- **Procedure ID:** `sia-r115`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r115
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 2.4.6 → Reported: **2.4.6**（成功標準正確，但涵蓋率僅 4/14）
- **備註:** 10 例回報 cannot tell（需語意理解，技術限制）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 2 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 3 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 4 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 5 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 6 | passed | cannot tell | ⚠️ cannot tell |
| Failed Example 1 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 2 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 3 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 4 | failed | cannot tell | ⚠️ cannot tell |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |

---

### 規則 35：Heading has non-empty accessible name
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/ffd0e9/
- **Procedure ID:** `sia-r64`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r64
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: None → Reported: **1.3.1 Info and Relationships**（工具額外回報不應存在的成功標準）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Failed Example 5 | failed | failed | ✅ |
| Failed Example 6 | failed | failed | ✅ |
| Failed Example 7 | failed | failed | ✅ |
| Failed Example 8 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |

---

### 規則 36：Iframe elements with identical accessible names have equivalent purpose
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/4b1c6c/
- **Procedure ID:** `sia-r15`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r15
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 4.1.2 → Reported: **4.1.2**（成功標準正確，但涵蓋率 14/23）
- **備註:** 9 例回報 cannot tell（需語意判斷，技術限制）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 5 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 6 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 7 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 8 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 9 | passed | passed | ✅ |
| Passed Example 10 | passed | passed | ✅ |
| Failed Example 1 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 2 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 3 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 4 | failed | cannot tell | ⚠️ cannot tell |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 6 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 7 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 8 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 9 | inapplicable | inapplicable | ✅ |

---

### 規則 37：Iframe element has non-empty accessible name
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/cae760/
- **Procedure ID:** `sia-r13`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r13
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 4.1.2 → Reported: **4.1.2**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |

---

### 規則 38：Links with identical accessible names have equivalent purpose
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/b20e66/
- **Procedure ID:** `sia-r41`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r41
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 2.4.9 → Reported: **2.4.9**（成功標準正確，但涵蓋率 8/21）
- **備註:** 13 例回報 cannot tell（需語意判斷，技術限制）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 3 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 4 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 5 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 6 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 7 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 8 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 9 | passed | passed | ✅ |
| Passed Example 10 | passed | passed | ✅ |
| Passed Example 11 | passed | passed | ✅ |
| Passed Example 12 | passed | passed | ✅ |
| Failed Example 1 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 2 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 3 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 4 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 5 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 6 | failed | cannot tell | ⚠️ cannot tell |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |

---

### 規則 39：Table header cell has assigned cells
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/d0f69e/
- **Procedure ID:** `sia-r46`
- **規則邏輯文件:** https://alfa.siteimprove.com/rules/sia-r46
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.3.1 → Reported: **1.3.1**（成功標準正確，但 Passed Example 2、Failed Example 3 結果不一致）
- **備註:** 涵蓋 16 例中的 15 例

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | inapplicable | ⚠️ 不一致 |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | inapplicable | ⚠️ 不一致 |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 6 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 7 | inapplicable | inapplicable | ✅ |

---

## 總結摘要

| 統計項目 | 數量 |
|---------|------|
| 實作規則總數 | 39（29 WCAG + 10 Proposed） |
| ✅ 完全一致（Consistent） | 30（27 WCAG + 3 Proposed） |
| ⚠️ 部分一致（Partial） | 9（2 WCAG + 7 Proposed） |

### 部分一致主因分析

**主因一：cannot tell（技術限制）**
- sia-r114（Heading is descriptive）、sia-r65（Element in sequential focus order has visible focus）
- sia-r115（Heading is descriptive 提案版）、sia-r15（Iframe equivalent purpose）
- sia-r41（Links with identical names have equivalent purpose）

**主因二：結果不一致**
- sia-r18（ARIA global properties not used where prohibited）
- sia-r68（ARIA required owned elements）
- sia-r46（Table header cell has assigned cells）

**主因三：額外回報 SC**
- sia-r64（Heading has non-empty accessible name）回報 1.3.1，預期為 None

### 特別說明

工具使用 `inapplicable` 而非 `passed` 回報 Inapplicable 例子，與 @accesslint/core 不同，這是更精確的回報方式，完全符合 ACT 一致性規範。
