# AI录音卡 App 原型与页面效果说明 v3.0

本目录基于 `AI录音卡App需求文档_v3.0.md` 输出，用于产品评审、UI 细化、前端开发、后端接口梳理、硬件/固件联调。

## 文件说明

| 文件 | 用途 |
|---|---|
| `index.html` | 可打开的交互式 App 原型，已内联 JS，可直接打开 |
| `prd-preview.html` | 由 `AI录音卡App需求文档_v3.0.md` 转换生成的完整 HTML 预览，作为需求说明首页嵌入 |
| `styles.css` | 原型样式 |
| `app.js` | 原型数据和交互源文件 |
| `AI录音卡App页面效果设计需求文档_v3.0.md` | 给开发看的页面效果设计需求文档 |
| `scripts/build-inline.js` | 将 `app.js` 同步内联到 `index.html` |
| `scripts/build-prd-preview.js` | 将上级目录的 `AI录音卡App需求文档_v3.0.md` 转换为 `prd-preview.html` |
| `qa-home-http.png` | 首页渲染验证截图 |
| `qa-generate-http.png` | 生成弹层渲染验证截图 |
| `design-qa.md` | 本轮设计 QA 记录 |

## 打开方式

方式 A：直接打开：

```text
index.html
```

方式 B：本地静态服务：

```bash
cd "/Users/andyma/Desktop/MacBookPro /AI录音卡/04_APP设计与开发/AI录音卡App原型与页面效果说明_v3.0"
python3 -m http.server 4174
```

然后打开：

```text
http://127.0.0.1:4174/index.html
```

## 页面直达

原型支持 `page` 参数直达页面：

```text
http://127.0.0.1:4174/index.html?page=APP-PRD-00
http://127.0.0.1:4174/index.html?page=APP-HOME-01
http://127.0.0.1:4174/index.html?page=APP-AI-01
http://127.0.0.1:4174/index.html?page=APP-REC-04
```

## 维护方式

1. 修改页面数据、字段、状态、跳转：编辑 `app.js`。
2. 修改视觉样式：编辑 `styles.css`。
3. 修改开发说明：编辑 `AI录音卡App页面效果设计需求文档_v3.0.md`。
4. 修改 `AI录音卡App需求文档_v3.0.md` 后执行：

```bash
node scripts/build-prd-preview.js
```

5. 修改 `app.js` 后执行：

```bash
node scripts/build-inline.js
```

6. 再执行：

```bash
node --check app.js
node --check scripts/build-inline.js
node --check scripts/build-prd-preview.js
```

## 当前覆盖范围

- 需求说明
- 首启与账号
- 账号注册
- 注册验证
- 重置密码
- 重置密码邮箱验证码验证
- 邮箱验证码登录
- 绑定你的设备
- 正在搜索设备
- 搜索到设备
- 连接失败（设备已绑定其他账号）
- 文件首页
- 文件首页回收站提示
- 导入音频
- 搜索
- 清除搜索记录
- 筛选和排序
- 创建时间
- 搜索结果
- 录音方式选择
- 录音场景选择
- 录音中
- 首页内文件列表
- 文件详情
- 文件详情为空
- 文件详情生成中
- 音频设置
- 倍速
- 分享
- 更多操作
- 移动到文件夹
- 查找和替换
- 重新转写提醒
- 为说话人命名
- 分享链接
- 查看权限
- 生成方式与用量确认
- 转写任务状态
- AI 笔记
- 用量账本
- 设备详情
- 隐私与安全
- 异常状态

## 风格依据

参考 Plaud Note Pro 的信息组织方式：克制白底、黑色主按钮、轻量标签、半屏生成弹层、文件详情播放器、AI 内容快速定位和底部音频设置弹窗。未复制竞品品牌资产。
