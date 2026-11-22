/* Replaces the demo data of the admin dashboard with the real orders and
   customers from Supabase, once an administrator is signed in. */
(function () {
  var MAP = { pending: 0, confirmed: 0, in_production: 1, shipped: 2, completed: 2, cancelled: 0 };

  window.tablynAfterAuth = async function () {
    if (!window.tablynIsAdmin || !window.tablynData || !window.tablynData.ready) return;
    try {
      var rows = await tablynData.listOrders();
      var profs = await tablynData.listProfiles();
      orders.length = 0;
      rows.forEach(function (o) {
        var items = Array.isArray(o.items) ? o.items : [];
        var qty = items.reduce(function (n, i) { return n + (Number(i.qty) || 0); }, 0);
        var label = items.map(function (i) { return i.qty + " × " + i.material + " · " + i.shape; }).join(", ");
        var first = items[0] || {};
        orders.push({ id: "ORD-" + o.id, dbId: o.id, who: o.customer_name, mat: first.material || "black",
          shape: first.shape || "standard", qty: qty, gov: o.governorate, stage: MAP[o.status] || 0,
          label: label + " · " + o.phone, total: Number(o.total) });
      });
      users.length = 0;
      profs.forEach(function (p) { users.push([p.full_name || "—", p.email, p.role === "admin" ? "admin" : "client"]); });
      if (typeof renderAdmin === "function") renderAdmin();
    } catch (e) { console.error("Admin data failed", e); }
  };
})();
