// OLAM Tirik olam — jonzotlar katalogi (GitHub Actions'da ishlaydi).
// Hayvonlar, qushlar, baliqlar, hasharotlar, o'rgimchaklar, dengiz jonzotlari, o'simliklar, zamburug'lar.
// Har bir bo'lim avval butunligicha so'raladi; so'rov og'irlik qilsa yoki chegaraga yetsa,
// bo'lim o'zining kichik bo'limlariga (turkum, oila...) bo'linadi — eng katta guruhlar ham to'liq chiqadi.
// Oldingi natija saqlanadi va ustiga qo'shiladi; vaqt tugasa davomi keyingi ishda.
// Natija: assets/catalog/life/<til>.json (bosh ro'yxat) va assets/catalog/life/g/<guruh>[.N].json (9 tilda)
import { sparql, sparql1, qidOfUri, fileOf, fetchMeta, GONE, loadGroups, writeGroups, loadState, saveState, more, elapsed, mins, sleep, hash, BUDGET } from "./lib.mjs";
const DIR = "assets/catalog/life";

// [guruh, Wikidata QID, min. sitelinks]: sut emizuvchilar, qushlar, nurqanotli/tog'ayli/pankanotli baliqlar, sudralib yuruvchilar,
// suvda-quruqlikda yashovchilar, hasharotlar, o'rgimchaksimonlar, ko'poyoqlilar, chuvalchanglar, mollyuskalar, qisqichbaqasimonlar,
// bo'shliqichlilar, ninatanlilar, g'ovaktanlilar, o'simliklar, zamburug'lar
const ROOTS = [["mam","Q7377",1],["bird","Q5113",1],["fish","Q127282",1],["fish","Q25371",1],["rep","Q10811",1],["amph","Q10908",1],
  ["ins","Q1390",1],["spider","Q1358",1],["spider","Q25823",1],["worm","Q25522",1],["worm","Q5185",1],["worm","Q124900",1],
  ["sea","Q25326",1],["sea","Q25364",1],["sea","Q25441",1],["sea","Q44631",1],["sea","Q18960",1],
  ["plant","Q756",1],["fungi","Q764",1]];
const LIM = 10000, MAXD = 14;   // bitta so'rovdan ko'pi bilan; bo'linish chuqurligi
const GEN = "life4-" + hash(JSON.stringify([ROOTS, LIM]));
const st = loadState(DIR, GEN);
console.log("avlod:", GEN, "aylanish:", st.round, "bajarilgan so'rovlar:", st.done.length);
const { items, meta } = loadGroups(DIR);
for(const r of st.pend) if(!items.has(r[0])) items.set(r[0], r);
const done = new Set(st.done);
const tasks = st.tasks || ROOTS.map(([grp, q, min]) => [grp+":"+q, grp, q, min, 0]);   // [kalit, guruh, QID, min, chuqurlik]
const queued = new Set(tasks.map(t => t[0]));

function take(b, grp){ let n = 0;
  for(const r of b){ const id = qidOfUri(r.item.value); const file = fileOf(r.img?.value);
    if(!file || /\.(svg|png|gif|tif|tiff|webm|ogv|pdf|djvu)$/i.test(file)) continue;
    const old = items.get(id); if(old){ old[3] = +r.sl.value; if(!old[2]) old[2] = file; continue; }
    items.set(id, [id, grp, file, +r.sl.value, 0]); n++; }
  return n; }
const speciesUnder = (qid, m) => sparql1(`SELECT ?item ?img ?sl WHERE { ?item wdt:P171+ wd:${qid} . ?item wdt:P105 wd:Q7432 ; wikibase:sitelinks ?sl . FILTER(?sl >= ${m}) ?item wdt:P18 ?img . } ORDER BY DESC(?sl) LIMIT ${LIM*2}`);
async function childrenOf(qid){
  try{ const b = await sparql(`SELECT DISTINCT ?c WHERE { ?c wdt:P171 wd:${qid} . MINUS { ?c wdt:P105 wd:Q7432 } }`); return b.map(r => qidOfUri(r.c.value)); }catch(e){ return null; } }

let added = 0, failed = 0, splits = 0;
for(let i = 0; i < tasks.length; i++){
  const [key, grp, q, min, depth] = tasks[i];
  if(done.has(key)) continue;
  if(elapsed() > BUDGET*0.7){ more("jonzotlar: so'rovlar tugamadi"); break; }
  let b = null; try{ b = await speciesUnder(q, min); }catch(e){ console.log("  og'ir:", key, "—", e.message.slice(0,50)); }
  if(b){ const n = take(b, grp); added += n; if(n || b.length > 500) console.log(mins()+"m", key, "chuqurlik", depth, "→", b.length, "yangi", n); }
  // og'ir yoki chegaraga yetdi → kichik bo'limlarga bo'lamiz
  if((!b || b.length >= LIM*2) && depth < MAXD){
    const ch = await childrenOf(q);
    if(ch){ let k = 0; for(const c of ch){ const kk = grp+":"+c; if(queued.has(kk)) continue; queued.add(kk); tasks.push([kk, grp, c, min, depth+1]); k++; }
      splits++; if(k) console.log("  bo'lindi:", key, "→", k, "ta kichik bo'lim"); done.add(key); }
    else if(!b) failed++;
    else done.add(key);
  } else if(b) done.add(key);
  else failed++;
  await sleep(200);
}
console.log("yangi:", added, "bo'linishlar:", splits, "xato so'rovlar:", failed, "jami:", items.size, "vazifalar:", tasks.length);
if(failed) more("jonzotlar: "+failed+" ta so'rov xato bo'ldi");

// nomlar
const ids = [...items.keys()];
const miss = await fetchMeta(ids, meta, { workers: 3 });
const named = ids.filter(id => meta[id]).length; console.log("nomi bor:", named, "/", ids.length);
if(named < ids.length*0.5){ console.error("nomlar olinmadi — fayllar yozilmaydi"); process.exit(1); }
if(miss) more("jonzotlar: "+miss+" ta nom qoldi");

writeGroups(DIR, items, meta, { part: 4000, top: 8000 });
const pend = ids.filter(id => !meta[id] && !GONE.has(id)).map(id => items.get(id));
saveState(DIR, { gen: GEN, round: st.round, ts: new Date().toISOString(), tasks, done: [...done], pend, total: named });
