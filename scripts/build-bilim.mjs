// OLAM Bilim — insonlar, texnika va internet katalogi (GitHub Actions'da ishlaydi).
// Wikidata'dan har guruhning mashhur (Wikipedia'da maqolasi, rasmi yoki logosi bor) elementlari.
// Har bir kasb / tur alohida so'raladi; oldingi natija saqlanadi, vaqt tugasa davomi keyingi ishda.
// Natija: assets/catalog/bilim/<til>.json (bosh ro'yxat) va assets/catalog/bilim/g/<guruh>[.N].json (9 tilda)
import { sparql, qidOfUri, fileOf, fetchMeta, GONE, loadGroups, writeGroups, loadState, saveState, more, elapsed, mins, sleep, hash, BUDGET } from "./lib.mjs";
const DIR = "assets/catalog/bilim";

// Insonlar — kasbi (P106); texnika va internet — turi (P31). Guruh nomlari inglizcha (QID skriptda topiladi).
// [nom, ko'pi bilan, min. sitelinks]
const PEOPLE = {
  sci: [["scientist",20000,3],["physicist",15000,3],["chemist",15000,3],["mathematician",15000,3],["inventor",8000,2],["physician",20000,3],["astronomer",8000,2],["biologist",10000,3],["engineer",15000,3],
        ["economist",10000,3],["historian",15000,3],["philologist",8000,3],["linguist",8000,3],["geographer",5000,3],["psychologist",6000,3],["computer scientist",6000,2],["botanist",8000,3],["zoologist",6000,3],["geologist",6000,3],["archaeologist",6000,3]],
  art: [["writer",30000,3],["poet",25000,3],["painter",25000,3],["sculptor",10000,3],["architect",12000,3],["novelist",15000,3],["playwright",10000,3],["photographer",8000,3],["journalist",20000,3],["translator",10000,3],["illustrator",6000,3],["calligrapher",2000,2]],
  mus: [["musician",20000,3],["singer",25000,3],["composer",20000,3],["actor",30000,3],["film actor",30000,3],["television actor",20000,3],["film director",15000,3],["rapper",8000,2],["screenwriter",15000,3],["film producer",10000,3],["comedian",6000,3],["dancer",6000,3],["television presenter",10000,3],["Q4610556",8000,3],["record producer",5000,3],["guitarist",6000,3],["pianist",6000,3]],
  sport: [["association football player",40000,4],["basketball player",12000,3],["tennis player",8000,3],["athletics competitor",15000,3],["chess player",8000,2],["boxer",8000,3],["martial artist",4000,2],["swimmer",8000,3],
          ["ice hockey player",12000,4],["volleyball player",6000,3],["wrestler",8000,3],["sport cyclist",8000,3],["racing automobile driver",6000,3],["judoka",5000,3],["weightlifter",4000,3],["artistic gymnast",4000,3],["cricketer",6000,3],["baseball player",6000,4],["American football player",6000,4],["handball player",5000,3],["fencer",4000,3],["figure skater",4000,3],["alpine skier",4000,3],["rower",4000,3],["sport shooter",3000,3]],
  hist: [["monarch",15000,2],["military leader",15000,3],["explorer",8000,2],["philosopher",15000,3],["astronaut",2000,1],["religious leader",8000,2],["theologian",10000,3],["military officer",20000,3],["aristocrat",15000,3],["missionary",4000,3],["Islamic scholar",6000,2],["poet-saint",1000,1]],
  pol: [["politician",60000,3],["diplomat",15000,3],["statesperson",8000,2],["lawyer",20000,3],["judge",10000,3],["activist",12000,3],["civil servant",10000,3],["trade unionist",4000,3]],
  biz: [["entrepreneur",20000,3],["businessperson",25000,3],["blogger",6000,2],["YouTuber",8000,2],["investor",6000,2],["banker",6000,3],["Q2906862",4000,2],["chief executive officer",6000,2],["fashion designer",4000,3]]
};
const THINGS = {
  car: [["automobile model",25000,1],["motorcycle model",8000,1],["truck model",6000,1],["electric vehicle model",3000,1],["bus model",4000,1],["concept car",3000,1],["tractor model",2000,1],["sports car",2000,1]],
  air: [["aircraft model",15000,1],["launch vehicle",4000,1],["spacecraft",6000,1],["space probe",3000,1],["space station",500,1],["artificial satellite",8000,2],["rocket engine",2000,1],["space telescope",500,1],["rover",500,1],["helicopter model",3000,1],["airliner",2000,1]],
  dev: [["smartphone model",10000,1],["video game console",2000,1],["robot",3000,1],["tablet computer model",3000,1],["personal computer model",4000,1],["mobile phone model",8000,1],["laptop model",3000,1],["smartwatch model",1000,1],["digital camera model",4000,1],["microprocessor",4000,1],["humanoid robot",500,1],["home computer",2000,1],["handheld game console",1000,1]],
  web: [["website",20000,2],["social networking service",3000,1],["search engine",2000,1],["online marketplace",3000,1],["video hosting service",2000,1],["streaming service",3000,1],["online encyclopedia",2000,1],["news website",6000,2],["web portal",4000,2],["online service",4000,1],["wiki",3000,2],["cryptocurrency",3000,1],["online database",3000,3],["dating app",500,1],["online video platform",1000,1]],
  ai: [["chatbot",2000,1],["large language model",2000,1],["virtual assistant",1000,1],["text-to-image model",500,1],["generative artificial intelligence",500,1],["language model",1000,1],["foundation model",500,1],["text-to-video model",300,1],["machine learning model",1000,1],["artificial intelligence",500,1],["AI agent",300,1]],
  app: [["mobile app",8000,1],["instant messaging client",2000,1],["web application",4000,1],["operating system",6000,1],["web browser",2000,1],["messaging app",1000,1],["video game",15000,4],["mobile game",6000,2],["email client",1000,1],["media player",1500,1],["office suite",500,1],["antivirus software",500,1],["programming language",6000,2],["video editing software",500,1],["free software",6000,3]]
};
const GEN = "bilim3-" + hash(JSON.stringify([PEOPLE, THINGS]));
const st = loadState(DIR, GEN);
console.log("avlod:", GEN, "aylanish:", st.round, "bajarilgan so'rovlar:", st.done.length);
const { items, meta } = loadGroups(DIR);
for(const r of st.pend) if(!items.has(r[0])) items.set(r[0], r);
const done = new Set(st.done);

const QC = {};
// null — Wikidata'da yo'q; undefined — so'rov xato (keyingi ishda qayta urinadi)
async function qidOf(label, type){ if(/^Q\d+$/.test(label)) return label; const k = label+"|"+(type||""); if(QC[k] !== undefined) return QC[k];
  try{ const b = await sparql(`SELECT ?c ?s WHERE { ?c rdfs:label "${label}"@en ; wikibase:sitelinks ?s . ${type ? `?c wdt:P31 wd:${type} .` : ""} } ORDER BY DESC(?s) LIMIT 1`); QC[k] = qidOfUri(b[0]?.c?.value) || null; }catch(e){ return undefined; }
  if(!QC[k]) console.log("topilmadi:", label); return QC[k]; }

function take(b, grp, lim, noImg, famous){ let n = 0;
  for(const r of b){ const id = qidOfUri(r.item.value);
    let file = fileOf(r.img?.value || r.logo?.value); if(/\.(webm|ogv|pdf|tif|tiff|djvu)$/i.test(file)) file = "";
    if(!file && !noImg && !(famous && +r.sl.value >= famous)) continue;
    const old = items.get(id); if(old){ old[3] = +r.sl.value; if(!old[2] && file){ old[2] = file; old[4] = r.img ? 0 : 1; } continue; }
    items.set(id, [id, grp, file, +r.sl.value, file && !r.img ? 1 : 0]); if(++n >= lim) break; }
  return n; }
async function collect(key, grp, cond, lim, min, { logo = false, noImg = false, famous = 0 } = {}){
  if(done.has(key)) return true;
  for(const m of [min, min*2, min*4, min*8]){
    const q = `SELECT ?item ?img ?logo ?sl WHERE { ${cond} ?item wikibase:sitelinks ?sl . FILTER(?sl >= ${m}) OPTIONAL { ?item wdt:P18 ?img } ${logo ? "OPTIONAL { ?item wdt:P154 ?logo }" : ""} ${noImg ? "" : `FILTER(BOUND(?img)${logo ? " || BOUND(?logo)" : ""}${famous ? ` || ?sl >= ${famous}` : ""})`} } ORDER BY DESC(?sl) LIMIT ${Math.round(lim*1.5)}`;
    try{ const b = await sparql(q); const n = take(b, grp, lim, noImg, famous); console.log(mins()+"m", key, "min", m, "→", n); done.add(key); return true; }
    catch(e){ console.log("  qayta urinish", key, "min", m*2, "—", e.message.slice(0,60)); await sleep(2000); }
  }
  return false; }

// vazifalar
const tasks = [];
// 0) O'zbekistonlik shaxslar — Wikipedia'da sahifasi bor hamma (rasmsiz ham): fuqaroligi yoki tug'ilgan joyi O'zbekiston
tasks.push(["uzb:cit", "uzb", `?item wdt:P31 wd:Q5 ; wdt:P27 wd:Q265 .`, 40000, 1, { noImg: true }]);
tasks.push(["uzb:ssr", "uzb", `?item wdt:P31 wd:Q5 ; wdt:P27 wd:Q484578 .`, 20000, 1, { noImg: true }]);
tasks.push(["uzb:born", "uzb", `?item wdt:P31 wd:Q5 ; wdt:P19 ?pob . ?pob wdt:P17 wd:Q265 .`, 40000, 1, { noImg: true }]);
// chig'atoy tilida ijod qilganlar (Navoiy, Bobur, Mashrab...) va o'zbeklar (millati)
for(const [key, label, type, prop] of [["uzb:chag", "Chagatai", "Q34770", "P1412"], ["uzb:eth", "Uzbeks", "Q41710", "P172"]]){
  const q = await qidOf(label, type); if(q) tasks.push([key, "uzb", `?item wdt:P31 wd:Q5 ; wdt:${prop} wd:${q} .`, 20000, 1, { noImg: true }]); else if(q === undefined) more("bilim: "+label+" aniqlanmadi"); }
const labelTasks = [];
for(const [grp, list] of Object.entries(PEOPLE)) for(const [label, lim, min] of list) labelTasks.push([grp, label, lim, min, "occ"]);
for(const [grp, list] of Object.entries(THINGS)) for(const [label, lim, min] of list) labelTasks.push([grp, label, lim, min, "cls"]);

let failed = 0, stopped = false;
for(const [key, grp, cond, lim, min, opt] of tasks){ if(elapsed() > BUDGET*0.7){ stopped = true; break; } if(!await collect(key, grp, cond, lim, min, opt)) failed++; await sleep(300); }
for(const [grp, label, lim, min, kind] of labelTasks){
  const key = grp+":"+label; if(done.has(key)) continue;
  if(elapsed() > BUDGET*0.7){ stopped = true; break; }
  const q = await qidOf(label); if(q === undefined){ failed++; continue; } if(!q){ done.add(key); continue; }
  const cond = kind === "occ" ? `?item wdt:P106 wd:${q} ; wdt:P31 wd:Q5 .` : `?item wdt:P31 wd:${q} .`;
  if(!await collect(key, grp, cond, lim, min, { logo: ["web","ai","app"].includes(grp), famous: kind === "occ" ? 25 : 0 })) failed++;
  await sleep(300);
}
if(stopped) more("bilim: so'rovlar tugamadi");
if(failed) more("bilim: "+failed+" ta so'rov xato bo'ldi");
console.log("jami:", items.size, "xato so'rovlar:", failed);

// nomlar
const ids = [...items.keys()];
const miss = await fetchMeta(ids, meta, { workers: 3 });
const named = ids.filter(id => meta[id]).length; console.log("nomi bor:", named, "/", ids.length);
if(named < ids.length*0.5){ console.error("nomlar olinmadi — fayllar yozilmaydi"); process.exit(1); }
if(miss) more("bilim: "+miss+" ta nom qoldi");

writeGroups(DIR, items, meta, { part: 4000, top: 8000 });
const pend = ids.filter(id => !meta[id] && !GONE.has(id)).map(id => items.get(id));
saveState(DIR, { gen: GEN, round: st.round, ts: new Date().toISOString(), done: [...done], pend, total: named });
