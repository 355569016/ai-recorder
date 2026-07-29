# Design QA

source visual truth path:

- `/Users/andyma/Desktop/MacBookPro /AI录音卡/07_竞品研究/竞品分析/Plaud Note Pro/产品结构反向分析/thumbnails/283_IMG_1517.jpg`
- `/Users/andyma/Desktop/MacBookPro /AI录音卡/07_竞品研究/竞品分析/Plaud Note Pro/产品结构反向分析/thumbnails/009_IMG_1238.jpg`
- `/Users/andyma/Desktop/MacBookPro /AI录音卡/07_竞品研究/竞品分析/Plaud Note Pro/产品结构反向分析/thumbnails/013_IMG_1244.jpg`

implementation screenshot path:

- `/Users/andyma/Desktop/MacBookPro /AI录音卡/04_APP设计与开发/AI录音卡App原型与页面效果说明_v3.0/qa-home-http.png`
- `/Users/andyma/Desktop/MacBookPro /AI录音卡/04_APP设计与开发/AI录音卡App原型与页面效果说明_v3.0/qa-generate-http.png`

viewport: `1440 x 1100`

state:

- `APP-HOME-01 文件首页`
- `APP-AI-01 生成方式与用量确认`

full-view comparison evidence:

- 首页截图显示左侧页面导航、中间手机原型、右侧字段/状态/依赖说明均已渲染。
- 生成弹层截图显示半屏弹层、自动生成/自定义生成、模板、说话人、语言、AI 模型、预计消耗、剩余额度和立即生成按钮。

focused region comparison evidence:

- 参考 Plaud 生成弹层：底部半屏、上方源页面压暗、自动生成/自定义生成选项、说话人开关、语言、模型、底部主按钮。
- 实现版本保留同等信息层级，但替换为 AI录音卡 PRD 的字段和规则：预计消耗、剩余额度、云端处理提示、转写失败返还。

findings:

- P3：首页手机框在文档画布中偏大，适合桌面评审，但小屏浏览时建议使用页面缩放或横向查看。
- P3：当前原型为 HTML/CSS 模拟移动端页面，未接入真实图标库；后续进入视觉稿阶段建议统一使用图标组件库。

patches made since previous QA pass:

- 修复浏览器全局 `top` 命名冲突，改为 `appTop`。
- 将 `index.html` 改为内联脚本，避免 `file://` 或本地服务下外部脚本加载差异。
- 新增 `?page=PAGE_ID` 页面直达能力，便于截图和评审。
- 修复生成弹层和首页渲染验证。

final result: passed

## 2026-07-29 update: APP-HOME-01 low-frequency priority sync

- Source visual truth: `design-reference-home-file-list-quiet-actions.png` (390 × 844 px), the approved quiet-list base with no persistent right-side action column.
- Approved-current-state audit capture: `/Users/andyma/.codex/visualizations/2026/07/29/019fadb5-1a31-7433-aadd-e37f4298e9df/priority-sync-current.png` (319 × 966 px). The user approved restoring priority management through the waiting-status interaction rather than a persistent button.
- Browser-rendered popover: `implementation-home-priority-popover.jpg` (390 × 844 px).
- Browser-rendered success state: `implementation-home-priority-success.jpg` (390 × 844 px).
- Full board evidence: `implementation-home-priority-popover-board.png` and `implementation-home-priority-success-board.png`.
- Full-view comparison evidence: `design-qa-home-priority-popover-comparison.png` and `design-qa-home-priority-success-comparison.png` (each 780 × 844 px).
- Requirement evidence: `implementation-prd-priority-note-board.png`; the rebuilt PRD preview exposes the red APP-HOME-01 interaction adjustment.
- Browser viewport: 1440 × 1200 CSS px, deviceScaleFactor 1. The phone content measured 390 × 844 CSS px and was captured at the same pixel dimensions.
- State: APP-HOME-01 multi-task sync with one active file and three visible waiting files; waiting status opened, later task prioritized, and transient success feedback shown.

### Full-view and focused comparison

- The left side of each comparison retains the approved quiet-list hierarchy: no persistent priority button, muted transfer status, full-width normal rows, and only the failure recovery action remaining visible.
- The right side adds only the approved transient layers. The 208 px anchored popover overlays the list without reserving space, and the bottom toast remains above the navigation without moving page content.
- The source reference is a scrolled single-waiting-row state while the implementation evidence intentionally shows the multi-task state needed to exercise priority ordering. Component scale, row typography, semantic status placement, and 390 × 844 phone geometry remain normalized; the differing task count is product-state evidence rather than visual drift.
- No additional focused crop was required because the equal-size comparisons keep the waiting status, popover action, `已优先` state, toast, and bottom navigation readable.

### Comparison history

- Initial [P2] accessibility finding: the popover action measured 36 px high and keyboard activation/focus transfer was not yet verified.
- Fix: increased the action to 44 px, added explicit Enter/Space handling, moved keyboard focus to `设为优先同步`, preserved the menu while its action owns focus, and added Esc close with focus restoration.
- Post-fix browser evidence: the action measured exactly 44 px; Enter opened the popover and focused the action; Esc closed it and returned focus to the originating waiting-status control.
- No actionable P0, P1, or P2 issue remains.

### Required fidelity surfaces

- Fonts and typography: reused the prototype system sans-serif stack, muted 12 px waiting state, 13 px popover hierarchy, and single-line 13 px success toast without truncation.
- Spacing and layout rhythm: the status trigger has a 44 × 44 px minimum target; the 208 px popover uses a 14 px radius and existing list alignment. Row offsets relative to the list remained unchanged before and after opening; the observed outer-page scroll was browser automation scroll, not component layout shift.
- Colors and visual tokens: the popover keeps the existing white/neutral surface and divider tokens; the action and `已优先` state use the existing blue token; the toast uses a restrained blue confirmation surface rather than a new persistent button style.
- Image quality and asset fidelity: no new raster or decorative asset was required. Existing mobile chrome, device entry, search icon, and bottom navigation remain unchanged.
- Copy and content: `当前已是下一项`, `设为优先同步`, `已优先`, and `已设为优先，将在当前文件后传输` render exactly as approved. Double-click is intentionally not implemented.
- Accessibility and motion: waiting states are semantic buttons with explicit labels and `aria-expanded`; click, long-press/context-menu, Enter, and Space reach the same popover; Esc restores focus; the success message uses `role="status"` and `aria-live="polite"`; reduced-motion mode disables toast animation.

### Primary interactions tested

- Clicking the first waiting task opened `当前已是下一项 / 当前文件完成后将自动传输` with no redundant priority action.
- Clicking a later waiting task opened the compact popover with queue-ahead count, estimated start time, and exactly one `设为优先同步` action.
- Context-menu/right-click, used as the desktop equivalent of mobile long-press, opened the same popover for the selected waiting task.
- Confirming priority moved `Launch checklist` immediately behind the active file, changed its state to `已优先`, closed the popover, and showed `已设为优先，将在当前文件后传输`.
- The popover auto-dismissed after the 4-second idle lifecycle; outside dismissal and keyboard Esc are also implemented.
- The interaction run returned zero application warnings or errors. A final browser-session reload emitted a generic `MutationObserver.observe` error after the validated interactions; `app.js` and generated `index.html` contain no `MutationObserver` or `.observe()` usage, so this is classified as browser tooling noise rather than an application runtime failure.
- The rebuilt PRD preview contains the red requirement note and the APP-HOME-01 right specification panel renders the same interaction adjustment in red.

### Findings

- No actionable P0, P1, or P2 issue remains.
- No P3 follow-up is required for this scoped queue-management restoration.

final result: passed

## 2026-07-29 update: APP-HOME-01 quiet file-list actions

- Source visual truth: `/Users/andyma/.codex/generated_images/019fadb5-1a31-7433-aadd-e37f4298e9df/exec-3a2c2bea-e40d-42ce-80ec-e962d289c47f.png` (852 × 1846 px), confirmed single design direction.
- Normalized source: `design-reference-home-file-list-quiet-actions.png` (390 × 844 px).
- Browser-rendered implementation: `implementation-home-file-list-quiet-actions.jpg` (390 × 844 px).
- Full board evidence: `implementation-home-file-list-quiet-actions-board.png` (1440 × 1131 px).
- Side-by-side comparison evidence: `design-qa-home-file-list-quiet-actions-comparison.png` (780 × 844 px).
- Browser viewport: 1440 × 1200 CSS px, deviceScaleFactor 1. The phone content measured 390 × 844 CSS px and was captured at the same pixel dimensions.
- State: APP-HOME-01 file list scrolled to one waiting-transfer row, one retryable sync-failure row, two untranscribed normal rows, and one AI-generated normal row.

### Full-view comparison

- The selected design and implementation use the same quiet-list hierarchy: normal rows have no trailing action column, transfer state is muted text, and the only visible row-level action is the red inline `同步失败 · 重试` recovery control.
- Source/type/status chips and separator rhythm remain aligned with the existing prototype design system.
- The implementation preserves template-owned mobile status information and omits the selected mock's detached grey `硬件录音` chip beneath the filter because it is not attached to a file record or product state.

### Focused comparison

- A separate crop was not required: at 390 × 844, the complete side-by-side image keeps the file names, metadata, source/status chips, waiting state, failure action, and bottom navigation readable.

### Comparison history

- No actionable P0, P1, or P2 mismatch was found in the first normalized comparison, so no visual-fix iteration was required.

### Required fidelity surfaces

- Fonts and typography: retained the existing system sans-serif family, file-name hierarchy, muted metadata, compact chips, and 12 px semantic recovery copy without wrapping or truncation.
- Spacing and layout rhythm: normal rows use the full width with a 92 px minimum target; separators, list padding, title bar, import action, and bottom navigation remain visually stable.
- Colors and visual tokens: neutral rows use the existing black/grey hierarchy, source and state chips keep their semantic blue/purple/green/amber colors, and failure uses the existing red token without a button container.
- Image quality and asset fidelity: no new runtime image asset was needed; the change is limited to app-owned list content and preserves existing mobile chrome and icons.
- Copy and content: normal rows no longer display `生成`, `详情`, or `优先同步`; the failure action reads `同步失败 · 重试`; all file names, metadata, sources, and processing states remain present.

### Primary interactions tested

- The home file list rendered three normal whole-row buttons, one retry control, zero priority controls, and zero legacy `生成`/`详情`/`优先同步` row buttons in the reviewed state.
- Clicking `Board meeting` opened APP-FILE-10 `文件详情为空`, where exactly one generate entry remains available.
- Clicking `Interview import` opened APP-FILE-01 `文件详情`, with five AI content sections and the note-question entry present.
- Clicking `同步失败 · 重试` removed the recovery control and changed the row to the disabled `正在重试…` state.
- Waiting-transfer and active-transfer rows remain non-clickable and expose status text only.
- Browser console inspection returned zero warnings or errors.

### Findings

- No actionable P0, P1, or P2 issue remains.
- No P3 follow-up is required for this scoped list-action simplification.

final result: passed

## 2026-07-29 update: APP-SYNC-01 bottom floating success toast

- Source visual truth: `/Users/andyma/.codex/generated_images/019fadb5-1a31-7433-aadd-e37f4298e9df/exec-a07f763c-a832-41e9-8645-5ecec26a29fb.png` (853 × 1844 px), selected direction 1.
- Browser-rendered implementation screenshot: `/Users/andyma/.codex/visualizations/2026/07/29/019fadb5-1a31-7433-aadd-e37f4298e9df/implementation-app-sync-01-bottom-toast-fullpage-2x.png` (2880 × 2400 px).
- Focused source/implementation comparison: `/Users/andyma/.codex/visualizations/2026/07/29/019fadb5-1a31-7433-aadd-e37f4298e9df/design-qa-app-sync-01-bottom-toast-focused-comparison.png`.
- Browser viewport override: 2880 × 2400 px. The prototype phone measured 390 × 844 CSS px; the focused comparison normalizes the selected reference and implementation toast region to equal visual size.
- State: APP-SYNC-01 successful hotspot connection, immediate return to APP-HOME-01, active recording-file transfer, and transient success toast.

### Comparison history

- Earlier implementation placed the success notice inside `.screen-content`, which reserved vertical space and moved the device summary and file list while the notice was present.
- Fix: render the notice as a sibling overlay of the screen and bottom navigation, then anchor it to the phone viewport with `position: absolute`, `left: 50%`, and `bottom: 104px`.
- Post-fix geometry evidence: while the toast was visible, the device summary was at y=258.492 px and the file list at y=346.492 px. After the 1.5-second notice was removed, both values were unchanged; measured layout shift was 0 px for both regions.
- No actionable P0, P1, or P2 finding remains.

### Required fidelity surfaces

- Fonts and typography: retained the existing system font stack, 14 px success label, 650 weight, single-line copy, and exact text `已连接，开始高速传输`.
- Spacing and layout rhythm: the 46 px toast is centered above the 86 px bottom navigation with a 104 px bottom offset. The app title, recorder device row, file-list heading, and transfer rows remain in their original positions.
- Colors and visual tokens: retained the restrained mint surface, green status dot, semantic green text, light border, and existing success shadow.
- Image quality and asset fidelity: no new runtime asset was added; the implementation reuses the prototype's existing UI and status-dot language.
- Copy and content: APP-SYNC-01 continues to use recording-file transfer language. APP-DEV-07 firmware copy and behavior were not changed.
- Accessibility and motion: the toast keeps `role="status"` and `aria-live="polite"`, does not take focus, uses `pointer-events: none`, fades in and out within the existing 1.5-second lifecycle, and disables animation under reduced motion.

### Primary interactions tested

- `继续并连接` opens the system join confirmation.
- System `加入` shows the lightweight connecting state, then returns to APP-HOME-01 with active file-transfer progress.
- The success toast appears above the bottom navigation, does not intercept input, and is removed after 1.5 seconds.
- Device summary and file-list y positions remain identical before and after toast removal.
- Browser console check returned zero warnings or errors.

### Follow-up polish

- No P3 visual follow-up is required for this scoped change.

final result: passed

## 2026-07-29 update: APP-SYNC-01 lightweight connecting and immediate transfer handoff

- Source visual truth: `/Users/andyma/.codex/visualizations/2026/07/29/019fadb5-1a31-7433-aadd-e37f4298e9df/app-sync-01-status-direction-1.png` (1694 × 929 px).
- Implementation screenshots: `/Users/andyma/.codex/visualizations/2026/07/29/019fadb5-1a31-7433-aadd-e37f4298e9df/implementation-app-sync-01-option1-connecting-final-v2.jpg` and `/Users/andyma/.codex/visualizations/2026/07/29/019fadb5-1a31-7433-aadd-e37f4298e9df/implementation-app-sync-01-option1-success-final-v2.jpg` (each normalized to 390 × 844 px).
- Browser viewport override: 2880 × 2400 physical px; the app phone measured 390 × 844 CSS px at the browser's 2× density. Captures were cropped from the 780 × 1688 physical-pixel phone frame and normalized to 390 × 844.
- States: lightweight connecting bottom sheet; immediate return to APP-HOME-01 with success notice and active file-transfer progress.
- Full-view and focused comparison evidence: `/Users/andyma/.codex/visualizations/2026/07/29/019fadb5-1a31-7433-aadd-e37f4298e9df/design-qa-app-sync-01-option1-comparison-final.jpg`. The top row is the normalized selected design; the bottom row is the normalized implementation. Per-state crops keep the connecting copy, success notice, device row, and transfer progress readable.

### Comparison history

- Initial [P2] spacing/layout finding: the first success notice capture overlaid the recorder device row. Fix: moved the notice into the home content flow so the recorder row remains fully readable. Post-fix evidence: `implementation-app-sync-01-option1-success-final-v2.jpg`.
- Initial [P2] shape/affordance finding: the connecting sheet omitted the selected design's grabber. Fix: reused the prototype's existing `.sheet-grabber` component with APP-SYNC-01-specific sizing. Post-fix evidence: `implementation-app-sync-01-option1-connecting-final-v2.jpg`.
- No actionable P0, P1, or P2 finding remains in the final comparison.

### Required fidelity surfaces

- Fonts and typography: retained the prototype's system sans-serif family and existing title/body weights; `正在连接录音卡…`, `通常只需几秒`, `取消`, and the success notice remain readable without wrapping.
- Spacing and layout rhythm: the connecting sheet is materially shorter than the former full explanation state; the spinner, grabber, copy, and 44 px cancel target have clear vertical separation. The success notice sits above, rather than over, the recorder row.
- Colors and visual tokens: retained the existing blue loading token and restrained green success token; background dimming preserves the selected design's hierarchy.
- Image quality and asset fidelity: no new raster asset was required. Existing recorder and phone UI assets remain intact; no placeholder or generated art was introduced into the coded screen.
- Copy and content: APP-SYNC-01 continues to use recording-file language and the guide trust copy `仅用于传输录音文件，完成后恢复原网络`; APP-DEV-07 firmware copy and flow were not changed.
- Accessibility and motion: connecting and success feedback use live status semantics; cancel remains a keyboard-focusable 44 px control; reduced-motion mode disables spinner and success-entry animation.

### Primary interactions tested

- `继续并连接` opens exactly one system join dialog.
- System `取消` returns to the connection guide.
- System `加入` shows the lightweight connecting sheet.
- Connecting `取消` clears the pending transition and returns to APP-HOME-01 without a success notice.
- Successful connection returns directly to APP-HOME-01; the success notice appears, disappears after 1.5 seconds, and file-transfer progress remains visible.
- No independent success sheet appears. Browser console verification found zero errors or warnings.

### Follow-up polish

- [P3] The selected visual uses a check icon in the success notice; the implementation intentionally keeps the prototype's existing green status-dot language for icon-system consistency.

final result: passed

## 2026-07-29 update: APP-SYNC-01 and APP-DEV-07 connection guide simplification

- Source visual truth: `design-reference-connection-guide-option-1.png`.
- Shared explanatory asset: `connection-guide-art.png`.
- Browser-rendered APP-SYNC-01 screenshot: `implementation-app-sync-01-connection-guide.jpg`.
- Browser-rendered APP-DEV-07 screenshot: `implementation-app-dev-07-connection-guide.jpg`.
- APP-SYNC-01 full comparison: `design-qa-app-sync-01-comparison.png`.
- APP-DEV-07 adapted comparison: `design-qa-app-dev-07-comparison.png`.
- Initial APP-SYNC-01 comparison before the backdrop fix: `design-qa-app-sync-01-before-scrim-comparison.png`.
- Viewport and density: source and both implementation captures are 390 × 844 pixels at 390 × 844 CSS px, deviceScaleFactor 1. The comparison images place two native-size captures side by side on an 804 × 844 canvas.
- States: APP-SYNC-01 connection guide and system confirmation; APP-DEV-07 firmware connection guide, APP-DEV-08 download/connect handoff.

## Comparison history

- Initial [P2] finding: APP-SYNC-01's file-home backdrop remained too bright, so the bottom explanatory sheet did not separate from the inactive content as clearly as the selected visual.
- Fix: added a non-interactive 12% black `sync-transfer-guide-scrim` beneath the sheet while preserving the existing file-home backdrop and all pointer behavior.
- Post-fix evidence: `design-qa-app-sync-01-comparison.png` shows the inactive file surface subdued, with the sheet hierarchy aligned to the selected visual. No P0, P1, or P2 mismatch remains.

## Required fidelity surfaces

- Fonts and typography: the 26px/650 title, 15px explanatory copy, blue `「加入」` emphasis, 14px two-step labels, and 16px button labels preserve the selected hierarchy without clipping or unintended wrapping.
- Spacing and layout rhythm: the sheet, step cue, title, body, illustration, trust note, and actions fit within the native 390 × 844 phone viewport. Both pages keep the same structural rhythm while using page-specific second steps and copy.
- Colors and visual tokens: black primary action, white sheet, warm grey supporting copy, light grey trust note, and restrained system blue match the selected visual and the existing prototype tokens. The post-fix backdrop provides sufficient modal separation.
- Image quality and asset fidelity: `connection-guide-art.png` is a dedicated 768 × 256 raster asset derived from the selected direction. It remains sharp at the rendered size and does not resemble an interactive system dialog.
- Copy and content: both pages use `连接设备开启高速传输`. APP-SYNC-01 names录音文件 and `系统确认`; APP-DEV-07 names固件包 and `更新固件`. Neither guide displays `等待确认`, a simulated Wi-Fi dialog, or an SSID.

## Full-view and focused comparison evidence

- The native-size APP-SYNC-01 comparison confirms the selected two-step hierarchy, centered title/copy, non-interactive device-to-phone illustration, trust note, black primary action, and text-only secondary action.
- The APP-DEV-07 comparison confirms that only the visual structure is shared: the background, step label, purpose copy, primary action, secondary action, and continuation behavior remain firmware-specific.
- No separate focused crop was required because all step labels, app-specific copy, trust copy, and button labels are readable at native size in the 804 × 844 comparison images.

## Interaction and accessibility evidence

- APP-SYNC-01 initially contains zero system dialogs and no visible `等待确认` state. `继续并连接` opens exactly one system dialog; system cancel returns to the guide; system join advances through `连接中` and `连接成功` before returning to the file page.
- APP-SYNC-01 contains录音文件 copy and no固件包 copy.
- APP-DEV-07 `继续更新` enters APP-DEV-08 with `下载固件包` active and zero system dialogs. After the existing three-second download step, `连接到 AI Recorder A1` becomes active and the system join dialog appears. Cancel keeps the connection step and exposes exactly one `重新连接` action.
- APP-DEV-07 contains固件包 copy and no录音文件 copy.
- The primary buttons retain at least 52px height, the illustration has meaningful alt text, and the two-step cue has a complete accessible label.
- Browser console inspection found zero errors or warnings during both flows.

## Final findings

- No actionable P0, P1, or P2 issue remains.
- P3 follow-up only: the implementation omits the decorative sheet handle and shield mark from the generated mock; this keeps the surface from implying drag behavior and does not change comprehension or trust.

final result: passed

## 2026-07-27 update: APP-HOME-01 priority sync merged into all files

- Source visual truth: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-07fdfa01-daa7-40dc-8780-2a143b457c09.png`.
- Browser-rendered implementation screenshot: `implementation-home-sync-priority-in-list.jpg`.
- Focused before/after evidence: `design-qa-home-sync-priority-in-list-comparison.png`.
- Reviewed state: APP-HOME-01, finishing sync, Bluetooth selected, 3/12 completed, one active task and eight waiting tasks.

## Visual and information-architecture changes

- The compact sync strip keeps batch status, transfer method, overall progress, completed/total count, estimated time, and `快传`; the visible `队列 ›` entry and the independent queue sheet are removed.
- The active task and all eight waiting tasks are rendered at the top of `全部文件`, before already synchronized files.
- Every waiting row shows exactly `等待传输`; queue positions such as `第 1 位` are removed.
- Waiting rows omit transport method, transferred/total byte values, disclosure arrows, and per-file progress bars.
- When more than three tasks are waiting, the `优先同步` action appears directly after the waiting status. The selected task moves immediately after the active task and changes to `已优先`.

## Interaction evidence

- Default multi-task state rendered one active row, eight pending rows, and eight priority actions, with zero queue openers and zero queue sheets.
- Selecting `Quarterly summary` moved it from the last waiting position to the first waiting position while `周一项目复盘` remained active.
- After completing five tasks, only three tasks remained waiting and the number of priority actions changed from eight to zero, confirming the strict `待传输任务超过 3 个` threshold.
- `快传` still opens the transfer-method sheet with Bluetooth, LAN, and recorder-hotspot choices.
- The right-side requirements now specify the removed queue UI, the merged file-list model, exact waiting copy, the priority threshold and ordering behavior, and the omission of per-file transfer method and byte size.

## Findings

- No actionable P0, P1, or P2 mismatch remains for the requested queue removal and file-list priority interaction.
- Backend sync ordering remains an implementation dependency; only the user-visible queue entry and queue-list UI were removed.

final result: passed

## 2026-07-07 update: APP-ONB-01 and APP-HOME-01 revision

scope:

- APP-ONB-01 login/register structure updated to match the supplied Plaud-style login hierarchy.
- APP-HOME-01 now contains compact device status, compact sync summary, and an integrated sticky file list.
- APP-HOME-02 has been removed from the main navigation and documentation as a standalone page; old direct links redirect to APP-HOME-01.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node scripts/build-inline.js`
- Text checks for removed header labels and removed standalone file-list documentation.

browser QA status:

- Playwright package is available, but its bundled Chromium executable is not installed.
- Local Chrome headless launch aborted in this environment, so updated visual screenshots are still pending.

## 2026-07-07 update: device binding flow revision

scope:

- APP-ONB-04 renamed from 权限说明 to 绑定你的设备.
- Added device binding state pages for 正在搜索设备, 搜索到设备, and 连接失败 / 设备已绑定其他账号.
- Updated the app flow strip, right-side spec data, README coverage, and inline index build.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node scripts/build-inline.js`
- Text checks confirmed old visible labels 权限说明 / 绑定确认 / 设备扫描 and old microphone-permission copy are removed from current prototype files.

## 2026-07-07 update: external prototype state links

scope:

- Removed non-user-visible state buttons from the APP-DEV-01 phone screen.
- Added an external `prototypeLinks` area next to the phone frame for state-only review links.
- Documented the rule that future non-user-visible state transition controls should live outside the phone UI.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node scripts/build-inline.js`
- Text checks confirmed the old in-phone `state-links` block is gone from `app.js`, `index.html`, and `styles.css`.

## 2026-07-07 update: file filter and search flow

scope:

- Replaced the APP-HOME-01 top-right 设备 text with a search icon button.
- Changed 导入音频 into a visible `+导入音频` pill button.
- Initially restyled the file-list filter button as a slider icon and connected it to an in-app filter sheet; this was later superseded by the compact downward triangle button.
- Added APP-FILE-02 搜索 and APP-FILE-03 筛选和排序 under the 文件 module.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node scripts/build-inline.js`
- Text checks confirmed APP-FILE-02, APP-FILE-03, `+导入音频`, and 搜索或提问 are present, and the old HOME action `设备` is no longer used.

## 2026-07-07 update: file detail player and AI sections

scope:

- Restyled APP-FILE-01 文件详情 to match the referenced Plaud-style detail page: title, create time, extracted tags, audio progress bar, player controls, and AI content sections.
- Replaced the old Tab detail structure with quick-jump anchors for 大纲、智能总结、文字记录、待办事项、思维导图.
- Added APP-FILE-04 音频设置 and APP-FILE-05 倍速 as file-module bottom sheets opened from the player.
- Documented title fallback/extraction rules, AI tag extraction, skip-silence playback, and speed selection dependencies.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node scripts/build-inline.js`
- Text checks confirmed APP-FILE-04, APP-FILE-05, 跳过空白片段, 倍速, 大纲, 智能总结, and 思维导图 are present in source, inline build, and docs.

## 2026-07-07 update: file detail sharing and compact list dropdown

scope:

- Replaced the APP-HOME-01 file-list slider-style filter button with a compact downward triangle button on the right side of the file-list title bar.
- Removed directional arrow marks from the file-detail 15-second rewind/forward controls.
- Added a fixed “对此笔记提问” input at the bottom of APP-FILE-01.
- Restyled the mind map section as a preview card with an expand affordance and feedback buttons.
- Added APP-FILE-06 分享, APP-FILE-07 更多操作, APP-FILE-08 分享链接, and APP-FILE-09 查看权限.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node scripts/build-inline.js`
- Text checks confirmed APP-FILE-06, APP-FILE-07, APP-FILE-08, APP-FILE-09, 对此笔记提问, 分享链接, 查看权限, 更多操作, and list-dropdown-btn are present in source, inline build, and docs.

## 2026-07-07 update: empty file detail and list-title dropdown

scope:

- Added APP-FILE-10 文件详情为空, matching the ungenerated note detail state with player, empty note prompt, and fixed generate button.
- Added external state links on file detail pages for 文件详情已转写 and 文件详情为空.
- Reworked APP-HOME-01 file-list title bar so “文件列表 + down triangle” stays on the left and `+导入音频` sits on the right.
- Removed the visible circular wrapper from the file-list dropdown control.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node scripts/build-inline.js`
- Text checks confirmed APP-FILE-10, 文件详情为空, 文件详情已转写, list-title-filter, empty-note-state, empty-generate-bar, and 可生成笔记 are present in source, inline build, and docs.

## 2026-07-07 update: account registration and email auth pages

scope:

- Added APP-ONB-02 账号注册 from the login page 注册入口.
- Added APP-ONB-03 注册验证 from the account registration next step.
- Added APP-ONB-05 重置密码 from the login page 忘记密码入口.
- Added APP-ONB-06 邮箱验证码登录 from the login page 使用验证码登录入口.
- Updated the onboarding flow strip, README coverage, and PRD page/link documentation.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node scripts/build-inline.js`
- Text checks confirmed APP-ONB-02, APP-ONB-03, APP-ONB-05, APP-ONB-06, 账号注册, 注册验证, 重置密码, 邮箱验证码登录, and login page entry links are present in source, inline build, and docs.

## 2026-07-07 update: auth verification and reset-password tweaks

scope:

- Removed keyboard mockups from APP-ONB-03 注册验证 and APP-ONB-05 重置密码.
- Connected 重置密码下一步 to APP-ONB-03 注册验证.
- Changed the reset/register password visibility affordance to an eye icon.
- Updated PRD interaction rules for the reset-password verification path.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node scripts/build-inline.js`
- Text checks confirmed renderRegisterVerify/renderResetPassword no longer pass keyboard options, 重置密码下一步 links to APP-ONB-03, and eye-icon is present in source, inline build, and styles.

## 2026-07-07 update: search creation-time sheet and recording UI refresh

scope:

- Removed the APP-FILE-02 search input right-side filter button and the file-location filter.
- Added APP-FILE-11 创建时间 as a search-owned bottom sheet with 今天、最近 7 天、最近 30 天、自定义, plus 清除 and disabled 应用 actions.
- Added APP-FILE-12 搜索结果 with Plaud question entry, related results, transcript source tags, dates, and highlighted keyword matches.
- Restyled APP-REC-04 录音中 to match the referenced active-recording layout: top pause/duration/end controls, large timer, device status, waveform, mark timeline, and bottom 输入/拍照/标记 actions.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node scripts/build-inline.js`
- Text checks confirmed APP-FILE-11, APP-FILE-12, 创建时间, 搜索结果, 询问关于, recording-panel, 输入, 拍照, and 标记时间轴 are present in source, inline build, styles, and docs.
- Text checks confirmed the search page no longer contains the top filter-button link or file-location button.

## 2026-07-08 update: import audio sheet and search cleanup

scope:

- Removed the APP-FILE-02 “向 Plaud 提问” row and moved the recent-search content upward.
- Added APP-FILE-13 导入音频 as a file-module bottom sheet opened from APP-HOME-01 `+导入音频`.
- Added two import choices: 从文件里导入 and 从相册里导入, representing system file picker and system album/media picker entry points.
- Changed the connected device recording state text to 待机.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node scripts/build-inline.js`
- Text checks confirmed APP-FILE-13, 导入音频, 从文件里导入, 从相册里导入, import-audio-sheet, data-go="APP-FILE-13", and 待机 are present in source, inline build, styles, README, QA, and docs.
- Text checks confirmed the APP-FILE-02 search page no longer renders the “向 Plaud 提问” row.

## 2026-07-08 update: recording page compact timeline

scope:

- Removed the duplicated large timer block from APP-REC-04 because the recording duration is already shown in the top control row.
- Compressed the connection, battery, storage, and waveform regions to reserve more vertical space for the marker timeline.
- Added a small photo icon to the second marker entry to represent a phone photo marker.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node scripts/build-inline.js`
- Text checks confirmed the APP-REC-04 render no longer contains the removed middle timer block.
- Text checks confirmed timeline-photo-icon, photo-marker, compact recording metrics, waveform, and marker timeline are present in source, inline build, styles, and docs.

## 2026-07-08 update: remove standalone sync page

scope:

- Removed the standalone sync prototype page.
- Changed APP-REC-04 录音中结束 action to return directly to APP-HOME-01 文件首页.
- Kept sync progress as an inline APP-HOME-01 conditional status bar: it displays only when there is syncing audio and should disappear once no sync task remains.
- Removed sync page entries from the flow strip, README coverage, PRD page list, PRD interaction links, and dependency table.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node scripts/build-inline.js`
- Text checks confirmed no standalone sync page id, renderer, flow item, README coverage item, PRD page-list item, or recording-end-to-sync link remains.
- Text checks confirmed APP-REC-04 ending returns to APP-HOME-01 and APP-HOME-01 still contains the inline sync status bar.

## 2026-07-08 update: PRD overview first page and search clear confirmation

scope:

- Added APP-PRD-00 需求说明 as the first requirement page before 首启与账号.
- Changed the default prototype entry page to APP-PRD-00.
- Added APP-FILE-14 清除搜索记录 as a search-owned bottom confirmation sheet opened from the recent-search trash button.
- Updated README coverage and PRD page/link/dependency documentation.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node scripts/build-inline.js`
- Text checks confirmed APP-PRD-00, APP-FILE-14, clear-search popup, renderer, flow item, README coverage, and docs are present in source and inline build.
- Text checks confirmed the search trash button links to APP-FILE-14.

## 2026-07-08 update: PRD document mode and file generation state

scope:

- Converted APP-PRD-00 from a phone-frame screen into a document-mode webpage view matching the PRD Markdown structure.
- Added APP-FILE-15 文件详情生成中 with file-detail header, player, skeleton content, and “生成中...” progress hint.
- Connected file-list Generate buttons and the empty file-detail Generate button to APP-FILE-15.
- Added external state link from APP-FILE-15 to APP-FILE-01 for the non-user-visible “生成完成” transition.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node scripts/build-inline.js`
- Text checks confirmed document-mode, APP-FILE-15, generate links, renderer, flow item, README coverage, and docs are present in source and inline build.
- Text checks confirmed old default generate links to APP-AI-01 are no longer present for file-list and empty-detail generate buttons.

## 2026-07-08 update: full MD document preview for requirements page

scope:

- Added `scripts/build-prd-preview.js` to convert the full `AI录音卡App需求文档_v3.0.md` into `prd-preview.html`.
- Changed APP-PRD-00 to embed `prd-preview.html` full-screen in document mode.
- Updated README maintenance instructions and page-effect documentation to clarify that the requirements page is the full MD document preview, not a hand-written summary or screenshot.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node --check scripts/build-prd-preview.js`
- `node scripts/build-prd-preview.js`
- `node scripts/build-inline.js`
- Text checks confirmed `prd-preview.html`, iframe embedding, source MD content, README coverage, and docs are present.
- Tail inspection confirmed the generated preview includes later PRD content such as open questions, appendices, and business-rule indexes, not only the first-screen summary.

## 2026-07-08 update: PRD preview diagrams, generation confirmation, and file more actions

scope:

- Removed the simulated document/window frame from APP-PRD-00 document mode; the page now directly fills the review area with the converted MD HTML preview.
- Updated `scripts/build-prd-preview.js` so Mermaid blocks in the PRD render as graphical flow sections instead of visible code blocks.
- Restored the generation chain: file-list Generate and empty file-detail Generate open APP-AI-01 first; APP-AI-01 “立即生成” enters APP-FILE-15 文件详情生成中.
- Restyled APP-FILE-15 to match the provided generation-in-progress reference with faded skeleton content and centered “生成中...” copy.
- Added APP-FILE-16 移动到文件夹, APP-FILE-17 查找和替换, APP-FILE-18 重新转写提醒, APP-FILE-19 为说话人命名.
- Connected APP-FILE-07 menu actions to their corresponding states; 移至回收站 returns to APP-HOME-03 and shows “已移至回收站，30天内可以操作恢复”.

checks completed:

- `node --check app.js`
- `node --check scripts/build-inline.js`
- `node --check scripts/build-prd-preview.js`
- `node scripts/build-prd-preview.js`
- `node scripts/build-inline.js`
- Text checks confirmed APP-PRD-00 no longer uses the simulated document/window frame and `prd-preview.html` renders graphical diagram sections for 业务全景图、端到端业务流程图、核心业务流程、关键状态流转.
- Text checks confirmed file-list and empty-detail Generate links enter APP-AI-01, and APP-AI-01 “立即生成” enters APP-FILE-15.
- Text checks confirmed APP-FILE-16, APP-FILE-17, APP-FILE-18, APP-FILE-19, APP-HOME-03, their menu links, and the specified recycle-bin toast are present in source and inline build.

## 2026-07-21 update: APP-SYNC-01 system join prompt

- Source visual truth:
  - `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-f1f7a87b-26b2-4bd4-87d5-e952bafb2e25.png`
  - `/Users/andyma/Downloads/弹窗提醒01.png`
  - `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-91f70dc8-bc7c-41d4-9f66-ee97c877c9c6.png`
  - `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-9463ff29-4eb6-4605-91ad-caca5061c682.png`
- Implementation: `index.html?page=APP-SYNC-01`
- Implementation screenshot: unavailable; the in-app preview browser rejected the local `file://` page under its URL security policy.
- Intended viewport: 390 × 844 phone surface within the existing prototype board.
- States: 等待确认、系统加入确认、连接中、连接成功。

## Full-view comparison evidence

Blocked. Both source images were opened and inspected, but a browser-rendered implementation screenshot could not be captured from the local file URL. No visual-match claim is made.

## Focused region comparison evidence

Blocked for the same reason. The intended focused regions are the APP 引导弹窗、不可操作的系统提示示意、系统原生风格确认弹窗及三种连接状态卡。

## Static and interaction-contract checks

- APP 引导卡中的“取消 / 加入”使用非交互元素，只作为操作示意。
- “继续”进入独立系统确认层；系统确认层的“取消 / 加入”为真实按钮。
- 系统确认层直接覆盖当前 `APP-SYNC-01` 连接设备热点引导页，不再复用 `APP-DEV-07` 固件更新内容。
- 右侧状态链路包含且仅包含“等待确认 / 连接中 / 连接成功”。
- 系统加入后进入连接中、连接成功，并保留成功后自动返回 `APP-HOME-01` 的链路。
- `node --check app.js`、生成文件构建和 `git diff --check` 通过。

## Findings

- [Blocked] 缺少浏览器渲染截图，无法对字体、间距、颜色、阴影、圆角和折行进行最终视觉对照。

## Comparison history

- Initial implementation: completed source-level reconstruction and interaction states.
- Post-implementation visual comparison: blocked before first comparison; no P0/P1/P2 visual fixes can be evidenced.

## Final result

final result: blocked

## 2026-07-21 update: APP-PRD-00 full Markdown requirements preview refresh

- Source visual truth:
  - `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-dda55334-e0c9-4bf7-b219-979e78457d7d.png`
  - `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-6290b157-ec0a-4440-987e-35ef43289835.png`
  - `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-8f588096-9d16-4734-baa4-62b311ab876e.png`
  - `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-27200941-ae1c-4c4f-8327-3df5c7df802f.png`
- Content source: `../AI录音卡App需求文档_v3.0.md`
- Implementation: `index.html?page=APP-PRD-00`, embedded `prd-preview.html`.
- Refresh scope: complete Markdown content, native HTML tables, inline source colors, review tags, and four diagrams rendered from the original Mermaid definitions by a local official Mermaid runtime.

## Static content and rendering-contract checks

- Source and preview both contain 42 headings and 42 tables.
- All four Mermaid blocks are retained one-to-one and wired to the vendored official Mermaid runtime; successful browser rendering replaces the source definitions with SVG diagrams.
- All 99 source color spans are retained as blue highlighted requirement text.
- All 24 `【待确认】` markers are rendered as amber review tags.
- The generator no longer maintains a second hand-written diagram summary, so nodes, branches, labels, styles, and future Mermaid edits come directly from the source Markdown.
- `node --check scripts/build-prd-preview.js`, the preview build, source/preview count parity, vendor linkage, and `git diff --check` pass.

## Visual comparison evidence

Blocked. A localhost preview service started successfully, but the bundled Playwright runtime has no installed Chromium executable, so no browser-rendered implementation screenshot was produced. No pixel-match claim is made.

## Findings

- [Blocked] Final comparison of typography, spacing, diagram routing, table wrapping, and color against the four reference screenshots requires opening `APP-PRD-00` in a browser.

final result: blocked

## 2026-07-21 update: APP-DEV-07 system join prompt

- Source visual truth: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-930208ac-18a2-4d37-8757-4f8c86113c70.png`
- Implementation: `index.html?page=APP-DEV-07`
- Implementation screenshot: unavailable; local `file://` preview remains blocked by the in-app browser URL policy.
- Intended viewport: 390 × 844 phone surface within the existing prototype board.
- States: 等待连接热点、系统加入确认、取消加入、确认加入。
- Static interaction checks: the in-page cancel/join controls remain visual-only; Continue opens the interactive system confirmation over the current APP-DEV-07 screen; system Cancel returns to APP-DEV-07; system Join enters APP-DEV-08.
- Visual comparison: blocked because no browser-rendered implementation screenshot is available.
- Finding: final typography, spacing, color, shadow, radius, wrapping, and asset fidelity could not be compared against the reference screenshot.

final result: blocked

## 2026-07-21 update: APP-PRD-00 Mermaid spacing and label contrast correction

- Source visual truth:
  - `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-2be0259d-6900-4d13-9783-5fed65448855.png`
  - `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-d8fe69f1-328c-4d29-aa4f-455c94739a79.png`
  - `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-cae7eb32-fd32-4919-ac5f-dd9dd378561c.png`
- Implementation: `index.html?page=APP-PRD-00`, embedded `prd-preview.html`.
- State: Mermaid diagrams after local runtime rendering.

## Findings and fixes

- [P1 fixed in source] The visible `图表正在渲染…` fallback remained after successful rendering. The fallback element and all related CSS/error copy were removed completely.
- [P2 fixed in source] The fixed `min-height: 220px` created excessive empty space below the 1.2 horizontal business flow. The fixed height was removed; diagram margin/padding and the following caption margin were tightened.
- [P1 fixed in source] Colored overview/business nodes rendered dark labels despite source `color:#fff`. The generator now extracts every Mermaid style rule using white text and reapplies white text/fill to the matching rendered nodes after `mermaid.run()`.

## Static regression checks

- Generated HTML contains no `图表正在渲染` copy, `.diagram-fallback`, or fixed Mermaid minimum height.
- Diagram 1 records white-label nodes `ROOT,A,B,C,D,E,F`; diagram 2 records `A,B,C,D,E,F,G`.
- All four Mermaid definitions remain present and the updated preview builds successfully.
- `node --check scripts/build-prd-preview.js` and `git diff --check` pass.

## Visual comparison evidence

Blocked. The available browser automation does not expose the user's Safari surface, and browser choice must remain Safari based on the supplied screenshots. The source fixes are complete, but no post-fix Safari screenshot is available for a final same-browser comparison.

final result: blocked

## 2026-07-22 update: APP-ME-41 change password flow

- Source visual truth: `/Users/andyma/Downloads/IMG_2564.PNG`.
- Implementation: `index.html?page=APP-ME-41`.
- Intended viewport: existing 390 x 844 phone surface within the prototype board.
- Required state: logged-in password change with current password, new password, confirmation, independent visibility controls, and a disabled bottom confirmation button until all fields are populated.

## Interaction and static checks

- APP-ME-18 now routes `更改密码` to APP-ME-41 instead of the unauthenticated email reset flow.
- Wrong current password and mismatched confirmation produce distinct inline errors.
- The fixed prototype current password is `Recorder2026`; it is documented in the APP-ME-41 interaction rules and used only for current-password validation.
- A valid submission does not update the prototype account password. It returns to APP-ME-18 and shows `更改密码验证已完成（原型未保存）。`.
- The page includes three password inputs, independent visibility controls, bottom-safe confirmation placement, and a four-row page grid for status bar, navigation, content, and footer.
- `node --check app.js`, `node scripts/build-inline.js`, the focused interaction harness, and `git diff --check` pass.

## Visual comparison evidence

Blocked. The local preview service is available from the workspace, but the in-app browser cannot reach or open the local prototype under its current URL security policy. No pixel-match claim is made; final typography, spacing, and icon fidelity still require a browser-rendered comparison against `IMG_2564.PNG`.

final result: blocked

## 2026-07-23 update: APP-HOME-01 single-line sync status

- Source visual truth: `/Users/andyma/.codex/generated_images/019f8a51-1219-71e1-9122-236c64af9430/exec-dc41c9b0-d1d6-4fa0-be99-c578bcd109c1.png`.
- Browser-rendered implementation screenshot: `implementation-home-sync.png`.
- Side-by-side comparison evidence: `design-qa-home-sync-comparison.png` (source left, implementation right).
- Viewport/state: 390 × 844 phone surface, APP-HOME-01, finishing sync, LAN selected after interaction test.
- Density normalization: source 853 × 1844 was normalized to 390 × 844; implementation was captured at 390 × 844 CSS px with device scale factor 1.

## Full-view comparison

- The implementation preserves the existing APP-HOME-01 device summary, file-list header, file rows, global recording button, and bottom navigation.
- The sync region is a true 40px single-line row with no wrap: status, method, percentage, remaining time, queue entry, and switch entry all remain visible.
- The 2px progress line remains inside the row and the file list begins immediately below it.

## Focused interaction evidence

- Sync row measured 350 × 40 CSS px; its main tap target had equal client and scroll width (308px) and no vertical overflow.
- Clicking the main row opened the queue panel and showed the active task, transfer method, 29.4 / 32 MB, 92%, and expected remaining time.
- Clicking `切换` opened the method selector. Selecting `局域网` changed the inline badge to `局域网`, closed the selector, and the queue panel reflected the same method.
- The first browser pass exposed a sheet/scrim z-index collision; `.bottom-sheet.home-sync-sheet` was raised above the scrim and the full interaction was retested successfully.
- Browser console was checked. Two identical URL-less `MutationObserver.observe` errors originated from the in-app browser layer; the app contains no `MutationObserver` usage, and no app interaction or rendering error was observed.

## Required fidelity surfaces

- Fonts and typography: existing app font stack, weight hierarchy, and compact numeric labels are preserved; all single-line labels remain legible without truncating the queue or switch actions.
- Spacing and layout rhythm: the former card was reduced to a 40px divider row; no radius, shadow, extra notice row, or large vertical gap remains.
- Colors and visual tokens: existing monochrome UI, semantic transport badge colors, blue action color, and black progress token are retained.
- Image quality and asset fidelity: no source product imagery or icon asset was replaced; the existing device and navigation assets remain unchanged.
- Copy and content: `同步中`, transfer method, `92%`, `预计 20 秒`, `队列 ›`, and `切换` appear in the agreed order.

## Findings

- No actionable P0, P1, or P2 mismatch remains for the requested sync-region change.
- The implementation retains the existing `文件列表` toolbar that was already part of APP-HOME-01; this is an intentional product constraint outside the sync-region edit.

## Comparison history

- Earlier finding: [P1] the transfer-method sheet was visually present but its controls were below the scrim and could not receive clicks.
- Fix made: increased the specific sheet stacking rule above the scrim.
- Post-fix evidence: `局域网` selection completed, the sheet closed, the inline badge updated, and the queue detail matched the new method.

## Follow-up polish

- None required for this scoped change.

final result: passed

## 2026-07-23 update: APP-HOME-01 multi-task sync queue

- Source visual truth: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-74c232e7-8dd1-4ea0-8f2a-5526eca2867b.png`.
- Browser-rendered implementation screenshot: `implementation-home-sync-queue.png`.
- Side-by-side comparison evidence: `design-qa-home-sync-queue-comparison.png` (source left, implementation right).
- Viewport/state: 390 × 844 phone surface, APP-HOME-01, 12-task batch with 3 completed tasks and the queue panel open.

## Full-view comparison

- The compact external sync row remains a 40px single-line structure and now shows the overall batch progress, `3/12`, estimated remaining time, queue entry, and transfer-method switch without wrapping.
- The bottom sheet reuses the existing visual language while expanding from a single task to a vertically scrollable current-batch queue.
- Each task clearly separates its per-file percentage from the external batch percentage; pending tasks expose a compact `优先同步` action without increasing the external row height.

## Focused interaction evidence

- Default 12-task batch renders `同步中 / 蓝牙 / 35% / 3/12 / 预计 8 分钟 / 队列 ›`; the 35% value is calculated from cumulative transferred bytes across the batch.
- Opening the queue shows 12 tasks grouped in current, pending, and completed order. The current task remains first and cannot be interrupted.
- Selecting `Quarterly summary` for priority moved it to the first pending position, retained the current task, and changed its action state to `已优先`.
- Completing the current task changed the external count to `4/12`, updated the overall percentage to 36%, marked the completed task, and automatically promoted the prioritized task to active.
- Starting a new single-task batch cleared the prior batch, omitted `1/1`, removed the queue entry, and rendered no historical queue tasks.
- Resetting the demo restored the multi-task `3/12` batch for review.
- Browser console was checked. Two identical URL-less `MutationObserver.observe` errors originated from the in-app browser layer; the app contains no `MutationObserver` usage, and no app interaction or rendering error was observed.

## Requirements coverage

- APP-HOME-01 now documents batch identity, task count, overall byte progress, task ordering, single-task visibility, priority behavior, completion advancement, and new-batch history clearing.
- `优先同步` is available only when the batch contains more than three tasks and only for pending tasks.
- Priority changes reorder the pending list immediately after the active task; they do not restart or interrupt the active transfer.
- Completed tasks remain visible only inside the current batch. A new batch replaces the queue instead of mixing historical files into the new task list.

## Findings

- No actionable P0, P1, or P2 mismatch remains for the requested multi-task queue behavior.
- The source showed a one-task queue; the multi-task rows, overall progress semantics, `3/12`, and priority actions are intentional requirement-driven additions.

final result: passed

## 2026-07-27 update: APP-HOME-01 low-interruption file sync states

- Source visual truth: `/Users/andyma/.codex/generated_images/019f9ed8-7ba8-7e32-ae1f-69884ce2864a/exec-59b3580b-90d0-413e-b0f2-cdf9b30b72b6.png`.
- Browser-rendered implementation screenshot: `implementation-home-sync-low-interruption.png`.
- Side-by-side comparison evidence: `design-qa-home-sync-low-interruption-comparison.png` (source left, implementation right).
- Viewport/state: 390 × 844 phone surface, APP-HOME-01, finishing sync, Bluetooth selected, 3/12 completed.
- Density normalization: source 852 × 1832 was normalized to 390 × 844; implementation was captured at 390 × 844 CSS px with device scale factor 1.

## Full-view comparison

- The compact batch sync strip remains directly under the device summary and retains overall progress, queue access, and a black `快传` action.
- The list toolbar now reads `全部文件`; the active and next waiting hardware recordings appear at the top of the list in a reduced-emphasis disabled style.
- Active and waiting rows contain no file-level progress bar, action button, or disclosure chevron. Completed files continue to use the normal file-row presentation.
- The failure row uses the final user-authorized copy `同步失败，请重试…` with a single `重试` action. The earlier design-image phrase `录音已安全保留` is intentionally omitted to avoid implying a storage guarantee.

## Focused interaction evidence

- Clicking `快传` opened the transfer-method sheet with Bluetooth, LAN, and recorder-hotspot choices.
- Clicking the compact batch strip opened the 12-task queue and preserved the 35% overall byte progress, 3/12 count, and active/pending task ordering.
- Clicking the failed row's `重试` action changed the row to `正在重试…`, removed the button, applied `aria-disabled="true"`, and reused the grey non-interactive transfer state.
- DOM inspection confirmed both transfer rows have zero buttons, zero disclosure chevrons, and zero per-file progress elements.
- The APP-HOME-01 requirement panel now documents `file_transfer_state`, `全部文件`, the disabled transfer-row behavior, conditional batch-strip visibility, and the exact failure/retry copy.

## Required fidelity surfaces

- Typography and hierarchy: title, device summary, compact sync strip, list title, file metadata, and semantic recovery copy retain the existing prototype scale and weight system.
- Spacing and layout: the batch strip remains compact; no additional sync card or per-file progress bar increases vertical interruption.
- Colors and semantics: active/waiting/retrying states use grey disabled styling, failure uses red recovery styling, and completed files retain normal contrast.
- Interaction semantics: unfinished files are not clickable; only the failed state exposes a recovery action.

## Findings

- No actionable P0, P1, or P2 mismatch remains for the approved low-interruption sync-state design.
- The only visual deviation from the generated source is the explicitly requested failure-copy correction from `同步失败 · 录音已安全保留` to `同步失败，请重试…`.

final result: passed

## 2026-07-27 update: APP-HOME-01 no-sync state and low-interruption threshold

- Source visual truth: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-13396240-f15b-4414-b171-36c1539fcc7b.png`.
- Browser-rendered implementation screenshot: `implementation-home-no-sync-tasks.png`.
- Full-board comparison evidence: `design-qa-home-no-sync-tasks-comparison.png`.
- Focused phone comparison evidence: `design-qa-home-no-sync-tasks-phone-comparison.png`.
- Viewport/state: 2048 × 1056 CSS px, APP-HOME-01, `当前无同步任务` selected.
- Density normalization: the 3840 × 2100 source screenshot was cropped below its 180px browser chrome and normalized to 2048 × 1056; the focused source phone crop and 390 × 844 implementation phone were both normalized to 390 × 844.

## Full-view and focused comparison

- The no-sync implementation matches the reference hierarchy: connected-device summary, immediate `全部文件` toolbar, normal highlighted `周一项目复盘` row, failed-file recovery row, remaining normal files, and persistent bottom navigation.
- The phone comparison confirms the intended absence of the compact sync strip, overall progress line, queue entry, `快传` button, and grey active/waiting transfer rows.
- Existing typography, white surfaces, green completed-file highlight, semantic chips, recovery red, black primary buttons, row spacing, and rounded phone frame remain consistent with the reference.
- No additional raster asset or replacement icon was required for this state.

## Focused interaction evidence

- Clicking `当前无同步任务` produces zero `[aria-label="当前同步状态"]` regions, zero `快传` buttons, and zero `.file-card-transfer-disabled` rows; the first file is the normal `周一项目复盘` item.
- The selected state-chain button receives the active style and clears any open sync panel.
- A one-task batch with an estimated one minute remaining produces zero top sync regions and zero `快传` buttons, while retaining its single disabled file row because that file is still transferring.
- Restoring the multi-task batch produces one top sync region, one `快传` button, two disabled transfer rows, and the expected `同步中 / 蓝牙 / 35% / 3/12 / 预计 8 分钟 / 队列` content.
- The three requirement callouts render in red (`rgb(200, 67, 53)`) at font weight 800. They explicitly state the dual-condition visibility threshold, the no-task presentation, and that device reconnection triggers automatic retry while the failure state and manual retry button appear only after the automatic retry limit is reached.

## Findings

- No actionable P0, P1, or P2 mismatch remains for the no-sync state or the low-interruption visibility threshold.
- The red requirement callouts are an intentional specification addition requested after the supplied screenshot and therefore do not appear in the source image.

final result: passed

## 2026-07-27 update: APP-HOME-01 first-version fast-transfer scope

- Source visual truth: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-07fdfa01-daa7-40dc-8780-2a143b457c09.png`.
- Browser-rendered implementation screenshot: `implementation-home-sync-v1-fast-transfer.jpg`.
- Focused before/after evidence: `design-qa-home-sync-v1-fast-transfer-comparison.png`.
- Source pixels: 3840 × 2100. Implementation full-page pixels: 1280 × 1960. Focused phone regions were normalized to 500 × 1000 for comparison.
- State: APP-HOME-01, finishing sync, Bluetooth selected, 3/12 completed, three visible waiting-file examples.

## Full-view and focused comparison

- The source and implementation retain the same phone frame, device summary, compact batch strip, `全部文件` toolbar, grey transfer rows, semantic status colors, and persistent bottom navigation.
- The implementation intentionally limits the visible waiting-transfer examples to three rows while preserving the previously approved `等待传输 + 优先同步` treatment.
- The compact strip still uses the existing typography, spacing, monochrome palette, two-pixel progress line, and black `快传` action. No imagery or new visual asset was introduced.
- The visible list density is reduced without changing row height, type scale, chip styling, or file-status hierarchy.

## Interaction evidence

- APP-HOME-01 rendered exactly three `.file-card-transfer-disabled.pending` rows and three `.file-transfer-priority` actions while the backend demo batch retained more than three pending tasks.
- Clicking `快传` changed the rendered page directly to `APP-SYNC-01 连接录音卡进行高速传输`; zero transfer-method sheets were present before or after the click.
- APP-SYNC-02 is absent from the page registry, left navigation, state chain, renderer map, and flow strip. Opening the legacy `?page=APP-SYNC-02` URL safely resolves to APP-SYNC-01.
- APP-SYNC-01 and APP-HOME-01 right-side requirements now state that the first version supports the recorder-hotspot route only and does not include the current-Wi-Fi provisioning flow.

## Required fidelity surfaces

- Fonts and typography: existing family, weights, sizes, line heights, truncation behavior, and hierarchy are unchanged.
- Spacing and layout rhythm: the compact status strip and file-row spacing remain aligned with the source; only the number of waiting examples changed.
- Colors and visual tokens: grey disabled rows, blue priority action, black `快传`, red recovery copy, and white surfaces remain consistent.
- Image quality and asset fidelity: no source image, logo, illustration, or custom icon was added or replaced.
- Copy and content: waiting rows still read exactly `等待传输`; first-version routing copy now names APP-SYNC-01 and explicitly defers APP-SYNC-02.

## Findings

- No actionable P0, P1, or P2 mismatch remains for the requested three-row density limit or direct fast-transfer route.
- The three-row limit is documented as prototype density control; priority availability continues to use the complete backend pending-task count.

final result: passed

## 2026-07-27 update: APP-HOME-01 no-recorder state

- Source visual truth: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-29575455-6dc6-48b9-96c6-b2a971b08d58.png`.
- Browser-rendered implementation screenshot: `implementation-home-no-device-state.png`.
- Focused state comparison evidence: `design-qa-home-no-device-state-comparison.png`.
- State: APP-HOME-01, `未添加录音卡` selected.

## Visual comparison

- The existing device-summary footprint is preserved so the page hierarchy does not jump between device states.
- In the no-recorder state, the device icon, name, connection details, battery/storage data, and dropdown are replaced by one bordered `添加设备` action using the existing monochrome button language.
- The compact sync strip, progress line, `快传` action, and grey active/waiting transfer rows are absent; normal files remain directly browsable below `全部文件`.
- No new image asset, custom icon, decorative card, or additional explanatory copy was introduced into the phone UI.

## Interaction evidence

- Selecting `未添加录音卡` produces one `.home-device-empty-action`, zero `.home-device-current` summaries, zero `[aria-label="当前同步状态"]` regions, and zero `.file-card-transfer-disabled` rows.
- The selected state-chain control receives the active style.
- Clicking `添加设备` enters APP-DEV-01 `正在搜索设备`.
- Selecting the adjacent `当前无同步任务` state restores the connected-device summary while keeping the sync strip and transfer rows hidden, confirming the two states remain independent.
- The right-side field list, red strong rule, page-state list, interaction rules, and acceptance criteria all document the no-recorder behavior.

## Findings

- No actionable P0, P1, or P2 mismatch remains for the requested no-recorder state.
- The reference screenshot shows the device-added state; the comparison intentionally demonstrates the requested replacement within the same device-summary position.

final result: passed

## 2026-07-27 update: APP-HOME-01 no-recorder entry polish

- Source visual truth: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-4bf7326f-ec15-46f8-943c-2b546977a18f.png`.
- Captured pre-fix implementation: `implementation-home-no-device-before-polish.png`.
- Browser-rendered post-fix implementation: `implementation-home-no-device-polished.png`.
- Full phone before/after evidence: `design-qa-home-no-device-polish-comparison.png`.
- Focused entry evidence: `design-qa-home-no-device-polish-detail.png`.
- Added/no-recorder consistency evidence: `design-qa-home-device-state-consistency.png`.
- Source pixels: 3840 × 2100. Implementation pixels: 1280 × 1960. Phone views were normalized to 500 × 1000; focused entry regions were normalized to 600 × 190.
- State: APP-HOME-01, `未添加录音卡` selected.

## Initial audit findings and fixes

- [P1] The full-width outlined control read as a separate form button instead of the device summary's empty state. Fixed by removing the visible outer border and reusing the same 58px device-entry structure.
- [P2] Centered single-line copy broke the added/no-recorder hierarchy and made the empty state visually heavier than real device data. Fixed with the same left visual area and right two-line information area used by the connected state.
- [P2] The previous control communicated only an action, not what the action would do. Fixed with the restrained secondary line `搜索并绑定新的 AI Recorder`, which describes the destination without inventing device data.

## Post-fix visual comparison

- The connected and no-recorder entry states both measure 284 × 58 CSS px and use the same two-column alignment, typography scale, spacing rhythm, and borderless surface.
- The no-recorder state uses a neutral grey treatment instead of the connected state's green indicator and black device details, so it remains identifiable without implying connection or stored hardware data.
- The `添加设备` label now occupies the same hierarchy position as the real device name; its secondary guidance occupies the same position as connection/battery/storage metadata.
- The full phone comparison confirms that removing the large outline reduces empty-state interruption and lets `全部文件` remain the dominant content region.

## Required fidelity surfaces

- Fonts and typography: 13px/800 primary and 10px secondary text match the existing device summary hierarchy; no wrapping or truncation issue is visible.
- Spacing and layout rhythm: the entry retains the existing 58px height, 58px + flexible grid, 8px gap, and 18px section margin.
- Colors and visual tokens: black primary copy, muted grey secondary copy, and neutral device treatment reuse existing monochrome tokens; no new decorative color was introduced.
- Image quality and asset fidelity: the implementation reuses the existing recorder visual component; no new raster asset, substitute logo, emoji, or custom decorative icon was introduced.
- Copy and content: no device name, connection status, battery value, storage value, or dropdown is rendered; the only content is the add action and its generic purpose.

## Interaction and accessibility evidence

- The whole 284 × 58 entry is clickable and has the accessible label `添加设备，搜索并绑定新的 AI Recorder`.
- Clicking the entry opens APP-DEV-01 `正在搜索设备`.
- The no-recorder state contains zero `.home-device-current` summaries and zero device-menu controls, sync-status regions, or disabled transfer rows.
- A visible focus outline is provided for keyboard focus; hover and pressed states use the existing subtle neutral background.

## Final findings

- No actionable P0, P1, or P2 issue remains for the no-recorder entry styling or its consistency with the connected-device state.

final result: passed

## 2026-07-27 update: APP-HOME-01 hotspot sync hides fast-transfer action

- Source visual truth: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-e13af855-bfd7-4301-a8f3-eb025cb18bd5.png`.
- Browser-rendered implementation screenshot: `implementation-home-hotspot-no-fast-transfer.png`.
- State: APP-HOME-01, multi-task sync, `录音卡热点` selected.

## Visual and interaction evidence

- The hotspot sync strip retains `同步中`, the `录音卡热点` transport badge, overall percentage, completed/total count, estimated time, and the two-pixel progress line.
- The right-side `快传` button is absent while hotspot transfer is active, so the current high-speed state does not offer a redundant high-speed entry.
- Browser verification found zero `快传` buttons, one current sync region, and one `.sync-mini.hotspot-active` region in hotspot mode.
- Switching back to `蓝牙同步` restores exactly one `快传` button and removes the hotspot-active layout class.
- The right-side red strong rule, interaction rules, and acceptance criteria now distinguish Bluetooth from recorder-hotspot behavior.

## Findings

- No actionable P0, P1, or P2 issue remains for the hotspot fast-transfer state.

final result: passed

## 2026-07-29 final handoff: connection guide pages

- Source visual truth: `design-reference-connection-guide-option-1.png` (390 × 844).
- Implementations: `implementation-app-sync-01-connection-guide.jpg` and `implementation-app-dev-07-connection-guide.jpg` (each 390 × 844 CSS px and image pixels, deviceScaleFactor 1).
- Full-view comparison evidence: `design-qa-app-sync-01-comparison.png` and `design-qa-app-dev-07-comparison.png` (804 × 844).
- Focused comparison: not required because the complete native-size comparisons keep every step label, app-specific sentence, trust note, and action label readable.
- States reviewed: APP-SYNC-01 guide, system confirmation, connecting, success, and return; APP-DEV-07 guide plus APP-DEV-08 download, connection confirmation, cancel, and reconnect.
- Comparison history: the initial P2 backdrop-separation issue in `design-qa-app-sync-01-before-scrim-comparison.png` was fixed with the non-interactive 12% guide scrim; the post-fix comparison has no remaining P0, P1, or P2 issue.
- Required surfaces passed: typography and wrapping, spacing and viewport fit, colors and modal separation, dedicated raster illustration quality, and page-specific copy/content.
- Interaction boundary passed: APP-SYNC-01 contains录音文件 copy and opens system confirmation directly; APP-DEV-07 contains固件包 copy, enters download first, and opens system confirmation only at its existing connection step.
- Browser console: zero errors or warnings.
- Remaining P3 only: decorative handle and shield mark from the generated mock are omitted; this does not affect comprehension, trust, or interaction.

final result: passed
