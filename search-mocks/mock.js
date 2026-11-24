/* Search mockups (#690). Client-side filtering over fictional rows only. No network calls. */
window.SearchMock = {
  esc(value) {
    return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },
  mark(value, query) {
    const safe = this.esc(value);
    const q = String(query || '').trim();
    if (!q) return safe;
    const pattern = new RegExp('(' + this.esc(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    return safe.replace(pattern, '<mark>$1</mark>');
  },
  digits(value) { return String(value).replace(/\D/g, ''); },
  matches(fields, query) {
    const q = String(query || '').trim().toLowerCase();
    if (!q) return true;
    const qDigits = this.digits(q);
    return fields.some(field => {
      const text = String(field).toLowerCase();
      if (text.includes(q)) return true;
      return qDigits.length >= 3 && this.digits(text).includes(qDigits);
    });
  }
};
