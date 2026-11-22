/* ============================================================
   TABLYN — the ONLY file you need to edit before publishing.
   Supabase > Project Settings > API Keys:
   - URL            -> supabaseUrl
   - "publishable" (or "anon") key -> supabaseKey
   NEVER paste the "secret" or "service_role" key here:
   this file is public.
   ============================================================ */
window.TABLYN_CONFIG = {
  supabaseUrl: "https://bunmtbkwqvuymjdunnqg.supabase.co",
  supabaseKey: "sb_publishable_GSGUjWn5a9unLyZ9MQcGqw_ofvoxdHh",
  supportEmail: "ayarezig2021@gmail.com"
};

(function () {
  var c = window.TABLYN_CONFIG;
  var ok = c.supabaseUrl.indexOf("YOUR-") === -1 && c.supabaseKey.indexOf("YOUR-") === -1;
  window.tablynDb = null;
  if (!ok) { console.warn("Tablyn: Supabase is not configured (edit supabase-config.js)."); return; }
  if (!window.supabase || !window.supabase.createClient) { console.warn("Tablyn: supabase-js did not load."); return; }
  window.tablynDb = window.supabase.createClient(c.supabaseUrl, c.supabaseKey);
})();
