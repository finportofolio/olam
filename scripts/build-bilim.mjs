// OLAM Bilim — insonlar, texnika va internet katalogi (GitHub Actions'da ishlaydi).
// Wikidata'dan har guruhning mashhur (Wikipedia'da maqolasi, rasmi yoki logosi bor) elementlari.
// Har bir kasb / tur alohida so'raladi; oldingi natija saqlanadi, vaqt tugasa davomi keyingi ishda.
// Natija: assets/catalog/bilim/<til>.json (bosh ro'yxat) va assets/catalog/bilim/g/<guruh>[.N].json (9 tilda)
import { sparql, qidOfUri, fileOf, fetchMeta, GONE, loadGroups, writeGroups, loadState, saveState, readJSON, more, elapsed, mins, sleep, hash, BUDGET } from "./lib.mjs";
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
// texnika va internet: bir nechta muqobil nom yoki aniq QID ("|" bilan) — birinchisi topilgani olinadi
const THINGS = {
  car: [["Q3231690|automobile model|car model",40000,1],["motorcycle model",10000,1],["truck model",8000,1],["bus model",5000,1],["concept car",4000,1],["tractor model",3000,1],["locomotive class|class of locomotive",4000,2],["ship class",4000,2],["tank model|tank class",2000,1]],
  air: [["aircraft model|aircraft family",20000,1],["launch vehicle",5000,1],["rocket family|rocket model",2000,1],["spacecraft",8000,1],["space probe",4000,1],["space station",500,1],["artificial satellite",10000,2],["rocket engine",3000,1],["space telescope",500,1],["rover",500,1],["helicopter model|rotorcraft model",4000,1],["airliner",3000,1],["unmanned aerial vehicle model|drone model",2000,1]],
  dev: [["smartphone model",15000,1],["mobile phone model|mobile phone|feature phone",10000,1],["video game console|home video game console",3000,1],["handheld game console",1500,1],["robot",4000,1],["humanoid robot",800,1],["tablet computer model|tablet computer",4000,1],["personal computer model|computer model|personal computer",6000,1],["laptop model|laptop",4000,1],["smartwatch model|smartwatch",2000,1],["digital camera model|camera model",6000,1],["microprocessor|microprocessor model",5000,1],["home computer",3000,1],["graphics processing unit|graphics card",2000,1],["virtual reality headset",500,1]],
  web: [["website",30000,2],["social networking service",4000,1],["search engine",3000,1],["online marketplace",4000,1],["video hosting service|video sharing platform|online video platform",3000,1],["streaming service|video on demand service|music streaming service",4000,1],["online encyclopedia",2000,1],["news website",8000,2],["web portal",6000,2],["online service",6000,1],["wiki",3000,2],["cryptocurrency",4000,1],["online database",4000,3],["e-commerce|online shop",3000,2],["webcomic",2000,3],["podcast",3000,3]],
  ai: [["chatbot",3000,1],["large language model",3000,1],["virtual assistant|intelligent personal assistant",2000,1],["text-to-image model",800,1],["generative artificial intelligence",800,1],["language model",2000,1],["foundation model",800,1],["text-to-video model",500,1],["machine learning model",2000,1],["artificial intelligence|artificial intelligence software",1000,1],["AI agent|intelligent agent",500,1],["generative pre-trained transformer",500,1],["multimodal large language model",500,1],["artificial neural network",2000,2]],
  app: [["mobile app|mobile application",12000,1],["instant messaging client|instant messaging software",3000,1],["web application",6000,1],["operating system",8000,1],["web browser",3000,1],["messaging app",2000,1],["video game",20000,4],["mobile game",8000,2],["email client",1500,1],["media player|media player software",2000,1],["office suite",800,1],["antivirus software",800,1],["programming language",8000,2],["video editing software",800,1],["free software",8000,3],["application software",6000,3],["social media app|social networking app",2000,1],["payment system|mobile payment",2000,1]]
};
const GEN = "bilim4-" + hash(JSON.stringify([PEOPLE, THINGS]));
const st = loadState(DIR, GEN);
console.log("avlod:", GEN, "aylanish:", st.round, "bajarilgan so'rovlar:", st.done.length);
const { items, meta } = loadGroups(DIR);
for(const r of st.pend) if(!items.has(r[0])) items.set(r[0], r);
const done = new Set(st.done);

const QC = {};
// null — Wikidata'da yo'q; undefined — so'rov xato (keyingi ishda qayta urinadi). "a|b|c" — muqobillar.
async function qidOf(label, type){
  for(const alt of label.split("|")){
    if(/^Q\d+$/.test(alt)) return alt; const k = alt+"|"+(type||""); if(QC[k] === undefined){
      try{ const b = await sparql(`SELECT ?c ?s WHERE { ?c rdfs:label "${alt}"@en ; wikibase:sitelinks ?s . ${type ? `?c wdt:P31/wdt:P279* wd:${type} .` : ""} } ORDER BY DESC(?s) LIMIT 1`); QC[k] = qidOfUri(b[0]?.c?.value) || null; }catch(e){ return undefined; } }
    if(QC[k]) return QC[k]; }
  console.log("topilmadi:", label); return null; }

function take(b, grp, lim, noImg, famous){ let n = 0;
  for(const r of b){ const id = qidOfUri(r.item.value);
    let file = fileOf(r.img?.value || r.logo?.value); if(/\.(webm|ogv|pdf|tif|tiff|djvu)$/i.test(file)) file = "";
    if(!file && !noImg && !(famous && +r.sl.value >= famous)) continue;
    const old = items.get(id); if(old){ old[3] = +r.sl.value; if(!old[2] && file){ old[2] = file; old[4] = r.img ? 0 : 1; } continue; }
    items.set(id, [id, grp, file, +r.sl.value, file && !r.img ? 1 : 0]); if(++n >= lim) break; }
  return n; }
// natija: 0 — xato, 1 — to'liq, 2 — chala (chegaraga yetdi yoki faqat yuqoriroq min. bilan chiqdi) → davlatlarga bo'lish mumkin
async function collect(key, grp, cond, lim, min, { logo = false, noImg = false, famous = 0 } = {}){
  if(done.has(key)) return 1;
  for(const m of [min, min*2, min*4, min*8]){
    const L = Math.round(lim*1.5);
    const q = `SELECT ?item ?img ?logo ?sl WHERE { ${cond} ?item wikibase:sitelinks ?sl . FILTER(?sl >= ${m}) OPTIONAL { ?item wdt:P18 ?img } ${logo ? "OPTIONAL { ?item wdt:P154 ?logo }" : ""} ${noImg ? "" : `FILTER(BOUND(?img)${logo ? " || BOUND(?logo)" : ""}${famous ? ` || ?sl >= ${famous}` : ""})`} } ORDER BY DESC(?sl) LIMIT ${L}`;
    try{ const b = await sparql(q); const n = take(b, grp, lim, noImg, famous); console.log(mins()+"m", key, "min", m, "→", b.length, "qator, yangi", n); done.add(key); return (m > min || b.length >= L) ? 2 : 1; }
    catch(e){ console.log("  qayta urinish", key, "min", m*2, "—", e.message.slice(0,60)); await sleep(2000); }
  }
  return 0; }
// davlatlar (joylar katalogidan): kasb bo'yicha so'rov og'ir bo'lsa — har davlat alohida
const COUNTRIES = (readJSON("assets/catalog/en.json")?.countries || []).map(c => c[1]).filter(Boolean);
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
const split = st.split || [];   // [kalit, guruh, kasb QID, min, davlat] — holatda saqlanadi
const splitKeys = new Set(split.map(x => x[0]));
for(const [grp, label, lim, min, kind] of labelTasks){
  const key = grp+":"+label.split("|")[0];
  if(done.has(key)) continue;
  if(elapsed() > BUDGET*0.7){ stopped = true; break; }
  const q = await qidOf(label); if(q === undefined){ failed++; continue; } if(!q){ done.add(key); continue; }
  const cond = kind === "occ" ? `?item wdt:P106 wd:${q} ; wdt:P31 wd:Q5 .` : `?item wdt:P31 wd:${q} .`;
  const r = await collect(key, grp, cond, lim, min, { logo: ["web","ai","app"].includes(grp), famous: kind === "occ" ? 25 : 5 });
  if(!r) failed++;
  // chala yoki xato bo'lgan kasb → davlatlar bo'yicha
  if(kind === "occ" && r !== 1 && COUNTRIES.length){ done.add(key); if(!r) failed--;
    for(const c of COUNTRIES){ const k = key+"@"+c; if(!splitKeys.has(k)){ splitKeys.add(k); split.push([k, grp, q, min, c]); } } }
  await sleep(300);
}
const SPLIT_LIM = 4000;
for(const [key, grp, q, min, c] of split){
  if(done.has(key)) continue;
  if(elapsed() > BUDGET*0.7){ stopped = true; break; }
  if(!await collect(key, grp, `?item wdt:P106 wd:${q} ; wdt:P27 wd:${c} ; wdt:P31 wd:Q5 .`, SPLIT_LIM, min, { famous: 25 })) failed++;
  await sleep(150);
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
saveState(DIR, { gen: GEN, round: st.round, ts: new Date().toISOString(), done: [...done], split, pend, total: named });
