// OLAM Tirik olam — jonzotlar katalogi (GitHub Actions'da ishlaydi).
// Hayvonlar, qushlar, baliqlar, hasharotlar, o'rgimchaklar, dengiz jonzotlari, o'simliklar, zamburug'lar.
// Har bir sinf turkumlarga (order) bo'linib so'raladi — katta guruhlar ham to'liq chiqadi.
// Oldingi natija saqlanadi va ustiga qo'shiladi; vaqt tugasa davomi keyingi ishda.
// Natija: assets/catalog/life/<til>.json (bosh ro'yxat) va assets/catalog/life/g/<guruh>[.N].json (9 tilda)
import { sparql, qidOfUri, fileOf, fetchMeta, GONE, loadGroups, writeGroups, loadState, saveState, more, elapsed, mins, sleep, hash, BUDGET } from "./lib.mjs";
const DIR = "assets/catalog/life";

// [guruh, lotincha nomi, min. sitelinks, har turkumdan ko'pi bilan]
const GROUPS = [["mam","Mammalia",1,8000],["bird","Aves",1,8000],["fish","Actinopterygii",2,8000],["fish","Chondrichthyes",1,4000],["fish","Sarcopterygii",1,500],["rep","Reptilia",1,8000],["amph","Amphibia",1,8000],
  ["ins","Insecta",2,8000],["spider","Arachnida",2,8000],["spider","Myriapoda",2,3000],["worm","Annelida",2,3000],["worm","Nematoda",2,3000],["worm","Platyhelminthes",2,3000],
  ["sea","Mollusca",2,8000],["sea","Crustacea",2,8000],["sea","Cnidaria",2,4000],["sea","Echinodermata",2,4000],["sea","Porifera",2,3000],["sea","Cephalopoda",1,3000],
  ["plant","Tracheophyta",2,8000],["plant","Bryophyta",2,3000],["plant","Marchantiophyta",2,2000],["fungi","Fungi",2,8000]];
const GEN = "life3-" + hash(JSON.stringify(GROUPS));
const st = loadState(DIR, GEN);
console.log("avlod:", GEN, "aylanish:", st.round, "bajarilgan so'rovlar:", st.done.length);
const { items, meta } = loadGroups(DIR);
for(const r of st.pend) if(!items.has(r[0])) items.set(r[0], r);
const done = new Set(st.done);

function take(b, grp, lim){ let n = 0;
  for(const r of b){ const id = qidOfUri(r.item.value); const file = fileOf(r.img?.value);
    if(!file || /\.(svg|png|gif|tif|tiff|webm|ogv|pdf|djvu)$/i.test(file)) continue;
    const old = items.get(id); if(old){ old[3] = +r.sl.value; if(!old[2]) old[2] = file; continue; }
    items.set(id, [id, grp, file, +r.sl.value, 0]); if(++n >= lim) break; }
  return n; }
async function speciesUnder(qid, min, lim){
  for(const m of [min, min*2, min*4, min*8]){
    try{ return await sparql(`SELECT ?item ?img ?sl WHERE { ?item wdt:P171+ wd:${qid} . ?item wdt:P105 wd:Q7432 ; wikibase:sitelinks ?sl . FILTER(?sl >= ${m}) ?item wdt:P18 ?img . } ORDER BY DESC(?sl) LIMIT ${lim*2}`); }
    catch(e){ console.log("  qayta urinish", qid, "min", m*2, "—", e.message.slice(0,60)); await sleep(2000); } }
  return null; }
async function qidByName(name){
  try{ const b = await sparql(`SELECT ?c ?s WHERE { ?c wdt:P225 "${name}" ; wikibase:sitelinks ?s . } ORDER BY DESC(?s) LIMIT 1`); return qidOfUri(b[0]?.c?.value) || null; }catch(e){ return null; } }
async function ordersOf(qid){
  try{ const b = await sparql(`SELECT DISTINCT ?o WHERE { ?o wdt:P171+ wd:${qid} ; wdt:P105 wd:Q36602 . }`); return b.map(r => qidOfUri(r.o.value)); }catch(e){ console.log("  turkumlar olinmadi", qid); return []; } }

// 1) vazifalar ro'yxati: har sinf → turkumlar (bir marta aniqlanadi va holatda saqlanadi)
let tasks = st.tasks;
if(!tasks){ tasks = [];
  for(const [grp, name, min, lim] of GROUPS){ const q = await qidByName(name); if(!q){ console.log("topilmadi", name); continue; }
    const ords = await ordersOf(q); console.log(mins()+"m", name, q, "turkumlar:", ords.length);
    if(ords.length) for(const o of ords) tasks.push([grp+":"+o, grp, o, min, lim]);
    tasks.push([grp+":"+q, grp, q, Math.max(min*3, 6), lim]);   // turkumi ko'rsatilmaganlar uchun — eng mashhurlari
    await sleep(300); } }
console.log("vazifalar:", tasks.length, "qolgani:", tasks.filter(t => !done.has(t[0])).length);

// 2) so'rovlar
let added = 0, failed = 0;
for(const [key, grp, q, min, lim] of tasks){
  if(done.has(key)) continue;
  if(elapsed() > BUDGET*0.7){ more("jonzotlar: so'rovlar tugamadi"); break; }
  const b = await speciesUnder(q, min, lim);
  if(b){ const n = take(b, grp, lim); added += n; done.add(key); if(n) console.log(mins()+"m", key, n); } else failed++;
  await sleep(250);
}
console.log("yangi:", added, "xato so'rovlar:", failed, "jami:", items.size);
if(failed) more("jonzotlar: "+failed+" ta so'rov xato bo'ldi");

// 3) nomlar
const ids = [...items.keys()];
const miss = await fetchMeta(ids, meta, { workers: 3 });
const named = ids.filter(id => meta[id]).length; console.log("nomi bor:", named, "/", ids.length);
if(named < ids.length*0.5){ console.error("nomlar olinmadi — fayllar yozilmaydi"); process.exit(1); }
if(miss) more("jonzotlar: "+miss+" ta nom qoldi");

// 4) yozish
writeGroups(DIR, items, meta, { part: 4000, top: 8000 });
const pend = ids.filter(id => !meta[id] && !GONE.has(id)).map(id => items.get(id));
saveState(DIR, { gen: GEN, round: st.round, ts: new Date().toISOString(), tasks, done: [...done], pend, total: named });
