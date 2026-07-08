const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");
const appPath = path.join(root, "app.js");
const index = fs.readFileSync(indexPath, "utf8");
const app = fs.readFileSync(appPath, "utf8");
let built = false;

let inline = index.replace(
  /\s*<script src="\.\/app\.js"><\/script>\s*<\/body>/,
  `\n  <script>\n${app}\n  </script>\n</body>`
);
built = inline !== index;

if (!built) {
  const marker = "const waveHeights = [";
  const markerAt = index.indexOf(marker);
  const scriptStart = markerAt >= 0 ? index.lastIndexOf("<script", markerAt) : -1;
  const scriptCloseStart = markerAt >= 0 ? index.indexOf("</script>", markerAt) : -1;

  if (scriptStart >= 0 && scriptCloseStart > scriptStart) {
    const scriptCloseEnd = scriptCloseStart + "</script>".length;
    inline = `${index.slice(0, scriptStart)}<script>\n${app}\n  </script>${index.slice(scriptCloseEnd)}`;
    built = true;
  }
}

if (!built) {
  throw new Error("Cannot find app.js script block in index.html");
}

fs.writeFileSync(indexPath, inline, "utf8");
console.log("Built inline index.html");
