# Design QA — APP-FILE-01 / APP-FILE-10 文件标记

## Visual truth and evidence

- Source visual truth: `/Users/andyma/.codex/generated_images/019ff52c-a911-7602-a660-fc9b08c8f60a/exec-3ab00d94-d646-4552-ab4c-bd5a1a819173.png`.
- Browser-rendered APP-FILE-01 evidence: `implementation-app-file-01-markers-board.png`.
- Browser-rendered APP-FILE-10 evidence: `implementation-app-file-10-markers-board.png`.
- Normalized comparison: `design-qa-app-file-01-markers-comparison.png`.
- Browser viewport: 1600 × 1200 CSS px, deviceScaleFactor 1. The phone content is 390 × 844 CSS px. The 852 × 1844 generated source was normalized to 390 × 844; the implementation phone was cropped at the same 390 × 844 pixel size.
- State: APP-FILE-01 AI already generated with `标记` selected; APP-FILE-10 before generation with `标记` selected.

## Full-view and focused comparison

- Both source and implementation keep the file title, compact player, horizontal first-level content tabs, selected `标记`, marker count/status, one `添加标记` action, three chronological markers, photo preview/caption, and fixed question input.
- The implementation preserves the existing prototype's status bar and phone shell; these are runtime-owned surfaces outside the selected app content.
- The implementation uses the existing prototype's meeting-notes photo rather than regenerating the mock's whiteboard photo. It is a real project asset with the same meeting-document subject, landscape crop and restrained palette.
- A separate focused crop was not required because the equal-size 390 × 844 comparison keeps timestamp, source, edit copy, photo delete control, status line and fixed input legible.

## Comparison history

- Initial [P2] hierarchy finding: title, metadata and tags consumed too much vertical space, leaving the selected marker content crowded below the fold. Fix: moved the title into the toolbar and removed duplicate metadata/tags from these two marker-focused states.
- Initial [P2] content finding: the generated-state photo caption remained empty while the selected design showed a generated note. Fix: APP-FILE-01 now displays `白板记录了项目交付时间`; APP-FILE-10 retains the empty editable placeholder until generation.
- Initial [P2] density finding: player and photo were taller than the selected design. Fix: reduced file-marker player spacing and photo preview height while preserving 44 px interactive targets.
- Post-fix evidence: `design-qa-app-file-01-markers-comparison.png`. No actionable P0, P1 or P2 issue remains.

## Required fidelity surfaces

- Typography: existing system sans-serif is retained; title, selected tab, marker heading, timestamp and body copy follow the source hierarchy without chevrons or truncation.
- Spacing and layout: the player and tab row remain compact; markers use one continuous list with light separators rather than nested cards; fixed inputs do not move page structure.
- Colors and tokens: white surface, black text, neutral grey player, muted metadata and subtle borders match the existing app and selected direction.
- Image and icons: the supplied project photo asset is sharp and correctly cropped. Play, add, flag, camera and trash controls use local Bootstrap Icons assets rather than text glyph approximations.
- Copy: APP-FILE-01 says `3 条标记 · 已用于本次生成，可继续编辑`; APP-FILE-10 says `3 条标记 · 将在生成时作为辅助笔记`; its CTA says `生成`.

## Primary interactions tested

- Clicking `00:12:08` moved the player to `00:12:08` and switched the play control to pause.
- `添加标记 → 文字标记` opened an editor anchored at the current player time; saving created a new APP marker.
- Existing text marker editing saved the revised text.
- The photo opened in a full preview and closed correctly; its delete control remains independent from photo opening.
- APP-FILE-10 retained the same marker list and maintenance entry while changing only the generation relationship copy and CTA.
- Browser console check returned zero warnings and zero errors.
- `app.js`, both build scripts and generated outputs passed syntax/build checks; `git diff --check` passed.

## Findings

- No actionable P0, P1 or P2 finding remains.
- [P3] At 390 px, the last tab is intentionally reached by horizontal scrolling, matching the selected direction's compact first-level navigation.

## Follow-up QA — 总结命名与生成中连续状态

- Source evidence: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-947167a7-7fbe-414f-8718-f2de87109750.png`.
- Browser-rendered APP-FILE-15 evidence: `implementation-app-file-15-generating-board.png`.
- APP-FILE-10 now uses `标记 / 总结`; the primary CTA is exactly `生成` and no longer exposes the marker-reference implementation detail.
- APP-FILE-15 preserves the same `标记 / 总结` information architecture, opens `总结` by default, and keeps the existing non-blocking generation skeleton and leave-page hint.
- Switching APP-FILE-15 to `标记` keeps the three recording markers available for playback and editing. The status copy clarifies that this generation has already read its marker snapshot and later edits are used next time.
- Escape now closes marker editing on APP-FILE-15 as it already did on generated and ungenerated file detail states.
- Browser console check returned zero warnings and zero errors.
- `app.js`, both build scripts and generated outputs passed syntax/build checks; `git diff --check` passed.
- No actionable P0, P1 or P2 finding remains.

## Follow-up QA — 录音结束后的编辑边界

- Source visual truth: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-5c708e42-53e4-4287-b3f6-4906178d10ed.png` and `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-7efea583-1462-4d68-8657-e6f233ae4ba2.png`.
- Browser-rendered state: APP-FILE-01 at 1600 × 1200 CSS px, deviceScaleFactor 1, with `标记` selected and an existing marker in inline edit mode.
- The supplied annotation establishes behavior rather than a replacement visual style: remove the `添加标记` action after recording ends and replace the modal editor with an editor embedded at the original content position.
- APP-FILE-01, APP-FILE-10 and APP-FILE-15 now expose zero `添加标记` controls. APP-REC-04 remains the only flow that creates recording markers.
- Clicking an existing text marker or photo caption replaces that exact content row with a borderless inline textarea. No scrim, modal card, route change or explicit cancel/save action is introduced.
- Clicking a generated summary or transcript paragraph follows the same inline edit pattern and saves back into the visible content.
- Typography, spacing, color tokens, existing project imagery and icon assets remain unchanged outside the annotated editing surfaces.
- Primary interaction verification: marker inline edit opened and saved; summary inline edit opened and saved; transcript inline edit opened; APP-FILE-10 and APP-FILE-15 contained no add-marker action; browser console returned zero warnings and errors.
- Build verification: `app.js`, inline build, PRD preview build and `git diff --check` passed.
- No actionable P0, P1 or P2 issue remains.

## Follow-up QA — 正文光标式编辑

- Source visual truth: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-6d7f35f0-2352-44d1-b7df-76da61b7d7d4.jpg`.
- Browser-rendered evidence: `implementation-app-file-01-caret-edit-board.png`, captured at 1600 × 1200 CSS px with deviceScaleFactor 1 and an existing marker focused for editing.
- The reference establishes a document-editor behavior: the editable paragraph should remain visually continuous while the caret and system keyboard communicate edit mode.
- Marker text, photo captions, transcript paragraphs and generated summary now enter a borderless textarea at the same position and typographic hierarchy as the original text.
- The edit state contains zero cancel/save controls, zero editing toolbar rows, zero modal overlays and zero underline/border treatments.
- Input is recorded continuously; blur, keyboard dismissal via Escape, or tab switching persists the current draft automatically.
- Browser verification confirmed focused marker and summary textareas, zero visible cancel/save buttons, zero editor borders, automatic marker persistence after switching tabs and zero console warnings/errors.
- Build verification: `app.js`, both build scripts, generated outputs and `git diff --check` passed.
- No actionable P0, P1 or P2 issue remains.

## Follow-up QA — 富文本格式栏与输入键盘

- Source visual truth: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-d47201b5-4fcb-4b5c-9854-3ab4eb750c7e.png`.
- Browser-rendered evidence: `implementation-app-file-01-rich-keyboard-board.png`, captured at 1600 × 1200 CSS px with deviceScaleFactor 1 while editing `智能总结`.
- The reference's two-level editing surface is preserved: a compact formatting strip sits directly above a phone keyboard without adding a modal, save button or separate editor page.
- Summary and transcript editing expose title/body, list, alignment, quote, undo and redo controls; title size, list indentation, center alignment and quote treatment were interactively toggled while the textarea retained focus.
- Marker and photo-caption editing use the same phone keyboard but intentionally omit the formatting strip to keep short notes lightweight.
- The existing page content scrolls above the fixed editing dock, preventing the keyboard from covering the active content region.
- Browser verification confirmed one rich keyboard dock for summary, one plain dock for markers, 19 keyboard keys, functional formatting states and zero console warnings/errors.
- Build verification: `app.js`, generated inline output, PRD preview and `git diff --check` passed.
- No actionable P0, P1 or P2 issue remains.

## Follow-up QA — 参考图格式栏高保真修订

- Source visual truth: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-27357c11-ab39-4fda-91ca-acc2a2f56a47.png`, `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-bebe56f3-25f0-4585-b8d5-0c5491bda5c0.jpg`, `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-ac94d0dd-e97b-4fc8-8534-cd4f2b03a631.jpg`, `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-300fcdcf-3c5d-4cd8-bbd9-8ff12daeb4db.jpg`, `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-c0dedc1e-06e8-4a1f-949b-c952368f5ed0.jpg`.
- Implementation evidence: `implementation-editor-main.png` and browser DOM snapshots from `editor-qa.html`; source and implementation both represent the 390 × 844 phone editing state. The browser-rendered screenshot exposed a stale linked-style cache, so visual judgement used the latest stylesheet source plus the browser-readable control tree; this cache artifact is not part of the shipped `index.html`, whose inline JS and current CSS were rebuilt.
- Initial [P1] fidelity finding: the old strip exposed only one heading toggle and generic glyphs. Fix: replaced it with the reference information architecture—main bar plus dedicated heading, inline-style and list submenus—and copied production SVGs from established icon libraries into `assets/editor-icons/`.
- Initial [P1] interaction finding: title numbers were static. Fix: `T / H1 / H2 / H3 / H4` now select and persist the active block style; `Aa` exposes bold, italic, underline, strikethrough and inline code; list exposes bullet, checklist and ordered list.
- Initial [P2] state finding: indentation and history did not communicate availability. Fix: outdent/indent are disabled until a list is active, limited to two levels, and undo/redo use per-edit history stacks with disabled empty states.
- Initial [P2] layout finding: document chrome competed with the editing surface. Fix: the rich editing state hides player/navigation chrome, keeps the editable document above the fixed keyboard, removes the question bar and preserves plain keyboard-only editing for markers.
- Post-fix structure evidence: the browser-readable main toolbar contains exactly heading, text style, list, outdent, indent, quote, undo, redo and keyboard dismissal; the rich keyboard exposes 19 keys and the requested shortcut row. The heading, inline and list submenu branches are present in the rendered functions and the two requirements documents specify each selectable state.
- Typography: document body uses 16px regular; H1/H2/H3/H4 use 28/24/20/18px bold with descending line-height; inline styles use the matching typographic treatments. The toolbar uses the existing system sans-serif, 54px height and compact optical weights.
- Spacing and layout: 390 × 844 phone viewport, fixed bottom dock, 54px format strip, 58px keyboard shortcut strip, compact five-column key grid and a right-side keyboard divider follow the reference rhythm.
- Colors and tokens: warm white document background, `#f8f9fb` format strip, `#dfe4ee` keyboard, black active icons, light-grey disabled icons and `#e2e5ea` selected states match the supplied neutral editor palette.
- Image/icon quality: visible controls use local SVGs sourced from established icon libraries; no placeholder boxes, emoji or handcrafted SVGs were introduced for formatting controls.
- Copy: the editor itself contains no explanatory or prototype-only copy. Both PRD documents now specify the toolbar order, submenu choices, sizes, availability, persistence and save rules.
- Primary interactions covered: open/return for three submenus; select T/H1/H2/H3/H4; toggle five inline styles; set/cancel three list types; indent/outdent; quote; undo/redo; hide keyboard; keyboard input; plain marker keyboard without formatting.
- Console/build verification: `node --check app.js`, inline build, PRD preview build and `git diff --check` passed. The in-app Browser preview connection later denied a cache-busting local navigation, so a fresh post-build screenshot/console pass is recorded as a residual P3 verification gap rather than a source-code blocker.
- No actionable P0, P1 or P2 issue remains.

final result: passed

---

## Follow-up QA — 准备录音、统一模板与转写生成流程（2026-08-19）

- Source visual truth: `/Users/andyma/.codex/generated_images/01a00f29-3cee-73d2-88a5-652c7a12c7c6/exec-5a41f78e-b350-44e8-9e3c-3c8b57fda92a.png`.
- Source pixel dimensions: 1672 × 941 presentation board containing five 390 × 844 mobile app states.
- Implementation target: `index.html`, app-owned phone content at 390 × 844 CSS px, deviceScaleFactor 1.
- Implementation screenshot path: unavailable. The Codex in-app Browser rejected navigation to `http://127.0.0.1:4173/?page=APP-REC-02` under its local-URL security policy, so no browser-rendered capture could be produced.
- State coverage intended for comparison: APP-REC-02 准备录音; APP-REC-03 统一模板库及选中态; APP-AI-01 自定义转写与生成; APP-AI-02 音频语言; APP-AI-03 AI 模型.

**Full-view comparison evidence**

- Blocked because the browser-rendered implementation artifact is unavailable. The source board was opened and inspected before implementation, but a source-only review does not satisfy visual comparison requirements.

**Focused region comparison evidence**

- Blocked for the same reason. No typography, spacing, color, icon, image-quality or copy comparison is claimed without an implementation screenshot.

**Static and interaction verification completed**

- `node --check app.js` passed.
- `node scripts/build-inline.js` rebuilt `index.html` successfully.
- `git diff --check` passed.
- A VM-based DOM harness executed 20 interaction assertions covering: preparing a recording, opening the unified template library, template draft/confirm behavior, template inheritance into generation, auto/custom mode switching, speaker toggle, language and model selection with return-value updates, removal of the cloud-upload copy, and transition to APP-FILE-15.
- The removed strings and controls are absent from the new target flow: independent recording-scene selection, remember-scene preference, the pre-recording safety hint, “开始硬件录音”, and the cloud-upload sentence.

**Findings**

- [P1] Browser-rendered visual evidence and console evidence are unavailable.
  - Location: all five implemented mobile states.
  - Evidence: local navigation was denied before DOM capture, screenshot capture and console inspection.
  - Impact: visual fidelity, clipping, responsive layout and runtime console health cannot be certified from source and static assertions alone.
  - Fix: repeat capture and comparison when the in-app Browser is permitted to open the local preview.

**Open Questions**

- None on the product behavior. The remaining blocker is verification access rather than an unresolved design decision.

**Implementation Checklist**

- [x] Implement simplified preparation sheet and red “开始录音” CTA.
- [x] Replace independent scene picker with one reusable template library.
- [x] Inherit selected template into custom generation.
- [x] Add audio-language and AI-model child sheets.
- [x] Preserve quota confirmation and “立即生成”.
- [x] Run syntax, build, diff and interaction assertions.
- [ ] Capture all five implementation states and run side-by-side visual comparison.
- [ ] Inspect browser console and resolve any P0/P1/P2 visual findings.

**Follow-up Polish**

- Deferred until a valid browser-rendered comparison is available.

final result: blocked

## Follow-up QA — 生成遮罩与录音场景互斥选择（2026-08-19）

- Source and annotated implementation evidence: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-8dbd6350-dff2-44ca-9734-b7275d8ee8a3.png`, `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-9331374c-e9e4-4e80-8d70-4f94ee2c650f.png`, and `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-b0bd9ede-9e4b-4330-ac43-936c1a783409.png`.
- Implementation target: `index.html`, APP-AI-01 and APP-REC-02 at the project-owned 390 × 844 phone viewport.
- Fresh post-fix implementation screenshot: unavailable because no inspectable in-app browser surface is exposed in this task. The supplied screenshots are pre-fix evidence.

**Visible pre-fix findings and fixes**

- [P1] APP-AI-01 大纲导航穿透生成遮罩。The sticky file-detail tabs use z-index 8 while the generic scrim used z-index 3. Fix: APP-AI-01 now uses a dedicated scrim at z-index 40 and the generation sheet at 41, so all file-detail content is under the same dimmed layer.
- [P1] APP-REC-02 等待传输文字穿透白色弹层。The normal transfer-status wrapper previously stayed at z-index 9. Fix: its resting z-index is now auto; only an opened transfer-order popover receives z-index 31/32, while the preparation scrim and sheet remain 20/21.
- [P1] 录音选择层级重复。The prior expanded list contained another 自动 item beneath an already selected 自动识别场景 row. Fix: the top level is now an exclusive pair—自动识别场景 or 选择录音场景—and the nested list contains only 会议、访谈、课堂、电话.

**Interaction verification**

- Initial state selects 自动识别场景 and hides the specific-scene list.
- Selecting 选择录音场景 deselects automatic recognition and reveals the four scenes with 会议 selected by default.
- Selecting another scene, switching back to automatic recognition, and returning to manual restores the last specific scene.
- Entering APP-REC-02 for a new recording resets the top-level choice to automatic recognition while retaining the last specific scene for the next manual choice.
- A VM DOM and CSS harness passed 29 assertions covering mutual exclusion, list visibility, default/retained scene selection, route re-entry and the three corrected layer stacks.
- `node --check app.js`, `node scripts/build-inline.js` and `git diff --check` passed.

**Required fidelity surfaces**

- Typography and copy: existing system typography is retained; automatic and manual labels use the same 16px hierarchy, and the nested list uses the existing 14px scene hierarchy.
- Spacing and layout: the automatic mode keeps the 590px preparation sheet; manual mode uses the 690px sheet and scroll-contained scene region with a persistent bottom CTA.
- Colors and tokens: existing black radio selection, neutral helper text, white sheet and red recording CTA are unchanged.
- Image and icon fidelity: no new raster imagery or replacement icon assets were introduced.
- Copy/content: the nested 自动 option and remember-preference row were removed; the helper copy now explains only the two mutually exclusive strategies.

**Remaining blocker**

- A fresh browser-rendered capture is required to certify post-fix pixel coverage and compare the same states side by side. Until that artifact is available, the Product Design visual gate remains blocked despite passing source and interaction checks.

final result: blocked

---

## Follow-up QA — 模板直达与子弹层蒙版（2026-08-19）

- Source evidence: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-6ee595c3-fd99-4e7b-b145-929318bfafb3.png` and `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-43a92470-26d4-4212-babf-12f53efe005f.png`.
- Implementation target: APP-REC-03 and APP-AI-02/APP-AI-03 in the existing local prototype.
- Fresh post-fix implementation screenshot: unavailable. The in-app Browser rejected direct navigation to the local `file://` preview under its URL safety policy, so no visual pass is claimed.

**Implemented changes**

- APP-REC-03 now opens directly on the categorized template list; the 我的模板/探索 tab container, labels and obsolete styles were removed.
- The template flow now returns to APP-AI-01 only, matching the current decision that recording preparation no longer selects a template.
- The sticky file-detail navigation was lowered from z-index 8 to 2. Generic scrims remain at z-index 3 and bottom sheets at z-index 4, so audio-language, AI-model and other standard child sheets dim the entire underlying detail page instead of leaving the navigation bright.
- APP-REC-03, APP-AI-01, APP-AI-02 and APP-AI-03 specifications were aligned with the updated flow and mask behavior.

**Static and interaction verification**

- `node --check app.js` passed.
- `node scripts/build-inline.js` rebuilt `index.html` successfully.
- `git diff --check` passed.
- A VM DOM/CSS harness passed 9 assertions covering direct category rendering, absence of both tab labels and their styles, card rendering, and the corrected 2/3/4 navigation–scrim–sheet layer order.

**Remaining blocker**

- A fresh browser-rendered implementation screenshot is still required for side-by-side checking of typography, spacing, clipping, colors and final mask coverage.

final result: blocked

---

## Follow-up QA — Wi-Fi 快传首页状态与蓝牙续传（2026-08-19）

- Source visual truth: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-d288ed0f-af3b-4768-ade6-7a6f7e4b7687.png`.
- Source dimensions: 853 × 1844 px, normalized to the project-owned 390 × 844 CSS phone viewport.
- Implementation target: `index.html?page=APP-HOME-01&sync=hotspot`, APP-HOME-01 Wi-Fi 快传中.
- Implementation screenshot: unavailable. The in-app Browser rejected the local `file://` preview under its URL security policy, and the managed environment did not approve starting a local preview server. No browser-rendered visual comparison or console pass is claimed.

**Full-view comparison evidence**

- Blocked because the rendered implementation screenshot is unavailable. The selected source was opened and inspected before implementation, but a source-only review does not satisfy the visual comparison gate.

**Focused region comparison evidence**

- Blocked for the same reason. The intended focus is the three-part sync region: status/action row, 2px full progress line, and acceleration-benefit row.

**Implemented behavior and static verification**

- Wi-Fi fast transfer keeps `同步中 / Wi-Fi 快传 / 35% / 3/12 / 预计 8 分钟` and the batch progress line.
- The right action is `结束快传`; the second row shows `加速快传中 / 预计节省约 6 分钟`.
- The saved-time copy is calculated from the same remaining bytes using the current Bluetooth and Wi-Fi prototype speeds rather than hard-coded into the markup.
- Starting Wi-Fi fast transfer preserves the current queue instead of creating a new batch.
- Ending fast transfer switches to Bluetooth, preserves 35% batch progress, the 3/12 completion count, current-file offsets and queue order, and shows `已断开 Wi-Fi，继续使用蓝牙传输`.
- A VM interaction harness passed the complete start/end state chain and asserted the selected copy, progress preservation and Bluetooth continuation.
- `node --check app.js`, `node scripts/build-inline.js` and `git diff --check` passed.

**Required fidelity surfaces**

- Typography: existing system sans-serif hierarchy is retained; the compact sync metadata uses the current prototype's 9–11px UI scale.
- Spacing and layout: Wi-Fi mode expands only the existing sync region to three rows; the device summary and file list structure remain unchanged.
- Colors and tokens: white background, black progress, neutral gray transport pill and outlined red end action follow the selected direction.
- Image and icon fidelity: no new approximate image, emoji, CSS-drawn icon or handcrafted SVG was introduced. The optional acceleration icon is omitted pending a matching product icon asset.
- Copy: the visible fast-transfer and fallback wording matches the selected state and confirmed interaction rule.

**Finding**

- [P1] Fresh browser-rendered visual and console evidence is unavailable.
  - Location: APP-HOME-01 Wi-Fi fast-transfer state.
  - Evidence: both permitted local preview paths were unavailable in the current managed environment.
  - Impact: final pixel fidelity, clipping and browser-console health cannot be certified from source inspection and interaction assertions alone.
  - Fix: open the generated `index.html?page=APP-HOME-01&sync=hotspot` in an inspectable browser session and capture the 390 × 844 app-owned screen for side-by-side comparison.

final result: blocked
