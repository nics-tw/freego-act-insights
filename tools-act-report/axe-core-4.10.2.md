# Axe-core 4.10.2 — ACT Rules 實作報告

| 欄位 | 資訊 |
|------|------|
| 工具名稱 | Axe-core |
| 版本 | 4.10.2 |
| 開發者 | [Deque Systems](https://deque.com/) |
| 開發語言 | JavaScript |
| 工具類型 | Automated |
| 標準 | WCAG 2.1 Level A, AA, AAA；WAI-ARIA 1.2 |
| W3C ACT 頁面 | https://www.w3.org/WAI/standards-guidelines/act/implementations/axe-core/ |
| 官方網站 | https://www.npmjs.com/package/axe-core/ |
| EARL 測試報告 | https://raw.githubusercontent.com/dequelabs/act-reports-axe/main/reports/axe-core.json |
| 規則邏輯文件 | https://dequeuniversity.com/rules/axe/4.10/（各規則對應 Procedure ID） |
| 最後更新 | 2023-11-02 |
| 一致規則數 | 26 WCAG + 3 Proposed |
| 部分一致規則數 | 1 WCAG + 11 Proposed |

> **注意：** ACT Rules 使用 axe-core canary 版本（axe-core@next），啟用所有規則（含 experimental），停用含 unsupported ID 的 checks。

> **結果說明：** `Consistent` = 完全一致；`Partial` = 部分一致；`cannot tell` = 技術限制；`untested` = 尚未核准案例（`*`）

---

## WCAG 2 Rules

### 規則 1：Role attribute has valid value
- **ACT Rule ID:** `674b10`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/674b10/
- **Procedure ID:** `aria-roles`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/aria-roles
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: None → Reported: **4.1.2**（工具額外回報，仍符合一致性）

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
| Inapplicable Example 4 * | (untested) | untested | — |

---

### 規則 2：ARIA state or property has valid value
- **ACT Rule ID:** `6a7281`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/6a7281/
- **Procedure ID:** `aria-valid-attr-value`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr-value
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: None → Reported: **4.1.2**
- **備註:** 涵蓋 21 例中的 20 例；Inapplicable Example 3 回報 `cannot tell`

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
| Inapplicable Example 3 | inapplicable | cannot tell | ⚠️ cannot tell |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |

---

### 規則 3：ARIA attribute is defined in WAI-ARIA
- **ACT Rule ID:** `5f99a7`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/5f99a7/
- **Procedure ID:** `aria-valid-attr`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: None → Reported: **4.1.2**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Passed Example 2 * | (untested) | untested | — |

---

### 規則 4：Element with lang attribute has valid language tag
- **ACT Rule ID:** `de46e4`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/de46e4/
- **Procedure ID:** `valid-lang`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/valid-lang
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 3.1.2 → Reported: **3.1.2**
- **備註:** Failed Example 6 回報 `passed, failed`；Inapplicable Example 2–5 回報 `passed`，仍符合一致性

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
| Failed Example 6 | failed | passed, failed | ✅ |
| Failed Example 7 | failed | failed | ✅ |
| Failed Example 8 | failed | failed | ✅ |
| Failed Example 9 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | passed | ✅ |
| Inapplicable Example 3 | inapplicable | passed | ✅ |
| Inapplicable Example 4 | inapplicable | passed | ✅ |
| Inapplicable Example 5 | inapplicable | passed | ✅ |

---

### 規則 5：Menuitem has non-empty accessible name
- **ACT Rule ID:** `m6b1q3`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/m6b1q3/
- **Procedure ID:** `button-name`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/button-name
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

### 規則 6：Autocomplete attribute has valid value
- **ACT Rule ID:** `73f2c2`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/73f2c2/
- **Procedure ID:** `autocomplete-valid`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/autocomplete-valid
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.3.5 → Reported: **1.3.5**
- **備註:** Inapplicable Example 7 回報 `passed`，仍符合一致性

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
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Failed Example 5 | failed | failed | ✅ |
| Failed Example 6 | failed | failed | ✅ |
| Failed Example 7 | failed | failed | ✅ |
| Failed Example 8 | failed | failed | ✅ |
| Failed Example 9 | failed | failed | ✅ |
| Failed Example 10 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 6 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 7 | inapplicable | passed | ✅ |
| Inapplicable Example 8 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 9 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 8 * | (untested) | untested | — |
| Inapplicable Example 9 * | (untested) | untested | — |

---

### 規則 7：Button has non-empty accessible name
- **ACT Rule ID:** `97a4e1`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/97a4e1/
- **Procedure ID:** `button-name`, `aria-command-name`（兩個 procedure，失敗案例只需一個回報 failed 即可）
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/button-name
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 4.1.2 → Reported: **4.1.2**

| 測試案例 | 預期結果 | button-name | aria-command-name | 一致？ |
|---------|---------|------------|------------------|-------|
| Passed Example 1 | passed | passed | inapplicable | ✅ |
| Passed Example 2 | passed | inapplicable | inapplicable | ✅ |
| Passed Example 3 | passed | passed | inapplicable | ✅ |
| Passed Example 4 | passed | inapplicable | passed | ✅ |
| Passed Example 5 | passed | passed | inapplicable | ✅ |
| Passed Example 6 | passed | passed | inapplicable | ✅ |
| Passed Example 7 | passed | inapplicable | inapplicable | ✅ |
| Failed Example 1 | failed | failed | inapplicable | ✅ |
| Failed Example 2 | failed | failed | inapplicable | ✅ |
| Failed Example 3 | failed | inapplicable | failed | ✅ |
| Failed Example 4 | failed | failed | inapplicable | ✅ |
| Failed Example 5 | failed | failed | inapplicable | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | passed | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | passed | inapplicable | ✅ |

---

### 規則 8：Element marked as decorative is not exposed
- **ACT Rule ID:** `46ca7f`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/46ca7f/
- **Procedure ID:** `presentation-role-conflict`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/presentation-role-conflict
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: None → Reported: **None**
- **備註:** Passed Example 2、3 回報 `inapplicable`，仍符合一致性

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | inapplicable | ✅ |
| Passed Example 3 | passed | inapplicable | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |

---

### 規則 9：Form field has non-empty accessible name
- **ACT Rule ID:** `e086e5`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/e086e5/
- **Procedure ID:** `label`, `aria-input-field-name`, `select-name`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/label
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 4.1.2 → Reported: **4.1.2**

| 測試案例 | 預期結果 | label | aria-input-field-name | select-name | 一致？ |
|---------|---------|-------|----------------------|------------|-------|
| Passed Example 1 | passed | passed | inapplicable | inapplicable | ✅ |
| Passed Example 2 | passed | passed | inapplicable | inapplicable | ✅ |
| Passed Example 3 | passed | inapplicable | inapplicable | passed | ✅ |
| Passed Example 4 | passed | passed | inapplicable | inapplicable | ✅ |
| Passed Example 5 | passed | passed | inapplicable | inapplicable | ✅ |
| Passed Example 6 | passed | inapplicable | passed | inapplicable | ✅ |
| Passed Example 7 | passed | inapplicable | inapplicable | inapplicable | ✅ |
| Passed Example 8 | passed | passed | inapplicable | inapplicable | ✅ |
| Failed Example 1 | failed | failed | inapplicable | inapplicable | ✅ |
| Failed Example 2 | failed | failed | inapplicable | inapplicable | ✅ |
| Failed Example 3 | failed | failed | inapplicable | inapplicable | ✅ |
| Failed Example 4 | failed | inapplicable | inapplicable | failed | ✅ |
| Failed Example 5 | failed | inapplicable | failed | inapplicable | ✅ |
| Failed Example 6 | failed | inapplicable | failed | inapplicable | ✅ |
| Failed Example 7 | failed | inapplicable | failed | inapplicable | ✅ |
| Failed Example 8 | failed | failed | inapplicable | inapplicable | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | inapplicable | passed | ✅ |
| Passed Example 8 * | (untested) | untested | untested | untested | — |
| Passed Example 9 * | (untested) | untested | untested | untested | — |
| Failed Example 9 * | (untested) | untested | untested | untested | — |

---

### 規則 10：HTML page lang attribute has valid language tag
- **ACT Rule ID:** `bf051a`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/bf051a/
- **Procedure ID:** `html-lang-valid`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/html-lang-valid
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

### 規則 11：HTML page has non-empty title
- **ACT Rule ID:** `2779a5`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/2779a5/
- **Procedure ID:** `document-title`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/document-title
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 2.4.2 → Reported: **2.4.2**

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
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Passed Example 2 * | (untested) | untested | — |
| Failed Example 6 * | (untested) | untested | — |

---

### 規則 12：Image button has non-empty accessible name
- **ACT Rule ID:** `59796f`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/59796f/
- **Procedure ID:** `input-image-alt`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/input-image-alt
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.1.1, 4.1.2 → Reported: **1.1.1, 4.1.2**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | inapplicable | ✅ |

---

### 規則 13：Image has non-empty accessible name
- **ACT Rule ID:** `23a2a8`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/23a2a8/
- **Procedure ID:** `image-alt`, `role-img-alt`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/image-alt
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.1.1 → Reported: **1.1.1**

| 測試案例 | 預期結果 | image-alt | role-img-alt | 一致？ |
|---------|---------|----------|-------------|-------|
| Passed Example 1 | passed | passed | inapplicable | ✅ |
| Passed Example 2 | passed | inapplicable | passed | ✅ |
| Passed Example 3 | passed | inapplicable | passed | ✅ |
| Passed Example 4 | passed | passed | inapplicable | ✅ |
| Passed Example 5 | passed | passed | inapplicable | ✅ |
| Passed Example 6 | passed | passed | inapplicable | ✅ |
| Passed Example 7 | passed | passed | inapplicable | ✅ |
| Passed Example 8 | passed | passed | inapplicable | ✅ |
| Failed Example 1 | failed | failed | inapplicable | ✅ |
| Failed Example 2 | failed | inapplicable | failed | ✅ |
| Failed Example 3 | failed | failed | inapplicable | ✅ |
| Failed Example 4 | failed | failed | inapplicable | ✅ |
| Failed Example 5 | failed | failed | inapplicable | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | inapplicable | inapplicable | ✅ |

---

### 規則 14：Link has non-empty accessible name
- **ACT Rule ID:** `c487ae`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/
- **Procedure ID:** `link-name`, `area-alt`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/link-name
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 4.1.2, 2.4.4 → Reported: **2.4.4, 4.1.2**
- **備註:** Inapplicable Example 1 回報 `passed`，仍符合一致性

| 測試案例 | 預期結果 | link-name | area-alt | 一致？ |
|---------|---------|----------|---------|-------|
| Passed Example 1 | passed | passed | inapplicable | ✅ |
| Passed Example 2 | passed | inapplicable | inapplicable | ✅ |
| Passed Example 3 | passed | inapplicable | inapplicable | ✅ |
| Passed Example 4 | passed | passed | inapplicable | ✅ |
| Passed Example 5 | passed | passed | inapplicable | ✅ |
| Passed Example 6 | passed | passed | inapplicable | ✅ |
| Passed Example 7 | passed | passed | inapplicable | ✅ |
| Passed Example 8 | passed | passed | inapplicable | ✅ |
| Passed Example 9 | passed | passed | inapplicable | ✅ |
| Passed Example 10 | passed | inapplicable | passed | ✅ |
| Passed Example 11 | passed | passed | inapplicable | ✅ |
| Failed Example 1 | failed | failed | inapplicable | ✅ |
| Failed Example 2 | failed | failed | inapplicable | ✅ |
| Failed Example 3 | failed | failed | inapplicable | ✅ |
| Failed Example 4 | failed | failed | inapplicable | ✅ |
| Failed Example 5 | failed | failed | inapplicable | ✅ |
| Failed Example 6 | failed | failed | inapplicable | ✅ |
| Failed Example 7 | failed | failed | inapplicable | ✅ |
| Failed Example 8 | failed | failed | inapplicable | ✅ |
| Failed Example 9 | failed | inapplicable | failed | ✅ |
| Failed Example 10 | failed | failed | inapplicable | ✅ |
| Failed Example 11 | failed | failed | inapplicable | ✅ |
| Inapplicable Example 1 | inapplicable | passed | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 6 | inapplicable | inapplicable | inapplicable | ✅ |

---

### 規則 15：SVG element with explicit role has non-empty accessible name
- **ACT Rule ID:** `7d6734`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/7d6734/
- **Procedure ID:** `svg-img-alt`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/svg-img-alt
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.1.1 → Reported: **1.1.1**

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

---

### 規則 16：Element with presentational children has no focusable content
- **ACT Rule ID:** `307n5z`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/307n5z/
- **Procedure ID:** `nested-interactive`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/nested-interactive
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 4.1.2 → Reported: **4.1.2**
- **備註:** Failed Example 1、3 回報 `passed, failed`，仍符合一致性（至少一個 procedure 回報 failed）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Failed Example 1 | failed | passed, failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | passed, failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Passed Example 4 * | (untested) | untested | — |
| Failed Example 4 * | (untested) | untested | — |
| Failed Example 5 * | (untested) | untested | — |
| Inapplicable Example 1 * | (untested) | untested | — |
| Inapplicable Example 2 * | (untested) | untested | — |

---

### 規則 17：Headers attribute specified on a cell refers to cells in the same table element
- **ACT Rule ID:** `a25f45`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/a25f45/
- **Procedure ID:** `td-headers-attr`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/td-headers-attr
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.3.1 → Reported: **1.3.1**
- **備註:** Failed Example 2 回報 `passed, failed`；Inapplicable Example 1、3 回報 `passed`，仍符合一致性

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
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | passed, failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | passed | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | passed | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 * | (untested) | untested | — |
| Inapplicable Example 6 * | (untested) | untested | — |

---

### 規則 18：Element with aria-hidden has no content in sequential focus navigation
- **ACT Rule ID:** `6cfa84`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/6cfa84/
- **Procedure ID:** `aria-hidden-focus`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/aria-hidden-focus
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 4.1.2 → Reported: **4.1.2**
- **備註:** 涵蓋 15 例中的 13 例；Passed Example 4、Failed Example 6 回報 `cannot tell`

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Failed Example 5 | failed | failed | ✅ |
| Failed Example 6 | failed | cannot tell | ⚠️ cannot tell |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |

---

### 規則 19：Meta element has no refresh delay
- **ACT Rule ID:** `bc659a`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/bc659a/
- **Procedure ID:** `meta-refresh`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/meta-refresh
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 2.2.1 → Reported: **2.2.1**
- **備註:** Failed Example 3 回報 `passed, failed`；Inapplicable Example 3–8 回報 `passed`，仍符合一致性

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | passed, failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | passed | ✅ |
| Inapplicable Example 4 | inapplicable | passed | ✅ |
| Inapplicable Example 5 | inapplicable | passed | ✅ |
| Inapplicable Example 6 | inapplicable | passed | ✅ |
| Inapplicable Example 7 | inapplicable | passed | ✅ |
| Inapplicable Example 8 | inapplicable | passed | ✅ |

---

### 規則 20：Meta viewport allows for zoom
- **ACT Rule ID:** `b4f0c3`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/b4f0c3/
- **Procedure ID:** `meta-viewport`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/meta-viewport
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.4.4 → Reported: **1.4.4**
- **備註:** Inapplicable Example 2–4 回報 `passed`，仍符合一致性

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
| Inapplicable Example 2 | inapplicable | passed | ✅ |
| Inapplicable Example 3 | inapplicable | passed | ✅ |
| Inapplicable Example 4 | inapplicable | passed | ✅ |
| Passed Example 2 * | (untested) | passed | — |
| Passed Example 5 * | (untested) | passed | — |
| Failed Example 2 * | (untested) | failed | — |
| Failed Example 3 * | (untested) | passed | — |
| Failed Example 7 * | (untested) | passed | — |

---

### 規則 21：Object element rendering non-text content has non-empty accessible name
- **ACT Rule ID:** `8fc3b6`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/8fc3b6/
- **Procedure ID:** `object-alt`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/object-alt
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.1.1 → Reported: **1.1.1**
- **備註:** Inapplicable Example 1、5、6 回報 `passed`，仍符合一致性

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Failed Example 5 | failed | failed | ✅ |
| Failed Example 6 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | passed | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | passed | ✅ |
| Inapplicable Example 6 | inapplicable | passed | ✅ |
| Inapplicable Example 7 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 8 | inapplicable | inapplicable | ✅ |

---

### 規則 22：HTML page has lang attribute
- **ACT Rule ID:** `b5c3f8`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/b5c3f8/
- **Procedure ID:** `html-has-lang`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/html-has-lang
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 3.1.1 → Reported: **3.1.1**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |

---

### 規則 23：Scrollable content can be reached with sequential focus navigation
- **ACT Rule ID:** `0ssw9k`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/0ssw9k/
- **Procedure ID:** `scrollable-region-focusable`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 2.1.1, 2.1.3 → Reported: **2.1.1, 2.1.3**

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 6 | inapplicable | inapplicable | ✅ |
| Passed Example 2 * | (untested) | untested | — |
| Passed Example 3 * | (untested) | untested | — |
| Inapplicable Example 2 * | (untested) | untested | — |
| Inapplicable Example 3 * | (untested) | untested | — |
| Inapplicable Example 6 * | (untested) | untested | — |

---

### 規則 24：Text has minimum contrast
- **ACT Rule ID:** `afw4f7`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/afw4f7/
- **Procedure ID:** `color-contrast`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/color-contrast
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.4.3 → Reported: **1.4.3**
- **備註:** 涵蓋 32 例中的 25 例；7 例回報 `cannot tell`。Passed Example 7 回報 `inapplicable`；Failed Example 8 回報 `passed, failed`

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 3 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | passed | ✅ |
| Passed Example 7 | passed | inapplicable | ✅ |
| Passed Example 8 | passed | passed | ✅ |
| Passed Example 9 | passed | passed | ✅ |
| Passed Example 10 | passed | passed | ✅ |
| Passed Example 11 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 3 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 4 | failed | failed | ✅ |
| Failed Example 5 | failed | failed | ✅ |
| Failed Example 6 | failed | failed | ✅ |
| Failed Example 7 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 8 | failed | passed, failed | ✅ |
| Failed Example 9 | failed | failed | ✅ |
| Failed Example 10 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | cannot tell | ⚠️ cannot tell |
| Inapplicable Example 4 | inapplicable | cannot tell | ⚠️ cannot tell |
| Inapplicable Example 5 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 6 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 7 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 8 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 9 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 10 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 11 | inapplicable | inapplicable | ✅ |
| Passed Example 7 * | (untested) | untested | — |
| Failed Example 11 * | (untested) | untested | — |

---

### 規則 25：Text has enhanced contrast
- **ACT Rule ID:** `09o5cg`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/09o5cg/
- **Procedure ID:** `color-contrast-enhanced`, `color-contrast`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/color-contrast-enhanced
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.4.6 → Reported: **1.4.6, 1.4.3**（額外回報 1.4.3，仍符合一致性）
- **備註:** 涵蓋 34 例中的 27 例；7 例回報 `cannot tell`

| 測試案例 | 預期結果 | color-contrast-enhanced | color-contrast | 一致？ |
|---------|---------|------------------------|----------------|-------|
| Passed Example 1 | passed | passed | passed | ✅ |
| Passed Example 2 | passed | passed | cannot tell | ✅ |
| Passed Example 3 | passed | passed | cannot tell | ✅ |
| Passed Example 4 | passed | passed | passed | ✅ |
| Passed Example 5 | passed | passed | passed | ✅ |
| Passed Example 6 | passed | inapplicable | inapplicable | ✅ |
| Passed Example 7 | passed | passed | passed | ✅ |
| Passed Example 8 | passed | passed | passed | ✅ |
| Passed Example 9 | passed | passed | passed | ✅ |
| Passed Example 10 | passed | passed | passed | ✅ |
| Failed Example 1 | failed | failed | passed | ✅ |
| Failed Example 2 | failed | passed | cannot tell | ⚠️ cannot tell |
| Failed Example 3 | failed | failed | passed | ✅ |
| Failed Example 4 | failed | passed | failed | ✅ |
| Failed Example 5 | failed | failed | passed | ✅ |
| Failed Example 6 | failed | passed | cannot tell | ⚠️ cannot tell |
| Failed Example 7 | failed | failed | passed | ✅ |
| Failed Example 8 | failed | failed | passed | ✅ |
| Failed Example 9 | failed | failed | passed | ✅ |
| Failed Example 10 | failed | passed | cannot tell | ⚠️ cannot tell |
| Failed Example 11 | failed | passed, failed | passed | ✅ |
| Failed Example 12 | failed | failed | passed | ✅ |
| Failed Example 13 | failed | failed | passed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | passed | cannot tell | ✅ |
| Inapplicable Example 4 | inapplicable | passed | cannot tell | ✅ |
| Inapplicable Example 5 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 6–11 | inapplicable | inapplicable | inapplicable | ✅ |
| Passed Example 6 * | (untested) | untested | untested | — |

---

### 規則 26：Meta element has no refresh delay (no exception)
- **ACT Rule ID:** `bisz58`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/bisz58/
- **Procedure ID:** `meta-refresh-no-exceptions`, `meta-refresh`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/meta-refresh-no-exceptions
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 2.2.4, 3.2.5 → Reported: **2.2.4, 3.2.5, 2.2.1**（額外回報 2.2.1，仍符合一致性）
- **備註:** Failed Example 1 由 meta-refresh 回報 failed；Inapplicable Example 3–8 回報 `passed`，仍符合一致性

| 測試案例 | 預期結果 | meta-refresh-no-exceptions | meta-refresh | 一致？ |
|---------|---------|---------------------------|-------------|-------|
| Passed Example 1 | passed | passed | passed | ✅ |
| Passed Example 2 | passed | passed | passed | ✅ |
| Failed Example 1 | failed | passed | failed | ✅ |
| Failed Example 2 | failed | failed | passed | ✅ |
| Failed Example 3 | failed | passed, failed | passed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | passed | passed | ✅ |
| Inapplicable Example 4 | inapplicable | passed | passed | ✅ |
| Inapplicable Example 5 | inapplicable | passed | passed | ✅ |
| Inapplicable Example 6 | inapplicable | passed | passed | ✅ |
| Inapplicable Example 7 | inapplicable | passed | passed | ✅ |
| Inapplicable Example 8 | inapplicable | passed | passed | ✅ |

---

### 規則 27（Partial）：Element with role attribute has required states and properties
- **ACT Rule ID:** `4e8ab6`
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/4e8ab6/
- **Procedure ID:** `aria-required-attr`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/aria-required-attr
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: None → Reported: **4.1.2**（工具額外回報）
- **備註:** 涵蓋 14 例中的 11 例；Passed Example 2, 6、Inapplicable Example 2 無結果（untested）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | untested | — |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | untested | — |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | failed | ✅ |
| Failed Example 5 | failed | passed, failed | ✅ |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | untested | — |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |

---

## Proposed Rules

### 規則 28：ARIA required context role
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/ff89c9/
- **Procedure ID:** `aria-required-parent`, `aria-required-children`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/aria-required-parent
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 1.3.1 → Reported: **1.3.1**
- **備註:** 涵蓋 15 例中的 14 例；Failed Example 4 的 aria-required-children 回報 `cannot tell`

| 測試案例 | 預期結果 | aria-required-parent | aria-required-children | 一致？ |
|---------|---------|---------------------|----------------------|-------|
| Passed Example 1 | passed | passed | passed | ✅ |
| Passed Example 2 | passed | passed | inapplicable | ✅ |
| Passed Example 3 | passed | passed | passed | ✅ |
| Passed Example 4 | passed | passed | passed | ✅ |
| Passed Example 5 | passed | passed | passed | ✅ |
| Passed Example 6 | passed | passed | passed | ✅ |
| Failed Example 1 | failed | failed | inapplicable | ✅ |
| Failed Example 2 | failed | failed | failed | ✅ |
| Failed Example 3 | failed | passed | failed | ✅ |
| Failed Example 4 | failed | failed | cannot tell | ⚠️ cannot tell |
| Inapplicable Example 1 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | passed | inapplicable | ✅ |

---

### 規則 29（Partial）：ARIA required owned elements
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/bc4a75/
- **Procedure ID:** `aria-required-children`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/aria-required-children
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.3.1 → Reported: **1.3.1**
- **備註:** 涵蓋 24 例中的 14 例；10 例回報 `untested`（無結果）。Failed Example 4 回報 `passed, failed`，Passed Example 7 回報 `inapplicable`

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | untested | — |
| Passed Example 3 | passed | untested | — |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | passed | ✅ |
| Passed Example 7 | passed | inapplicable | ✅ |
| Passed Example 8 | passed | untested | — |
| Passed Example 9 | passed | untested | — |
| Passed Example 10 | passed | untested | — |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | passed, failed | ✅ |
| Failed Example 5 | failed | failed | ✅ |
| Failed Example 6 | failed | failed | ✅ |
| Failed Example 7 | failed | failed | ✅ |
| Failed Example 8 | failed | untested | — |
| Failed Example 9 | failed | untested | — |
| Failed Example 10 | failed | untested | — |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | untested | — |
| Inapplicable Example 3 | inapplicable | untested | — |
| Inapplicable Example 4 | inapplicable | passed | ✅ |

---

### 規則 30（Partial）：ARIA state or property is permitted
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/5c01ea/
- **Procedure ID:** `aria-allowed-attr`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/aria-allowed-attr
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: None → Reported: **4.1.2**
- **備註:** 涵蓋 17 例中的 11 例；6 例回報 `untested`

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | untested | — |
| Passed Example 7 | passed | untested | — |
| Passed Example 8 | passed | untested | — |
| Passed Example 9 | passed | passed | ✅ |
| Passed Example 10 | passed | passed | ✅ |
| Passed Example 11 | passed | passed | ✅ |
| Passed Example 12 | passed | untested | — |
| Passed Example 13 | passed | untested | — |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Inapplicable Example 1 | inapplicable | untested | — |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |

---

### 規則 31（Partial）：Block of repeated content is collapsible
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/3e12e1/
- **Procedure ID:** `bypass`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/bypass
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: None → Reported: **2.4.1**（工具回報不應存在的成功標準）
- **備註:** 涵蓋 8 例中的 1 例；7 例回報 `cannot tell`

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 2 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 3 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 4 | passed | cannot tell | ⚠️ cannot tell |
| Failed Example 1 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 2 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 3 | failed | cannot tell | ⚠️ cannot tell |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |

---

### 規則 32（Partial）：Bypass Blocks of Repeated Content
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/cf77f2/
- **Procedure ID:** `bypass`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/bypass
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 2.4.1 → Reported: **2.4.1**
- **備註:** 涵蓋 14 例中的 9 例；5 例回報 `cannot tell`

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | passed | ✅ |
| Passed Example 7 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 8 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 9 | passed | passed | ✅ |
| Passed Example 10 | passed | passed | ✅ |
| Passed Example 11 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 12 | passed | passed | ✅ |
| Failed Example 1 | failed | cannot tell | ⚠️ cannot tell |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |

---

### 規則 33（Partial）：Document has heading for non-repeated content
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/047fe0/
- **Procedure ID:** `bypass`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/bypass
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: None → Reported: **2.4.1**（回報不應存在的成功標準）
- **備註:** 涵蓋 14 例中的 10 例；2 例 cannot tell，Failed Example 2, 4 回報 `passed`

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
| Passed Example 9 | passed | inapplicable | ✅ |
| Failed Example 1 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 2 | failed | passed | ❌ 不一致 |
| Failed Example 3 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 4 | failed | passed | ❌ 不一致 |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |

---

### 規則 34（Partial）：Document has an instrument to move focus to non-repeated content
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/ye5d6e/
- **Procedure ID:** `bypass`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/bypass
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: None → Reported: **2.4.1**
- **備註:** 涵蓋 12 例中的 8 例；Failed Example 2, 3 回報 `passed`（誤判）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 6 | passed | passed | ✅ |
| Passed Example 7 | passed | passed | ✅ |
| Passed Example 8 | passed | passed | ✅ |
| Failed Example 1 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 2 | failed | passed | ❌ 不一致 |
| Failed Example 3 | failed | passed | ❌ 不一致 |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |

---

### 規則 35（Partial）：Document has a landmark with non-repeated content
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/b40fd1/
- **Procedure ID:** `bypass`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/bypass
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: None → Reported: **2.4.1**
- **備註:** 涵蓋 8 例中的 5 例；3 例 cannot tell

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | inapplicable | ✅ |
| Failed Example 1 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 2 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 3 | failed | cannot tell | ⚠️ cannot tell |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |

---

### 規則 36：Heading has non-empty accessible name
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/ffd0e9/
- **Procedure ID:** `empty-heading`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/empty-heading
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: None → Reported: **None**

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

### 規則 37（Partial）：Iframe elements with identical accessible names have equivalent purpose
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/4b1c6c/
- **Procedure ID:** `frame-title-unique`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/frame-title-unique
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 4.1.2 → Reported: **4.1.2**
- **備註:** 涵蓋 23 例中的 11 例；10 例 cannot tell；Failed Example 3 回報 `passed`（誤判）

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | inapplicable | ✅ |
| Passed Example 4 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 5 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 6 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 7 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 8 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 9 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 10 | passed | cannot tell | ⚠️ cannot tell |
| Failed Example 1 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 2 | failed | inapplicable | ✅ |
| Failed Example 3 | failed | passed | ❌ 不一致 |
| Failed Example 4 | failed | cannot tell | ⚠️ cannot tell |
| Inapplicable Example 1 | inapplicable | passed | ✅ |
| Inapplicable Example 2 | inapplicable | passed | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 5 | inapplicable | passed | ✅ |
| Inapplicable Example 6 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 7 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 8 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 9 | inapplicable | inapplicable | ✅ |

---

### 規則 38：Iframe element has non-empty accessible name
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/cae760/
- **Procedure ID:** `frame-title`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/frame-title
- **一致性:** ✅ Consistent
- **成功標準差異:** Expected: 4.1.2 → Reported: **4.1.2**
- **備註:** Inapplicable Example 4 回報 `passed`，仍符合一致性

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
| Inapplicable Example 4 | inapplicable | passed | ✅ |

---

### 規則 39（Partial）：Links with identical accessible names have equivalent purpose
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/b20e66/
- **Procedure ID:** `identical-links-same-purpose`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/identical-links-same-purpose
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 2.4.9 → Reported: **2.4.9**
- **備註:** 涵蓋 21 例中的 10 例；11 例 cannot tell；Inapplicable Example 2 回報 `passed`

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | cannot tell | ⚠️ cannot tell |
| Passed Example 5 | passed | passed | ✅ |
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
| Inapplicable Example 2 | inapplicable | passed | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |

---

### 規則 40（Partial）：Table header cell has assigned cells
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/d0f69e/
- **Procedure ID:** `th-has-data-cells`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/th-has-data-cells
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 1.3.1 → Reported: **1.3.1**
- **備註:** 涵蓋 16 例中的 11 例；2 例 cannot tell；2 例 untested；Failed Example 1–2 回報 cannot tell

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | untested | — |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | untested | — |
| Passed Example 5 | passed | passed | ✅ |
| Passed Example 6 | passed | passed | ✅ |
| Failed Example 1 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 2 | failed | cannot tell | ⚠️ cannot tell |
| Failed Example 3 | failed | inapplicable | ❌ 不一致 |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | passed | ✅ |
| Inapplicable Example 4 | inapplicable | passed | ✅ |
| Inapplicable Example 5 | inapplicable | passed | ✅ |
| Inapplicable Example 6 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 7 | inapplicable | inapplicable | ✅ |

---

### 規則 41（Partial）：Visible label is part of accessible name
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/2ee8b8/
- **Procedure ID:** `label-content-name-mismatch`
- **規則邏輯文件:** https://dequeuniversity.com/rules/axe/4.10/label-content-name-mismatch
- **一致性:** ⚠️ Partial
- **成功標準差異:** Expected: 2.5.3 → Reported: **2.5.3**
- **備註:** 涵蓋 15 例中的 12 例；3 例 untested

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| Passed Example 1 | passed | passed | ✅ |
| Passed Example 2 | passed | passed | ✅ |
| Passed Example 3 | passed | passed | ✅ |
| Passed Example 4 | passed | passed | ✅ |
| Passed Example 5 | passed | untested | — |
| Passed Example 6 | passed | passed | ✅ |
| Failed Example 1 | failed | failed | ✅ |
| Failed Example 2 | failed | failed | ✅ |
| Failed Example 3 | failed | failed | ✅ |
| Failed Example 4 | failed | untested | — |
| Failed Example 5 | failed | untested | — |
| Inapplicable Example 1 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 2 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 3 | inapplicable | inapplicable | ✅ |
| Inapplicable Example 4 | inapplicable | inapplicable | ✅ |

---

## 總結摘要

| 統計項目 | 數量 |
|---------|------|
| 實作規則總數 | 41（27 WCAG + 14 Proposed）|
| ✅ 完全一致（Consistent）| 29（26 WCAG + 3 Proposed）|
| ⚠️ 部分一致（Partial）| 12（1 WCAG + 11 Proposed）|

### Partial 原因分析

| 規則 | Partial 原因 |
|------|------------|
| Element with role required states (4e8ab6) | 3 例 untested（資料較新）|
| ARIA required owned elements (bc4a75) | 10 例 untested；含誤判 |
| ARIA state or property is permitted (5c01ea) | 6 例 untested |
| Block of repeated content is collapsible (3e12e1) | 7 例 cannot tell；額外回報 2.4.1 |
| Bypass Blocks of Repeated Content (cf77f2) | 5 例 cannot tell |
| Document has heading for non-repeated content (047fe0) | 額外回報 2.4.1；Failed 案例誤判為 passed |
| Document has instrument to move focus (ye5d6e) | 額外回報 2.4.1；Failed 案例誤判 |
| Document has landmark (b40fd1) | 額外回報 2.4.1；3 例 cannot tell |
| Iframe identical names (4b1c6c) | 10 例 cannot tell；Failed Example 3 誤判 |
| Links identical names (b20e66) | 11 例 cannot tell |
| Table header cell (d0f69e) | 2 例 cannot tell；1 例誤判；2 例 untested |
| Visible label is part of accessible name (2ee8b8) | 3 例 untested |

> **注意：** 工具使用 canary 版本（axe-core@next），部分規則測試案例較新，工具尚未收錄，故顯示為 untested。
