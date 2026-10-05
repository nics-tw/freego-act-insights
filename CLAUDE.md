# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run build` — format, lint, and test in sequence (primary dev command)
- `npm run fmt` — prettier-standard formatting across JS/MD/JSON
- `npm run lint` — ESLint with auto-fix on `src/**/*.js`
- `npm run test` — Jest
- `npm run example` — run the axe-core reference pipeline (`node examples/run.js`)
- `npm run generate-report -- --serve [--dir <path>] [--port 5500]` — download + serve ACT test cases locally for a manual Freego scan
- `npm run generate-report -- --htm <report.htm> [--out <path>] [--base-url <url>] [--testcases-json <path>]` — parse a Freego HTM report and generate the EARL + compatibility reports

## Project Purpose

This project automates accessibility compliance testing using **Freego** — a macOS desktop app (Dec 19 2025) used by Taiwan government for accessibility inspection. Freego has no HTTP/CLI API; it must be operated through its GUI.

**Full pipeline** (implemented, driven by `examples/generate-report.js`):
1. **Serve** — `npm run generate-report -- --serve` loads/filters ACT test cases, downloads them locally, and starts an HTTP server (e.g. `http://127.0.0.1:5500/`) so Freego's crawler can reach them. Implemented by `src/serve-test-cases.js`. The filtered test case set is snapshotted to `testcases-snapshot.json` in the serve dir so the later parse step sees the exact same set (URL hashes must match).
2. **Scan (manual)** — run Freego's full-site batch scan (`全部檢測`) against the local server root; Freego crawls all sub-path pages and consolidates results into a single HTM report.
3. **Parse** — `src/parse-freego-report.js` (`parseFreegoReport`) extracts per-page violation data (detection codes, WCAG levels) from the HTM.
4. **Compare** — `src/generate-implementation-report.js` (`generateImplementationReport`) maps detection codes back to ACT Rule IDs via `rulesMap.js`, joins Freego pages to ACT test cases (via `localUrl` from `src/serve-test-cases.js`), and classifies each result against the test case's expected outcome.
5. **Output** — `npm run generate-report -- --htm <report.htm>` writes two files:
   - `examples/results/freego.json` — W3C EARL JSON-LD, importable at https://act-implementor.netlify.app/#/start
   - `examples/results/freego-consistency.json` — a compatibility report (`summary` counts + per-testcase `consistent` / `inconsistent-FP` / `inconsistent-invalid` / `not-implemented` verdicts), not part of the EARL schema

**Re-running after a Freego update**: repeat steps 1–5 (`--serve` → manual scan → `--htm`) to regenerate both output files from scratch; nothing in the pipeline is stateful beyond the `testcases-snapshot.json`.

This Freego branch is parallel to, and independent from, the `examples/` **reference implementation using axe-core** (see Architecture below) — both key off the same `rulesMap.js` but produce differently-shaped EARL output, and the Freego consistency report compares against each test case's own ACT-defined `expected` outcome, not against the axe-core results.

## Freego HTM Report Format

Freego generates a single-file HTM report with hierarchical HTML lists:

```html
<!-- Per-page entry -->
<li class="url">N.檢測網址[URL]</li>
<ol class="upper-roman">
  <li>
    <a href="[moda_link]">[CODE]:[Description]</a>([LEVEL])
  </li>
  <ul><li>[Remediation advice]</li></ul>
</ol>
```

- **URL pattern**: `http://127.0.0.1:5500/[ruleId-or-testcase-path]`
- **Detection codes**: `HM[10 digits][letter]` format (e.g. `HM1130100C`)
- **WCAG levels**: `(A)`, `(AA)`, `(AAA)`
- **Report sections**: 軟體檢測未通過項目 (failures), 頁面載入逾時 (timeouts), 檢測設定紀錄 (config)

## Architecture

**Entry point**: `src/index.js` exports the async `testRunner(config)` function.

**Core pipeline** (`src/`):
- `load-test-cases.js` — fetches and filters ACT test cases from the URL in `package.json`'s `config.TESTCASES_JSON` (currently `https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases.json`) by `rulesMap` keys; supports `skipTests` and `runOnly`
- `test-runner.js` — validates config, launches Puppeteer, iterates test cases, returns results
- `execute-test-case.js` — opens a page, injects scripts/globals (`window.testcase`, `window.rulesMap`), runs `evaluate` in page context
- `script-injector.js` — injects external scripts (URLs or file paths) into a Puppeteer page

- `rulesMap.js` — maps 33 ACT Rule IDs to Taiwan MODA detection codes (e.g. `'23a2a8': ['HM1110100C']`); primary extension point, shared by both branches below

**axe-core reference branch** (`examples/`) — shows the intended EARL output shape using an automated, non-Freego tool:
- `examples/evaluate.js` — reference `evaluate` function (axe-core); shows expected return shape
- `examples/to-earl.js` — converts raw `testRunner` results to W3C EARL 1.0 JSON-LD (`earl:`-prefixed vocabulary) with Taiwan detection code metadata
- `examples/run.js` — orchestrates: loads rulesMap, calls `testRunner`, writes EARL to `examples/results/output.jsonld` (`npm run example`)

**Freego branch** (`src/` + `examples/generate-report.js`) — drives the manual-GUI pipeline described above:
- `src/serve-test-cases.js` — `downloadTestCases()` mirrors ACT test pages locally; `startServer()` serves them over HTTP with directory listings for Freego's crawler; `localUrl()` rewrites a remote ACT test case URL to its local-server equivalent
- `src/parse-freego-report.js` — default export `parseFreegoReport(htmPath)` parses Freego's HTM report into `{ pages: [{url, violations, timedOut}], timedOut: [] }`
- `src/generate-implementation-report.js` — `generateImplementationReport({freegoPages, timedOut, testCases, rulesMap, baseUrl, freegoRevision})` returns `{report, summary, consistencyDetails}`; `report` follows the schema act-implementor.netlify.app expects (no `earl:` prefix, unlike `to-earl.js`). Also exports the `CONSISTENCY` enum (`consistent`, `inconsistent-FP`, `inconsistent-invalid`, `not-implemented`) and maintains `DETECTION_CODE_WCAG_MAP` (MODA code → WCAG 2.1 SC) used to populate each EARL assertion's `test.isPartOf`
- `examples/generate-report.js` — CLI entry point (`npm run generate-report`) with `--serve` and `--htm` modes tying the three files above together; see Full pipeline above

## Key Config Object

```js
testRunner({
  globals: { rulesMap },          // required — ACT Rule ID → detection code mapping
  evaluate: async function() {},  // required — runs in Puppeteer page context
  injectScripts: ['script.js'],   // optional — injected before evaluate
  skipTests: { ruleIds, testCases, fileExtensions },
  runOnly: ['file.html'],         // optional — restrict to specific test files
  debug: false,                   // true = non-headless browser
})
```

## rulesMap Format

```js
// rulesMap.js — ACT Rule ID → Taiwan MODA detection codes
module.exports = {
  '23a2a8': ['HM1110100C'],              // 1:1
  'c487ae': ['HM1110101C', 'HM1240401C'] // 1:many
}
```

Reference: https://accessibility.moda.gov.tw/Accessible/Guide/68
