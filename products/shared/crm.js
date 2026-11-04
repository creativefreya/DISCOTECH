// CRM mockup. Shows the sample leads from dummy-data.js plus any test sign-ups
// saved by the Lead Magnet form in this browser.
(function () {
  var STORE = 'discotech_leads';
  var UNLOCKED = 'discotech_gift_unlocked';
  function read() { try { return JSON.parse(localStorage.getItem(STORE)) || []; } catch (e) { return []; } }
  function text(tag, value, cls) { var el = document.createElement(tag); el.textContent = value; if (cls) el.className = cls; return el; }
  function render() {
    var mine = read();
    var rows = mine.slice().reverse().concat(window.DUMMY_LEADS || []);
    var skip = { you: true };
    var columns = [];
    rows.forEach(function (r) { Object.keys(r).forEach(function (k) { if (!skip[k] && columns.indexOf(k) < 0) columns.push(k); }); });
    var head = document.getElementById('crm-head');
    var body = document.getElementById('crm-body');
    head.innerHTML = ''; body.innerHTML = '';
    var tr = document.createElement('tr');
    columns.forEach(function (c) { tr.appendChild(text('th', c.replace(/_/g, ' '))); });
    tr.appendChild(text('th', 'Type'));
    head.appendChild(tr);
    rows.forEach(function (r) {
      var row = document.createElement('tr');
      if (r.you) row.className = 'is-you';
      columns.forEach(function (c) { row.appendChild(text('td', r[c] == null ? '' : r[c])); });
      row.appendChild(text('td', r.you ? 'Your test sign-up' : 'Sample'));
      body.appendChild(row);
    });
    var count = document.getElementById('crm-count');
    if (count) count.textContent = (window.DUMMY_LEADS || []).length + ' sample leads, ' + mine.length + ' test sign-up' + (mine.length === 1 ? '' : 's');
    var clear = document.getElementById('crm-clear');
    if (clear) clear.hidden = !mine.length;
  }
  document.addEventListener('DOMContentLoaded', function () {
    render();
    var clear = document.getElementById('crm-clear');
    if (clear) clear.addEventListener('click', function () {
      try { localStorage.removeItem(STORE); localStorage.removeItem(UNLOCKED); } catch (e) { /* nothing to clear */ }
      render();
    });
    window.addEventListener('storage', render);
  });
})();
