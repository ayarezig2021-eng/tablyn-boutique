/* Sign up / sign in / sign out with Supabase Auth.
   Exposes window.tablynAuthState and window.tablynIsAdmin used by index.html. */
(function () {
  var db = window.tablynDb;
  var $ = function (id) { return document.getElementById(id); };
  window.tablynAuthState = { user: null };
  window.tablynIsAdmin = false;

  function say(msg) { if (typeof toast === "function") toast(msg); else alert(msg); }
  function refreshUi() {
    window.dispatchEvent(new Event("tablyn-auth-state-changed"));
    if (typeof renderNavButtons === "function") renderNavButtons();
    if (bar) bar.style.display = window.tablynAuthState.user ? "flex" : "none";
  }

  /* small "My account" + "Sign out" buttons, only visible when signed in */
  var pill = "padding:6px 12px;border-radius:999px;border:1px solid #ccc;background:#fff;color:#111;font:600 12px sans-serif;cursor:pointer;text-decoration:none";
  var bar = null, out = null;
  if (!window.TABLYN_NO_FLOAT) {
    bar = document.createElement("div");
    bar.id = "tablynAccountBar";
    bar.style.cssText = "position:fixed;top:70px;right:12px;z-index:60;display:none;gap:6px";
    var acc = document.createElement("a");
    acc.href = "account.html"; acc.textContent = "My account"; acc.style.cssText = pill;
    out = document.createElement("button");
    out.id = "tablynSignOut"; out.type = "button"; out.textContent = "Sign out"; out.style.cssText = pill;
    bar.appendChild(acc); bar.appendChild(out);
    document.body.appendChild(bar);
  }

  async function applySession(session) {
    var user = session && session.user ? session.user : null;
    window.tablynAuthState = { user: user ? { id: user.id, email: user.email } : null };
    window.tablynIsAdmin = false;
    if (user && db) {
      try {
        var p = await window.tablynData.getProfile(user.id);
        window.tablynIsAdmin = !!(p && p.role === "admin");
      } catch (e) { console.warn("profile lookup failed", e); }
    }
    refreshUi();
    if (typeof closeModal === "function" && user) closeModal();
    if (window.tablynAfterAuth) window.tablynAfterAuth();
  }

  if (!db) { refreshUi(); return; }

  db.auth.getSession().then(function (r) { applySession(r.data.session); });
  db.auth.onAuthStateChange(function (_e, session) { applySession(session); });

  if (out) out.addEventListener("click", async function () {
    await db.auth.signOut();
    if (typeof showPublic === "function") showPublic();
    say("Signed out.");
  });

  var form = $("authForm");
  if (!form) return;
  form.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    var email = $("authEmail").value.trim();
    var pass = $("authPass").value;
    var registering = !$("authName").classList.contains("hidden");
    var name = $("authName").value.trim();
    if (pass.length < 8) { say("Password must be at least 8 characters."); return; }
    if (registering && name.length < 2) { say("Please enter your name."); return; }
    try {
      if (registering) {
        var r = await db.auth.signUp({ email: email, password: pass, options: { data: { full_name: name } } });
        if (r.error) throw r.error;
        if (!r.data.session) say("Account created. Check your email to confirm it, then sign in.");
        else say("Account created. Welcome!");
      } else {
        var s = await db.auth.signInWithPassword({ email: email, password: pass });
        if (s.error) throw s.error;
        say("Signed in.");
      }
      form.reset();
    } catch (e) {
      say(e.message || "Authentication failed.");
    }
  });
})();
