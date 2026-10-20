// Controller/metadata contracts. Actual rendered dialogs are verified in-browser.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const bootstrap = source.slice(0, source.lastIndexOf("\napplyShowcasePreset(showcasePreset);"));
const context = vm.createContext({
  URL, URLSearchParams, console,
  document: {
    body: { classList: { toggle() {} } }, addEventListener() {},
    querySelectorAll() { return []; }, querySelector() { return null; }, getElementById() { return null; }
  },
  window: {
    location: { search: "?page=APP-FILE-02", href: "http://localhost/?page=APP-FILE-02" },
    localStorage: { getItem() { return null; }, setItem() {} },
    addEventListener() {}, clearTimeout() {}, setTimeout() { return 1; }, scrollTo() {}
  },
  requestAnimationFrame() {}, navigator: {}, setTimeout() { return 1; }, clearTimeout() {},
  CSS: { escape(value) { return value; } }
});
vm.runInContext(bootstrap, context);
vm.runInContext("render = () => {}; schedulePrototypeViewportTopReset = () => {}; focusFindReplaceInput = () => {};", context);
const run = (code) => vm.runInContext(code, context);

assert.equal(run("Object.keys(hostedViewRelations).length"), 18);
assert.equal(run(`Object.entries(hostedViewRelations).every(([id, r]) =>
  pages.some(p => p.id === id) && typeof renderers[id] === 'function' &&
  r.parents.every(host => pages.some(p => p.id === host)))`), true);

// A stable ID enters its declared host and closes without leaving that host.
run(`for (const [id, relation] of Object.entries(hostedViewRelations)) {
  hostedViewContext = null; currentPageId = relation.host;
  go(id);
  if (currentPageId !== id || reviewPageId() !== relation.host) throw Error(id + ': open');
  go(relation.host);
  if (currentPageId !== relation.host || hostedViewContext) throw Error(id + ': close');
}`);

// Opening/closing a modal must not trigger the root page's normal entry resets.
run(`currentPageId = 'APP-HOME-01'; homeFileVisibleCount = 20;
  go('APP-FILE-13'); go('APP-HOME-01');`);
assert.equal(run("homeFileVisibleCount"), 20);

run(`currentPageId = 'APP-FILE-02'; searchDraft = '保留搜索词'; searchTimeFilter = 'week';
  go('APP-FILE-11'); searchTimeFilter = 'today'; go('APP-FILE-02');`);
assert.equal(run("searchDraft"), "保留搜索词");
assert.equal(run("searchTimeFilter"), "week");
run(`go('APP-FILE-11'); searchTimeFilter = 'today'; searchTimeEditSnapshot = null; go('APP-FILE-02');`);
assert.equal(run("searchTimeFilter"), "today");
run(`go('APP-FILE-11'); searchTimeFilter = 'month'; activateReviewActionOwner('APP-FILE-02');`);
assert.equal(run("currentPageId"), "APP-FILE-02");
assert.equal(run("searchTimeFilter"), "today");

// Shared popup close targets return to the actual origin, not a hardcoded state.
run(`currentPageId = 'APP-FILE-10'; fileDetailActiveTab = 'markers';
  go('APP-FILE-07'); go('APP-FILE-18'); go('APP-FILE-01');`);
assert.equal(run("currentPageId"), "APP-FILE-10");
assert.equal(run("fileDetailActiveTab"), "markers");
run(`currentPageId = 'APP-FILE-08'; go('APP-FILE-09'); go('APP-FILE-20');`);
assert.equal(run("currentPageId"), "APP-FILE-08");

// Confirming an action into a real workflow still leaves the popup host.
run(`currentPageId = 'APP-FILE-01'; go('APP-FILE-18'); go('APP-AI-01');`);
assert.equal(run("currentPageId"), "APP-AI-01");
assert.equal(run("hostedViewContext"), null);
assert.equal(run(`['APP-FILE-16','APP-FILE-19','APP-FILE-22','APP-FILE-24','APP-REC-03','APP-ME-22','APP-DEV-07']
  .some(id => hostedViewRelations[id])`), false);

// Each parent exposes every child/default/preset once, including the home ordering.
run(`for (const page of pages) {
  const snapshots = reviewPageSnapshots(page);
  const urls = snapshots.map(s => showcaseUrl(s.pageId, s.preset, s.hostId));
  if (new Set(urls).size !== urls.length) throw Error(page.id + ': duplicate snapshot');
  const grouped = groupPrototypeReviewItems(page.id, snapshots).flatMap(([, items]) => items);
  if (grouped.length !== snapshots.length) throw Error(page.id + ': dropped snapshot');
  for (const [id] of hostedViewsFor(page.id)) {
    if (!snapshots.some(s => s.pageId === id && !s.preset)) throw Error(page.id + ': missing ' + id);
    for (const [, preset] of verifiedPageShowcases[id] || []) {
      if (!snapshots.some(s => s.pageId === id && s.preset === preset)) throw Error(page.id + ': missing preset');
    }
  }
}`);
console.log("Hosted-view contracts passed: 18 stable IDs, contextual return, draft cancel/apply, independent flows, complete parent previews.");
