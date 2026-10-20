// Execute actual delegated clicks and timer callbacks; browser checks cover scrolling/visibility.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '..', 'app.js'), 'utf8');
const handlers = {}, timers = new Map();
let serial = 0;
const context = vm.createContext({
  URL, URLSearchParams, console, navigator: {}, CSS: { escape: x => x },
  document: {
    body: { classList: { toggle() {} } },
    addEventListener(type, fn) { (handlers[type] ||= []).push(fn); },
    querySelector() { return null; }, querySelectorAll() { return []; }, getElementById() { return null; }
  },
  window: {
    location: { search: '?page=APP-FILE-23', href: 'http://localhost/?page=APP-FILE-23' },
    localStorage: { getItem() { return null; }, setItem() {} }, addEventListener() {}, scrollTo() {},
    setTimeout(fn, delay) { timers.set(++serial, { fn, delay }); return serial; },
    clearTimeout(id) { timers.delete(id); },
    clearInterval(id) { timers.delete(id); },
    setInterval(fn, delay) { timers.set(++serial, { fn, delay }); return serial; }
  },
  requestAnimationFrame() {}, setTimeout() {}, clearTimeout() {}
});
vm.runInContext(source.slice(0, source.lastIndexOf('\napplyShowcasePreset(showcasePreset);')), context);
const run = code => vm.runInContext(code, context);
run('render = () => {}; schedulePrototypeViewportTopReset = () => {};');
function click(action, value = '', review = true) {
  const button = { dataset: { action, value, reviewOwner: run('currentPageId') } };
  const target = { closest(selector) {
    if ((review && selector === '#nav, #prototypeLinks, #flowStrip') || (!review && selector === '#phone')) return button;
    if (selector === '[data-action]' || (review && selector === '#prototypeLinks [data-review-owner]')) return button;
    return null;
  } };
  handlers.click.forEach(fn => fn({ target, preventDefault() {} }));
}
function finish(id) { const timer = timers.get(id); assert.ok(timer, `timer ${id}`); timers.delete(id); timer.fn(); }
for (const [page, kind, prefix, items] of [
  ['APP-FILE-23', 'recycle', 'recycle', 'recycleBinItems'],
  ['APP-HOME-01', 'home-file', 'homeFile', 'homeFileItems'],
  ['APP-FILE-12', 'search-result', 'searchResult', 'searchResultsCatalog']
]) {
  run(`currentPageId = '${page}';`);
  if (kind !== 'search-result') run(`${items} = [];`);
  click(`set-${kind}-list-state`, 'error');
  assert.ok(run(`${items}.length > 10`));
  assert.equal(run(`${prefix}LoadError`), true);
  click(`set-${kind}-list-state`, 'loading');
  assert.equal(run(`${prefix}Loading`), true);
  assert.equal(run(`${prefix}LoadTimer`), null);
  assert.equal(run(`${prefix}Loading`), true);
  // Phone actions still use the existing loading duration and completion.
  click(`set-${kind}-list-state`, 'loading', false);
  const timer = run(`${prefix}LoadTimer`);
  assert.equal(timers.get(timer).delay, 1200);
  finish(timer);
  assert.equal(run(`${prefix}Loading`), false);
  assert.equal(run(`${prefix}VisibleCount`), run(`${items}.length`));
  // A new selection cancels pending append; stale callback cannot overwrite its flags.
  click(`set-${kind}-list-state`, 'loading', false);
  const cancelled = run(`${prefix}LoadTimer`);
  click(`set-${kind}-list-state`, 'error');
  assert.equal(timers.has(cancelled), false);
  click(`set-${kind}-list-state`, 'loaded-all');
  assert.equal(run(`${prefix}VisibleCount`), run(`${items}.length`));
}
run(`currentPageId = 'APP-FILE-12'`);
click('set-search-result-state', 'loading');
assert.equal(run('searchResultState'), 'loading');
assert.equal(run('reviewTransitionTimer'), null);
assert.equal(run('searchResultState'), 'loading');
click('set-search-result-state', 'loading', false);
finish(run('reviewTransitionTimer'));
assert.equal(run('searchResultState'), 'results');
click('set-search-result-state', 'loading', false);
const pending = run('reviewTransitionTimer');
run(`go('APP-FILE-02')`);
assert.equal(timers.has(pending), false);
// The failure review entry immediately triggers a real error Toast, not a hidden flag.
click('set-search-cloud-state', 'fail-next');
assert.match(run('searchCloudNotice'), /开启失败/);
assert.equal(run('cloudSyncEnabled'), false);
assert.equal(run('searchCloudNoticeTimer'), null);
click('set-search-cloud-state', 'fail-next', false);
click('enable-search-cloud-sync', '', false);
finish(run('searchCloudNoticeTimer'));
assert.equal(run('searchCloudNotice'), '');
run(`currentPageId = 'APP-FILE-23'; selectedRecycleIds = new Set(['recycle-1']); recycleBinItems = defaultRecycleBinItems.map(x => ({...x}));`);
click('restore-recycle-items', '', false);
assert.match(run('recycleNotice'), /已恢复 1/);
finish(run('recycleNoticeTimer'));
assert.equal(run('recycleNotice'), '');
run(`homeStorageShortagePromptOpen = false; homeSyncTransport = 'ble'; homeSyncQueue = [];`);
for (const action of ['close-home-storage-shortage', 'end-home-fast-transfer', 'home-complete-sync']) {
  assert.equal(run(`reviewActionAvailable('${action}')`), false);
}
run(`enterPrototypeReview(); currentPageId = 'APP-ME-10'; restorePurchaseState = 'loading'; renderRestorePurchase();`);
assert.equal(run('restorePurchaseTimer'), null);
run(`prototypeReviewMode = false; renderRestorePurchase();`);
finish(run('restorePurchaseTimer'));
assert.equal(run('restorePurchaseState'), 'not-found');
run(`currentPageId = 'APP-FILE-01';`);
click('set-ask-demo-state', 'thinking');
assert.equal(run('askPlaudThinkingTimer'), null);
click('set-ask-demo-state', 'thinking', false);
finish(run('askPlaudThinkingTimer'));
assert.equal(run('askPlaudThinkingStage'), 'process');
finish(run('askPlaudThinkingTimer'));
assert.equal(run('askPlaudMode'), 'answer');
// Review transport/recovery must remain visible after no-task/no-device states.
run(`currentPageId = 'APP-HOME-01'; homeSyncQueue = []; homeSyncStage = 'idle';`);
click('set-sync-transport', 'ble');
assert.ok(run('homeSyncQueue.length > 0'));
run('homeDeviceAdded = false;');
click('home-set-sync-recovery', 'storage-blocked');
assert.equal(run('homeDeviceAdded && homeStorageShortagePromptOpen'), true);
// A Toast page remains compatible by ID but returns after the transient feedback.
run(`enterPrototypeReview(); currentPageId = 'APP-HOME-03'; renderHomeTrashToast();`);
assert.equal(run('homeTrashToastTimer'), null);
assert.equal(run('currentPageId'), 'APP-HOME-03');
run(`prototypeReviewMode = false; renderHomeTrashToast();`);
finish(run('homeTrashToastTimer'));
assert.equal(run('currentPageId'), 'APP-HOME-01');
// Static bottom previews keep every existing list state, even when toolbar actions are unavailable.
for (const page of ['APP-HOME-01', 'APP-FILE-23', 'APP-FILE-12']) {
  assert.ok(run(`reviewPageSnapshots(pageById('${page}')).some(x => /加载失败/.test(x.label))`));
}
// A stale callback cannot overwrite a newly reviewed state, even after returning to the phone.
run(`prototypeReviewMode = false; currentPageId = 'APP-SYNC-01'; hotspotTransferState = 'systemPrompt';`);
click('confirm-hotspot-join', '', false);
const staleJoin = timers.get(run('syncPrototypeTimer')).fn;
click('set-hotspot-state', 'connecting');
assert.equal(run('syncPrototypeTimer'), null);
assert.equal(run('reviewTransitionTimer'), null);
run('prototypeReviewMode = false');
staleJoin();
assert.equal(run('currentPageId'), 'APP-SYNC-01');
assert.equal(run('hotspotTransferState'), 'connecting');
click('confirm-hotspot-join', '', false);
finish(run('syncPrototypeTimer'));
assert.equal(run('currentPageId'), 'APP-HOME-01');
// Directory entry freezes automatic OTA progression; phone entry retains it.
run(`enterPrototypeReview(); go('APP-DEV-08');`);
assert.equal(run('firmwareUpdateStep'), 'download');
assert.equal(run('firmwareUpdateTimer'), null);
run(`prototypeReviewMode = false; beginFirmwareUpdateFlow();`);
finish(run('firmwareUpdateTimer'));
assert.equal(run('firmwareUpdateStep'), 'connect');
console.log('Review-action contracts passed: frozen review states, phone timing, list completion, stale callback isolation, hotspot and OTA flows, static previews.');

run(`currentPageId = 'APP-HOME-01'; setHomeCloudDemoState('phone-ready');`);
const readyHtml = run('renderHome()');
run("setHomeCloudDemoState('disabled')");
assert.equal(readyHtml, run('renderHome()'));
assert.equal(run("reviewActionAvailable('home-set-cloud-state', 'disabled')"), false);

// Static previews never schedule a restore-purchase completion.
const staticContext = vm.createContext({ ...context, window: { ...context.window,
  location: { search: '?page=APP-ME-10&showcase=restore-loading' } } });
vm.runInContext(source.slice(0, source.lastIndexOf('\napplyShowcasePreset(showcasePreset);')), staticContext);
vm.runInContext('restorePurchaseState = "loading"; renderRestorePurchase();', staticContext);
assert.equal(vm.runInContext('restorePurchaseTimer', staticContext), null);
