/* Minimal QR Code generator (byte mode, error correction level M, versions 1-10: up to 213 bytes).
   No dependencies. Works in the browser (window.QR) and in Node (module.exports). */
(function (root) {
  "use strict";
  var EC = { 1:[10,[[1,16]]],2:[16,[[1,28]]],3:[26,[[1,44]]],4:[18,[[2,32]]],5:[24,[[2,43]]],6:[16,[[4,27]]],
    7:[18,[[4,31]]],8:[22,[[2,38],[2,39]]],9:[22,[[3,36],[2,37]]],10:[26,[[4,43],[1,44]]] };
  var ALIGN = { 1:[],2:[6,18],3:[6,22],4:[6,26],5:[6,30],6:[6,34],7:[6,22,38],8:[6,24,42],9:[6,26,46],10:[6,28,50] };
  var MAX_VERSION = 10;
  var EXP = [], LOG = [];
  (function () { var x = 1, i; for (i = 0; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 256) x ^= 0x11d; } for (i = 255; i < 512; i++) EXP[i] = EXP[i - 255]; })();
  function gmul(a, b) { return a && b ? EXP[LOG[a] + LOG[b]] : 0; }
  function rsGen(n) { var g = [1], i, j; for (i = 0; i < n; i++) { var ng = []; for (j = 0; j <= g.length; j++) ng[j] = 0; for (j = 0; j < g.length; j++) { ng[j] ^= g[j]; ng[j + 1] ^= gmul(g[j], EXP[i]); } g = ng; } return g; }
  function rsRem(data, n) { var g = rsGen(n), r = [], i; for (i = 0; i < n; i++) r.push(0);
    data.forEach(function (b) { var f = b ^ r[0]; r.shift(); r.push(0); for (i = 0; i < n; i++) r[i] ^= gmul(g[i + 1], f); }); return r; }
  function dataCw(v) { return EC[v][1].reduce(function (a, b) { return a + b[0] * b[1]; }, 0); }
  function utf8(s) { var u = unescape(encodeURIComponent(s)), out = [], i; for (i = 0; i < u.length; i++) out.push(u.charCodeAt(i)); return out; }

  function encode(bytes) {
    var ver, bits = [];
    for (ver = 1; ver <= MAX_VERSION; ver++) { if (4 + (ver < 10 ? 8 : 16) + bytes.length * 8 <= dataCw(ver) * 8) break; }
    if (ver > MAX_VERSION) throw new Error("This link is too long for a QR code (maximum 213 characters).");
    function put(v, n) { for (var i = n - 1; i >= 0; i--) bits.push((v >>> i) & 1); }
    put(4, 4); put(bytes.length, ver < 10 ? 8 : 16); bytes.forEach(function (b) { put(b, 8); });
    var cap = dataCw(ver) * 8; put(0, Math.min(4, cap - bits.length));
    while (bits.length % 8) bits.push(0);
    var pad = [0xEC, 0x11], k = 0; while (bits.length < cap) put(pad[k++ % 2], 8);
    var cw = [], i, j; for (i = 0; i < bits.length; i += 8) { var v = 0; for (j = 0; j < 8; j++) v = v * 2 + bits[i + j]; cw.push(v); }
    // split into blocks, add error correction, interleave
    var e = EC[ver], blocks = [], pos = 0;
    e[1].forEach(function (g) { for (var n = 0; n < g[0]; n++) { var d = cw.slice(pos, pos + g[1]); pos += g[1]; blocks.push({ d: d, e: rsRem(d, e[0]) }); } });
    var out = [], maxd = Math.max.apply(null, blocks.map(function (b) { return b.d.length; }));
    for (i = 0; i < maxd; i++) blocks.forEach(function (b) { if (i < b.d.length) out.push(b.d[i]); });
    for (i = 0; i < e[0]; i++) blocks.forEach(function (b) { out.push(b.e[i]); });
    return { ver: ver, cw: out };
  }

  function build(text) {
    var enc = encode(utf8(String(text))), ver = enc.ver, size = 17 + 4 * ver, m = [], fn = [], x, y;
    for (y = 0; y < size; y++) { m.push([]); fn.push([]); for (x = 0; x < size; x++) { m[y].push(false); fn[y].push(false); } }
    function set(px, py, dark) { if (px >= 0 && px < size && py >= 0 && py < size) { m[py][px] = !!dark; fn[py][px] = true; } }
    var i, j;
    for (i = 0; i < size; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
    [[3, 3], [size - 4, 3], [3, size - 4]].forEach(function (c) {
      for (var dy = -4; dy <= 4; dy++) for (var dx = -4; dx <= 4; dx++) { var d = Math.max(Math.abs(dx), Math.abs(dy)); set(c[0] + dx, c[1] + dy, d !== 2 && d !== 4); } });
    var al = ALIGN[ver];
    for (i = 0; i < al.length; i++) for (j = 0; j < al.length; j++) {
      if ((i === 0 && j === 0) || (i === 0 && j === al.length - 1) || (i === al.length - 1 && j === 0)) continue;
      for (var dy = -2; dy <= 2; dy++) for (var dx = -2; dx <= 2; dx++) set(al[j] + dx, al[i] + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }
    function formatBits(mask) { var r = mask; for (var k = 0; k < 10; k++) r = (r << 1) ^ ((r >>> 9) * 0x537); return ((mask << 10) | r) ^ 0x5412; }
    function drawFormat(mask) {
      var b = formatBits(mask); function bit(k) { return ((b >>> k) & 1) !== 0; }
      for (var k = 0; k <= 5; k++) set(8, k, bit(k)); set(8, 7, bit(6)); set(8, 8, bit(7)); set(7, 8, bit(8));
      for (k = 9; k < 15; k++) set(14 - k, 8, bit(k));
      for (k = 0; k < 8; k++) set(size - 1 - k, 8, bit(k));
      for (k = 8; k < 15; k++) set(8, size - 15 + k, bit(k));
      set(8, size - 8, true);
    }
    drawFormat(0);
    if (ver >= 7) { var rem = ver; for (i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25); var vb = (ver << 12) | rem;
      for (i = 0; i < 18; i++) { var bt = ((vb >>> i) & 1) !== 0, a = size - 11 + (i % 3), b2 = Math.floor(i / 3); set(a, b2, bt); set(b2, a, bt); } }
    // data placement
    var idx = 0, total = enc.cw.length * 8, right, vert, jj;
    for (right = size - 1; right >= 1; right -= 2) { if (right === 6) right = 5;
      for (vert = 0; vert < size; vert++) for (jj = 0; jj < 2; jj++) {
        x = right - jj; var up = ((right + 1) & 2) === 0; y = up ? size - 1 - vert : vert;
        if (!fn[y][x] && idx < total) { m[y][x] = ((enc.cw[idx >>> 3] >>> (7 - (idx & 7))) & 1) !== 0; idx++; } } }
    function applyMask(mask) { for (var yy = 0; yy < size; yy++) for (var xx = 0; xx < size; xx++) { if (fn[yy][xx]) continue; var inv;
      switch (mask) { case 0: inv = (xx + yy) % 2 === 0; break; case 1: inv = yy % 2 === 0; break; case 2: inv = xx % 3 === 0; break;
        case 3: inv = (xx + yy) % 3 === 0; break; case 4: inv = (Math.floor(xx / 3) + Math.floor(yy / 2)) % 2 === 0; break;
        case 5: inv = (xx * yy) % 2 + (xx * yy) % 3 === 0; break; case 6: inv = ((xx * yy) % 2 + (xx * yy) % 3) % 2 === 0; break;
        default: inv = ((xx + yy) % 2 + (xx * yy) % 3) % 2 === 0; }
      if (inv) m[yy][xx] = !m[yy][xx]; } }
    function penalty() {
      var p = 0, r, c, run, k, dark = 0, line;
      function scan(get) { for (var a = 0; a < size; a++) { run = 1; for (var b = 1; b < size; b++) { if (get(a, b) === get(a, b - 1)) { run++; if (run === 5) p += 3; else if (run > 5) p++; } else run = 1; }
        line = []; for (b = 0; b < size; b++) line.push(get(a, b) ? 1 : 0);
        for (b = 0; b + 11 <= size; b++) { var s = line.slice(b, b + 11).join("");
          if (s === "10111010000" || s === "00001011101") p += 40; } } }
      scan(function (a, b) { return m[a][b]; }); scan(function (a, b) { return m[b][a]; });
      for (r = 0; r < size - 1; r++) for (c = 0; c < size - 1; c++) if (m[r][c] === m[r][c + 1] && m[r][c] === m[r + 1][c] && m[r][c] === m[r + 1][c + 1]) p += 3;
      for (r = 0; r < size; r++) for (c = 0; c < size; c++) if (m[r][c]) dark++;
      k = Math.ceil(Math.abs(dark * 20 - size * size * 10) / (size * size)) - 1; return p + Math.max(0, k) * 10;
    }
    var best = 0, bestP = Infinity, mk;
    for (mk = 0; mk < 8; mk++) { applyMask(mk); drawFormat(mk); var pp = penalty(); if (pp < bestP) { bestP = pp; best = mk; } applyMask(mk); }
    applyMask(best); drawFormat(best);
    return m;
  }

  function svg(text, o) {
    o = o || {}; var m = build(text), n = m.length, q = o.margin == null ? 4 : o.margin, dark = o.dark || "#000", light = o.light, d = [];
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) if (m[y][x]) d.push("M" + (x + q) + " " + (y + q) + "h1v1h-1z");
    var t = n + 2 * q;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + t + " " + t + '" shape-rendering="crispEdges"' +
      (o.size ? ' width="' + o.size + '" height="' + o.size + '"' : "") + ">" +
      (light ? '<rect width="' + t + '" height="' + t + '" fill="' + light + '"/>' : "") +
      '<path fill="' + dark + '" d="' + d.join("") + '"/></svg>';
  }
  var api = { matrix: build, svg: svg, MAX_LENGTH: 213 };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.QR = api;
})(typeof window !== "undefined" ? window : this);
