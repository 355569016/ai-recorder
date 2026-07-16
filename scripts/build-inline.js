const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");
const appPath = path.join(root, "app.js");
const index = fs.readFileSync(indexPath, "utf8");
const app = fs.readFileSync(appPath, "utf8");

function stripExistingAppScripts(html) {
  const marker = "const waveHeights = [";
  let output = html.replace(/\s*<script\s+src="\.\/app\.js(?:\?[^"]*)?"><\/script>/g, "");

  while (true) {
    const markerAt = output.indexOf(marker);
    if (markerAt < 0) break;

    const scriptStart = output.lastIndexOf("<script", markerAt);
    const scriptCloseStart = output.indexOf("</script>", markerAt);
    if (scriptStart < 0 || scriptCloseStart <= scriptStart) {
      throw new Error("Cannot remove existing inline app script block");
    }

    const scriptCloseEnd = scriptCloseStart + "</script>".length;
    output = `${output.slice(0, scriptStart)}${output.slice(scriptCloseEnd)}`;
  }

  return output;
}

const stripped = stripExistingAppScripts(index);
if (!/<\/body>/.test(stripped)) {
  throw new Error("Cannot find </body> in index.html");
}

const inline = stripped.replace(
  /\s*<\/body>/,
  `\n  <script>\n${app}\n  </script>\n</body>`
);

fs.writeFileSync(indexPath, inline, "utf8");
console.log("Built inline index.html");
