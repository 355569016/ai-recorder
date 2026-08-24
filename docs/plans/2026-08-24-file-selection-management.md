# 文件列表选择与管理 Implementation Plan

> **For Codex:** This plan is implemented in the current prototype checkout after product confirmation.

**Goal:** 补齐全部文件真实空状态、左滑选择、长按快捷菜单、单/多选操作和文件重命名链路，合并文件暂不实现。

**Architecture:** 在 `APP-HOME-01` 内新增文件列表状态模型，正常文件使用稳定 `fileId`；左滑直接进入并自动选中统一的选择状态，长按进入快捷操作状态，生成、移动和回收站操作复用已有页面链路。空状态按正常文件、同步任务和筛选结果分别判断，避免把“暂无文件”误用于临时同步或筛选无结果。

**Tech Stack:** 原生 HTML/CSS/JavaScript 原型、现有 `pages`/`renderers`/全局事件委托、`node` 构建脚本。

---

### Task 1: Add file-list state and render model

**Files:** `app.js`

- Add stable demo file records, selected IDs, open swipe ID, quick-menu ID, rename draft/error, and recycle confirmation state.
- Render normal file rows from the records and keep transfer rows non-selectable.
- Render true empty state only when normal and transfer lists are empty; render filtered-empty copy separately.

### Task 2: Implement left-swipe, selection mode, and long-press menu

**Files:** `app.js`, `styles.css`

- Add pointer tracking for horizontal swipe and a 500ms long-press timer.
- Make only one row reveal `选择`; vertical scrolling and outside taps close the reveal.
- Add selection header, check circles, dynamic action bar, and single/multiple eligibility rules.
- Add quick menu actions for generation, moving, renaming, and moving to recycle bin.

### Task 3: Implement rename and destructive action chains

**Files:** `app.js`, `styles.css`

- Add rename bottom sheet with selected input, validation, cancel/close, save, and success toast.
- Generalize move-folder context to selected file IDs and return to the correct home state.
- Add recoverable recycle-bin confirmation and update the list to empty state after the final file is moved.

### Task 4: Sync requirements and generated artifacts

**Files:** `AI录音卡App页面效果设计需求文档_v3.0.md`, `../AI录音卡App需求文档_v3.0.md`, generated `index.html`, `prd-preview.html`, `design-qa.md`

- Document the new states, actions, eligibility, copy, and merge exclusion.
- Run `node scripts/build-inline.js` and `node scripts/build-prd-preview.js`.

### Task 5: Verify

- Run `node --check app.js` and `git diff --check`.
- Exercise empty state, swipe-select, long press, selection count, rename validation/save/cancel, move, recycle confirmation, and final-file empty state.
- Record only checks actually completed in `design-qa.md`.
