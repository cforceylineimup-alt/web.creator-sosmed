(() => {
'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ================= Konfigurasi ================= */
const CFG = window.SL_CONFIG || {};
const REMOTE = !!(CFG.SUPABASE_URL && CFG.SUPABASE_KEY);
const API = REMOTE ? CFG.SUPABASE_URL.replace(/\/+$/, '') + '/rest/v1/saluran_docs' : '';
const HD = REMOTE ? { apikey: CFG.SUPABASE_KEY, Authorization: 'Bearer ' + CFG.SUPABASE_KEY } : {};
const LSK = 'saluran_liliyana_docs_v2', DIRTYK = 'saluran_liliyana_dirty_v2', SES = 'saluran_liliyana_session',
      VIDK = 'saluran_liliyana_vid', PREFK = 'saluran_liliyana_pref';
const OWNER_PASS = 'RYUKA5522';
const QR = ['👍', '❤️', '🔥', '😂', '😮', '😢', '🙏', '🎉'];

/* ================= Ikon ================= */
const IC = {
  menu:'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  search:'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  back:'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  more:'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
  send:'M2.01 21 23 12 2.01 3 2 10l15 2-15 2z',
  attach:'M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 0 0 5 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z',
  smile:'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z',
  close:'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  eye:'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
  pin:'M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z',
  edit:'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  del:'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
  copy:'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
  link:'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z',
  bell:'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z',
  bellOff:'M20 18.69 7.84 6.14 5.27 3.49 4 4.76l2.8 2.8v.01c-.52.99-.8 2.16-.8 3.42v5l-2 2v1h13.73l2 2L21 19.72l-1-1.03zM12 22c1.11 0 2-.89 2-2h-4c0 1.11.89 2 2 2zm6-7.32V11c0-3.08-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68c-.15.03-.29.08-.42.12L18 14.68z',
  camera:'M12 12.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z',
  logout:'M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z',
  share:'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z',
  person:'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  info:'M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
  image:'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z',
  mega:'M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z',
  plus:'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  gear:'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
  users:'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'
};
const icon = n => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${IC[n]}"/></svg>`;
const vb = () => `<svg class="vb" viewBox="0 0 24 24" role="img" aria-label="Terverifikasi"><title>Terverifikasi</title><path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12z"/><path d="M10.09 16.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48z"/></svg>`;
$$('[data-ic]').forEach(e => e.innerHTML = icon(e.dataset.ic));

/* ================= Util ================= */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const pad = n => String(n).padStart(2, '0');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const clone = o => JSON.parse(JSON.stringify(o));
const MON = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const HARI = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];

let PREF = { sec: false, h24: true };
try { Object.assign(PREF, JSON.parse(localStorage.getItem(PREFK)) || {}); } catch (e) {}
const savePref = () => { try { localStorage.setItem(PREFK, JSON.stringify(PREF)); } catch (e) {} };

function fmtT(t, sec) {
  const d = new Date(t); let h = d.getHours();
  const useS = sec === undefined ? PREF.sec : sec;
  let suf = '';
  if (PREF.h24) h = pad(h); else { suf = ' ' + (h < 12 ? 'AM' : 'PM'); h = h % 12 || 12; }
  return h + ':' + pad(d.getMinutes()) + (useS ? ':' + pad(d.getSeconds()) : '') + suf;
}
const fmtFull = t => { const d = new Date(t); return d.getDate() + ' ' + MON[d.getMonth()] + ' ' + d.getFullYear() + ', ' + fmtT(t, true); };
function dayLabel(t) {
  const d = new Date(t), n = new Date();
  const a = new Date(d.getFullYear(), d.getMonth(), d.getDate()), b = new Date(n.getFullYear(), n.getMonth(), n.getDate());
  const diff = Math.round((b - a) / 864e5);
  if (diff === 0) return 'Hari ini';
  if (diff === 1) return 'Kemarin';
  return d.getDate() + ' ' + MON[d.getMonth()] + (d.getFullYear() !== n.getFullYear() ? ' ' + d.getFullYear() : '');
}
const shortTime = t => new Date(t).toDateString() === new Date().toDateString() ? fmtT(t, false) : pad(new Date(t).getDate()) + '/' + pad(new Date(t).getMonth() + 1);
const initials = n => (String(n).trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('') || '?').toUpperCase();
const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const linkify = h => h.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
function fmt(text, q) {
  if (!q) return linkify(esc(text));
  return text.split(new RegExp('(' + escRe(q) + ')', 'ig')).map((p, i) => i % 2 ? '<mark>' + esc(p) + '</mark>' : linkify(esc(p))).join('');
}
function hash(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) { ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return String(4294967296 * (2097151 & h2) + (h1 >>> 0));
}
function av(src, name, cls = '', kind = 'ch') {
  const bg = kind === 'ch' ? 'linear-gradient(135deg,#2aabee,#1a73c9)' : 'linear-gradient(135deg,#8f7bf7,#5b47d6)';
  return src ? `<div class="av ${cls}"><img src="${src}" alt=""></div>` : `<div class="av ${cls}" style="background:${bg}">${esc(initials(name))}</div>`;
}
function readImage(file, max = 1024, q = .78) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => {
      const im = new Image();
      im.onload = () => {
        const k = Math.min(1, max / Math.max(im.width, im.height));
        const w = Math.round(im.width * k), h = Math.round(im.height * k);
        const c = document.createElement('canvas'); c.width = w; c.height = h;
        c.getContext('2d').drawImage(im, 0, 0, w, h);
        res(c.toDataURL('image/jpeg', q));
      };
      im.onerror = rej; im.src = fr.result;
    };
    fr.onerror = rej; fr.readAsDataURL(file);
  });
}
async function copy(text) {
  try { await navigator.clipboard.writeText(text); }
  catch (e) {
    const t = document.createElement('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (_) {} t.remove();
  }
}
let toastT;
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2400); }
const baseUrl = () => location.href.split('#')[0];
const show = (id, on) => $(id).hidden = !on;

/* ================= Penyimpanan data =================
   Semua data berupa "dokumen" berkunci id, tiap dokumen hanya ditulis satu pihak:
   main      -> daftar saluran + akun admin (ditulis admin)
   p_<id>    -> satu postingan (ditulis admin)
   v_<id>    -> profil, reaksi, dan status baca satu pengunjung (ditulis pengunjung itu sendiri)
   v_admin   -> reaksi dan pengaturan admin
*/
let docs = {};
const dirty = new Map();
let lastRaw = null;
let syncState = REMOTE ? 'wait' : 'local';

function loadLocal() {
  try { const raw = localStorage.getItem(LSK); docs = raw ? JSON.parse(raw) : {}; lastRaw = raw; } catch (e) { docs = {}; lastRaw = null; }
}
function persist(quiet) {
  try { const raw = JSON.stringify(docs); localStorage.setItem(LSK, raw); lastRaw = raw; return true; }
  catch (e) { if (!quiet) toast('Penyimpanan penuh. Pakai foto yang lebih kecil.'); return false; }
}
function saveDirty() { try { localStorage.setItem(DIRTYK, JSON.stringify([...dirty])); } catch (e) {} }
function putDoc(id, data) {
  const prev = docs[id];
  docs[id] = { d: data, u: Date.now() };
  if (!persist(REMOTE) && !REMOTE) { if (prev) docs[id] = prev; else delete docs[id]; return false; }
  if (REMOTE) { dirty.set(id, docs[id].u); saveDirty(); scheduleFlush(); }
  return true;
}
let flushT = null, flushing = false;
function scheduleFlush(ms = 250) { clearTimeout(flushT); flushT = setTimeout(flush, ms); }
async function flush() {
  if (!REMOTE || flushing || !dirty.size) return;
  flushing = true;
  const sent = [...dirty.entries()];
  const rows = sent.map(([id, u]) => ({ id, data: docs[id] ? docs[id].d : { del: true }, updated_at: new Date(u).toISOString() }));
  let ok = false;
  try {
    const r = await fetch(API, { method: 'POST', headers: { ...HD, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(rows) });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    sent.forEach(([id, u]) => { if (dirty.get(id) === u) dirty.delete(id); });
    saveDirty(); ok = true; setSync('ok');
  } catch (e) { setSync('err'); }
  flushing = false;
  if (!ok) scheduleFlush(5000); else if (dirty.size) scheduleFlush();
}
function setSync(s) { syncState = s; paintSync(); }
function paintSync() {
  const el = $('#syncState'); if (!el) return;
  el.className = 'rs sync ' + (syncState === 'ok' ? 'ok' : syncState === 'err' ? 'err' : '');
  el.textContent = !REMOTE ? 'Lokal: data hanya tersimpan di browser ini. Isi config.js agar tersinkron antar perangkat.'
    : syncState === 'ok' ? 'Online: tersinkron ke semua perangkat'
    : syncState === 'err' ? 'Gagal terhubung ke server. Mencoba lagi otomatis...'
    : 'Menghubungkan ke server...';
}

let pulling = false;
async function pull() {
  if (pulling) return false;
  pulling = true; let changed = false;
  try {
    if (REMOTE) {
      const r = await fetch(API + '?select=id,updated_at&limit=10000', { headers: HD });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const need = [];
      for (const { id, updated_at } of await r.json()) {
        const u = Date.parse(updated_at), cur = docs[id];
        if (dirty.has(id)) continue;
        if (!cur || cur.u < u) need.push(id);
      }
      for (let i = 0; i < need.length; i += 20) {
        const part = need.slice(i, i + 20);
        const rr = await fetch(API + '?select=id,data,updated_at&id=in.(' + part.join(',') + ')', { headers: HD });
        if (!rr.ok) throw new Error('HTTP ' + rr.status);
        for (const row of await rr.json()) { docs[row.id] = { d: row.data, u: Date.parse(row.updated_at) }; changed = true; }
      }
      if (changed) persist(true);
      setSync('ok');
    } else {
      const raw = localStorage.getItem(LSK);
      if (raw !== lastRaw) { docs = raw ? JSON.parse(raw) : {}; lastRaw = raw; changed = true; }
    }
  } catch (e) { if (REMOTE) setSync('err'); }
  pulling = false;
  if (changed) rebuild();
  return changed;
}

/* ================= Data turunan ================= */
let seedTs = Number(localStorage.getItem('saluran_liliyana_seed')) || 0;
if (!seedTs) { seedTs = Date.now(); try { localStorage.setItem('saluran_liliyana_seed', String(seedTs)); } catch (e) {} }
const SEED_CH = { id: 'c_saluran', name: 'Saluran Liliyana', username: 'salurankeliliyana', desc: 'Saluran resmi Liliyana De Zenith. Info, update, dan cerita terbaru ada di sini 💙', avatar: '', createdAt: 0 };
const SEED_POST = { id: 'p_welcome', ch: 'c_saluran', text: 'Selamat datang di Saluran Liliyana 💙\nDi sini Liliyana De Zenith berbagi kabar dan update terbaru. Jangan lupa nyalakan notifikasi!', img: '', ts: seedTs, edited: false, pinned: true };
let M = { channels: [SEED_CH], admin: null }, POSTS = [], VIS = {}, RX = {}, VW = {};

function visName(id) { return id === 'v_admin' ? (M.admin ? M.admin.name : 'Admin') : ((VIS[id] && VIS[id].name) || 'Pengunjung'); }
function rebuild() {
  M = docs.main ? docs.main.d : { channels: [SEED_CH], admin: null };
  if (!Array.isArray(M.channels)) M.channels = [];
  POSTS = []; VIS = {}; RX = {}; VW = {};
  for (const id in docs) {
    const d = docs[id].d || {};
    if (id.startsWith('p_')) { if (!d.del) POSTS.push({ ...d, id }); }
    else if (id.startsWith('v_')) VIS[id] = d;
  }
  if (!docs.p_welcome) POSTS.push({ ...SEED_POST });
  for (const id in VIS) {
    const d = VIS[id], nm = visName(id);
    if (d.react) for (const pid in d.react) {
      const e = d.react[pid];
      if (!RX[pid]) RX[pid] = {};
      if (!RX[pid][e]) RX[pid][e] = [];
      RX[pid][e].push({ id, name: nm });
    }
    if (id !== 'v_admin' && Array.isArray(d.seen)) d.seen.forEach(pid => VW[pid] = (VW[pid] || 0) + 1);
  }
}
const pdata = p => ({ ch: p.ch, text: p.text || '', img: p.img || '', ts: p.ts, edited: !!p.edited, pinned: !!p.pinned });
const postsOf = ch => POSTS.filter(p => p.ch === ch).sort((a, b) => a.ts - b.ts || (a.id < b.id ? -1 : 1));
const lastPost = ch => { const l = postsOf(ch); return l[l.length - 1]; };
const sortedChannels = () => [...M.channels].sort((a, b) => ((lastPost(b.id) || {}).ts || b.createdAt || 0) - ((lastPost(a.id) || {}).ts || a.createdAt || 0));
const subsCount = () => Object.keys(VIS).filter(k => k !== 'v_admin').length;

/* ================= Sesi dan identitas ================= */
let sess = null;
try { sess = JSON.parse(localStorage.getItem(SES)); } catch (e) {}
const vid = (() => { let v = localStorage.getItem(VIDK); if (!v) { v = Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); localStorage.setItem(VIDK, v); } return v; })();
const isAdmin = () => !!(sess && sess.role === 'admin' && M.admin);
const myId = () => isAdmin() ? 'v_admin' : 'v_' + vid;
const myDoc = () => docs[myId()] ? docs[myId()].d : null;
function ensureMe() {
  if (docs[myId()]) return;
  putDoc(myId(), { name: isAdmin() ? M.admin.name : 'Pengunjung ' + (1000 + Math.floor(Math.random() * 9000)), avatar: '', joined: Date.now(), react: {}, seen: [], mute: {} });
}
function updateMe(fn) {
  ensureMe();
  const d = clone(docs[myId()].d); fn(d);
  const ok = putDoc(myId(), d); rebuild(); return ok;
}
function saveMain(fn) {
  const m = clone(M); fn(m);
  const ok = putDoc('main', m); rebuild(); return ok;
}
const me = () => isAdmin()
  ? { name: M.admin.name, sub: M.admin.gmail, avatar: M.admin.avatar, ad: true }
  : { name: (myDoc() && myDoc().name) || 'Pengunjung', sub: 'Pengunjung', avatar: (myDoc() && myDoc().avatar) || '', ad: false };
const isMuted = ch => !!(myDoc() && myDoc().mute && myDoc().mute[ch]);
function unread(ch) {
  if (isAdmin() || !myDoc()) return 0;
  const seen = new Set(myDoc().seen || []);
  return postsOf(ch).filter(p => !seen.has(p.id)).length;
}

/* ================= Status UI ================= */
let activeCh = null, searchQ = '', draftImg = '', editingId = null, pinIdx = -1, tmpPf = null, tmpCh = null, chMode = 'edit', chatOpen = false;
const curCh = () => M.channels.find(c => c.id === activeCh) || null;

/* ================= Auth ================= */
function authView(v) { show('#vChoose', v === 'choose'); show('#vAdmin', v === 'admin'); }
function authTab(t) {
  $('#tabLogin').classList.toggle('on', t === 'login'); $('#tabReg').classList.toggle('on', t === 'reg');
  show('#formLogin', t === 'login'); show('#formReg', t === 'reg');
  $('#lgErr').textContent = ''; $('#rgErr').textContent = '';
}
async function busy(btn, label, fn) {
  const old = btn.textContent; btn.textContent = label; btn.classList.add('loading');
  try { await fn(); } finally { btn.textContent = old; btn.classList.remove('loading'); }
}
$('#btnVisitor').onclick = e => busy(e.currentTarget, 'Menghubungkan...', async () => {
  if (REMOTE) await Promise.race([pull(), sleep(4000)]);
  sess = { role: 'visitor' }; localStorage.setItem(SES, JSON.stringify(sess));
  ensureMe(); rebuild(); enterApp();
});
$('#btnAdminOpen').onclick = async () => { authView('admin'); authTab('reg'); if (REMOTE) await Promise.race([pull(), sleep(3000)]); authTab(M.admin ? 'login' : 'reg'); };
$('#btnBack').onclick = () => authView('choose');
$('#tabLogin').onclick = () => authTab('login');
$('#tabReg').onclick = () => authTab('reg');
$('#btnReg').onclick = e => busy(e.currentTarget, 'Memproses...', async () => {
  const user = $('#rgUser').value.trim(), mail = $('#rgMail').value.trim().toLowerCase(), pw = $('#rgPw').value, err = $('#rgErr');
  if (REMOTE) await Promise.race([pull(), sleep(4000)]);
  if (M.admin) { err.textContent = 'Admin sudah terdaftar. Silakan masuk.'; return; }
  if (!/^[a-zA-Z0-9_.]{3,30}$/.test(user)) { err.textContent = 'Nama pengguna 3–30 karakter: huruf, angka, titik, atau garis bawah.'; return; }
  if (!/^[^\s@]+@gmail\.com$/.test(mail)) { err.textContent = 'Gunakan alamat Gmail yang valid, contoh nama@gmail.com.'; return; }
  if (pw !== OWNER_PASS) { err.textContent = 'Password salah. Password ini khusus untuk admin saluran.'; return; }
  if (!saveMain(m => { m.admin = { username: user, gmail: mail, hash: hash(pw), name: 'Liliyana De Zenith', bio: '', avatar: '' }; })) return;
  if (!docs.p_welcome) { putDoc('p_welcome', pdata({ ...SEED_POST, ts: Date.now() })); rebuild(); }
  authTab('login'); $('#lgId').value = user; $('#lgPw').focus(); toast('Pendaftaran berhasil. Silakan masuk.');
});
$('#btnLogin').onclick = e => busy(e.currentTarget, 'Memproses...', async () => {
  const id = $('#lgId').value.trim().toLowerCase(), pw = $('#lgPw').value, err = $('#lgErr');
  if (REMOTE) await Promise.race([pull(), sleep(4000)]);
  if (!M.admin) { err.textContent = 'Belum ada admin terdaftar. Buka tab Daftar dulu.'; return; }
  const a = M.admin;
  if ((id !== a.username.toLowerCase() && id !== a.gmail.toLowerCase()) || hash(pw) !== a.hash) { err.textContent = 'Nama pengguna/Gmail atau password salah.'; return; }
  sess = { role: 'admin' }; localStorage.setItem(SES, JSON.stringify(sess));
  ensureMe(); rebuild(); enterApp(true);
});
['#lgId', '#lgPw'].forEach(s => $(s).addEventListener('keydown', e => { if (e.key === 'Enter') $('#btnLogin').click(); }));
['#rgUser', '#rgMail', '#rgPw'].forEach(s => $(s).addEventListener('keydown', e => { if (e.key === 'Enter') $('#btnReg').click(); }));

function logout() {
  sess = null; localStorage.removeItem(SES); activeCh = null; chatOpen = false;
  closeDrawer(); closeMenu(); $$('.ov.show').forEach(o => o.classList.remove('show'));
  $('#app').classList.remove('chat-open', 'info-open'); $('#app').hidden = true; $('#auth').hidden = false;
  show('#noChat', true); show('#chatMain', false);
  $('#lgPw').value = ''; $('#rgPw').value = ''; authView('choose'); searchClose(); draftImg = ''; editingId = null;
}

/* ================= Render ================= */
function enterApp(first) {
  $('#auth').hidden = true; $('#app').hidden = false;
  $('#fab').hidden = !isAdmin();
  renderSide(); renderDrawer();
  const h = location.hash;
  let target = null;
  if (h.startsWith('#c-')) target = M.channels.find(c => c.id === h.slice(3));
  else if (h.startsWith('#post-')) { const p = POSTS.find(x => x.id === h.slice(6)); if (p) target = M.channels.find(c => c.id === p.ch); }
  if (target || window.innerWidth > 820) {
    const c = target || sortedChannels()[0];
    if (c) openChat(c.id);
  }
  if (first) toast('Klik kanan atau tahan sebuah pesan untuk edit, sematkan, atau hapus');
}
function refresh(stick) { renderSide(); renderHead(); renderPin(); renderFeed(stick); renderInfo(); renderDrawer(); paintSync(); }
function renderAll() { refresh(); renderComposer(); }

function renderSide() {
  const q = $('#sideSearch').value.trim().toLowerCase();
  const chs = sortedChannels().filter(c => !q || c.name.toLowerCase().includes(q));
  if (!chs.length) { $('#list').innerHTML = `<div class="empty">${q ? 'Tidak ada hasil' : (isAdmin() ? 'Belum ada saluran. Tekan tombol + untuk membuat saluran baru.' : 'Belum ada saluran.')}</div>`; return; }
  $('#list').innerHTML = chs.map(c => {
    const lp = lastPost(c.id), un = unread(c.id), mu = isMuted(c.id);
    const pv = lp ? (lp.text ? lp.text.replace(/\s+/g, ' ') : 'Foto') : 'Belum ada postingan';
    return `<div class="ci ${c.id === activeCh ? 'active' : ''}" data-ch="${c.id}" role="button" tabindex="0">
      ${av(c.avatar, c.name)}
      <div class="mid">
        <div class="r1"><div class="nm">${icon('mega')}<span class="nt">${esc(c.name)}</span>${vb()}${mu ? icon('bellOff') : ''}</div><div class="tm">${lp ? shortTime(lp.ts) : ''}</div></div>
        <div class="r2"><div class="pv">${esc(pv)}</div>${un && c.id !== activeCh ? `<span class="bdg ${mu ? 'm' : ''}">${un > 99 ? '99+' : un}</span>` : ''}</div>
      </div></div>`;
  }).join('');
}
function renderHead() {
  const c = curCh(); if (!c) return;
  $('#whoBtn').innerHTML = `${av(c.avatar, c.name, 's')}<div class="t"><div class="nm">${esc(c.name)}${vb()}</div><div class="st">${subsCount()} pelanggan</div></div>`;
}
const pinned = () => postsOf(activeCh).filter(p => p.pinned);
function renderPin() {
  const ps = pinned(), bar = $('#pinbar');
  if (!ps.length) { bar.hidden = true; return; }
  if (pinIdx < 0 || pinIdx >= ps.length) pinIdx = ps.length - 1;
  const p = ps[pinIdx]; bar.hidden = false;
  bar.innerHTML = `<div class="bar"></div><div class="pm"><div class="pt">Pesan yang disematkan${ps.length > 1 ? ' #' + (pinIdx + 1) : ''}</div><div class="px">${esc(p.text ? p.text.replace(/\s+/g, ' ') : 'Foto')}</div></div>${isAdmin() ? `<button class="ib" data-act="unpinBar" aria-label="Lepas sematan">${icon('close')}</button>` : ''}`;
}
function postHTML(p) {
  const rx = RX[p.id] || {}, my = myId();
  const chips = Object.keys(rx).map(e => {
    const l = rx[e], mine = l.some(x => x.id === my);
    return `<button class="rx ${mine ? 'mine' : ''}" data-act="react" data-e="${e}" title="${esc(l.map(x => x.name).join(', '))}" aria-label="Reaksi ${e}, ${l.length}">${e}<b>${l.length}</b></button>`;
  }).join('');
  return `<div class="msg" data-id="${p.id}"><div class="bubble ${p.img ? 'has-img' : ''}">
    ${p.img ? `<img class="pimg" src="${p.img}" alt="Foto postingan" data-act="viewImg">` : ''}
    ${p.text ? `<div class="txt">${fmt(p.text, searchQ)}</div>` : ''}
    ${chips ? `<div class="rxs">${chips}</div>` : ''}
    <div class="meta"><button class="rxadd" data-act="reactBtn" aria-label="Beri reaksi">${icon('smile')}</button>${p.pinned ? `<span class="pn">${icon('pin')}</span>` : ''}${p.edited ? '<span>diedit</span>' : ''}<span style="display:flex;align-items:center;gap:3px">${icon('eye')}${VW[p.id] || 0}</span><span class="tt" title="${esc(fmtFull(p.ts))}">${fmtT(p.ts)}</span></div>
  </div></div>`;
}
function renderFeed(stick) {
  const feed = $('#feed'), atBottom = stick || feed.scrollHeight - feed.scrollTop - feed.clientHeight < 80;
  let posts = postsOf(activeCh);
  if (searchQ) posts = posts.filter(p => (p.text || '').toLowerCase().includes(searchQ.toLowerCase()));
  $('#msgCnt').textContent = searchQ ? posts.length + ' hasil' : '';
  let html = '', last = '';
  if (!posts.length) html = `<div class="empty">${searchQ ? 'Tidak ada pesan yang cocok' : 'Belum ada postingan' + (isAdmin() ? '. Tulis yang pertama di bawah.' : '.')}</div>`;
  posts.forEach(p => { const d = dayLabel(p.ts); if (d !== last) { html += `<div class="day"><span>${d}</span></div>`; last = d; } html += postHTML(p); });
  $('#feedIn').innerHTML = html;
  if (atBottom) feed.scrollTop = feed.scrollHeight;
}
function renderComposer() {
  const box = $('#composer');
  if (!isAdmin()) {
    box.innerHTML = `<div id="visitorBar"><button data-act="toggleMute">${isMuted(activeCh) ? 'Bunyikan' : 'Bisukan'}</button></div>`;
    return;
  }
  const keep = box.querySelector('textarea') ? box.querySelector('textarea').value : '';
  box.innerHTML = `<div class="cwrap">
    <div id="emoji" hidden></div>
    <div id="editBar" hidden><div class="bar"></div><div class="et"><b>Edit pesan</b><span></span></div><button class="ib" data-act="cancelEdit" aria-label="Batal edit">${icon('close')}</button></div>
    <div id="imgPrev" hidden><img alt=""><button class="ib" data-act="rmImg" aria-label="Hapus foto">${icon('close')}</button></div>
    <div class="crow">
      <div class="cbox">
        <button class="ib" data-act="emoji" aria-label="Emoji">${icon('smile')}</button>
        <textarea id="ta" rows="1" placeholder="Siarkan pesan" aria-label="Tulis pesan"></textarea>
        <button class="ib" data-act="attach" id="attachBtn" aria-label="Lampirkan foto">${icon('attach')}</button>
      </div>
      <button id="sendBtn" data-act="send" aria-label="Kirim" disabled>${icon('send')}</button>
    </div></div>`;
  const ta = $('#ta'); ta.value = keep;
  const em = '😀 😂 🥰 😍 😎 🤩 😭 🥺 😡 👍 👏 🙏 💙 🔥 ✨ 🎉 💯 🌙 ⭐ 🌸 🍀 ☕ 🎶 📸 ✈️ 💌 🫶 🤍 🖤 😴 🤔 👀'.split(' ');
  $('#emoji').innerHTML = em.map(e => `<button type="button" data-emo="${e}">${e}</button>`).join('');
  ta.addEventListener('input', () => { grow(); syncSend(); });
  ta.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && matchMedia('(pointer:fine)').matches) { e.preventDefault(); sendPost(); } });
  syncDraft(); grow(); syncSend();
}
function grow() { const t = $('#ta'); if (!t) return; t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 160) + 'px'; }
function syncSend() { const t = $('#ta'); if (t) $('#sendBtn').disabled = !(t.value.trim() || draftImg); }
function syncDraft() {
  const ip = $('#imgPrev'); if (!ip) return;
  ip.hidden = !draftImg; if (draftImg) ip.querySelector('img').src = draftImg;
  const eb = $('#editBar'), p = editingId && POSTS.find(x => x.id === editingId);
  eb.hidden = !p; if (p) eb.querySelector('span').textContent = (p.text || 'Foto').replace(/\s+/g, ' ');
  $('#attachBtn').hidden = !!editingId;
}
function renderInfo() {
  const c = curCh(); if (!c) return;
  const a = M.admin, photos = postsOf(c.id).filter(p => p.img).length, mu = isMuted(c.id);
  $('#infoEdit').hidden = !isAdmin();
  let subs = '';
  if (isAdmin()) {
    const list = Object.keys(VIS).filter(k => k !== 'v_admin').sort((x, y) => (VIS[x].joined || 0) - (VIS[y].joined || 0));
    subs = `<div class="isec subs"><div class="row"><span class="ri">${icon('users')}</span><div class="rm"><div class="rt">${list.length} pelanggan</div><div class="rs">Terlihat hanya oleh admin</div></div></div>${list.slice(0, 50).map(k => `<div class="row">${av(VIS[k].avatar, VIS[k].name || '?', 's', 'ad')}<div class="rm"><div class="rt">${esc(VIS[k].name || 'Pengunjung')}</div></div></div>`).join('')}</div>`;
  }
  $('#infoBody').innerHTML = `
  <div class="ihead">${av(c.avatar, c.name, 'xl')}<h2>${esc(c.name)}${vb()}</h2><div class="sub">${subsCount()} pelanggan</div></div>
  <div class="isec">
    <div class="row"><span class="ri">${vb()}</span><div class="rm"><div class="rt">Terverifikasi</div><div class="rs">Saluran dan pemiliknya sudah diverifikasi</div></div></div>
    <div class="row"><span class="ri">${icon('info')}</span><div class="rm"><div class="rt">${c.desc ? linkify(esc(c.desc)) : '—'}</div><div class="rs">Deskripsi</div></div></div>
    <div class="row act" data-act="copyChLink" role="button" tabindex="0"><span class="ri">${icon('link')}</span><div class="rm"><div class="rt">@${esc(c.username)}</div><div class="rs">Nama pengguna. Ketuk untuk salin link</div></div></div>
    <div class="row act" data-act="toggleMute" role="button" tabindex="0"><span class="ri">${icon(mu ? 'bellOff' : 'bell')}</span><div class="rm"><div class="rt">Notifikasi</div><div class="rs">${mu ? 'Dibisukan' : 'Aktif'}</div></div><div class="sw ${mu ? '' : 'on'}"></div></div>
  </div>
  <div class="isec">
    <div class="row"><span class="ri">${a ? av(a.avatar, a.name, 's', 'ad') : icon('person')}</span><div class="rm"><div class="rt">${esc(a ? a.name : 'Liliyana De Zenith')}${vb()}</div><div class="rs">Pemilik saluran${a && a.username ? ' • @' + esc(a.username) : ''}</div></div></div>
    ${a && a.bio ? `<div class="row"><span class="ri">${icon('info')}</span><div class="rm"><div class="rt">${esc(a.bio)}</div><div class="rs">Bio</div></div></div>` : ''}
  </div>
  <div class="isec">
    <div class="row"><span class="ri">${icon('image')}</span><div class="rm"><div class="rt">${photos} foto</div><div class="rs">Media</div></div></div>
    <div class="row act" data-act="shareCh" role="button" tabindex="0"><span class="ri">${icon('share')}</span><div class="rm"><div class="rt">Bagikan saluran</div></div></div>
    ${isAdmin() ? `<div class="row act blue" data-act="editCh" role="button" tabindex="0"><span class="ri">${icon('edit')}</span><div class="rm"><div class="rt">Edit saluran</div></div></div>` : ''}
  </div>${subs}`;
}
function renderDrawer() {
  if (!sess) return;
  const m = me(), adm = isAdmin();
  $('#drawer').innerHTML = `
  <div class="dhead">${av(m.avatar, m.name, '', 'ad')}<div class="n">${esc(m.name)}${adm ? vb() : ''}</div><div class="e">${esc(m.sub)}</div></div>
  <div style="flex:1;overflow:auto;padding:6px 0">
    <button class="ditem" data-act="editProfile">${icon('person')}<span>Profil saya</span></button>
    ${adm ? `<button class="ditem" data-act="newCh">${icon('plus')}<span>Saluran baru</span></button>` : ''}
    <button class="ditem" data-act="settings">${icon('gear')}<span>Pengaturan</span></button>
    <button class="ditem" data-act="shareApp">${icon('share')}<span>Bagikan aplikasi</span></button>
    <button class="ditem" data-act="logout">${icon('logout')}<span>Keluar</span></button>
  </div>`;
}

/* ================= Buka / tutup chat ================= */
function markSeen() {
  if (isAdmin() || !sess || !activeCh) return;
  const seen = new Set((myDoc() && myDoc().seen) || []);
  const add = postsOf(activeCh).filter(p => !seen.has(p.id)).map(p => p.id);
  if (!add.length) return;
  updateMe(d => { d.seen = [...new Set([...(d.seen || []), ...add])]; });
}
function openChat(id) {
  if (id) activeCh = id;
  if (!curCh()) return;
  chatOpen = true;
  $('#app').classList.add('chat-open'); show('#noChat', false); show('#chatMain', true);
  pinIdx = -1; searchQ = ''; $('#msgSearch').value = ''; show('#searchbar', false);
  editingId = null; draftImg = ''; const t = $('#ta'); if (t) t.value = '';
  markSeen(); renderAll();
  const feed = $('#feed'); feed.scrollTop = feed.scrollHeight;
  if (location.hash.startsWith('#post-')) setTimeout(() => scrollToPost(location.hash.slice(6)), 120);
}
function closeChat() {
  chatOpen = false; activeCh = null; $('#app').classList.remove('chat-open', 'info-open');
  if (window.innerWidth > 820) { show('#noChat', true); show('#chatMain', false); }
  renderSide();
}
function scrollToPost(id) {
  const el = $(`.msg[data-id="${id}"]`); if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1300);
}
function searchOpen() { show('#searchbar', true); $('#msgSearch').focus(); }
function searchClose() { show('#searchbar', false); $('#msgSearch').value = ''; if (searchQ) { searchQ = ''; if (activeCh) renderFeed(); } }
$('#msgSearch').addEventListener('input', e => { searchQ = e.target.value.trim(); renderFeed(); });
$('#searchBtn').onclick = () => $('#searchbar').hidden ? searchOpen() : searchClose();
$('#searchClose').onclick = searchClose;
$('#sideSearch').addEventListener('input', renderSide);
$('#backBtn').onclick = closeChat;
$('#whoBtn').onclick = () => $('#app').classList.toggle('info-open');
$('#infoClose').onclick = () => $('#app').classList.remove('info-open');
$('#infoEdit').onclick = () => openChannelModal('edit');
$('#fab').onclick = () => openChannelModal('new');
$('#list').addEventListener('click', e => { const c = e.target.closest('.ci'); if (c) openChat(c.dataset.ch); });
$('#list').addEventListener('keydown', e => { const c = e.target.closest('.ci'); if (e.key === 'Enter' && c) openChat(c.dataset.ch); });

/* ================= Drawer ================= */
function openDrawer() { renderDrawer(); $('#drawer').classList.add('show'); $('#scrim').classList.add('show'); }
function closeDrawer() { $('#drawer').classList.remove('show'); $('#scrim').classList.remove('show'); }
$('#menuBtn').onclick = openDrawer;
$('#scrim').onclick = closeDrawer;

/* ================= Menu konteks dan reaksi ================= */
let lastMenu = 0;
function closeMenu() { $$('.cm').forEach(m => m.remove()); }
function place(m, x, y) {
  document.body.appendChild(m);
  const r = m.getBoundingClientRect();
  m.style.left = Math.max(8, Math.min(x, innerWidth - r.width - 8)) + 'px';
  m.style.top = Math.max(8, Math.min(y, innerHeight - r.height - 8)) + 'px';
}
function rrow(id) {
  const mine = (myDoc() && myDoc().react || {})[id];
  return `<div class="rrow">${QR.map(e => `<button data-r="${e}" class="${mine === e ? 'sel' : ''}" aria-label="Reaksi ${e}">${e}</button>`).join('')}</div>`;
}
function openMenu(id, x, y, barOnly) {
  closeMenu();
  const p = POSTS.find(p => p.id === id); if (!p) return;
  const m = document.createElement('div'); m.className = 'cm' + (barOnly ? ' bar' : ''); m.setAttribute('role', 'menu');
  let html = rrow(id);
  if (!barOnly) {
    const it = [];
    if (p.text) it.push(['copy', 'Salin teks', 'copyText']);
    it.push(['link', 'Salin link pesan', 'copyLink']);
    if (isAdmin()) {
      it.push(['pin', p.pinned ? 'Lepas sematan' : 'Sematkan', 'pin']);
      it.push(['edit', 'Edit', 'edit']);
      it.push(['del', 'Hapus', 'del', 'danger']);
    }
    html += it.map(([ic, lb, act, cl]) => `<button role="menuitem" class="${cl || ''}" data-m="${act}">${icon(ic)}<span>${lb}</span></button>`).join('');
  }
  m.innerHTML = html;
  place(m, x, y);
  m.onclick = e => {
    const r = e.target.closest('[data-r]');
    if (r) { closeMenu(); react(id, r.dataset.r); return; }
    const b = e.target.closest('[data-m]'); if (!b) return; closeMenu();
    const a = b.dataset.m;
    if (a === 'copyText') { copy(p.text); toast('Teks disalin'); }
    if (a === 'copyLink') { copy(baseUrl() + '#post-' + p.id); toast('Link pesan disalin'); }
    if (a === 'pin') { putDoc(id, { ...pdata(p), pinned: !p.pinned }); pinIdx = -1; rebuild(); refresh(); toast(p.pinned ? 'Sematan dilepas' : 'Pesan disematkan'); }
    if (a === 'edit') startEdit(id);
    if (a === 'del') confirmDelete(id);
  };
}
function react(postId, e) {
  updateMe(d => { d.react = d.react || {}; if (d.react[postId] === e) delete d.react[postId]; else d.react[postId] = e; });
  renderFeed();
}
document.addEventListener('contextmenu', e => {
  const m = e.target.closest('.msg');
  if (m) { e.preventDefault(); if (Date.now() - lastMenu > 600) openMenu(m.dataset.id, e.clientX, e.clientY); }
});
let lpT, lpX, lpY;
$('#feed').addEventListener('touchstart', e => {
  const m = e.target.closest('.msg'); if (!m) return;
  const t = e.touches[0]; lpX = t.clientX; lpY = t.clientY;
  lpT = setTimeout(() => { lastMenu = Date.now(); openMenu(m.dataset.id, lpX, lpY); }, 480);
}, { passive: true });
['touchend', 'touchcancel', 'touchmove'].forEach(ev => $('#feed').addEventListener(ev, () => clearTimeout(lpT), { passive: true }));
document.addEventListener('click', e => { if (!e.target.closest('.cm')) closeMenu(); });
$('#moreBtn').onclick = e => {
  e.stopPropagation(); closeMenu();
  const r = e.currentTarget.getBoundingClientRect(), mu = isMuted(activeCh);
  const m = document.createElement('div'); m.className = 'cm';
  m.innerHTML = `<button data-m="info">${icon('info')}<span>Info saluran</span></button><button data-m="mute">${icon(mu ? 'bell' : 'bellOff')}<span>${mu ? 'Bunyikan' : 'Bisukan'}</span></button><button data-m="share">${icon('share')}<span>Bagikan saluran</span></button>`;
  document.body.appendChild(m);
  const w = m.getBoundingClientRect().width;
  m.style.top = r.bottom + 4 + 'px'; m.style.left = Math.max(8, Math.min(r.right - w, innerWidth - w - 8)) + 'px';
  m.onclick = ev => {
    const b = ev.target.closest('[data-m]'); if (!b) return; closeMenu();
    if (b.dataset.m === 'info') $('#app').classList.add('info-open');
    if (b.dataset.m === 'mute') toggleMute();
    if (b.dataset.m === 'share') shareCh();
  };
};

/* ================= Aksi ================= */
function toggleMute() {
  if (!activeCh) return;
  const ch = activeCh;
  updateMe(d => { d.mute = d.mute || {}; if (d.mute[ch]) delete d.mute[ch]; else d.mute[ch] = 1; });
  refresh(); renderComposer(); toast(isMuted(ch) ? 'Notifikasi dibisukan' : 'Notifikasi diaktifkan');
}
async function shareUrl(url, title) {
  closeDrawer();
  if (navigator.share) { try { await navigator.share({ title, url }); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
  copy(url); toast('Link disalin');
}
const shareCh = () => shareUrl(baseUrl() + (activeCh ? '#c-' + activeCh : ''), (curCh() || {}).name || 'Saluran Liliyana');
function startEdit(id) {
  const p = POSTS.find(x => x.id === id); if (!p) return;
  editingId = id; draftImg = ''; syncDraft();
  const ta = $('#ta'); ta.value = p.text || ''; grow(); syncSend(); ta.focus();
}
function cancelEdit() { editingId = null; draftImg = ''; const ta = $('#ta'); if (ta) { ta.value = ''; grow(); } syncDraft(); syncSend(); }
function sendPost() {
  if (!isAdmin() || !activeCh) return;
  const text = $('#ta').value.trim();
  if (editingId) {
    const p = POSTS.find(x => x.id === editingId);
    if (!p) { cancelEdit(); return; }
    if (!text && !p.img) { toast('Pesan tidak boleh kosong'); return; }
    if (!putDoc(editingId, { ...pdata(p), text, edited: true })) return;
    editingId = null; $('#ta').value = ''; grow(); syncDraft(); syncSend(); rebuild(); refresh(); toast('Pesan diperbarui'); return;
  }
  if (!text && !draftImg) return;
  const id = 'p_' + uid();
  if (!putDoc(id, { ch: activeCh, text, img: draftImg, ts: Date.now(), edited: false, pinned: false })) return;
  draftImg = ''; $('#ta').value = ''; const em = $('#emoji'); if (em) em.hidden = true;
  grow(); syncDraft(); syncSend(); rebuild(); refresh(true);
}
let cfAction = null;
function confirmDelete(id) {
  cfAction = () => {
    const p = POSTS.find(x => x.id === id); if (!p) return;
    putDoc(id, { ...pdata(p), img: '', del: true });
    if (editingId === id) cancelEdit();
    pinIdx = -1; rebuild(); refresh(); toast('Pesan dihapus');
  };
  $('#cfTitle').textContent = 'Hapus pesan?'; $('#cfText').textContent = 'Pesan ini akan dihapus dari saluran untuk semua pengunjung.';
  openModal('mConfirm');
}
$('#cfOk').onclick = () => { closeModal('mConfirm'); if (cfAction) cfAction(); cfAction = null; };

/* ================= Modal ================= */
let clockT = null;
function openModal(id) { $('#' + id).classList.add('show'); }
function closeModal(id) { $('#' + id).classList.remove('show'); if (id === 'mSettings') { clearInterval(clockT); clockT = null; } }
$$('[data-close]').forEach(b => b.onclick = () => closeModal(b.dataset.close));
$$('.ov').forEach(o => o.addEventListener('mousedown', e => { if (e.target === o) closeModal(o.id); }));
$('#viewer').onclick = () => closeModal('viewer');

function pickAvatar(cb) {
  const f = $('#fileIn'); f.value = '';
  f.onchange = async () => { const file = f.files[0]; if (!file) return; try { cb(await readImage(file, 320, .85)); } catch (e) { toast('Foto tidak bisa dibaca'); } };
  f.click();
}
function paintPick(el, src, name, kind) { el.innerHTML = av(src, name, '', kind) + `<div class="cam">${icon('camera')}</div><div class="cb">${icon('camera')}</div>`; }

/* --- Profil (admin dan pengunjung) --- */
function openProfileModal() {
  closeDrawer(); const adm = isAdmin(), m = me();
  tmpPf = m.avatar || '';
  $('#pfName').value = m.name; $('#pfErr').textContent = '';
  show('#pfUserW', adm); show('#pfBioW', adm); show('#pfMailW', adm);
  if (adm) { $('#pfUser').value = M.admin.username; $('#pfBio').value = M.admin.bio || ''; $('#pfMail').value = M.admin.gmail; }
  paintPick($('#pfPick'), tmpPf, m.name, 'ad'); openModal('mProfile');
}
const pfPickGo = () => pickAvatar(d => { tmpPf = d; paintPick($('#pfPick'), tmpPf, $('#pfName').value || 'P', 'ad'); });
$('#pfPick').onclick = pfPickGo; $('#pfPick').onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pfPickGo(); } };
$('#pfSave').onclick = () => {
  const name = $('#pfName').value.trim(), err = $('#pfErr');
  if (!name) { err.textContent = 'Nama tidak boleh kosong.'; return; }
  if (isAdmin()) {
    const user = $('#pfUser').value.trim(), bio = $('#pfBio').value.trim();
    if (!/^[a-zA-Z0-9_.]{3,30}$/.test(user)) { err.textContent = 'Nama pengguna 3–30 karakter: huruf, angka, titik, atau garis bawah.'; return; }
    if (!saveMain(m => { Object.assign(m.admin, { name, username: user, bio, avatar: tmpPf }); })) return;
  } else {
    if (!updateMe(d => { d.name = name; d.avatar = tmpPf; })) return;
  }
  closeModal('mProfile'); refresh(); toast('Profil diperbarui');
};

/* --- Saluran (baru / edit) --- */
function openChannelModal(mode) {
  if (!isAdmin()) return; closeDrawer(); chMode = mode;
  const c = mode === 'edit' ? curCh() : null;
  if (mode === 'edit' && !c) return;
  tmpCh = c ? (c.avatar || '') : '';
  $('#chTitle').textContent = c ? 'Edit saluran' : 'Saluran baru';
  $('#chName').value = c ? c.name : ''; $('#chDesc').value = c ? (c.desc || '') : ''; $('#chUser').value = c ? c.username : ''; $('#chErr').textContent = '';
  $('#chDel').hidden = !c; $('#chSave').textContent = c ? 'Simpan' : 'Buat saluran';
  paintPick($('#chPick'), tmpCh, c ? c.name : 'S', 'ch'); openModal('mChannel');
}
const chPickGo = () => pickAvatar(d => { tmpCh = d; paintPick($('#chPick'), tmpCh, $('#chName').value || 'S', 'ch'); });
$('#chPick').onclick = chPickGo; $('#chPick').onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chPickGo(); } };
$('#chSave').onclick = () => {
  const name = $('#chName').value.trim(), desc = $('#chDesc').value.trim(), user = $('#chUser').value.trim().replace(/^@/, ''), err = $('#chErr');
  if (!name) { err.textContent = 'Nama saluran tidak boleh kosong.'; return; }
  if (!/^[a-zA-Z0-9_]{3,30}$/.test(user)) { err.textContent = 'Nama pengguna saluran 3–30 karakter: huruf, angka, atau garis bawah.'; return; }
  if (M.channels.some(c => c.username.toLowerCase() === user.toLowerCase() && !(chMode === 'edit' && c.id === activeCh))) { err.textContent = 'Nama pengguna saluran itu sudah dipakai.'; return; }
  if (chMode === 'new') {
    const id = 'c_' + uid();
    if (!saveMain(m => { m.channels.push({ id, name, username: user, desc, avatar: tmpCh, createdAt: Date.now() }); })) return;
    closeModal('mChannel'); openChat(id); toast('Saluran dibuat. Pengunjung langsung bisa melihatnya.');
  } else {
    const id = activeCh;
    if (!saveMain(m => { const c = m.channels.find(x => x.id === id); Object.assign(c, { name, desc, username: user, avatar: tmpCh }); })) return;
    closeModal('mChannel'); refresh(); toast('Saluran diperbarui');
  }
};
$('#chDel').onclick = () => {
  const c = curCh(); if (!c) return;
  closeModal('mChannel');
  cfAction = () => { const id = c.id; saveMain(m => { m.channels = m.channels.filter(x => x.id !== id); }); closeChat(); refresh(); toast('Saluran dihapus'); };
  $('#cfTitle').textContent = 'Hapus saluran?'; $('#cfText').textContent = `Saluran "${c.name}" akan hilang dari semua pengunjung.`;
  openModal('mConfirm');
};

/* --- Pengaturan --- */
function tickClock() {
  if (!$('#mSettings').classList.contains('show')) { clearInterval(clockT); clockT = null; return; }
  const d = new Date();
  $('#cH').textContent = pad(PREF.h24 ? d.getHours() : (d.getHours() % 12 || 12));
  $('#cM').textContent = pad(d.getMinutes()); $('#cS').textContent = pad(d.getSeconds());
  $('#clkDate').textContent = HARI[d.getDay()] + ', ' + d.getDate() + ' ' + MON[d.getMonth()] + ' ' + d.getFullYear() + (PREF.h24 ? '' : ' ' + (d.getHours() < 12 ? 'AM' : 'PM'));
}
function paintPrefs() {
  $('#swSec').classList.toggle('on', PREF.sec); $('#sw24').classList.toggle('on', PREF.h24);
  $('#rowSec').setAttribute('aria-checked', PREF.sec); $('#row24').setAttribute('aria-checked', PREF.h24);
}
function openSettings() {
  closeDrawer(); paintPrefs(); paintSync();
  let tz = ''; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}
  const off = -new Date().getTimezoneOffset(), sg = off >= 0 ? '+' : '-';
  $('#clkZone').textContent = 'Zona waktu: ' + (tz ? tz + ' ' : '') + '(UTC' + sg + pad(Math.floor(Math.abs(off) / 60)) + ':' + pad(Math.abs(off) % 60) + ')';
  openModal('mSettings'); tickClock(); clearInterval(clockT); clockT = setInterval(tickClock, 250);
}
function togPref(k) { PREF[k] = !PREF[k]; savePref(); paintPrefs(); tickClock(); if (!$('#app').hidden) { renderSide(); if (activeCh) renderFeed(); } }

/* ================= Delegasi klik ================= */
document.addEventListener('click', e => {
  const emo = e.target.closest('[data-emo]');
  if (emo) { const t = $('#ta'), s = t.selectionStart ?? t.value.length, en = t.selectionEnd ?? s; t.value = t.value.slice(0, s) + emo.dataset.emo + t.value.slice(en); t.focus(); t.selectionStart = t.selectionEnd = s + emo.dataset.emo.length; grow(); syncSend(); return; }
  const b = e.target.closest('[data-act]'); if (!b) return;
  const a = b.dataset.act, msg = b.closest('.msg');
  if (a === 'send') sendPost();
  else if (a === 'emoji') { const em = $('#emoji'); em.hidden = !em.hidden; }
  else if (a === 'attach') { const f = $('#fileIn'); f.value = ''; f.onchange = async () => { const file = f.files[0]; if (!file) return; try { draftImg = await readImage(file); syncDraft(); syncSend(); } catch (er) { toast('Foto tidak bisa dibaca'); } }; f.click(); }
  else if (a === 'rmImg') { draftImg = ''; syncDraft(); syncSend(); }
  else if (a === 'cancelEdit') cancelEdit();
  else if (a === 'toggleMute') toggleMute();
  else if (a === 'copyChLink') { copy(baseUrl() + '#c-' + activeCh); toast('Link saluran disalin'); }
  else if (a === 'shareCh') shareCh();
  else if (a === 'shareApp') shareUrl(baseUrl(), 'Saluran Liliyana');
  else if (a === 'editCh') openChannelModal('edit');
  else if (a === 'newCh') openChannelModal('new');
  else if (a === 'editProfile') openProfileModal();
  else if (a === 'settings') openSettings();
  else if (a === 'togSec') togPref('sec');
  else if (a === 'tog24') togPref('h24');
  else if (a === 'logout') logout();
  else if (a === 'viewImg') { $('#viewer img').src = b.src; openModal('viewer'); }
  else if (a === 'react' && msg) react(msg.dataset.id, b.dataset.e);
  else if (a === 'reactBtn' && msg) { const r = b.getBoundingClientRect(); setTimeout(() => openMenu(msg.dataset.id, r.left - 40, r.bottom + 6, true), 0); }
  else if (a === 'unpinBar') { e.stopPropagation(); const p = pinned()[pinIdx]; if (p) { putDoc(p.id, { ...pdata(p), pinned: false }); pinIdx = -1; rebuild(); refresh(); toast('Sematan dilepas'); } }
});
$('#pinbar').addEventListener('click', e => {
  if (e.target.closest('[data-act]')) return;
  const ps = pinned(); if (!ps.length) return;
  scrollToPost(ps[pinIdx].id); pinIdx = (pinIdx - 1 + ps.length) % ps.length; renderPin();
});
$('#info').addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches('[data-act]')) e.target.click(); });
$('#mSettings').addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-act]')) { e.preventDefault(); e.target.click(); } });
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeMenu(); closeDrawer();
  $$('.ov.show').forEach(o => closeModal(o.id));
  if (editingId) cancelEdit();
  else if (!$('#searchbar').hidden) searchClose();
  else $('#app').classList.remove('info-open');
});

/* ================= Sinkron berkala ================= */
function onDataChanged() {
  if ($('#app').hidden || !sess) return;
  if (activeCh && !curCh()) { closeChat(); toast('Saluran ini sudah dihapus'); }
  if (activeCh && !isAdmin()) markSeen();
  renderSide();
  if (activeCh) { renderHead(); renderPin(); renderFeed(); renderInfo(); }
  renderDrawer();
  if (!isAdmin() && activeCh) renderComposer();
}
setInterval(async () => { if (document.hidden || $('#app').hidden) return; if (await pull()) onDataChanged(); }, 4000);
document.addEventListener('visibilitychange', async () => { if (!document.hidden && !$('#app').hidden && await pull()) onDataChanged(); });
window.addEventListener('storage', async e => { if (e.key === LSK && !REMOTE && await pull()) onDataChanged(); });
window.addEventListener('online', () => { if (REMOTE) { scheduleFlush(100); pull().then(c => c && onDataChanged()); } });

/* ================= Mulai ================= */
(async function boot() {
  loadLocal();
  if (REMOTE) { try { for (const [k, v] of JSON.parse(localStorage.getItem(DIRTYK)) || []) dirty.set(k, v); } catch (e) {} }
  rebuild();
  if (REMOTE) { await Promise.race([pull(), sleep(4000)]); if (dirty.size) scheduleFlush(300); }
  if (sess && (sess.role === 'visitor' || (sess.role === 'admin' && M.admin))) { ensureMe(); rebuild(); enterApp(); }
  else { sess = null; localStorage.removeItem(SES); $('#auth').hidden = false; authView('choose'); }
})();
})();
