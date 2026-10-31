// OLAM — dunyo katalogini yig'ish (GitHub Actions'da ishlaydi, foydalanuvchi telefonida emas).
// Har bir mustaqil davlatdan diqqatga sazovor joylar (turi bo'yicha + barcha meros obyektlari) Wikidata'dan olinadi.
// Oldingi natija saqlanadi va ustiga qo'shiladi; vaqt tugasa davomi keyingi ishda (MORE_FILE).
// Natija: assets/catalog/<til>.json (bosh ro'yxat) va assets/catalog/c/<ISO>.json (davlat sahifasi, 9 tilda)
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { LANGS, EN, sparql, qidOfUri, fileOf, fetchMeta, GONE, readJSON, writeJSON, unpackMeta, packMeta, more, elapsed, mins, sleep, hash, BUDGET, FRESH } from "./lib.mjs";
const DIR = "assets/catalog";

const CLS = ["Q570116", "Q8502", "Q8072", "Q46831", "Q133056", "Q35666", "Q130003", "Q23397", "Q40080", "Q23442", "Q131681", "Q39715", "Q34038", "Q177380", "Q46169", "Q179049", "Q473972", "Q22698", "Q1107656", "Q167346", "Q39816", "Q35509", "Q150784", "Q8514", "Q32815", "Q132834", "Q48356", "Q162875", "Q16970", "Q2977", "Q5393308", "Q842402", "Q44539", "Q33506", "Q207694", "Q23413", "Q57821", "Q1785071", "Q16560", "Q839954", "Q109607", "Q676050", "Q4989906", "Q12518", "Q11303", "Q12280", "Q174782", "Q11707", "Q30022", "Q37654", "Q11315", "Q740326", "Q1501", "Q875157", "Q27686", "Q22746", "Q43501", "Q2281788", "Q483110", "Q194195", "Q2416723",
  "Q44613", "Q179700", "Q483453", "Q24354", "Q153562", "Q15243209", "Q1088552", "Q317557", "Q160742", "Q7075", "Q1007870", "Q1060829", "Q2319498", "Q54050", "Q185113", "Q39594", "Q34763", "Q12323", "Q88291", "Q15661340", "Q1440300"];   // joy turlari (Wikidata QID)
const COMMON = ["Q16970", "Q44539", "Q12280", "Q22698", "Q27686", "Q11315", "Q1088552", "Q317557", "Q179700", "Q483453", "Q7075", "Q54050", "Q12323"];   // juda ko'p uchraydigan turlar — yuqoriroq chegara
const POP = new Set(["UZ", "KZ", "KG", "TJ", "TM", "TR", "AE", "SA", "AZ", "GE", "AM", "RU", "CN", "JP", "KR", "IN", "TH", "VN", "ID", "MY", "SG", "PH", "NP", "LK", "MV", "PK", "IR", "JO", "OM", "QA", "MN", "KH", "LA", "BT", "EG", "MA", "TN", "ZA", "KE", "TZ", "FR", "IT", "ES", "DE", "GB", "PT", "GR", "NL", "CH", "AT", "CZ", "PL", "HU", "HR", "NO", "SE", "FI", "DK", "IS", "IE", "BE", "UA", "US", "CA", "MX", "CU", "BR", "AR", "PE", "CL", "CO", "EC", "BO", "AU", "NZ"]);             // asosiy sayyohlik davlatlari
const BIG = new Set(["FR", "IT", "ES", "DE", "GB", "US", "RU", "CN", "JP", "IN", "PL", "CZ", "AT", "CH", "NL", "BE", "PT", "GR", "SE", "NO", "FI", "DK", "CA", "BR", "MX", "AU", "UA", "HU", "TR", "IR"]);             // juda katta davlatlar
const BADIMG = /logo|map|plan\b|flag|coat_of|seal|sign|stamp|scheme|diagram|satellite|satview|nasa|esa\d|location|route|montage|collage|locator|emblem/i;
const FULL = iso => POP.has(iso) ? (BIG.has(iso) ? 60000 : 25000) : 8000;   // davlat sahifasi
const PART = 5000;                                                            // davlat sahifasi fayli bo'lagi
const TOP  = iso => POP.has(iso) ? (BIG.has(iso) ? 120 : 80) : 20;           // bosh ro'yxat
const HMIN = iso => BIG.has(iso) ? 3 : POP.has(iso) ? 2 : 1;                 // meros obyektlari uchun min. sitelinks

const GEN = "world3-" + hash(JSON.stringify([CLS, COMMON, [...POP], [...BIG], FULL("FR"), FULL("UZ"), FULL("XX")]));
const st0 = readJSON(DIR+"/state.json") || {};
const st = (FRESH || st0.gen !== GEN) ? { gen: GEN, round: 0, done: [], pend: {} } : { gen: GEN, round: (st0.round||0)+1, done: st0.done || [], pend: st0.pend || {} };
console.log("avlod:", GEN, "aylanish:", st.round, "bajarilgan davlatlar:", st.done.length);
const done = new Set(st.done);

function guessReg(lat, lon){ if(lat>=37&&lat<=45.6&&lon>=56&&lon<=73.2) return "uz"; if(lon<-30) return lat<-10&&lon<-140?"okeaniya":"amerika"; if(lat<-10&&lon>110) return "okeaniya"; if(lon>-25&&lon<45&&lat>=36) return "yevropa"; if(lon>-20&&lon<60&&lat<37) return "afrika"; return "osiyo"; }

// 1) davlatlar ro'yxati
const cb = await sparql(`SELECT ?c ?iso ?coord WHERE { ?c wdt:P31 wd:Q3624078 ; wdt:P297 ?iso . OPTIONAL { ?c wdt:P625 ?coord } FILTER NOT EXISTS { ?c wdt:P576 ?e } }`);
const seenC = new Set(), countries = [];
for(const r of cb){ const iso = r.iso.value.toUpperCase(); if(seenC.has(iso)) continue; seenC.add(iso);
  const m = /Point\(([-\d.]+) ([-\d.]+)\)/.exec(r.coord?.value||""); let reg = m ? guessReg(+m[2], +m[1]) : "osiyo"; if(iso==="UZ") reg="uz"; else if(reg==="uz") reg="osiyo";
  countries.push([iso, qidOfUri(r.c.value), reg]); }
console.log("davlatlar:", countries.length);

// 0) oldingi natija: c/<ISO>.json → qatorlar va nomlar
const byC = {}, meta = {};   // byC[iso] = [[qid,file,lat,lon,cls,sl,reg], ...]
if(!FRESH) for(const [iso] of countries){ const d = readJSON(`${DIR}/c/${iso}.json`); if(!d) continue;
  let rows = d.items || []; for(let p = 2; p <= (d.parts||1); p++) rows = rows.concat(readJSON(`${DIR}/c/${iso}.${p}.json`)?.items || []);
  byC[iso] = rows.map(([qid,file,lat,lon,cls,sl,reg,l,de,w]) => { meta[qid] = unpackMeta(l, de, w); return [qid,file,lat,lon,cls,sl,reg]; }); }
for(const [iso, rows] of Object.entries(st.pend)){ const have = new Set((byC[iso]||[]).map(x => x[0])); byC[iso] = [...(byC[iso]||[]), ...rows.filter(x => !have.has(x[0]))]; }
console.log("oldingi joylar:", Object.values(byC).reduce((a,l) => a+l.length, 0));

// 2) har bir davlatdan joylar
const qA = (qid, lim, big, m) => `SELECT ?item ?img ?coord ?cls ?sl WHERE {
 { VALUES ?cls { ${CLS.map(k=>"wd:"+k).join(" ")} } ?item wdt:P31 ?cls . }
 UNION { ?item wdt:P1435 wd:Q9259 . BIND(wd:Q9259 AS ?cls) }
 ?item wdt:P17 wd:${qid} ; wdt:P18 ?img ; wdt:P625 ?coord ; wikibase:sitelinks ?sl .
 FILTER(?sl >= IF(?cls IN (${COMMON.map(k=>"wd:"+k).join(",")}), ${(big?5:2)*m}, ${m}))
} ORDER BY DESC(?sl) LIMIT ${lim*2}`;
// meros obyektlari: saralashsiz va guruhlashsiz (yengil so'rov), takrorlar skriptda olib tashlanadi
const qH = (qid, lim, m) => `SELECT ?item ?img ?coord ?cls ?sl WHERE {
 ?item wdt:P1435 ?h ; wdt:P17 wd:${qid} ; wdt:P18 ?img ; wdt:P625 ?coord ; wikibase:sitelinks ?sl . FILTER(?sl >= ${m}) OPTIONAL { ?item wdt:P31 ?cls }
} LIMIT ${lim*3}`;
// katta davlatlar: har bir joy turi alohida (bitta katta so'rov vaqti tugab qoladi)
const qC = (qid, cls, lim, m) => cls === "WH"
  ? `SELECT ?item ?img ?coord ?sl WHERE { ?item wdt:P1435 wd:Q9259 ; wdt:P17 wd:${qid} ; wdt:P18 ?img ; wdt:P625 ?coord ; wikibase:sitelinks ?sl . }`
  : `SELECT ?item ?img ?coord ?sl WHERE { ?item wdt:P31 wd:${cls} ; wdt:P17 wd:${qid} ; wdt:P18 ?img ; wdt:P625 ?coord ; wikibase:sitelinks ?sl . FILTER(?sl >= ${m}) } LIMIT ${lim}`;
async function byClass(iso, qid, lim, big){
  const rows = []; let fails = 0;
  for(const cls of [...CLS, "WH"]){
    const base = COMMON.includes(cls) ? (big ? 5 : 2) : 1;
    const b = await ladder(iso+" "+cls, m => qC(qid, cls, lim, m), [base, base*2, base*4]);
    if(!b){ fails++; continue; }
    const uri = "http://www.wikidata.org/entity/"+(cls === "WH" ? "Q9259" : cls);
    for(const r of b){ r.cls = { value: uri }; rows.push(r); }
    await sleep(120);
  }
  console.log("  "+iso, "turlar bo'yicha:", rows.length, "qator, xato:", fails);
  return fails > CLS.length/3 ? null : rows;
}
async function ladder(name, mk, mins_){ for(const m of mins_){ try{ return await sparql(mk(m)); }catch(e){ console.log("  qayta urinish", name, "min", m, "—", e.message.slice(0,60)); await sleep(2000); } } return null; }

let ci = 0, ok = 0, failed = 0, stopped = false;
const todo = countries.filter(([iso]) => !done.has(iso));
async function worker(){
  while(ci < todo.length){
    if(elapsed() > BUDGET*0.6){ stopped = true; return; }
    const [iso, qid, reg] = todo[ci++]; const lim = FULL(iso), big = BIG.has(iso);
    let a = big ? null : await ladder(iso+" turlar", m => qA(qid, lim, big, m), [1]);
    if(!a) a = await byClass(iso, qid, lim, big);
    const h = await ladder(iso+" meros", m => qH(qid, lim, m), [HMIN(iso), HMIN(iso)*2, HMIN(iso)*4]);
    if(!a && !h){ failed++; console.log(iso, "XATO — oldingi natija qoladi"); continue; }
    const all = [...(a||[]), ...(h||[])].map(r => ({ r, sl: +r.sl.value })).sort((x,y) => y.sl - x.sl);
    const seen = new Set(), grid = new Set(), out = [];
    for(const { r, sl } of all){
      const id = qidOfUri(r.item.value); if(seen.has(id)) continue;
      const m = /Point\(([-\d.]+) ([-\d.]+)\)/.exec(r.coord?.value||""); if(!m) continue;
      const file = fileOf(r.img?.value); if(!file || /\.(svg|png|gif|tif|tiff|webm|ogv|pdf|djvu)$/i.test(file) || BADIMG.test(file)) continue;
      const lat = +(+m[2]).toFixed(5), lon = +(+m[1]).toFixed(5), g = Math.round(lat*1500)+","+Math.round(lon*1500); if(grid.has(g)) continue;
      seen.add(id); grid.add(g); out.push([id, file, lat, lon, qidOfUri(r.cls?.value) || "Q570116", sl, reg]);
      if(out.length >= lim) break; }
    // oldingi natijada bo'lib, yangisida yo'qlar ham saqlanadi (hech narsa yo'qolmasin; oyiga bir marta noldan yangilanadi)
    { const have = new Set(out.map(x => x[0])); for(const x of byC[iso]||[]) if(!have.has(x[0])) out.push(x); out.sort((x,y) => y[5]-x[5]); }
    byC[iso] = out; if(a && h) done.add(iso); else failed++;
    ok++; console.log(mins()+"m", iso, out.length, a ? "" : "(turlar xato)", h ? "" : "(meros xato)");
    await sleep(200);
  }
}
await Promise.all([worker(), worker(), worker()]);
console.log("davlatlar:", ok, "ta so'raldi, xato:", failed, "bajarilgan jami:", done.size, "/", countries.length);
if(stopped) more("joylar: davlatlar tugamadi");
if(failed) more("joylar: "+failed+" ta davlatda xato");

// 3) nomlar, tavsiflar, maqolalar — 9 tilda (faqat yangilari uchun)
const ids = [...new Set(Object.values(byC).flat().map(x => x[0]))];
console.log("jami joylar:", ids.length);
const miss = await fetchMeta(ids, meta, { workers: 3 });
const named = ids.filter(id => meta[id]).length; console.log("nomi bor joylar:", named, "/", ids.length);
if(named < ids.length*0.5){ console.error("nomlarning yarmidan ko'pi olinmadi — fayllar yozilmaydi"); process.exit(1); }
if(miss) more("joylar: "+miss+" ta nom qoldi");

// 4) fayllar
//  - assets/catalog/<til>.json   — bosh ro'yxat: [qid,label,en,loc,desc,file,lat,lon,cls,sl,iso,reg]
//  - assets/catalog/c/<ISO>.json — davlat sahifasi, barcha tillar: [qid,file,lat,lon,cls,sl,reg,[nomlar],[tavsiflar],[maqolalar]]
mkdirSync(DIR+"/c", { recursive: true });
let full = 0; const pend = {};
for(const [iso, list] of Object.entries(byC)){
  const rows = list.filter(x => meta[x[0]] && meta[x[0]].l.some(Boolean)).map(x => [...x, ...packMeta(meta[x[0]])]);
  const p = list.filter(x => !meta[x[0]] && !GONE.has(x[0])); if(p.length) pend[iso] = p;
  full += rows.length;
  if(rows.length || !existsSync(`${DIR}/c/${iso}.json`)){ const n = Math.max(1, Math.ceil(rows.length/PART));
    for(let p = 0; p < n; p++) writeJSON(`${DIR}/c/${iso}${p ? "."+(p+1) : ""}.json`, { v: 3, langs: LANGS, part: p+1, parts: n, total: rows.length, items: rows.slice(p*PART, (p+1)*PART) });
    for(let p = n+1; existsSync(`${DIR}/c/${iso}.${p}.json`); p++) rmSync(`${DIR}/c/${iso}.${p}.json`); }
}
for(const [li, lang] of LANGS.entries()){
  const out = [];
  for(const [iso, list] of Object.entries(byC)){
    let n = 0;
    for(const [id, file, lat, lon, cls, sl, reg] of list){
      if(n >= TOP(iso)) break; const m = meta[id]; if(!m) continue;
      const label = m.l[li] || m.l[EN] || m.l.find(Boolean); if(!label) continue;
      out.push([id, label, m.w[EN], lang==="en" ? "" : m.w[li], m.d[li] || m.d[EN] || "", file, lat, lon, cls, sl, iso, reg]); n++;
    }
  }
  writeJSON(`${DIR}/${lang}.json`, { v: 3, ts: new Date().toISOString().slice(0,10), countries, total: full, items: out });
  console.log(lang, "bosh ro'yxat:", out.length);
}
writeJSON(DIR+"/state.json", { gen: GEN, round: st.round, ts: new Date().toISOString(), done: [...done], pend, total: full });
console.log("davlat sahifalaridagi jami joylar:", full);
// Jonzotlar: scripts/build-life.mjs; insonlar/texnika/internet: scripts/build-bilim.mjs
