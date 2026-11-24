/* Apply before paint. Preference is presentation only, never authorization. */
(() => {
  const root = document.documentElement;
  const key = 'solws-color-mode';
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const valid = value => ['light', 'dark', 'system'].includes(value) ? value : 'system';
  let preference = 'system';
  try { preference = valid(localStorage.getItem(key)); } catch {}
  function apply() {
    const theme = preference === 'system' ? (media.matches ? 'dark' : 'light') : preference;
    root.dataset.theme = theme;
    root.dataset.bsTheme = theme;
    root.dataset.colorPreference = preference;
    document.querySelectorAll('[data-color-preference]').forEach(control => { control.value = preference; });
  }
  window.SolwsTheme = { set(value) {
    preference = valid(value);
    try { localStorage.setItem(key, preference); } catch {}
    apply();
  }};
  media.addEventListener('change', () => { if (preference === 'system') apply(); });
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) { preference = valid(event.newValue); apply(); }
  });
  apply();
})();
