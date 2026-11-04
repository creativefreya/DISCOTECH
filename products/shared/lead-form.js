// Lead Magnet page behaviour. Today sign-ups stay in this browser, and the CRM
// mockup reads them from here. The homework swaps this for a real database.
(function () {
  var STORE = 'discotech_leads';
  var UNLOCKED = 'discotech_gift_unlocked';
  function read() { try { return JSON.parse(localStorage.getItem(STORE)) || []; } catch (e) { return []; } }
  function save(rows) { try { localStorage.setItem(STORE, JSON.stringify(rows)); } catch (e) { /* the gift still unlocks */ } }
  function showGift() {
    document.querySelectorAll('[data-gift]').forEach(function (el) { el.hidden = false; });
    document.querySelectorAll('[data-hide-after]').forEach(function (el) { el.hidden = true; });
  }
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form[data-lead-form]');
    document.querySelectorAll('[data-gift]').forEach(function (el) { el.hidden = true; });
    document.querySelectorAll('[data-get-gift]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (form) { form.scrollIntoView({ behavior: 'smooth', block: 'center' }); var first = form.querySelector('input'); if (first) first.focus(); }
        else { showGift(); var gift = document.querySelector('[data-gift]'); if (gift) gift.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
    if (!form) return;
    try { if (localStorage.getItem(UNLOCKED)) showGift(); } catch (e) { /* show the form */ }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var row = {};
      new FormData(form).forEach(function (value, key) { row[key] = String(value).trim(); });
      row.source = form.getAttribute('data-source') || 'lead-magnet';
      row.stage = 'Lead';
      row.date = new Date().toISOString().slice(0, 10);
      row.you = true;
      var rows = read();
      rows.push(row);
      save(rows);
      try { localStorage.setItem(UNLOCKED, '1'); } catch (err) { /* still unlock */ }
      showGift();
      var saved = document.querySelector('[data-saved-row]');
      if (saved) { saved.hidden = false; saved.textContent = 'Saved: ' + (row.first_name || '') + ', ' + (row.email || '') + ', from ' + row.source + ', stage ' + row.stage + '. See it in your CRM.'; }
      var gift = document.querySelector('[data-gift]');
      if (gift) gift.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
