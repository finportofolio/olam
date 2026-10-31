// OLAM katalog yig'uvchilar uchun umumiy yordamchilar (GitHub Actions'da ishlaydi, telefonda emas).
// - Wikidata so'rovlari (qayta urinish, vaqt chegarasi)
// - Oldingi natijani o'qib, ustiga qo'shish (har safar noldan boshlamaydi)
// - Vaqt tugasa: borini yozadi va davomini keyingi ishga qoldiradi (MORE_FILE)
// - Ixcham ko'p tilli format (v3): bir guruh = bitta fayl, 9 til ichida
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";

export const UA = "OLAM-catalog-builder/1.2 (https://github.com/finportofolio/olam)";
export const LANGS = ["uz","en","ru","tr","kk","ky","tg","ar","zh"], EN = 1;
export const sleep = ms => new Promise(r => setTimeout(r, ms));
const T0 = Date.now();
export const elapsed = () => (Date.now()-T0)/60000, mins = () => elapsed().toFixed(1);
export const BUDGET = +(process.env.BUDGET_MIN || 300);       // shuncha daqiqadan keyin yangi so'rov boshlanmaydi
export const FRESH = process.env.FRESH === "1";                // 1 — eski natijani hisobga olmay, noldan
export const MORE_FILE = process.env.MORE_FILE || "/tmp/olam-more";
export const hash = s => createHash("sha1").update(s).digest("hex").slice(0, 10);
export function more(why){ writeFileSync(MORE_FILE, why+"\n", { flag: "a" }); console.log("DAVOMI KEYINGI ISHDA:", why); }
export const readJSON = p => { try{ return JSON.parse(readFileSync(p, "utf8")); }catch(e){ return null; } };
export const writeJSON = (p, d) => writeFileSync(p, JSON.stringify(d));

export async function get(url, accept, ms=90000){
  let slow = 0;   // og'ir so'rov vaqti tugashi: bir marta qayta urinamiz, keyin yuqoriroq chegara bilan (ladder)
  for(let a=0; a<6; a++){
    try{
      const ac = new AbortController(); const to = setTimeout(()=>ac.abort(), ms);
      const r = await fetch(url, { headers: { "User-Agent": UA, "Accept": accept || "application/json" }, signal: ac.signal }); clearTimeout(to);
      if(r.ok){ const j = await r.json();
        if(j && j.error){ const ra = +(r.headers.get("retry-after")||0); console.log("api band:", j.error.code||"error"); await sleep(Math.max(ra*1000, 5000*(a+1))); continue; }
        return j; }
      const ra = +(r.headers.get("retry-after")||0);
      if(r.status===429){ console.log("ko'p so'rov (429), kutilmoqda", ra||10, "s"); await sleep(Math.max(ra*1000, 10000*(a+1))); continue; }
      if(r.status>=500){ const t = await r.text().catch(()=>"");
        if(/TimeoutException|timeout/i.test(t)){ if(++slow >= 2) throw new Error("timeout"); }
        await sleep(Math.max(ra*1000, 5000*(a+1))); continue; }
      throw new Error(r.status+" "+(await r.text()).slice(0,160).replace(/\s+/g," "));
    }catch(e){
      if(e.name === "AbortError"){ if(++slow >= 2) throw new Error("timeout"); continue; }
      if(a===5 || /^4\d\d |^timeout$/.test(e.message)) throw e; await sleep(3000*(a+1)); }
  }
  throw new Error("failed");
}
export const sparql = q => get("https://query.wikidata.org/sparql?format=json&query="+encodeURIComponent(q), "application/sparql-results+json", 75000).then(d => d.results.bindings);
export const qidOfUri = u => (u||"").split("/").pop();
export const fileOf = u => { try{ return decodeURIComponent((u||"").split("FilePath/")[1]||""); }catch(e){ return ""; } };

// Nomlar, tavsiflar, Wikipedia maqola nomlari — 9 tilda. meta[qid] = { l:[9], d:[9], w:[9] }
const metaRow = e => ({ l: LANGS.map(l => e.labels?.[l]?.value || ""), d: LANGS.map(l => (e.descriptions?.[l]?.value || "").slice(0,120)), w: LANGS.map(l => e.sitelinks?.[l+"wiki"]?.title || "") });
export async function fetchMeta(ids, meta, { workers = 3, until = BUDGET + 25 } = {}){
  const sites = LANGS.map(l => l+"wiki").join("|");
  for(let pass = 0; pass < 4; pass++){
    const miss = ids.filter(id => meta[id] === undefined); if(!miss.length) break;
    console.log(mins()+"m nomlar, o'tish", pass+1, "qolgan:", miss.length);
    let i = 0, done = 0;
    const w = async () => { while(i < miss.length){ if(elapsed() > until) return; const chunk = miss.slice(i, i+50); i += 50;
      try{ const d = await get(`https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${chunk.join("|")}&props=labels|descriptions|sitelinks&languages=${LANGS.join("|")}&languagefallback=1&sitefilter=${sites}`);
        for(const [k, e] of Object.entries(d.entities || {})) meta[k] = (e && !("missing" in e)) ? metaRow(e) : null; }catch(e){ console.log("meta XATO", e.message); }
      done += chunk.length; if(done % 10000 < 50) console.log(mins()+"m nomlar", done, "/", miss.length);
      await sleep(150); } };
    await Promise.all(Array.from({ length: workers }, w));
    if(elapsed() > until){ console.log("nomlar uchun vaqt tugadi"); break; }
  }
  for(const id of ids) if(meta[id] === null) delete meta[id], GONE.add(id);   // Wikidata'da o'chirilgan elementlar
  return ids.filter(id => !meta[id] && !GONE.has(id)).length;
}
export const GONE = new Set();

// Ixcham yozish: inglizcha bilan bir xil nom/tavsif boshqa tillarda takrorlanmaydi ("" — inglizchasini ol)
export const packMeta = m => { const en = m.l[EN] || m.l.find(Boolean) || "", ed = m.d[EN] || "";
  return [m.l.map((v,i) => i===EN ? en : (v===en ? "" : v)), m.d.map((v,i) => i===EN ? ed : (v===ed ? "" : v)), m.w]; };
export const unpackMeta = (l, d, w) => ({ l: l.map(v => v || l[EN] || ""), d: d.map(v => v || d[EN] || ""), w: w || LANGS.map(() => "") });

// ===== Jonzotlar / bilim kataloglari (guruhlar bo'yicha) =====
// items: Map qid → [qid, grp, file, sl, logo]
export function loadGroups(dir){
  const items = new Map(), meta = {};
  if(FRESH) return { items, meta };
  if(existsSync(dir+"/g")){
    for(const f of readdirSync(dir+"/g")){ const d = readJSON(dir+"/g/"+f); if(!d) continue;
      for(const [qid, grp, file, sl, logo, l, de, w] of d.items || []){ items.set(qid, [qid, grp, file, sl, logo||0]); meta[qid] = unpackMeta(l, de, w); } }
  } else {   // eski format: <til>/<guruh>.json
    for(const [li, lang] of LANGS.entries()){ const p = dir+"/"+lang; if(!existsSync(p)) continue;
      for(const f of readdirSync(p)){ const d = readJSON(p+"/"+f); if(!d) continue;
        for(const [qid, grp, label, en, loc, desc, file, sl, logo] of d.items || []){
          if(!items.has(qid)) items.set(qid, [qid, grp, file, sl, logo||0]);
          const m = meta[qid] || (meta[qid] = { l: LANGS.map(()=>""), d: LANGS.map(()=>""), w: LANGS.map(()=>"") });
          m.l[li] = label || ""; m.d[li] = desc || ""; if(en) m.w[EN] = en; if(lang !== "en") m.w[li] = loc || ""; } } }
  }
  console.log("oldingi natija:", items.size, "ta");
  return { items, meta };
}

export function writeGroups(dir, items, meta, { part = 4000, top = 8000 } = {}){
  const rows = [...items.values()].filter(x => meta[x[0]] && meta[x[0]].l.some(Boolean)).sort((a,b) => b[3]-a[3]);
  const groups = {}; for(const x of rows) (groups[x[1]] = groups[x[1]] || []).push(x);
  rmSync(dir+"/g", { recursive: true, force: true }); mkdirSync(dir+"/g", { recursive: true });
  const parts = {};
  for(const [g, l] of Object.entries(groups)){ const n = Math.ceil(l.length/part); parts[g] = n;
    for(let p=0; p<n; p++) writeJSON(`${dir}/g/${g}${p ? "."+(p+1) : ""}.json`, { v: 3, langs: LANGS, grp: g, part: p+1, parts: n, total: l.length,
      items: l.slice(p*part, (p+1)*part).map(x => [x[0], x[1], x[2], x[3], x[4]||0, ...packMeta(meta[x[0]])]) }); }
  const counts = Object.fromEntries(Object.entries(groups).map(([g,l]) => [g, l.length]));
  // bosh ro'yxat: har guruhdan eng mashhurlari (bir guruh hammasini egallab olmasin)
  const ng = Object.keys(groups).length || 1, per = Math.ceil(top/ng), pick = new Set();
  for(const l of Object.values(groups)) l.slice(0, per).forEach(x => pick.add(x[0]));
  for(const x of rows){ if(pick.size >= top) break; pick.add(x[0]); }
  const idx = rows.filter(x => pick.has(x[0]));
  const ts = new Date().toISOString().slice(0,10);
  for(const [li, lang] of LANGS.entries()){
    const out = idx.map(x => { const m = meta[x[0]]; return [x[0], x[1], m.l[li] || m.l[EN] || m.l.find(Boolean), m.w[EN], lang==="en" ? "" : m.w[li], m.d[li] || "", x[2], x[3], x[4]||0]; });
    writeJSON(`${dir}/${lang}.json`, { v: 3, ts, total: rows.length, counts, parts, items: out });
    rmSync(`${dir}/${lang}`, { recursive: true, force: true });   // eski format papkasi
  }
  console.log("yozildi:", rows.length, JSON.stringify(counts));
  return { total: rows.length, counts };
}

// Holat: qaysi so'rovlar shu "avlod"da bajarilgan (sozlama o'zgarsa — avlod yangilanadi)
export function loadState(dir, gen){
  const st = readJSON(dir+"/state.json") || {};
  if(FRESH || st.gen !== gen) return { gen, round: 0, done: [], pend: [] };
  return { ...st, gen, round: (st.round||0)+1, done: st.done || [], pend: st.pend || [] };
}
export const saveState = (dir, st) => writeJSON(dir+"/state.json", st);
