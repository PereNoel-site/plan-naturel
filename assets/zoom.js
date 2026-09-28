(function () {
  if (window.__pnZoom) return; window.__pnZoom = true;
  var st = document.createElement('style');
  st.textContent = 'figure img{cursor:zoom-in}' +
    '.pnz{position:fixed;inset:0;z-index:9999;background:rgba(24,28,24,.94);display:flex;flex-direction:column}' +
    '.pnz-bar{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 16px;color:#fbf9f5;font:600 14px/1.3 system-ui,sans-serif}' +
    '.pnz-bar span{flex:1;min-width:0;opacity:.85}' +
    '.pnz button{width:44px;height:44px;flex-shrink:0;border-radius:999px;border:1px solid rgba(255,255,255,.35);background:transparent;color:#fff;font-size:22px;cursor:pointer}' +
    '.pnz-box{flex:1;min-height:0;overflow:auto;display:flex;padding:0 16px 16px;-webkit-overflow-scrolling:touch}' +
    '.pnz-box img{margin:auto;max-width:100%;max-height:100%;object-fit:contain;cursor:zoom-in;border-radius:4px;background:#fff}' +
    '.pnz.full .pnz-box img{max-width:none;max-height:none;cursor:zoom-out}';
  document.head.appendChild(st);
  var ov, last;
  function close() { if (!ov) return; ov.remove(); ov = null; document.body.style.overflow = ''; if (last) last.focus && last.focus(); }
  function open(img) {
    last = img; close();
    ov = document.createElement('div'); ov.className = 'pnz'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
    var bar = document.createElement('div'); bar.className = 'pnz-bar';
    var t = document.createElement('span'); t.textContent = 'Touchez l\u2019image pour zoomer';
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Fermer'); b.textContent = '\u00d7'; b.onclick = close;
    bar.appendChild(t); bar.appendChild(b);
    var box = document.createElement('div'); box.className = 'pnz-box';
    var big = document.createElement('img'); big.src = img.currentSrc || img.src; big.alt = img.alt || '';
    big.onclick = function (e) {
      e.stopPropagation();
      var r = big.getBoundingClientRect(), fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
      ov.classList.toggle('full');
      t.textContent = ov.classList.contains('full') ? 'Faites glisser pour explorer \u00b7 touchez pour r\u00e9duire' : 'Touchez l\u2019image pour zoomer';
      if (ov.classList.contains('full')) requestAnimationFrame(function () { box.scrollLeft = fx * box.scrollWidth - box.clientWidth / 2; box.scrollTop = fy * box.scrollHeight - box.clientHeight / 2; });
    };
    box.onclick = function (e) { if (e.target === box) close(); };
    box.appendChild(big); ov.appendChild(bar); ov.appendChild(box);
    document.body.appendChild(ov); document.body.style.overflow = 'hidden'; b.focus();
  }
  document.addEventListener('click', function (e) {
    var img = e.target.closest && e.target.closest('figure img');
    if (img && !img.closest('.pnz')) { e.preventDefault(); open(img); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
