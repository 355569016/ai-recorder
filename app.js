const waveHeights = [18, 30, 22, 54, 34, 70, 44, 58, 28, 48, 20, 62, 32, 42, 24, 56, 36, 66];

const pages = [
  {
    id: "APP-PRD-00",
    group: "需求说明",
    title: "需求说明",
    priority: "P0",
    goal: "作为整个 App 原型的第一页，以全屏 MD 文档预览形式查看 AI录音卡App需求文档_v3.0.md。",
    entry: "打开原型默认进入；位于首启与账号模块之前。",
    fields: [["prd_source", "源 MD 文档", "AI录音卡App需求文档_v3.0.md"], ["prd_preview_html", "HTML 预览", "prd-preview.html"], ["preview_mode", "展示方式", "全屏网页文档预览"]],
    rules: ["本页是需求说明页，不是用户 App 内页面。", "本页嵌入由源 MD 转换生成的完整 HTML 预览，不使用手机框和右侧规格面板。", "页面顺序上位于首启与账号前面，作为产品评审的第一页。", "源 MD 更新后需要重新执行 scripts/build-prd-preview.js。"],
    states: ["默认", "评审入口"],
    deps: ["AI录音卡App需求文档_v3.0.md。", "scripts/build-prd-preview.js。", "prd-preview.html。"],
    acceptance: ["打开原型默认先看到需求说明。", "左侧导航中需求说明位于首启与账号之前。", "主体区域嵌入完整 prd-preview.html 文档预览，不显示手机框。", "预览内容来自完整源 MD，而不是截图或手写摘要。"]
  },
  {
    id: "APP-ONB-01",
    group: "首启与账号",
    title: "登录 / 注册",
    priority: "P0",
    goal: "完成账号登录，作为绑定设备、硬件录音、云端生成和我的页用量服务的前置条件。",
    entry: "首次打开 App、会话失效、点击绑定/录音/生成时未登录。",
    fields: [["auth_state", "登录状态", "云端账号"], ["login_method", "登录方式", "Google / Apple / Email / 验证码"], ["agreement_version", "协议版本", "云端账号/本地缓存"], ["privacy_opt_in", "资讯授权", "用户勾选"]],
    rules: ["未勾选用户协议、隐私政策和 AI 数据处理说明时不可提交登录/注册。", "第三方登录、邮箱密码登录、验证码登录共用同一协议确认状态。", "未登录不可绑定设备、不可开始硬件录音、不可提交转写与 AI 生成。", "登录后检查协议与隐私版本，版本更新需重新确认。"],
    states: ["默认", "提交中", "登录失败", "网络异常", "协议未确认", "账号未注册"],
    deps: ["云端账号：Google / Apple / Email / 验证码登录与刷新 token，接口待后端定义。", "合规：用户协议、隐私政策、AI 数据处理说明、营销消息授权。"],
    acceptance: ["页面结构包含第三方登录、邮箱密码、忘记密码、验证码登录、注册和协议勾选。", "未登录点击录音主按钮时必须进入登录拦截。", "登录成功后可回到原触发动作或进入绑定你的设备页。"]
  },
  {
    id: "APP-ONB-02",
    group: "首启与账号",
    title: "账号注册",
    priority: "P0",
    goal: "使用邮箱和密码创建账号，并确认协议与资讯授权。",
    entry: "登录 / 注册页点击“还没有账号？注册”。",
    fields: [["email", "邮箱", "用户输入"], ["password", "密码", "用户输入"], ["agreement_version", "协议版本", "云端账号/本地缓存"], ["privacy_opt_in", "资讯授权", "用户勾选"]],
    rules: ["邮箱和密码填写后才可进入下一步。", "未勾选用户协议和隐私政策时不可提交。", "点击下一步进入注册验证页。"],
    states: ["默认", "填写中", "提交中", "邮箱已存在", "协议未确认"],
    deps: ["云端账号：注册接口、邮箱格式校验。", "合规：用户协议、隐私政策、资讯授权。"],
    acceptance: ["注册页展示邮箱、密码、下一步、协议勾选和营销授权。", "下一步进入注册验证页。"]
  },
  {
    id: "APP-ONB-03",
    group: "首启与账号",
    title: "注册验证",
    priority: "P0",
    goal: "输入邮箱验证码完成注册验证并进入绑定设备流程。",
    entry: "账号注册页点击下一步。",
    fields: [["email", "待验证邮箱", "注册输入"], ["verification_code", "6 位验证码", "用户输入/邮箱"], ["resend_countdown", "重发倒计时", "本地计时"]],
    rules: ["展示已发送验证码的邮箱。", "验证码为 6 位输入框。", "倒计时结束后可重新发送。", "验证成功后进入绑定你的设备。"],
    states: ["等待输入", "验证码不完整", "验证中", "验证码错误", "可重发"],
    deps: ["云端账号：发送验证码、校验验证码、创建会话。"],
    acceptance: ["注册验证页展示 6 位验证码输入和重发倒计时。", "验证成功进入绑定你的设备。"]
  },
  {
    id: "APP-ONB-05",
    group: "首启与账号",
    title: "重置密码",
    priority: "P0",
    goal: "通过邮箱和新密码发起重置密码流程。",
    entry: "登录 / 注册页点击“忘记密码？”。",
    fields: [["email", "邮箱", "用户输入"], ["new_password", "新密码", "用户输入"]],
    rules: ["邮箱和新密码填写后才可进入下一步。", "点击下一步进入邮箱验证码验证页，验证通过后完成密码重置。"],
    states: ["默认", "填写中", "提交中", "邮箱不存在", "网络异常"],
    deps: ["云端账号：重置密码接口、验证码或邮件发送。"],
    acceptance: ["重置密码页展示邮箱、新密码和下一步按钮。"]
  },
  {
    id: "APP-ONB-06",
    group: "首启与账号",
    title: "邮箱验证码登录",
    priority: "P0",
    goal: "使用邮箱验证码完成登录。",
    entry: "登录 / 注册页点击“使用验证码登录”。",
    fields: [["email", "邮箱", "用户输入"], ["verification_code", "验证码", "用户输入/邮箱"], ["agreement_version", "协议版本", "云端账号/本地缓存"], ["privacy_opt_in", "资讯授权", "用户勾选"]],
    rules: ["邮箱填写后可发送验证码。", "邮箱和验证码填写完整后可登录。", "可切换回密码登录，也可进入账号注册。"],
    states: ["默认", "已发送验证码", "登录中", "验证码错误", "账号未注册"],
    deps: ["云端账号：发送登录验证码、验证码登录、刷新 token。", "合规：用户协议、隐私政策、资讯授权。"],
    acceptance: ["邮箱验证码登录页展示邮箱、验证码、发送按钮、登录按钮、密码登录入口和注册入口。"]
  },
  {
    id: "APP-ONB-04",
    group: "首启与账号",
    title: "绑定你的设备",
    priority: "P0",
    goal: "引导用户将设备靠近手机，并在绑定过程中开启蓝牙和定位权限。",
    entry: "登录并确认协议后、绑定设备前、导入文件前。",
    fields: [["bluetooth_permission", "蓝牙权限", "系统权限"], ["location_permission", "定位权限", "系统权限"], ["bind_step", "绑定步骤", "本地状态"], ["estimated_time", "预计耗时", "产品配置"]],
    rules: ["点击开始后进入搜索设备状态。", "蓝牙和定位权限是扫描和连接设备的必需条件。", "绑定页只说明靠近手机、预计耗时和开始操作，不展示复杂权限清单。"],
    states: ["待开始", "权限待开启", "权限拒绝"],
    deps: ["iOS CoreBluetooth 权限文案。", "Android Nearby Devices / 定位权限文案。", "设备广播和绑定状态协议待固件定义。"],
    acceptance: ["页面名显示为绑定你的设备。", "说明文案为请将设备靠近手机，绑定过程中需要开启蓝牙和定位权限。", "点击开始进入正在搜索设备页。"]
  },
  {
    id: "APP-DEV-01",
    group: "设备",
    title: "正在搜索设备",
    priority: "P0",
    goal: "开始扫描附近录音卡，并提示用户长按录音键开启设备。",
    entry: "绑定你的设备页点击开始。",
    fields: [["scan_state", "扫描状态", "系统蓝牙"], ["device_hint", "设备开启提示", "本地文案"], ["rssi", "信号强度", "系统蓝牙"], ["bind_state", "绑定状态", "BLE/云端设备"]],
    rules: ["已登录才可扫描并绑定设备。", "扫描中展示正在搜索和长按录音键提示。", "搜索到设备后根据绑定状态进入等待连接或已绑定其他账号页。", "搜不到设备时给出靠近、唤醒、检查电量、重新扫描。"],
    states: ["扫描中", "发现可连接设备", "发现已绑定设备", "搜不到设备", "权限拒绝"],
    deps: ["BLE 广播包：设备类型、SN、RSSI、绑定状态，协议待固件定义。", "云端设备：查询设备绑定关系，接口待后端定义。"],
    acceptance: ["搜索页标题为正在搜索...。", "页面说明提示长按录音键以开启设备。", "搜索到设备后进入对应状态页，不在搜索页展示传统列表。"],
    prototypeLinks: [["搜索到设备", "APP-DEV-02"], ["设备已绑定", "APP-DEV-04"]]
  },
  {
    id: "APP-DEV-02",
    group: "设备",
    title: "搜索到设备",
    priority: "P0",
    goal: "展示搜索到的设备和 SN，等待用户确认连接。",
    entry: "正在搜索设备页发现可连接设备。",
    fields: [["device_id", "设备 ID", "BLE/云端设备"], ["device_sn", "完整 SN", "BLE/云端设备"], ["user_id", "当前账号", "云端账号"], ["bind_result", "绑定结果", "设备/云端"]],
    rules: ["绑定前必须登录。", "设备页展示设备名、完整 SN、帮助提示和设备图。", "用户确认后执行连接和绑定写入。", "不是用户设备时可返回重新搜索。"],
    states: ["等待连接", "连接中", "绑定成功", "绑定失败"],
    deps: ["BLE 命令包：写入绑定关系，协议待固件定义。", "云端设备：绑定/解绑接口待后端定义。"],
    acceptance: ["搜索到设备页展示连接按钮。", "点击连接成功进入文件首页。", "不是用户设备可返回搜索。"]
  },
  {
    id: "APP-DEV-04",
    group: "设备",
    title: "连接失败",
    priority: "P0",
    goal: "搜索到设备但设备已绑定其他账号时，说明失败原因和下一步。",
    entry: "正在搜索设备页发现设备已绑定其他账号。",
    fields: [["device_name", "设备名", "BLE/云端设备"], ["device_sn", "完整 SN", "BLE/云端设备"], ["bound_account_mask", "已绑定账号", "云端设备"], ["support_link", "帮助入口", "客服/帮助中心"]],
    rules: ["已绑定其他账号的设备不可绑定到当前账号。", "必须展示脱敏账号、帮助与支持入口、确认按钮和移除设备指引。", "关闭弹层后留在设备发现页或返回重新搜索。"],
    states: ["设备已绑定", "连接失败", "等待用户确认"],
    deps: ["云端设备：设备绑定关系查询。", "帮助中心：如何移除设备。"],
    acceptance: ["连接失败底部弹层说明该设备已绑定至脱敏账号。", "用户可点击好的关闭，也可查看如何移除设备。"]
  },
  {
    id: "APP-HOME-01",
    group: "文件",
    title: "文件首页",
    priority: "P0",
    goal: "3 秒内让用户知道设备是否可用、同步是否进行中，并直接在首页浏览文件列表。",
    entry: "登录/绑定成功后默认进入，底部文件 Tab。",
    fields: [["current_device", "当前设备", "本地数据库/云端设备"], ["connection_state", "连接状态", "BLE 状态包"], ["battery_storage_record", "电量/存储/录音", "BLE 状态包"], ["sync_summary", "同步摘要", "本地数据库/BLE 文件列表"], ["file_list", "文件列表", "本地数据库"], ["file_source", "文件来源", "本地数据库"]],
    rules: ["未连接或未绑定时，设备区只显示添加设备入口，不占用大面积状态卡。", "已连接时仅简要显示连接状态、电量、存储、录音状态和最近同步时间；未录音时显示为待机。", "首页只在存在同步中音频时显示同步状态条；同步完成且没有同步中任务时不显示该状态条。", "文件列表是首页下半区，不再作为单独页面；滚动到设备状态和同步摘要不可见后，文件列表标题默认吸顶。", "文件列表标题栏左侧为文件列表文字和倒三角筛选/排序入口，右侧为导入音频按钮。", "点击导入音频打开导入音频弹层，可从文件或相册调起系统选择器。", "底部中间录音按钮是全局主按钮，不是普通 Tab。"],
    states: ["未绑定/未连接", "设备已连接", "待同步", "同步中", "同步失败", "空文件", "加载更多"],
    deps: ["BLE 状态包：电量、存储、录音状态。", "本地数据库：文件列表、同步队列、转写状态。", "云端文件：上传/删除/状态，接口待后端定义。"],
    acceptance: ["设备状态和同步摘要必须是紧凑区域，不遮挡文件列表首屏。", "导入音频和倒三角入口位于文件列表标题栏。", "导入音频弹层包含从文件里导入和从相册里导入两个系统选择入口。", "下拉/继续滚动可加载更多文件。", "录音主按钮点击前执行登录/绑定/连接检查。"]
  },
  {
    id: "APP-HOME-03",
    group: "文件",
    title: "文件首页回收站提示",
    priority: "P0",
    goal: "从文件详情移至回收站后回到文件首页，并用 toast 告知可恢复窗口。",
    entry: "文件详情更多操作点击移至回收站。",
    fields: [["trash_state", "回收站状态", "本地数据库"], ["toast_message", "提示文案", "本地文案"], ["restore_window", "恢复窗口", "产品规则"]],
    rules: ["移至回收站后直接回到文件首页。", "页面底部展示 toast：已移至回收站，30天内可以操作恢复。"],
    states: ["已移至回收站", "toast 展示", "toast 消失"],
    deps: ["本地数据库回收站状态。"],
    acceptance: ["点击移至回收站不进入单独确认页。", "返回文件首页后展示指定 toast 文案。"]
  },
  {
    id: "APP-FILE-02",
    group: "文件",
    title: "搜索",
    priority: "P0",
    goal: "在文件列表中搜索录音、导入音频和 AI 内容，并展示最近搜索与结果。",
    entry: "文件首页右上角搜索按钮。",
    fields: [["search_query", "搜索词", "用户输入/最近搜索"], ["created_time_filter", "创建时间", "本地筛选"], ["recent_searches", "最近搜索", "本地缓存"], ["search_results", "搜索结果", "本地数据库/云端索引"]],
    rules: ["搜索页归属于文件模块。", "顶部仅包含返回和搜索输入框，不展示提问右侧筛选按钮。", "筛选区只保留创建时间入口，点击打开创建时间弹层。", "无输入时直接展示最近搜索和最近 30 天结果。", "最近搜索右侧使用镂空垃圾桶图标清空。"],
    states: ["默认", "输入中", "有结果", "无结果", "清空最近搜索"],
    deps: ["本地数据库：文件名、转写文本、AI 笔记索引。", "本地缓存：最近搜索。"],
    acceptance: ["文件首页右上角进入搜索页。", "搜索页点击创建时间进入创建时间弹层。", "搜索页输入或点击搜索词后进入搜索结果页。", "搜索页与文件首页、文件详情同属文件列表模块。"]
  },
  {
    id: "APP-FILE-03",
    group: "文件",
    title: "筛选和排序",
    priority: "P0",
    goal: "在文件列表中按创建时间、文件夹、来源和设备筛选排序。",
    entry: "文件列表标题栏倒三角按钮。",
    fields: [["sort_field", "排序字段", "本地筛选"], ["folder_id", "文件夹", "本地数据库"], ["source_type", "来源", "本地数据库"], ["device_type", "设备来源", "本地数据库"]],
    rules: ["筛选是用户可见操作，作为 App 内弹层展示。", "默认按创建时间排序。", "全部文件、未分类、回收站为固定入口。", "来源区分硬件设备和导入音频。"],
    states: ["默认", "已选择文件夹", "已选择来源", "清空筛选"],
    deps: ["本地数据库：文件夹、来源、删除状态、设备来源。"],
    acceptance: ["文件首页点击筛选按钮打开筛选和排序弹层。", "弹层样式参考 Plaud 的筛选和排序面板。"]
  },
  {
    id: "APP-FILE-13",
    group: "文件",
    title: "导入音频",
    priority: "P0",
    goal: "从文件或相册选择本地音频并导入到文件列表。",
    entry: "文件首页文件列表标题栏点击 +导入音频。",
    fields: [["import_source", "导入来源", "用户选择"], ["file_picker_result", "系统文件选择结果", "手机操作系统"], ["album_picker_result", "系统相册选择结果", "手机操作系统"]],
    rules: ["导入音频以底部弹层展示。", "从文件里导入调起手机系统文件选择器。", "从相册里导入调起手机系统相册/媒体选择器。", "关闭后回到文件首页。"],
    states: ["默认", "系统文件选择", "系统相册选择", "导入中", "导入失败"],
    deps: ["手机系统文件选择器。", "手机系统相册/媒体选择器。", "本地文件导入与格式校验。"],
    acceptance: ["弹层样式参考导入音频截图。", "必须包含从文件里导入和从相册里导入两个入口。", "导入完成后文件出现在首页文件列表。"]
  },
  {
    id: "APP-FILE-11",
    group: "文件",
    title: "创建时间",
    priority: "P0",
    goal: "在搜索页中按文件创建时间筛选结果。",
    entry: "搜索页点击创建时间。",
    fields: [["created_time_filter", "创建时间范围", "用户选择"], ["custom_time_range", "自定义时间", "用户选择"]],
    rules: ["创建时间以底部弹层展示。", "选项包含今天、最近 7 天、最近 30 天、自定义。", "未选择时应用按钮置灰，清除按钮保留。", "关闭或应用后回到搜索页。"],
    states: ["未选择", "已选择", "自定义", "清除", "应用"],
    deps: ["本地数据库：文件创建时间索引。"],
    acceptance: ["点击搜索页创建时间弹出创建时间筛选面板。", "弹层样式参考搜索创建时间筛选图。"]
  },
  {
    id: "APP-FILE-12",
    group: "文件",
    title: "搜索结果",
    priority: "P0",
    goal: "展示搜索词命中的转写、文件和 AI 笔记内容。",
    entry: "搜索页输入关键词或点击最近搜索。",
    fields: [["search_query", "搜索词", "用户输入"], ["matched_results", "相关结果", "本地数据库/云端索引"], ["highlight_text", "命中文本", "转写/AI 笔记索引"]],
    rules: ["搜索结果页归属于文件模块。", "顶部仅保留返回和搜索框。", "结果页不展示向 Plaud 提问入口，相关结果整体上移。", "命中的关键词以蓝色高亮。"],
    states: ["有结果", "无结果", "加载中"],
    deps: ["本地数据库：文件名、时间、转写文本。", "AI 索引：笔记内容。"],
    acceptance: ["搜索结果页面样式参考搜索结果图。", "搜索词和命中片段清晰可见。"]
  },
  {
    id: "APP-FILE-14",
    group: "文件",
    title: "清除搜索记录",
    priority: "P0",
    goal: "在清空最近搜索前进行二次确认，避免误删搜索记录。",
    entry: "搜索页点击最近搜索右侧的镂空垃圾桶按钮。",
    fields: [["recent_searches", "最近搜索", "本地缓存"], ["confirm_action", "确认操作", "用户点击"], ["clear_result", "清除结果", "本地缓存"]],
    rules: ["清除搜索记录以底部确认弹窗展示。", "弹窗需要说明确认清除全部搜索记录以及清除后无法恢复。", "点击清除后清空本地最近搜索并返回搜索页。", "点击取消或遮罩返回搜索页，不清除记录。"],
    states: ["待确认", "已清除", "已取消"],
    deps: ["本地缓存：最近搜索记录。"],
    acceptance: ["搜索页垃圾桶按钮进入清除搜索记录弹窗。", "弹窗包含清除和取消两个操作。", "清除按钮使用浅红底和红色文字，取消按钮为白底描边。"]
  },
  {
    id: "APP-REC-02",
    group: "录音",
    title: "录音方式选择",
    priority: "P0",
    goal: "点击底部中间录音按钮后选择智能识别场景或手动场景模板。",
    entry: "文件首页或任意底部导航页面点击录音主按钮。",
    fields: [["record_mode", "录音方式", "用户选择"], ["default_record_mode", "下次默认", "本地设置/云端偏好"], ["device_state", "设备可录音状态", "BLE 状态包"]],
    rules: ["进入弹层前已完成登录、绑定、设备连接、电量、存储检查。", "开始录音（智能识别场景）可勾选下次默认。", "选择录音场景进入模板列表。"],
    states: ["默认", "已设置下次默认", "设备未连接", "低电量", "存储不足"],
    deps: ["BLE 命令包：开始录音，协议待固件定义。", "本地设置：默认录音方式保存与恢复。"],
    acceptance: ["弹层必须说明当前使用硬件录音。", "点击开始录音后进入录音中页。"]
  },
  {
    id: "APP-REC-03",
    group: "录音",
    title: "录音场景选择",
    priority: "P0",
    goal: "选择录音场景模板后开始硬件录音。",
    entry: "录音方式选择弹层点击选择录音场景。",
    fields: [["scene_template_id", "场景模板", "本地配置/云端模板"], ["scene_name", "场景名称", "本地配置/云端模板"], ["scene_desc", "场景说明", "本地配置/云端模板"]],
    rules: ["模板列表当前待确认，首版可包含通用、会议、访谈、课堂、电话。", "模板可能影响后续 AI 笔记结构，需与 AI 服务字段一致。"],
    states: ["模板加载中", "加载失败", "已选择", "可开始录音"],
    deps: ["AI 模板服务或本地模板配置，接口待后端定义。"],
    acceptance: ["用户选择模板并点击开始录音后进入录音中页。", "模板失败时可使用通用模板降级。"]
  },
  {
    id: "APP-REC-04",
    group: "录音",
    title: "录音中",
    priority: "P0",
    goal: "明确证明硬件正在录音，并支持标记、暂停、继续和结束。",
    entry: "硬件开始录音成功后。",
    fields: [["record_duration", "录音时长", "BLE 状态包/本地计时"], ["record_state", "录音状态", "BLE 状态包"], ["battery_level", "电量", "BLE 状态包"], ["storage_remaining", "存储", "BLE 状态包"], ["marker_list", "标记时间轴", "BLE 标记包/本地数据库"]],
    rules: ["暂停后停留录音中页。", "结束录音后直接回到文件首页；如果存在同步中音频，在首页同步状态条展示进度。", "断连时提示设备仍在本地录音。"],
    states: ["录音中", "暂停中", "设备断连但仍录音", "低电量", "存储不足"],
    deps: ["BLE 命令包：暂停、继续、结束、添加标记。", "BLE 状态包：录音状态、电量、存储。"],
    acceptance: ["计时、连接、电量、存储、标记和结束按钮清晰可见。", "点击暂停后按钮变为继续。", "点击结束直接回到文件首页。"]
  },
  {
    id: "APP-FILE-01",
    group: "文件",
    title: "文件详情",
    priority: "P0",
    goal: "集中播放音频、查看 AI 转录后的大纲、智能总结、文字记录、待办事项和思维导图。",
    entry: "文件列表点击文件、同步完成通知、任务完成通知。",
    fields: [["display_title", "展示标题", "文件名/云端同步数据/AI 摘要"], ["title_source", "标题来源", "本地数据库/云端/AI"], ["ai_tags", "AI 标签", "AI 会议总结"], ["audio_progress", "播放进度", "本地播放器"], ["skip_silence_enabled", "跳过空白片段", "播放器设置"], ["playback_rate", "播放倍速", "播放器设置"], ["ai_sections", "AI 内容结构", "AI 模板"], ["note_question", "笔记提问", "AI 问答"], ["share_state", "分享状态", "云端分享"]],
    rules: ["开启同步云端时，标题优先根据云端同步数据提炼。", "未开启同步云端时，标题默认使用文件名称。", "生成 AI 会议摘要后，标题根据 AI 会议内容重新提炼总结。", "生成 AI 会议总结后，根据会议内容提取关键标签。", "播放器进度条支持点击和拖动调整音频进度。", "播放器控制区包含音频设置、快退 15 秒、播放、快进 15 秒、倍速，不展示额外方向箭头。", "播放器下方快速定位标签根据 AI 模板结构展示，点击后定位到对应内容区域。", "页面底部固定展示对此笔记提问输入框。", "右上角分享按钮打开分享弹窗，三个点打开更多操作浮层。"],
    states: ["未生成 AI 摘要", "AI 已生成", "音频设置", "倍速选择", "分享", "更多操作", "文件损坏", "删除确认"],
    deps: ["本地播放器：进度、跳转、快退快进、倍速。", "音频分析：静音/无声片段识别。", "转写服务：文字记录和时间戳。", "AI 服务：标题、标签、大纲、总结、待办、思维导图、笔记问答。", "云端分享：分享链接和权限。"],
    acceptance: ["文件详情播放器样式参考 Plaud 文件详情。", "播放器下方必须有大纲、智能总结、文字记录、待办事项、思维导图快速定位标签。", "思维导图按卡片预览呈现。", "音频设置和倍速按钮能打开对应弹窗。", "底部有对此笔记提问输入框。", "标题和标签规则在字段与交互说明中明确。"],
    prototypeLinks: [["文件详情已转写", "APP-FILE-01"], ["文件详情为空", "APP-FILE-10"]]
  },
  {
    id: "APP-FILE-10",
    group: "文件",
    title: "文件详情为空",
    priority: "P0",
    goal: "展示音频已存在但尚未生成 AI 笔记时的文件详情空状态。",
    entry: "文件列表点击未生成 AI 摘要的文件、转写/总结尚未生成完成。",
    fields: [["display_title", "展示标题", "文件名/云端同步数据"], ["audio_progress", "播放进度", "本地播放器"], ["generation_state", "生成状态", "AI 服务"], ["estimated_audio_duration", "音频时长", "本地播放器"]],
    rules: ["空状态保留标题、创建时间、音频播放器和右上角操作。", "标签区仅显示添加标签入口。", "内容区显示可生成笔记提示，底部固定生成主按钮。", "点击生成先进入生成方式与用量确认弹层。"],
    states: ["未生成 AI 摘要", "可生成笔记", "生成中", "生成失败"],
    deps: ["本地播放器。", "AI 服务：生成入口和状态。", "用量服务：生成前确认。"],
    acceptance: ["空详情样式参考 Plaud 未生成笔记页面。", "空状态不展示已转写内容和笔记提问框。", "底部生成按钮清晰可见。"],
    prototypeLinks: [["文件详情已转写", "APP-FILE-01"], ["文件详情为空", "APP-FILE-10"], ["生成方式选择", "APP-AI-01"], ["生成中", "APP-FILE-15"]]
  },
  {
    id: "APP-FILE-15",
    group: "文件",
    title: "文件详情生成中",
    priority: "P0",
    goal: "展示 AI 笔记生成中的文件详情状态，告知用户可离开页面且不会影响生成进度。",
    entry: "生成方式与用量确认点击立即生成。",
    fields: [["display_title", "展示标题", "文件名/云端同步数据"], ["audio_progress", "播放进度", "本地播放器"], ["generation_state", "生成状态", "AI 服务"], ["generation_hint", "生成提示", "本地文案"]],
    rules: ["生成中页面保留文件详情顶部信息和播放器。", "内容区显示骨架占位和生成中提示。", "生成完成后直接进入文件详情已转写状态。", "离开页面不影响生成进度。"],
    states: ["生成中", "生成完成", "生成失败"],
    deps: ["AI 服务：生成状态轮询或推送。", "本地任务状态：离开页面后继续跟踪。"],
    acceptance: ["文件列表和文件详情为空点击生成都先进入生成方式与用量确认。", "生成中页面样式参考提供的生成中截图。", "完成状态进入文件详情页，不再停留在生成确认页。"],
    prototypeLinks: [["生成完成", "APP-FILE-01"], ["文件详情为空", "APP-FILE-10"]]
  },
  {
    id: "APP-FILE-04",
    group: "文件",
    title: "音频设置",
    priority: "P0",
    goal: "从文件详情播放器调整音频播放设置。",
    entry: "文件详情播放器点击筛选/音频设置按钮。",
    fields: [["skip_silence_enabled", "跳过空白片段", "播放器设置/音频分析"]],
    rules: ["开启后播放时自动跳过会议中没有声音或静音的片段。", "设置以底部弹窗展示，关闭后回到文件详情。"],
    states: ["默认关闭", "已开启", "关闭弹窗"],
    deps: ["播放器：跳过静音片段。", "音频分析：静音片段识别。"],
    acceptance: ["音频设置弹窗包含跳过空白片段开关和取消入口。"]
  },
  {
    id: "APP-FILE-05",
    group: "文件",
    title: "倍速",
    priority: "P0",
    goal: "从文件详情播放器选择音频播放倍速。",
    entry: "文件详情播放器点击倍速按钮。",
    fields: [["playback_rate", "当前倍速", "播放器设置"]],
    rules: ["支持 0.5X、1.0X、1.25X、1.5X、2.0X、3.0X。", "当前倍速用勾选状态标识，关闭后回到文件详情。"],
    states: ["0.5X", "1.0X", "1.25X", "1.5X", "2.0X", "3.0X"],
    deps: ["本地播放器：变速播放。"],
    acceptance: ["倍速弹窗展示全部可选倍速，并标识当前 1.0X。"]
  },
  {
    id: "APP-FILE-06",
    group: "文件",
    title: "分享",
    priority: "P0",
    goal: "从文件详情分享当前文件的链接、文本内容或导出文件。",
    entry: "文件详情右上角点击分享按钮。",
    fields: [["share_target", "分享目标", "用户选择"], ["share_link_state", "分享链接状态", "云端分享"], ["copy_content_type", "复制内容", "转写/笔记"], ["export_content_type", "导出内容", "录音/转写/笔记/思维导图"]],
    rules: ["分享按钮打开底部分享弹窗。", "分享链接进入分享链接设置页。", "复制到剪贴板按内容类型区分转写和笔记。", "导出文件支持录音、转写、笔记和思维导图。"],
    states: ["默认", "分享链接", "复制到剪贴板", "导出文件"],
    deps: ["云端分享链接。", "剪贴板权限。", "导出文件生成。"],
    acceptance: ["分享弹窗包含分享链接、复制到剪贴板和导出文件三组内容。"]
  },
  {
    id: "APP-FILE-07",
    group: "文件",
    title: "更多操作",
    priority: "P0",
    goal: "在文件详情中提供移动、查找替换、重新转写、说话人命名和回收站操作。",
    entry: "文件详情右上角点击三个点。",
    fields: [["folder_id", "目标文件夹", "本地数据库"], ["transcript_text", "转写文本", "转写服务"], ["speaker_map", "说话人命名", "本地数据库/AI"], ["trash_state", "回收站状态", "本地数据库"]],
    rules: ["更多操作以右上角浮层展示，不占用内容区域。", "移至回收站使用红色危险操作样式。"],
    states: ["默认", "移动文件夹", "查找替换", "重新转写", "说话人命名", "移至回收站"],
    deps: ["本地文件夹。", "转写服务。", "本地数据库回收站。"],
    acceptance: ["更多浮层包含五个操作，危险操作视觉明确。"]
  },
  {
    id: "APP-FILE-16",
    group: "文件",
    title: "移动到文件夹",
    priority: "P0",
    goal: "从文件详情选择目标文件夹并移动当前文件。",
    entry: "更多操作点击移至文件夹。",
    fields: [["folder_id", "目标文件夹", "本地数据库"], ["folder_count", "文件夹文件数", "本地数据库"], ["move_enabled", "是否可移动", "用户选择"]],
    rules: ["移动到以底部弹层展示。", "默认选择全部文件。", "未选择可移动目标时移动按钮置灰。", "可新增我的文件夹。"],
    states: ["默认", "已选择文件夹", "可移动", "移动中"],
    deps: ["本地文件夹。", "本地数据库文件归属。"],
    acceptance: ["弹层样式参考移动到截图。", "包含全部文件、我的文件夹、Andy、工作和移动到按钮。"]
  },
  {
    id: "APP-FILE-17",
    group: "文件",
    title: "查找和替换",
    priority: "P0",
    goal: "在文件转写文本中查找关键词并替换。",
    entry: "更多操作点击查找和替换。",
    fields: [["find_text", "查找文本", "用户输入"], ["replace_text", "替换文本", "用户输入"], ["match_count", "匹配数量", "本地文本索引"]],
    rules: ["查找和替换在文件详情底部展示输入栏并唤起键盘。", "未输入或无匹配时显示 0/0 且替换按钮置灰。", "关闭后回到文件详情。"],
    states: ["待输入", "无匹配", "有匹配", "替换中"],
    deps: ["转写文本索引。", "本地文本替换能力。"],
    acceptance: ["页面样式参考查找和替换截图。", "展示查找、替换为、上下条和关闭按钮。"]
  },
  {
    id: "APP-FILE-18",
    group: "文件",
    title: "重新转写提醒",
    priority: "P0",
    goal: "重新转写前提示会消耗转写时长并删除当前录音的所有笔记。",
    entry: "更多操作点击重新转写。",
    fields: [["transcribe_duration", "转写时长", "音频时长"], ["current_notes", "当前笔记", "AI 内容"], ["confirm_action", "确认操作", "用户点击"]],
    rules: ["重新转写必须二次确认。", "确认后进入生成中状态并重新处理文件。", "取消返回文件详情。"],
    states: ["待确认", "重新转写中", "已取消"],
    deps: ["转写服务。", "AI 内容删除策略。", "用量服务。"],
    acceptance: ["弹层样式参考重新转写提醒截图。", "主按钮为重新转写，次按钮为取消。"]
  },
  {
    id: "APP-FILE-19",
    group: "文件",
    title: "为说话人命名",
    priority: "P0",
    goal: "查看每位说话人的片段并为说话人命名。",
    entry: "更多操作点击为说话人命名。",
    fields: [["speaker_name", "说话人名称", "用户输入"], ["speaker_duration", "说话时长", "说话人分离结果"], ["speaker_segments", "说话片段", "转写服务"]],
    rules: ["以底部大弹层展示说话人列表。", "每位说话人包含可编辑名称、总时长、片段播放和片段预览。", "确认后自动更新本文档中的说话人名称。"],
    states: ["默认", "编辑中", "保存中", "保存成功"],
    deps: ["说话人分离。", "转写片段索引。", "本地数据库。"],
    acceptance: ["弹层样式参考为说话人命名截图。", "底部包含取消和确认按钮。"]
  },
  {
    id: "APP-FILE-08",
    group: "文件",
    title: "分享链接",
    priority: "P0",
    goal: "生成文件分享链接，并选择链接中包含的内容与有效期。",
    entry: "分享弹窗点击分享链接。",
    fields: [["share_scope", "包含内容", "用户选择"], ["link_expire_at", "链接有效期", "用户选择"], ["share_preview", "分享预览", "转写/总结"], ["share_url", "分享链接", "云端分享"]],
    rules: ["默认包含全部内容。", "默认链接永久有效。", "点击包含内容进入查看权限弹窗。", "点击链接有效期进入有效期选择弹窗。", "点击分享链接按钮后进入已生成分享链接页面。"],
    states: ["默认", "选择内容", "生成中", "已生成"],
    deps: ["云端分享链接生成。", "内容权限配置。"],
    acceptance: ["分享链接页包含说明、包含内容入口、链接有效期入口、预览卡和分享链接主按钮。"]
  },
  {
    id: "APP-FILE-09",
    group: "文件",
    title: "查看权限",
    priority: "P0",
    goal: "选择分享链接中允许查看的文件内容。",
    entry: "分享链接页点击选择包含内容。",
    fields: [["recording_allowed", "录音", "用户选择"], ["transcript_allowed", "转写", "用户选择"], ["marks_allowed", "标记", "用户选择"], ["summary_allowed", "总结", "用户选择"]],
    rules: ["默认录音、转写、标记、总结均勾选。", "应用后回到已生成分享链接页并更新包含内容。"],
    states: ["全部内容", "部分内容", "应用"],
    deps: ["云端分享权限。"],
    acceptance: ["查看权限弹窗包含录音、转写、标记、总结四项和更新按钮。"]
  },
  {
    id: "APP-FILE-20",
    group: "文件",
    title: "已生成分享链接",
    priority: "P0",
    goal: "展示已生成的分享链接，并允许继续调整包含内容和链接有效期。",
    entry: "分享链接页点击分享链接按钮生成成功后。",
    fields: [["share_scope", "包含内容", "用户选择"], ["link_expire_at", "链接有效期", "用户选择"], ["share_url", "分享链接", "云端分享"]],
    rules: ["生成后保留包含内容和有效期设置入口。", "点击选择包含内容进入查看权限弹窗。", "点击链接有效期进入有效期选择弹窗。", "移除链接后回到文件详情。"],
    states: ["已生成", "复制链接", "移除链接", "更新权限", "更新有效期"],
    deps: ["云端分享链接生成与更新。"],
    acceptance: ["已生成分享链接页展示可复制链接、包含内容、有效期和移除链接入口。"]
  },
  {
    id: "APP-FILE-21",
    group: "文件",
    title: "链接有效期",
    priority: "P0",
    goal: "选择分享链接的有效期。",
    entry: "分享链接页点击链接有效期。",
    fields: [["link_expire_at", "链接有效期", "用户选择"], ["custom_date", "自定义日期", "用户选择"]],
    rules: ["有效期选择以浮层展示。", "选项包含永久有效、7 天后失效、14 天后失效、30 天后失效、自定义日期。", "选择自定义日期进入日期选择弹窗。"],
    states: ["永久有效", "7 天", "14 天", "30 天", "自定义日期"],
    deps: ["云端分享链接有效期配置。"],
    acceptance: ["点击链接有效期后展示有效期选项浮层。", "点击自定义日期进入链接有效期日期选择页。"]
  },
  {
    id: "APP-FILE-22",
    group: "文件",
    title: "链接有效期自定义日期",
    priority: "P0",
    goal: "通过日历选择分享链接自定义失效日期。",
    entry: "链接有效期弹窗点击自定义日期。",
    fields: [["selected_month", "月份", "用户选择"], ["selected_date", "日期", "用户选择"]],
    rules: ["顶部包含取消、标题和保存。", "默认展示当前月份日历。", "保存后回到已生成分享链接页并更新链接有效期。"],
    states: ["默认日期", "切换月份", "保存"],
    deps: ["本地日期选择组件。", "云端分享链接有效期配置。"],
    acceptance: ["自定义日期弹窗样式参考链接有效期截图。", "保存后回到已生成分享链接页。"]
  },
  {
    id: "APP-AI-01",
    group: "AI",
    title: "生成方式与用量确认",
    priority: "P0",
    goal: "作为文件生成前的方式选择和用量确认弹层，选择自动或自定义并确认用量。",
    entry: "文件列表点击生成、文件详情为空点击生成。",
    fields: [["generation_mode", "生成方式", "用户选择"], ["estimated_minutes", "预计消耗", "用量服务"], ["remaining_minutes", "剩余额度", "用量服务"], ["speaker_diarization_enabled", "自动标注说话人", "用户选择"], ["audio_language", "音频语言", "用户选择"], ["ai_model", "AI 模型", "用户选择"]],
    rules: ["文件列表和文件详情为空的生成入口必须先进入本页。", "点击立即生成后进入文件详情生成中页面。", "自动生成使用默认策略。", "自定义生成默认自动标注说话人开启、语言 English、AI 模型自动。", "额度不足时禁止提交。"],
    states: ["自动生成", "自定义生成", "额度充足", "额度不足", "模板加载失败"],
    deps: ["用量服务：预估分钟、余额。", "AI 服务：模板列表、模型列表。", "云端文件：上传凭证。"],
    acceptance: ["弹层展示预计消耗、剩余额度和云端处理提示。", "立即生成进入文件详情生成中。"]
  },
  {
    id: "APP-ME-02",
    group: "我的",
    title: "我的",
    priority: "P0",
    goal: "展示会员状态、剩余转写分钟、云同步、购买与支持入口，并承载隐私与安全入口。",
    entry: "底部导航点击我的。",
    fields: [["membership_level", "会员等级", "用量服务/会员服务"], ["remaining_minutes", "剩余分钟", "用量服务"], ["cloud_sync_state", "私有云同步", "云端账号"], ["billing_support_items", "账单与支持", "本地配置/客服系统"], ["privacy_security", "隐私与安全", "设置页"]],
    rules: ["顶部为黑色会员状态区，展示标准会员、剩余分钟、进度条和升级入口。", "内容区按发现、账单与支持、隐私与安全分组。", "隐私与安全入口进入隐私与安全页。", "购买、兑换码、账单、恢复购买、使用记录、常见问题为后续入口占位。"],
    states: ["标准会员", "剩余分钟充足", "云同步未开启", "入口占位"],
    deps: ["用量服务：余额、会员状态。", "云端账号：私有云同步状态。", "客服与支付入口待定义。"],
    acceptance: ["我的页样式参考截图，包含黑色会员头部、发现区、账单与支持区和隐私与安全入口。", "底部我的 Tab 处于选中态。"]
  },
  {
    id: "APP-ME-05",
    group: "我的",
    title: "私有云同步",
    priority: "P0",
    goal: "开启和管理私有云同步、Wi-Fi 同步策略、云端存储空间与云端录音删除。",
    entry: "我的页点击私有云同步。",
    fields: [["cloud_sync_enabled", "私有云同步", "云端账号"], ["wifi_only_sync", "仅 Wi-Fi 同步", "本地设置"], ["cloud_storage_usage", "云端存储占用", "云端文件"], ["delete_cloud_recordings", "删除云端录音", "云端文件"]],
    rules: ["开启私有云同步后自动备份数据，支持 App 与 Web 多端同步。", "仅 Wi-Fi 同步为从属开关，未开启云同步时不可用。", "管理存储空间进入本地缓存清理页。", "删除云端录音进入危险操作确认链路。"],
    states: ["云同步开启", "Wi-Fi 同步关闭", "管理存储", "删除云端录音"],
    deps: ["云端账号：同步开关与云端容量。", "本地缓存：已同步录音体积。"],
    acceptance: ["私有云同步页样式参考截图。", "管理存储空间和删除云端录音入口可点击。"]
  },
  {
    id: "APP-ME-06",
    group: "我的",
    title: "优化 App 储存空间",
    priority: "P1",
    goal: "管理本地已同步录音缓存，释放 App 存储空间。",
    entry: "私有云同步页点击管理存储空间。",
    fields: [["optimize_storage_enabled", "优化 App 储存空间", "本地设置"], ["recording_cache_size", "录音文件体积", "本地缓存"], ["clear_local_cache", "清理本地缓存", "本地缓存"]],
    rules: ["开启后不再自动下载云端录音。", "清理仅移除本地已同步录音，云端录音保留。", "点击清理进入二次确认弹窗。"],
    states: ["优化开启", "本地缓存可清理"],
    deps: ["本地缓存：录音文件大小。", "云端文件：已同步状态。"],
    acceptance: ["页面结构参考管理存储空间截图。", "清理入口进入确认弹窗。"]
  },
  {
    id: "APP-ME-07",
    group: "我的",
    title: "清理 App 存储空间",
    priority: "P1",
    goal: "确认是否清理已同步录音的本地缓存。",
    entry: "优化 App 储存空间页点击清理 App 存储空间。",
    fields: [["clear_scope", "清理范围", "本地缓存"], ["confirm_action", "确认清理", "用户操作"]],
    rules: ["只清理已同步到云端的本地录音。", "清理后用户可重新下载。", "取消返回管理存储空间页。"],
    states: ["待确认", "取消", "确认清理"],
    deps: ["本地缓存。"],
    acceptance: ["确认弹窗文案和按钮参考截图。"]
  },
  {
    id: "APP-ME-13",
    group: "我的",
    title: "删除云端的录音",
    priority: "P1",
    goal: "提供删除云端所有录音的危险操作入口。",
    entry: "私有云同步页点击删除云端的录音。",
    fields: [["delete_cloud_recordings", "删除云端所有录音", "云端文件"]],
    rules: ["页面仅展示危险入口和说明。", "点击入口进入二次确认弹窗。"],
    states: ["危险入口", "待确认"],
    deps: ["云端文件。"],
    acceptance: ["红色危险入口样式参考截图。"]
  },
  {
    id: "APP-ME-14",
    group: "我的",
    title: "删除云端录音确认",
    priority: "P1",
    goal: "确认云端所有录音永久删除。",
    entry: "删除云端的录音页点击删除云端的所有录音。",
    fields: [["delete_scope", "删除范围", "云端文件"], ["confirm_delete", "确认删除", "用户操作"]],
    rules: ["删除后云端及所有同步 App 中的录音永久删除。", "取消返回删除云端录音页。"],
    states: ["待确认", "取消", "确认删除"],
    deps: ["云端文件。"],
    acceptance: ["危险确认弹窗样式参考截图。"]
  },
  {
    id: "APP-ME-08",
    group: "我的",
    title: "兑换码",
    priority: "P1",
    goal: "输入兑换码并提交兑换。",
    entry: "我的页点击兑换码。",
    fields: [["redeem_code", "兑换码", "用户输入"], ["redeem_state", "兑换状态", "用量服务"]],
    rules: ["兑换码区分大小写。", "未输入时兑换按钮置灰。", "输入框聚焦时展示键盘状态。"],
    states: ["未输入", "输入中", "提交中", "兑换成功", "兑换失败"],
    deps: ["用量服务：兑换码校验。"],
    acceptance: ["兑换码弹窗样式参考截图。"]
  },
  {
    id: "APP-ME-15",
    group: "我的",
    title: "兑换码输入中",
    priority: "P1",
    goal: "展示兑换码输入框聚焦和系统键盘状态。",
    entry: "兑换码弹窗点击输入框。",
    fields: [["redeem_code_input", "兑换码输入", "用户输入"]],
    rules: ["键盘弹起时弹窗上移。", "兑换码未完整输入时按钮仍置灰。"],
    states: ["键盘弹起", "输入中"],
    deps: ["系统键盘。"],
    acceptance: ["键盘状态参考截图。"]
  },
  {
    id: "APP-ME-09",
    group: "我的",
    title: "账单详情",
    priority: "P1",
    goal: "展示账单记录空态或账单列表。",
    entry: "我的页点击账单详情。",
    fields: [["billing_records", "账单记录", "支付系统"]],
    rules: ["无账单时展示空态。", "有账单时可展示账单列表，后续补充明细。"],
    states: ["暂无账单记录", "有账单记录"],
    deps: ["支付系统。"],
    acceptance: ["空态参考账单详情截图。"]
  },
  {
    id: "APP-ME-10",
    group: "我的",
    title: "恢复购买中",
    priority: "P1",
    goal: "展示恢复购买请求处理中状态。",
    entry: "我的页点击恢复购买。",
    fields: [["restore_state", "恢复状态", "支付系统"]],
    rules: ["点击恢复购买后展示加载态。", "未找到购买记录时进入失败提示弹窗。"],
    states: ["加载中", "未找到记录"],
    deps: ["支付系统。"],
    acceptance: ["加载态参考截图。"],
    prototypeLinks: [["未找到购买记录", "APP-ME-11"]]
  },
  {
    id: "APP-ME-11",
    group: "我的",
    title: "恢复购买失败",
    priority: "P1",
    goal: "提示未找到以前的购买记录。",
    entry: "恢复购买中未找到历史购买。",
    fields: [["restore_error", "恢复失败原因", "支付系统"]],
    rules: ["用户确认后返回我的页。", "提示查看收据或订阅历史记录后重试。"],
    states: ["未找到购买记录"],
    deps: ["支付系统。"],
    acceptance: ["失败弹窗参考截图。"]
  },
  {
    id: "APP-ME-12",
    group: "我的",
    title: "使用记录",
    priority: "P1",
    goal: "按日期展示转写用量记录和消耗时长。",
    entry: "我的页点击使用记录。",
    fields: [["usage_date", "使用日期", "用量服务"], ["usage_duration", "消耗时长", "用量服务"]],
    rules: ["列表按时间倒序。", "点击单条记录后续可进入用量明细。"],
    states: ["有记录", "加载更多"],
    deps: ["用量服务。"],
    acceptance: ["使用记录列表样式参考截图。"]
  },
  {
    id: "APP-DEV-03",
    group: "设置",
    title: "设备详情",
    priority: "P0",
    goal: "管理已绑定设备、连接状态、解绑、恢复出厂和 OTA 占位。",
    entry: "文件首页设备卡、我的设备管理。",
    fields: [["device_name", "设备名", "本地数据库/云端设备"], ["firmware_version", "固件版本", "BLE/云端设备"], ["battery_level", "电量", "BLE 状态包"], ["storage_usage", "存储占用", "BLE 状态包"], ["sync_state", "同步状态", "本地数据库"]],
    rules: ["设备详情显示连接、电量、存储、同步状态。", "恢复出厂触发方式待确认。", "低电量禁止 OTA 为 P1 占位规则。"],
    states: ["已连接", "未连接", "同步中", "低电量", "解绑确认", "恢复出厂确认"],
    deps: ["BLE 状态包、云端设备、固件版本能力，协议待定义。"],
    acceptance: ["重连、解绑、恢复出厂入口可见。", "危险操作有二次确认。"]
  },
  {
    id: "APP-ME-04",
    group: "设置",
    title: "隐私与安全",
    priority: "P0",
    goal: "管理 AI 授权、云端删除、账号删除、隐私政策和录音合规提示。",
    entry: "我的首页、首次协议、设置页。",
    fields: [["ai_data_opt_in", "AI 数据授权", "云端账号"], ["delete_cloud_files", "删除云端文件", "云端文件"], ["delete_account", "账号删除", "云端账号"], ["diagnostic_upload", "日志上传授权", "诊断服务"]],
    rules: ["AI 数据改进授权独立开关，默认不用于训练。", "云端删除和账号删除需二次确认。", "美国/日本隐私政策和录音同意提示需法务确认。"],
    states: ["授权关闭", "授权开启", "删除确认", "删除中", "删除失败", "法务待确认"],
    deps: ["云端账号、云端文件、诊断服务、法务文案。"],
    acceptance: ["用户能找到数据删除和账号删除入口。", "日志上传必须有授权说明。"]
  },
  {
    id: "APP-ERR-01",
    group: "异常",
    title: "异常状态",
    priority: "P0",
    goal: "统一展示未登录、未绑定、权限、设备、同步、上传、转写、AI 和额度异常。",
    entry: "任一功能前置条件失败或任务失败。",
    fields: [["error_code", "错误码", "BLE/云端/AI"], ["error_title", "异常标题", "客户端映射"], ["error_action", "下一步", "客户端规则"], ["diagnostic_id", "诊断 ID", "诊断服务"]],
    rules: ["异常必须说明原因、影响范围和下一步。", "转写失败必须提示额度返还。", "BLE 错误码待固件定义。"],
    states: ["未登录", "未绑定", "权限拒绝", "设备未连接", "低电量", "存储不足", "同步失败", "上传失败", "转写失败", "AI 失败", "额度不足"],
    deps: ["BLE 错误码、云端错误码、AI 错误码、诊断服务。"],
    acceptance: ["每个异常都有主操作和次操作。", "不会只显示技术错误码。"]
  }
];

let currentPageId = new URLSearchParams(window.location.search).get("page") || "APP-PRD-00";
if (currentPageId === "APP-HOME-02") currentPageId = "APP-HOME-01";
let previousPageId = null;
let fileDetailTab = "transcript";
let recordPaused = false;
let generationMode = "custom";

function h(text) {
  return String(text ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function pageById(id) {
  return pages.find((page) => page.id === id) || pages[0];
}

function go(id) {
  previousPageId = currentPageId;
  currentPageId = id === "APP-HOME-02" ? "APP-HOME-01" : id;
  render();
}

function chip(label, tone = "") {
  return `<span class="chip ${tone}">${h(label)}</span>`;
}

function appTop(title, action = "", back = null) {
  const actionNode = action === "search"
    ? `<button class="icon-btn search-top-btn" data-go="APP-FILE-02" aria-label="搜索"></button>`
    : action ? `<button class="text-btn">${h(action)}</button>` : `<span style="width:34px"></span>`;
  return `
    <div class="statusbar"><span>9:41</span><span>5G</span><span>82%</span></div>
    <div class="app-top">
      ${back ? `<button class="icon-btn" data-go="${back}" aria-label="返回">‹</button>` : `<span style="width:34px"></span>`}
      <h2>${h(title)}</h2>
      ${actionNode}
    </div>
  `;
}

function card(title, body, tone = "") {
  return `<section class="card ${tone}"><div class="card-title"><strong>${h(title)}</strong></div>${body}</section>`;
}

function row(label, value) {
  return `<div class="row"><span>${h(label)}</span><strong>${h(value)}</strong></div>`;
}

function metrics(items) {
  return `<div class="metrics">${items.map(([label, value]) => `<div class="metric"><label>${h(label)}</label><b>${h(value)}</b></div>`).join("")}</div>`;
}

function progress(label, percent) {
  return `<div class="row"><span>${h(label)}</span><strong>${percent}%</strong></div><div class="progress"><b style="width:${percent}%"></b></div>`;
}

function wave() {
  return `<div class="wave">${waveHeights.map((height) => `<i style="height:${height}px"></i>`).join("")}</div>`;
}

function fileCard(file) {
  return `
    <div class="file-card">
      <div>
        <p class="file-name">${h(file.name)}</p>
        <div class="file-meta">${h(file.meta)}</div>
        <div class="file-tags">${chip(file.source, file.source === "硬件录音" ? "blue" : "purple")}${chip(file.state, file.tone)}</div>
      </div>
      <button class="${file.actionTone === "secondary" ? "secondary-btn" : "primary-btn"}" style="width:72px;min-height:38px" data-go="${file.go}">${h(file.action)}</button>
    </div>
  `;
}

function bottom(active = "files") {
  return `
    <nav class="bottom-nav">
      <button class="${active === "files" ? "active" : ""}" data-go="APP-HOME-01">文件</button>
      <button class="record-fab ${active === "record" ? "recording" : ""}" data-go="APP-REC-02" aria-label="录音">
        <span class="record-fab-icon" aria-hidden="true"><i></i><i></i><i></i><b></b></span>
      </button>
      <button class="${active === "me" ? "active" : ""}" data-go="APP-ME-02">我的</button>
    </nav>
  `;
}

function screen(content, opts = {}) {
  return `${appTop(opts.title || pageById(currentPageId).title, opts.action || "", opts.back)}
    <main class="screen-content ${opts.compact ? "compact" : ""}">${content}</main>
    ${opts.bottom === false ? "" : bottom(opts.active || "files")}
  `;
}

function renderPrdOverview() {
  return `
    <section class="prd-doc-window">
      <iframe src="./prd-preview.html" title="AI录音卡App需求文档_v3.0.md"></iframe>
    </section>
  `;
}

function authScreen(title, content, opts = {}) {
  return `${appTop(" ", "", opts.back || "APP-ONB-01")}
    <main class="auth-screen ${opts.keyboard ? "with-keyboard" : ""}">
      <h1>${h(title)}</h1>
      ${content}
    </main>
    ${opts.keyboard ? keyboardMock(opts.keyboard) : ""}
  `;
}

function authField(value, opts = {}) {
  const actionNode = opts.eye ? `<b class="eye-icon" aria-label="显示或隐藏密码"></b>` : opts.action ? `<b>${h(opts.action)}</b>` : "";
  return `<label class="auth-field ${opts.focus ? "focus" : ""} ${opts.filled ? "filled" : ""}"><span>${h(value)}</span>${actionNode}</label>`;
}

function authAgreement() {
  return `<div class="auth-agreements">
    <div><span class="check-dot">✓</span><p>我同意在中国注册我的账号，并接受用户协议和隐私政策。</p></div>
    <div><span class="check-dot">✓</span><p>请让我及时了解 Plaud 的最新资讯和优惠活动。</p></div>
  </div>`;
}

function keyboardMock(type = "number") {
  const keys = type === "number"
    ? ["%", "1", "2", "3", "⌫", "+", "4", "5", "6", "空格", "-", "7", "8", "9", "@", "符号", "返回", "0", ".", "完成"]
    : [",", "@#", "ABC", "DEF", "⌫", "。", "GHI", "JKL", "MNO", "换行", "?", "PQRS", "TUV", "WXYZ", "完成", "符号", "123", " ", "中英", "🎙"];
  return `<section class="keyboard-mock ${type === "text" ? "text" : ""}">
    <div class="keyboard-toolbar"><span>⌘</span><span>⌖</span><span>✂</span><span>☺</span><span>▣</span><b>🎙 点击说话</b><span>⌄</span></div>
    <div class="keyboard-grid">${keys.map((key) => `<span class="${key === "完成" ? "done" : ""}">${h(key)}</span>`).join("")}</div>
  </section>`;
}

function renderLogin() {
  return screen(`
    <div class="login-brand">AI RECORDER</div>
    <h1 class="login-title">开始使用</h1>
    <button class="auth-option" data-go="APP-ONB-04"><span class="google-mark">G</span><strong>Google 账号登录</strong></button>
    <button class="auth-option" data-go="APP-ONB-04"><span class="apple-mark">●</span><strong>Apple 账号登录</strong></button>
    <div class="login-divider"><span></span><b>或</b><span></span></div>
    <label class="input-box">邮箱地址</label>
    <label class="input-box">密码</label>
    <button class="link-btn" data-go="APP-ONB-05">忘记密码?</button>
    <button class="primary-btn login-submit" data-go="APP-ONB-04">登录</button>
    <button class="link-btn center" data-go="APP-ONB-06">使用验证码登录</button>
    <p class="register-line">还没有账号？ <button class="link-btn inline" data-go="APP-ONB-02">注册</button></p>
    <div class="agreement-list">
      <div><span class="check-dot">✓</span><p>我同意注册并接受《用户协议》《隐私政策》和《AI 数据处理说明》。</p></div>
      <div><span class="check-dot">✓</span><p>请让我及时了解 AI 录音卡的产品资讯和优惠活动。</p></div>
    </div>
    <div class="trust-grid">
      <span>加密传输</span>
      <span>数据可删除</span>
      <span>AI 授权可控</span>
    </div>
  `, { title: "AI Recorder", action: "关闭", bottom: false, compact: true });
}

function renderRegister() {
  return authScreen("账号注册", `
    <div class="auth-form">
      ${authField("mhy_1126@qq.com", { action: "×", filled: true })}
      ${authField("••••••••••", { eye: true, filled: true })}
      <button class="primary-btn auth-primary" data-go="APP-ONB-03">下一步</button>
      ${authAgreement()}
    </div>
  `);
}

function renderRegisterVerify() {
  return authScreen("验证你的邮箱", `
    <p class="auth-lead">我们已经发送了一条验证码到你的邮箱<br><strong>mhy_1126@qq.com</strong></p>
    <div class="code-boxes"><span class="active"></span><span></span><span></span><span></span><span></span><span></span></div>
    <p class="resend-text">重新发送 54</p>
    <button class="primary-btn auth-primary disabled" data-go="APP-ONB-04">开始使用</button>
  `, { back: "APP-ONB-02" });
}

function renderResetPassword() {
  return authScreen("重置密码", `
    <div class="auth-form">
      ${authField("mhy_1126@qq.com", { filled: true })}
      ${authField("••••••••••", { eye: true, filled: true })}
      <button class="primary-btn auth-primary" data-go="APP-ONB-03">下一步</button>
    </div>
  `);
}

function renderCodeLogin() {
  return authScreen("邮箱登录", `
    <div class="auth-form">
      ${authField("邮箱")}
      <div class="auth-code-row">
        ${authField("验证码")}
        <button class="primary-btn">发送</button>
      </div>
      <button class="primary-btn auth-primary disabled" data-go="APP-ONB-04">登录</button>
      <button class="link-btn center" data-go="APP-ONB-01">使用密码登录</button>
      <p class="register-line">还没有账号吗？ <button class="link-btn inline" data-go="APP-ONB-02">注册</button></p>
      ${authAgreement()}
    </div>
  `);
}

function renderPermissions() {
  return screen(`
    <div class="bind-progress"><b></b><span></span><span></span></div>
    <section class="bind-intro">
      <h1>绑定你的设备</h1>
      <p class="time-hint"><span>◷</span>预计耗时 1 分钟</p>
      <p class="bind-copy">请将设备靠近手机，绑定过程中需要开启蓝牙和定位权限</p>
    </section>
    <div class="bind-bottom">
      <button class="link-btn center">还没有 AI Recorder 设备?</button>
      <button class="primary-btn" data-go="APP-DEV-01">开始</button>
    </div>
  `, { title: "绑定你的设备", back: "APP-ONB-01", bottom: false, compact: true });
}

function renderDeviceScan() {
  return screen(`
    <section class="device-search-copy">
      <h1>正在搜索...</h1>
      <p>长按录音键以开启设备</p>
    </section>
    <section class="device-art searching">
      <div class="device-wide">
        <span class="device-top"></span>
        <span class="device-body"></span>
        <span class="finger"></span>
      </div>
    </section>
  `, { title: " ", back: "APP-ONB-04", bottom: false, compact: true });
}

function renderDeviceBind() {
  return screen(`
    <section class="found-head">
      <h1>AI Recorder A1</h1>
      <p><span>SN: 8810B30293069513</span><b>?</b></p>
    </section>
    <section class="device-art found">
      <div class="device-vertical">
        <span class="device-top"></span>
        <span class="device-body"></span>
        <i>AI</i>
      </div>
    </section>
    <div class="bind-bottom found-actions">
      <button class="primary-btn" data-go="APP-HOME-01">连接 A1</button>
      <button class="link-btn center" data-go="APP-DEV-01">不是你的设备?</button>
    </div>
  `, { title: " ", back: "APP-DEV-01", bottom: false, compact: true });
}

function renderDeviceAlreadyBound() {
  return screen(`
    <section class="found-head dimmed">
      <h1>AI Recorder A1</h1>
      <p><span>SN: 8810B30293069513</span><b>?</b></p>
    </section>
    <section class="device-art found dimmed">
      <div class="device-vertical">
        <span class="device-top"></span>
        <span class="device-body"></span>
        <i>AI</i>
      </div>
    </section>
    <section class="failure-sheet">
      <h2>连接失败</h2>
      <div class="sheet-line"></div>
      <p>该设备已绑定至 <u>3*******6@qq.com</u>。<br>若要绑定至当前账号，请先登录原账号并解绑设备。</p>
      <p>如需协助，请访问 <button class="link-btn inline">帮助与支持</button></p>
      <button class="primary-btn" data-go="APP-DEV-01">好的</button>
      <button class="link-btn center">? 如何移除设备?</button>
    </section>
  `, { title: " ", back: "APP-DEV-01", bottom: false, compact: true });
}

function renderHome() {
  return screen(`
    <section class="device-strip connected" data-go="APP-DEV-03">
      <div>
        <strong>AI Recorder A1</strong>
        <span>已连接 · 电量 82% · 存储 12.4G</span>
      </div>
      <b>待机</b>
      <small>最近同步 14:22</small>
    </section>
    <section class="device-strip add-device" data-go="APP-DEV-01">
      <strong>添加设备</strong>
      <span>未连接时仅显示此入口</span>
    </section>
    <section class="sync-mini">
      <div class="sync-line"><strong>同步中</strong><span>Board meeting · 1 个文件 / 32 MB</span><b>64%</b></div>
      <div class="progress compact"><b style="width:64%"></b></div>
      <p class="caption">正在传输，等待 CRC 校验。</p>
    </section>
    <section class="card file-list-panel" id="homeFileList">
      <div class="card-title sticky-list-title">
        <button class="list-title-filter" data-go="APP-FILE-03" aria-label="文件列表筛选和排序"><strong>文件列表</strong><span></span></button>
        <button class="import-btn" data-go="APP-FILE-13">+导入音频</button>
      </div>
      ${fileCard({ name: "Board meeting", meta: "今天 14:20 · 01:12:17 · 3 个标记", source: "硬件录音", state: "未转写", tone: "amber", action: "生成", go: "APP-AI-01" })}
      ${fileCard({ name: "Interview import", meta: "昨天 19:10 · 00:34:02", source: "导入文件", state: "AI 已生成", tone: "green", action: "详情", go: "APP-FILE-01", actionTone: "secondary" })}
      ${fileCard({ name: "Lecture audio", meta: "07-05 · 00:58:20 · 已保留断点", source: "硬件录音", state: "同步失败", tone: "red", action: "重试", go: "APP-HOME-01", actionTone: "secondary" })}
      ${fileCard({ name: "Product review", meta: "07-04 · 00:26:44 · 2 个标记", source: "导入文件", state: "未转写", tone: "amber", action: "生成", go: "APP-AI-01" })}
      <button class="load-more-btn">继续下拉加载更多文件</button>
    </section>
  `, { title: "文件", action: "search", active: "files" });
}

function renderHomeTrashToast() {
  return `
    ${renderHome()}
    <div class="toast-message">已移至回收站，30天内可以操作恢复</div>
  `;
}

function renderFilterSheet() {
  const fromSearch = previousPageId === "APP-FILE-02";
  const closeTarget = fromSearch ? "APP-FILE-02" : "APP-HOME-01";
  return `
    ${fromSearch ? renderSearch() : renderHome()}
    <div class="scrim light" data-go="${closeTarget}"></div>
    <section class="filter-sheet">
      <div class="filter-head">
        <h2>筛选和排序</h2>
        <button class="close-btn" data-go="${closeTarget}" aria-label="关闭">×</button>
      </div>
      <div class="sheet-line"></div>
      <button class="sort-row">创建时间 <span>↕</span></button>
      <div class="filter-options">
        <button class="filter-option selected"><span class="file-icon folder"></span><b>全部文件 <em>(35)</em></b><i>✓</i></button>
        <button class="filter-option"><span class="file-icon tray"></span><b>未分类 <em>(35)</em></b></button>
        <button class="filter-option"><span class="file-icon trash"></span><b>回收站 <em>(1)</em></b></button>
      </div>
      <div class="sheet-line"></div>
      <div class="filter-section-title"><h3>文件夹</h3><button>＋</button></div>
      <button class="filter-option slim"><span class="file-icon folder"></span><b>Andy <em>(0)</em></b><i>...</i></button>
      <button class="filter-option slim blue"><span class="file-icon folder"></span><b>工作 <em>(0)</em></b><i>...</i></button>
      <h3 class="filter-title-alone">来自</h3>
      <div class="source-list">
        <button>Note · 对话模式 <em>(3)</em></button>
        <button>Note Pro <em>(30)</em></button>
        <button>导入 <em>(2)</em></button>
      </div>
    </section>
  `;
}

function renderImportAudioSheet() {
  return `
    ${renderHome()}
    <div class="scrim light" data-go="APP-HOME-01"></div>
    <section class="import-audio-sheet">
      <div class="sheet-header">
        <h2>导入音频</h2>
        <button data-go="APP-HOME-01" aria-label="关闭">×</button>
      </div>
      <div class="sheet-line"></div>
      <button class="import-option" data-go="APP-HOME-01">
        <span class="import-source-icon file"></span>
        <b>从文件里导入</b>
        <i>›</i>
      </button>
      <button class="import-option" data-go="APP-HOME-01">
        <span class="import-source-icon album"></span>
        <b>从相册里导入</b>
        <i>›</i>
      </button>
    </section>
  `;
}

function renderSearch() {
  return `
    <div class="statusbar"><span>9:41</span><span>5G</span><span>82%</span></div>
    <div class="search-page-top">
      <button class="icon-btn back-large" data-go="APP-HOME-01" aria-label="返回">‹</button>
      <div class="search-input" data-go="APP-FILE-12"><span></span><b>搜索或提问</b></div>
    </div>
    <main class="screen-content search-screen compact">
      <div class="search-sort-row">
        <button data-go="APP-FILE-11">创建时间 <span>↕</span></button>
      </div>
      <div class="search-divider"></div>
      <section class="recent-search-head">
        <h3>最近搜索</h3>
        <button class="trash-btn" data-go="APP-FILE-14" aria-label="清空最近搜索"></button>
      </section>
      <button class="recent-chip" data-go="APP-FILE-12">好</button>
      <h3 class="recent-days">最近 30 天</h3>
      <section class="search-result">
        <strong>2026-06-29 17:28:59</strong>
        <span>06-29 17:28</span>
      </section>
    </main>
  `;
}

function renderSearchClearConfirm() {
  return `
    ${renderSearch()}
    <div class="scrim search-clear-scrim" data-go="APP-FILE-02"></div>
    <section class="search-clear-sheet">
      <h2>清除搜索记录</h2>
      <div class="sheet-line"></div>
      <p>确认清除全部搜索记录？<br>清除后将无法恢复。</p>
      <button class="danger-soft-btn" data-go="APP-FILE-02">清除</button>
      <button class="cancel-outline-btn" data-go="APP-FILE-02">取消</button>
    </section>
  `;
}

function renderSearchTimeSheet() {
  const options = ["今天", "最近 7 天", "最近 30 天", "自定义"];
  return `
    ${renderSearch()}
    <div class="scrim search-time-scrim" data-go="APP-FILE-02"></div>
    <section class="creation-time-sheet">
      <div class="sheet-header">
        <h2>创建时间</h2>
        <button data-go="APP-FILE-02" aria-label="关闭">×</button>
      </div>
      <div class="sheet-line"></div>
      <div class="time-option-list">
        ${options.map((label) => `<button><span>${h(label)}</span><i></i></button>`).join("")}
      </div>
      <div class="time-sheet-actions">
        <button class="secondary-btn" data-go="APP-FILE-02">清除</button>
        <button class="disabled-btn" data-go="APP-FILE-02">应用</button>
      </div>
    </section>
  `;
}

function renderSearchResults() {
  const highlight = (text) => h(text).replaceAll("说", "<mark>说</mark>");
  return `
    <div class="statusbar"><span>9:41</span><span>5G</span><span>82%</span></div>
    <div class="search-page-top result">
      <button class="icon-btn back-large" data-go="APP-FILE-02" aria-label="返回">‹</button>
      <div class="search-input active"><span></span><b>说</b></div>
    </div>
    <main class="screen-content search-screen result-screen compact">
      <div class="search-divider result"></div>
      <h3 class="result-heading">相关结果</h3>
      <section class="search-result-list">
        <article class="search-result-item" data-go="APP-FILE-01">
          <h4>07-04 会议记录工具范式缺陷：音频与视觉信息未统一导致上下文断裂</h4>
          <p>${highlight("做关联起来的，就比如说哈，就你刚才说的，假如说现在我们真的是在吧吧开一个什么会，上面有那个投影...")}</p>
          <div><span>转写</span><time>7月4日 15:18</time></div>
        </article>
        <article class="search-result-item" data-go="APP-FILE-01">
          <h4>2026-06-29 16:31:40</h4>
          <p>${highlight("就是你不管怎么样，你说出去的录，它一定是要嗯通过你刚才说的那个接口去转换的。嗯，他不可能说啊不...")}</p>
          <div><span>转写</span><time>6月29日 16:31</time></div>
        </article>
      </section>
    </main>
  `;
}

function renderRecordSheet() {
  return `
    ${renderHome()}
    <div class="scrim" data-go="APP-HOME-01"></div>
    <section class="bottom-sheet">
      <div class="handle"></div>
      <div class="card-title"><strong>开始录音</strong>${chip("硬件录音", "blue")}</div>
      <div class="option selected" data-go="APP-REC-04">
        <span class="option-dot">✓</span>
        <div><strong>开始录音（智能识别场景）</strong><p class="caption">直接开始硬件录音，后续自动匹配转写与总结。</p></div>
        <span></span>
      </div>
      <div class="option" data-go="APP-REC-03">
        <span class="option-dot"></span>
        <div><strong>选择录音场景</strong><p class="caption">会议、访谈、课堂、电话、通用，模板待确认。</p></div>
        <span></span>
      </div>
      <div class="row"><span>下次默认直接开始</span><span class="toggle"></span></div>
      <button class="primary-btn" data-go="APP-REC-04">开始硬件录音</button>
    </section>
  `;
}

function renderScene() {
  const scene = (title, desc, selected = false) => `
    <div class="option ${selected ? "selected" : ""}">
      <span class="option-dot">${selected ? "✓" : ""}</span>
      <div><strong>${h(title)}</strong><p class="caption">${h(desc)}</p></div>
      <span></span>
    </div>
  `;
  return screen(`
    ${scene("通用", "不确定场景时使用，后续自动匹配模板。", true)}
    ${scene("会议", "生成会议纪要、重点和行动项。")}
    ${scene("访谈", "强化问答结构和说话人区分。")}
    ${scene("课堂", "整理知识点、摘要和复习清单。")}
    ${scene("电话", "需展示录音同意提示，文案待法务确认。")}
    <button class="primary-btn" data-go="APP-REC-04">开始录音</button>
  `, { title: "选择录音场景", back: "APP-REC-02", bottom: false });
}

function renderRecording() {
  return `
    <section class="recording-stage">
      <div class="statusbar recording-status"><span>12:42</span><span>5G</span><span>78%</span></div>
      <div class="recording-back-card"></div>
      <main class="recording-panel">
        <div class="recording-handle"></div>
        <div class="recording-top">
          <button data-action="toggle-pause">${recordPaused ? "继续" : "暂停"}</button>
          <strong><i></i>${recordPaused ? "00:00:38" : "00:00:37"}</strong>
          <button data-go="APP-HOME-01">结束</button>
        </div>
        <div class="recording-metrics">
          <div><span>连接</span><b>正常</b></div>
          <div><span>电量</span><b>76%</b></div>
          <div><span>存储</span><b>11.8G</b></div>
        </div>
        <div class="recording-wave">${waveHeights.map((height) => `<i style="height:${Math.max(20, height + 18)}px"></i>`).join("")}</div>
        <section class="recording-mark-card">
          <h3>标记时间轴</h3>
          <div class="timeline">
            <div class="timeline-item"><strong>00:12:08</strong><br><span>重点标记 #1 · 硬件短按</span></div>
            <div class="timeline-item photo-marker"><strong>00:27:46 <i class="timeline-photo-icon" aria-label="照片标记"></i></strong><br><span>重点标记 #2 · App 添加</span></div>
          </div>
        </section>
        <div class="recording-actions">
          <button><span class="record-action-icon input"></span><b>输入</b></button>
          <button><span class="record-action-icon photo"></span><b>拍照</b></button>
          <button><span class="record-action-icon mark"></span><b>标记</b></button>
        </div>
      </main>
    </section>
  `;
}

function renderFileDetail() {
  const jumpItems = [
    ["大纲", "detail-outline"],
    ["智能总结", "detail-summary"],
    ["文字记录", "detail-transcript"],
    ["待办事项", "detail-todos"],
    ["思维导图", "detail-mindmap"]
  ];
  return `
    <div class="statusbar detail-statusbar"><span>9:41</span><span>5G</span><span>82%</span></div>
    <main class="file-detail-page">
      <div class="detail-toolbar">
        <button class="round-btn" data-go="APP-HOME-01" aria-label="返回">‹</button>
        <div class="detail-actions">
          <button class="round-btn" data-go="APP-FILE-06" aria-label="分享">↗</button>
          <button class="round-btn" data-go="APP-FILE-07" aria-label="更多">⋮</button>
        </div>
      </div>
      <h1 class="detail-title">拼团营销工具需求评审会</h1>
      <p class="detail-meta">创建时间&nbsp;&nbsp;2026-07-04 18:25:55</p>
      <div class="detail-tags">
        <button class="tag-add" aria-label="添加标签">+</button>
        ${["录音笔记", "拆机", "电子设备维修", "工业加工"].map((label) => `<span>${h(label)}</span>`).join("")}
      </div>

      <section class="audio-player">
        <div class="audio-progress-row">
          <span>00:00:00</span>
          <button class="audio-track" aria-label="调整播放进度"><b style="left: 4%"></b></button>
          <span>00:43:52</span>
        </div>
        <div class="player-controls">
          <button class="player-icon sliders" data-go="APP-FILE-04" aria-label="音频设置"></button>
          <button class="player-icon rewind" aria-label="快退 15 秒">15</button>
          <button class="play-icon" aria-label="播放"></button>
          <button class="player-icon forward" aria-label="快进 15 秒">15</button>
          <button class="speed-btn" data-go="APP-FILE-05" aria-label="播放倍速">1.0x</button>
        </div>
      </section>

      <nav class="jump-tabs" aria-label="AI 内容快速定位">
        ${jumpItems.map(([label, id]) => `<a href="#${id}">${h(label)}</a>`).join("")}
      </nav>

      <section class="ai-section outline-section" id="detail-outline">
        <div class="section-head">
          <h2>大纲</h2>
          <span class="feedback-icons">♡ ♡</span>
        </div>
        <div class="outline-row"><a href="#">0:00:02</a><span>会议内容与图片关联问题</span></div>
        <div class="outline-row"><a href="#">0:00:59</a><span>拍摄与标注未处理的困扰</span></div>
      </section>

      <section class="ai-section" id="detail-summary">
        <h2>📄 智能总结</h2>
        <h3>录音信息</h3>
        <ul class="summary-list">
          <li><strong>录音时间：</strong>2026-03-02 16:39:35 ~ 2026-03-02 17:23:27</li>
          <li><strong>时长：</strong>约 0 小时 44 分钟</li>
          <li><strong>参与人数：</strong>约 3 人</li>
          <li><strong>内容类型：</strong>工作会议</li>
        </ul>
        <h3>录音总结</h3>
        <p>本次会议围绕拼团营销工具的需求评审展开，重点确认了功能范围、简化方案、标准商城与积分商城的拼团功能 MVP，以及后续大商品库项目的启动安排。</p>
      </section>

      <section class="ai-section" id="detail-transcript">
        <h2>文字记录</h2>
        <div class="transcript-line"><b>00:03</b><p>我们先确认这次评审的目标，主要聚焦拼团营销工具的 MVP 范围。</p></div>
        <div class="transcript-line"><b>01:18</b><p>图片、标注和商品关联需要先做最小可用链路，复杂规则放到下一版。</p></div>
      </section>

      <section class="ai-section" id="detail-todos">
        <h2>待办事项</h2>
        <div class="quote-block">
          <p>1. 明确拼团营销工具 MVP 的上线范围和验收口径，避免标准商城和积分商城规则相互影响。</p>
          <p>2. 标注、图片和商品关联暂不扩展复杂配置，先确认必要字段与最短流程。</p>
          <p>3. 为后续大商品库项目补齐负责人、截止时间和依赖关系。</p>
        </div>
        <ul class="todo-list">
          <li>确认标准商城拼团入口和活动状态字段。</li>
          <li>整理积分商城拼团规则与异常状态。</li>
          <li>补充大商品库项目启动前的依赖清单。</li>
        </ul>
      </section>

      <section class="ai-section mindmap-section" id="detail-mindmap">
        <p class="template-line">使用模板：<a href="#">会议总结</a></p>
        <div class="mindmap-card">
          <div class="mindmap-head"><h2>思维导图</h2><button aria-label="展开思维导图">↗</button></div>
          <div class="mindmap-canvas">
            <span class="mindmap-root">拼团营销工具需求评审</span>
            <span class="mindmap-line one"></span>
            <span class="mindmap-line two"></span>
            <span class="mindmap-line three"></span>
            <span class="mindmap-line four"></span>
            <div class="mindmap-branches">
              <b>录音信息</b>
              <b>需求范围</b>
              <b>MVP 简化</b>
              <b>后续安排</b>
            </div>
          </div>
        </div>
        <div class="feedback-row">
          <button>♡ 满意</button>
          <button>♡ 不满意</button>
        </div>
      </section>
    </main>
    <div class="note-question-bar"><span>Beta</span><input placeholder="对此笔记提问" aria-label="对此笔记提问"></div>
  `;
}

function renderFileDetailEmpty() {
  return `
    <div class="statusbar detail-statusbar"><span>9:41</span><span>5G</span><span>82%</span></div>
    <main class="file-detail-page empty-detail-page">
      <div class="detail-toolbar">
        <button class="round-btn" data-go="APP-HOME-01" aria-label="返回">‹</button>
        <div class="detail-actions">
          <button class="round-btn" data-go="APP-FILE-06" aria-label="分享">↗</button>
          <button class="round-btn" data-go="APP-FILE-07" aria-label="更多">⋮</button>
        </div>
      </div>
      <h1 class="detail-title">拼团营销工具需求评审会</h1>
      <p class="detail-meta">创建时间&nbsp;&nbsp;2026-07-04 18:25:55</p>
      <div class="detail-tags empty-tags">
        <button class="tag-add" aria-label="添加标签">+</button>
      </div>

      <section class="audio-player">
        <div class="audio-progress-row">
          <span>00:00:00</span>
          <button class="audio-track" aria-label="调整播放进度"><b style="left: 4%"></b></button>
          <span>00:10:01</span>
        </div>
        <div class="player-controls">
          <button class="player-icon sliders" data-go="APP-FILE-04" aria-label="音频设置"></button>
          <button class="player-icon rewind" aria-label="快退 15 秒">15</button>
          <button class="play-icon" aria-label="播放"></button>
          <button class="player-icon forward" aria-label="快进 15 秒">15</button>
          <button class="speed-btn" data-go="APP-FILE-05" aria-label="播放倍速">1.0x</button>
        </div>
      </section>

      <section class="empty-note-state">
        <div class="empty-note-icon"></div>
        <h2>可生成笔记</h2>
        <p>生成后将在此处显示总结</p>
      </section>
    </main>
    <div class="empty-generate-bar">
      <button class="primary-btn" data-go="APP-AI-01"><span>✦</span> 生成</button>
    </div>
  `;
}

function renderFileDetailGenerating() {
  return `
    <div class="statusbar detail-statusbar"><span>9:41</span><span>5G</span><span>82%</span></div>
    <main class="file-detail-page generating-detail-page">
      <div class="detail-toolbar">
        <button class="round-btn" data-go="APP-HOME-01" aria-label="返回">‹</button>
        <div class="detail-actions">
          <button class="round-btn" data-go="APP-FILE-06" aria-label="分享">↗</button>
          <button class="round-btn" data-go="APP-FILE-07" aria-label="更多">⋮</button>
        </div>
      </div>
      <h1 class="detail-title">拼团营销工具需求评审会</h1>
      <p class="detail-meta">创建时间&nbsp;&nbsp;2026-07-04 18:25:55</p>
      <div class="detail-tags empty-tags">
        <button class="tag-add" aria-label="添加标签">+</button>
      </div>

      <section class="audio-player">
        <div class="audio-progress-row">
          <span>00:00:00</span>
          <button class="audio-track" aria-label="调整播放进度"><b style="left: 4%"></b></button>
          <span>00:10:01</span>
        </div>
        <div class="player-controls">
          <button class="player-icon sliders" data-go="APP-FILE-04" aria-label="音频设置"></button>
          <button class="player-icon rewind" aria-label="快退 15 秒">15</button>
          <button class="play-icon" aria-label="播放"></button>
          <button class="player-icon forward" aria-label="快进 15 秒">15</button>
          <button class="speed-btn" data-go="APP-FILE-05" aria-label="播放倍速">1.0x</button>
        </div>
      </section>

      <section class="generation-card">
        <div class="skeleton-lines">
          <i class="short"></i>
          <i></i>
          <i></i>
          <i></i>
          <i class="medium"></i>
        </div>
        <div class="generation-message">
          <span class="loading-dot"></span>
          <h2>生成中...</h2>
          <p>生成还需几分钟，离开页面不会影响进度</p>
        </div>
      </section>
    </main>
  `;
}

function renderAudioSettings() {
  return `
    ${renderFileDetail()}
    <div class="scrim light" data-go="APP-FILE-01"></div>
    <section class="audio-bottom-sheet">
      <div class="sheet-title-row">
        <h2>音频设置</h2>
        <button class="sheet-close" data-go="APP-FILE-01" aria-label="关闭">×</button>
      </div>
      <div class="settings-row">
        <span>跳过空白片段</span>
        <button class="toggle-switch" aria-label="跳过空白片段"></button>
      </div>
      <button class="sheet-cancel" data-go="APP-FILE-01">取消</button>
    </section>
  `;
}

function renderSpeedSheet() {
  const rates = ["3.0X", "2.0X", "1.5X", "1.25X", "1.0X", "0.5X"];
  return `
    ${renderFileDetail()}
    <div class="scrim light" data-go="APP-FILE-01"></div>
    <section class="audio-bottom-sheet speed-sheet">
      <div class="sheet-title-row">
        <h2>倍速</h2>
        <button class="sheet-close" data-go="APP-FILE-01" aria-label="关闭">×</button>
      </div>
      <div class="speed-list">
        ${rates.map((rate) => `<button>${h(rate)}${rate === "1.0X" ? "<span>✓</span>" : ""}</button>`).join("")}
      </div>
      <button class="sheet-cancel" data-go="APP-FILE-01">取消</button>
    </section>
  `;
}

function renderShareSheet() {
  return `
    ${renderFileDetail()}
    <div class="scrim light" data-go="APP-FILE-01"></div>
    <section class="share-sheet">
      <div class="sheet-grabber"></div>
      <h2>分享</h2>
      <button class="share-row" data-go="APP-FILE-08"><span class="share-icon link"></span><b>分享链接</b><i>›</i></button>
      <h3>复制到剪贴板</h3>
      <button class="share-row"><span class="share-icon doc"></span><b>转写</b><i>□</i></button>
      <button class="share-row"><span class="share-icon doc"></span><b>笔记</b><i>›</i></button>
      <h3>导出文件</h3>
      <button class="share-row"><span class="share-icon audio"></span><b>录音</b><i>›</i></button>
      <button class="share-row"><span class="share-icon doc"></span><b>转写</b><i>›</i></button>
      <button class="share-row"><span class="share-icon doc"></span><b>笔记</b><i>›</i></button>
      <button class="share-row"><span class="share-icon map"></span><b>思维导图</b><i>›</i></button>
    </section>
  `;
}

function renderMoreMenu() {
  return `
    ${renderFileDetail()}
    <section class="more-popover">
      <button data-go="APP-FILE-16"><span>⇥</span>移至文件夹</button>
      <button data-go="APP-FILE-17"><span>▣</span>查找和替换</button>
      <button data-go="APP-FILE-18"><span>↻</span>重新转写</button>
      <button data-go="APP-FILE-19"><span>♙</span>为说话人命名</button>
      <button class="danger" data-go="APP-HOME-03"><span>▥</span>移至回收站</button>
    </section>
  `;
}

function renderMoveFolderSheet() {
  return `
    ${renderFileDetail()}
    <div class="scrim light" data-go="APP-FILE-07"></div>
    <section class="folder-move-sheet">
      <div class="sheet-title-row compact-title">
        <h2>移动到</h2>
        <button class="sheet-close" data-go="APP-FILE-07" aria-label="关闭">×</button>
      </div>
      <div class="sheet-line"></div>
      <button class="folder-row selected"><span class="file-icon folder"></span><b>全部文件 (35)</b><i>✓</i></button>
      <div class="folder-section-title"><h3>我的文件夹</h3><button>＋</button></div>
      <button class="folder-row"><span class="file-icon folder"></span><b>Andy (0)</b></button>
      <button class="folder-row blue"><span class="file-icon folder"></span><b>工作 (0)</b></button>
      <button class="primary-btn disabled move-disabled">移动到</button>
    </section>
  `;
}

function renderFindReplace() {
  return `
    ${renderFileDetail()}
    <section class="find-replace-panel">
      <div class="find-line">
        <label><span class="search-mini-icon"></span><b>查找</b></label>
        <em>0/0</em>
        <button>⌃</button>
        <button>⌄</button>
        <button data-go="APP-FILE-01" aria-label="关闭">×</button>
      </div>
      <div class="replace-line">
        <label><span>⇄</span><b>替换为</b></label>
        <button disabled>替换</button>
      </div>
    </section>
    ${keyboardMock("text")}
  `;
}

function renderRetranscribeSheet() {
  return `
    ${renderFileDetail()}
    <div class="scrim light" data-go="APP-FILE-07"></div>
    <section class="retranscribe-sheet">
      <h2>重新转写提醒</h2>
      <div class="sheet-line"></div>
      <p>重新转写会消耗转写时长，并删除当前录音的所有笔记。<br>建议仅在音频语言设置错误时重新转写，是否继续?</p>
      <button class="primary-btn" data-go="APP-FILE-15">重新转写</button>
      <button class="cancel-outline-btn" data-go="APP-FILE-01">取消</button>
    </section>
  `;
}

function speakerSegment(time, duration, text) {
  return `<div class="speaker-segment">
    <button aria-label="播放片段"></button>
    <span>${h(time)}</span>
    <b>${h(duration)}</b>
    <p>${h(text)}</p>
  </div>`;
}

function renderSpeakerNamingSheet() {
  return `
    ${renderFileDetail()}
    <div class="scrim light" data-go="APP-FILE-07"></div>
    <section class="speaker-sheet">
      <div class="sheet-title-row compact-title">
        <h2>为说话人命名</h2>
        <button class="sheet-close" data-go="APP-FILE-07" aria-label="关闭">×</button>
      </div>
      <div class="sheet-line"></div>
      <div class="speaker-scroll">
        <article class="speaker-block">
          <label>Speaker 1</label>
          <p>总时长 <strong>4m 3s</strong></p>
          ${speakerSegment("00:00:00 - 00:00:59", "59s", "Speaking today, I'm the general manager for pilot technologies, and we deliver manufacturin...")}
          ${speakerSegment("00:00:59 - 00:01:57", "59s", "In framing your ability to create a strategy, create a plan that can deliver on that strategy a...")}
          <em>......</em>
        </article>
        <article class="speaker-block">
          <label>Speaker 2</label>
          <p>总时长 <strong>4m 1s</strong></p>
          ${speakerSegment("00:04:12 - 00:04:50", "38s", "Good morning everyone. Thank you very much for being here on time. We've got a lot to do to...")}
          ${speakerSegment("00:04:50 - 00:05:40", "50s", "Miss Reyes will arrive at eleven thirty, so I plan to break at about eleven fifteen to give her time t...")}
          <em>......</em>
        </article>
        <article class="speaker-block">
          <label>Speaker 3</label>
          <p>总时长 <strong>20s</strong></p>
        </article>
      </div>
      <p class="speaker-tip">本文件中的说话人名称将自动更新</p>
      <div class="speaker-actions">
        <button class="cancel-outline-btn" data-go="APP-FILE-01">取消</button>
        <button class="primary-btn" data-go="APP-FILE-01">确认</button>
      </div>
    </section>
  `;
}

function renderShareControls() {
  return `
    <button class="include-row" data-go="APP-FILE-09"><span>选择包含内容</span><b>全部内容 ›</b></button>
    <button class="include-row expiry-row" data-go="APP-FILE-21"><span>链接有效期</span><b>永久有效 ⌄</b></button>
  `;
}

function renderShareLink() {
  return `
    <div class="share-link-bg"></div>
    <main class="share-link-page">
      <div class="share-link-top">
        <button aria-label="帮助">?</button>
        <strong>分享链接</strong>
        <button data-go="APP-FILE-01">完成</button>
      </div>
      <section class="share-link-copy">
        <h1>通过链接分享</h1>
        <p>生成分享链接，任何拥有链接的人都可查看此文件</p>
      </section>
      ${renderShareControls()}
      <section class="share-preview-card">
        <div class="preview-window-bar"><i></i><i></i><i></i></div>
        <div class="preview-tabs"><span>转写</span><b>总结</b></div>
        <h2>07-01 Meeting:<br>Manufacturing<br>Digital Twin</h2>
      </section>
      <button class="primary-btn share-link-button" data-go="APP-FILE-20"><span class="share-link-glyph">⌁</span> 分享链接</button>
    </main>
  `;
}

function renderShareLinkGenerated() {
  return `
    <div class="share-link-bg"></div>
    <main class="share-link-page">
      <div class="share-link-top">
        <button aria-label="帮助">?</button>
        <strong>分享链接</strong>
        <button data-go="APP-FILE-01">完成</button>
      </div>
      <section class="share-link-copy">
        <h1>通过链接分享</h1>
        <p>生成分享链接，任何拥有链接的人都可查看此文件</p>
      </section>
      ${renderShareControls()}
      <section class="generated-link-card">
        <span>已生成分享链接</span>
        <b>plaud.app/share/meeting-0701</b>
      </section>
      <button class="primary-btn share-link-button"><span class="share-link-glyph">⌁</span> 复制分享链接</button>
      <button class="remove-link-btn" data-go="APP-FILE-01">移除链接</button>
    </main>
  `;
}

function renderSharePermissionSheet() {
  return `
    ${renderShareLinkGenerated()}
    <div class="scrim light" data-go="APP-FILE-20"></div>
    <section class="permission-sheet">
      <div class="sheet-title-row">
        <h2>查看权限</h2>
        <button class="sheet-close" data-go="APP-FILE-20" aria-label="关闭">×</button>
      </div>
      <div class="permission-list">
        <label><span class="share-icon audio"></span>录音<b>✓</b></label>
        <label><span class="share-icon doc"></span>转写<b>✓</b></label>
        <label><span class="share-icon doc"></span>标记<b>✓</b></label>
        <label><span class="share-icon doc"></span>总结<b>✓</b></label>
      </div>
      <button class="primary-btn disabled">更新</button>
    </section>
  `;
}

function renderShareExpirySheet() {
  const options = [
    ["永久有效", true],
    ["7 天后失效", false],
    ["14 天后失效", false],
    ["30 天后失效", false]
  ];
  return `
    ${renderShareLinkGenerated()}
    <section class="share-expiry-popover">
      ${options.map(([label, active]) => `
        <button data-go="APP-FILE-20">
          <span>${label}</span>
          <i class="${active ? "active" : ""}"></i>
        </button>
      `).join("")}
      <button class="custom-date" data-go="APP-FILE-22">自定义日期</button>
    </section>
  `;
}

function renderShareExpiryDateSheet() {
  const days = ["", "", "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
  return `
    <div class="share-link-bg"></div>
    <main class="date-picker-page">
      <div class="date-picker-top">
        <button data-go="APP-FILE-21">取消</button>
        <strong>链接有效期</strong>
        <button data-go="APP-FILE-20">保存</button>
      </div>
      <div class="month-row">
        <button>2026年7月⌄</button>
        <span><button class="muted">‹</button><button>›</button></span>
      </div>
      <div class="weekday-row">
        <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
      </div>
      <div class="calendar-grid">
        ${days.map((day) => `<button class="${day === "8" ? "selected" : ""} ${["1","2","3","4","5","6","7"].includes(day) ? "muted" : ""}">${day}</button>`).join("")}
      </div>
    </main>
  `;
}

function renderGenerate() {
  return `
    ${renderFileDetail()}
    <div class="scrim" data-go="APP-FILE-01"></div>
    <section class="bottom-sheet">
      <div class="handle"></div>
      <div class="card-title"><strong>生成内容</strong>${chip("01:12:17", "blue")}</div>
      <div class="option ${generationMode === "auto" ? "selected" : ""}" data-mode="auto">
        <span class="option-dot">${generationMode === "auto" ? "✓" : ""}</span>
        <div><strong>自动生成</strong><p class="caption">自动匹配转写与总结，无需手动设置。</p></div>
        <span></span>
      </div>
      <div class="option ${generationMode === "custom" ? "selected" : ""}" data-mode="custom">
        <span class="option-dot">${generationMode === "custom" ? "✓" : ""}</span>
        <div><strong>自定义生成</strong><p class="caption">选择模板、说话人、语言和 AI 模型。</p></div>
        <span></span>
      </div>
      ${generationMode === "custom" ? `${row("模板", "会议纪要 · 查看全部")}${row("自动标注说话人", "开启")}${row("音频语言", "English (US)")}${row("AI 模型", "自动")}` : ""}
      ${card("用量确认", `${row("预计消耗", "73 分钟")}${row("剩余额度", "420 分钟")}`, "warn")}
      <p class="caption">音频将上传云端用于转写和 AI 笔记生成。</p>
      <button class="primary-btn" data-go="APP-FILE-15">立即生成</button>
    </section>
  `;
}

function meRow(label, opts = {}) {
  const attrs = opts.go ? ` data-go="${opts.go}"` : "";
  return `<button class="me-row"${attrs}>${opts.icon ? `<span class="${opts.icon}"></span>` : ""}<b>${h(label)}</b>${opts.value ? `<em>${h(opts.value)}</em>` : ""}<i>›</i></button>`;
}

function meTop(title, opts = {}) {
  return `
    <div class="statusbar me-simple-status"><span>9:41</span><span>5G</span><span>82%</span></div>
    <header class="me-simple-top">
      <button data-go="${opts.back || "APP-ME-02"}">‹</button>
      <strong>${h(title)}</strong>
      ${opts.close ? `<button data-go="${opts.close}">×</button>` : "<span></span>"}
    </header>
  `;
}

function togglePill(on = false, disabled = false) {
  return `<span class="toggle-pill ${on ? "on" : ""} ${disabled ? "disabled" : ""}"><i></i></span>`;
}

function meSettingRow(label, opts = {}) {
  const attrs = opts.go ? ` data-go="${opts.go}"` : "";
  return `
    <button class="me-setting-row ${opts.danger ? "danger" : ""}"${attrs}>
      <span>
        <b>${h(label)}</b>
        ${opts.note ? `<small>${h(opts.note)}</small>` : ""}
      </span>
      ${opts.value ? `<em>${h(opts.value)}</em>` : ""}
      ${opts.toggle !== undefined ? togglePill(opts.toggle, opts.disabled) : `<i>›</i>`}
    </button>
  `;
}

function renderUsage() {
  return `
    <main class="me-page">
      <section class="me-hero">
        <div class="statusbar me-statusbar"><span>9:41</span><span>5G</span><span>82%</span></div>
        <div class="me-hero-content">
          <div class="me-member-row">
            <h1>标准会员</h1>
            <button>更多详情 ›</button>
          </div>
          <div class="me-progress"><b style="width:38%"></b><i></i></div>
          <div class="me-quota-row">
            <span>剩余259 / 300 分钟 <b>i</b></span>
            <button>∞ 升级至卓越会员</button>
          </div>
          <button class="me-ai-trial">免费试用无限 AI 能力</button>
        </div>
      </section>
      <section class="me-content">
        <h2>发现</h2>
        <div class="me-line"></div>
        <div class="me-card-group">
          ${meRow("私有云同步", { value: "开启", go: "APP-ME-05" })}
          ${meRow("购买转写时长")}
          ${meRow("兑换码", { go: "APP-ME-08" })}
        </div>
        <section class="me-section">
          <h3>账单与支持</h3>
          <div class="me-line"></div>
          ${meRow("账单详情", { go: "APP-ME-09" })}
          ${meRow("恢复购买", { go: "APP-ME-10" })}
          ${meRow("使用记录", { go: "APP-ME-12" })}
          ${meRow("常见问题")}
          ${meRow("服务条款")}
          ${meRow("隐私与安全", { go: "APP-ME-04" })}
        </section>
      </section>
    </main>
    ${bottom("me")}
  `;
}

function renderPrivateCloudSync() {
  return `
    <main class="me-simple-page">
      ${meTop("私有云同步")}
      <section class="cloud-sync-page">
        <div class="cloud-hero-icon"><span class="me-icon cloud"></span></div>
        <h1>私有云同步</h1>
        <p>私有云同步是 AI录音卡 App 为用户提供的安全私有云服务，开启后可以：<br>1. 自动备份数据，防止丢失<br>2. 修改内容多端同步（App 与 Web），方便查看与管理</p>
        <div class="me-line"></div>
        ${meSettingRow("开启私有云同步", { toggle: true })}
        ${meSettingRow("仅在 Wi-Fi 下同步", { toggle: false, disabled: true, note: "开启后，仅通过 Wi-Fi 自动同步数据" })}
        <div class="me-line"></div>
        ${meSettingRow("管理存储空间", { value: "41.23 MB", go: "APP-ME-06" })}
        ${meSettingRow("删除云端的录音", { go: "APP-ME-13" })}
      </section>
    </main>
  `;
}

function renderCloudStorage() {
  return `
    <main class="me-simple-page">
      ${meTop("优化 App 储存空间", { back: "APP-ME-05" })}
      <section class="cloud-storage-page">
        ${meSettingRow("优化 AI录音卡 App 储存空间", { toggle: true, note: "开启后，AI录音卡 App 将不再自动下载云端录音，你可随时手动下载。" })}
        <div class="me-line"></div>
        ${meSettingRow("录音文件", { value: "41.23 MB" })}
        ${meSettingRow("清理 AI录音卡 App 存储空间", { go: "APP-ME-07", note: "清理 AI录音卡 App 中已同步至云端的录音，释放储存空间，你可随时重新下载。" })}
      </section>
    </main>
  `;
}

function renderCloudStorageConfirm() {
  return `
    ${renderCloudStorage()}
    <div class="scrim" data-go="APP-ME-06"></div>
    <section class="me-sheet">
      <button class="sheet-close" data-go="APP-ME-06">×</button>
      <h2>是否清理 AI录音卡 App 储存空间?</h2>
      <div class="me-line"></div>
      <p>已同步至云端的录音将从 AI录音卡 App 本地移除，你可随时重新下载。</p>
      <div class="me-sheet-actions two">
        <button class="outline" data-go="APP-ME-06">取消</button>
        <button class="dark" data-go="APP-ME-06">清理</button>
      </div>
    </section>
  `;
}

function renderDeleteCloudRecord() {
  return `
    <main class="me-simple-page">
      ${meTop("删除云端的录音", { back: "APP-ME-05" })}
      <section class="delete-cloud-page">
        ${meSettingRow("删除云端的所有录音", { danger: true, go: "APP-ME-14" })}
        <p>录音将从云端及所有同步的 AI录音卡 App 中永久删除。</p>
      </section>
    </main>
  `;
}

function renderDeleteCloudRecordConfirm() {
  return `
    ${renderDeleteCloudRecord()}
    <div class="scrim" data-go="APP-ME-13"></div>
    <section class="me-sheet danger-sheet">
      <h2>云端的所有录音将被删除</h2>
      <div class="me-line"></div>
      <p>录音将从云端及所有同步的 AI录音卡 App 中永久删除。</p>
      <button class="danger-fill" data-go="APP-ME-05">删除</button>
      <button class="outline" data-go="APP-ME-13">取消</button>
    </section>
  `;
}

function renderRedeemCode(keyboard = false) {
  return `
    ${renderUsage()}
    <div class="scrim" data-go="APP-ME-02"></div>
    <section class="me-sheet redeem-sheet ${keyboard ? "with-keyboard" : ""}">
      <button class="sheet-close" data-go="APP-ME-02">×</button>
      <h2>兑换码</h2>
      <div class="me-line"></div>
      <button class="redeem-input" data-go="APP-ME-15">请输入兑换码，区分大小写</button>
      <button class="disabled-btn">兑换</button>
    </section>
    ${keyboard ? keyboardMock("text") : ""}
  `;
}

function renderBillingDetail() {
  return `
    <main class="me-simple-page">
      ${meTop("账单详情", { close: "APP-ME-02" })}
      <section class="bill-empty">
        <div class="bill-empty-icon"></div>
        <p>暂无账单记录</p>
      </section>
    </main>
  `;
}

function renderRestorePurchaseLoading() {
  return `
    ${renderUsage()}
    <div class="scrim" data-go="APP-ME-02"></div>
    <button class="restore-loader" data-go="APP-ME-11"><span></span></button>
  `;
}

function renderRestorePurchaseFailed() {
  return `
    ${renderUsage()}
    <div class="scrim" data-go="APP-ME-02"></div>
    <section class="me-sheet restore-sheet">
      <h2>未找到以前的购买记录</h2>
      <div class="me-line"></div>
      <p>没有找到这个账号之前的购买记录。请查看你的收据或订阅历史记录，并再次尝试恢复。</p>
      <button class="dark" data-go="APP-ME-02">确认</button>
    </section>
  `;
}

function renderUsageRecords() {
  const records = [
    ["2026-07-08 12:04:45", "1分 10秒"],
    ["2026-07-04 15:21:25", "1分 22秒"],
    ["2026-07-04 15:16:03", "8分 37秒"],
    ["2026-07-04 15:15:41", "1分 14秒"],
    ["2026-07-04 15:12:25", "7分 4秒"],
    ["2026-06-30 14:27:23", "12分 17秒"],
    ["2026-06-29 17:30:54", "53秒"],
    ["2026-06-29 16:32:20", "26秒"],
    ["2026-06-29 15:30:19", "7分 4秒"],
    ["2026-06-29 15:24:01", "46秒"]
  ];
  return `
    <main class="me-simple-page usage-record-page">
      ${meTop("使用记录", { close: "APP-ME-02" })}
      <section>
        <h1>日期 & 时长</h1>
        <div class="me-line"></div>
        ${records.map(([date, duration]) => `
          <button class="usage-record-row">
            <span>${h(date)}</span>
            <b>${h(duration)}</b>
            <i>›</i>
          </button>
        `).join("")}
      </section>
    </main>
  `;
}

function renderDeviceDetail() {
  return screen(`
    ${card("AI Recorder A1", `${row("状态", "已连接")}${row("SN", "SN-8F2A-2026")}${row("固件版本", "v0.9.3")}${row("最近同步", "今天 14:22")}`, "soft")}
    ${metrics([["电量", "82%"], ["存储", "68%"], ["同步", "空闲"]])}
    ${card("设备操作", `${row("自动同步", "开启")}${row("恢复出厂", "触发方式待确认")}${row("OTA", "P1 占位")}`)}
    <div class="button-row">
      <button class="secondary-btn">重连</button>
      <button class="danger-btn">解绑</button>
    </div>
  `, { title: "设备详情", action: "帮助", back: "APP-HOME-01", bottom: false });
}

function renderPrivacy() {
  return screen(`
    ${card("隐私控制", `${row("AI 数据授权", "关闭")}${row("云端文件", "可删除")}${row("转写 / AI 笔记", "可删除")}${row("诊断日志", "上传前授权")}`)}
    ${card("美国 / 日本合规", `${row("录音同意提示", "待法务确认")}${row("隐私政策", "英文 / 日文")}${row("数据处理说明", "AI 生成前展示")}`, "warn")}
    <div class="button-row">
      <button class="secondary-btn">删除云端数据</button>
      <button class="danger-btn">删除账号</button>
    </div>
  `, { title: "隐私与安全", back: "APP-ME-02", active: "me" });
}

function renderError() {
  return screen(`
    <section class="card danger" style="text-align:center;padding:34px 18px">
      <div style="font-size:46px;font-weight:900">!</div>
      <h2 style="margin:8px 0 6px">设备未连接</h2>
      <p class="caption">录音和同步前需要连接设备。请靠近 AI Recorder A1 后重试。</p>
    </section>
    ${card("异常定位", `${row("触发页面", "录音 / 同步前")}${row("错误码", "BLE_DISCONNECTED")}${row("下一步", "重连 / 查看帮助")}`)}
    ${card("其他异常", `<div class="file-tags">${chip("未登录", "red")}${chip("未绑定", "red")}${chip("权限拒绝", "red")}${chip("额度不足", "amber")}${chip("转写失败返还", "purple")}</div>`, "soft")}
    <div class="button-row">
      <button class="primary-btn" data-go="APP-HOME-01">重连</button>
      <button class="secondary-btn">查看帮助</button>
    </div>
  `, { title: "异常状态", back: "APP-HOME-01", bottom: false });
}

const renderers = {
  "APP-PRD-00": renderPrdOverview,
  "APP-ONB-01": renderLogin,
  "APP-ONB-02": renderRegister,
  "APP-ONB-03": renderRegisterVerify,
  "APP-ONB-04": renderPermissions,
  "APP-ONB-05": renderResetPassword,
  "APP-ONB-06": renderCodeLogin,
  "APP-DEV-01": renderDeviceScan,
  "APP-DEV-02": renderDeviceBind,
  "APP-DEV-04": renderDeviceAlreadyBound,
  "APP-HOME-01": renderHome,
  "APP-HOME-03": renderHomeTrashToast,
  "APP-FILE-02": renderSearch,
  "APP-FILE-03": renderFilterSheet,
  "APP-FILE-13": renderImportAudioSheet,
  "APP-FILE-11": renderSearchTimeSheet,
  "APP-FILE-12": renderSearchResults,
  "APP-FILE-14": renderSearchClearConfirm,
  "APP-FILE-04": renderAudioSettings,
  "APP-FILE-05": renderSpeedSheet,
  "APP-FILE-06": renderShareSheet,
  "APP-FILE-07": renderMoreMenu,
  "APP-FILE-16": renderMoveFolderSheet,
  "APP-FILE-17": renderFindReplace,
  "APP-FILE-18": renderRetranscribeSheet,
  "APP-FILE-19": renderSpeakerNamingSheet,
  "APP-FILE-08": renderShareLink,
  "APP-FILE-09": renderSharePermissionSheet,
  "APP-FILE-20": renderShareLinkGenerated,
  "APP-FILE-21": renderShareExpirySheet,
  "APP-FILE-22": renderShareExpiryDateSheet,
  "APP-REC-02": renderRecordSheet,
  "APP-REC-03": renderScene,
  "APP-REC-04": renderRecording,
  "APP-FILE-01": renderFileDetail,
  "APP-FILE-10": renderFileDetailEmpty,
  "APP-FILE-15": renderFileDetailGenerating,
  "APP-AI-01": renderGenerate,
  "APP-ME-02": renderUsage,
  "APP-ME-05": renderPrivateCloudSync,
  "APP-ME-06": renderCloudStorage,
  "APP-ME-07": renderCloudStorageConfirm,
  "APP-ME-13": renderDeleteCloudRecord,
  "APP-ME-14": renderDeleteCloudRecordConfirm,
  "APP-ME-08": () => renderRedeemCode(false),
  "APP-ME-15": () => renderRedeemCode(true),
  "APP-ME-09": renderBillingDetail,
  "APP-ME-10": renderRestorePurchaseLoading,
  "APP-ME-11": renderRestorePurchaseFailed,
  "APP-ME-12": renderUsageRecords,
  "APP-DEV-03": renderDeviceDetail,
  "APP-ME-04": renderPrivacy,
  "APP-ERR-01": renderError
};

function renderNav() {
  const grouped = pages.reduce((acc, page) => {
    acc[page.group] = acc[page.group] || [];
    acc[page.group].push(page);
    return acc;
  }, {});
  document.getElementById("nav").innerHTML = Object.entries(grouped).map(([group, items]) => `
    <div class="nav-section">${h(group)}</div>
    ${items.map((page) => `<button class="nav-item ${page.id === currentPageId ? "active" : ""}" data-go="${page.id}"><b>${h(page.title)}</b><span>${h(page.id)}</span></button>`).join("")}
  `).join("");
}

function renderFlow() {
  const flow = ["APP-PRD-00", "APP-ONB-01", "APP-ONB-02", "APP-ONB-03", "APP-ONB-05", "APP-ONB-06", "APP-ONB-04", "APP-DEV-01", "APP-DEV-02", "APP-DEV-04", "APP-HOME-01", "APP-FILE-13", "APP-FILE-02", "APP-FILE-14", "APP-FILE-11", "APP-FILE-12", "APP-FILE-03", "APP-FILE-01", "APP-FILE-10", "APP-AI-01", "APP-FILE-15", "APP-FILE-04", "APP-FILE-05", "APP-FILE-06", "APP-FILE-08", "APP-FILE-20", "APP-FILE-09", "APP-FILE-21", "APP-FILE-22", "APP-FILE-07", "APP-FILE-16", "APP-FILE-17", "APP-FILE-18", "APP-FILE-19", "APP-HOME-03", "APP-REC-02", "APP-REC-04", "APP-ME-02", "APP-ME-05", "APP-ME-06", "APP-ME-07", "APP-ME-13", "APP-ME-14", "APP-ME-08", "APP-ME-15", "APP-ME-09", "APP-ME-10", "APP-ME-11", "APP-ME-12"];
  document.getElementById("flowStrip").innerHTML = flow.map((id, index) => {
    const page = pageById(id);
    return `<button class="${id === currentPageId ? "active" : ""}" data-go="${id}">${index + 1}. ${h(page.title)}</button>`;
  }).join("");
}

function renderPrototypeLinks(page) {
  const target = document.getElementById("prototypeLinks");
  const links = page.prototypeLinks || [];
  target.innerHTML = links.length ? `
    <span>状态链路</span>
    ${links.map(([label, id]) => `<button data-go="${h(id)}">${h(label)}</button>`).join("")}
  ` : "";
}

function renderSpec(page) {
  document.getElementById("screenId").textContent = page.id;
  document.getElementById("specTitle").textContent = page.title;
  document.getElementById("specPriority").textContent = `${page.group} / ${page.priority}`;
  document.getElementById("specBody").innerHTML = `
    <section class="spec-section"><h3>页面目标</h3><ul><li>${h(page.goal)}</li></ul></section>
    <section class="spec-section"><h3>页面入口</h3><ul><li>${h(page.entry)}</li></ul></section>
    <section class="spec-section"><h3>字段清单</h3>
      <table class="spec-table"><thead><tr><th>字段</th><th>说明</th><th>来源</th></tr></thead><tbody>
        ${page.fields.map(([field, desc, source]) => `<tr><td><code>${h(field)}</code></td><td>${h(desc)}</td><td>${h(source)}</td></tr>`).join("")}
      </tbody></table>
    </section>
    <section class="spec-section"><h3>交互规则</h3><ul>${page.rules.map((item) => `<li>${h(item)}</li>`).join("")}</ul></section>
    <section class="spec-section"><h3>页面状态</h3><ul>${page.states.map((item) => `<li>${h(item)}</li>`).join("")}</ul></section>
    <section class="spec-section"><h3>接口 / 能力依赖</h3><ul>${page.deps.map((item) => `<li>${h(item)}</li>`).join("")}</ul></section>
    <section class="spec-section"><h3>验收点</h3><ul>${page.acceptance.map((item) => `<li>${h(item)}</li>`).join("")}</ul></section>
  `;
}

function render() {
  const page = pageById(currentPageId);
  document.body.classList.toggle("document-mode", page.id === "APP-PRD-00");
  document.getElementById("screenTitle").textContent = `${page.id} ${page.title}`;
  document.getElementById("screenGoal").textContent = page.goal;
  document.getElementById("phone").innerHTML = (renderers[page.id] || renderHome)();
  renderNav();
  renderFlow();
  renderPrototypeLinks(page);
  renderSpec(page);
}

document.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-tab]");
  if (tab) {
    fileDetailTab = tab.dataset.tab;
    render();
    return;
  }
  const mode = event.target.closest("[data-mode]");
  if (mode) {
    generationMode = mode.dataset.mode;
    render();
    return;
  }
  const action = event.target.closest("[data-action]");
  if (action && action.dataset.action === "toggle-pause") {
    recordPaused = !recordPaused;
    render();
    return;
  }
  const link = event.target.closest("[data-go]");
  if (link) go(link.dataset.go);
});

try {
  render();
} catch (error) {
  const target = document.getElementById("phone");
  if (target) {
    target.innerHTML = `<div style="padding:24px;font-family:sans-serif"><h2>原型渲染错误</h2><p>${h(error.message)}</p></div>`;
  }
  const spec = document.getElementById("specBody");
  if (spec) {
    spec.innerHTML = `<pre style="white-space:pre-wrap;color:#b13b2d">${h(error.stack || error.message)}</pre>`;
  }
  throw error;
}
