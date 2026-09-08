## APP-FILE-18 重新转写进入配置页（2026-09-08）

scope: 重新转写确认后先允许用户调整生成配置，再显式提交新转写任务

### Interaction changes

- APP-FILE-18 的“重新转写”确认按钮由直接进入 APP-FILE-15 改为进入 APP-AI-01。
- APP-AI-01 默认保持自动生成；用户可切换到自定义生成，并重新选择模板、自动标注说话人、音频语言和 AI 模型。
- 只有在 APP-AI-01 点击“立即生成”后才进入 APP-FILE-15；在此之前不创建新任务，取消或关闭配置页时原转写和 AI 笔记保持不变。
- 已同步 `app.js`、页面效果需求文档、App PRD，以及生成的 `index.html` 和 `prd-preview.html`。

### Checks

- `node scripts/build-inline.js`、`node scripts/build-prd-preview.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 与 `git diff --check` 通过。
- 源文件和生成的 `index.html` 均通过映射断言：`APP-FILE-18 确认 → APP-AI-01 → 提交后 APP-FILE-15`。
- 本轮未取得浏览器运行态截图；静态验证不能替代实际点击验收。

final result: passed with browser interaction verification pending

# APP-HOME-01 文件首页状态快照补充（2026-09-04）

preview URL: `http://127.0.0.1:4174/index.html?page=APP-HOME-01`
scope: 补齐文件首页已在原型状态链路中定义、但底部状态与反馈区此前缺失的真实页面状态

## Evidence

- 新增“未添加录音卡”快照：复用 `showNoHomeDevice()`，保留首页原有无设备入口布局，不展示虚构设备信息、同步条或快传入口。
- 新增“当前无同步任务”快照：复用 `showNoHomeSyncTasks()`，按首页规则隐藏同步状态条和置灰传输记录。
- 新增“全部文件空状态”快照：复用 `showHomeEmptyFiles()`，展示原型已有的“暂无文件”空状态。
- 新增“全部文件选择模式”快照：复用 `showHomeSelectionModeDemo()`，展示原型已有的选择模式和底部操作区。
- 底部 iframe 仍为静态视觉样例，中央手机保持真实可交互；未添加任何原型中不存在的提示语或弹窗。

## Checks

- `node scripts/build-inline.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- `app.js` 与生成的 `index.html` 均包含 4 个新增快照映射及对应预设状态。

final result: passed

# APP-SYNC-01 成功态 Wi-Fi 快传入口校准（2026-09-04）

preview URL: `http://127.0.0.1:4174/index.html?page=APP-SYNC-01&showcase=sync01-success`
scope: 连接设备开启高速传输成功后，文件首页同步摘要的传输方式与主操作入口

## Evidence

- `sync01-success` 预设同时设置 `hotspotTransferState = "success"` 并调用 `startHomeFastTransfer()`，与真实成功点击链路保持一致。
- 成功态复用 `renderHotspotTransfer()` 的文件首页渲染；Wi-Fi 快传状态显示“Wi-Fi 快传”、完整进度和“结束快传”入口，不再显示“快传”入口。

## Checks

- `node scripts/build-inline.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- `app.js` 与生成的 `index.html` 静态映射断言 3/3 通过：成功预设切换快传模式、热点传输赋值和“结束快传”渲染分支均存在。
- 本轮浏览器直达本地成功快照被安全审查阻断，未将该项视觉结果标记为运行态已通过；此前真实成功链路仍由 `confirm-hotspot-join` / `retry-hotspot-connecting` 统一调用 `startHomeFastTransfer()`。

final result: passed with browser visual verification pending

## 转写状态增加“生成中”与 APP-FILE-15 自动续跑规则（2026-09-08）

scope: 统一转写状态定义，并让首页默认文件示例实际呈现“生成中”标签；不新增页面控件、不呈现转写失败或手动重试

### Requirement changes

- 用户可见转写状态统一为“未转写 / 生成中 / AI已生成”。上传、转写和 AI 生成阶段保留为内部任务阶段，不直接作为文件列表状态。
- 文件已提交生成但尚未完成时显示“生成中”，点击文件进入 APP-FILE-15 文件详情生成中。
- 任一生成阶段暂时失败、没有网络或转写条件不满足时，保持 APP-FILE-15 和“生成中”，保留任务标识、已完成阶段与生成快照；恢复条件后从未完成阶段自动续跑。
- 本期不在文件列表、APP-FILE-15 或异常页呈现“转写失败”，也不提供转写手动重试；额度扣减/返还和错误原因仍由服务端及用量账本内部记录。

### Checks

- 已同步 `AI录音卡App需求文档_v3.0.md`、`AI录音卡App页面效果设计需求文档_v3.0.md` 与 `prd-preview.html`。
- `app.js` 已将首页默认示例 `Product review` 设为 `生成中`，整行进入 APP-FILE-15；未新增手机画板控件或失败/重试页面；`index.html` 与 `prd-preview.html` 已由源文件重建。
- `node scripts/build-inline.js`、`node scripts/build-prd-preview.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- 已通过源数据与生成文件确认首页示例的“生成中”标签可见且整行指向 APP-FILE-15；本轮未新增生成恢复逻辑，因此未声称恢复链路已完成浏览器运行态验收。

final result: passed with browser visual verification pending

## 页面映射、状态表与首版优先级统一（2026-09-07）

scope: 统一现有原型、页面效果需求与产品需求中的页面含义、状态描述和 P0/P1；不新增任务、账本明细、异常处理或其他交互链路

### 文档与元数据核对

- 保留现有页面编号和产品交互；文件详情统一为“标记 / 总结 / 转写记录”一级内容切换，仅“总结”内部使用连续滚动和二级锚点。
- 将旧 `APP-AI-06`、旧 `APP-ME-02` 等历史编号明确标注为映射关系；`APP-AI-03` 统一为 AI 模型选择，`APP-ME-12` 统一为 P0 用量账本承载页。
- 修正首页同步、搜索、文件详情、录音编辑、设备状态、模型选择和名称编辑等模板化状态；每条状态明确触发条件、页面表现与反馈结果，不再虚构保存按钮、取消回滚或通用成功 Toast。
- 统一优先级：OTA 完整链路、用量透明、账号与云端删除、本地空间清理、基础设置和设备热点快传为 P0；链接分享、支付升级、PDF 导出和可信同网 STA 自动同步为 P1；基础导出为 P0。
- `APP-ME-12` 当前仍只有日期与消耗时长，扣减/返还类型、关联文件、失败原因和任务明细明确记录为后续交互补齐项。

### Verification

- `app.js` 页面注册表的优先级和名称与页面效果需求中的统一规则一致。
- `index.html` 由 `app.js` 重建，`prd-preview.html` 由产品需求文档重建。
- 本次没有改变产品操作链路，因此以源文件、生成物和结构静态检查作为验收依据；未将静态检查记录为浏览器运行态验收。

final result: passed

## APP-HOME-01 传输完成、云端状态与恢复连接（2026-09-07）

### Interaction requirements

- 设备到手机传输完成并通过完整校验后，文件恢复为正常黑色可点击行；不额外标记“已传到手机”或“已上传云端”。
- 私有云同步开启时，文件已在手机但未上传显示“等待同步云端”，上传进行中显示“同步云端中”及轻量转圈；上传完成后恢复正常文件状态。
- 私有云同步关闭时，首页不显示任何等待或上传云端状态，本地文件保持可打开。
- 锁屏、系统终止 App 或断联后，首页按已绑定未连接、连接中、连接成功呈现紧凑设备图标；连接成功后复核任务、手机空间和已确认 offset，再恢复任务。
- 手机空间不足时，任务显示“等待释放空间”；空间恢复并通过复检后从原 offset 续传。
- 原型说明文档已用红字标注：首版不实现统一 STA 同局域网验证和失败降级页面路径；PRD 保留完整 STA/SoftAP 流程。

### Code and build checks

- `node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js`、`node scripts/build-inline.js`、`node scripts/build-prd-preview.js` 与 `git diff --check` 通过。
- 静态断言确认云同步开关、云端状态显示条件、手机空间恢复、恢复连接状态链、状态反馈快照及生成的 `index.html` 均已同步。

### Residual checks

- 浏览器实际视觉与点击链路待复测；当前本地预览地址仍受浏览器安全审查限制，未取得本轮运行态截图或控制台结果。

## APP-HOME-01 手机空间不足清理链路（2026-09-07）

### Interaction requirements

- 本地空间检查发现不足时，App 打开首页即显示底部空间清理弹窗；任务保持 `storage_blocked`，已确认 `acked_offset` 不变。
- 点击灰色遮罩只关闭弹窗。后续点击底部录音、快传、等待释放空间或等待传输行时，必须重新唤起弹窗，不进入录音或快传流程。
- 弹窗展示不可点击的“清理手机存储空间”说明和「系统设置 ＞ 通用 ＞ iPhone 储存空间」路径，由用户自行操作系统清理；不提供系统设置快捷入口。
- 弹窗的“清理 AI录音卡 App 存储空间”进入 APP-ME-07；该页只清理已同步云端的本地缓存。清理动作本身不代表续传成功，仍需完成手机空间复检。

### Verification

- 静态检查覆盖：空间不足状态、弹窗的遮罩关闭、四类再次唤起入口、APP-ME-07 跳转以及空间恢复后从原 offset 续传的状态链。
- 浏览器运行时验证待本地预览安全限制解除后完成。

## APP-FILE 回收站、分享链接与生成任务一致性（2026-09-07）

### Interaction requirements

- 确认移入回收站后，文件在本端立即不可访问，原分享链接由服务端立即撤销，公开访问显示文件不可用；排队、上传、转写和 AI 生成任务统一取消。
- 从回收站恢复时，音频、转写、AI 笔记和标记恢复。原分享链接仅在未过期且未被主动移除时恢复；已取消生成任务不自动续跑。
- 彻底删除或回收站到期后，文件和历史分享链接均不可恢复。其他终端联网时按云端文件版本清理本地列表、访问状态和生成任务，离线缓存不得反向恢复文件。

### Verification

- 原型页面说明已覆盖 APP-FILE-07、APP-FILE-08、APP-FILE-15、APP-FILE-20 和 APP-FILE-23；两版 PRD 均已移除这条链路的待确认描述。
- 运行态需要服务端分享链接撤销、任务取消和跨端同步接口联调后再验证。

## 录音状态反馈与保存后传输（2026-09-06）

### Interaction requirements

- APP-HOME-01 当前页面状态与反馈新增“录音中点击同步提示”快照，保留 Toast：「正在录音，请停止录音后再试。」以及置灰等待传输文件行。
- APP-REC-04 当前页面状态与反馈补充“开始录音处理中（内部）”和“结束录音处理中（内部）”快照：开始处理中使用 APP-REC-02 准备录音弹层，仅显示开始按钮的旋转加载圈，不显示录音页内容；结束处理中保留 APP-REC-04 录音页上下文，仅将结束操作置为处理中并显示旋转加载圈。真实交互仍在确认完成后直接进入录音页，结束后直接回文件首页。
- 保存确认成功后不展示“录音已保存”文字提示，文件首页直接新增待传输项；设备已连接且当前未录音时开始传输，否则保持等待传输。

### Code and build checks

- `node --check app.js`、`node scripts/build-inline.js`、`node scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- `index.html`、`prd-preview.html`、页面效果说明、PRD v3.0 与 PRD v3.0.1 已同步更新。

### Residual checks

- 浏览器运行态尚未复测；本地 HTTP 预览与 `file://` 页面仍受自动安全策略拦截。

final result: static checks passed; browser interaction verification pending

## APP-HOME-01 / APP-REC-04 录音期间静默暂停与最小化（2026-09-06）

scope: 同步中开启录音、录音页最小化回文件首页、旧任务置灰、保存后自动续传。

### Interaction requirements

- 开始录音前存在 BLE、STA 或 SoftAP 音频传输时，系统保存当前任务顺序、通道和已确认 offset 后静默停止传输；用户的录音开始、暂停、结束操作保持正常。
- 录音页点击顶部灰色区域，或从顶部把手向下滑动，可最小化回文件首页；首页顶部展示可点击的“正在录音”文件行，点击后回到录音页。
- 录音期间首页隐藏同步摘要；原有未完成文件置灰并显示“等待传输”。用户点击旧文件或手动尝试传输时，才显示 Toast：「正在录音，请停止录音后再试。」
- 录音页不展示“传输已暂停”“录音期间不传输音频”“设备已确认正在录音”等常驻说明；结束后直接回文件首页，保存确认成功时直接新增待传输文件，不弹出保存文字提示。

### Static checks

- `node --check app.js`、`node scripts/build-inline.js`、`node scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- `index.html`、`prd-preview.html` 已由当前源文件重新构建；原型、页面效果说明和两份 PRD 均已同步更新。

### Residual checks

- 浏览器运行态验证未执行：本地 HTTP 预览服务与 `file://` 页面均被自动安全策略拦截；未尝试绕过策略。

final result: static checks passed; browser interaction verification pending

## APP-REC-02 / APP-REC-04 / APP-REC-05 中间状态收敛（2026-09-06）

### Interaction requirements

- 录音进行中点击底部录音按钮直接回到 APP-REC-04，不再打开准备录音弹层。
- 开始确认未完成前不进入 APP-REC-04；开始失败不进入录音中页面并恢复原同步任务。
- 录音结束后立即回 APP-HOME-01；结束确认、设备保存和恢复传输只在内部状态机完成，不展示 APP-REC-05 中间页面。
- 保存确认成功后恢复旧任务的已确认 offset，并把本次录音加入同步队列。

### Static checks

- `node --check app.js`、`node scripts/build-inline.js`、`node scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- APP-REC-04 状态链路预览已移除开始确认、开始失败和结束确认的用户展示卡，仅保留录音中、标记和相机等用户可见状态。

final result: static checks passed; browser interaction verification pending

## 录音优先、可信录音与保存状态（2026-09-06）

reference visual: `/Users/andyma/Downloads/IMG_6278.PNG`
scope: 同步中开始录音、录音期间禁止音频传输、设备确认录音、设备确认保存、保存后续传

### Interaction requirements

- BLE、STA 或 SoftAP 正在传输时开始录音，先暂停音频传输并保留任务顺序、原通道和已确认 offset；录音期间只保留控制、状态、标记和文件索引。
- 开始确认、结束确认和设备保存均为内部状态；用户只在确认成功后看到录音中页面，开始失败不进入录音中页面。
- 点击结束后立即回文件首页；文件清单未确认前不恢复旧任务、不创建本次任务，也不展示 APP-REC-05 中间页面。
- 设备确认文件 ID、时长、大小和校验信息后，在文件首页新增待传输文件；设备已连接且当前未录音时立即开始传输，否则保持等待传输，不弹出保存文字提示。

### Expected state checks

- 默认首页同步进度为 35%；开始录音确认期间不展示确认文案，原活动文件保持已确认进度，录音期间不增加。
- 设备确认后才进入录音中页面；开始失败不进入录音中页面，并恢复原文件传输。
- 点击结束后立即回文件首页；结束确认和设备保存期间不展示中间页面，也不恢复音频传输。
- 保存成功后文件首页新增“刚刚的录音”待传输项；设备已连接且当前未录音时开始传输，否则保持等待传输。
- 保存状态未确认时不创建任务、不恢复传输，保留后台重试能力。
- 浏览器运行态验证仍待完成；本轮本地 HTTP 预览和 `file://` 直达均受自动安全策略拦截。

### Code and build checks

- `node scripts/build-inline.js`、`node scripts/build-prd-preview.js` 已通过，`index.html` 与 `prd-preview.html` 已同步重建。
- `node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- PRD v3.0、PRD v3.0.1、页面效果说明和原型页面均已移除“录音中持续同步”冲突描述。

final result: passed

## APP-ME-16 头像操作面板取消按钮视觉修复（2026-09-04）

scope: 更换头像操作面板的取消按钮

### Visual check

- 取消按钮保留独立卡片结构，与“拍照”“从照片中选择”分组区分。
- 修复 CSS 层叠导致的透明背景，取消按钮现在使用白色背景，不再透出灰色蒙层。
- 修正取消按钮的绝对定位宽度，避免同时使用 `width: 100%` 与左右定位造成右侧溢出；现在与上方操作面板左右对齐。
- 原有关闭操作、按钮尺寸、圆角和间距保持不变。

### Code checks

- `node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。

final result: passed with browser visual verification pending

## APP-DEV-10 危险按钮基础样式与 APP-FILE-06 复制操作（2026-09-04）

scope: 验证身份页危险按钮、分享页转写/标记/总结三个复制入口

### Implementation evidence

- `.danger-fill` 下沉统一的 48px 最小高度、圆角、内边距、内容居中、禁用态和键盘 focus 轮廓，修复验证页按钮显示为扁平红色横条的问题。
- 检查全部 7 个 `.danger-fill` 使用点；其他删除弹层和账号危险操作已有局部尺寸覆盖，未发现同类漏样式。
- APP-FILE-06 的转写、标记、总结三项改为整行可点击的复制操作，右侧使用双层方框复制图标；点击后显示“复制成功”Toast，1.8 秒后自动消失。
- `app.js` 变更已通过 `node scripts/build-inline.js` 同步到 `index.html`；页面效果需求文档已同步复制按钮和 Toast 规则。

### Code checks

- `node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- 静态断言确认三个复制按钮均包含 `data-action="copy-share-content"`、不同的 `data-copy-type` 和可访问名称，事件处理器只接受 `transcript`、`marks`、`summary` 三种类型。

### Residual checks

- 浏览器实际视觉与点击链路未复测；本地地址被浏览器安全审查拦截，未取得新的运行态截图和控制台结果。

final result: passed with browser visual verification pending

# APP-ONB-01 登录中状态快照补充（2026-09-08）

scope: 补齐“当前页面状态与反馈”中已存在的邮箱密码登录提交中状态

## Evidence

- 新增“登录中”静态快照，复用 APP-ONB-01 的真实 `loginSubmitting` 状态。
- 快照保留已填写的邮箱和密码、已选中的协议项；登录按钮禁用并显示“登录中…”。
- 不改动实际登录的防重复提交及完成后进入 APP-ONB-04 的既有链路。

## Checks

- `app.js` 与生成的 `index.html` 均包含 `onb01-submitting` 预设及“登录中”反馈卡。
- 本地浏览器直达 APP-ONB-01 已确认状态区新增“登录中”卡；其登录按钮显示“登录中…”且 disabled，Google / Apple 入口也被禁用，输入与协议选中状态保留。

# APP-ONB-01 内容上限与自动堆叠校准（2026-09-03）

reference visual: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-05fff3f0-ba59-4792-9973-8a166a1c1ed8.png`
preview URL: `http://127.0.0.1:4174/index.html?page=APP-ONB-01`
scope: 仅调整 APP-ONB-01 底部反馈示例的内容上限、网格排列和留白

## Evidence

- 每个反馈示例卡片及其内部内容限制为 390px，和中央手机屏幕宽度一致；不会被底部白色容器拉宽。
- 桌面宽屏下按钮状态、页内错误、协议 Bottom Sheet 能并排放置；900px 和 600px 窄视口下自动向下堆叠。
- 网格设置顶部对齐，卡片按自身内容高度收紧，额外空间保留为说明区留白。
- 长文案继续遵循实际屏幕宽度自然换行；按钮文案保持单行。
- 三个视口均无横向溢出，其他页面未应用新补充区结构。

## Checks

- `node scripts/build-inline.js`、`node --check app.js` 和 `git diff --check` 通过。
- 浏览器 console error / warning：空。

final result: passed

# APP-ONB-01 补充区示例控件固定比例（2026-09-03）

reference visual: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-e9dc88b3-9b8d-4c96-8a48-abac336d3465.png`
preview URL: `http://127.0.0.1:4174/index.html?page=APP-ONB-01`
scope: 仅调整底部说明区内部示例控件；白色反馈容器继续自适应

## Evidence

- 登录按钮示例固定为 190px 宽，移动端降为最多 280px；不随底部白色容器拉伸，也不换行。
- 协议 Bottom Sheet 预览保持 430px 最大宽度，错误反馈列表保持 540px 最大宽度；多出的空间留作说明区留白。
- 2048 × 1152 视口实测补充容器宽 1320px、按钮宽 190px；407px 移动视口实测容器宽 379px，无横向溢出。
- 按钮色调保持与真实原型一致：灰色 disabled、黑色主操作、浅灰色“不同意”。

## Checks

- `node scripts/build-inline.js`、`node --check app.js` 和 `git diff --check` 通过。
- APP-ONB-02 仍为原 `.flow-strip` 页面标签区，未受本次样式影响。
- 浏览器 console error / warning：空。

final result: passed

# APP-ONB-01 补充区宽度与按钮色调校准（2026-09-03）

reference visuals:
- `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-1a113b49-d7e6-40da-8d91-08ed15039a23.png`
- `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-b5951b42-df4d-4e87-94a2-ea3ffc3a7475.png`
- `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-d08b33e6-1a53-4f3f-a774-7f820eca501e.png`
preview URL: `http://127.0.0.1:4174/index.html?page=APP-ONB-01`
scope: 仅调整 APP-ONB-01 底部说明区宽度和按钮视觉，中央手机及其他页面保持原行为

## Evidence

- 补充区由固定 980px 改为容器自适应宽度，并设置 1680px 上限；2048 × 1152 视口实测宽度 1320px，无横向溢出。
- 补充区按钮已覆盖旧 `.flow-strip button` 的样式优先级：不可提交/提交中为 `#c8c8c8`，正常提交与“同意并继续”为 `#111`，协议拒绝为 `#e9ecf2`。
- 颜色与真实原型运行态一致；提交中继续保留 disabled 灰色，不新增交互图标。
- 其他页面仍使用原 `.flow-strip` 页面标签结构，未应用补充区样式。

## Checks

- `node scripts/build-inline.js`、`node --check app.js` 和 `git diff --check` 通过。
- 浏览器 console error / warning：空。

final result: passed

# APP-ONB-01 当前页面状态与反馈静态说明区（2026-09-03）

reference visual: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-1c6853cd-5936-41bc-847b-2aeda26fd3a9.png`
preview URL: `http://127.0.0.1:4174/index.html?page=APP-ONB-01`
scope: 仅调整 APP-ONB-01 底部补充说明区；中央手机仍为真实可交互原型，底部仅为不可交互的当前页面视觉样例

## Runtime and visual evidence

- 底部按钮状态复用登录页真实按钮样式，包含不可提交、可提交和提交中；提交中仅显示“登录中…”，未添加真实交互中不存在的 Loading 图标。
- 三类错误反馈复用真实 `.auth-notice.error` 样式与运行态文案：邮箱格式错误、账号未找到、邮箱或密码错误；未增加原型中不存在的网络异常状态。
- 协议确认样例复用真实 `.login-agreement-prompt` 结构，并与实际弹窗共用标题、说明和两个按钮文案；浏览器逐项比对结果一致。
- 输入无效邮箱后点击登录，页面先显示“请输入有效的邮箱地址。”且不打开协议弹窗；有效演示账号未确认协议时打开真实协议弹窗，点击“不同意”后关闭并停留 APP-ONB-01。
- 2048 × 1152 视口下，中央手机底部与说明区顶部间距为 60px，无横向溢出；说明区整体不可交互。
- APP-ONB-01 不显示“关键流程”标题，也不显示“按需显示”；APP-ONB-02 仍保留原全局页面标签区，确认其他页面未套用本次结构。
- 浏览器 console error / warning：空。

## Code and build checks

- `node scripts/build-inline.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- `index.html` 已由最新 `app.js` 重建；APP-ONB-01 需求状态说明已同步为真实原型反馈。

final result: passed

# 首启与账号统一校验顺序与状态机（2026-09-03）

reference visual paths:
- `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-1521da2a-59c0-4650-91fa-6340bb75ab54.png`
- `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-2ac09840-f4ea-488a-b860-3505c8147072.png`

preview URL: `http://127.0.0.1:4176/index.html?page=APP-ONB-01`
scope: APP-ONB-01 / 02 / 03 / 05 / 06 / 07 的输入校验、协议确认、提交防重、凭证结果、成功回链和右侧页面状态表

## Runtime evidence

- APP-ONB-01 输入 `bad-email` 和完整密码后点击登录，页面先显示“请输入有效的邮箱地址。”，协议确认弹窗不可见；改为有效演示邮箱后点击登录才展示协议弹窗。
- APP-ONB-01 点击“同意并继续”后按钮显示“登录中…”且 disabled，随后进入 APP-ONB-04；Google 登录同样先确认协议，提交中显示“Google 登录中…”并禁用入口。
- APP-ONB-02 依次验证邮箱格式错误、密码少于 8 位，两种输入错误均不打开协议弹窗；合法输入才打开协议弹窗，同意后显示“发送中…”并进入 APP-ONB-03。
- APP-ONB-03 提交错误验证码时先显示“验证中…”且禁用按钮，随后保留输入并显示验证码错误；输入 `888888` 后进入 APP-ONB-04。
- APP-ONB-06 发送验证码分支已验证：错误邮箱直接显示格式错误；未注册邮箱先进入“发送中…”再显示账号未注册；固定账号发送成功后显示验证码已发送。
- APP-ONB-06 登录分支已验证：完整输入错误验证码但未确认协议时先展示协议弹窗；同意后进入“登录中…”，随后显示验证码错误；改为 `888888` 后进入 APP-ONB-04。
- APP-ONB-05 依次验证邮箱格式、密码长度、提交中和账号不存在；固定账号提交后进入 APP-ONB-07。
- APP-ONB-07 错误验证码先进入“验证中…”再显示凭证错误；输入 `888888` 后返回 APP-ONB-01，并显示继续使用原密码登录的原型提示。
- 六页右侧状态表顺序已从浏览器 DOM 逐页读取；APP-ONB-06 明确拆分为“发送验证码”和“提交登录”两条有前缀的状态链。
- 浏览器 console error / warning：空。

## Code and build checks

- `node scripts/build-inline.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- `index.html` 已由最新 `app.js` 重建；页面效果需求文档新增统一校验优先级，并补齐 APP-ONB-07 独立章节。

## Boundaries

- 网络异常、安全风控和生产账号状态仍是规格状态，未接入真实后端或真实风控服务；本轮运行态只验证原型已有的本地模拟分支。
- 本轮未扩展至设置模块中的更改密码、删除账号或设备解绑身份验证页。

final result: passed

# APP-REC-02 快捷录音视觉 QA

source visual truth path: `/Users/andyma/.codex/generated_images/01a02f10-f807-7dc3-8f67-909cceb37be0/exec-fefd8f41-1e3c-45b2-83b4-c6be21b2e99b.png`
implementation screenshot path: unavailable
viewport: 390 x 844 target mobile content
source and implementation pixel dimensions: source 844 x 2048 rendered preview; implementation screenshot not captured
CSS size and density normalization: not verified; source was generated as a preview image and requires same-viewport browser capture
state: APP-REC-02, 自动识别场景 selected, 快捷录音 off

## Evidence

- Source visual was opened and inspected.
- Implementation source was updated in `app.js` and `styles.css`, then `index.html` was rebuilt.
- `node --check app.js`, generated-marker checks, and `git diff --check` passed.
- Browser-rendered implementation screenshot, interaction capture, and console-error check are unavailable in this environment.

## Findings

- No visual finding can be closed from source inspection alone.
- The selected design is represented in the implementation by a separate “快捷录音” section, gray rounded setting strip, off switch, and red primary CTA.

## Required browser checks

1. Compare the rendered APP-REC-02 screen against the source at the same viewport and state.
2. Confirm the gray strip, switch position, text wrapping, bottom CTA visibility, and sheet height.
3. Toggle the switch and confirm `aria-checked` plus the red on-state.
4. With the switch on, click the bottom record button and confirm direct navigation to APP-REC-04.
5. With the switch on, long-press the record button for about 500ms and confirm APP-REC-02 opens without starting recording.
6. Check the browser console for runtime errors.

final result: blocked

## APP-ONB-02 注册协议确认弹窗与文案统一（2026-09-02）

reference visual: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/codex-clipboard-9721f36f-8ac4-4104-a089-b498c1ae2702.png`
scope: 注册页协议文案、默认勾选状态、未确认拦截和底部条款弹窗

### Interaction requirements

- 注册页协议项默认未选中，文案与登录 / 注册页一致：「我同意注册并接受《用户协议》《隐私政策》和《AI 数据处理说明》。」
- 填写邮箱和密码后未勾选协议，点击“下一步”停留当前页并打开“请阅读并同意以下条款”底部弹窗。
- 点击“不同意”或蒙层关闭弹窗，协议保持未选中，不显示原独立红色协议提示，也不提交注册。
- 点击“同意并继续”自动选中协议，并继续原注册校验和验证码发送链路。

### Code and build checks

- `node scripts/build-prd-preview.js`、`node scripts/build-inline.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- 静态断言确认注册默认值为未选中、注册页和登录页协议文案一致、注册弹窗使用同一标题/说明/按钮文案，旧的“请先同意用户协议和隐私政策”提示已移除。
- `index.html` 已由最新 `app.js` 重建；需求文档 APP-ONB-01 / APP-ONB-02 已同步。

### Residual checks

- 浏览器实际视觉与点击链路未复测；当前本地地址被浏览器安全审查拦截，未取得新的运行态截图和控制台结果。

final result: passed with browser visual verification pending

## APP 页面底部真实状态快照（2026-09-03）

reference visuals: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-55655742-9f17-4252-ad01-8c44d9700dcc.png`, `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-cb7e1b0a-18ec-449e-b5c4-f804957b9069.png`
preview URL: `http://127.0.0.1:4174/index.html?page=APP-ONB-02`
scope: 底部“当前页面状态与反馈”只展示原型中已实现、可实际触发的完整页面表现；未核实或原型不存在的状态不展示。

### Content and source checks

- 底部样例不再读取 `stateDetailOverrides` 后自行推断反馈类型，也不再把弹窗、页内错误或 Toast 近似绘制成文字条。
- 每个样例通过同一页面渲染器、同一状态变量和同一份 CSS 输出完整 390 × 844 页面，因此协议确认包含真实遮罩、标题、正文和两个按钮，页内错误也保留真实输入框、按钮和页面上下文。
- 已核实并展示 APP-ONB-01、APP-ONB-02、APP-ONB-03、APP-ONB-05、APP-ONB-07、APP-ONB-06 的真实认证异常/反馈状态，以及 APP-DEV-02 的 SN 位置说明弹窗。
- 在逐页核对实际渲染器与状态变量后，补充 APP-SYNC-01、APP-HOME-01、APP-FILE-03、APP-FILE-23、APP-REC-04、APP-FILE-01、APP-AI-01、APP-ME-16、APP-ME-34、APP-ME-36、APP-ME-41、APP-ME-19、APP-ME-22、APP-DEV-03、APP-DEV-10、APP-DEV-08 的同页真实状态，覆盖系统确认、Bottom Sheet、输入校验、文件操作、照片与来源预览、Toast、账号身份验证和设备危险操作确认。
- APP-ONB-02 不再错误展示“验证码已发送”Toast；该操作实际会跳转 APP-ONB-03。
- APP-ONB-06 不再展示原型未实现的“网络异常”，错误和发送成功均使用实际页内反馈，不再误画成黑色 Toast。
- APP-DEV-02 只保留可实际点击问号触发的 SN 位置说明弹窗，不再展示未实现的连接中、绑定成功或绑定失败状态。
- APP-DEV-10 补齐“还原所有设置确认”样例；该样例使用 `dev10-reset-confirm` 预设，复用中央原型的完整确认弹窗、影响说明及“取消 / 确认还原”按钮，不再遗漏真实入口。
- 普通默认态、单纯选中态、跳转后由独立页面承载的状态，以及右侧规格中存在但原型渲染器没有对应实现的状态不生成底部补充区；没有必要补充的页面保持为空。

### Runtime and visual checks

- APP-ONB-02 实际填写合法邮箱和密码并点击“下一步”，确认打开完整协议弹窗；实际交互弹窗与底部快照的 DOM 标记完全一致。
- APP-DEV-02 实际点击 SN 问号打开说明弹窗；实际交互弹窗与底部快照的 DOM 标记完全一致。
- 78 个已登记状态逐项在浏览器中加载并断言：页面可渲染、画板严格保持 390 × 844、无“原型渲染错误”，且快照内部不递归生成补充区；78/78 通过。另对 16 个代表性弹窗、错误、来源、相机与系统确认状态逐项断言目标文案和结构存在，16/16 通过。APP-ONB-07 额外核实验证码刚发送时重发按钮置灰禁用，倒计时归零后“重新发送验证码”恢复为蓝色可点击状态。
- 每个底部快照固定为手机屏幕宽度，不随外部补充区域横向拉伸；外部区域只负责按可用宽度排列卡片，放不下时向下堆叠。
- 修复底部快照输入框 `autofocus` 抢占父页面焦点并将文档滚动到补充区的问题：展示模式不再触发原型输入框自动聚焦，真实可交互主页面仍保留打开编辑器后的聚焦行为。
- 从文档底部点击切换至 APP-ME-36、APP-FILE-03 后，等待所有快照加载，父页面 `scrollY` 均为 0；直接打开 APP-HOME-01、APP-ME-16、APP-FILE-03、APP-ME-36 并等待快照加载，父页面均保持顶部且活动元素为 `BODY`。
- APP-ME-36 实际点击“添加”、APP-FILE-03 实际点击“添加文件夹”后，活动输入框分别仍为 `termSheetInput`、`filterFolderName`，确认修复未破坏主原型输入体验。
- APP-DEV-10 默认页现在展示 6 个底部状态样例；新增“还原所有设置确认”直达快照与中央原型实际弹窗的标题、影响说明及“取消 / 确认还原”按钮一致，画板保持 390 × 844，页面滚动位置为顶部且无“原型渲染错误”。
- APP-HOME-01 已移除“未完成同步任务少于 2 个且预计剩余时间少于 3 分钟时隐藏同步状态”的低打扰条件；只要存在同步中任务，首页持续展示同步状态条、整体进度和“快传”入口，只有同步队列为空或批次完成后隐藏。
- APP-HOME-01 点击“单任务新批次”后实际进入单任务同步状态，页面仍显示“同步中 / 蓝牙 / 35% / 预计 1 分钟 / 快传”，验证了短剩余时间场景不会再隐藏同步模块。
- 底部状态区按当前页面 ID 只挂载一次：同页 `render()` 不再重写状态区 `innerHTML`，因此中央手机的点击、输入、弹窗开关和状态切换不会重新加载静态 iframe；仅跨页面导航时更新对应状态集合。
- APP-HOME-01 连续展开/收起设备菜单后，底部仍保持原 8 个状态卡和相同标签；切换到 APP-ME-36 后正确更新为 3 个术语状态卡，再连续打开/关闭术语编辑弹层，底部数量、标签和已渲染页面标识均保持不变。
- 浏览器 console error / warning：空。

### Code and build checks

- `node scripts/build-inline.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。

final result: passed

## APP-ONB-01 Google / Apple 授权登录协议前置确认（2026-09-02）

reference visual: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/codex-clipboard-90cdc3e5-5619-415e-af16-e7a38ee933ff.png`
scope: Google / Apple 授权登录前的协议勾选拦截、同意后继续和需求文档补充

### Interaction requirements

- Google / Apple 授权登录与邮箱密码登录共用协议勾选状态。
- 未勾选时点击 Google 或 Apple，不发起授权，先展示“请阅读并同意以下条款”底部弹窗。
- 点击“同意并继续”自动勾选协议，再进入原授权登录链路；点击“不同意”或关闭弹窗不发起授权。
- 该前置确认覆盖未注册用户可能由第三方授权自动创建账号的场景。

### Code and build checks

- `node scripts/build-prd-preview.js`、`node scripts/build-inline.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- 静态断言确认 Google / Apple 按钮均使用协议感知动作，不再直接跳转 APP-ONB-04；同意后分别继续原授权跳转。
- 需求文档 APP-ONB-01 已补充第三方授权登录的协议前置规则、页面状态反馈和验收点。

### Residual checks

- 浏览器实际视觉与点击链路未复测；当前本地地址被浏览器安全审查拦截，未取得新的运行态截图和控制台结果。

final result: passed with browser visual verification pending

## 全量页面状态表现与反馈补全（2026-09-02）

scope: 将有“页面状态”的需求章节统一补充为“状态 / 页面表现 / 反馈”三列表格，并与原型当前状态链同步

### Coverage evidence

- 原型状态对象共 96 个；所有有状态的原型页面对象均通过统一 `buildStateDetails(page)` 生成三列表格，未再使用仅列状态名称的右侧规格面板兜底展示。
- 需求文档中 32 个主章节及隐私安全下的 APP-ME-22 删除账号子页面均已补充“状态表现与反馈”表；页面状态名称与对应原型状态链逐项校验通过。
- 文件列表区虽并入 APP-HOME-01，但仍保留独立状态字段，已单独补齐全部、来源、传输、未转写和 AI 已生成等状态的页面表现与反馈。

### Code and build checks

- `node scripts/build-prd-preview.js`、`node scripts/build-inline.js`、`node --check app.js` 和 `git diff --check` 通过。
- `prd-preview.html` 和 `index.html` 已分别由需求文档与 `app.js` 重建。
- 静态一致性校验通过：32 个主章节的表格状态行数与状态字段一致，APP-ME-22 子页面另有 10 行状态表，且与原型页面对象状态名称一致。

### Residual checks

- 浏览器运行态视觉与点击链路未在本轮复测；此前本地地址被浏览器安全审查拦截，未取得新的运行态截图和控制台结果。

final result: passed with browser visual verification pending

## APP-ONB-01 移除优惠活动授权（2026-09-02）

scope: 首启与账号流程及消息与通知设置中的优惠活动 / 产品资讯授权项及对应需求字段

### Evidence

- 登录页不再显示“请让我及时了解 AI 录音卡的最新资讯和优惠活动”授权项。
- 注册页和邮箱验证码登录页复用的活动咨询授权项一并移除。
- `APP-ONB-01`、`APP-ONB-02`、`APP-ONB-06` 的 `privacy_opt_in` 需求字段已移除；相关“资讯授权 / 营销消息授权”依赖文案已同步清理。
- “消息与通知”设置页不再显示“产品更新与优惠”，对应的 `product_updates` 字段和本地通知状态已移除。
- 用户协议、隐私政策和 AI 数据处理说明的登录同意弹窗链路保留。
- `node scripts/build-inline.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。

### Residual checks

- 浏览器实际视觉检查尚未完成；当前本地地址被浏览器安全审查拦截，未取得运行态截图和控制台结果。

final result: blocked

## APP-REC-04 原位编辑交互变更

source visual truth path: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-51565715-313a-4bd2-b871-e160e8dbeb95.png`
implementation screenshot path: unavailable
target behavior: 标记或照片说明在原位置替换为输入框；直接展示与 APP-FILE-10 一致的系统键盘，不增加额外编辑操作栏

## Evidence

- `app.js` now renders `#recordingEditorInput` inside the edited timeline item (or the new draft item at the timeline end).
- The recording editor now renders only the inline field and keyboard; the redundant “输入 / 取消 / 完成” row is removed.
- Keyboard dismissal or Enter commits the draft; an empty new draft is discarded.
- `styles.css` keeps the shared keyboard visual treatment and inline editor treatment without an extra action bar.
- `node --check app.js`, `git diff --check`, and the inline build passed.

## Required browser checks

1. Tap an existing marker and confirm the input replaces the text at the same timeline position.
2. Tap “输入” and confirm a draft row appears at the timeline end with the inline field focused.
3. Confirm the system keyboard is visible directly below the recording content, with no extra action row or second input field.
4. Type text, then dismiss the keyboard or press Enter to save; verify the marker list and timeline timestamp/source.
5. Tap a photo caption and confirm it edits in place without moving the photo block.
6. Check the browser console for runtime errors.

## 本轮实际修改页面

- `APP-REC-04 录音中`：修正原位置编辑，并恢复系统键盘展示和键盘按键输入。
- `APP-FILE-01 / APP-FILE-10 / APP-FILE-15 文件详情相关页面`：作为键盘视觉与原位编辑参考，保留既有系统键盘实现；本轮未改动其业务逻辑。
- 需求文档同步更新 `APP-REC-04` 的状态、规则与验收描述。

## APP-HOME-01 文件空状态与文件管理交互（2026-08-24）

preview URL: `http://127.0.0.1:4173/index.html?page=APP-HOME-01`（隔离临时目录本地预览）
scope: 全部文件空状态、左滑选择、选择模式、快捷菜单、重命名、移动到文件夹、回收站确认；合并文件明确不在本期

## Evidence

- `node --check app.js`、`node scripts/build-inline.js`、`node scripts/build-prd-preview.js`、`git diff --check` 通过。
- 点击状态链路“全部文件空状态”后，正常文件和同步任务隐藏，出现“暂无文件”与“导入音频”；点击“恢复文件示例”可恢复列表。
- 在可见正常文件行执行水平左滑，直接进入“已选中（1）”，自动勾选当前文件，顶部出现“完成”、底部出现四项批量操作；不再展示二次“选择”按钮。
- 右侧状态链路点击“全部文件选择模式”可直接打开同一选择页，验证“已选中（1）”、完成按钮和批量操作栏，解决选择模式只能靠手势发现的问题。
- 全部文件空状态复核：空状态仅保留说明文案，`.home-file-empty-state [data-go="APP-FILE-13"]` 数量为 0；标题栏 `.import-btn` 数量为 1，导入入口保持不变。
- 继续选择第二个文件后显示“已选中（2）”；批量操作栏的“重命名”置灰，操作栏没有“合并”。
- 通过文件行右键菜单验证同一快捷菜单入口：包含“重命名、移至文件夹、移至回收站”，未转写文件额外显示“生成”。长按逻辑在源代码中使用约 500ms 计时器，并保留该右键菜单作为桌面预览的等价入口。
- 重命名：弹层输入有效名称后保存，列表即时显示新名称；输入空白时实时显示“请输入文件名”，保存按钮保持禁用。
- 移动：打开移动底部弹层，未选文件夹时不可确认；选中目标文件夹后按钮启用，确认后弹层关闭并显示“已移动”提示。
- 回收站：批量删除先展示“移至回收站？”二次确认；确认后文件从列表移除。独立“全部文件空状态”状态链路再次验证最终空状态。
- 浏览器控制台 error/warning：空。

## Residual checks

- 当前浏览器控制面未提供可控的按压时长参数，因此未做真实 500ms 触屏长按录制；已通过源代码计时器检查和右键等价入口验证菜单内容。
- “筛选结果空状态”文案和清除筛选入口已写入渲染规则与 PRD，当前原型没有独立的筛选结果数据源状态按钮，未声称已完成该运行态点击证据。

## APP-ME-22 删除账号两步页面组合（2026-08-25）

preview URL: `http://127.0.0.1:8765/index.html`
source visual truth paths:
- `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-01f34fcb-eaf3-4147-b277-b8c684a1c0c6.png`
- `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-f60ee4b2-3f8a-48dc-bdcd-9ffcf9599936.png`
- `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-ca06c3d3-f411-4ed7-a04a-b6a8bf87d1d0.png`
- `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/T/codex-clipboard-3ada0dac-f54c-4506-a3cf-85f3eb58fc44.png`
implementation screenshot path: not saved; browser screenshots were captured and visually inspected in the current local preview session
scope: APP-ME-22 风险说明、阅读确认、身份验证、密码/邮箱验证码切换、错误与成功回链

## Evidence

- 第一页已组合方案一的永久删除影响卡、三项操作前提醒和底部阅读确认；顶部展示 `1/2`。
- 未勾选阅读确认时“下一步”保持禁用；勾选后可进入第二页。
- 第二页展示 `2/2`、脱敏账号、密码/邮箱验证码切换、密码显示/隐藏、验证码发送、红色确认按钮和返回上一步。
- 错误密码停留当前页并显示“账号密码错误”；错误验证码停留当前页并显示验证码错误提示。
- 密码正确输入 `A88888888`、验证码先发送后输入 `888888` 均回到登录/注册页；完成后再次进入流程默认回到密码方式。
- `node scripts/build-inline.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- 浏览器截图已检查两页的步骤标识、风险卡、验证控件、脱敏邮箱和底部操作区。

## Findings

- P0/P1/P2：无。
- 页面内容较长时，风险说明页通过原型画板滚动查看底部确认区；没有新增业务弹层或后端删除能力。

## Console and residual checks

- 本轮浏览器日志出现 3 次 `MutationObserver.observe` 参数错误；仓库源文件中未找到 `MutationObserver`，该错误未定位到本轮 APP-ME-22 代码，保留为浏览器预览环境残余风险。
- 未执行真实账号、云端数据或订阅删除；当前行为仍是前端交互原型模拟。

final result: passed

## APP-ONB-01 页面状态三列表格（2026-09-02）

scope: 右侧规格面板“页面状态”区域；状态、页面表现、反馈方式与反馈内容

### Evidence

- `APP-ONB-01` 页面元数据新增 6 行 `stateDetails`，保留原有 6 个状态名称。
- 右侧规格面板新增“状态 / 页面表现 / 反馈”三列表格；未补充状态明细的其它页面继续使用原有状态列表渲染。
- `styles.css` 增加固定列宽和长文案换行规则，避免反馈文案撑破规格面板。
- 需求文档同步增加同结构的状态表现与反馈表格。
- `node scripts/build-inline.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过；`index.html` 已重建并包含 `spec-state-table`。

### Residual checks

- 本轮尝试使用本地预览进行浏览器验证，但本地地址被浏览器安全审查拦截，未取得真实渲染截图、面板溢出结果或浏览器控制台结果。

final result: blocked

## APP-ME-16 用户名称编辑（2026-09-02）

preview URL: `http://127.0.0.1:4174/index.html?page=APP-ME-16`
scope: 设置页用户名称点击编辑、输入、清空、保存、取消与关闭

### Interaction evidence

- 点击设置页用户名称后显示“编辑名称”底部弹层，输入框自动聚焦并带入当前名称。
- 清空输入框后保存按钮禁用，清除按钮同步禁用；输入有效名称后保存按钮恢复可用。
- 保存带首尾空格的名称（如“  张三  ”）后自动去除首尾空格，弹层关闭，设置页即时显示“张三”。
- 修改为临时名称后点击取消、关闭按钮或蒙层，弹层关闭且已保存名称仍为“小明”。
- 浏览器运行态 error/warn：空。

### Code and build checks

- `node scripts/build-inline.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- `index.html` 已由 `app.js` 重建；设置页需求文档同步补充用户名称字段、状态和验收点。

final result: passed

## APP-ME-16 头像编辑与 APP-ME-01 编号修正（2026-08-30）

preview URL: `http://127.0.0.1:4174/index.html?page=APP-ME-16`
scope: 设置页头像操作面板、拍照回填、照片选择入口、我的页编号

### Interaction evidence

- 移动视口中进入 `APP-ME-16`，点击头像后显示“拍照”“从照片中选择”“取消”三项操作；点击取消后弹层关闭且头像保持不变。
- 通过可交互节点点击“拍照”进入相机态，点击快门后返回设置页，头像显示图片并出现“头像已更新”提示。
- “从照片中选择”已绑定 `input[type="file"]`，接受类型为 `image/*`；选择成功后使用 `FileReader` 回填头像，取消选择不改变头像。
- 进入 `APP-ME-01` 后页面标题为“APP-ME-01 我的”，底部“我的”Tab 为选中态；点击“账号设置”可进入 `APP-ME-16`。
- 浏览器运行态 error/warn：空。

### Code and build checks

- `node scripts/build-inline.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- `index.html` 已由 `app.js` 重建；设置页需求文档同步补充头像状态链路，并将“我的”记录为 `APP-ME-01`。

### Residual checks

- 浏览器自动化环境未能接管原生系统照片选择器，因此未伪造真实系统选图结果；已确认入口、`accept="image/*"` 绑定和选图后的 `FileReader` 回填逻辑。

final result: passed

## APP-DEV-03 / APP-DEV-10 危险设备操作确认链路（2026-08-26）

preview URL: `http://127.0.0.1:8765/index.html`
scope: 还原所有设置、解除并清除数据、密码/邮箱验证码验证、设备绑定列表更新、在线/离线反馈

### Interaction evidence

- APP-DEV-03 点击“还原”后展示“还原所有设置？”二次确认；确认弹层没有密码输入，确认后保留录音数据和绑定关系，并显示“设备设置已还原，录音数据和绑定关系保留”。
- APP-DEV-10 在线设备点击“解除并清除数据”后先展示风险二次确认；点击“继续验证”才进入身份验证页。
- 身份验证页支持密码和邮箱验证码切换；未输入有效凭据时确认按钮禁用。
- 输入错误密码后停留验证页并显示“账号密码错误”；发送验证码后输入错误验证码，停留验证页并显示“验证码错误，请检查后重新输入。”
- 输入统一验证码 `888888` 后回到正在搜索设备页，并显示“AI Recorder A1 已解除绑定并清除数据”；返回文件首页后，已绑定设备列表只保留剩余设备，已清除设备不再出现。
- 切换到离线设备 AI Recorder Mini，点击还原设置后展示同一二次确认；确认后显示“已记录还原策略，设备下次联网时执行”。取消弹层后未执行任何设备处理。
- 浏览器运行态控制台 error/warn：空。

### Code and build checks

- `node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 通过。
- `node scripts/build-inline.js` 已同步最新 `app.js` 到 `index.html`。
- `git diff --check` 通过。

final result: passed

## APP-ME-22 第 1/2 页一屏精简确认（2026-08-25）

reference visual: `/Users/andyma/.codex/generated_images/01a03975-ab52-7a22-bb5e-b08965a652af/exec-30743391-7bec-4326-bcb0-acd5b4ff80a9.png`
preview URL: `http://127.0.0.1:8765/index.html?page=APP-ME-22`

### Visual and layout checks

- 第 1/2 页已从 5 条影响 + 3 条前置检查压缩为 3 类影响：数据与文件、会员与访问权限、设备与订阅。
- 独立的大面积“继续前请确认”卡片已改为单行紧凑提醒，保留备份文件、解除设备绑定和取消自动续费信息。
- 移动页面 390×844 目标布局中，`main.me-simple-page` 的 `scrollHeight` 与 `clientHeight` 均为 844，`hasVerticalOverflow: false`；阅读确认按钮和下一步区域均位于页面布局内。
- 第 2/2 页继续保留密码/邮箱验证码切换、密码显示/隐藏、发送验证码和返回上一步。

### Interaction checks

- 未勾选阅读确认时“下一步” disabled；点击阅读确认后 enabled。
- 点击下一步进入 2/2 身份验证页。
- 错误密码停留当前页并显示“账号密码错误”。
- 切换邮箱验证码，发送验证码后输入错误验证码，停留当前页并显示验证码错误。
- 输入统一验证码 `888888` 后回到登录/注册页。
- 浏览器控制台仍有原型既有 `MutationObserver` 环境错误，未发现本次改动引入的页面渲染或交互错误。
- `final result: passed`

## APP-ONB-01 登录协议确认弹窗（2026-09-02）

reference visual: `/Users/andyma/Downloads/IMG_6080.PNG`
scope: 登录页法律协议勾选、未勾选登录拦截、条款确认底部弹窗

### Interaction requirements

- 登录页法律协议项默认未选中，点击协议行可主动选中或取消。
- 未选中时点击登录，停留当前登录页并打开“请阅读并同意以下条款”底部弹窗。
- 点击“不同意”或蒙层，关闭弹窗且协议仍保持未选中。
- 点击“同意并继续”，自动选中协议并继续执行原登录校验链路。

### Code and build checks

- `node scripts/build-inline.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过。
- `index.html` 已由 `app.js` 重建；需求文档已同步协议默认状态、弹窗状态和验收点。

### Residual checks

- 浏览器实际视觉与点击链路尚未复测；当前本地地址被浏览器安全审查拦截，未取得运行态截图和控制台结果。

final result: blocked

## APP-ONB-06 邮箱验证码登录协议确认（2026-09-02）

reference visual: `/var/folders/5t/cmjb84kj5m34yyx94_788mpr0000gn/codex-clipboard-905226bc-5dca-4419-a3dd-a031d2ab5201.png`
scope: 邮箱验证码登录页协议项默认状态、登录前置确认和条款弹窗

### Interaction requirements

- 邮箱验证码登录页协议项默认未选中，文案与登录 / 注册页一致：「我同意注册并接受《用户协议》《隐私政策》和《AI 数据处理说明》。」
- 邮箱和验证码填写完整后，未勾选协议点击“登录”停留当前页并打开“请阅读并同意以下条款”底部弹窗。
- 点击“不同意”或蒙层关闭弹窗，协议保持未选中，不进入绑定设备。
- 点击“同意并继续”自动选中协议，并继续验证码校验和原登录跳转链路；只有同意后才能继续。

### Code and build checks

- 静态断言确认 APP-ONB-06 使用独立的协议状态、可交互未选中协议项、同款协议确认弹窗，以及同意后自动重试“登录”动作。
- 需求文档 APP-ONB-06 已补充协议未确认、协议确认弹窗两类页面状态，以及对应页面表现、反馈方式和反馈内容。
- `node scripts/build-prd-preview.js`、`node scripts/build-inline.js`、`node --check app.js`、`node --check scripts/build-inline.js`、`node --check scripts/build-prd-preview.js` 和 `git diff --check` 通过后，`index.html` 与 `prd-preview.html` 已同步重建。

### Residual checks

- 浏览器实际视觉与点击链路未复测；当前本地地址被浏览器安全审查拦截，未取得新的运行态截图和控制台结果。

final result: passed with browser visual verification pending
