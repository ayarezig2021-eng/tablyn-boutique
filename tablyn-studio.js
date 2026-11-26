/* Tablyn Studio: design a card, see it live, save it, add it to the shared cart. */
(function () {
  "use strict";

  var I18N = {
    en: {
      title: "Studio", lead: "Design your smart card: pick the material and shape, set your colours and text, add your menu link for a real QR code, then add it to your basket.",
      back: "← Back to the shop", account: "My account",
      s_brand: "1 · Your brand", f_brand: "Business name", f_tagline: "Short tagline", f_message: "Small call to action", f_url: "Your digital menu link (https://…)",
      qrYes: "✓ Real QR code created for this link. Scan it with your phone before ordering.", qrNo: "Your QR code appears once you enter a valid https:// menu link.", qrLong: "This link is too long for a QR code (maximum 200 characters).", qrBad: "Enter a valid link starting with https://",
      s_product: "2 · Product", f_material: "Material", f_shape: "Shape", f_font: "Typography",
      font_modern: "Modern sans", font_serif: "Elegant serif", font_friendly: "Friendly rounded", font_minimal: "Minimal mono",
      s_colours: "3 · Card colours", f_cbg: "Background", f_cfg: "Text", f_cac: "Accent", contrastWarn: "⚠ Text and background are too close in colour: the card may be hard to read.",
      s_art: "4 · Artwork (optional)", f_art: "Upload an image", f_artop: "Artwork visibility", artClear: "Remove artwork",
      art_rights: "Use an image you own or have permission to use. It is resized and saved with your design.",
      s_mine: "My saved designs", mineEmpty: "No saved design yet.", mineGuest: "Sign in on the shop page to save and reload your designs.", load: "Open", del: "Delete",
      f_qty: "Quantity", unit: "{u} per card", add: "Add to basket", save: "Save design", exp: "Export proof (SVG)",
      concept: "Design concept shown on screen. Final colours and finish may vary slightly. We confirm every order by phone before production.",
      matLabel: "{m} · {s}", viewCart: "View my basket", toOrder: "Continue to the order form",
      needSignin: "Sign in on the shop page first. Your design is kept in this browser.", goSignin: "Go to the shop to sign in",
      needUrl: "Add your menu link (https://…) so we can create your QR code.", needBrand: "Enter your business name.",
      saved: "Design saved.", addedMsg: "Added to your basket.", err: "Something went wrong. Please try again.",
      delAsk: "Delete this design?", deleted: "Design deleted.", loaded: "Design loaded.", cleared: "Artwork removed.",
      artBig: "Please use an image under 5 MB.", artType: "Please use a PNG, JPEG or WebP image.", artFail: "This image could not be read.",
      viewOnly: "You are viewing a customer's design (read-only). You can export it as a proof.", viewOnlyNo: "Read-only: this design belongs to a customer.",
      noConfig: "Saving is not available right now. You can still design and export your card.", notFound: "This design was not found or you cannot open it.", usedLocked: "This design is already part of an order. Your changes were saved as a new design.",
      delBlocked: "This design is part of an order and cannot be deleted.",
      mat_black: "Black PVC", mat_bamboo: "Bamboo Wood", mat_steel: "Brushed Steel", mat_gold: "Gold",
      shp_standard: "Standard", shp_rounded: "Rounded", shp_square: "Square", shp_vertical: "Vertical", cur: "DT",
      d_brand: "Café Lumière", d_tag: "Coffee · bites · moments", d_msg: "Tap or scan for the menu", qrAlt: "QR code"
    },
    fr: {
      title: "Studio", lead: "Concevez votre carte : choisissez la matière et la forme, réglez couleurs et textes, ajoutez le lien de votre menu pour un vrai QR code, puis ajoutez-la au panier.",
      back: "← Retour à la boutique", account: "Mon compte",
      s_brand: "1 · Votre marque", f_brand: "Nom de l'établissement", f_tagline: "Courte accroche", f_message: "Petit appel à l'action", f_url: "Lien de votre menu numérique (https://…)",
      qrYes: "✓ Vrai QR code créé pour ce lien. Scannez-le avec votre téléphone avant de commander.", qrNo: "Votre QR code apparaît dès que vous saisissez un lien de menu valide en https://.", qrLong: "Ce lien est trop long pour un QR code (200 caractères maximum).", qrBad: "Saisissez un lien valide commençant par https://",
      s_product: "2 · Produit", f_material: "Matière", f_shape: "Forme", f_font: "Typographie",
      font_modern: "Sans-serif moderne", font_serif: "Serif élégante", font_friendly: "Arrondie conviviale", font_minimal: "Mono minimaliste",
      s_colours: "3 · Couleurs de la carte", f_cbg: "Fond", f_cfg: "Texte", f_cac: "Accent", contrastWarn: "⚠ Le texte et le fond sont trop proches : la carte peut être difficile à lire.",
      s_art: "4 · Visuel (facultatif)", f_art: "Importer une image", f_artop: "Visibilité du visuel", artClear: "Retirer le visuel",
      art_rights: "Utilisez une image qui vous appartient ou dont vous avez l'autorisation. Elle est redimensionnée et enregistrée avec votre création.",
      s_mine: "Mes créations enregistrées", mineEmpty: "Aucune création enregistrée.", mineGuest: "Connectez-vous sur la page de la boutique pour enregistrer et rouvrir vos créations.", load: "Ouvrir", del: "Supprimer",
      f_qty: "Quantité", unit: "{u} par carte", add: "Ajouter au panier", save: "Enregistrer", exp: "Exporter l'épreuve (SVG)",
      concept: "Aperçu à l'écran. Les couleurs et la finition finales peuvent légèrement varier. Nous confirmons chaque commande par téléphone avant la production.",
      matLabel: "{m} · {s}", viewCart: "Voir mon panier", toOrder: "Continuer vers le formulaire de commande",
      needSignin: "Connectez-vous d'abord sur la page de la boutique. Votre création est conservée dans ce navigateur.", goSignin: "Aller à la boutique pour se connecter",
      needUrl: "Ajoutez le lien de votre menu (https://…) pour créer votre QR code.", needBrand: "Saisissez le nom de votre établissement.",
      saved: "Création enregistrée.", addedMsg: "Ajouté à votre panier.", err: "Une erreur est survenue. Veuillez réessayer.",
      delAsk: "Supprimer cette création ?", deleted: "Création supprimée.", loaded: "Création ouverte.", cleared: "Visuel retiré.",
      artBig: "Veuillez utiliser une image de moins de 5 Mo.", artType: "Veuillez utiliser une image PNG, JPEG ou WebP.", artFail: "Cette image n'a pas pu être lue.",
      viewOnly: "Vous consultez la création d'un client (lecture seule). Vous pouvez l'exporter comme épreuve.", viewOnlyNo: "Lecture seule : cette création appartient à un client.",
      noConfig: "L'enregistrement n'est pas disponible pour le moment. Vous pouvez quand même concevoir et exporter votre carte.", notFound: "Cette création est introuvable ou vous ne pouvez pas l'ouvrir.", usedLocked: "Cette création fait déjà partie d'une commande. Vos modifications ont été enregistrées comme nouvelle création.",
      delBlocked: "Cette création fait partie d'une commande et ne peut pas être supprimée.",
      mat_black: "PVC noir mat", mat_bamboo: "Bambou", mat_steel: "Acier brossé", mat_gold: "Or",
      shp_standard: "Standard", shp_rounded: "Arrondie", shp_square: "Carrée", shp_vertical: "Verticale", cur: "DT",
      d_brand: "Café Lumière", d_tag: "Café · douceurs · moments", d_msg: "Touchez ou scannez le menu", qrAlt: "QR code"
    },
    ar: {
      title: "الاستوديو", lead: "صمّم بطاقتك: اختر الخامة والشكل، وحدّد الألوان والنصوص، وأضف رابط قائمتك للحصول على رمز QR حقيقي، ثم أضفها إلى السلّة.",
      back: "← العودة إلى المتجر", account: "حسابي",
      s_brand: "1 · علامتك", f_brand: "اسم النشاط", f_tagline: "شعار قصير", f_message: "عبارة دعوة قصيرة", f_url: "رابط قائمتك الرقمية (https://…)",
      qrYes: "✓ تم إنشاء رمز QR حقيقي لهذا الرابط. امسحه بهاتفك قبل الطلب.", qrNo: "يظهر رمز QR عند إدخال رابط قائمة صالح يبدأ بـ https://.", qrLong: "هذا الرابط طويل جدًا لرمز QR (200 حرف كحد أقصى).", qrBad: "أدخل رابطًا صالحًا يبدأ بـ https://",
      s_product: "2 · المنتج", f_material: "الخامة", f_shape: "الشكل", f_font: "الخط",
      font_modern: "عصري بسيط", font_serif: "كلاسيكي أنيق", font_friendly: "مستدير ودود", font_minimal: "أحادي المسافة",
      s_colours: "3 · ألوان البطاقة", f_cbg: "الخلفية", f_cfg: "النص", f_cac: "اللون المميز", contrastWarn: "⚠ لون النص قريب من الخلفية: قد يصعب قراءة البطاقة.",
      s_art: "4 · صورة (اختياري)", f_art: "رفع صورة", f_artop: "وضوح الصورة", artClear: "إزالة الصورة",
      art_rights: "استخدم صورة تملكها أو لديك إذن باستخدامها. يتم تصغيرها وحفظها مع تصميمك.",
      s_mine: "تصاميمي المحفوظة", mineEmpty: "لا يوجد تصميم محفوظ بعد.", mineGuest: "سجّل الدخول من صفحة المتجر لحفظ تصاميمك وفتحها مجددًا.", load: "فتح", del: "حذف",
      f_qty: "الكمية", unit: "{u} للبطاقة", add: "أضف إلى السلّة", save: "حفظ التصميم", exp: "تصدير نسخة المعاينة (SVG)",
      concept: "تصميم تقريبي على الشاشة. قد تختلف الألوان واللمسة النهائية قليلًا. نؤكد كل طلب هاتفيًا قبل التصنيع.",
      matLabel: "{m} · {s}", viewCart: "عرض سلّتي", toOrder: "المتابعة إلى نموذج الطلب",
      needSignin: "سجّل الدخول من صفحة المتجر أولًا. تصميمك محفوظ في هذا المتصفح.", goSignin: "الذهاب إلى المتجر لتسجيل الدخول",
      needUrl: "أضف رابط قائمتك (https://…) لإنشاء رمز QR.", needBrand: "أدخل اسم نشاطك.",
      saved: "تم حفظ التصميم.", addedMsg: "تمت الإضافة إلى سلّتك.", err: "حدث خطأ. يرجى المحاولة مرة أخرى.",
      delAsk: "هل تريد حذف هذا التصميم؟", deleted: "تم حذف التصميم.", loaded: "تم فتح التصميم.", cleared: "تمت إزالة الصورة.",
      artBig: "يرجى استخدام صورة أقل من 5 ميغابايت.", artType: "يرجى استخدام صورة PNG أو JPEG أو WebP.", artFail: "تعذّرت قراءة هذه الصورة.",
      viewOnly: "أنت تشاهد تصميم أحد العملاء (للقراءة فقط). يمكنك تصديره كنسخة معاينة.", viewOnlyNo: "للقراءة فقط: هذا التصميم يخص أحد العملاء.",
      noConfig: "الحفظ غير متاح حاليًا. يمكنك مع ذلك التصميم وتصدير بطاقتك.", notFound: "لم يتم العثور على هذا التصميم أو لا يمكنك فتحه.", usedLocked: "هذا التصميم جزء من طلب سابق. تم حفظ تعديلاتك كتصميم جديد.",
      delBlocked: "هذا التصميم جزء من طلب ولا يمكن حذفه.",
      mat_black: "PVC أسود مطفي", mat_bamboo: "خيزران", mat_steel: "فولاذ مصقول", mat_gold: "ذهبي",
      shp_standard: "عادي", shp_rounded: "مستدير", shp_square: "مربع", shp_vertical: "عمودي", cur: "د.ت",
      d_brand: "Café Lumière", d_tag: "قهوة · حلويات · لحظات", d_msg: "المس أو امسح للقائمة", qrAlt: "رمز QR"
    }
  };

  /* Prices: must match index.html, account page and the SQL function orders_enforce_prices */
  var MAT = { black: 35, bamboo: 49, steel: 69, gold: 99 };
  var SHP = {
    standard: { w: 340, h: 214, r: 16, add: 0, cls: "land" }, rounded: { w: 340, h: 214, r: 44, add: 2, cls: "land" },
    square: { w: 250, h: 250, r: 18, add: 4, cls: "port sq" }, vertical: { w: 214, h: 340, r: 16, add: 3, cls: "port vt" }
  };
  var FONTS = { modern: "Inter, system-ui, sans-serif", serif: "Georgia, 'Times New Roman', serif", friendly: "'Trebuchet MS', Verdana, sans-serif", minimal: "'Courier New', monospace" };
  var PRESETS = [["#242047", "#7790ff", "#ffffff"], ["#ffe14d", "#ff5d8f", "#1f2a44"], ["#8be3c0", "#ff7a59", "#12332b"], ["#6ec6ff", "#ffd93d", "#0b2545"],
    ["#ff8fc7", "#fff176", "#3a0f3a"], ["#ff9f1c", "#2ec4b6", "#2b1a0a"], ["#b79cff", "#ffe66d", "#1e1442"], ["#0f4c75", "#ffd166", "#fdf6e3"],
    ["#1f5f4a", "#f6c453", "#fff6e0"], ["#4a2c1d", "#f4b860", "#fbf1e3"], ["#fff5e1", "#e8590c", "#2b2118"], ["#1b1f3b", "#ff7ab8", "#f4f1ff"]];
  var DRAFT = "tablyn_studio_draft", CART_KEY = "tablyn_cart", UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  var $ = function (id) { return document.getElementById(id); };
  var own = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
  var lang = "en";
  try { lang = localStorage.getItem("tf_lang") || (navigator.language || "en").slice(0, 2); } catch (e) { }
  if (!I18N[lang]) lang = "en";
  var db = window.tablynDb, user = null, msgTimer = null, saveTimer = null;
  var S = null;

  function t(k, p) {
    var s = (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;
    if (p) Object.keys(p).forEach(function (x) { s = s.split("{" + x + "}").join(p[x]); });
    return s;
  }
  function money(n) { return (Math.round(n * 100) / 100) + " " + t("cur"); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function say(m) { var b = $("msg"); b.textContent = m; b.style.display = "block"; clearTimeout(msgTimer); msgTimer = setTimeout(function () { b.style.display = "none"; }, 3500); }

  /* ---------- design state (always sanitised, also for designs loaded from the database) ---------- */
  function defaults() {
    return { brand: t("d_brand"), tagline: t("d_tag"), message: t("d_msg"), menuUrl: "", material: "black", shape: "standard", font: "modern",
      bg: PRESETS[0][0], ac: PRESETS[0][1], fg: PRESETS[0][2], art: "", artOp: 60, qty: 1, designId: null, readonly: false };
  }
  function clean(d) {
    var o = defaults(); if (!d || typeof d !== "object") return o;
    var str = function (v, n, f) { return typeof v === "string" ? v.slice(0, n) : f; };
    var col = function (v, f) { return typeof v === "string" && /^#[0-9a-f]{6}$/i.test(v) ? v.toLowerCase() : f; };
    o.brand = str(d.brand, 30, o.brand); o.tagline = str(d.tagline, 40, o.tagline); o.message = str(d.message, 35, o.message);
    o.menuUrl = str(d.menuUrl, 200, "");
    o.material = own(MAT, d.material) ? d.material : "black"; o.shape = own(SHP, d.shape) ? d.shape : "standard"; o.font = own(FONTS, d.font) ? d.font : "modern";
    o.bg = col(d.bg, o.bg); o.ac = col(d.ac, o.ac); o.fg = col(d.fg, o.fg);
    o.art = typeof d.art === "string" && d.art.length < 300000 && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/.test(d.art) ? d.art : "";
    var op = Number(d.artOp); o.artOp = op >= 10 && op <= 100 ? Math.round(op) : 60;
    return o;
  }
  function payload() { return { brand: S.brand, tagline: S.tagline, message: S.message, menuUrl: S.menuUrl, material: S.material, shape: S.shape, font: S.font, bg: S.bg, ac: S.ac, fg: S.fg, art: S.art, artOp: S.artOp }; }
  function saveDraft() { try { localStorage.setItem(DRAFT, JSON.stringify(Object.assign(payload(), { designId: S.designId, qty: S.qty }))); } catch (e) { } }
  function draftSoon() { if (S.readonly) return; clearTimeout(saveTimer); saveTimer = setTimeout(saveDraft, 400); }

  /* ---------- helpers ---------- */
  function urlState() {
    var v = S.menuUrl.trim(); if (!v) return "empty";
    if (v.length > 200) return "long";
    try { var u = new URL(v); if (u.protocol !== "https:") return "bad"; } catch (e) { return "bad"; }
    return "ok";
  }
  function qrSvg(light) {
    if (urlState() !== "ok" || !window.QR) return "";
    try { return window.QR.svg(S.menuUrl.trim(), { margin: 0, dark: "#000000", light: light || "#ffffff" }); } catch (e) { return ""; }
  }
  function lum(h) { var c = [1, 3, 5].map(function (i) { return parseInt(h.slice(i, i + 2), 16) / 255; }).map(function (v) { return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; }
  function ratio(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }
  function unit() { return MAT[S.material] + SHP[S.shape].add; }

  /* ---------- render ---------- */
  function placeholderQr() {
    var ns = "http://www.w3.org/2000/svg", s = document.createElementNS(ns, "svg"); s.setAttribute("viewBox", "0 0 21 21");
    [[0, 0], [14, 0], [0, 14]].forEach(function (p) {
      var o = document.createElementNS(ns, "rect"); o.setAttribute("x", p[0]); o.setAttribute("y", p[1]); o.setAttribute("width", 7); o.setAttribute("height", 7); o.setAttribute("fill", "#999"); s.appendChild(o);
      var i = document.createElementNS(ns, "rect"); i.setAttribute("x", p[0] + 2); i.setAttribute("y", p[1] + 2); i.setAttribute("width", 3); i.setAttribute("height", 3); i.setAttribute("fill", "#fff"); s.appendChild(i);
    });
    return s;
  }
  function renderCard() {
    var c = $("card"), sh = SHP[S.shape];
    c.className = "tcard " + sh.cls + " mat-" + S.material;
    c.style.width = sh.w + "px"; c.style.height = sh.h + "px"; c.style.borderRadius = sh.r + "px";
    c.style.background = S.bg; c.style.color = S.fg; c.style.fontFamily = FONTS[S.font];
    c.replaceChildren();
    var art = el("div", "art"); if (S.art) { art.style.backgroundImage = 'url("' + S.art + '")'; art.style.opacity = S.artOp / 100; } c.appendChild(art);
    c.appendChild(el("div", "sheen"));
    var inn = el("div", "in"), txt = el("div", "txt");
    var h = el("h3", null, S.brand || " "); var len = (S.brand || "").length;
    h.style.fontSize = (sh.cls.indexOf("land") >= 0 ? (len > 20 ? 1.0 : len > 12 ? 1.25 : 1.55) : (len > 16 ? 1.0 : len > 10 ? 1.2 : 1.45)) + "rem";
    txt.appendChild(h);
    if (S.tagline) txt.appendChild(el("p", "tag", S.tagline));
    if (S.message) { var m = el("p", "msg", S.message); m.style.color = S.ac; txt.appendChild(m); }
    var qb = el("div", "qrbox"); qb.setAttribute("aria-label", t("qrAlt"));
    var svg = qrSvg();
    if (svg) { qb.innerHTML = svg; } else { qb.appendChild(placeholderQr()); }   /* svg comes from our own qr.js, built only from a validated https link */
    inn.append(txt, qb); c.appendChild(inn);
    c.setAttribute("aria-label", S.brand + " — " + t("mat_" + S.material) + " " + t("shp_" + S.shape));
    $("matLabel").textContent = t("matLabel", { m: t("mat_" + S.material), s: t("shp_" + S.shape) });
  }
  function renderMeta() {
    var us = urlState();
    $("qrNote").textContent = us === "ok" ? t("qrYes") : us === "long" ? t("qrLong") : us === "bad" ? t("qrBad") : t("qrNo");
    $("contrast").textContent = ratio(S.bg, S.fg) < 3 ? t("contrastWarn") : "";
    $("unitLine").textContent = t("unit", { u: money(unit()) });
    $("total").textContent = money(unit() * S.qty);
    document.querySelectorAll(".sw").forEach(function (b) {
      var p = PRESETS[Number(b.dataset.i)]; b.classList.toggle("on", p[0] === S.bg && p[1] === S.ac && p[2] === S.fg);
    });
  }
  function renderAll() { renderCard(); renderMeta(); }
  function syncInputs() {
    $("brand").value = S.brand; $("tagline").value = S.tagline; $("message").value = S.message; $("menuUrl").value = S.menuUrl;
    $("material").value = S.material; $("shape").value = S.shape; $("font").value = S.font;
    $("cBg").value = S.bg; $("cFg").value = S.fg; $("cAc").value = S.ac; $("artOp").value = S.artOp; $("qty").value = S.qty;
  }
  function applyReadonly() {
    var ro = S.readonly;
    ["brand", "tagline", "message", "menuUrl", "material", "shape", "font", "cBg", "cFg", "cAc", "artFile", "artOp", "artClear", "qty", "addBtn", "saveBtn"].forEach(function (id) { $(id).disabled = ro; });
    document.querySelectorAll(".sw").forEach(function (b) { b.disabled = ro; });
    var bn = $("banner"); bn.classList.toggle("hidden", !ro); bn.textContent = ro ? t("viewOnly") : "";
  }

  /* ---------- static text, selects, swatches ---------- */
  function fillSelects() {
    var fill = function (id, items, cur) { var s = $(id); s.replaceChildren(); items.forEach(function (it) { var o = el("option", null, it[1]); o.value = it[0]; s.appendChild(o); }); s.value = cur; };
    fill("material", Object.keys(MAT).map(function (k) { return [k, t("mat_" + k) + " — " + MAT[k] + " " + t("cur")]; }), S.material);
    fill("shape", Object.keys(SHP).map(function (k) { return [k, t("shp_" + k) + (SHP[k].add ? " (+" + SHP[k].add + " " + t("cur") + ")" : "")]; }), S.shape);
    fill("font", Object.keys(FONTS).map(function (k) { return [k, t("font_" + k)]; }), S.font);
  }
  function renderStatic() {
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    $("langSel").value = lang;
    $("pageTitle").textContent = t("title"); $("lead").textContent = t("lead"); $("backShop").textContent = t("back"); $("toAccount").textContent = t("account");
    document.querySelectorAll("[data-i18n]").forEach(function (e) { e.textContent = t(e.getAttribute("data-i18n")); });
    $("artClear").textContent = t("artClear"); $("addBtn").textContent = t("add"); $("saveBtn").textContent = t("save"); $("exportBtn").textContent = t("exp");
    $("viewCart").textContent = t("viewCart"); $("toOrder").textContent = t("toOrder");
    fillSelects();
  }
  function buildSwatches() {
    var box = $("swatches"); box.replaceChildren();
    PRESETS.forEach(function (p, i) {
      var b = el("button", "sw"); b.type = "button"; b.dataset.i = i; b.style.background = p[0]; b.setAttribute("aria-label", "Preset " + (i + 1));
      var d = el("i"); d.style.background = p[1]; b.appendChild(d);
      b.addEventListener("click", function () { if (S.readonly) return; S.bg = p[0]; S.ac = p[1]; S.fg = p[2]; syncInputs(); renderAll(); draftSoon(); });
      box.appendChild(b);
    });
  }

  /* ---------- artwork: resized in the browser, stored as a small JPEG ---------- */
  function readArt(file) {
    if (!file) return;
    if (["image/png", "image/jpeg", "image/webp"].indexOf(file.type) < 0) { say(t("artType")); return; }
    if (file.size > 5 * 1024 * 1024) { say(t("artBig")); return; }
    var rd = new FileReader();
    rd.onerror = function () { say(t("artFail")); };
    rd.onload = function () {
      var im = new Image();
      im.onerror = function () { say(t("artFail")); };
      im.onload = function () {
        var k = Math.min(1, 700 / Math.max(im.width, im.height)), cv = document.createElement("canvas");
        cv.width = Math.max(1, Math.round(im.width * k)); cv.height = Math.max(1, Math.round(im.height * k));
        var cx = cv.getContext("2d"); cx.fillStyle = "#ffffff"; cx.fillRect(0, 0, cv.width, cv.height); cx.drawImage(im, 0, 0, cv.width, cv.height);
        var q = 0.82, out = cv.toDataURL("image/jpeg", q);
        while (out.length > 240000 && q > 0.4) { q -= 0.1; out = cv.toDataURL("image/jpeg", q); }
        if (out.length > 280000) { say(t("artBig")); return; }
        S.art = out; renderAll(); draftSoon();
      };
      im.src = rd.result;
    };
    rd.readAsDataURL(file);
  }

  /* ---------- export proof (SVG) ---------- */
  function esc(v) { return String(v || "").replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function exportProof() {
    var sh = SHP[S.shape], k = 3, W = sh.w * k, H = sh.h * k, land = sh.cls.indexOf("land") >= 0, qs = qrSvg();
    var qsz = (land ? 88 : sh.cls.indexOf("sq") >= 0 ? 82 : 112) * k, qx, qy, tx, ty, anchor;
    if (land) { qx = W - qsz - 16 * k; qy = (H - qsz) / 2; tx = 20 * k; ty = H / 2 - 20 * k; anchor = "start"; }
    else { qx = (W - qsz) / 2; qy = H - qsz - 20 * k; tx = W / 2; ty = 56 * k; anchor = "middle"; }
    var qr = ""; if (qs) { qr = '<rect x="' + (qx - 4 * k) + '" y="' + (qy - 4 * k) + '" width="' + (qsz + 8 * k) + '" height="' + (qsz + 8 * k) + '" rx="' + (8 * k) + '" fill="#fff"/>' + qs.replace("<svg", '<svg x="' + qx + '" y="' + qy + '" width="' + qsz + '" height="' + qsz + '"'); }
    var art = S.art ? '<clipPath id="c"><rect width="' + W + '" height="' + H + '" rx="' + sh.r * k + '"/></clipPath><image href="' + S.art + '" x="0" y="0" width="' + W + '" height="' + H + '" preserveAspectRatio="xMidYMid slice" opacity="' + S.artOp / 100 + '" clip-path="url(#c)"/>' : "";
    var f = esc(FONTS[S.font].replace(/"/g, "'"));
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '">' +
      '<rect width="' + W + '" height="' + H + '" rx="' + sh.r * k + '" fill="' + S.bg + '"/>' + art +
      '<text x="' + tx + '" y="' + ty + '" text-anchor="' + anchor + '" fill="' + S.fg + '" font-family="' + f + '" font-size="' + (land ? 30 : 28) * k / 2 + '" font-weight="800">' + esc(S.brand) + '</text>' +
      '<text x="' + tx + '" y="' + (ty + 22 * k) + '" text-anchor="' + anchor + '" fill="' + S.fg + '" font-family="' + f + '" font-size="' + 12 * k + '">' + esc(S.tagline) + '</text>' +
      '<text x="' + tx + '" y="' + (ty + 42 * k) + '" text-anchor="' + anchor + '" fill="' + S.ac + '" font-family="' + f + '" font-size="' + 10.5 * k + '" font-weight="700">' + esc((S.message || "").toUpperCase()) + '</text>' +
      qr + '</svg>';
    var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    a.download = "tablyn-card-proof.svg"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 500);
  }

  /* ---------- cart (same storage as the shop) ---------- */
  function addLineToCart(id, name, qty) {
    var c = []; try { c = JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch (e) { c = []; } if (!Array.isArray(c)) c = [];
    var ex = c.filter(function (x) { return x && x.design === id && x.material === S.material && x.shape === S.shape; })[0];
    if (ex) ex.qty = Math.min(500, (Number(ex.qty) || 0) + qty);
    else c.push({ material: S.material, shape: S.shape, qty: qty, design: id, dname: String(name).slice(0, 60) });
    localStorage.setItem(CART_KEY, JSON.stringify(c));
  }

  /* ---------- save / add ---------- */
  function needSignin() { var s = $("status"); s.textContent = ""; s.appendChild(document.createTextNode(t("needSignin") + " ")); var a = el("a", null, t("goSignin")); a.href = "index.html"; s.appendChild(a); }
  async function persist() {
    if (!db || !window.tablynData || !window.tablynData.ready) { say(t("noConfig")); return null; }
    if (!user) { needSignin(); return null; }
    if (!S.brand.trim()) { say(t("needBrand")); $("brand").focus(); return null; }
    var us = urlState(); if (us === "long" || us === "bad") { say(t(us === "long" ? "qrLong" : "qrBad")); $("menuUrl").focus(); return null; }
    var prev = S.designId;
    var id = await window.tablynData.saveDesign(S.designId, S.brand.trim(), payload());
    S.designId = id; saveDraft(); await loadMine();
    if (prev && prev !== id) say(t("usedLocked"));
    return id;
  }
  async function onSave() {
    try { var id = await persist(); if (id) { $("status").textContent = t("saved"); say(t("saved")); } } catch (e) { console.error(e); say(t("err")); }
  }
  async function onAdd() {
    try {
      if (urlState() !== "ok") { say(t("needUrl")); $("menuUrl").focus(); return; }
      var id = await persist(); if (!id) return;
      addLineToCart(id, S.brand.trim(), S.qty);
      $("status").textContent = t("addedMsg"); $("afterAdd").classList.remove("hidden"); say(t("addedMsg"));
    } catch (e) { console.error(e); say(t("err")); }
  }

  /* ---------- my designs ---------- */
  async function loadMine() {
    var box = $("mineList"); box.replaceChildren();
    if (!user || !db) { box.appendChild(el("p", "muted", t("mineGuest"))); return; }
    var rows = []; try { rows = await window.tablynData.listMyDesigns(user.id); } catch (e) { console.error(e); }
    if (!rows.length) { box.appendChild(el("p", "muted", t("mineEmpty"))); return; }
    rows.forEach(function (r) {
      var row = el("div", "mine"); var nm = el("div"); nm.style.flex = "1"; nm.appendChild(el("strong", null, r.name));
      var dt = ""; try { dt = new Date(r.updated_at).toLocaleDateString(lang === "ar" ? "ar-TN" : lang === "fr" ? "fr-FR" : "en-GB"); } catch (e) { }
      nm.appendChild(el("div", "muted", dt));
      var o = el("button", "btn small", t("load")); o.type = "button"; o.addEventListener("click", function () { openDesign(r.id, false); });
      var d = el("button", "btn small danger", t("del")); d.type = "button"; d.addEventListener("click", function () { removeDesign(r.id); });
      row.append(nm, o, d); box.appendChild(row);
    });
  }
  async function openDesign(id, quiet) {
    if (!UUID.test(id) || !db) return false;
    try {
      var r = await window.tablynData.getDesign(id);
      if (!r) { if (!quiet) say(t("notFound")); return false; }
      var d = clean(r.data); d.designId = r.id; d.qty = 1; d.readonly = !!user && r.user_id !== user.id;
      S = d; syncInputs(); applyReadonly(); renderAll(); $("afterAdd").classList.add("hidden"); $("status").textContent = "";
      if (!d.readonly) saveDraft(); if (!quiet) say(t("loaded")); return true;
    } catch (e) { console.error(e); if (!quiet) say(t("notFound")); return false; }
  }
  async function removeDesign(id) {
    if (!confirm(t("delAsk"))) return;
    try { await window.tablynData.deleteDesign(id); if (S.designId === id) { S.designId = null; saveDraft(); } say(t("deleted")); }
    catch (e) { console.error(e); say(t("delBlocked")); }
    loadMine();
  }

  /* ---------- wiring ---------- */
  function bind(id, key, num) {
    $(id).addEventListener("input", function () { if (S.readonly) return; S[key] = $(id).value; renderAll(); draftSoon(); });
  }
  bind("brand", "brand"); bind("tagline", "tagline"); bind("message", "message"); bind("menuUrl", "menuUrl");
  bind("material", "material"); bind("shape", "shape"); bind("font", "font"); bind("cBg", "bg"); bind("cFg", "fg"); bind("cAc", "ac");
  $("artOp").addEventListener("input", function () { if (S.readonly) return; S.artOp = Number($("artOp").value); renderAll(); draftSoon(); });
  $("qty").addEventListener("input", function () { var v = Math.floor(Number($("qty").value) || 1); S.qty = Math.max(1, Math.min(500, v)); renderMeta(); draftSoon(); });
  $("qty").addEventListener("change", function () { $("qty").value = S.qty; });
  $("artFile").addEventListener("change", function () { if (!S.readonly) readArt($("artFile").files[0]); $("artFile").value = ""; });
  $("artClear").addEventListener("click", function () { S.art = ""; renderAll(); draftSoon(); say(t("cleared")); });
  $("addBtn").addEventListener("click", onAdd); $("saveBtn").addEventListener("click", onSave); $("exportBtn").addEventListener("click", exportProof);
  $("langSel").addEventListener("change", function () {
    lang = $("langSel").value; try { localStorage.setItem("tf_lang", lang); } catch (e) { }
    renderStatic(); syncInputs(); applyReadonly(); renderAll(); loadMine();
  });

  /* ---------- start ---------- */
  var saved = null; try { saved = JSON.parse(localStorage.getItem(DRAFT) || "null"); } catch (e) { saved = null; }
  S = saved ? clean(saved) : defaults();
  if (saved && typeof saved.designId === "string" && UUID.test(saved.designId)) S.designId = saved.designId;
  if (saved && Number.isInteger(saved.qty) && saved.qty >= 1 && saved.qty <= 500) S.qty = saved.qty;
  buildSwatches(); renderStatic(); syncInputs(); applyReadonly(); renderAll();

  var wanted = (new URLSearchParams(location.search).get("design") || "").trim(), openedFromLink = false;
  async function setSession(session) {
    user = session && session.user ? { id: session.user.id, email: session.user.email } : null;
    if (wanted && UUID.test(wanted) && !openedFromLink && user) {
      openedFromLink = true;
      await openDesign(wanted, false);
    } else if (wanted && !user) { needSignin(); }
    $("addBtn").disabled = S.readonly; $("saveBtn").disabled = S.readonly;
    await loadMine();
  }
  if (!db) { loadMine(); return; }
  db.auth.getSession().then(function (r) { return setSession(r.data.session); });
  db.auth.onAuthStateChange(function (_e, session) { setSession(session); });
})();
