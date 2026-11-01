// Bosh ro'yxat fayllarini (assets/catalog/<til>.json, life/<til>.json, bilim/<til>.json) saqlangan ma'lumotdan qayta tuzish.
// Wikidata'ga so'rov yubormaydi. Ishga tushirish: node scripts/reindex.mjs
import { readdirSync } from "node:fs";
import { LANGS, EN, readJSON, writeJSON, unpackMeta, packMeta, loadGroups, writeGroups } from "./lib.mjs";
const D = "assets/catalog";
for(const dir of [D+"/life", D+"/bilim"]){ const { items, meta } = loadGroups(dir); writeGroups(dir, items, meta, { part: 4000, top: 8000 }); }
// joylar: har davlatdan eng mashhurlari (build-catalog.mjs dagi TOP bilan bir xil)
const POP = new Set(["UZ","KZ","KG","TJ","TM","TR","AE","SA","AZ","GE","AM","RU","CN","JP","KR","IN","TH","VN","ID","MY","SG","PH","NP","LK","MV","PK","IR","JO","OM","QA","MN","KH","LA","BT","EG","MA","TN","ZA","KE","TZ","FR","IT","ES","DE","GB","PT","GR","NL","CH","AT","CZ","PL","HU","HR","NO","SE","FI","DK","IS","IE","BE","UA","US","CA","MX","CU","BR","AR","PE","CL","CO","EC","BO","AU","NZ"]);
const BIG = new Set(["FR","IT","ES","DE","GB","US","RU","CN","JP","IN","PL","CZ","AT","CH","NL","BE","PT","GR","SE","NO","FI","DK","CA","BR","MX","AU","UA","HU","TR","IR"]);
const TOP = iso => POP.has(iso) ? (BIG.has(iso) ? 120 : 80) : 20;
const old = readJSON(D+"/en.json"), countries = old.countries;
const byC = {};
for(const [iso] of countries){ const d = readJSON(`${D}/c/${iso}.json`); if(d) byC[iso] = d.items.slice(0, TOP(iso)*2); }
for(const [li, lang] of LANGS.entries()){
  const out = [];
  for(const [iso, list] of Object.entries(byC)){ let n = 0;
    for(const [id, file, lat, lon, cls, sl, reg, l, de, w] of list){ if(n >= TOP(iso)) break;
      const m = unpackMeta(l, de, w), label = m.l[li] || m.l[EN] || m.l.find(Boolean); if(!label) continue;
      out.push([id, label, m.w[EN], lang==="en" ? "" : m.w[li], packMeta(m)[1][li] || "", file, lat, lon, cls, sl, iso, reg]); n++; } }
  writeJSON(`${D}/${lang}.json`, { ...old, items: out });
  console.log(lang, "bosh ro'yxat:", out.length);
}
