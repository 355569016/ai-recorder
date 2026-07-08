const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.resolve(root, "..", "AI录音卡App需求文档_v3.0.md");
const outputPath = path.join(root, "prd-preview.html");

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function inlineMarkdown(text) {
  let value = escapeHtml(text);
  value = value.replace(/`([^`]+)`/g, "<code>$1</code>");
  value = value.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return value;
}

function diagramCard(label, tone = "") {
  return `<div class="diagram-card ${tone}">${String(label).split("\n").map((part) => `<span>${escapeHtml(part)}</span>`).join("")}</div>`;
}

function renderOverviewDiagram() {
  const groups = [
    ["首启与账号", ["登录/注册", "协议隐私", "权限说明", "AI 授权"], "blue"],
    ["设备与硬件录音", ["设备扫描", "绑定确认", "连接状态", "录音控制"], "green"],
    ["文件同步与管理", ["录音后同步", "CRC 校验", "导入音频", "文件列表"], "amber"],
    ["转写与 AI 笔记", ["生成确认", "转写状态", "AI 摘要", "导出分享"], "purple"],
    ["用量与会员", ["剩余分钟", "扣减账本", "失败返还"], "gray"],
    ["隐私与异常", ["录音同意", "云端删除", "设备异常", "额度不足"], "red"]
  ];
  return `<figure class="diagram overview-diagram">
    <figcaption>业务全景图</figcaption>
    <div class="overview-root">${diagramCard("AI录音卡 App", "root")}</div>
    <div class="overview-grid">
      ${groups.map(([title, items, tone]) => `<section class="diagram-group ${tone}">
        <h4>${escapeHtml(title)}</h4>
        <div>${items.map((item) => diagramCard(item)).join("")}</div>
      </section>`).join("")}
    </div>
  </figure>`;
}

function renderBusinessFlowDiagram() {
  const steps = [
    ["首次使用", "登录 / 注册\n协议与权限确认"],
    ["绑定设备", "扫描设备\n确认绑定关系"],
    ["硬件录音", "开始录音\n标记和结束"],
    ["同步文件", "上传文件\nCRC 校验"],
    ["生成内容", "转写\nAI 摘要"],
    ["使用结果", "查看笔记\n导出分享"]
  ];
  return `<figure class="diagram flow-diagram">
    <figcaption>端到端业务流程图</figcaption>
    <div class="flow-row">
      ${steps.map(([title, body], index) => `<div class="flow-step">
        <b>${index + 1}</b>
        ${diagramCard(`${title}\n${body}`)}
      </div>${index < steps.length - 1 ? '<span class="diagram-arrow">→</span>' : ""}`).join("")}
    </div>
  </figure>`;
}

function renderCoreFlowDiagram() {
  const columns = [
    ["入口检查", ["打开 App", "登录状态检查", "设备绑定检查"]],
    ["录音与同步", ["开始硬件录音", "结束后回到首页", "存在同步任务时展示进度"]],
    ["文件处理", ["进入文件列表", "生成方式与用量确认", "转写 / AI 生成"]],
    ["结果使用", ["文件详情", "分享 / 导出", "用量账本"]]
  ];
  return `<figure class="diagram core-diagram">
    <figcaption>核心业务流程</figcaption>
    <div class="core-grid">
      ${columns.map(([title, items]) => `<section>
        <h4>${escapeHtml(title)}</h4>
        ${items.map((item, index) => `${diagramCard(item)}${index < items.length - 1 ? '<span class="down-arrow">↓</span>' : ""}`).join("")}
      </section>`).join("")}
    </div>
  </figure>`;
}

function renderStateDiagram() {
  const states = ["待登录", "待绑定", "设备可用", "录音中", "同步中", "待生成", "生成中", "可查看 / 可分享"];
  return `<figure class="diagram state-diagram">
    <figcaption>关键状态流转</figcaption>
    <div class="state-chain">
      ${states.map((state, index) => `${diagramCard(state)}${index < states.length - 1 ? '<span class="diagram-arrow">→</span>' : ""}`).join("")}
    </div>
  </figure>`;
}

function renderGenericMermaidDiagram(code) {
  const labels = [];
  code.split(/\r?\n/).forEach((line) => {
    const match = line.match(/[A-Za-z0-9_]+(?:\[[^\]]+\]|\([^)]+\)|\{[^}]+\})/g);
    if (!match) return;
    match.forEach((token) => {
      const label = token.replace(/^[A-Za-z0-9_]+[\[\(\{]/, "").replace(/[\]\)\}]$/, "").replace(/^"|"$/g, "").replace(/<br\s*\/?>/g, "\n");
      if (label && !labels.includes(label)) labels.push(label);
    });
  });
  const shown = labels.length ? labels : code.split(/\r?\n/).filter((line) => line.trim() && !line.trim().startsWith("%%")).slice(0, 8);
  return `<figure class="diagram generic-diagram">
    <figcaption>流程图</figcaption>
    <div class="generic-grid">${shown.slice(0, 12).map((label) => diagramCard(label)).join("")}</div>
  </figure>`;
}

function renderMermaidDiagram(code) {
  if (code.includes("stateDiagram")) return renderStateDiagram();
  if (code.includes('ROOT["AI录音卡 App"]')) return renderOverviewDiagram();
  if (code.includes("首次使用") || code.includes("结束录音")) return renderBusinessFlowDiagram();
  if (code.includes("打开 App") || code.includes("未登录?") || code.includes("开始录音")) return renderCoreFlowDiagram();
  return renderGenericMermaidDiagram(code);
}

function parseTable(lines, start) {
  const tableLines = [];
  let index = start;
  while (index < lines.length && /^\s*\|.*\|\s*$/.test(lines[index])) {
    tableLines.push(lines[index]);
    index += 1;
  }
  if (tableLines.length < 2 || !/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(tableLines[1])) {
    return null;
  }
  const rows = tableLines
    .filter((_, rowIndex) => rowIndex !== 1)
    .map((line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim()));
  const head = rows[0] || [];
  const body = rows.slice(1);
  const html = `<table><thead><tr>${head.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  return { html, next: index };
}

function flushParagraph(out, paragraph) {
  if (!paragraph.length) return;
  out.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
  paragraph.length = 0;
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const out = [];
  const paragraph = [];
  let listOpen = false;
  let listType = null;

  function closeList() {
    if (listOpen) {
      out.push(`</${listType}>`);
      listOpen = false;
      listType = null;
    }
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      flushParagraph(out, paragraph);
      closeList();
      const lang = trimmed.slice(3).trim();
      const code = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      if (lang === "mermaid") {
        out.push(renderMermaidDiagram(code.join("\n")));
        continue;
      }
      const className = lang ? ` class="language-${escapeHtml(lang)}${lang === "mermaid" ? " mermaid" : ""}"` : "";
      out.push(`<pre${className}><code>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    if (!trimmed) {
      flushParagraph(out, paragraph);
      closeList();
      continue;
    }

    if (/^\s*\|.*\|\s*$/.test(line)) {
      const parsed = parseTable(lines, index);
      if (parsed) {
        flushParagraph(out, paragraph);
        closeList();
        out.push(parsed.html);
        index = parsed.next - 1;
        continue;
      }
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(trimmed);
    if (heading) {
      flushParagraph(out, paragraph);
      closeList();
      const level = heading[1].length;
      out.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      flushParagraph(out, paragraph);
      closeList();
      out.push("<hr>");
      continue;
    }

    const bullet = /^[-*]\s+(.+)$/.exec(trimmed);
    if (bullet) {
      flushParagraph(out, paragraph);
      if (listOpen && listType !== "ul") closeList();
      if (!listOpen) {
        out.push("<ul>");
        listOpen = true;
        listType = "ul";
      }
      out.push(`<li>${inlineMarkdown(bullet[1])}</li>`);
      continue;
    }

    const ordered = /^\d+\.\s+(.+)$/.exec(trimmed);
    if (ordered) {
      flushParagraph(out, paragraph);
      if (listOpen && listType !== "ol") closeList();
      if (!listOpen) {
        out.push("<ol>");
        listOpen = true;
        listType = "ol";
      }
      out.push(`<li>${inlineMarkdown(ordered[1])}</li>`);
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph(out, paragraph);
  closeList();
  return out.join("\n");
}

const markdown = fs.readFileSync(sourcePath, "utf8");
const body = markdownToHtml(markdown);
const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AI录音卡 App 需求文档 v3.0</title>
  <style>
    :root {
      --ink: #303030;
      --muted: #737373;
      --line: #e6e6e6;
      --soft: #f7f7f7;
      --code: #f3f4f6;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #fff;
      color: var(--ink);
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Microsoft YaHei", sans-serif;
    }
    main {
      width: min(1060px, calc(100vw - 96px));
      margin: 0 auto;
      padding: 54px 0 96px;
    }
    h1 {
      margin: 0 0 18px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--line);
      font-size: 36px;
      line-height: 1.15;
      letter-spacing: 0;
    }
    h2 {
      margin: 54px 0 20px;
      padding-top: 24px;
      border-top: 2px solid var(--line);
      font-size: 29px;
      line-height: 1.2;
      letter-spacing: 0;
    }
    h3 {
      margin: 30px 0 16px;
      font-size: 23px;
      line-height: 1.3;
    }
    h4, h5, h6 {
      margin: 24px 0 12px;
      font-size: 18px;
      line-height: 1.35;
    }
    p, li {
      color: #4d4d4d;
      font-size: 16px;
      line-height: 1.82;
    }
    ul {
      padding-left: 24px;
    }
    table {
      width: 100%;
      margin: 18px 0 34px;
      border-collapse: collapse;
      border: 1px solid #dde2e7;
      font-size: 15px;
    }
    th, td {
      padding: 11px 14px;
      border: 1px solid #dde2e7;
      text-align: left;
      vertical-align: top;
    }
    th {
      background: var(--soft);
      font-weight: 800;
    }
    tr:nth-child(even) td {
      background: #fcfcfc;
    }
    code {
      padding: 2px 6px;
      border: 1px solid #e0e4e8;
      border-radius: 4px;
      background: var(--code);
      color: #333;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: .92em;
    }
    pre {
      margin: 18px 0 30px;
      padding: 18px;
      overflow: auto;
      border: 1px solid #dde2e7;
      border-radius: 8px;
      background: #f7f8fa;
      color: #333;
      line-height: 1.58;
    }
    pre code {
      padding: 0;
      border: 0;
      background: transparent;
      white-space: pre;
    }
    .diagram {
      margin: 22px 0 42px;
      padding: 24px;
      overflow: auto;
      border: 1px solid #e2e4ea;
      border-radius: 12px;
      background: #fbfbfa;
    }
    .diagram figcaption {
      margin-bottom: 18px;
      color: #222;
      font-size: 16px;
      font-weight: 800;
    }
    .diagram-card {
      min-width: 120px;
      min-height: 46px;
      display: grid;
      place-items: center;
      gap: 2px;
      padding: 10px 14px;
      border: 1px solid #d9dde5;
      border-radius: 6px;
      background: #fff;
      color: #303030;
      text-align: center;
      font-size: 14px;
      line-height: 1.35;
      box-shadow: 0 4px 12px rgba(25, 30, 45, .04);
    }
    .diagram-card.root {
      min-width: 180px;
      background: #111;
      color: #fff;
      border-color: #111;
      font-weight: 800;
    }
    .overview-root {
      display: grid;
      place-items: center;
      margin-bottom: 24px;
    }
    .overview-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(210px, 1fr));
      gap: 16px;
    }
    .diagram-group {
      padding: 14px;
      border-radius: 10px;
      border: 1px solid #e1e4eb;
      background: #fff;
    }
    .diagram-group h4 {
      margin: 0 0 12px;
      color: #222;
      font-size: 15px;
    }
    .diagram-group > div {
      display: grid;
      gap: 8px;
    }
    .diagram-group.blue { border-top: 4px solid #4b8cff; }
    .diagram-group.green { border-top: 4px solid #59c436; }
    .diagram-group.amber { border-top: 4px solid #f2a32b; }
    .diagram-group.purple { border-top: 4px solid #8b6cff; }
    .diagram-group.gray { border-top: 4px solid #8d949e; }
    .diagram-group.red { border-top: 4px solid #ff6b5e; }
    .flow-row,
    .state-chain {
      min-width: 920px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .flow-step {
      display: grid;
      gap: 8px;
      justify-items: center;
    }
    .flow-step b {
      width: 26px;
      height: 26px;
      display: grid;
      place-items: center;
      border-radius: 999px;
      background: #111;
      color: #fff;
      font-size: 13px;
    }
    .diagram-arrow,
    .down-arrow {
      color: #6b7280;
      font-size: 22px;
      font-weight: 800;
    }
    .core-grid {
      min-width: 820px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 18px;
      align-items: start;
    }
    .core-grid section {
      display: grid;
      justify-items: center;
      gap: 8px;
    }
    .core-grid h4 {
      margin: 0 0 8px;
      font-size: 15px;
    }
    .generic-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
    }
    hr {
      height: 1px;
      margin: 42px 0 0;
      border: 0;
      background: var(--line);
    }
    @media (max-width: 860px) {
      main { width: calc(100vw - 36px); padding-top: 28px; }
      h1 { font-size: 30px; }
      h2 { font-size: 24px; }
      table { display: block; overflow: auto; }
    }
  </style>
</head>
<body>
  <main class="markdown-preview">
${body}
  </main>
</body>
</html>
`;

fs.writeFileSync(outputPath, html);
console.log(`Built ${path.relative(root, outputPath)}`);
