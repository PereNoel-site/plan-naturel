/* Décor de Noël discret, s'éteint tout seul après le 6 janvier */
(function () {
  try {
    var now = new Date();
    if (now > new Date('2027-01-06T23:59:59')) return;
    var st = document.createElement('style');
    st.textContent = '@keyframes pn-tw{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(.7)}}' +
      '.pn-b{animation:pn-tw 1.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}' +
      '.pn-b:nth-child(2n){animation-delay:.5s}.pn-b:nth-child(3n){animation-delay:1s}.pn-b:nth-child(5n){animation-delay:1.3s}' +
      '.pn-g{position:absolute;left:0;right:0;top:100%;height:22px;pointer-events:none;overflow:hidden;z-index:1}' +
      '.pn-g svg{display:block}.pn-tt{animation:pn-tr 2.4s ease-in-out infinite}@keyframes pn-tr{0%,100%{filter:brightness(1)}50%{filter:brightness(1.35)}}' +
      '.pn-f{height:22px;overflow:hidden;pointer-events:none;margin-top:8px}.pn-f svg{display:block}' +
      '.pn-p{position:fixed;right:16px;bottom:16px;z-index:39;display:flex;flex-direction:column;align-items:flex-end;text-decoration:none;font:700 13px Figtree,system-ui,sans-serif}' +
      '.pn-pt{animation:pn-tr 2s ease-in-out infinite;margin-bottom:-6px;margin-right:14px;position:relative;z-index:2;filter:drop-shadow(0 2px 2px rgba(0,0,0,.18))}' +
      '.pn-pb{position:relative;background:#b3402f;color:#fff;padding:8px 14px;border-radius:999px;box-shadow:0 2px 8px rgba(0,0,0,.18)}' +
      '.pn-pr{margin-top:5px;background:#f5ead8;color:#201e1d;border:1px solid #b3402f;padding:4px 10px;border-radius:999px;font-weight:600;font-size:12px}' +
      '.pn-l{position:absolute;left:0;top:0;width:100%;pointer-events:none;z-index:1;overflow:hidden}' +
      '@media(prefers-reduced-motion:reduce){.pn-b{animation:none}}';
    document.head.appendChild(st);
    var cols = ['#b3402f', '#e0b04b', '#f5ead8', '#5f6f46', '#b3402f'];
    function garland(w, h) {
      var L = 140, s = '', b = '', i = 0, k;
      for (var x = 0; x < w; x += L, i++) {
        s += 'M' + x + ',1 Q' + (x + L / 2) + ',15 ' + (x + L) + ',1 ';
        for (k = 1; k <= 3; k++) {
          var t = k / 4, px = x + L * t, py = 1 + 28 * t * (1 - t);
          b += '<circle class="pn-b" cx="' + px + '" cy="' + (py + 3.5) + '" r="3" fill="' + cols[(i * 3 + k) % 5] + '"/>';
        }
      }
      return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true"><path d="' + s + '" fill="none" stroke="#7a8a5e" stroke-width="1" opacity=".7"/>' + b + '</svg>';
    }
    function init() {
      var h = document.querySelector('header');
      if (h) {
        if (getComputedStyle(h).position === 'static') h.style.position = 'relative';
        var d = document.createElement('div');
        d.className = 'pn-g';
        d.innerHTML = garland(Math.max(innerWidth, 1400), 22);
        h.appendChild(d);
      }
      var f = document.querySelector('footer');
      if (f && f.parentNode) {
        var r = document.createElement('div');
        r.className = 'pn-f';
        r.innerHTML = garland(Math.max(innerWidth, 1400), 22);
        f.parentNode.insertBefore(r, f);
      }
      var T = function (w, c1, c2) { return '<svg width="' + w + '" height="' + Math.round(w * 46 / 30) + '" viewBox="0 -6 30 46" aria-hidden="true"><polygon points="15,3 24,17 6,17" fill="' + c1 + '"/><polygon points="15,11 27,27 3,27" fill="' + c1 + '"/><polygon points="15,19 29,35 1,35" fill="' + c1 + '"/><rect x="13" y="35" width="4" height="5" fill="' + c2 + '"/><circle class="pn-b" cx="12" cy="23" r="1.9" fill="#b3402f"/><circle class="pn-b" cx="19" cy="30" r="1.9" fill="#f5ead8"/><circle class="pn-b" cx="14" cy="14" r="1.6" fill="#e0b04b"/><circle class="pn-b" cx="22" cy="24" r="1.5" fill="#f5ead8"/><circle class="pn-b" cx="8" cy="31" r="1.7" fill="#b3402f"/></svg>'; };
      var wrap = document.createElement('a');
      wrap.className = 'pn-p';
      wrap.href = '/devis';
      wrap.innerHTML = '<span class="pn-pt">' + T(46, '#7a8a5e', '#8a6a48') + '</span><span class="pn-pb"><svg style="position:absolute;left:-4px;top:-16px;transform:rotate(-14deg)" width="26" height="24" viewBox="0 0 26 24" aria-hidden="true"><polygon points="4,20 22,20 15,3 10,2" fill="#d94a38"/><rect x="2" y="17.5" width="22" height="5" rx="2.5" fill="#fbf5ea"/><circle cx="13" cy="2.5" r="3" fill="#fbf5ea"/></svg>Offre de fin d\'année</span><span class="pn-pr">-10 % sur votre plan jusqu\'au 31 décembre</span>';
      document.body.appendChild(wrap);
      var layer = document.createElement('div');
      layer.className = 'pn-l';
      document.body.appendChild(layer);
      function place() {
        var H = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        layer.style.height = H + 'px';
        var m = (innerWidth - 1160) / 2, out = '';
        if (m >= 80) {
          var rots = [-12, 10, -6, 14], n = 0;
          for (var y = 1300; y < H - 400; y += 900, n++) {
            var sz = Math.min(40, Math.floor(m - 18)), left = n % 2 === 0, flip = (n % 3 === 1) ? -1 : 1;
            var off = Math.round((m - sz * 0.75) / 2);
            out += '<span class="pn-tt" style="position:absolute;animation-delay:' + ((n % 4) * 0.5) + 's;top:' + (y + (n % 3) * 60) + 'px;' + (left ? 'left:' : 'right:') + off + 'px;transform:rotate(' + rots[n % 4] + 'deg) scaleX(' + flip + ')">' + T(sz, n % 2 ? '#7a8a5e' : '#5f6f46', '#8a6a48') + '</span>';
          }
        }
        layer.innerHTML = out;
      }
      place();
      addEventListener('load', function () { setTimeout(place, 300); });
      addEventListener('resize', place);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  } catch (e) {}
})();
