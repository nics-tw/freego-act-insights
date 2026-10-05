# @accesslint/core 0.8.8 — ACT Rules 實作報告

| 欄位 | 資訊 |
|------|------|
| 工具名稱 | @accesslint/core |
| 版本 | 0.8.8 |
| 開發者 | [accesslint](https://github.com/AccessLint/) |
| 開發語言 | TypeScript（主要原始碼；編譯為 JavaScript） |
| 工具類型 | Automated |
| 標準 | WCAG 2.2 Level A, AA, AAA |
| W3C ACT 頁面 | https://www.w3.org/WAI/standards-guidelines/act/implementations/accesslint-core/ |
| 官方 GitHub | https://github.com/AccessLint/accesslint |
| EARL 測試報告 | https://accesslint.github.io/accesslint/earl-report-browser.json |
| 規則邏輯文件 | https://github.com/AccessLint/accesslint/tree/main/core/src/rules（各規則以 category/rule-name.ts 命名） |
| 最後更新 | 2026-04-21 |
| 一致規則數 | 5 WCAG |
| 部分一致規則數 | 28 WCAG |

> **結果說明：** `Consistent` = 所有測試案例結果完全一致；`Partial` = 部分一致（通常因未回報成功標準）；`cannot tell` = 技術限制無法判斷；`untested` = 尚未核准的例子。

---

## 實作規則詳細表格

### 規則 1：Role attribute has valid value
- **ACT Rule ID:** `674b10`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/674b10/
- **工具規則 ID（Procedure）:** `aria/aria-roles`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/aria/aria-roles.ts
- **一致性:** ✅ Consistent
- **成功標準差異:** 無（Expected: None, Reported: None）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | passed | ✅ |
| Inapplicable Example 2 | inapplicable | passed | ✅ |
| Inapplicable Example 3 | inapplicable | passed | ✅ |
| Inapplicable Example 4 | inapplicable | passed | ✅ |
| Inapplicable Example 5 | inapplicable | passed | ✅ |
| Inapplicable Example 4 * | (untested) | untested | — |

---

### 規則 2：ARIA state or property has valid value
- **ACT Rule ID:** `6a7281`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/6a7281/
- **工具規則 ID（Procedure）:** `aria/aria-valid-attr-value`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/aria/aria-valid-attr-value.ts
- **一致性:** ✅ Consistent
- **成功標準差異:** 無

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–10 | passed | passed | ✅ |
| Failed Example 1–7 | failed | failed | ✅ |
| Inapplicable Example 1–4 | inapplicable | passed | ✅ |

---

### 規則 3：ARIA attribute is defined in WAI-ARIA
- **ACT Rule ID:** `5f99a7`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/5f99a7/
- **工具規則 ID（Procedure）:** `aria/aria-valid-attr`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/aria/aria-valid-attr.ts
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
| Inapplicable Example 1 | inapplicable | passed | ✅ |
| Passed Example 2 * | (untested) | untested | — |

---

### 規則 4：Element with lang attribute has valid language tag
- **ACT Rule ID:** `de46e4`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/de46e4/
- **工具規則 ID（Procedure）:** `readable/valid-lang`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/readable/valid-lang.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 3.1.2 Language of Parts → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–5 | passed | passed | ✅ |
| Failed Example 1–9 | failed | failed | ✅ |
| Inapplicable Example 1–5 | inapplicable | passed | ✅ |

---

### 規則 5：Menuitem has non-empty accessible name
- **ACT Rule ID:** `m6b1q3`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/m6b1q3/
- **工具規則 ID（Procedure）:** `labels-and-names/aria-command-name`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/labels-and-names/aria-command-name.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 4.1.2 Name, Role, Value → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–4 | passed | passed | ✅ |
| Failed Example 1–2 | failed | failed | ✅ |
| Inapplicable Example 1–2 | inapplicable | passed | ✅ |

---

### 規則 6：Important letter spacing in style attributes is wide enough
- **ACT Rule ID:** `24afc2`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/24afc2/
- **工具規則 ID（Procedure）:** `distinguishable/letter-spacing`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/distinguishable/letter-spacing.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.4.12 Text Spacing → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–6 | passed | passed | ✅ |
| Failed Example 1–4 | failed | failed | ✅ |
| Inapplicable Example 1–9 | inapplicable | passed | ✅ |

---

### 規則 7：Important word spacing in style attributes is wide enough
- **ACT Rule ID:** `9e45ec`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/9e45ec/
- **工具規則 ID（Procedure）:** `distinguishable/word-spacing`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/distinguishable/word-spacing.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.4.12 Text Spacing → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–6 | passed | passed | ✅ |
| Failed Example 1–4 | failed | failed | ✅ |
| Inapplicable Example 1–9 | inapplicable | passed | ✅ |

---

### 規則 8：Important line height in style attributes is wide enough
- **ACT Rule ID:** `78fd32`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/78fd32/
- **工具規則 ID（Procedure）:** `distinguishable/line-height`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/distinguishable/line-height.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.4.12 Text Spacing → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–8 | passed | passed | ✅ |
| Failed Example 1–6 | failed | failed | ✅ |
| Inapplicable Example 1–10 | inapplicable | passed | ✅ |

---

### 規則 9：Autocomplete attribute has valid value
- **ACT Rule ID:** `73f2c2`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/73f2c2/
- **工具規則 ID（Procedure）:** `adaptable/autocomplete-valid`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/adaptable/autocomplete-valid.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.3.5 Identify Input Purpose → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–8 | passed | passed | ✅ |
| Passed Example 9 | passed | passed | ✅ |
| Failed Example 1–5 | failed | failed | ✅ |
| Failed Example 6–10 | failed | failed | ✅ |
| Inapplicable Example 1–7 | inapplicable | passed | ✅ |
| Inapplicable Example 8 | inapplicable | passed | ✅ |
| Inapplicable Example 9 | inapplicable | passed | ✅ |
| Inapplicable Example 8 * | (untested) | untested | — |
| Inapplicable Example 9 * | (untested) | untested | — |

---

### 規則 10：Button has non-empty accessible name
- **ACT Rule ID:** `97a4e1`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/97a4e1/
- **工具規則 ID（Procedure）:** `labels-and-names/button-name`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/labels-and-names/button-name.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 4.1.2 Name, Role, Value → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–7 | passed | passed | ✅ |
| Failed Example 1–5 | failed | failed | ✅ |
| Inapplicable Example 1–5 | inapplicable | passed | ✅ |

---

### 規則 11：Element marked as decorative is not exposed
- **ACT Rule ID:** `46ca7f`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/46ca7f/
- **工具規則 ID（Procedure）:** `aria/presentation-role-conflict`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/aria/presentation-role-conflict.ts
- **一致性:** ✅ Consistent
- **成功標準差異:** 無

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–6 | passed | passed | ✅ |
| Failed Example 1–3 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | passed | ✅ |

---

### 規則 12：Form field has non-empty accessible name
- **ACT Rule ID:** `e086e5`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/e086e5/
- **工具規則 ID（Procedure）:** `labels-and-names/form-label`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/labels-and-names/form-label.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 4.1.2 Name, Role, Value → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–7 | passed | passed | ✅ |
| Passed Example 8 | passed | passed | ✅ |
| Failed Example 1–7 | failed | failed | ✅ |
| Failed Example 8 | failed | failed | ✅ |
| Inapplicable Example 1–3 | inapplicable | passed | ✅ |
| Passed Example 8 * | (untested) | untested | — |
| Passed Example 9 * | (untested) | untested | — |
| Failed Example 9 * | (untested) | untested | — |

---

### 規則 13：HTML page lang attribute has valid language tag
- **ACT Rule ID:** `bf051a`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/bf051a/
- **工具規則 ID（Procedure）:** `readable/html-lang-valid`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/readable/html-lang-valid.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 3.1.1 Language of Page → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–2 | passed | passed | ✅ |
| Failed Example 1–4 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | passed | ✅ |

---

### 規則 14：HTML page has non-empty title
- **ACT Rule ID:** `2779a5`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/2779a5/
- **工具規則 ID（Procedure）:** `navigable/document-title`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/navigable/document-title.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 2.4.2 Page Titled → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–5 | passed | passed | ✅ |
| Failed Example 1–5 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | passed | ✅ |
| Passed Example 2 * | (untested) | untested | — |
| Failed Example 6 * | (untested) | untested | — |

---

### 規則 15：Image button has non-empty accessible name
- **ACT Rule ID:** `59796f`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/59796f/
- **工具規則 ID（Procedure）:** `text-alternatives/input-image-alt`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/text-alternatives/input-image-alt.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.1.1, 4.1.2 → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–4 | passed | passed | ✅ |
| Failed Example 1–3 | failed | failed | ✅ |
| Inapplicable Example 1–5 | inapplicable | passed | ✅ |

---

### 規則 16：Image has non-empty accessible name
- **ACT Rule ID:** `23a2a8`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/23a2a8/
- **工具規則 ID（Procedure）:** `text-alternatives/img-alt`, `text-alternatives/role-img-alt`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/text-alternatives/img-alt.ts 及 https://github.com/AccessLint/accesslint/blob/main/core/src/rules/text-alternatives/role-img-alt.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.1.1 Non-text Content → Reported: **None**

| 測試案例 | img-alt | role-img-alt | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–8 | passed | passed | ✅ |
| Failed Example 1–5 | failed | failed | ✅ |
| Inapplicable Example 1–5 | passed | passed | ✅ |

---

### 規則 17：Link has non-empty accessible name
- **ACT Rule ID:** `c487ae`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/
- **工具規則 ID（Procedure）:** `navigable/link-name`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/navigable/link-name.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 4.1.2, 2.4.4 → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–10, 11 | passed | passed | ✅ |
| Failed Example 1–10, 11 | failed | failed | ✅ |
| Inapplicable Example 1–6 | inapplicable | passed | ✅ |

---

### 規則 18：SVG element with explicit role has non-empty accessible name
- **ACT Rule ID:** `7d6734`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/7d6734/
- **工具規則 ID（Procedure）:** `text-alternatives/svg-img-alt`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/text-alternatives/svg-img-alt.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.1.1 → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–3 | passed | passed | ✅ |
| Failed Example 1–4 | failed | failed | ✅ |
| Inapplicable Example 1–3 | inapplicable | passed | ✅ |

---

### 規則 19：Element with presentational children has no focusable content
- **ACT Rule ID:** `307n5z`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/307n5z/
- **工具規則 ID（Procedure）:** `aria/presentational-children-focusable`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/aria/presentational-children-focusable.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 4.1.2 → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–3 | passed | passed | ✅ |
| Failed Example 1–3 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | passed | ✅ |
| Passed Example 4 * | (untested) | untested | — |
| Failed Example 4–5 * | (untested) | untested | — |
| Inapplicable Example 1–2 * | (untested) | untested | — |

---

### 規則 20：Headers attribute specified on a cell refers to cells in the same table element
- **ACT Rule ID:** `a25f45`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/a25f45/
- **工具規則 ID（Procedure）:** `adaptable/td-headers-attr`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/adaptable/td-headers-attr.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.3.1 → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–8 | passed | passed | ✅ |
| Failed Example 1–4 | failed | failed | ✅ |
| Inapplicable Example 1–5 | inapplicable | passed | ✅ |
| Inapplicable Example 4, 6 * | (untested) | untested | — |

---

### 規則 21：Element with aria-hidden has no content in sequential focus navigation
- **ACT Rule ID:** `6cfa84`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/6cfa84/
- **工具規則 ID（Procedure）:** `aria/aria-hidden-focus`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/aria/aria-hidden-focus.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 4.1.2 → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–6 | passed | passed | ✅ |
| Failed Example 1–6 | failed | failed | ✅ |
| Inapplicable Example 1–3 | inapplicable | passed | ✅ |

---

### 規則 22：Meta element has no refresh delay
- **ACT Rule ID:** `bc659a`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/bc659a/
- **工具規則 ID（Procedure）:** `enough-time/meta-refresh`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/enough-time/meta-refresh.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 2.2.1 → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–3 | passed | passed | ✅ |
| Failed Example 1–4 | failed | failed | ✅ |
| Inapplicable Example 1–8 | inapplicable | passed | ✅ |

---

### 規則 23：Meta viewport allows for zoom
- **ACT Rule ID:** `b4f0c3`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/b4f0c3/
- **工具規則 ID（Procedure）:** `distinguishable/meta-viewport`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/distinguishable/meta-viewport.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.4.4 → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–3 | passed | passed | ✅ |
| Failed Example 1–4 | failed | failed | ✅ |
| Inapplicable Example 1–4 | inapplicable | passed | ✅ |
| Passed Example 2, 5 * | (untested) | untested | — |
| Failed Example 2, 3, 7 * | (untested) | untested | — |

---

### 規則 24：Object element rendering non-text content has non-empty accessible name
- **ACT Rule ID:** `8fc3b6`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/8fc3b6/
- **工具規則 ID（Procedure）:** `text-alternatives/object-alt`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/text-alternatives/object-alt.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.1.1 → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–4 | passed | passed | ✅ |
| Failed Example 1–6 | failed | failed | ✅ |
| Inapplicable Example 1–8 | inapplicable | passed | ✅ |

---

### 規則 25：HTML page has lang attribute
- **ACT Rule ID:** `b5c3f8`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/b5c3f8/
- **工具規則 ID（Procedure）:** `readable/html-has-lang`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/readable/html-has-lang.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 3.1.1 → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Failed Example 1–4 | failed | failed | ✅ |
| Inapplicable Example 1–2 | inapplicable | passed | ✅ |

---

### 規則 26：Scrollable content can be reached with sequential focus navigation
- **ACT Rule ID:** `0ssw9k`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/0ssw9k/
- **工具規則 ID（Procedure）:** `keyboard-accessible/scrollable-region`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/keyboard-accessible/scrollable-region.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 2.1.1, 2.1.3 → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1–2 | passed | passed | ✅ |
| Failed Example 1–2 | failed | failed | ✅ |
| Inapplicable Example 1–6 | inapplicable | passed | ✅ |
| Passed Example 2, 3 * | (untested) | untested | — |
| Inapplicable Example 2, 3, 6 * | (untested) | untested | — |

---

以下是 `01_accesslint-core_0.8.8.md` 的剩餘規則 27–33：

---

### 規則 27：Element in sequential focus order has visible focus
- **ACT Rule ID:** `oj04fd`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/oj04fd/
- **工具規則 ID（Procedure）:** `keyboard-accessible/focus-visible`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/keyboard-accessible/focus-visible.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 2.4.7 Focus Visible → Reported: **None**
- **備註:** 僅涵蓋 7 例中的 4 例；3 例回報 `cannot tell`（技術限制）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 4 | passed | cannot tell | ⚠️ cannot tell |
| Failed Example 1 | failed | cannot tell | ⚠️ cannot tell |
| Inapplicable Example 1 | inapplicable | passed | ✅ |
| Inapplicable Example 2 | inapplicable | passed | ✅ |
| Passed Example 4 * | (untested) | untested | — |
| Inapplicable Example 2 * | (untested) | untested | — |

---

### 規則 28：Text has minimum contrast
- **ACT Rule ID:** `afw4f7`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/afw4f7/
- **工具規則 ID（Procedure）:** `distinguishable/color-contrast`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/distinguishable/color-contrast.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.4.3 Contrast (Minimum) → Reported: **None**
- **備註:** 涵蓋 32 例中的 30 例；2 例回報 `cannot tell`

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
| Passed Example 9 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 10 | passed | passed | ✅ |
| Passed Example 11 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Failed Example 5 | failed | failed | ✅ |
| Failed Example 6 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 7 | failed | failed | ✅ |
| Failed Example 8 | failed | failed | ✅ |
| Failed Example 9 | failed | failed | ✅ |
| Failed Example 10 | failed | failed | ✅ |
| Inapplicable Example 1–11 | inapplicable | passed | ✅ |
| Passed Example 7 * | (untested) | untested | — |
| Failed Example 11 * | (untested) | untested | — |

---

### 規則 29：Text has enhanced contrast
- **ACT Rule ID:** `09o5cg`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/09o5cg/
- **工具規則 ID（Procedure）:** `distinguishable/color-contrast-enhanced`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/distinguishable/color-contrast-enhanced.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.4.6 Contrast (Enhanced) → Reported: **None**
- **備註:** 涵蓋 34 例中的 32 例；2 例回報 `cannot tell`

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | passed | ✅ |
| Passed Example 7 | passed | passed | ✅ |
| Passed Example 8 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 9 | passed | passed | ✅ |
| Passed Example 10 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Failed Example 5 | failed | failed | ✅ |
| Failed Example 6 | failed | failed | ✅ |
| Failed Example 7 | failed | failed | ✅ |
| Failed Example 8 | failed | failed | ✅ |
| Failed Example 9 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 10 | failed | failed | ✅ |
| Failed Example 11 | failed | failed | ✅ |
| Failed Example 12 | failed | failed | ✅ |
| Failed Example 13 | failed | failed | ✅ |
| Inapplicable Example 1–11 | inapplicable | passed | ✅ |
| Passed Example 6 * | (untested) | untested | — |

---

### 規則 30：Meta element has no refresh delay (no exception)
- **ACT Rule ID:** `bisz58`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/bisz58/
- **工具規則 ID（Procedure）:** `enough-time/meta-refresh-no-exception`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/enough-time/meta-refresh-no-exception.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 2.2.4 Interruptions, 3.2.5 Change on Request → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | passed | ✅ |
| Inapplicable Example 2 | inapplicable | passed | ✅ |
| Inapplicable Example 3 | inapplicable | passed | ✅ |
| Inapplicable Example 4 | inapplicable | passed | ✅ |
| Inapplicable Example 5 | inapplicable | passed | ✅ |
| Inapplicable Example 6 | inapplicable | passed | ✅ |
| Inapplicable Example 7 | inapplicable | passed | ✅ |
| Inapplicable Example 8 | inapplicable | passed | ✅ |

---

### 規則 31：Orientation of the page is not restricted using CSS transforms
- **ACT Rule ID:** `b33eff`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/b33eff/
- **工具規則 ID（Procedure）:** `adaptable/orientation-lock`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/adaptable/orientation-lock.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.3.4 Orientation → Reported: **None**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | passed | ✅ |
| Inapplicable Example 2 | inapplicable | passed | ✅ |
| Inapplicable Example 3 | inapplicable | passed | ✅ |
| Inapplicable Example 4 | inapplicable | passed | ✅ |
| Inapplicable Example 5 | inapplicable | passed | ✅ |
| Inapplicable Example 3 * | (untested) | untested | — |

---

### 規則 32：Element with role attribute has required states and properties
- **ACT Rule ID:** `4e8ab6`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/4e8ab6/
- **工具規則 ID（Procedure）:** `aria/aria-required-attr`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/aria/aria-required-attr.ts
- **一致性:** ✅ Consistent
- **成功標準差異:** 無（Expected: None, Reported: None）

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
| Inapplicable Example 1 | inapplicable | passed | ✅ |
| Inapplicable Example 2 | inapplicable | passed | ✅ |
| Inapplicable Example 3 | inapplicable | passed | ✅ |

---

### 規則 33：Summary element has non-empty accessible name
- **ACT Rule ID:** `2t702h`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/2t702h/
- **工具規則 ID（Procedure）:** `labels-and-names/summary-name`
- **規則邏輯文件:** https://github.com/AccessLint/accesslint/blob/main/core/src/rules/labels-and-names/summary-name.ts
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 4.1.2 Name, Role, Value → Reported: **None**

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
| Inapplicable Example 1 | inapplicable | passed | ✅ |
| Inapplicable Example 2 | inapplicable | passed | ✅ |
| Inapplicable Example 3 | inapplicable | passed | ✅ |
| Inapplicable Example 4 | inapplicable | passed | ✅ |

---

## 總結摘要

| 統計項目 | 數量 |
|---------|------|
| 實作規則總數 | 33 |
| ✅ 完全一致（Consistent）| 5（674b10、6a7281、5f99a7、46ca7f、4e8ab6）|
| ⚠️ 部分一致（Partial）| 28 |
| 部分一致主要原因 | 未回報對應 WCAG 成功標準（Reported: None） |
| 含 `cannot tell` 的規則 | 3（oj04fd、afw4f7、09o5cg） |
| 含 `untested` 的規則 | 11 個規則有 `*` 未核准例子 |

> **注意：** `cannot tell` 案例不計入一致性判斷，但 `Partial` 主因是工具未回報對應的 WCAG 成功標準（例如工具回報 None 而非 1.4.3），**測試案例的 pass/fail/inapplicable 結果本身均正確**。
