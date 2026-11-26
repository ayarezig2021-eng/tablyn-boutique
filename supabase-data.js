/* Database access. Security is enforced by Row Level Security in Supabase
   (see supabase_schema.sql), not by this file. */
(function () {
  var db = window.tablynDb;
  var STAGES = ["pending", "in_production", "shipped"];
  function need() { if (!db) throw new Error("Supabase not configured"); return db; }

  window.tablynData = {
    ready: !!db,
    STAGES: STAGES,

    async saveOrder(o) {
      var c = need();
      var u = (await c.auth.getUser()).data.user;
      if (!u) throw new Error("Not signed in");
      var row = Object.assign({ user_id: u.id }, o);
      var r = await c.from("orders").insert(row).select("id").single();
      if (r.error) throw r.error;
      return r.data.id;
    },

    async getProfile(userId) {
      var r = await need().from("profiles").select("id,email,full_name,role").eq("id", userId).maybeSingle();
      if (r.error) throw r.error;
      return r.data;
    },

    /* Customer: only MY orders (explicit filter, so an admin also sees only their own here) */
    async listMyOrders(userId) {
      var r = await need().from("orders").select("*").eq("user_id", userId).order("id", { ascending: false }).limit(100);
      if (r.error) throw r.error;
      return r.data;
    },
    /* Customer: cancel one of MY orders, only while it is still "pending" (enforced in SQL) */
    async cancelMyOrder(id) {
      var r = await need().rpc("cancel_my_order", { p_order_id: id });
      if (r.error) throw r.error;
    },

    /* ---- Studio designs ---- */
    async listMyDesigns(userId) {
      var r = await need().from("studio_designs").select("id,name,data,updated_at").eq("user_id", userId).order("updated_at", { ascending: false }).limit(50);
      if (r.error) throw r.error;
      return r.data;
    },
    async getDesign(id) {   /* owner, or an admin (RLS) */
      var r = await need().from("studio_designs").select("id,name,data,user_id").eq("id", id).maybeSingle();
      if (r.error) throw r.error;
      return r.data;
    },
    async saveDesign(id, name, data) {
      var c = need();
      if (id) {
        var u = await c.from("studio_designs").update({ name: name, data: data }).eq("id", id).select("id").maybeSingle();
        if (u.error) throw u.error;
        if (u.data) return u.data.id;
      }
      var r = await c.from("studio_designs").insert({ name: name, data: data }).select("id").single();
      if (r.error) throw r.error;
      return r.data.id;
    },
    async deleteDesign(id) {
      var r = await need().from("studio_designs").delete().eq("id", id).select("id");
      if (r.error) throw r.error;
      if (!r.data || !r.data.length) throw new Error("This design is part of an order and cannot be deleted.");
    },

    /* Admin only (RLS returns nothing for other users) */
    async listOrders() {
      var r = await need().from("orders").select("*").order("id", { ascending: false }).limit(200);
      if (r.error) throw r.error;
      return r.data;
    },
    async listProfiles() {
      var r = await need().from("profiles").select("full_name,email,role").order("created_at", { ascending: false }).limit(300);
      if (r.error) throw r.error;
      return r.data;
    },
    async updateOrderStage(id, stage) {
      var st = STAGES[Math.max(0, Math.min(2, stage))];
      var r = await need().from("orders").update({ status: st }).eq("id", id);
      if (r.error) throw r.error;
    }
  };
})();
