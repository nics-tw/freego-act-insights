/**
 * ACT Rules 到國內檢測碼的對應關係
 *
 * @description
 * 此檔案定義了 ACT-Rules (https://act-rules.github.io/rules/) 與國內無障礙檢測碼之間的映射關係。
 * TestRunner 會根據這些對應關係來篩選和執行相應的測試案例，並將結果對應至國內檢測碼。
 *
 * @format
 * - Key: ACT Rule ID (6 碼字串) - 例如: '23a2a8', '5f99a7'
 * - Value: 國內檢測碼陣列 (字串陣列) - 例如: ['HM1110100C', 'HM1410200C']
 *   （一個 ACT Rule 可對應多個國內檢測碼）
 *
 * @source
 * 來源檔案: 整理自 https://accessibility.moda.gov.tw/Accessible/Guide/68
 *
 * @stats
 * - ACT Rules 總數: 33 條
 * - 檢測碼總數: 16 個
 * - 總對應關係: 41 對
 * - 最後更新: 2026-03-23
 *
 * @reference
 * - ACT Rules 官方網站: https://act-rules.github.io/rules/
 * - 國內無障礙網站: https://accessibility.moda.gov.tw/
 *
 * @author NICS-RA
 */

const rulesMap = {
  // ==========================================
  // 非文字內容相關 (HM1110100C ~ HM1110106C)
  // ==========================================

  // Image has non-empty accessible name → HM1110100C 圖片替代文字
  '23a2a8': ['HM1110100C'],

  // Image accessible name is descriptive → HM1110100C 圖片替代文字
  qt1vmo: ['HM1110100C'],

  // Image button has non-empty accessible name → HM1110104C 圖片按鈕, HM1410200C ARIA
  '59796f': ['HM1110104C', 'HM1410200C'],

  // Object element rendering non-text content has non-empty accessible name → HM1110105C
  '8fc3b6': ['HM1110105C'],

  // Image not in the accessibility tree is decorative → HM1110106C 裝飾性圖片
  e88epe: ['HM1110106C'],

  // ==========================================
  // 表格相關 (HM1130101C)
  // ==========================================

  // Headers attribute specified on a cell refers to cells in the same table element → HM1130101C
  a25f45: ['HM1130101C'],

  // Table header cell has assigned cells → HM1130101C
  d0f69e: ['HM1130101C'],

  // ==========================================
  // 表單和按鈕相關 (HM1130104C, HM1410200C)
  // ==========================================

  // Button has non-empty accessible name → HM1130104C 表單和按鈕名稱, HM1410200C ARIA
  '97a4e1': ['HM1130104C', 'HM1410200C'],

  // Form field has non-empty accessible name → HM1130104C 表單和按鈕名稱, HM1410200C ARIA
  e086e5: ['HM1130104C', 'HM1410200C'],

  // ==========================================
  // 網頁標題相關 (HM1240200C)
  // ==========================================

  // HTML page has non-empty title → HM1240200C 網頁標題
  '2779a5': ['HM1240200C'],

  // HTML page title is descriptive → HM1240200C 網頁標題
  c4a8a4: ['HM1240200C'],

  // ==========================================
  // 連結目的相關 (HM1110101C, HM1240400C, HM1240401C, HM3240900C)
  // ==========================================

  // Links with identical accessible names and same context serve equivalent purpose → HM1240400C
  fd3a94: ['HM1240400C'],

  // Link in context is descriptive → HM1240401C, HM3240900C
  '5effbb': ['HM1240401C', 'HM3240900C'],

  // Link has non-empty accessible name → HM1110101C, HM1240401C, HM1410200C, HM3240900C
  c487ae: ['HM1110101C', 'HM1240401C', 'HM1410200C', 'HM3240900C'],

  // Link is descriptive → HM3240900C 連結描述
  aizyf1: ['HM3240900C'],

  // ==========================================
  // 語言聲明相關 (HM1310100C, HM2310200C)
  // ==========================================

  // HTML page has lang attribute → HM1310100C 網頁語言聲明
  b5c3f8: ['HM1310100C'],

  // HTML page lang attribute has valid language tag → HM1310100C
  bf051a: ['HM1310100C'],

  // Element with lang attribute has valid language tag → HM1310100C, HM2310200C
  de46e4: ['HM1310100C', 'HM2310200C'],

  // HTML page language subtag matches default language → HM1310100C
  ucwvc8: ['HM1310100C'],

  // HTML element language subtag matches language → HM2310200C 元素語言聲明
  off6ek: ['HM2310200C'],

  // ==========================================
  // ARIA 和名稱、角色、值相關 (HM1410200C, HM1410201C)
  // ==========================================

  // Summary element has non-empty accessible name → HM1410200C
  '2t702h': ['HM1410200C'],

  // Element with presentational children has no focusable content → HM1410200C
  '307n5z': ['HM1410200C'],

  // Element with role attribute has required states and properties → HM1410200C
  '4e8ab6': ['HM1410200C'],

  // ARIA state or property is permitted → HM1410200C
  '5c01ea': ['HM1410200C'],

  // ARIA attribute is defined in WAI-ARIA → HM1410200C
  '5f99a7': ['HM1410200C'],

  // Role attribute has valid value → HM1410200C
  '674b10': ['HM1410200C'],

  // ARIA state or property has valid value → HM1410200C
  '6a7281': ['HM1410200C'],

  // Element with aria-hidden has no content in sequential focus navigation → HM1410200C
  '6cfa84': ['HM1410200C'],

  // ARIA required ID references exist → HM1410200C
  in6db8: ['HM1410200C'],

  // Menuitem has non-empty accessible name → HM1410200C
  m6b1q3: ['HM1410200C'],

  // Iframe elements with identical accessible names have equivalent purpose → HM1410201C
  '4b1c6c': ['HM1410201C'],

  // Iframe element has non-empty accessible name → HM1410201C
  cae760: ['HM1410201C'],

  // ==========================================
  // 文件標題相關 (HM3241000C)
  // ==========================================

  // Document has heading for non-repeated content → HM3241000C
  '047fe0': ['HM3241000C']
}

module.exports = rulesMap
