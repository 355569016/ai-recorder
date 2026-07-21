const fs = require("fs");
const os = require("os");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.resolve(root, "..", "AI录音卡App需求文档_v3.0.md");
const outputPath = path.join(root, "prd-preview.html");
const vendorDir = path.join(root, "vendor");
const vendorMermaidPath = path.join(vendorDir, "mermaid.min.js");

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
  const tokens = [];
  let value = String(text ?? "").replace(/<span\s+style="color:\s*(#[0-9a-fA-F]{3,8})"\s*>|<\/span>/g, (match, color) => {
    const token = color ? `<span class="source-highlight" style="--source-color:${color}">` : "</span>";
    tokens.push(token);
    return `@@HTML_TOKEN_${tokens.length - 1}@@`;
  });

  value = escapeHtml(value);
  value = value.replace(/`([^`]+)`/g, "<code>$1</code>");
  value = value.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  value = value.replace(/【待确认】/g, '<span class="review-tag">待确认</span>');
  value = value.replace(/@@HTML_TOKEN_(\d+)@@/g, (_, index) => tokens[Number(index)] || "");
  return value;
}

function findMermaidDist() {
  const candidates = [vendorMermaidPath];
  if (process.env.MERMAID_DIST_PATH) candidates.push(process.env.MERMAID_DIST_PATH);

  try {
    candidates.push(require.resolve("mermaid/dist/mermaid.min.js"));
  } catch {
    // Continue with local package-cache discovery.
  }

  const npxRoot = path.join(os.homedir(), ".npm", "_npx");
  if (fs.existsSync(npxRoot)) {
    fs.readdirSync(npxRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .forEach((entry) => candidates.push(path.join(npxRoot, entry.name, "node_modules", "mermaid", "dist", "mermaid.min.js")));
  }

  return candidates.find((candidate) => candidate && fs.existsSync(candidate));
}

function ensureMermaidVendor() {
  const mermaidDist = findMermaidDist();
  if (!mermaidDist) {
    throw new Error("Mermaid runtime not found. Install the mermaid package or set MERMAID_DIST_PATH before building the PRD preview.");
  }
  fs.mkdirSync(vendorDir, { recursive: true });
  if (!fs.existsSync(vendorMermaidPath) || fs.statSync(vendorMermaidPath).size !== fs.statSync(mermaidDist).size) {
    fs.copyFileSync(mermaidDist, vendorMermaidPath);
  }
}

function renderMermaidDiagram(code, diagramIndex) {
  const whiteLabelNodeIds = [...code.matchAll(/^\s*style\s+([A-Za-z0-9_]+)\s+[^\n]*color:\s*#fff\b/gim)].map((match) => match[1]);
  return `<figure class="diagram mermaid-diagram" aria-label="需求流程图 ${diagramIndex}">
    <div class="diagram-scroll">
      <pre class="mermaid" id="mermaid-diagram-${diagramIndex}" data-white-labels="${escapeHtml(whiteLabelNodeIds.join(","))}">${escapeHtml(code)}</pre>
    </div>
  </figure>`;
}

function parseTable(lines, start) {
  const tableLines = [];
  let index = start;
  while (index < lines.length && /^\s*\|.*\|\s*$/.test(lines[index])) {
    tableLines.push(lines[index]);
    index += 1;
  }
  if (tableLines.length < 2 || !/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(tableLines[1])) return null;

  const rows = tableLines
    .filter((_, rowIndex) => rowIndex !== 1)
    .map((line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim()));
  const head = rows[0] || [];
  const body = rows.slice(1);
  const table = `<table><thead><tr>${head.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  return { html: `<div class="table-wrap">${table}</div>`, next: index };
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
  let diagramIndex = 0;

  function closeList() {
    if (!listOpen) return;
    out.push(`</${listType}>`);
    listOpen = false;
    listType = null;
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
        diagramIndex += 1;
        out.push(renderMermaidDiagram(code.join("\n"), diagramIndex));
      } else {
        const className = lang ? ` class="language-${escapeHtml(lang)}"` : "";
        out.push(`<pre${className}><code>${escapeHtml(code.join("\n"))}</code></pre>`);
      }
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
      const plain = heading[2].replace(/<[^>]+>/g, "");
      const anchor = plain.toLowerCase().replace(/[^a-z0-9\u3400-\u9fff]+/g, "-").replace(/^-|-$/g, "");
      out.push(`<h${level} id="${escapeHtml(anchor)}">${inlineMarkdown(heading[2])}</h${level}>`);
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
  return { html: out.join("\n"), diagramCount: diagramIndex };
}

ensureMermaidVendor();
const markdown = fs.readFileSync(sourcePath, "utf8");
const rendered = markdownToHtml(markdown);
const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AI录音卡 App 需求文档 v3.0</title>
  <style>
    :root {
      --ink: #303033;
      --muted: #67676d;
      --line: #e5e7eb;
      --soft: #f7f8fa;
      --accent: #0b74de;
      --code: #f3f4f6;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      background: #fff;
      color: var(--ink);
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Microsoft YaHei", sans-serif;
    }
    main {
      width: min(1280px, calc(100vw - 96px));
      margin: 0 auto;
      padding: 54px 0 110px;
    }
    h1 {
      margin: 0 0 18px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--line);
      font-size: 38px;
      line-height: 1.15;
    }
    h2 {
      margin: 58px 0 20px;
      padding-top: 26px;
      border-top: 2px solid var(--line);
      font-size: 30px;
      line-height: 1.2;
    }
    h3 { margin: 34px 0 16px; font-size: 24px; line-height: 1.3; }
    h4, h5, h6 { margin: 26px 0 12px; font-size: 19px; line-height: 1.4; }
    p, li { color: #4c4c52; font-size: 16px; line-height: 1.86; }
    p { margin: 10px 0 18px; }
    ul, ol { margin: 10px 0 22px; padding-left: 26px; }
    li + li { margin-top: 4px; }
    strong { color: #27272a; }
    .source-highlight { color: var(--source-color, var(--accent)); font-weight: 560; }
    .review-tag {
      display: inline-flex;
      align-items: center;
      padding: 1px 7px;
      border: 1px solid #f5bf59;
      border-radius: 999px;
      background: #fff7e6;
      color: #a65f00;
      font-size: .86em;
      font-weight: 750;
      white-space: nowrap;
    }
    .table-wrap {
      width: 100%;
      margin: 18px 0 36px;
      overflow-x: auto;
      border: 1px solid #dfe3e8;
    }
    table { width: 100%; border-collapse: collapse; font-size: 15px; }
    th, td {
      min-width: 72px;
      padding: 12px 14px;
      border-right: 1px solid #dfe3e8;
      border-bottom: 1px solid #dfe3e8;
      text-align: left;
      vertical-align: top;
      line-height: 1.65;
    }
    th:last-child, td:last-child { border-right: 0; }
    tbody tr:last-child td { border-bottom: 0; }
    th { background: #f6f7f8; color: #303036; font-weight: 800; }
    tr:nth-child(even) td { background: #fcfcfd; }
    code {
      padding: 2px 6px;
      border: 1px solid #e0e4e8;
      border-radius: 4px;
      background: var(--code);
      color: #333;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: .92em;
    }
    pre:not(.mermaid) {
      margin: 18px 0 30px;
      padding: 18px;
      overflow: auto;
      border: 1px solid #dde2e7;
      border-radius: 8px;
      background: #f7f8fa;
      color: #333;
      line-height: 1.58;
    }
    pre:not(.mermaid) code { padding: 0; border: 0; background: transparent; white-space: pre; }
    .diagram { margin: 18px 0 6px; padding: 0; overflow: hidden; background: #fff; }
    .diagram + p { margin-top: 0; }
    .diagram-scroll { width: 100%; overflow-x: auto; }
    .mermaid {
      min-width: 900px;
      margin: 0;
      opacity: 0;
      transition: opacity .12s ease;
    }
    .mermaid[data-processed="true"] { opacity: 1; }
    .mermaid svg { display: block; width: 100%; max-width: none !important; height: auto; margin: 0 auto; }
    hr { height: 1px; margin: 46px 0 0; border: 0; background: var(--line); }
    @media (max-width: 860px) {
      main { width: calc(100vw - 36px); padding-top: 28px; }
      h1 { font-size: 30px; }
      h2 { font-size: 25px; }
      h3 { font-size: 21px; }
    }
    @media print {
      main { width: 100%; padding: 0; }
      .diagram-scroll, .table-wrap { overflow: visible; }
      .mermaid { min-width: 0; }
    }
  </style>
</head>
<body>
  <main class="markdown-preview" data-source="AI录音卡App需求文档_v3.0.md" data-diagram-count="${rendered.diagramCount}">
${rendered.html}
  </main>
  <script src="./vendor/mermaid.min.js"></script>
  <script>
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif",
      flowchart: { htmlLabels: true, useMaxWidth: true, curve: "linear" },
      themeVariables: {
        primaryColor: "#eeecff",
        primaryTextColor: "#35333b",
        primaryBorderColor: "#9b7cff",
        lineColor: "#4e4e53",
        secondaryColor: "#f7f5ff",
        tertiaryColor: "#ffffff"
      }
    });
    window.addEventListener("DOMContentLoaded", async () => {
      try {
        await mermaid.run({ querySelector: ".mermaid" });
        document.querySelectorAll(".mermaid[data-white-labels]").forEach((diagram) => {
          const whiteLabelNodeIds = diagram.dataset.whiteLabels.split(",").filter(Boolean);
          diagram.querySelectorAll("g.node").forEach((node) => {
            if (!whiteLabelNodeIds.some((nodeId) => node.id.includes("-" + nodeId + "-"))) return;
            node.style.setProperty("color", "#fff", "important");
            node.querySelectorAll(".label, .nodeLabel, .nodeLabel p, foreignObject div, foreignObject span").forEach((label) => {
              label.style.setProperty("color", "#fff", "important");
            });
            node.querySelectorAll("text, tspan").forEach((label) => {
              label.setAttribute("fill", "#fff");
              label.style.setProperty("fill", "#fff", "important");
            });
          });
        });
      } catch (error) {
        console.error(error);
      }
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(outputPath, html);
console.log(`Built ${path.relative(root, outputPath)} from ${path.basename(sourcePath)} (${rendered.diagramCount} Mermaid diagrams)`);
