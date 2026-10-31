// OLAM Bilim — insonlar, texnika va internet katalogi (GitHub Actions'da ishlaydi).
// Wikidata'dan har bir guruhning eng mashhur (ko'p tilda maqolasi bor, rasmi yoki logosi bor) elementlarini yig'adi.
// Natija: assets/catalog/bilim/<til>.json (bosh ro'yxat) va assets/catalog/bilim/<til>/<guruh>.json
import { writeFileSync, mkdirSync } from "node:fs";
const UA = "OLAM-catalog-builder/1.0 (https://github.com/finportofolio/olam)";
const LANGS = ["uz","en","ru","tr","kk","ky","tg","ar","zh"], EN = 1;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const T0 = Date.now(), mins = () => ((Date.now()-T0)/60000).toFixed(1);
async function get(url, accept, ms=90000){
  for(let a=0; a<6; a++){
    try{ const ac = new AbortController(); const to = setTimeout(()=>ac.abort(), ms);
      const r = await fetch(url, { headers: { "User-Agent": UA, "Accept": accept || "application/json" }, signal: ac.signal }); clearTimeout(to);
      if(r.ok){ const j = await r.json(); if(j && j.error){ console.log("api band:", j.error.code||"error"); await sleep(5000*(a+1)); continue; } return j; }
      if(r.status===429 || r.status>=500){ await sleep(5000*(a+1)); continue; }
      throw new Error(r.status+" "+(await r.text()).slice(0,200));
    }catch(e){ if(a===5) throw e; await sleep(3000*(a+1)); }
  }
}
const sparql = q => get("https://query.wikidata.org/sparql?format=json&query="+encodeURIComponent(q), "application/sparql-results+json").then(d => d.results.bindings);
// Guruhlar inglizcha nomi bo'yicha aniqlanadi (QID skriptda topiladi) — noto'g'ri ID xavfi yo'q.
// Insonlar — kasbi (P106) bo'yicha; texnika va internet — turi (P31) bo'yicha.
const PEOPLE = { sci:["scientist","physicist","chemist","mathematician","inventor","physician","astronomer","biologist","engineer"], art:["writer","poet","painter","sculptor","architect","novelist"],
  mus:["musician","singer","composer","actor","film director","rapper"], sport:["association football player","basketball player","tennis player","athletics competitor","chess player","boxer","martial artist","swimmer"],
  hist:["monarch","military leader","explorer","philosopher","astronaut","religious leader"], pol:["politician","diplomat","statesperson"], biz:["entrepreneur","businessperson","blogger","YouTuber"] };
const THINGS = { car:["automobile model","motorcycle model","truck model","electric vehicle model"], air:["aircraft model","launch vehicle","spacecraft","space probe","space station"], dev:["smartphone model","video game console","robot","tablet computer model","personal computer model"],
  web:["website","social networking service","search engine","online marketplace","video hosting service","streaming service","online encyclopedia","news website"], ai:["chatbot","large language model","virtual assistant","text-to-image model","generative artificial intelligence"],
  app:["mobile app","instant messaging client","web application","operating system","web browser","messaging app","video game"] };
const QC = {};
async function qidOf(label){ if(QC[label]!==undefined) return QC[label];
  try{ const b = await sparql(`SELECT ?c ?s WHERE { ?c rdfs:label "${label}"@en ; wikibase:sitelinks ?s . } ORDER BY DESC(?s) LIMIT 1`); QC[label] = b[0]?.c?.value.split("/").pop() || null; }catch(e){ QC[label] = null; }
  if(!QC[label]) console.log("topilmadi:", label); return QC[label]; }
const ids_ = async labels => (await Promise.all(labels.map(qidOf))).filter(Boolean);
const LIMIT = { uzb:4000, pol:2000, sci:2000, art:2000, mus:2500, sport:2500, hist:1500, biz:1000, car:1500, air:1500, dev:1000, web:1500, ai:500, app:1500 };
const MINSL = { uzb:1, pol:25, sci:20, art:20, mus:25, sport:25, hist:20, biz:12, car:6, air:6, dev:5, web:6, ai:2, app:6 };
const items = new Map();   // qid → [qid, grp, file, sl, logo?]
async function collect(grp, cond, logo, noImg){
  const lim = LIMIT[grp], min = MINSL[grp];
  const q = `SELECT ?item ?img ?logo ?sl WHERE { ${cond} ?item wikibase:sitelinks ?sl . FILTER(?sl >= ${min}) OPTIONAL { ?item wdt:P18 ?img } ${logo?"OPTIONAL { ?item wdt:P154 ?logo }":""} ${noImg?"":"FILTER(BOUND(?img) || BOUND(?logo))"} } ORDER BY DESC(?sl) LIMIT ${lim*2}`;
  let b; try{ b = await sparql(q); }catch(e){ try{ b = await sparql(q.replace(`FILTER(?sl >= ${min})`, `FILTER(?sl >= ${min*2})`)); }catch(e2){ console.log("XATO", grp, e2.message); return; } }
  let n = 0; for(const r of b){ const id = r.item.value.split("/").pop(); if(items.has(id)) continue;
    const src = (r.img?.value || r.logo?.value || ""); let file = decodeURIComponent(src.split("FilePath/")[1]||""); if(/\.(webm|ogv|pdf|tif|tiff)$/i.test(file)) file = ""; if(!file && !noImg) continue;
    items.set(id, [id, grp, file, +r.sl.value, r.img ? 0 : 1]); if(++n >= lim) break; }
  console.log(mins()+"m", grp, n);
}
// 0) O'zbekistonlik shaxslar — Wikipedia'da sahifasi bor hamma (rasmsiz ham)
await collect("uzb", `?item wdt:P31 wd:Q5 ; wdt:P27 wd:Q265 .`, false, true);
// 1) insonlar, 2) texnika, 3) internet
for(const [grp, labels] of Object.entries(PEOPLE)){ const q = await ids_(labels); if(q.length) await collect(grp, `VALUES ?occ { ${q.map(x=>"wd:"+x).join(" ")} } ?item wdt:P31 wd:Q5 ; wdt:P106 ?occ .`, false); }
for(const grp of ["car","air","dev"]){ const q = await ids_(THINGS[grp]); if(q.length) await collect(grp, `VALUES ?cls { ${q.map(x=>"wd:"+x).join(" ")} } ?item wdt:P31 ?cls .`, false); }
for(const grp of ["web","ai","app"]){ const q = await ids_(THINGS[grp]); if(q.length) await collect(grp, `VALUES ?cls { ${q.map(x=>"wd:"+x).join(" ")} } ?item wdt:P31 ?cls .`, true); }
console.log("jami:", items.size);
// 4) nomlar, tavsiflar, maqolalar — 9 tilda
const meta = {}, ids = [...items.keys()], sites = LANGS.map(l => l+"wiki");
for(let pass=0; pass<4; pass++){ const miss = ids.filter(id => !meta[id]); if(!miss.length) break; console.log(mins()+"m nomlar, o'tish", pass+1, "qolgan:", miss.length);
  for(let i=0; i<miss.length; i+=50){ const chunk = miss.slice(i, i+50);
    try{ const d = await get(`https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${chunk.join("|")}&props=labels|descriptions|sitelinks&languages=${LANGS.join("|")}&languagefallback=1&sitefilter=${sites.join("|")}`);
      for(const [k, e] of Object.entries(d.entities || {})) meta[k] = { l: LANGS.map(l => e.labels?.[l]?.value || ""), d: LANGS.map(l => (e.descriptions?.[l]?.value || "").slice(0,120)), w: LANGS.map(l => e.sitelinks?.[l+"wiki"]?.title || "") };
    }catch(e){ console.log("meta XATO", e.message); } await sleep(300); } }
const named = ids.filter(id => meta[id]).length; console.log("nomi bor:", named, "/", ids.length);
if(named < ids.length*0.5){ console.error("nomlar olinmadi — fayllar yozilmaydi"); process.exit(1); }
// 5) fayllar: [qid,guruh,nom,en_maqola,mahalliy_maqola,tavsif,rasm,sitelinks,logo]
for(const [li, lang] of LANGS.entries()){
  const out = []; for(const [id, grp, file, sl, logo] of items.values()){ const m = meta[id]; if(!m) continue; const label = m.l[li] || m.l[EN]; if(!label) continue;
    out.push([id, grp, label, m.w[EN], lang==="en" ? "" : m.w[li], m.d[li], file, sl, logo]); }
  out.sort((a,b) => b[7]-a[7]);
  const groups = {}; for(const x of out) (groups[x[1]] = groups[x[1]] || []).push(x);
  mkdirSync(`assets/catalog/bilim/${lang}`, { recursive: true });
  for(const [g, l] of Object.entries(groups)) writeFileSync(`assets/catalog/bilim/${lang}/${g}.json`, JSON.stringify({ v: 1, items: l }));
  writeFileSync(`assets/catalog/bilim/${lang}.json`, JSON.stringify({ v: 1, ts: new Date().toISOString().slice(0,10), total: out.length, counts: Object.fromEntries(Object.entries(groups).map(([g,l])=>[g,l.length])), items: out.slice(0, 8000) }));
  console.log(lang, out.length);
}
