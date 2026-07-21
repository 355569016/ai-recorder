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
