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
