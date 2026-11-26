/* Replaces the demo data of the admin dashboard with the real orders and
   customers from Supabase, once an administrator is signed in. */
(function () {
  var MAP = { pending: 0, confirmed: 0, in_production: 1, shipped: 2, completed: 2, cancelled: 0 };

  var UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  /* list of the designs inside orders, with a link that opens each one read-only in the Studio */
  function renderDesigns(rows) {
    var k = document.getElementById("kanban"); if (!k) return;
    var box = document.getElementById("adminDesigns");
    if (!box) {
      box = document.createElement("div"); box.id = "adminDesigns"; box.style.cssText = "margin-top:24px";
      k.parentNode.insertBefore(box, k.nextSibling);
    }
    box.replaceChildren();
    var h = document.createElement("h3"); h.textContent = "Designs to print"; h.style.cssText = "font-weight:700;font-size:1.1rem;margin-bottom:8px"; box.appendChild(h);
    var n = 0;
    rows.forEach(function (o) {
      (Array.isArray(o.items) ? o.items : []).forEach(function (i) {
        if (!i || typeof i.design !== "string" || !UUID.test(i.design)) return;
        n++;
        var p = document.createElement("p"); p.style.cssText = "margin:4px 0;font-size:.92rem";
        p.appendChild(document.createTextNode("ORD-" + o.id + " · " + (i.dname || "") + " · " + i.qty + " × " + i.material + " / " + i.shape + " · "));
        var a = document.createElement("a"); a.href = "studio.html?design=" + i.design; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Open design";
        a.style.textDecoration = "underline"; p.appendChild(a); box.appendChild(p);
      });
    });
    if (!n) { var e = document.createElement("p"); e.textContent = "No order contains a Studio design yet."; e.style.opacity = ".7"; box.appendChild(e); }
  }

  window.tablynAfterAuth = async function () {
    if (!window.tablynIsAdmin || !window.tablynData || !window.tablynData.ready) return;
    try {
      var rows = await tablynData.listOrders();
      var profs = await tablynData.listProfiles();
      orders.length = 0;
      rows.forEach(function (o) {
        var items = Array.isArray(o.items) ? o.items : [];
        var qty = items.reduce(function (n, i) { return n + (Number(i.qty) || 0); }, 0);
        var label = items.map(function (i) { return i.qty + " × " + i.material + " · " + i.shape + (i.dname ? " · " + i.dname : ""); }).join(", ");
        var first = items[0] || {};
        orders.push({ id: "ORD-" + o.id, dbId: o.id, who: o.customer_name, mat: first.material || "black",
          shape: first.shape || "standard", qty: qty, gov: o.governorate, stage: MAP[o.status] || 0,
          label: label + " · " + o.phone, total: Number(o.total) });
      });
      users.length = 0;
      profs.forEach(function (p) { users.push([p.full_name || "—", p.email, p.role === "admin" ? "admin" : "client"]); });
      if (typeof renderAdmin === "function") renderAdmin();
      renderDesigns(rows);
    } catch (e) { console.error("Admin data failed", e); }
  };
})();
