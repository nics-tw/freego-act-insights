# SortSite 6.55 — ACT Rules 實作報告

| 欄位 | 資訊 |
|------|------|
| 工具名稱 | SortSite |
| 版本 | 6.55 |
| 開發者 | [PowerMapper](https://www.powermapper.com/) |
| 開發語言 | 官方未公開（閉源產品） |
| 工具類型 | Automated |
| 標準 | WCAG 2.1 Level A, AA, AAA；WAI-ARIA 1.2 |
| W3C ACT 頁面 | https://www.w3.org/WAI/standards-guidelines/act/implementations/sortsite/ |
| 官方網站 | https://www.powermapper.com/products/sortsite/ |
| EARL 測試報告 | https://qa.powermapper.com/Tests/ACT-R/report.json |
| 規則邏輯文件 | https://www.powermapper.com/products/sortsite/checks/accessibility-checks/ |
| 最後更新 | 30 December 2025 |
| 一致規則數 | 33 WCAG + 9 Proposed |
| 部分一致規則數 | 1 WCAG + 1 Proposed |

> **結果說明：** `Consistent` = 所有測試案例結果完全一致；`Partial` = 部分一致（通常因未回報成功標準）；`cannot tell` = 技術限制無法判斷；`untested` = 尚未核准的例子。

---

## WCAG 2 規則

| # | 規則名稱 | ACT 規則 ID | 一致性 |
|---|---------|------------|--------|
| 1 | [Role attribute has valid value](https://www.w3.org/WAI/standards-guidelines/act/rules/674b10/) | [674b10](https://www.w3.org/WAI/standards-guidelines/act/rules/674b10/) | ✅ Consistent |
| 2 | [ARIA state or property has valid value](https://www.w3.org/WAI/standards-guidelines/act/rules/6a7281/) | [6a7281](https://www.w3.org/WAI/standards-guidelines/act/rules/6a7281/) | ✅ Consistent |
| 3 | [ARIA attribute is defined in WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/act/rules/5f99a7/) | [5f99a7](https://www.w3.org/WAI/standards-guidelines/act/rules/5f99a7/) | ✅ Consistent |
| 4 | [Element with lang attribute has valid language tag](https://www.w3.org/WAI/standards-guidelines/act/rules/de46e4/) | [de46e4](https://www.w3.org/WAI/standards-guidelines/act/rules/de46e4/) | ✅ Consistent |
| 5 | [Menuitem has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/m6b1q3/) | [m6b1q3](https://www.w3.org/WAI/standards-guidelines/act/rules/m6b1q3/) | ✅ Consistent |
| 6 | [Iframe with interactive elements is not excluded from tab-order](https://www.w3.org/WAI/standards-guidelines/act/rules/akn7bn/) | [akn7bn](https://www.w3.org/WAI/standards-guidelines/act/rules/akn7bn/) | ⚠️ Partial |
| 7 | [Important letter spacing in style attributes is wide enough](https://www.w3.org/WAI/standards-guidelines/act/rules/24afc2/) | [24afc2](https://www.w3.org/WAI/standards-guidelines/act/rules/24afc2/) | ✅ Consistent |
| 8 | [Important word spacing in style attributes is wide enough](https://www.w3.org/WAI/standards-guidelines/act/rules/9e45ec/) | [9e45ec](https://www.w3.org/WAI/standards-guidelines/act/rules/9e45ec/) | ✅ Consistent |
| 9 | [Important line height in style attributes is wide enough](https://www.w3.org/WAI/standards-guidelines/act/rules/78fd32/) | [78fd32](https://www.w3.org/WAI/standards-guidelines/act/rules/78fd32/) | ✅ Consistent |
| 10 | [Autocomplete attribute has valid value](https://www.w3.org/WAI/standards-guidelines/act/rules/73f2c2/) | [73f2c2](https://www.w3.org/WAI/standards-guidelines/act/rules/73f2c2/) | ✅ Consistent |
| 11 | [Button has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/97a4e1/) | [97a4e1](https://www.w3.org/WAI/standards-guidelines/act/rules/97a4e1/) | ✅ Consistent |
| 12 | [Element marked as decorative is not exposed](https://www.w3.org/WAI/standards-guidelines/act/rules/46ca7f/) | [46ca7f](https://www.w3.org/WAI/standards-guidelines/act/rules/46ca7f/) | ✅ Consistent |
| 13 | [Form field has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/e086e5/) | [e086e5](https://www.w3.org/WAI/standards-guidelines/act/rules/e086e5/) | ✅ Consistent |
| 14 | [HTML page lang attribute has valid language tag](https://www.w3.org/WAI/standards-guidelines/act/rules/bf051a/) | [bf051a](https://www.w3.org/WAI/standards-guidelines/act/rules/bf051a/) | ✅ Consistent |
| 15 | [HTML page has non-empty title](https://www.w3.org/WAI/standards-guidelines/act/rules/2779a5/) | [2779a5](https://www.w3.org/WAI/standards-guidelines/act/rules/2779a5/) | ✅ Consistent |
| 16 | [Image button has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/59796f/) | [59796f](https://www.w3.org/WAI/standards-guidelines/act/rules/59796f/) | ✅ Consistent |
| 17 | [Image has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/23a2a8/) | [23a2a8](https://www.w3.org/WAI/standards-guidelines/act/rules/23a2a8/) | ✅ Consistent |
| 18 | [Link has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/) | [c487ae](https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/) | ✅ Consistent |
| 19 | [SVG element with explicit role has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/7d6734/) | [7d6734](https://www.w3.org/WAI/standards-guidelines/act/rules/7d6734/) | ✅ Consistent |
| 20 | [Element with presentational children has no focusable content](https://www.w3.org/WAI/standards-guidelines/act/rules/307n5z/) | [307n5z](https://www.w3.org/WAI/standards-guidelines/act/rules/307n5z/) | ✅ Consistent |
| 21 | [Headers attribute specified on a cell refers to cells in the same table element](https://www.w3.org/WAI/standards-guidelines/act/rules/a25f45/) | [a25f45](https://www.w3.org/WAI/standards-guidelines/act/rules/a25f45/) | ✅ Consistent |
| 22 | [Element with aria-hidden has no content in sequential focus navigation](https://www.w3.org/WAI/standards-guidelines/act/rules/6cfa84/) | [6cfa84](https://www.w3.org/WAI/standards-guidelines/act/rules/6cfa84/) | ✅ Consistent |
| 23 | [Meta element has no refresh delay](https://www.w3.org/WAI/standards-guidelines/act/rules/bc659a/) | [bc659a](https://www.w3.org/WAI/standards-guidelines/act/rules/bc659a/) | ✅ Consistent |
| 24 | [Meta viewport allows for zoom](https://www.w3.org/WAI/standards-guidelines/act/rules/b4f0c3/) | [b4f0c3](https://www.w3.org/WAI/standards-guidelines/act/rules/b4f0c3/) | ✅ Consistent |
| 25 | [Object element rendering non-text content has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/8fc3b6/) | [8fc3b6](https://www.w3.org/WAI/standards-guidelines/act/rules/8fc3b6/) | ✅ Consistent |
| 26 | [HTML page has lang attribute](https://www.w3.org/WAI/standards-guidelines/act/rules/b5c3f8/) | [b5c3f8](https://www.w3.org/WAI/standards-guidelines/act/rules/b5c3f8/) | ✅ Consistent |
| 27 | [Scrollable content can be reached with sequential focus navigation](https://www.w3.org/WAI/standards-guidelines/act/rules/0ssw9k/) | [0ssw9k](https://www.w3.org/WAI/standards-guidelines/act/rules/0ssw9k/) | ✅ Consistent |
| 28 | [Element in sequential focus order has visible focus](https://www.w3.org/WAI/standards-guidelines/act/rules/oj04fd/) | [oj04fd](https://www.w3.org/WAI/standards-guidelines/act/rules/oj04fd/) | ✅ Consistent |
| 29 | [Text has minimum contrast](https://www.w3.org/WAI/standards-guidelines/act/rules/afw4f7/) | [afw4f7](https://www.w3.org/WAI/standards-guidelines/act/rules/afw4f7/) | ✅ Consistent |
| 30 | [Text has enhanced contrast](https://www.w3.org/WAI/standards-guidelines/act/rules/09o5cg/) | [09o5cg](https://www.w3.org/WAI/standards-guidelines/act/rules/09o5cg/) | ✅ Consistent |
| 31 | [Meta element has no refresh delay (no exception)](https://www.w3.org/WAI/standards-guidelines/act/rules/bisz58/) | [bisz58](https://www.w3.org/WAI/standards-guidelines/act/rules/bisz58/) | ✅ Consistent |
| 32 | [Orientation of the page is not restricted using CSS transforms](https://www.w3.org/WAI/standards-guidelines/act/rules/b33eff/) | [b33eff](https://www.w3.org/WAI/standards-guidelines/act/rules/b33eff/) | ✅ Consistent |
| 33 | [Element with role attribute has required states and properties](https://www.w3.org/WAI/standards-guidelines/act/rules/4e8ab6/) | [4e8ab6](https://www.w3.org/WAI/standards-guidelines/act/rules/4e8ab6/) | ✅ Consistent |
| 34 | [Summary element has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/2t702h/) | [2t702h](https://www.w3.org/WAI/standards-guidelines/act/rules/2t702h/) | ✅ Consistent |

## Proposed 規則

| # | 規則名稱 | ACT 規則 ID | 一致性 |
|---|---------|------------|--------|
| 1 | [ARIA global properties not used where prohibited](https://www.w3.org/WAI/standards-guidelines/act/rules/kb1m8s/) | [kb1m8s](https://www.w3.org/WAI/standards-guidelines/act/rules/kb1m8s/) | ⚠️ Partial |
| 2 | [ARIA required context role](https://www.w3.org/WAI/standards-guidelines/act/rules/ff89c9/) | [ff89c9](https://www.w3.org/WAI/standards-guidelines/act/rules/ff89c9/) | ✅ Consistent |
| 3 | [ARIA required owned elements](https://www.w3.org/WAI/standards-guidelines/act/rules/bc4a75/) | [bc4a75](https://www.w3.org/WAI/standards-guidelines/act/rules/bc4a75/) | ✅ Consistent |
| 4 | [ARIA state or property is permitted](https://www.w3.org/WAI/standards-guidelines/act/rules/5c01ea/) | [5c01ea](https://www.w3.org/WAI/standards-guidelines/act/rules/5c01ea/) | ✅ Consistent |
| 5 | [Audio or video element avoids automatically playing audio](https://www.w3.org/WAI/standards-guidelines/act/rules/80f0bf/) | [80f0bf](https://www.w3.org/WAI/standards-guidelines/act/rules/80f0bf/) | ✅ Consistent |
| 6 | [Heading has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/ffd0e9/) | [ffd0e9](https://www.w3.org/WAI/standards-guidelines/act/rules/ffd0e9/) | ✅ Consistent |
| 7 | [Iframe element has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/cae760/) | [cae760](https://www.w3.org/WAI/standards-guidelines/act/rules/cae760/) | ✅ Consistent |
| 8 | [Table header cell has assigned cells](https://www.w3.org/WAI/standards-guidelines/act/rules/d0f69e/) | [d0f69e](https://www.w3.org/WAI/standards-guidelines/act/rules/d0f69e/) | ✅ Consistent |
| 9 | [Visible label is part of accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/2ee8b8/) | [2ee8b8](https://www.w3.org/WAI/standards-guidelines/act/rules/2ee8b8/) | ✅ Consistent |
| 10 | [Link in context is descriptive](https://www.w3.org/WAI/standards-guidelines/act/rules/5effbb/) | [5effbb](https://www.w3.org/WAI/standards-guidelines/act/rules/5effbb/) | ✅ Consistent |

## 關於 SortSite 測試結果

結果來自 PowerMapper 公開發布的[測試報告](https://qa.powermapper.com/Tests/ACT-R/report.json)，採用 [EARL+JSON-LD 資料格式](https://act-rules.github.io/pages/implementations/earl-reports/)。

## 摘要

| 指標 | 數值 |
|------|------|
| 已實作規則總數 | 44（34 WCAG + 10 Proposed）|
| 完全一致規則數 | 33 WCAG + 9 Proposed |
| 部分一致規則數 | 1 WCAG（akn7bn）+ 1 Proposed（kb1m8s）|
