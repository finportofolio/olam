// OLAM Tirik olam — jonzotlar katalogi (GitHub Actions'da ishlaydi).
// Hayvonlar, qushlar, baliqlar, hasharotlar (turkumlar bo'yicha), o'simliklar (POWO identifikatori orqali), zamburug'lar va boshqalar.
// Natija: assets/catalog/life/<til>.json (bosh ro'yxat) va assets/catalog/life/<til>/<guruh>.json
import { writeFileSync, mkdirSync } from "node:fs";
const UA = "OLAM-catalog-builder/1.0 (https://github.com/finportofolio/olam)";
const LANGS = ["uz","en","ru","tr","kk","ky","tg","ar","zh"], EN = 1;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const T0 = Date.now(), mins = () => ((Date.now()-T0)/60000).toFixed(1);
async function get(url, accept, ms=95000){
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
const life = new Map();
function take(b, grp, lim){ let n = 0; for(const r of b){ const id = r.item.value.split("/").pop(); if(life.has(id)) continue; const file = decodeURIComponent(r.img.value.split("FilePath/")[1]||""); if(!file || /\.(svg|png|gif|tif|tiff|webm|ogv|pdf)$/i.test(file)) continue; life.set(id, [id, grp, file, +r.sl.value]); if(++n >= lim) break; } return n; }
async function byTaxon(grp, qid, min, lim){
  for(const m of [min, min*2, min*4]){ try{ const b = await sparql(`SELECT ?item ?img ?sl WHERE { ?item wdt:P105 wd:Q7432 ; wikibase:sitelinks ?sl . FILTER(?sl >= ${m}) ?item wdt:P171+ wd:${qid} ; wdt:P18 ?img . } ORDER BY DESC(?sl) LIMIT ${lim*2}`); return take(b, grp, lim); }catch(e){ console.log("qayta urinish", grp, qid, "min", m*2); } } return 0; }
async function qidByName(name){ try{ const b = await sparql(`SELECT ?c WHERE { ?c wdt:P225 "${name}" ; wdt:P31 wd:Q16521 . } LIMIT 1`); return b[0]?.c?.value.split("/").pop()||null; }catch(e){ return null; } }
const GROUPS = [["mam","Mammalia",4],["bird","Aves",4],["fish","Actinopterygii",4],["fish","Chondrichthyes",3],["rep","Reptilia",3],["amph","Amphibia",3],["spider","Arachnida",3],["worm","Annelida",2],["worm","Nematoda",2],["worm","Platyhelminthes",2],
  ["sea","Mollusca",3],["sea","Crustacea",3],["sea","Cnidaria",2],["sea","Echinodermata",2],["sea","Porifera",2],["fungi","Agaricomycetes",3],["fungi","Lecanoromycetes",3]];
for(const [grp, name, min] of GROUPS){ const q = await qidByName(name); if(!q){ console.log("topilmadi", name); continue; } const n = await byTaxon(grp, q, min, 20000); console.log(mins()+"m", grp, name, n); await sleep(400); }
// hasharotlar — turkumlar (order) bo'yicha
try{ const ins = await qidByName("Insecta"); const ords = ins ? await sparql(`SELECT ?o WHERE { ?o wdt:P171 wd:${ins} ; wdt:P105 wd:Q36602 . }`) : [];
  console.log("hasharot turkumlari:", ords.length);
  for(const r of ords){ const q = r.o.value.split("/").pop(); const n = await byTaxon("ins", q, 3, 6000); if(n) console.log(mins()+"m ins", q, n); await sleep(300); } }catch(e){ console.log("hasharotlar XATO", e.message); }
// o'simliklar — Plants of the World Online identifikatori (P5037) bor turlar
for(const m of [4, 8, 16]){ try{ const b = await sparql(`SELECT ?item ?img ?sl WHERE { ?item wdt:P5037 ?powo ; wdt:P105 wd:Q7432 ; wikibase:sitelinks ?sl . FILTER(?sl >= ${m}) ?item wdt:P18 ?img . } ORDER BY DESC(?sl) LIMIT 40000`); console.log(mins()+"m plant", take(b, "plant", 20000)); break; }catch(e){ console.log("o'simliklar qayta, min", m*2); } }
console.log("jami:", life.size);
try{
const meta = {}, sites = LANGS.map(l => l+"wiki");
  const lids = [...life.keys()];
  for(let i=0; i<lids.length; i+=50){ const chunk = lids.slice(i, i+50);
    try{ const d = await get(`https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${chunk.join("|")}&props=labels|descriptions|sitelinks&languages=${LANGS.join("|")}&languagefallback=1&sitefilter=${sites.join("|")}`);
      for(const [k, e] of Object.entries(d.entities || {})) meta[k] = { l: LANGS.map(l => e.labels?.[l]?.value || ""), d: LANGS.map(l => (e.descriptions?.[l]?.value || "").slice(0,120)), w: LANGS.map(l => e.sitelinks?.[l+"wiki"]?.title || "") };
    }catch(e){ console.log("life meta XATO", e.message); } await sleep(250); if(i % 5000 < 50) console.log(mins()+"m nomlar", i, "/", lids.length); }
  for(let pass=1; pass<=3; pass++){ const miss = lids.filter(id => !meta[id]); console.log("nomsiz:", miss.length); if(!miss.length) break;
    for(let i=0; i<miss.length; i+=50){ try{ const d = await get(`https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${miss.slice(i,i+50).join("|")}&props=labels|descriptions|sitelinks&languages=${LANGS.join("|")}&languagefallback=1&sitefilter=${sites.join("|")}`);
      for(const [k, e] of Object.entries(d.entities || {})) meta[k] = { l: LANGS.map(l => e.labels?.[l]?.value || ""), d: LANGS.map(l => (e.descriptions?.[l]?.value || "").slice(0,120)), w: LANGS.map(l => e.sitelinks?.[l+"wiki"]?.title || "") }; }catch(e){} await sleep(400); } }
  if(lids.filter(id => meta[id]).length < lids.length*0.5){ console.error("nomlar olinmadi — fayllar yozilmaydi"); process.exit(1); }
  mkdirSync("assets/catalog/life", { recursive: true });
  for(const [li, lang] of LANGS.entries()){
    const out = []; for(const [id, grp, file, sl] of life.values()){ const m = meta[id]; if(!m) continue; const label = m.l[li] || m.l[EN]; if(!label) continue;
      out.push([id, grp, label, m.w[EN], lang==="en" ? "" : m.w[li], m.d[li], file, sl]); }
    out.sort((a,b) => b[7]-a[7]);
    const groups = {}; for(const x of out) (groups[x[1]] = groups[x[1]] || []).push(x);
    mkdirSync(`assets/catalog/life/${lang}`, { recursive: true });
    for(const [g, l] of Object.entries(groups)) writeFileSync(`assets/catalog/life/${lang}/${g}.json`, JSON.stringify({ v: 2, items: l }));
    writeFileSync(`assets/catalog/life/${lang}.json`, JSON.stringify({ v: 2, ts: new Date().toISOString().slice(0,10), total: out.length, counts: Object.fromEntries(Object.entries(groups).map(([g,l])=>[g,l.length])), items: out.slice(0, 8000) }));
    console.log(lang, "jonzotlar:", out.length);
  }

}catch(e){ console.log("XATO", e.message); process.exit(1); }
