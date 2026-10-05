# Equal Access Accessibility Checker 3.1.42 — ACT Rules 實作報告

| 欄位 | 資訊 |
|------|------|
| 工具名稱 | Equal Access Accessibility Checker |
| 版本 | 3.1.42-rc.0 |
| 開發者 | [IBM Accessibility](https://www.ibm.com/) |
| 開發語言 | JavaScript（引擎與規則；部分原始碼使用 TypeScript） |
| 工具類型 | Automated |
| 標準 | WCAG 2.1 Level A, AA；WAI-ARIA 1.2 |
| W3C ACT 頁面 | https://www.w3.org/WAI/standards-guidelines/act/implementations/equal-access/ |
| 官方網站 | https://www.ibm.com/able/toolkit/ |
| EARL 測試報告 | https://unpkg.com/accessibility-checker-engine@next/act-report-v2.json |
| 規則邏輯文件 | https://github.com/IBMa/equal-access/tree/master/accessibility-checker-engine/src/v4/rules（各規則以 rule_id.ts 命名） |
| 最後更新 | 4 September 2025 |
| 一致規則數 | 21 WCAG + 3 Proposed |
| 部分一致規則數 | 3 WCAG |

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
| 6 | [Important letter spacing in style attributes is wide enough](https://www.w3.org/WAI/standards-guidelines/act/rules/24afc2/) | [24afc2](https://www.w3.org/WAI/standards-guidelines/act/rules/24afc2/) | ✅ Consistent |
| 7 | [Important word spacing in style attributes is wide enough](https://www.w3.org/WAI/standards-guidelines/act/rules/9e45ec/) | [9e45ec](https://www.w3.org/WAI/standards-guidelines/act/rules/9e45ec/) | ✅ Consistent |
| 8 | [Important line height in style attributes is wide enough](https://www.w3.org/WAI/standards-guidelines/act/rules/78fd32/) | [78fd32](https://www.w3.org/WAI/standards-guidelines/act/rules/78fd32/) | ✅ Consistent |
| 9 | [Button has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/97a4e1/) | [97a4e1](https://www.w3.org/WAI/standards-guidelines/act/rules/97a4e1/) | ✅ Consistent |
| 10 | [Element marked as decorative is not exposed](https://www.w3.org/WAI/standards-guidelines/act/rules/46ca7f/) | [46ca7f](https://www.w3.org/WAI/standards-guidelines/act/rules/46ca7f/) | ⚠️ Partial |
| 11 | [Form field has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/e086e5/) | [e086e5](https://www.w3.org/WAI/standards-guidelines/act/rules/e086e5/) | ✅ Consistent |
| 12 | [HTML page lang attribute has valid language tag](https://www.w3.org/WAI/standards-guidelines/act/rules/bf051a/) | [bf051a](https://www.w3.org/WAI/standards-guidelines/act/rules/bf051a/) | ✅ Consistent |
| 13 | [HTML page has non-empty title](https://www.w3.org/WAI/standards-guidelines/act/rules/2779a5/) | [2779a5](https://www.w3.org/WAI/standards-guidelines/act/rules/2779a5/) | ✅ Consistent |
| 14 | [Image button has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/59796f/) | [59796f](https://www.w3.org/WAI/standards-guidelines/act/rules/59796f/) | ✅ Consistent |
| 15 | [Image has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/23a2a8/) | [23a2a8](https://www.w3.org/WAI/standards-guidelines/act/rules/23a2a8/) | ⚠️ Partial |
| 16 | [Link has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/) | [c487ae](https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/) | ✅ Consistent |
| 17 | [Element with presentational children has no focusable content](https://www.w3.org/WAI/standards-guidelines/act/rules/307n5z/) | [307n5z](https://www.w3.org/WAI/standards-guidelines/act/rules/307n5z/) | ✅ Consistent |
| 18 | [Headers attribute specified on a cell refers to cells in the same table element](https://www.w3.org/WAI/standards-guidelines/act/rules/a25f45/) | [a25f45](https://www.w3.org/WAI/standards-guidelines/act/rules/a25f45/) | ✅ Consistent |
| 19 | [Meta element has no refresh delay](https://www.w3.org/WAI/standards-guidelines/act/rules/bc659a/) | [bc659a](https://www.w3.org/WAI/standards-guidelines/act/rules/bc659a/) | ⚠️ Partial |
| 20 | [Object element rendering non-text content has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/8fc3b6/) | [8fc3b6](https://www.w3.org/WAI/standards-guidelines/act/rules/8fc3b6/) | ✅ Consistent |
| 21 | [HTML page has lang attribute](https://www.w3.org/WAI/standards-guidelines/act/rules/b5c3f8/) | [b5c3f8](https://www.w3.org/WAI/standards-guidelines/act/rules/b5c3f8/) | ✅ Consistent |
| 22 | [Text has minimum contrast](https://www.w3.org/WAI/standards-guidelines/act/rules/afw4f7/) | [afw4f7](https://www.w3.org/WAI/standards-guidelines/act/rules/afw4f7/) | ✅ Consistent |
| 23 | [Orientation of the page is not restricted using CSS transforms](https://www.w3.org/WAI/standards-guidelines/act/rules/b33eff/) | [b33eff](https://www.w3.org/WAI/standards-guidelines/act/rules/b33eff/) | ✅ Consistent |
| 24 | [Element with role attribute has required states and properties](https://www.w3.org/WAI/standards-guidelines/act/rules/4e8ab6/) | [4e8ab6](https://www.w3.org/WAI/standards-guidelines/act/rules/4e8ab6/) | ✅ Consistent |

## Proposed 規則

| # | 規則名稱 | ACT 規則 ID | 一致性 |
|---|---------|------------|--------|
| 1 | [ARIA required context role](https://www.w3.org/WAI/standards-guidelines/act/rules/ff89c9/) | [ff89c9](https://www.w3.org/WAI/standards-guidelines/act/rules/ff89c9/) | ✅ Consistent |
| 2 | [ARIA state or property is permitted](https://www.w3.org/WAI/standards-guidelines/act/rules/5c01ea/) | [5c01ea](https://www.w3.org/WAI/standards-guidelines/act/rules/5c01ea/) | ✅ Consistent |
| 3 | [Visible label is part of accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/2ee8b8/) | [2ee8b8](https://www.w3.org/WAI/standards-guidelines/act/rules/2ee8b8/) | ✅ Consistent |

## 實作規則詳細表格

> 以下各節提供各 ACT 規則的測試案例詳細資料。未在此列出的規則，請參閱 [W3C ACT 頁面](https://www.w3.org/WAI/standards-guidelines/act/implementations/equal-access/)取得完整測試案例資料。

### Role attribute has valid value

- **ACT Rule ID:** [674b10](https://www.w3.org/WAI/standards-guidelines/act/rules/674b10/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/674b10/
- **工具規則 ID（Procedure）:** `aria_role_allowed:Pass_0,Fail_2,Potential_1`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/aria_role_allowed.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers 9 of the 10 examples.
- **備註:** On 1 example the implementation cannot tell

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| None | * 4.1.2   Name, Role, Value |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/674b10/c181f7267bf9f4fc0f9ad9e2a69c1ad7da504f4d.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/674b10/9980fd3a6f30b20069618708b2c8fa79d444e0a4.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/674b10/8ee31c22ec3fa0bccf46e3f44e9a5d8e752bc776.html) | passed | cannot tell | ⚠️ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/674b10/4b0aaf07c6e9fb6ea3495dd9cecf55d47b9539b8.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/674b10/527c265ba570f0131dddef3687981b66f6dd156f.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/674b10/ebd0080bacb8debc7ad069072240657df38c3e2c.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/674b10/98f200a9611571fd8db46027c8d28616d94083c8.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/674b10/8f409b57b31bce96b6f256d0fa9cfabcd0b984ca.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/674b10/0b8e3a6fb2bfd495683f686cf99ea1e46f2074ed.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/674b10/575a5e323abe810450d5ff443a5fd614dae12257.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/674b10/351e4bd097e4e1217d64a6c32ae09987c8d4db4a.html) * | inapplicable | inapplicable | — (untested) |

*\* 此例子尚未經核准納入規則，結果不計入一致性判定。*

### ARIA state or property has valid value

- **ACT Rule ID:** [6a7281](https://www.w3.org/WAI/standards-guidelines/act/rules/6a7281/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/6a7281/
- **工具規則 ID（Procedure）:** `aria_attribute_value_valid:Pass_0,Fail_1`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/aria_attribute_value_valid.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers all 21 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| None | * 4.1.2   Name, Role, Value |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/e970b77c1137e5fd4627f70663da4d1fcda36b23.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/db10f30be20aebf661f0b81b2c0cfc698b1453eb.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/766a5eb6a54c5b83a882a0d78731d808480a1b3e.html) | passed | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/38b0160bfc6c056fa0d02affbc02e49dce284467.html) | passed | inapplicable | ✅ |
| [Passed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/e4b47e094d44a9f3b5b3fd5c157f3ef6679bede0.html) | passed | inapplicable | ✅ |
| [Passed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/c27e7f509d546fa6aff12ca7aeace662d3fb1c7b.html) | passed | inapplicable | ✅ |
| [Passed Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/f78fb0548e68839232441636b6d8489ad17c50b5.html) | passed | inapplicable | ✅ |
| [Passed Example 8](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/83f5e9df90e96c1af508ad8b4e2cda78c0dae7c4.html) | passed | inapplicable | ✅ |
| [Passed Example 9](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/0496ff9d59d514f97c8739004b2b941dd7ca97bf.html) | passed | inapplicable | ✅ |
| [Passed Example 10](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/ed053b32aa2b4453ddc225e45f7f1931f62c7f49.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/ce27fcdd85fbf37a953727cdc454f3e504041a31.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/1f586827cecc5b1b4d9f60dcaba1e77f4a90c54a.html) | failed | failed | ✅ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/0959137934bd17ea8c95b86120b1c7331e4facc2.html) | failed | failed | ✅ |
| [Failed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/e1bd70b33e2d53e3b9bc105a5cad59a76b4c54d5.html) | failed | failed | ✅ |
| [Failed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/4078701ed7982e75316b51adb59b6d05c1583aa5.html) | failed | failed | ✅ |
| [Failed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/88ff0942922e48b686413cf12cd0fd3510a8b29f.html) | failed | failed | ✅ |
| [Failed Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/b78f507edd1866cc5b1a7fae8b530da964b470fb.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/9d80b71ad39b258fb75db804867f189d76ecdab8.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/90428c9c8cc74d6a3047775637078366994a8e88.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/0b90f166412e03fa01b460aa1c8e68f722a47434.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/6a7281/d5d5467bced8e0eb2174ee42184258634c03421b.xml) | inapplicable | inapplicable | ✅ |

### ARIA attribute is defined in WAI-ARIA

- **ACT Rule ID:** [5f99a7](https://www.w3.org/WAI/standards-guidelines/act/rules/5f99a7/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/5f99a7/
- **工具規則 ID（Procedure）:** `aria_attribute_allowed:Pass_0,Fail_1`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/aria_attribute_allowed.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers all 7 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| None | * 4.1.2   Name, Role, Value |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/5f99a7/261dcd3214e87532fc2f9c8db7fdce05de9e07f0.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/5f99a7/31ac49fcb186ee2a233355494fc5e774212ca3d7.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/5f99a7/3314945d4bbec5b34f9a3c2d90da7cb9f8e7ce5a.html) | passed | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/5f99a7/830f50dcf51acb0b97b948000d7c163e50858312.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/5f99a7/e145aafac5f00cabc7cb3d65a32f7fdb5ec1484d.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/5f99a7/b6acf7c4aab0cfdc9f996abc7961790cbc97f39e.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/5f99a7/d528a33258103014c0a03cf1e418ee0620f7b4f6.html) | inapplicable | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/5f99a7/287a72860814f903d561dc3e7765f507ca041624.html) * | passed | inapplicable | — (untested) |

*\* 此例子尚未經核准納入規則，結果不計入一致性判定。*

### Element with lang attribute has valid language tag

- **ACT Rule ID:** [de46e4](https://www.w3.org/WAI/standards-guidelines/act/rules/de46e4/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/de46e4/
- **工具規則 ID（Procedure）:** `element_lang_valid:Pass_0,Fail_1,Fail_2`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/element_lang_valid.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers all 19 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 3.1.2   Language of Parts | * 3.1.2   Language of Parts |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/a746b387d13dc61266d1fcde19b91b89441b1be7.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/1583a11fb07127fb3315fa19f3baaf876aa42aa4.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/034e1e1a46cfa6d3fe3bcc69ac45ffb6c5d55148.html) | passed | passed | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/d8c5a59532ae0624edd875aea31ef39086873b7a.html) | passed | inapplicable | ✅ |
| [Passed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/cecfce83c949d20c816a0e43cbc4c26a3468754b.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/b1765660b28464b5a73e502ef30b7370ba294ff5.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/49b66676ed867c75368e31c1e06b28255df8089e.html) | failed | failed | ✅ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/78de8b1ca470302aebb53065c32eddf08da008b5.html) | failed | failed | ✅ |
| [Failed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/795698c08fc5d404b649d0c367bedc3e83462d43.html) | failed | failed | ✅ |
| [Failed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/d8ba52b5fa5e123def1f778821219aaec20ca0fe.html) | failed | failed | ✅ |
| [Failed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/61f81c57325a77a89481f036e4e2116399fb6714.html) | failed | failed | ✅ |
| [Failed Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/5ba0306adadd581e4331b9415c2ef9f8ecccc0f2.html) | failed | failed | ✅ |
| [Failed Example 8](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/915cdae554a817caa4792101fde1adf14563227d.html) | failed | failed | ✅ |
| [Failed Example 9](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/50e733e0c505a556fc53e6265eb5b432823570f7.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/5b58b483fa53a6ff228c89a7fe57997664845663.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/d6606eb2863e2176f9beb914e5cfe70bce2d905e.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/a44f5e11d20feec4ae39e2db0336ddef0a8e04ec.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/471e3f82cdd9122e2886d2d7bcfc8cda1397a51d.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/de46e4/4fa5219cf39dc536c51d67f6c4f9f54271a8dcfa.html) | inapplicable | inapplicable | ✅ |

### Menuitem has non-empty accessible name

- **ACT Rule ID:** [m6b1q3](https://www.w3.org/WAI/standards-guidelines/act/rules/m6b1q3/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/m6b1q3/
- **工具規則 ID（Procedure）:** `aria_widget_labelled:Pass_0,Fail_1`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/aria_widget_labelled.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers all 8 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 4.1.2   Name, Role, Value | * 4.1.2   Name, Role, Value |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/m6b1q3/895a5b0d06d892bc50351cfd2db426b31cfcc97f.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/m6b1q3/78c41b8461997477cb7b6a9d163ba8a387ad56b8.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/m6b1q3/83a0c030f9172c3d8d862d01138e75ec7aaf4f4e.html) | passed | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/m6b1q3/c05155744a79e6ff72f1b691b8bae15338e8146b.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/m6b1q3/f3a40579bcb3cab4f12a31639bc9dd0ca5c14d87.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/m6b1q3/c261108b8bb62e118a47a52d0a157b4265a6e143.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/m6b1q3/4eec4a33bca54e6313e0af600af41797bb7c4213.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/m6b1q3/0edc121ac393fa9661fc1c18156e040775313779.html) | inapplicable | inapplicable | ✅ |

### Important letter spacing in style attributes is wide enough

- **ACT Rule ID:** [24afc2](https://www.w3.org/WAI/standards-guidelines/act/rules/24afc2/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/24afc2/
- **工具規則 ID（Procedure）:** `text_spacing_valid:pass,fail_letter_spacing_style,fail_word_spacing_style,fail_line_height_style`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/text_spacing_valid.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers all 19 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 1.4.12   Text Spacing | * 1.4.12   Text Spacing |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/9e9382901f59c7dd476717a55bf5c5a37ed76bbc.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/43f8fe88b8e7365db7aa251b263b5d00c7a47ae9.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/787f24a573fa422e24ab72312f7306253bb83a4f.html) | passed | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/f000a9c495f11a4a11a4314871b91f4173e4589a.html) | passed | inapplicable | ✅ |
| [Passed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/cabfcae45afac141b38fd9cac2e07a64fb6b9896.html) | passed | inapplicable | ✅ |
| [Passed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/d6d5bf7c081939e64d10022dd29f5e31d2153d50.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/8383685465c6a417cb86e192d1e9157bd5feee99.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/b5a8fe74fbbea40e8bbee407f167ae808e14ea49.html) | failed | failed | ✅ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/d8e379c210cdb651d28985c883fea21a4529ed59.html) | failed | failed | ✅ |
| [Failed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/9788de86b8a4e7a685d356347cc4059874ae6a38.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/eeca04eb6d00ab0aca01d460f0861f3328d4992d.svg) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/9af5662e9957191c22c558a1a8511bae709a2b36.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/be174e053a61ece650873a6a44f8e4be356e4193.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/88d6ea5706ed8ae188caa166879c381e64e5077a.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/92e706402d8f8cb13d73ffb759ce35ec910d272c.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/9608b535262c655f523314958f8ca3019a0968fe.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/1877242970bb7a92b5c8ee7bc5c5e5ec87877890.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 8](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/6aa2034507dc16e6ae0d16f1b6f2a14d3dfadc18.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 9](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/24afc2/64b25817b3d3909ab7f4acaee061875ebac1cee3.html) | inapplicable | inapplicable | ✅ |

### Important word spacing in style attributes is wide enough

- **ACT Rule ID:** [9e45ec](https://www.w3.org/WAI/standards-guidelines/act/rules/9e45ec/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/9e45ec/
- **工具規則 ID（Procedure）:** `text_spacing_valid:pass,fail_letter_spacing_style,fail_word_spacing_style,fail_line_height_style`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/text_spacing_valid.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers all 19 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 1.4.12   Text Spacing | * 1.4.12   Text Spacing |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/45e5a588c3e8977fa0e83074d7f7c89738e8ec42.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/2a2a14cc9bcb3fa7983e22f160ce9eeb6b832a8c.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/6d5dde208ef91b6afceca022c7a2a12b99f042b7.html) | passed | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/2d9b8cf0906f0e05e4d487c9682db7a7e022fab0.html) | passed | inapplicable | ✅ |
| [Passed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/15905a239d6755102be6a60aa152ad963d5b1dbb.html) | passed | inapplicable | ✅ |
| [Passed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/8d2baed183149375922c23a9a5f42b52b627d713.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/31d185e51a8be241f8a75d09deae69d3937f0329.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/1134eadf72b2a40c03b8bbf486ebfd3bb34cf986.html) | failed | failed | ✅ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/830c047a178145d69fb7dd3fb21abae5a84f1830.html) | failed | failed | ✅ |
| [Failed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/d9fe2bdf199d96c133830ded7907a28c4c33efcc.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/cc484992ddeab663aa5e490f3fd71806c9bd8528.svg) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/fdd3c30f28464b32eb8a1397f70a41dfd3b2cb1c.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/32f0d32619e3d22a8988256e0f3ebae3e0f801c9.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/a8f0c6682763e4ca7db824dc145a23067a3eb889.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/92e706402d8f8cb13d73ffb759ce35ec910d272c.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/51faee765656c7bfe86b959373e1df8679726779.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/d32bae2609b7c0c66a1df8dbfc182fb10c16805d.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 8](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/fa119442cf663c73bf332488f3965b427b024009.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 9](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/9e45ec/edaf06132468eccf5fd90551151252a364b44b7b.html) | inapplicable | inapplicable | ✅ |

### Important line height in style attributes is wide enough

- **ACT Rule ID:** [78fd32](https://www.w3.org/WAI/standards-guidelines/act/rules/78fd32/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/78fd32/
- **工具規則 ID（Procedure）:** `text_spacing_valid:pass,fail_letter_spacing_style,fail_word_spacing_style,fail_line_height_style`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/text_spacing_valid.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers all 24 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 1.4.12   Text Spacing | * 1.4.12   Text Spacing |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/a4c9e1fbd1f25787a4906a79d5ab23c975120833.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/203a13b314695fc2abc6163b3ac7940ab1c4a9ed.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/82c89e74b17e53b55a8d56f23dddbfbe04bc163e.html) | passed | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/844c8f6a1100db804ee5b4d335098a74ff628238.html) | passed | inapplicable | ✅ |
| [Passed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/639b3bdba21f19efaa8fc304a8f95e6e7105e3cb.html) | passed | inapplicable | ✅ |
| [Passed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/0dcc810409a65f29f559c4826afbaa71bcba6ae0.html) | passed | inapplicable | ✅ |
| [Passed Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/78034759a1086c7ffa8037b6e6e2327ece4a19d7.html) | passed | inapplicable | ✅ |
| [Passed Example 8](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/9280b9961f4e24943080fabb67c041b65036f69c.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/c8c447e4e9065a1f8676c78dd937486e074026f7.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/67159173d21bc9cf00d1bb5a7ec817696ccee05c.html) | failed | failed | ✅ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/53e5a389ebf46db82a931674636809b95d2de74c.html) | failed | failed | ✅ |
| [Failed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/38a347130bce99ee98d09fbefa18adb372f4563f.html) | failed | failed | ✅ |
| [Failed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/712289cbcfbee5cd51a332265f44369f568712d3.html) | failed | failed | ✅ |
| [Failed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/bed4bc29cbcd1f681c4e0f0d7ff7e05c579fefec.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/e998ec72eef90b46574b39d2657ef278b61b51eb.svg) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/0128de1beb7862298366680f6920bd3b3874d752.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/6e034188bb709c8e0011612448b6244427bd8d4f.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/81be0f6c00496f3c2d70071c8f73b292ba282bfc.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/bc3e59c1292a265135ed7043d2cdcaa62cdfac66.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/7f23d5ee7e2a51c9d0922493c542953680972bb6.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/a2bfcb630ad36d8f8e49fb02aa5b3d8db2aec2fc.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 8](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/f6c53855436de3898c29ee685d5c1cf02be24c72.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 9](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/b3ba5eaa37846b4b01ca04ae6e5f2d54c4813c1d.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 10](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/78fd32/0f8063a09807c4bf8d5f7c796cbf0f2aa20e7e57.html) | inapplicable | inapplicable | ✅ |

### Button has non-empty accessible name

- **ACT Rule ID:** [97a4e1](https://www.w3.org/WAI/standards-guidelines/act/rules/97a4e1/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/97a4e1/
- **工具規則 ID（Procedure）:** `input_label_exists:Pass_0,Fail_1,Fail_2`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/input_label_exists.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers all 17 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 4.1.2   Name, Role, Value | * 4.1.2   Name, Role, Value |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/a4cc71b0434f71f4ea0069c409f73e0207dfb403.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/d9adf41033a5b71a0730b6df8c1c7e01088e9022.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/3004e7b1a47b2e5a5c77b3eef36b50d495c9e4a1.html) | passed | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/ff4b76894bd9aaad29242e72fe93fd9798bf85af.html) | passed | inapplicable | ✅ |
| [Passed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/5bfdf45a98f7d2f0e93a700f7ce0fe5f723bf0f7.html) | passed | inapplicable | ✅ |
| [Passed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/00fe207175e40ddc81a86fb09504e5fa33b7dd0f.html) | passed | inapplicable | ✅ |
| [Passed Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/3fe70212e0020d7fa552b7c6c035a466c900c4b9.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/1ec8deb0b18514b612774d3af39b5ad41f2a792b.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/2c5b0625e21b3503d1cd4c4daf53b15ae41c562d.html) | failed | failed | ✅ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/ffe1796f06e1082a8ddae54a471dcca66c783c4e.html) | failed | failed | ✅ |
| [Failed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/1a6035f4f09b339ac53bc547fc727a51ab05a3c6.html) | failed | failed | ✅ |
| [Failed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/ac9a749a026c47209c34677ca6ac0dc093d24888.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/0666607827b30150ed0a5be439f58623b3222131.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/14c51a76c14250316a756b7660b2489f18896d5a.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/096bf1e8eeb0b5633861389cb3fa3267649e396c.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/b6b0eec01fc2759e3335fa4e448e5772161a9da6.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/97a4e1/21bbd170c05cd535fd5096f9c7eebc54eb72d936.html) | inapplicable | inapplicable | ✅ |

### Element marked as decorative is not exposed

- **ACT Rule ID:** [46ca7f](https://www.w3.org/WAI/standards-guidelines/act/rules/46ca7f/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/46ca7f/
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/aria_semantics.ts
- **一致性:** ⚠️ Partial
- **涵蓋範圍:** covers all 10 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| None | * 1.1.1   Non-text Content |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/46ca7f/e5b8fa7ab66409e7b52b335a8b6aebe11fd78635.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/46ca7f/b40e6ce081099b8bf0f76a43f4c27f12df342ddd.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/46ca7f/6f8e6014c133635fecac02e1087a666c5014ae5f.html) | passed | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/46ca7f/eb5983ff8bb0f85c891d48f96106337446797d8f.html) | passed | inapplicable | ✅ |
| [Passed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/46ca7f/9c51e8f0568ab3401375114dd0eded2eddfe231a.html) | passed | inapplicable | ✅ |
| [Passed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/46ca7f/6687821a71b53e0e1764e895900a6bad46412b5c.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/46ca7f/e136a03c52c01c1b190c7372d83463f3c6502de9.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/46ca7f/96c1f58088f1e32c965f38ddc50d4b88f6a0f022.html) | failed | inapplicable | ❌ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/46ca7f/b4329d21bd80d961408bf066a70998417234f200.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/46ca7f/a48478825dc5baf21cc79bfcfbe12ed462590f1e.html) | inapplicable | inapplicable | ✅ |

### Form field has non-empty accessible name

- **ACT Rule ID:** [e086e5](https://www.w3.org/WAI/standards-guidelines/act/rules/e086e5/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/e086e5/
- **工具規則 ID（Procedure）:** `input_label_exists:Pass_0,Fail_1,Fail_2`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/input_label_exists.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers all 19 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 4.1.2   Name, Role, Value | * 4.1.2   Name, Role, Value |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/933cad4e69415e2a2970832d2d60e2b854bca1b4.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/366e62d83ede9df9fdad86cf7040600916bb065a.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/6726b79b0534d80f567c3e5fd7174962d411be95.html) | passed | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/2183d2e337eec311b7c2e06c2f9cec759913dba9.html) | passed | inapplicable | ✅ |
| [Passed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/3aa8f45d7e358655c39708e2656a2c2d97e7dfa6.html) | passed | inapplicable | ✅ |
| [Passed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/ca41ec5f1dba602b8b6e332ad524cbfc5cd1505e.html) | passed | inapplicable | ✅ |
| [Passed Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/09ea6ee13f7f26b0d6e3103946209ea0726876de.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/004258203c8bf167307b6ed79f765115d16a6357.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/5c0ba53d53cc9fd8627f224b39db30bd9ffa5757.html) | failed | failed | ✅ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/80a5df2346e082cd0be260143ac9090a902bcf30.html) | failed | failed | ✅ |
| [Failed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/a59cf1abfabcb96ab4592966bb4a78e788b41017.html) | failed | failed | ✅ |
| [Failed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/552732aff853ed413ed7b5ff4a6202d11fd0c1a5.html) | failed | failed | ✅ |
| [Failed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/4246616cd947040f64dc183b66e1f6c30b2d7fbb.html) | failed | failed | ✅ |
| [Failed Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/b0c554cfdddfdc0fe15923066b329868dd9e70c8.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/c828178c45e9299883296cf425144d2ae804fc27.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/43b93bc71597fdc7152a7920a78f27a3b27cf639.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/16a907322625e3b82c25f571eb9dd8fe897444f8.html) | inapplicable | inapplicable | ✅ |
| [Passed Example 8](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/d9ee6c2ae6da41521bd4ba0bf25c4b6bcd253f37.html) | passed | inapplicable | ✅ |
| [Failed Example 8](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/bd816c3ef10b8982f18411e1623887d2444d7311.html) | failed | failed | ✅ |
| [Passed Example 8](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/cfb1790405bb1ff793ed15a73372d53e79d2d7e0.html) * | passed | inapplicable | — (untested) |
| [Passed Example 9](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/2243d6e9d1eb6938aff03536125ebc582440fbe7.html) * | passed | untested | — (untested) |
| [Failed Example 9](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/e086e5/1d9a4d0eba21c8bb02580c46142ec75842bd3557.html) * | failed | untested | — (untested) |

*\* 此例子尚未經核准納入規則，結果不計入一致性判定。*

### HTML page lang attribute has valid language tag

- **ACT Rule ID:** [bf051a](https://www.w3.org/WAI/standards-guidelines/act/rules/bf051a/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/bf051a/
- **工具規則 ID（Procedure）:** `html_lang_valid:Pass_0,Fail_1,Fail_2,Fail_3`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/element_lang_valid.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers all 7 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 3.1.1   Language of Page | * 3.1.1   Language of Page |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bf051a/7d8c4fd028c504d10c4e5e9bd7183c139549e1a1.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bf051a/a49f11c86ad81c4d42700dfca58a7eeec377f02e.html) | passed | passed | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bf051a/b7a35f8080e756776877bca013a910dafde8ef73.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bf051a/5c998eef8cb13a8f577dade1a3b9fe591bc69204.html) | failed | failed | ✅ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bf051a/0f73e7179e17f050380f0ea350d2551611820fd5.html) | failed | failed | ✅ |
| [Failed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bf051a/b64d767d873269ff00966630e34ab198fc24368f.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bf051a/1b73557d29073ecd327790ca1a6e343b4395b2ab.svg) | inapplicable | inapplicable | ✅ |

### HTML page has non-empty title

- **ACT Rule ID:** [2779a5](https://www.w3.org/WAI/standards-guidelines/act/rules/2779a5/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/2779a5/
- **工具規則 ID（Procedure）:** `page_title_exists:Pass_0,Fail_1,Fail_2,Fail_3`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/page_title_exists.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers all 11 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 2.4.2   Page Titled | * 2.4.2   Page Titled |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/2779a5/7f9f315b5041f3726662bf269613c43678af99d4.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/2779a5/64771c390e57375a822a7223362ea7bb859c0a96.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/2779a5/6b3d2e2147cfc618b744f2dabfaf2e66327055d7.html) | passed | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/2779a5/efa1e0438bb515332ec6b4d943044c336ca77fab.html) | passed | inapplicable | ✅ |
| [Passed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/2779a5/0ad882dffaf6edd16058119e1c513b4746b0ac27.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/2779a5/820fb18c9bb20fb1a940a0806a87c6f6e468bb5b.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/2779a5/314d991fa5328e41f8a806bfbac84d748b41f7ed.html) | failed | failed | ✅ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/2779a5/5fd6fda771cf8810eef5166464622d6979e0406e.html) | failed | failed | ✅ |
| [Failed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/2779a5/a14968698b0e95b6624f187d4538e320e4fa8952.html) | failed | failed | ✅ |
| [Failed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/2779a5/4eeff9c95f15e90ca5abc972079112d1ea5c3d51.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/2779a5/ecc29b73e37b6a125b3fd9767068dcaa368d467a.svg) | inapplicable | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/2779a5/94ff40484422832c2910086d4387163aa2d9dd7d.html) * | passed | inapplicable | — (untested) |
| [Failed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/2779a5/9c5eeb535181f3709e13b548a04b9d0054532cdd.html) * | failed | failed | — (untested) |

*\* 此例子尚未經核准納入規則，結果不計入一致性判定。*

### Image button has non-empty accessible name

- **ACT Rule ID:** [59796f](https://www.w3.org/WAI/standards-guidelines/act/rules/59796f/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/59796f/
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/imagebutton_alt_exists.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers all 12 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 1.1.1   Non-text Content * 4.1.2   Name, Role, Value | * 1.1.1   Non-text Content * 4.1.2   Name, Role, Value |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/59796f/8c29bcb24ac0f448846a2ffdad4c9693d5aef8c6.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/59796f/b413c09531b239e27bcf79cb57302b429ef59fe6.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/59796f/cab9b2d06e5a44e2056ccbdbb7096f55ab42859c.html) | passed | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/59796f/7d97d6b2f3fa16760bf66026691281a8179f3260.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/59796f/04342a3834e0003f3057807937d617e432e83d33.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/59796f/5c71cdabc04f9038e21d872e20a516cb429a7619.html) | failed | failed | ✅ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/59796f/0bbd55ba8e418361f99f717418206a37d57fd978.html) | failed | inapplicable | ❌ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/59796f/a4cc71b0434f71f4ea0069c409f73e0207dfb403.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/59796f/37cce377c874eec22d1137977d2b8f00ebc42ea8.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/59796f/9ceceeffee45fea0d16ce4d87d4c048f1a68ca93.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/59796f/ebd0080bacb8debc7ad069072240657df38c3e2c.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/59796f/ba176379d78ef73bf17c7703ca6b512463227d13.html) | inapplicable | inapplicable | ✅ |

### Image has non-empty accessible name

- **ACT Rule ID:** [23a2a8](https://www.w3.org/WAI/standards-guidelines/act/rules/23a2a8/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/23a2a8/
- **工具規則 ID（Procedure）:** `img_alt_valid:pass,fail_blank_alt,fail_no_alt,fail_blank_title`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/img_alt_valid.ts
- **一致性:** ⚠️ Partial
- **涵蓋範圍:** covers 17 of the 18 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 1.1.1   Non-text Content | * 1.1.1   Non-text Content |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/32bfac8a98cc212aa7bf9151bf40f665a7f51696.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/38cc6a87fcc81fcc2248f0cd74ca48396b7aa432.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/feb06eece7b158ab66a25bfa2c47a196309f0d93.html) | passed | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/40d83620b0bcbcf0e7380177384f48596823e7a9.html) | passed | inapplicable | ✅ |
| [Passed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/2f35ed62ed14afb6d9e8b886e95e846f0cfa0d2a.html) | passed | inapplicable | ✅ |
| [Passed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/e8f40f5af06646ef15283302903f6c78f7d7a505.html) | passed | inapplicable | ✅ |
| [Passed Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/13b8678881fba03e7465f82b5550abc5093f7968.html) | passed | inapplicable | ✅ |
| [Passed Example 8](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/ba9cdf6d0c336f0abf7cd2992c4a2a62c6c719fd.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/8006d1541dc71b93e6ec4d101a386e0043d1a521.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/496963cfd35d4873c010469c47c84d4358fba035.html) | failed | inapplicable | ❌ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/fef9a3ad8b2f2a6beeaf44ef7dafce08e743ea67.html) | failed | failed | ✅ |
| [Failed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/b0348c1e6fced2df1ebd93caef4d383f6c7a0461.html) | failed | failed | ✅ |
| [Failed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/d70470a37db713810be85275e5d0c698f85ab320.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/cd3b3a4046451da9b9cc3e166c09d27583a2c30b.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/25e5364c0a1320a08e2742fa59a0f8627591bc61.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/e15b9aca4aaa53cb3a96ae48e78e1af064b9a01d.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/7d696551efaafa0da33bb6e56b8b43707c7c7de9.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/23a2a8/f7692caf5f8c788d58e1aeb8d4f1f240fafdfa91.html) | inapplicable | inapplicable | ✅ |

### Link has non-empty accessible name

- **ACT Rule ID:** [c487ae](https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/
- **工具規則 ID（Procedure）:** `a_text_purpose:pass,fail_acc_name`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/a_text_purpose.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers all 28 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 4.1.2   Name, Role, Value * 2.4.4   Link Purpose (In Context) | * 2.4.4   Link Purpose (In Context) * 4.1.2   Name, Role, Value |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/a8cc66de4d60e34c7ee0d09fd6ab965ac23d9b4f.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/d761116217a5875490cd7a2adf0219bdb1bff5cf.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/ada7438401aba500eb03f678b05b9821a758336a.html) | passed | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/d13a75a2a0b539a39063eb946505e3d3dd5aeef1.html) | passed | inapplicable | ✅ |
| [Passed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/4493c4b542c8e059e8423c77945ce5895428ab88.html) | passed | inapplicable | ✅ |
| [Passed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/d6a239059266b317de6a6e73dbf443c5ca8a6f5f.html) | passed | inapplicable | ✅ |
| [Passed Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/5d16da98a4089b29ff76c611036c65e1c504c7bc.html) | passed | inapplicable | ✅ |
| [Passed Example 8](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/e277de30edb9e550d8f9d5a72e1e3adde961d01d.html) | passed | inapplicable | ✅ |
| [Passed Example 9](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/dee6c55162904cfb77c7f65614c4e6ae2baacea2.html) | passed | inapplicable | ✅ |
| [Passed Example 10](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/b9a3949e2a7521698472a966c782434c4d9ce6fb.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/97b115a032fc4178230306e2d0f4e334b2cfe8a9.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/633d9136ef3e040b7653b287651c65e4302fe417.html) | failed | failed | ✅ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/954326e5ba700d4616d924807f427002816e9fc3.html) | failed | failed | ✅ |
| [Failed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/e729027165e293dc32ea88b7264e4c62c306fdd5.html) | failed | failed | ✅ |
| [Failed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/e5b522e069394fa6666bef3746705b70b4628819.html) | failed | failed | ✅ |
| [Failed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/3f34996d204260b1b0b50fc8f77b10ab640ba303.html) | failed | failed | ✅ |
| [Failed Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/7b6b235a0fd8bf9b2023a5d0e446f7ed46e1a40f.html) | failed | failed | ✅ |
| [Failed Example 8](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/8816eee206375f88c562d618852cb0383b89fe6e.html) | failed | failed | ✅ |
| [Failed Example 9](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/c1570fd31970f22abcca6f32d75c1906058c1535.html) | failed | failed | ✅ |
| [Failed Example 10](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/cc73351605ff3dc9766ad28a1a267a96976ad77b.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/322c1a6d65f31fd534b1ddac680e3c6ea69e3207.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/9d8527dff8e8dcd338fc501863c14c13cd151b9c.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/8b1cde6d65f14bd7531e3714779b5130dc8a7919.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/bd0d0d0cda19a4d58dfe311cd7c8de34093ad590.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/7ce0b9a2a11f1c10f71f1786e4154e6164356fb6.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/f417fbb0db2a62f84dd79497b23b1e6e97007740.html) | inapplicable | inapplicable | ✅ |
| [Passed Example 11](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/d36abfa44924a4d4088bada05f439ae392dfd662.html) | passed | inapplicable | ✅ |
| [Failed Example 11](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/c487ae/7b3b94c0e39bed9d432f379efa77ba9f54c81c6d.html) | failed | failed | ✅ |

### Element with presentational children has no focusable content

- **ACT Rule ID:** [307n5z](https://www.w3.org/WAI/standards-guidelines/act/rules/307n5z/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/307n5z/
- **工具規則 ID（Procedure）:** `aria_descendant_valid:pass,potential_child_implicit_role,fail_child_explicit_role`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/aria_descendant_valid.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers 5 of the 7 examples.
- **備註:** On 2 examples the implementation cannot tell

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 4.1.2   Name, Role, Value | * 4.1.2   Name, Role, Value |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/307n5z/ccaf2315b5268a447dff07aad635b3ad27aabaf8.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/307n5z/9bdea8c670e441afe5299bed4ea02b304becaaf8.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/307n5z/8c835039e68f3fefc58e8b0985b2060fa02b3480.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/307n5z/3798f2c4c821019fe59bbcc671d46b4e9d2c9d50.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/307n5z/b9f6f775efc8d7cdc38782087ccc6abaa88babb6.html) | failed | cannot tell | ⚠️ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/307n5z/61a402c2eb82ccb8614aa62918cff81b8306ddf2.html) | failed | cannot tell | ⚠️ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/307n5z/54cd6b714326ddf6ae1181112d6ce35f6f3e3579.html) | inapplicable | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/307n5z/ede992d9573d350db7cd0cb8685de5b96460fbc1.html) * | passed | inapplicable | — (untested) |
| [Failed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/307n5z/7bfb3a2d5783ade108f4f9fee10597a2343f8665.html) * | failed | cannot tell | — (untested) |
| [Failed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/307n5z/ad7e2441b992318debdeec5a07f92b0241f80a14.html) * | failed | cannot tell | — (untested) |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/307n5z/837f998533e07e309d5f9a587b7a5ff013a73c7a.html) * | inapplicable | inapplicable | — (untested) |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/307n5z/e687f56e16c718c737b2ebc096ab768bd9d87d50.html) * | inapplicable | inapplicable | — (untested) |

*\* 此例子尚未經核准納入規則，結果不計入一致性判定。*

### Headers attribute specified on a cell refers to cells in the same table element

- **ACT Rule ID:** [a25f45](https://www.w3.org/WAI/standards-guidelines/act/rules/a25f45/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/a25f45/
- **工具規則 ID（Procedure）:** `table_headers_ref_valid:Pass_0,Fail_1,Fail_2,Fail_3,Fail_4`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/table_headers_ref_valid.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers all 17 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 1.3.1   Info and Relationships | * 1.3.1   Info and Relationships |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/f99c8bd6aa53c3b2f4d63fee994333453df410c6.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/1400d13aa5a86dbacf71db631f5de1abfc982094.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/8391fee07d35c11cfb3fecd19ddaad0fb8c68871.html) | passed | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/c02748c85d58e188b3c13773986272df616b2f3c.html) | passed | inapplicable | ✅ |
| [Passed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/d935494fdcd2c1fef14d14842c0a19c8f8c54c78.html) | passed | inapplicable | ✅ |
| [Passed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/ba5019010a6e0cfbcb46b2f7e9e63a6117e06f97.html) | passed | inapplicable | ✅ |
| [Passed Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/b1b17ab86ee2ebce350af1c41d2e6ff8911a33f1.html) | passed | inapplicable | ✅ |
| [Passed Example 8](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/7291b4b36dfa21e666a765a51c01e777d40a5174.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/7f2be26b42fa5846a09019bb949c44be95586e0d.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/cd25fd6cc4fde1734fc90c2f11e71886e3458007.html) | failed | failed | ✅ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/d0c53c06c9e0a766fd5830fbbaa7df76f8cef92a.html) | failed | failed | ✅ |
| [Failed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/1bdbd209a611d68876d5b6e37541f7ddc2038f97.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/9f7979f4854efa0b1ac299f920229d20246710b9.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/09d9fb1862a6f579a948259a44e1117af595d937.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/76b79146e3be6b8ea6920df93b68352b8b9d3c8b.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/57382c6bd42af05f3b9836a95bee672d1b9330d7.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/e6fd17797e01f46032b6d8edf24831b2775cc831.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/cb36dcc6ce2d1787e287ff967559b186eb77d6bd.html) * | inapplicable | inapplicable | — (untested) |
| [Inapplicable Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/a25f45/add6f67d15c10ce6195ff5488ae7f5dab8bc3632.html) * | inapplicable | inapplicable | — (untested) |

*\* 此例子尚未經核准納入規則，結果不計入一致性判定。*

### Meta element has no refresh delay

- **ACT Rule ID:** [bc659a](https://www.w3.org/WAI/standards-guidelines/act/rules/bc659a/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/bc659a/
- **工具規則 ID（Procedure）:** `meta_refresh_delay:pass,potential_refresh`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/meta_refresh_delay.ts
- **一致性:** ⚠️ Partial
- **涵蓋範圍:** covers 10 of the 15 examples.
- **備註:** On 5 examples the implementation cannot tell

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 2.2.1   Timing Adjustable | * 2.2.1   Timing Adjustable |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bc659a/49d79a4e4e4a994a8eb7cf2eaf59c99d2251cac5.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bc659a/d48be8e9b638b9c27714cb3118a335376ed65f0f.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bc659a/b5ca868de7980f6944142ecdb849f47ad2cdfb5c.html) | passed | cannot tell | ⚠️ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bc659a/56857820788db21498e95a5cbba65d59a9a2b892.html) | failed | cannot tell | ⚠️ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bc659a/96c7657d21888cd05edd297d44a8fd554b21c908.html) | failed | cannot tell | ⚠️ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bc659a/b2e7f3e00ffce0a2a1078f860452814e6445445d.html) | failed | cannot tell | ⚠️ |
| [Failed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bc659a/5d4d5b214459c8a0779600ab39a5668003271c62.html) | failed | cannot tell | ⚠️ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bc659a/48a600254c0883cd5a72471420b1ac5a532ca6c3.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bc659a/4dffd30573a924ad0158d813733e029aac160194.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bc659a/a05aeffa53890c3ed9fd9cefa544eb1071497de5.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bc659a/a8c47bb26867342e83342645507fb766648799d7.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bc659a/ca4a053f47b6e322ad6de680fdabd05f651bf49b.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bc659a/b42a3a108d5d0f65258cd8157eb0011b78ce9253.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bc659a/0bf30cdf02ff26dfca5aa705b7023227da221e05.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 8](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/bc659a/8ce8198a1e6907ae25eb957eb0a5a99e719131a1.html) | inapplicable | inapplicable | ✅ |

### Object element rendering non-text content has non-empty accessible name

- **ACT Rule ID:** [8fc3b6](https://www.w3.org/WAI/standards-guidelines/act/rules/8fc3b6/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/8fc3b6/
- **工具規則 ID（Procedure）:** `object_text_exists:pass,fail_no_text_alternative`
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/object_text_exists.ts
- **一致性:** ✅ Consistent
- **涵蓋範圍:** covers all 18 examples.

**成功標準差異:**

| 預期 | 回報 |
|------|------|
| * 1.1.1   Non-text Content | * 1.1.1   Non-text Content |

| 測試案例 | 預期結果 | 工具回報 | 一致？ |
|---------|---------|---------|-------|
| [Passed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/2c4e13b6606b88bbe10bfffbe4b6f4e6d373c4a7.html) | passed | inapplicable | ✅ |
| [Passed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/dd651de8f984bc2bc5d791eceedf16e70cca0cdc.html) | passed | inapplicable | ✅ |
| [Passed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/1b172036f8e219ef9b6f591d7f5df26e4ba11327.html) | passed | inapplicable | ✅ |
| [Passed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/c3ed1c920db04a7b13d043fae5766694cf50d561.html) | passed | inapplicable | ✅ |
| [Failed Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/4147da2dd50e2326a7985207296cfcd0ba57a1ee.html) | failed | failed | ✅ |
| [Failed Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/8bd420282f8209ce236004c61bc4bbd728afceb7.html) | failed | failed | ✅ |
| [Failed Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/0f4a37cd30bd688d1a8ebbb915b2c70a4bf0272c.html) | failed | failed | ✅ |
| [Failed Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/dcb42362e4cd8108444dd64c8538ef0523de0aa7.html) | failed | failed | ✅ |
| [Failed Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/a2525d7f2db0db246df0a702416606c56085a17a.html) | failed | failed | ✅ |
| [Failed Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/f6b0a52f8bb37ab0a8b290237add5be669a28b2f.html) | failed | failed | ✅ |
| [Inapplicable Example 1](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/fd273c99d6129f0972ffdbe529b2b1cfa1116cf0.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 2](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/84c10ba8bc5570e900a60a2e29b319e68fc093da.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 3](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/52ac3fd2be278ede2bb32987a32673c6d5ee5edb.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 4](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/90927d72c81e9a9b27034a1a99adbab46c86e196.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 5](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/511c1b1647549d8af305f68253dda6d4161bd9bc.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 6](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/852f57fb1f11a0a58d288746c14d52ce8f8dd97a.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 7](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/fac8b25d43d0bbea83f5fe8c5fddf1b3566ac1fb.html) | inapplicable | inapplicable | ✅ |
| [Inapplicable Example 8](https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases/8fc3b6/25b2c00b86322f15c0cbb376b58b342fff916f62.html) | inapplicable | inapplicable | ✅ |

### HTML page has lang attribute

- **ACT Rule ID:** [b5c3f8](https://www.w3.org/WAI/standards-guidelines/act/rules/b5c3f8/)
- **ACT Rule 連結:** https://www.w3.org/WAI/standards-guidelines/act/rules/b5c3f8/
- **規則邏輯文件:** https://github.com/IBMa/equal-access/blob/master/accessibility-checker-engine/src/v4/rules/html_lang_exists.ts
- **一致性:** ✅ Consistent

## Summary

| Metric | Value |
|--------|-------|
| Total Rules Implemented | 27 |
| WCAG 2 Rules (Consistent) | 21 |
| WCAG 2 Rules (Partial) | 3 |
| Proposed Rules (Consistent) | 3 |
| Proposed Rules (Partial) | 0 |
| Completely Consistent Rules | 24 |
| Partially Consistent Rules | 3 |

### Partially Consistent Rules

- **Element marked as decorative is not exposed**: result mismatches or missing SC reporting
- **Image has non-empty accessible name**: result mismatches or missing SC reporting
- **Meta element has no refresh delay**: cannot tell cases

### Notes on Consistency

- ✅ **Consistent**: All expected test case outcomes match tool reports (excluding untested examples)
- ⚠️ **Partial**: Some test cases produce 'cannot tell' results or outcome mismatches
- 'cannot tell' results represent technical limitations (e.g., JavaScript execution, visual rendering)
- Both 'inapplicable' and 'passed' are acceptable for test cases marked as Inapplicable in the ACT spec
- Full data available at: [https://www.w3.org/WAI/standards-guidelines/act/implementations/equal-access/](https://www.w3.org/WAI/standards-guidelines/act/implementations/equal-access/)