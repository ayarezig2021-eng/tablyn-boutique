/* Customer account page: my cart (works without signing in) + my orders (needs sign-in). */
(function () {
  "use strict";

  /* ---------- texts ---------- */
  var I18N = {
    en: {
      design: "Design", editStudio: "Edit in Studio",
      title: "My account", back: "← Back to the shop", out: "Sign out", loading: "Loading…",
      hello: "Signed in as {e}", guestHello: "You are not signed in. Your cart below is saved in this browser.",
      cartTitle: "My cart", cartSub: "Items you added but have not ordered yet. Change anything here before you fill in the order form.",
      cartEmpty: "Your cart is empty.", shop: "Browse the cards", remove: "Remove", qty: "Quantity",
      sub: "Subtotal", delNote: "Delivery (7 to 10 DT depending on your governorate) is added at checkout. Free from {x}.",
      clear: "Empty the cart", clearAsk: "Remove every item from your cart?", toOrder: "Continue to the order form",
      saved: "Cart updated.", cleared: "Cart emptied.",
      ordersTitle: "My orders", ordersSub: "Every order request you sent, with its status.", refresh: "Refresh",
      ordersGuestTitle: "Sign in to see your orders", ordersGuestText: "Sign in on the shop page, then come back here to follow your orders.", signIn: "Go to sign in",
      noOrders: "You have not sent any order yet.", orderNo: "Order n° {n}", placed: "Sent on {d}",
      s_pending: "Waiting for our confirmation", s_confirmed: "Confirmed", s_in_production: "In production", s_shipped: "Shipped", s_completed: "Delivered", s_cancelled: "Cancelled",
      delivery: "Delivery", total: "Total", shipTo: "Delivery to", free: "Free",
      change: "Change this order", cancel: "Cancel this order", again: "Order again",
      askChange: "This cancels order n° {n} and puts its items back in your cart, so you can edit them and send a new request. Continue?",
      askCancel: "Cancel order n° {n}? This cannot be undone.",
      doneCancel: "Order cancelled.", doneChange: "Order cancelled. Its items are back in your cart.", doneAgain: "Items added to your cart.",
      err: "Something went wrong. Please try again.", noConfig: "The account service is not available right now.", pendHint: "You can still change or cancel it.",
      mat_black: "Black PVC", mat_bamboo: "Bamboo Wood", mat_steel: "Brushed Steel", mat_gold: "Gold",
      shp_standard: "Standard", shp_rounded: "Rounded", shp_square: "Square", shp_vertical: "Vertical", cur: "DT"
    },
    fr: {
      design: "Création", editStudio: "Modifier dans le Studio",
      title: "Mon compte", back: "← Retour à la boutique", out: "Se déconnecter", loading: "Chargement…",
      hello: "Connecté : {e}", guestHello: "Vous n'êtes pas connecté. Votre panier ci-dessous est enregistré dans ce navigateur.",
      cartTitle: "Mon panier", cartSub: "Les articles ajoutés mais pas encore commandés. Modifiez-les ici avant de remplir le formulaire de commande.",
      cartEmpty: "Votre panier est vide.", shop: "Voir les cartes", remove: "Retirer", qty: "Quantité",
      sub: "Sous-total", delNote: "La livraison (7 à 10 DT selon votre gouvernorat) est ajoutée à la commande. Gratuite dès {x}.",
      clear: "Vider le panier", clearAsk: "Retirer tous les articles du panier ?", toOrder: "Continuer vers le formulaire de commande",
      saved: "Panier mis à jour.", cleared: "Panier vidé.",
      ordersTitle: "Mes commandes", ordersSub: "Toutes les demandes de commande envoyées, avec leur statut.", refresh: "Actualiser",
      ordersGuestTitle: "Connectez-vous pour voir vos commandes", ordersGuestText: "Connectez-vous sur la page de la boutique, puis revenez ici pour suivre vos commandes.", signIn: "Aller à la connexion",
      noOrders: "Vous n'avez envoyé aucune commande.", orderNo: "Commande n° {n}", placed: "Envoyée le {d}",
      s_pending: "En attente de notre confirmation", s_confirmed: "Confirmée", s_in_production: "En production", s_shipped: "Expédiée", s_completed: "Livrée", s_cancelled: "Annulée",
      delivery: "Livraison", total: "Total", shipTo: "Livraison à", free: "Gratuite",
      change: "Modifier cette commande", cancel: "Annuler cette commande", again: "Commander à nouveau",
      askChange: "Cela annule la commande n° {n} et remet ses articles dans votre panier, pour les modifier et envoyer une nouvelle demande. Continuer ?",
      askCancel: "Annuler la commande n° {n} ? Cette action est définitive.",
      doneCancel: "Commande annulée.", doneChange: "Commande annulée. Ses articles sont de retour dans votre panier.", doneAgain: "Articles ajoutés à votre panier.",
      err: "Une erreur est survenue. Veuillez réessayer.", noConfig: "Le service de compte n'est pas disponible pour le moment.", pendHint: "Vous pouvez encore la modifier ou l'annuler.",
      mat_black: "PVC noir mat", mat_bamboo: "Bambou", mat_steel: "Acier brossé", mat_gold: "Or",
      shp_standard: "Standard", shp_rounded: "Arrondie", shp_square: "Carrée", shp_vertical: "Verticale", cur: "DT"
    },
    ar: {
      design: "التصميم", editStudio: "تعديل في الاستوديو",
      title: "حسابي", back: "← العودة إلى المتجر", out: "تسجيل الخروج", loading: "جارٍ التحميل…",
      hello: "مسجّل الدخول: {e}", guestHello: "أنت غير مسجّل الدخول. سلّتك أدناه محفوظة في هذا المتصفح.",
      cartTitle: "سلّتي", cartSub: "المنتجات التي أضفتها ولم تطلبها بعد. عدّل ما تريد هنا قبل ملء نموذج الطلب.",
      cartEmpty: "سلّتك فارغة.", shop: "تصفّح البطاقات", remove: "حذف", qty: "الكمية",
      sub: "المجموع الفرعي", delNote: "تُضاف تكلفة التوصيل (من 7 إلى 10 د.ت حسب ولايتك) عند إتمام الطلب. التوصيل مجاني ابتداءً من {x}.",
      clear: "إفراغ السلّة", clearAsk: "حذف كل المنتجات من السلّة؟", toOrder: "المتابعة إلى نموذج الطلب",
      saved: "تم تحديث السلّة.", cleared: "تم إفراغ السلّة.",
      ordersTitle: "طلباتي", ordersSub: "كل طلبات الشراء التي أرسلتها مع حالتها.", refresh: "تحديث",
      ordersGuestTitle: "سجّل الدخول لرؤية طلباتك", ordersGuestText: "سجّل الدخول من صفحة المتجر ثم عد إلى هنا لمتابعة طلباتك.", signIn: "الذهاب إلى تسجيل الدخول",
      noOrders: "لم ترسل أي طلب بعد.", orderNo: "الطلب رقم {n}", placed: "أُرسل في {d}",
      s_pending: "في انتظار تأكيدنا", s_confirmed: "مؤكَّد", s_in_production: "قيد التصنيع", s_shipped: "تم الشحن", s_completed: "تم التسليم", s_cancelled: "ملغى",
      delivery: "التوصيل", total: "المجموع", shipTo: "التوصيل إلى", free: "مجاني",
      change: "تعديل هذا الطلب", cancel: "إلغاء هذا الطلب", again: "اطلب مجددًا",
      askChange: "سيتم إلغاء الطلب رقم {n} وإرجاع منتجاته إلى سلّتك لتعدّلها وترسل طلبًا جديدًا. هل تريد المتابعة؟",
      askCancel: "هل تريد إلغاء الطلب رقم {n}؟ لا يمكن التراجع.",
      doneCancel: "تم إلغاء الطلب.", doneChange: "تم إلغاء الطلب. عادت منتجاته إلى سلّتك.", doneAgain: "تمت إضافة المنتجات إلى سلّتك.",
      err: "حدث خطأ. يرجى المحاولة مرة أخرى.", noConfig: "خدمة الحساب غير متاحة حاليًا.", pendHint: "ما زال بإمكانك تعديله أو إلغاؤه.",
      mat_black: "PVC أسود مطفي", mat_bamboo: "خيزران", mat_steel: "فولاذ مصقول", mat_gold: "ذهبي",
      shp_standard: "عادي", shp_rounded: "مستدير", shp_square: "مربع", shp_vertical: "عمودي", cur: "د.ت"
    }
  };

  /* Prices: must match index.html and the SQL function orders_enforce_prices */
  var MATERIALS = { black: 35, bamboo: 49, steel: 69, gold: 99 };
  var SHAPES = { standard: 0, rounded: 2, square: 4, vertical: 3 };
  var FREE_OVER = 200, CART_KEY = "tablyn_cart", UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  var $ = function (id) { return document.getElementById(id); };
  var own = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
  var lang = "en";
  try { lang = localStorage.getItem("tf_lang") || (navigator.language || "en").slice(0, 2); } catch (e) { }
  if (!I18N[lang]) lang = "en";
  var db = window.tablynDb, user = null, orders = [], msgTimer = null;

  function t(k, p) {
    var s = (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;
    if (p) Object.keys(p).forEach(function (x) { s = s.split("{" + x + "}").join(p[x]); });
    return s;
  }
  function money(n) { return (Math.round(n * 100) / 100) + " " + t("cur"); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function say(m) { var b = $("msg"); b.textContent = m; b.style.display = "block"; clearTimeout(msgTimer); msgTimer = setTimeout(function () { b.style.display = "none"; }, 3200); }

  /* ---------- cart (same storage as index.html) ---------- */
  function loadCart() {
    var raw = []; try { raw = JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch (e) { raw = []; }
    return (Array.isArray(raw) ? raw : []).filter(function (i) {
      return i && own(MATERIALS, i.material) && own(SHAPES, i.shape) && Number.isInteger(i.qty) && i.qty >= 1 && i.qty <= 500;
    }).map(function (i) {
      var o = { material: i.material, shape: i.shape, qty: i.qty };
      if (typeof i.design === "string" && UUID.test(i.design)) { o.design = i.design.toLowerCase(); o.dname = String(i.dname || "").slice(0, 60); }
      return o;
    });
  }
  function saveCart(c) { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) { } }
  function unit(i) { return MATERIALS[i.material] + SHAPES[i.shape]; }
  function addToCart(items) {
    var c = loadCart();
    items.forEach(function (it) {
      if (!it || !own(MATERIALS, it.material) || !own(SHAPES, it.shape)) return;
      var q = Math.max(1, Math.min(500, Math.floor(Number(it.qty) || 1)));
      var did = typeof it.design === "string" && UUID.test(it.design) ? it.design.toLowerCase() : null;
      var ex = c.filter(function (x) { return x.material === it.material && x.shape === it.shape && (x.design || null) === did; })[0];
      if (ex) ex.qty = Math.min(500, ex.qty + q);
      else { var n = { material: it.material, shape: it.shape, qty: q }; if (did) { n.design = did; n.dname = String(it.dname || "").slice(0, 60); } c.push(n); }
    });
    saveCart(c);
  }

  /* ---------- render: texts ---------- */
  function renderStatic() {
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = t("title") + " | Tablyn";
    $("langSel").value = lang;
    $("pageTitle").textContent = t("title"); $("backShop").textContent = t("back"); $("signOut").textContent = t("out");
    $("loadingText").textContent = t("loading");
    $("cartTitle").textContent = t("cartTitle"); $("cartSub").textContent = t("cartSub");
    $("ordersTitle").textContent = t("ordersTitle"); $("ordersSub").textContent = t("ordersSub"); $("refreshBtn").textContent = t("refresh");
    $("who").textContent = user ? t("hello", { e: user.email }) : t("guestHello");
    $("signOut").classList.toggle("hidden", !user);
    $("refreshBtn").classList.toggle("hidden", !user);
  }

  /* ---------- render: cart ---------- */
  function renderCart() {
    var body = $("cartBody"); body.replaceChildren();
    var c = loadCart();
    if (!c.length) {
      body.appendChild(el("p", "muted", t("cartEmpty")));
      var a = el("a", "btn primary", t("shop")); a.href = "index.html#customizer"; a.style.marginTop = "12px";
      body.appendChild(a); return;
    }
    var sub = 0;
    c.forEach(function (it, idx) {
      var line = it.qty * unit(it); sub += line;
      var row = el("div", "item");
      var name = el("div", "grow");
      name.appendChild(el("strong", null, t("mat_" + it.material) + " · " + t("shp_" + it.shape)));
      name.appendChild(el("div", "muted", money(unit(it))));
      if (it.design) {
        var dl = el("div", "muted"); dl.appendChild(document.createTextNode(t("design") + ": " + (it.dname || "") + " · "));
        var ed = el("a", null, t("editStudio")); ed.href = "studio.html?design=" + it.design; dl.appendChild(ed); name.appendChild(dl);
      }
      var q = el("div", "qty");
      var minus = el("button", null, "−"); minus.type = "button"; minus.setAttribute("aria-label", "-1");
      var inp = el("input"); inp.type = "number"; inp.min = "1"; inp.max = "500"; inp.value = it.qty; inp.setAttribute("aria-label", t("qty"));
      var plus = el("button", null, "+"); plus.type = "button"; plus.setAttribute("aria-label", "+1");
      function setQty(v) {
        v = Math.max(1, Math.min(500, Math.floor(Number(v) || 1)));
        var cc = loadCart(); if (!cc[idx]) return; cc[idx].qty = v; saveCart(cc); renderCart(); say(t("saved"));
      }
      minus.addEventListener("click", function () { setQty(it.qty - 1); });
      plus.addEventListener("click", function () { setQty(it.qty + 1); });
      inp.addEventListener("change", function () { setQty(inp.value); });
      q.append(minus, inp, plus);
      var price = el("strong", null, money(line)); price.style.minWidth = "80px"; price.style.textAlign = "end";
      var rm = el("button", "btn small danger", t("remove")); rm.type = "button";
      rm.addEventListener("click", function () { var cc = loadCart(); cc.splice(idx, 1); saveCart(cc); renderCart(); say(t("saved")); });
      row.append(name, q, price, rm); body.appendChild(row);
    });
    var tot = el("div", "totals");
    var s = el("div"); s.textContent = t("sub") + ": "; s.appendChild(el("strong", null, money(sub)));
    tot.append(s, el("div", "muted", t("delNote", { x: money(FREE_OVER) })));
    body.appendChild(tot);
    var act = el("div", "actions");
    var go = el("a", "btn primary", t("toOrder")); go.href = "index.html#checkout";
    var more = el("a", "btn", t("shop")); more.href = "index.html#customizer";
    var clr = el("button", "btn danger", t("clear")); clr.type = "button";
    clr.addEventListener("click", function () { if (confirm(t("clearAsk"))) { saveCart([]); renderCart(); say(t("cleared")); } });
    act.append(go, more, clr); body.appendChild(act);
  }

  /* ---------- render: orders ---------- */
  function fmtDate(iso) { try { return new Date(iso).toLocaleDateString(lang === "ar" ? "ar-TN" : lang === "fr" ? "fr-FR" : "en-GB", { year: "numeric", month: "long", day: "numeric" }); } catch (e) { return ""; } }
  function renderOrders() {
    var body = $("ordersBody"); body.replaceChildren();
    if (!user) {
      body.appendChild(el("h3", null, t("ordersGuestTitle")));
      body.appendChild(el("p", "muted", t("ordersGuestText")));
      var g = el("a", "btn primary", t("signIn")); g.href = "index.html"; body.appendChild(g); return;
    }
    if (!orders.length) { body.appendChild(el("p", "muted", t("noOrders"))); return; }
    orders.forEach(function (o) {
      var box = el("div", "order");
      var head = el("div", "row");
      var title = el("div", "grow"); title.appendChild(el("strong", null, t("orderNo", { n: o.id })));
      title.appendChild(el("div", "muted", t("placed", { d: fmtDate(o.created_at) })));
      var st = String(o.status || "pending");
      var badge = el("span", "badge " + (own(I18N.en, "s_" + st) ? st : ""), t("s_" + st)); head.append(title, badge); box.appendChild(head);
      var ul = el("ul", "lines");
      var items = Array.isArray(o.items) ? o.items : [];
      items.forEach(function (it) {
        if (!it || !own(MATERIALS, it.material) || !own(SHAPES, it.shape)) return;
        var li = el("li"); li.appendChild(el("span", null, it.qty + " × " + t("mat_" + it.material) + " · " + t("shp_" + it.shape) + (it.dname ? " · " + String(it.dname).slice(0, 60) : "")));
        li.appendChild(el("span", null, money(Number(it.qty) * Number(it.unit)))); ul.appendChild(li);
      });
      box.appendChild(ul);
      var fee = Number(o.delivery_fee) || 0;
      var tot = el("div", "totals");
      tot.appendChild(el("div", "muted", t("delivery") + ": " + (fee === 0 ? t("free") : money(fee))));
      var tt = el("div"); tt.textContent = t("total") + ": "; tt.appendChild(el("strong", null, money(Number(o.total)))); tot.appendChild(tt);
      box.appendChild(tot);
      box.appendChild(el("p", "muted", t("shipTo") + ": " + (o.governorate || "") + " — " + (o.address || "")));
      var act = el("div", "actions");
      if (st === "pending") {
        box.appendChild(el("p", "muted", t("pendHint")));
        var ch = el("button", "btn primary small", t("change")); ch.type = "button";
        ch.addEventListener("click", function () { cancelOrder(o, true); });
        var ca = el("button", "btn danger small", t("cancel")); ca.type = "button";
        ca.addEventListener("click", function () { cancelOrder(o, false); });
        act.append(ch, ca);
      } else {
        var ag = el("button", "btn small", t("again")); ag.type = "button";
        ag.addEventListener("click", function () { addToCart(items); renderCart(); say(t("doneAgain")); window.scrollTo({ top: 0, behavior: "smooth" }); });
        act.appendChild(ag);
      }
      box.appendChild(act); body.appendChild(box);
    });
  }

  async function cancelOrder(o, reuse) {
    if (!confirm(reuse ? t("askChange", { n: o.id }) : t("askCancel", { n: o.id }))) return;
    try {
      await window.tablynData.cancelMyOrder(o.id);
      if (reuse) addToCart(Array.isArray(o.items) ? o.items : []);
      await loadOrders(); renderCart();
      say(reuse ? t("doneChange") : t("doneCancel"));
      if (reuse) window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) { console.error(e); say(t("err")); await loadOrders(); }
  }

  async function loadOrders() {
    if (!user) { orders = []; renderOrders(); return; }
    try { orders = await window.tablynData.listMyOrders(user.id); } catch (e) { console.error(e); orders = []; say(t("err")); }
    renderOrders();
  }

  function show() {
    $("loading").classList.add("hidden"); $("account").classList.remove("hidden");
    renderStatic(); renderCart(); renderOrders();
  }

  /* ---------- start ---------- */
  $("langSel").addEventListener("change", function () {
    lang = $("langSel").value; try { localStorage.setItem("tf_lang", lang); } catch (e) { }
    renderStatic(); renderCart(); renderOrders();
  });
  $("refreshBtn").addEventListener("click", loadOrders);
  $("signOut").addEventListener("click", async function () { if (db) await db.auth.signOut(); });
  window.addEventListener("storage", function (e) { if (e.key === CART_KEY) renderCart(); });

  renderStatic();
  if (!db) { show(); say(t("noConfig")); return; }
  async function setSession(session) {
    user = session && session.user ? { id: session.user.id, email: session.user.email } : null;
    show(); await loadOrders();
  }
  db.auth.getSession().then(function (r) { return setSession(r.data.session); });
  db.auth.onAuthStateChange(function (_e, session) { setSession(session); });
})();
