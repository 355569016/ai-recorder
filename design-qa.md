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
