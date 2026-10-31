// OLAM — dunyo katalogini yig'ish (GitHub Actions'da ishlaydi, foydalanuvchi telefonida emas).
// Har bir mustaqil davlatdan eng mashhur joylarni Wikidata'dan olib, assets/catalog/<til>.json fayllariga yozadi.
// Ishga tushirish: node scripts/build-catalog.mjs
import { writeFileSync, mkdirSync } from "node:fs";

const UA = "OLAM-catalog-builder/1.0 (https://github.com/finportofolio/olam)";
const LANGS = ["uz","en","ru","tr","kk","ky","tg","ar","zh"];
const CLS = ["Q570116", "Q8502", "Q8072", "Q46831", "Q133056", "Q35666", "Q130003", "Q23397", "Q40080", "Q23442", "Q131681", "Q39715", "Q34038", "Q177380", "Q46169", "Q179049", "Q473972", "Q22698", "Q1107656", "Q167346", "Q39816", "Q35509", "Q150784", "Q8514", "Q32815", "Q132834", "Q48356", "Q162875", "Q16970", "Q2977", "Q5393308", "Q842402", "Q44539", "Q33506", "Q207694", "Q23413", "Q57821", "Q1785071", "Q16560", "Q839954", "Q109607", "Q676050", "Q4989906", "Q12518", "Q11303", "Q12280", "Q174782", "Q11707", "Q30022", "Q37654", "Q11315", "Q740326", "Q1501", "Q875157", "Q27686", "Q22746", "Q43501", "Q2281788", "Q483110", "Q194195", "Q2416723"];                      // joy turlari (Wikidata QID)
const POP = new Set(["UZ", "KZ", "KG", "TJ", "TM", "TR", "AE", "SA", "AZ", "GE", "AM", "RU", "CN", "JP", "KR", "IN", "TH", "VN", "ID", "MY", "SG", "PH", "NP", "LK", "MV", "PK", "IR", "JO", "OM", "QA", "MN", "KH", "LA", "BT", "EG", "MA", "TN", "ZA", "KE", "TZ", "FR", "IT", "ES", "DE", "GB", "PT", "GR", "NL", "CH", "AT", "CZ", "PL", "HU", "HR", "NO", "SE", "FI", "DK", "IS", "IE", "BE", "UA", "US", "CA", "MX", "CU", "BR", "AR", "PE", "CL", "CO", "EC", "BO", "AU", "NZ"]);             // asosiy sayyohlik davlatlari
const BIG = new Set(["FR", "IT", "ES", "DE", "GB", "US", "RU", "CN", "JP", "IN", "PL", "CZ", "AT", "CH", "NL", "BE", "PT", "GR", "SE", "NO", "FI", "DK", "CA", "BR", "MX", "AU", "UA", "HU", "TR", "IR"]);             // juda katta davlatlar
const BADIMG = /logo|map|plan\b|flag|coat_of|seal|sign|stamp|scheme|diagram|satellite|satview|nasa|esa\d|location|route|montage|collage|locator|emblem/i;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const T0 = Date.now(), mins = () => ((Date.now()-T0)/60000).toFixed(1);

function guessReg(lat, lon){ if(lat>=37&&lat<=45.6&&lon>=56&&lon<=73.2) return "uz"; if(lon<-30) return lat<-10&&lon<-140?"okeaniya":"amerika"; if(lat<-10&&lon>110) return "okeaniya"; if(lon>-25&&lon<45&&lat>=36) return "yevropa"; if(lon>-20&&lon<60&&lat<37) return "afrika"; return "osiyo"; }

async function get(url, accept, ms=90000){
  for(let a=0; a<6; a++){
    try{
      const ac = new AbortController(); const to = setTimeout(()=>ac.abort(), ms);
      const r = await fetch(url, { headers: { "User-Agent": UA, "Accept": accept || "application/json" }, signal: ac.signal }); clearTimeout(to);
      if(r.ok){ const j = await r.json();
        if(j && j.error){ const ra = +(r.headers.get("retry-after")||0); console.log("api band:", j.error.code||"error", "— kutilmoqda"); await sleep(Math.max(ra*1000, 5000*(a+1))); continue; }
        return j; }
      if(r.status===429 || r.status>=500){ await sleep(4000*(a+1)); continue; }
      throw new Error(r.status+" "+(await r.text()).slice(0,200));
    }catch(e){ if(a===5) throw e; await sleep(3000*(a+1)); }
  }
}
const sparql = q => get("https://query.wikidata.org/sparql?format=json&query="+encodeURIComponent(q), "application/sparql-results+json").then(d => d.results.bindings);

// 1) davlatlar ro'yxati
const cb = await sparql(`SELECT ?c ?iso ?coord WHERE { ?c wdt:P31 wd:Q3624078 ; wdt:P297 ?iso . OPTIONAL { ?c wdt:P625 ?coord } FILTER NOT EXISTS { ?c wdt:P576 ?e } }`);
const seenC = new Set(), countries = [];
for(const r of cb){ const iso = r.iso.value.toUpperCase(); if(seenC.has(iso)) continue; seenC.add(iso);
  const m = /Point\(([-\d.]+) ([-\d.]+)\)/.exec(r.coord?.value||""); let reg = m ? guessReg(+m[2], +m[1]) : "osiyo"; if(iso==="UZ") reg="uz"; else if(reg==="uz") reg="osiyo";
  countries.push([iso, r.c.value.split("/").pop(), reg]); }
console.log("davlatlar:", countries.length);

// 2) har bir davlatdan joylar: to'liq ro'yxat (davlat sahifasi) va eng mashhurlari (bosh ro'yxat)
const q = (qid, lim, big) => `SELECT ?item ?img ?coord ?cls ?sl WHERE {
 { VALUES ?cls { ${CLS.map(k=>"wd:"+k).join(" ")} } ?item wdt:P31 ?cls . }
 UNION { ?item wdt:P1435 wd:Q9259 . BIND(wd:Q9259 AS ?cls) }
 ?item wdt:P17 wd:${qid} ; wdt:P18 ?img ; wdt:P625 ?coord ; wikibase:sitelinks ?sl .
 FILTER(?sl >= IF(?cls IN (wd:Q16970,wd:Q44539,wd:Q12280,wd:Q22698,wd:Q27686,wd:Q11315), ${big?5:2}, 1))
} ORDER BY DESC(?sl) LIMIT ${lim*3}`;
const FULL = iso => POP.has(iso) ? (BIG.has(iso) ? 6000 : 4000) : 1200;      // davlat sahifasi
const TOP  = iso => POP.has(iso) ? (BIG.has(iso) ? 120 : 80) : 20;         // bosh ro'yxat
const byC = {};   // iso → [[qid,file,lat,lon,cls,sl,reg], ...]
let ci = 0, ok = 0;
async function worker(){
  while(ci < countries.length){
    if(Date.now()-T0 > 200*60000){ console.log("vaqt tugadi, to'xtatildi"); return; }
    const [iso, qid, reg] = countries[ci++]; const lim = FULL(iso);
    let b = null;
    try{ b = await sparql(q(qid, lim, BIG.has(iso))); }
    catch(e){ try{ b = await sparql(q(qid, Math.round(lim/3), true)); }catch(e2){ console.log(iso, "XATO", e2.message); } }
    if(b){ const seen = new Set(), grid = new Set(), out = [];
      for(const r of b){
        const id = r.item.value.split("/").pop(); if(seen.has(id)) continue;
        const m = /Point\(([-\d.]+) ([-\d.]+)\)/.exec(r.coord?.value||""); if(!m) continue;
        const file = decodeURIComponent(r.img.value.split("FilePath/")[1]||""); if(!file || /\.(svg|png|gif|tif|tiff|webm|ogv|pdf)$/i.test(file) || BADIMG.test(file)) continue;
        const lat = +(+m[2]).toFixed(5), lon = +(+m[1]).toFixed(5), g = Math.round(lat*300)+","+Math.round(lon*300); if(grid.has(g)) continue;
        seen.add(id); grid.add(g); out.push([id, file, lat, lon, r.cls.value.split("/").pop(), +r.sl.value, reg]);
        if(out.length >= lim) break; }
      byC[iso] = out; ok++; console.log(mins()+"m", iso, out.length); }
    await sleep(250);
  }
}
await Promise.all([worker(), worker(), worker()]);
console.log("davlatlar tayyor:", ok, "/", countries.length);
if(ok < countries.length*0.6) { console.error("juda ko'p xato"); process.exit(1); }

// 3) nomlar, tavsiflar, maqolalar — 9 tilda (50 tadan)
const ids = [...new Set(Object.values(byC).flat().map(x => x[0]))];
console.log("jami joylar:", ids.length);
const meta = {}; const sites = LANGS.map(l => l+"wiki");
let mi = 0;
async function metaWorker(){
  while(mi < ids.length){ if(Date.now()-T0 > 320*60000) return; const chunk = ids.slice(mi, mi+50); mi += 50; if(mi % 2000 < 50) console.log(mins()+"m meta", mi, "/", ids.length);
    try{ const d = await get(`https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${chunk.join("|")}&props=labels|descriptions|sitelinks&languages=${LANGS.join("|")}&languagefallback=1&sitefilter=${sites.join("|")}`);
      for(const [k, e] of Object.entries(d.entities || {})) meta[k] = { l: LANGS.map(l => e.labels?.[l]?.value || ""), d: LANGS.map(l => (e.descriptions?.[l]?.value || "").slice(0,120)), w: LANGS.map(l => e.sitelinks?.[l+"wiki"]?.title || "") };
    }catch(e){ console.log("meta XATO", e.message); }
    await sleep(250); } }
await Promise.all([metaWorker(), metaWorker()]);
for(let pass=1; pass<=3; pass++){ const miss = ids.filter(id => !meta[id]); console.log(mins()+"m nomlar topilmagan:", miss.length, "(o'tish", pass+")"); if(!miss.length) break;
  for(let i=0; i<miss.length; i+=50){ const chunk = miss.slice(i, i+50);
    try{ const d = await get(`https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${chunk.join("|")}&props=labels|descriptions|sitelinks&languages=${LANGS.join("|")}&languagefallback=1&sitefilter=${sites.join("|")}`);
      for(const [k, e] of Object.entries(d.entities || {})) meta[k] = { l: LANGS.map(l => e.labels?.[l]?.value || ""), d: LANGS.map(l => (e.descriptions?.[l]?.value || "").slice(0,120)), w: LANGS.map(l => e.sitelinks?.[l+"wiki"]?.title || "") };
    }catch(e){ console.log("meta XATO", e.message); } await sleep(400); } }

const named = ids.filter(id => meta[id]).length; console.log("nomi bor joylar:", named, "/", ids.length);
if(named < ids.length*0.5){ console.error("nomlarning yarmidan ko'pi olinmadi — fayllar yozilmaydi"); process.exit(1); }
// 4) fayllar
//  - assets/catalog/<til>.json   — bosh ro'yxat: [qid,label,en,loc,desc,file,lat,lon,cls,sl,iso,reg]
//  - assets/catalog/c/<ISO>.json — davlat sahifasi, barcha tillar: [qid,file,lat,lon,cls,sl,reg,[nomlar],[tavsiflar],[maqolalar]]
mkdirSync("assets/catalog/c", { recursive: true });
const EN = LANGS.indexOf("en"); let full = 0;
for(const [iso, list] of Object.entries(byC)){
  const rows = list.filter(x => meta[x[0]] && (meta[x[0]].l[EN] || meta[x[0]].l.some(Boolean))).map(x => { const m = meta[x[0]]; return [...x, m.l, m.d, m.w]; });
  full += rows.length;
  writeFileSync(`assets/catalog/c/${iso}.json`, JSON.stringify({ v: 2, langs: LANGS, items: rows }));
}
for(const [li, lang] of LANGS.entries()){
  const out = [];
  for(const [iso, list] of Object.entries(byC)){
    let n = 0;
    for(const [id, file, lat, lon, cls, sl, reg] of list){
      if(n >= TOP(iso)) break; const m = meta[id]; if(!m) continue;
      const label = m.l[li] || m.l[EN]; if(!label) continue;
      out.push([id, label, m.w[EN], lang==="en" ? "" : m.w[li], m.d[li], file, lat, lon, cls, sl, iso, reg]); n++;
    }
  }
  writeFileSync(`assets/catalog/${lang}.json`, JSON.stringify({ v: 2, ts: new Date().toISOString().slice(0,10), countries, total: full, items: out }));
  console.log(lang, "bosh ro'yxat:", out.length);
}
console.log("davlat sahifalaridagi jami joylar:", full);

// 5) Jonzotlar endi alohida: scripts/build-life.mjs (catalog-life.yml)
