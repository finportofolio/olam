const SITE=document.body.classList.contains("site");
const clean = s=>String(s).replace(/^[^\p{L}\p{N}]+/u,"").trim();
const EMO=/[\u{1F000}-\u{1FAFF}\u{2600}-\u{2604}\u{2606}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{20E3}]/gu;
const deEmo=x=>String(x).replace(EMO,"").replace(/[ \t]{2,}/g," ").replace(/^\s+|\s+$/g,"");
(function sweep(o){ for(const k in o){ const v=o[k]; if(typeof v==="string") o[k]=deEmo(v); else if(v&&typeof v==="object") sweep(v); } })(I18N);
const SV=(d,c="")=>`<svg class="ic ${c}" viewBox="0 0 24 24">${d}</svg>`;
const CATI={taom:'<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2.2 1.6-3 4.6-3 8h3"/>',
 dam:'<path d="M2 19c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M8 15V5.5a2 2 0 0 1 4 0M14 15V5.5a2 2 0 0 1 4 0M8 9h6M8 12.5h6"/>',
 islom:'<path d="M19.5 14.5A8 8 0 1 1 9.5 4.5a6.3 6.3 0 0 0 10 10z"/><path d="m17 4 .7 1.6L19.3 6l-1.6.7L17 8.3l-.7-1.6L14.7 6l1.6-.4z"/>',
 tog:'<path d="m2 20 7-12 4 6 2.5-3.5L22 20z"/><path d="m7.5 10.5 1.5 1 1.5-1"/>',
 dengiz:'<circle cx="12" cy="7" r="3"/><path d="M2 14c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M2 19c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/>',
 sharshara:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
 tarix:'<path d="M3 21h18M4 10h16M12 3l8 5H4zM6 10v8M10 10v8M14 10v8M18 10v8M4 18h16"/>',
 shahar:'<path d="M3 21h18M5 21V9l6-3v15M11 21V3l8 4v14M8 11v.01M8 15v.01M15 10v.01M15 14v.01M15 18v.01"/>',
 tabiat:'<path d="M12 22v-5M12 2l6 8h-3l4 6H5l4-6H6z"/>',
 qor:'<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 2.5L15 4M9 20l3-2.5 3 2.5"/>',
 sahro:'<circle cx="15" cy="8" r="3"/><path d="M2 20c3-4 7-5 10-3s6 1 10-2M2 20h20"/>',
 zamon:'<path d="M8 21V7l4-4 4 4v14M5 21h14M11 9h2M11 13h2M11 17h2"/>',
 kosmos:'<path d="M12 2c3 2.2 5 6 5 10l-2 4H9l-2-4c0-4 2-7.8 5-10z"/><circle cx="12" cy="10" r="2"/><path d="m9 16-2 5 3.5-1.5M15 16l2 5-3.5-1.5"/>',
 stadion:'<ellipse cx="12" cy="10" rx="9" ry="5"/><path d="M3 10v4c0 2.8 4 5 9 5s9-2.2 9-5v-4M12 5v10"/>',
 zoo:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="5.5" r="2"/><circle cx="14" cy="5.5" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 11c-3 0-5.5 3.5-5.5 6a2.5 2.5 0 0 0 3 2.4c1.6-.4 3.4-.4 5 0a2.5 2.5 0 0 0 3-2.4c0-2.5-2.5-6-5.5-6z"/>',
 muzey:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m3 16 5-5 4 4 3-3 6 6"/><circle cx="16" cy="9" r="1.5"/>',
 kutub:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
 ibodat:'<path d="M4 21h16M6 21v-7h12v7M6 14a6 6 0 0 1 12 0M12 8V4M10.5 5.5h3M10 21v-3a2 2 0 0 1 4 0v3"/>',
 saroy:'<path d="M3 21h18M5 21V8h2.5v2.5H10V8h4v2.5h2.5V8H19v13M10 21v-4a2 2 0 0 1 4 0v4"/>',
 park:'<path d="M12 22v-6M7 16a5 5 0 1 1 10 0zM4 22h16"/>',
 wonder:'<path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'};
const catIcon=k=>CATI[k]?SV(CATI[k]):"";
const PIN=SV('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',"pin");
const STAR=SV('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',"st");
const PAL2=[["#1d4e89","#a9d6ff"],["#0077b6","#90e0ef"],["#2d6a4f","#b7e4c7"],["#7f5539","#e6ccb2"],["#5e81ac","#e5e9f0"],["#9c2c00","#f4a261"]];
const PLACES = DATA.P.map(a=>({id:a[0],t:a[1],q:a[2],n:a[3],c:a[4],reg:a[5],tags:a[6].split(" "),best:a[7],s:a[8],g:a[9],lat:DATA.GEO[a[0]]?.[0],lon:DATA.GEO[a[0]]?.[1],cc:DATA.CC[a[0]],nt:DATA.NT[a[0]]}));
const IDX={}; PLACES.forEach(p=>IDX[p.id]=p);
const ISLOM=["registan","kalon","itchan","shahizinda","gur","sheikhzayed","hagiasophia","bibikhanym","hastimam","minor","naqshband","masjidharam","masjidnabawi","bluemosque","hassan2","nasirolmolk","naqshejahan","faisal","kulsharif","domerock","alhambra","taj","shahrisabz","ark","khudayar","termez","amirtemurmuseum","topkapi"];
ISLOM.forEach(id=>{ if(IDX[id]&&!IDX[id].tags.includes("islom")) IDX[id].tags.push("islom"); });
const byId = id=>IDX[id];
const IMG=DATA.IMG, VID=DATA.VID, DESC=DATA.DESC, WONDERS=DATA.WONDERS;
const TAGS=["taom","dam","islom","tog","dengiz","sharshara","tarix","shahar","tabiat","qor","sahro","zamon","kosmos","stadion","zoo","muzey","kutub","ibodat","saroy","park"];
const NEWCATS=["taom","dam","islom","stadion","zoo","muzey","kutub","kosmos","zamon","ibodat","saroy","park"];
const REGS=["uz","osiyo","yevropa","amerika","afrika","okeaniya"];
const COUNTRIES={UZ:[41.3,69.28],KZ:[43.24,76.89],KG:[42.87,74.6],TJ:[38.56,68.78],TM:[37.95,58.38],AF:[34.53,69.17],AZ:[40.41,49.87],RU:[55.75,37.62],TR:[41.0,28.97],AE:[25.2,55.27],SA:[24.71,46.68],CN:[39.9,116.4],IN:[28.61,77.2],KR:[37.57,126.98],DE:[52.52,13.4],GB:[51.5,-0.12],US:[40.71,-74.0],OTHER:[41.3,69.28]};
const OLDC={"O'zbekiston":"UZ","Qozog'iston":"KZ","Qirg'iziston":"KG","Tojikiston":"TJ","Turkmaniston":"TM","Rossiya":"RU","Turkiya":"TR","AQSh":"US","Boshqa":"OTHER"};
const UZC={UZ:"O'zbekiston",KZ:"Qozog'iston",KG:"Qirg'iziston",TJ:"Tojikiston",TM:"Turkmaniston",AF:"Afg'oniston",AZ:"Ozarbayjon",RU:"Rossiya",TR:"Turkiya",AE:"BAA",SA:"Saudiya Arabistoni",CN:"Xitoy",IN:"Hindiston",KR:"Janubiy Koreya",DE:"Germaniya",GB:"Buyuk Britaniya",US:"AQSh"};
let DN=null; function cname(code){ if(code==="OTHER") return t("other");
  if(LANG==="uz"||LANG==="uzk"){ const s=UZC[code]; if(s) return LANG==="uzk"?cyr(s):s; }
  try{ if(!DN||DN._l!==LANG){ DN=new Intl.DisplayNames([LOC[LANG],"en"],{type:"region"}); DN._l=LANG; } const fix={HK:"HK",PS:"PS",AQ:"AQ"}; return DN.of(code)||code; }catch(e){ return UZC[code]||code; } }

/* ================= LOKALIZATSIYA (joy nomlari, shiorlar, tavsiflar) ================= */
let LZ = {};   // {id:{n,d,s}}
function lzLoad(){ LZ = (LANG==="uz"||LANG==="uzk")?{}:ls.get("olam_lz_"+LANG,{}); }
lzLoad();
const pN = p=>{ if(LANG==="uz") return p.n; if(LANG==="uzk") return cyr(p.n); if(p.dyn) return p.n; return LZ[p.id]?.n || (p.nt||p.t.replace(/_/g," ")).replace(/\s*\(.*?\)\s*/g,"").trim(); };
const pC = p=>{ if(LANG==="uz") return p.c; if(LANG==="uzk") return cyr(p.c); if(p.dyn) return p.c; return (p.cc||"").split("/").map(cname).join(" / ")||p.c; };
const pCountry = p=>{ if(LANG==="uz"||LANG==="uzk"){ const s=p.c.split(",").pop().trim(); return LANG==="uzk"?cyr(s):s; } return pC(p); };
const pS = p=>{ if(LANG==="uz") return p.s; if(LANG==="uzk") return cyr(p.s); if(p.dyn) return p.s; return LZ[p.id]?.s || LZ[p.id]?.d || ""; };
const pDesc = p=>{ if(p.dyn) return p.desc||""; if(LANG==="uz") return DESC[p.id]||""; if(LANG==="uzk") return cyr(DESC[p.id]||""); return LZ[p.id]?.x || ""; };
const WAPI="https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1";
async function wikiNames(){
  if(LANG==="uz"||LANG==="uzk") return;
  const lang=LANG, need=PLACES.filter(p=>!p.dyn&&!(LZ[p.id]?.n)); if(!need.length&&PLACES.every(p=>p.dyn||LZ[p.id]?.d!==undefined)) return;
  for(let i=0;i<need.length;i+=50){
    const ch=need.slice(i,i+50), titles=ch.map(p=>(p.nt||p.t).replace(/_/g," "));
    try{
      const ll = lang==="en"?"":"&prop=langlinks&lllang="+WL(lang)+"&lllimit=500";
      const d=(await (await fetch(WAPI+ll+"&titles="+encodeURIComponent(titles.join("|")))).json()).query||{};
      const nm={}; (d.normalized||[]).forEach(x=>nm[x.from]=x.to); const rd={}; (d.redirects||[]).forEach(x=>rd[x.from]=x.to);
      const pg={}; Object.values(d.pages||{}).forEach(x=>pg[x.title]=x);
      ch.forEach((p,j)=>{ let k=titles[j]; k=nm[k]||k; k=rd[k]||k; const x=pg[k]; LZ[p.id]=LZ[p.id]||{};
        if(lang==="en") LZ[p.id].n=k.replace(/\s*\(.*?\)\s*/g,"").trim();
        else { const l=x?.langlinks?.[0]?.["*"]; if(l) LZ[p.id].n=l.replace(/\s*\(.*?\)\s*/g,"").trim(); LZ[p.id].lt=l||""; } });
    }catch(e){}
    if(lang!==LANG) return;
    ls.set("olam_lz_"+LANG,LZ); refresh();
  }
  // mahalliy Wikipedia qisqa tavsiflari (shior yo'q bo'lsa)
  const host=`https://${WL(lang)==="zh"?"zh":WL(lang)}.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=description${lang==="zh"?"&variant=zh-cn":""}&titles=`;
  const need2=PLACES.filter(p=>!p.dyn&&LZ[p.id]&&LZ[p.id].d===undefined);
  for(let i=0;i<need2.length;i+=50){
    const ch=need2.slice(i,i+50); const tt=ch.map(p=>lang==="en"?(p.nt||p.t).replace(/_/g," "):(LZ[p.id].lt||"")).map(x=>x||"-");
    try{ const d=(await (await fetch(host+encodeURIComponent(tt.join("|")))).json()).query||{};
      const nm={}; (d.normalized||[]).forEach(x=>nm[x.from]=x.to); const rd={}; (d.redirects||[]).forEach(x=>rd[x.from]=x.to);
      const pg={}; Object.values(d.pages||{}).forEach(x=>pg[x.title]=x);
      ch.forEach((p,j)=>{ let k=tt[j]; k=nm[k]||k; k=rd[k]||k; const ds=pg[k]?.description||""; LZ[p.id].d=ds?ds.charAt(0).toUpperCase()+ds.slice(1)+".":""; });
    }catch(e){}
    if(lang!==LANG) return; ls.set("olam_lz_"+LANG,LZ); refresh();
  }
}
/* AI bilan shiorlarni tarjima qilish (bir marta, keyin keshda) */
let TRP=null;
async function aiTaglines(){
  if(LANG==="uz"||LANG==="uzk"||TRP) return; const lang=LANG;
  const need=PLACES.filter(p=>!p.dyn&&!LZ[p.id]?.s); if(!need.length) return;
  TRP=true;
  const chunks=[]; for(let i=0;i<need.length;i+=60) chunks.push(need.slice(i,i+60));
  await Promise.all(chunks.map(async ch=>{ const items={}; ch.forEach(p=>items[p.id]=p.s);
    try{ const r=await fetch(GID_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({mode:"tr",lang,items})});
      const o=(await r.json()).items||{}; if(lang!==LANG) return;
      Object.entries(o).forEach(([id,s])=>{ if(IDX[id]&&typeof s==="string"&&s.trim()){ LZ[id]=LZ[id]||{}; LZ[id].s=s.trim(); } });
      ls.set("olam_lz_"+LANG,LZ); refresh();
    }catch(e){} }));
  TRP=null;
}
async function aiTranslate(text){
  const r=await fetch(GID_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({mode:"tr",lang:LANG,items:{x:text}})});
  return ((await r.json()).items||{}).x||"";
}

/* ================= MEDIA ================= */
const CAPI="https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=url&iiurlwidth=1280&pageids=";
const CTH={};
async function commonsUrls(ids){
  const need=ids.filter(id=>!CTH[id]);
  for(let i=0;i<need.length;i+=50){ try{ const d=await (await fetch(CAPI+need.slice(i,i+50).join("|"))).json(); Object.values(d.query?.pages||{}).forEach(pg=>{ const ii=pg.imageinfo?.[0]; if(ii) CTH[pg.pageid]=ii.thumburl||ii.url; }); }catch(e){} }
  return ids.map(id=>CTH[id]).filter(Boolean);
}
const pexels = st=>{ const [id,f]=st.split("/"); return `https://videos.pexels.com/video-files/${id}/${f.replace("@",id)}.mp4`; };
const BADIMG=/logo|map|plan\b|flag|coat_of|seal|sign|stamp|scheme|diagram|satellite|satview|nasa|esa\d|location|route|montage|collage|locator|emblem/i;
async function loadHeroes(){
  await commonsUrls(PLACES.map(p=>IMG[p.id]?.[0]).filter(Boolean));
  PLACES.forEach(p=>{ const u=CTH[IMG[p.id]?.[0]]; if(u){ p.img=u.replace("/1280px-","/960px-"); p.hq=1; } });
  applyUI(); refresh();
}

/* ===== Musiqa: minus (Mixkit) + o'z qo'shiqlaringiz (telefondan) ===== */
const MUSIC=[[443,"Serene View"],[839,"Tears of Joy"],[963,"Just Keep Walking"],[607,"Forest Walk"],[953,"Feel Alive"],[617,"Wind Leaves"],[1087,"A Special Feeling"],[94,"Traveling Along"],[13,"Summer Fun"],[1025,"Easy Monday"]];
const BGM=new Audio(); BGM.preload="none"; BGM.volume=0.55;
const M={i:Math.floor(Math.random()*MUSIC.length),playing:false,q:[],url:null,name:""};
BGM.onended=()=>mNext(); BGM.onerror=()=>{ if(M.playing){ M.i++; setTimeout(()=>{ mTrack(); BGM.play().catch(()=>{}); },800); } };
let MDB=null;
function idb(){ return new Promise((res,rej)=>{ if(MDB) return res(MDB); const r=indexedDB.open("olam",2); r.onupgradeneeded=()=>{ const d=r.result; if(!d.objectStoreNames.contains("songs")) d.createObjectStore("songs",{keyPath:"id"}); if(!d.objectStoreNames.contains("kv")) d.createObjectStore("kv",{keyPath:"k"}); }; r.onsuccess=()=>{ MDB=r.result; res(MDB); }; r.onerror=()=>rej(r.error); }); }
async function songsAll(){ try{ const db=await idb(); return await new Promise(res=>{ const q=db.transaction("songs").objectStore("songs").getAll(); q.onsuccess=()=>res(q.result||[]); q.onerror=()=>res([]); }); }catch(e){ return []; } }
async function songAdd(files){ try{ const db=await idb(); const tx=db.transaction("songs","readwrite"); [...files].forEach((f,i)=>tx.objectStore("songs").put({id:"s"+Date.now()+i,name:f.name.replace(/\.[^.]+$/,""),blob:f})); await new Promise(r=>{ tx.oncomplete=r; tx.onerror=r; }); }catch(e){} await mQueue(); }
async function songDel(id){ try{ const db=await idb(); const tx=db.transaction("songs","readwrite"); tx.objectStore("songs").delete(id); await new Promise(r=>{ tx.oncomplete=r; tx.onerror=r; }); }catch(e){} await mQueue(); }
async function mQueue(){ const mine=(await songsAll()).map(x=>({k:"s",id:x.id,name:x.name,blob:x.blob})); const minus=MUSIC.map(x=>({k:"m",id:x[0],name:x[1]}));
  M.q=SET.mlist==="mine"&&mine.length?mine:SET.mlist==="mix"&&mine.length?[...minus,...mine].sort(()=>Math.random()-.5):minus; M.mine=mine; }
function mTrack(){ if(!M.q.length) M.q=MUSIC.map(x=>({k:"m",id:x[0],name:x[1]})); const x=M.q[M.i%M.q.length]; if(M.url){ URL.revokeObjectURL(M.url); M.url=null; }
  if(x.k==="s"){ M.url=URL.createObjectURL(x.blob); BGM.src=M.url; } else BGM.src=`https://assets.mixkit.co/music/${x.id}/${x.id}.mp3`; M.name=x.name; M.cur=x.id; return x.name; }
function mPlay(){ if(!SET.music) return; if(!BGM.src) mTrack(); BGM.play().then(()=>{ M.playing=true; mBtn(); }).catch(()=>{}); }
function mPause(){ BGM.pause(); M.playing=false; mBtn(); }
function mNext(){ M.i++; const n=mTrack(); if(SET.music) BGM.play().then(()=>{ M.playing=true; toast(n); mPanel(); }).catch(()=>{}); }
function mPick(id){ const i=M.q.findIndex(x=>String(x.id)===String(id)); if(i<0) return; M.i=i; SET.music=true; saveSet(); mTrack(); BGM.play().then(()=>{ M.playing=true; mBtn(); }).catch(()=>{}); mPanel(); }
function mToggle(){ SET.music=!SET.music; saveSet(); if(SET.music){ mPlay(); toast(M.name||MUSIC[M.i%MUSIC.length][1]); } else mPause(); mBtn(); mPanel(); }
function mBtn(){ const b=$("#wm"); if(b){ b.innerHTML=SET.music?ICON.music:ICON.mute; b.classList.toggle("on",SET.music); } }
async function mSrc(v){ SET.mlist=v; saveSet(); await mQueue(); M.i=0; if(SET.music){ mTrack(); BGM.play().catch(()=>{}); } mPanel(); }
function openMusic(){ if(cur==="watch"&&!W.paused) wPause(); $("#sh").classList.add("on"); $("#sh").dataset.k="music"; mQueue().then(mPanel); }
function mPanel(){ const S=$("#sh"); if(!S||!S.classList.contains("on")||S.dataset.k!=="music") return; const mine=M.mine||[];
  const row=(x,k)=>`<div class="trk ${String(M.cur)===String(x.id)&&M.playing?"on":""}"><span>${ICON.music} ${esc(x.name)}</span><button onclick="mPick('${x.id}')">${t("m_play")}</button>${k==="s"?`<button onclick="songDel('${x.id}').then(mPanel)">✕</button>`:""}</div>`;
  S.innerHTML=`<div class="shb" onclick="event.stopPropagation()"><div class="shh"><b>${t("music_h")}</b><button class="x" onclick="closeSheet()">${ICON.down}</button></div>
   <div class="shl"><div class="seg" style="margin-bottom:10px"><button class="${SET.music?"on":""}" onclick="mToggle()">${t("on")}</button><button class="${SET.music?"":"on"}" onclick="SET.music&&mToggle()">${t("off")}</button></div>
   <div class="sl">${t("m_src")}</div>${seg("mlist",[["minus",t("m_minus")],["mine",t("m_mine")],["mix",t("m_mix")]]).replace(/setOpt\('mlist',/g,"mSrc(")}
   <div class="sl" style="margin-top:14px">${t("m_mine")}</div>
   <label class="pill o2 wide" style="margin-bottom:8px">${t("m_add")}<input type="file" accept="audio/*" multiple hidden onchange="songAdd(this.files).then(mPanel)"></label>
   ${mine.length?mine.map(x=>row(x,"s")).join(""):`<p class="sp">${t("m_empty")}</p>`}
   <div class="sl" style="margin-top:14px">${t("m_minus")}</div>${MUSIC.map(x=>row({id:x[0],name:x[1]},"m")).join("")}
   <p class="sp" style="margin-top:10px">${t("m_note")}</p></div></div>`; }
function closeSheet(){ $("#sh").classList.remove("on"); }

/* ===== Ovozli gid (telefon ovozi bilan o'qish) ===== */
const TTSL={uz:"uz-UZ",uzk:"uz-UZ",ru:"ru-RU",en:"en-US",tr:"tr-TR",kk:"kk-KZ",ky:"ky-KG",tg:"tg-TJ",ar:"ar-SA",zh:"zh-CN"};
let TTSWARN=false;
function speak(text,btn){
  if(!("speechSynthesis" in window)){ toast(t("tts_no")); return; }
  const S=speechSynthesis; if(S.speaking||S.pending){ S.cancel(); document.querySelectorAll(".spk.on").forEach(b=>b.classList.remove("on")); if(btn&&btn.dataset.sp==="1"){ btn.dataset.sp=""; return; } }
  const lc=TTSL[LANG]||"en-US"; const vs=S.getVoices(); const two=lc.slice(0,2);
  let v=vs.find(x=>x.lang.replace("_","-").toLowerCase()===lc.toLowerCase())||vs.find(x=>x.lang.toLowerCase().startsWith(two));
  const u=new SpeechSynthesisUtterance(String(text).replace(/[*#_]/g,"").slice(0,3000));
  if(!v&&vs.length){ v=(LANG==="uz")?(vs.find(x=>/^tr/i.test(x.lang))||vs.find(x=>/^ru/i.test(x.lang))):(vs.find(x=>/^ru/i.test(x.lang))||vs.find(x=>/^tr/i.test(x.lang))); if(!TTSWARN){ TTSWARN=true; toast(t("tts_fb")); } }
  if(v){ u.voice=v; u.lang=v.lang; } else u.lang=lc;
  u.rate=0.95; const vol=BGM.volume; BGM.volume=0.15; AMB.g&&(AMB.g.gain.value=0.08);
  u.onend=u.onerror=()=>{ BGM.volume=vol; AMB.g&&(AMB.g.gain.value=0.3); if(btn){ btn.classList.remove("on"); btn.dataset.sp=""; } };
  if(btn){ btn.classList.add("on"); btn.dataset.sp="1"; }
  S.speak(u);
}
try{ speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged=()=>speechSynthesis.getVoices(); }catch(e){}

/* ===== Tabiat ovozlari (Web Audio — internet kerak emas) ===== */
const AMB={ctx:null,nodes:[],kind:null,g:null,iv:null};
function ambKind(p){ const tg=p?.tags||[]; if(tg.includes("dengiz")) return "waves"; if(tg.includes("sharshara")) return "water"; if(tg.some(x=>["tog","qor","sahro"].includes(x))) return "wind";
  if(tg.some(x=>["tabiat","zoo","park"].includes(x))) return "forest"; if(tg.some(x=>["shahar","zamon","stadion"].includes(x))) return "city"; return "calm"; }
function ambNoise(C,brown){ const len=C.sampleRate*4, buf=C.createBuffer(1,len,C.sampleRate), d=buf.getChannelData(0); let last=0;
  for(let i=0;i<len;i++){ const w=Math.random()*2-1; if(brown){ last=(last+0.02*w)/1.02; d[i]=last*3.5; } else d[i]=w*0.6; } const s=C.createBufferSource(); s.buffer=buf; s.loop=true; return s; }
function ambStop(){ clearInterval(AMB.iv); AMB.iv=null; const C=AMB.ctx, old=AMB.nodes, g=AMB.g; AMB.nodes=[]; AMB.kind=null; AMB.g=null;
  if(C&&g){ try{ g.gain.cancelScheduledValues(C.currentTime); g.gain.setValueAtTime(g.gain.value,C.currentTime); g.gain.linearRampToValueAtTime(0,C.currentTime+0.8); }catch(e){} setTimeout(()=>old.forEach(n=>{ try{ n.stop(); }catch(e){} }),900); } }
function ambStart(kind){
  if(!SET.amb||!kind){ ambStop(); return; } if(AMB.kind===kind) return; ambStop();
  try{ const C=AMB.ctx||(AMB.ctx=new (window.AudioContext||window.webkitAudioContext)()); if(C.state==="suspended") C.resume();
    const g=C.createGain(); g.gain.value=0; g.connect(C.destination); g.gain.linearRampToValueAtTime(0.3,C.currentTime+1.5); AMB.g=g; AMB.kind=kind;
    const add=n=>{ AMB.nodes.push(n); return n; };
    const flt=(type,f,q)=>{ const x=C.createBiquadFilter(); x.type=type; x.frequency.value=f; if(q) x.Q.value=q; return x; };
    const lfo=(hz,amt,target)=>{ const o=add(C.createOscillator()); o.frequency.value=hz; const a=C.createGain(); a.gain.value=amt; o.connect(a); a.connect(target); o.start(); };
    if(kind==="waves"){ const n=add(ambNoise(C,true)), f=flt("lowpass",700), lg=C.createGain(); lg.gain.value=0.55; n.connect(f); f.connect(lg); lg.connect(g); lfo(0.11,0.45,lg.gain); n.start();
      const n2=add(ambNoise(C,false)), f2=flt("highpass",2500), g2=C.createGain(); g2.gain.value=0.04; n2.connect(f2); f2.connect(g2); g2.connect(g); lfo(0.11,0.035,g2.gain); n2.start(); }
    else if(kind==="water"){ const n=add(ambNoise(C,false)), f=flt("bandpass",1100,0.5), lg=C.createGain(); lg.gain.value=0.35; n.connect(f); f.connect(lg); lg.connect(g); n.start(); const n2=add(ambNoise(C,true)); n2.connect(g); n2.start(); }
    else if(kind==="wind"){ const n=add(ambNoise(C,true)), f=flt("bandpass",420,1.2), lg=C.createGain(); lg.gain.value=0.9; n.connect(f); f.connect(lg); lg.connect(g); lfo(0.07,260,f.frequency); lfo(0.05,0.35,lg.gain); n.start(); }
    else if(kind==="city"){ const n=add(ambNoise(C,true)), f=flt("lowpass",320), lg=C.createGain(); lg.gain.value=0.7; n.connect(f); f.connect(lg); lg.connect(g); lfo(0.03,0.2,lg.gain); n.start(); }
    else { const n=add(ambNoise(C,true)), f=flt("lowpass",kind==="forest"?900:500), lg=C.createGain(); lg.gain.value=kind==="forest"?0.35:0.25; n.connect(f); f.connect(lg); lg.connect(g); lfo(0.06,0.15,lg.gain); n.start(); }
    if(kind==="forest"){ const chirp=()=>{ if(!AMB.g) return; const o=C.createOscillator(), gg=C.createGain(), t0=C.currentTime, f0=2400+Math.random()*2200; o.type="sine";
        o.frequency.setValueAtTime(f0,t0); o.frequency.exponentialRampToValueAtTime(f0*1.35,t0+0.07); o.frequency.exponentialRampToValueAtTime(f0*0.85,t0+0.15);
        gg.gain.setValueAtTime(0,t0); gg.gain.linearRampToValueAtTime(0.05,t0+0.02); gg.gain.linearRampToValueAtTime(0,t0+0.17); o.connect(gg); gg.connect(AMB.g); o.start(t0); o.stop(t0+0.2); };
      AMB.iv=setInterval(()=>{ if(Math.random()<0.55){ chirp(); setTimeout(chirp,180+Math.random()*120); if(Math.random()<0.4) setTimeout(chirp,450); } },1400); }
  }catch(e){}
}

/* ===== Kun joyi eslatmasi va internetsiz rejim ===== */
async function notifToggle(on){ if(!on){ SET.notif=false; saveSet(); renderSettings(); return; }
  try{ const r=await Notification.requestPermission(); if(r==="granted"){ SET.notif=true; saveSet(); toast(t("notif_on")); dailyNotify(true); } else toast(t("notif_den")); }catch(e){ toast(t("notif_den")); } renderSettings(); }
async function dailyNotify(force){ try{ if(!SET.notif||Notification.permission!=="granted") return; const day=new Date().toISOString().slice(0,10); if(!force&&ls.get("olam_nday","")===day) return; ls.set("olam_nday",day);
  const p=dailyPlace(); if(!p) return; const body=pN(p)+" — "+pS(p); const reg=navigator.serviceWorker&&await navigator.serviceWorker.getRegistration();
  if(reg) reg.showNotification(t("daily"),{body,icon:"icon-192.png",badge:"icon-192.png",tag:"daily",data:{id:p.id}}); else new Notification(t("daily"),{body}); }catch(e){} }
if("serviceWorker" in navigator&&location.protocol==="https:"){ navigator.serviceWorker.register("sw.js").catch(()=>{}); navigator.serviceWorker.addEventListener?.("message",e=>{ if(e.data?.open&&byId(e.data.open)) openPlace(e.data.open); }); }
const QP=new URLSearchParams(location.search).get("p");
window.addEventListener("offline",()=>toast(t("offline")));

/* ===== Izohlar (videolar va joylar uchun) ===== */
const CMLOC=ls.get("olam_cm",{});
async function wpost(o){ const r=await fetch(GID_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}); return r.json(); }
async function cmGet(id){ try{ const d=await wpost({mode:"cget",id}); if(Array.isArray(d.items)){ M.cmShared=true; return d.items; } }catch(e){} M.cmShared=false; return CMLOC[id]||[]; }
async function cmAdd(id,text){ const it={n:(U?.name||t("traveler")).slice(0,30),t:text.slice(0,500),ts:Date.now()};
  try{ const d=await wpost({mode:"cadd",id,item:it}); if(Array.isArray(d.items)){ M.cmShared=true; return d.items; } }catch(e){}
  M.cmShared=false; (CMLOC[id]=CMLOC[id]||[]).push(it); ls.set("olam_cm",CMLOC); return CMLOC[id]; }
function cmHTML(items){ return items.length?items.slice().reverse().map(x=>`<div class="cmi"><b>${esc(x.n)}</b><small>${new Date(x.ts).toLocaleDateString(LOC[LANG])}</small><p>${esc(x.t)}</p></div>`).join(""):`<div class="empty" style="padding:30px 10px">${t("cm_empty")}</div>`; }
async function openComments(id){ const p=byId(id); if(!p) return; if(cur==="watch"&&!W.paused) wPause(); const S=$("#sh"); S.dataset.k="cm"; S.classList.add("on");
  S.innerHTML=`<div class="shb" onclick="event.stopPropagation()"><div class="shh"><b>${t("cm_h")} · ${esc(pN(p))}</b><button class="x" onclick="closeSheet()">${ICON.down}</button></div>
   <div class="shl" id="cml"><div class="empty">${t("cm_load")}</div></div>
   <form class="cin" style="padding:10px 0 0;background:none" onsubmit="event.preventDefault();cmSend('${id}')"><input id="cmq" maxlength="500" placeholder="${esc(t("cm_ph"))}" autocomplete="off"><button aria-label="${esc(t("send"))}">↑</button></form></div>`;
  const items=await cmGet(id); if($("#cml")) $("#cml").innerHTML=(M.cmShared?"":`<p class="sp">${t("cm_local")}</p>`)+cmHTML(items); }
async function cmSend(id){ const inp=$("#cmq"); const x=(inp?.value||"").trim(); if(!x) return; inp.value=""; const items=await cmAdd(id,x); learn(id,1); if($("#cml")) $("#cml").innerHTML=(M.cmShared?"":`<p class="sp">${t("cm_local")}</p>`)+cmHTML(items); }

/* ================= KO'RINISH YORDAMCHILARI ================= */
const grad = p=>`linear-gradient(140deg,${p.g[0]},${p.g[1]})`;
const big = u=>u&&!u.startsWith("data:")?u.replace(/\/\d+px-/,"/1280px-").replace(/([?&]width=)\d+/,"$11280"):u;
const huge = u=>u&&!u.startsWith("data:")?u.replace(/\/\d+px-/,"/1920px-").replace(/([?&]width=)\d+/,"$11920"):u;
const FB = "if(!this.dataset.f&&/1280px-/.test(this.src)){this.dataset.f=1;this.src=this.src.replace('/1280px-','/960px-')}else{this.remove()}";
const img = (p,lg)=>p.img?`<img src="${lg?big(p.img):p.img}" alt="" loading="lazy" decoding="async" onerror="${FB}">`:"";
const ph = (p,cls="",inner="",lg=false,extra="")=>`<div class="ph ${cls}" style="background:${grad(p)}" ${extra}>${img(p,lg)}${inner}</div>`;
const ICON={
 play:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
 heart:'<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/></svg>',
 save:'<svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
 info:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
 share:'<svg viewBox="0 0 24 24"><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13"/></svg>',
 down:'<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
 filter:'<svg viewBox="0 0 24 24"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
 sound:'<svg viewBox="0 0 24 24"><path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>',
 spark:'<svg viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
 chat:'<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
 music:'<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
 map:'<svg viewBox="0 0 24 24"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/></svg>',
 target:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
 bag:'<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="3"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/></svg>',
 pin:'<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
 route:'<svg viewBox="0 0 24 24"><circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/></svg>',
 eye:'<svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
 locate:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
 trash:'<svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M5 7l1 13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-13M9 7V4h6v3"/></svg>',
 arrow:'<svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></svg>',
 mute:'<svg viewBox="0 0 24 24"><path d="M11 5 6 9H2v6h4l5 4zM23 9l-6 6M17 9l6 6"/></svg>',
 pause:'<svg viewBox="0 0 24 24" style="width:30px;height:30px"><path d="M8 5v14M16 5v14"/></svg>',
 search:'<svg viewBox="0 0 24 24" style="color:var(--mute)"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
 gear:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
};
function dist(p){ if(!U||p.lat==null) return null; const [a,b]=U.lat!=null?[U.lat,U.lon]:(COUNTRIES[U.country]||COUNTRIES.UZ); const R=6371,r=Math.PI/180;
  const d=Math.sin((p.lat-a)*r/2)**2+Math.cos(a*r)*Math.cos(p.lat*r)*Math.sin((p.lon-b)*r/2)**2; return Math.round(2*R*Math.asin(Math.sqrt(d))); }
function km(d){ if(d==null) return "—"; const mi=SET.unit==="mi"; const v=mi?Math.round(d*0.621):d; try{ return new Intl.NumberFormat(LOC[LANG]).format(v)+" "+t(mi?"mi":"km"); }catch(e){ return v+" "+t(mi?"mi":"km"); } }
function bestTxt(code){ if(!code||code==="—") return "—"; if(code==="0") return t("allyear"); const mon=tl("mon");
  return code.split("|").map(r=>{ const [a,b]=r.split("-").map(Number); return b?mon[a-1]+"–"+mon[b-1]:mon[a-1]; }).join(", "); }
const rate = p=>(4.5+(hash(p.id)%5)/10).toFixed(1);

/* ================= HOLAT ================= */
let U = ls.get("olam_user",null);
if(U){ if(OLDC[U.country]) U.country=OLDC[U.country]; if(!COUNTRIES[U.country]) U.country="UZ";
  ["style","with","season"].forEach((k,i)=>{ if(typeof U[k]==="string"&&U[k]&&!/^\d$/.test(U[k])){ const arr=[I18N.uz.sty,I18N.uz.wth,I18N.uz.sea][i]; const j=arr.indexOf(U[k]); U[k]=j>=0?String(j):""; } }); }
const saved = new Set(ls.get("olam_saved",[])), liked = new Set(ls.get("olam_liked",[]));
const keep = ()=>{ ls.set("olam_saved",[...saved]); ls.set("olam_liked",[...liked]); };
let cur = "home";
const LRN = ls.get("olam_learn",{t:{},r:{},v:{}});
function learn(id,w){ const p=byId(id); if(!p) return; p.tags.forEach(x=>LRN.t[x]=(LRN.t[x]||0)+w); LRN.r[p.reg]=(LRN.r[p.reg]||0)+w; if(w>0) LRN.v[id]=(LRN.v[id]||0)+1; ls.set("olam_learn",LRN); }
function taste(){ const w={}; TAGS.forEach(k=>w[k]=(U?.interests?.includes(k)?6:0)+Math.max(0,LRN.t[k]||0)); return w; }
function topTags(n=3){ return Object.entries(taste()).filter(e=>e[1]>0).sort((a,b)=>b[1]-a[1]).slice(0,n).map(e=>e[0]); }
const optTxt=(k,v)=>v!==""&&v!=null?tl(k)[+v]:"";
const userCtx = ()=>[...topTags(5).map(k=>clean(I18N.en.cat[k])), U?.style!==""&&U?.style!=null?"Budget: "+clean(I18N.en.sty[+U.style]):"", U?.with?"With: "+clean(I18N.en.wth[+U.with]):"", U?.season?"Season: "+clean(I18N.en.sea[+U.season]):""].filter(Boolean);
function score(p,w,tot){
  if(!w){ w=taste(); tot=Object.values(w).reduce((a,b)=>a+b,0)||1; }
  let s=p.tags.reduce((a,x)=>a+(w[x]||0)/tot,0)*10;
  s+=(U?.regions?.includes(p.reg)?2:0)+Math.min(2,(LRN.r[p.reg]||0)/10)+(U?.dream===p.id?100:0);
  s-=Math.min(2,(LRN.v[p.id]||0)*0.3);
  s+=p.cat?Math.min(1.5,Math.log10(1+(p.sl||1))*0.6):(p.dyn?0:1.2);
  return s+(hash(p.id)%10)/20;
}
const wondersOf = id=>Object.keys(WONDERS).filter(k=>WONDERS[k].ids.includes(id));
let WCUR="new7";
function wondersHTML(){ const W2=tl("won"); return `<div class="chips" style="padding-top:0">${Object.keys(WONDERS).map(k=>`<button class="chip ${WCUR===k?"on":""}" onclick="WCUR='${k}';$('#wond').innerHTML=wondersHTML()">${W2[k][0]}</button>`).join("")}</div>
  <div class="ainote">${W2[WCUR][1]}${WCUR==="new7"?t("new7_note"):""}</div>
  <div class="hs">${WONDERS[WCUR].ids.map(byId).filter(Boolean).map((p,i)=>cardH(p,"",(i+1)+"")).join("")}</div>`; }

/* ================= BUTUN DUNYO (Wikipedia) ================= */
const KW={taom:/restaurant|cafe|café|bistro|tea ?house|chaikhana|food|cuisine/i,dam:/water ?park|aqua ?park|swimming|pool|resort|spa\b|thermal|bath/i,tog:/mountain|peak|volcan|massif|summit|range/i,dengiz:/beach|island|bay|coast|lagoon|archipelago|lake|reef|atoll|fjord/i,sharshara:/waterfall|falls|cascade/i,tarix:/ancient|ruin|fortress|castle|temple|mausoleum|medieval|historic|archaeolog|citadel|madrasa|church|cathedral/i,shahar:/city|town|capital|village|square|street|bridge/i,tabiat:/park|forest|nature|reserve|valley|garden|canyon|river|cave|glacier/i,qor:/glacier|ice|snow|arctic|polar|ski/i,sahro:/desert|dune|canyon|sand/i,zamon:/skyscraper|tower|modern|architect/i,kosmos:/observator|space|planetar|cosmodrome/i,stadion:/stadium|arena/i,zoo:/zoo|aquarium|safari|wildlife/i,muzey:/museum|gallery/i,kutub:/library/i,ibodat:/mosque|church|cathedral|temple|shrine|monastery|basilica/i,saroy:/palace|castle|fort/i,park:/amusement|theme park|garden/i};
function guessTags(x){ const r=Object.keys(KW).filter(k=>KW[k].test(x)); return r.length?r.slice(0,3):["tabiat"]; }
function guessReg(lat,lon){ if(lat>=37&&lat<=45.6&&lon>=56&&lon<=73.2) return "uz"; if(lon<-30) return lat<-10&&lon<-140?"okeaniya":"amerika"; if(lat<-10&&lon>110) return "okeaniya"; if(lon>-25&&lon<45&&lat>=36) return "yevropa"; if(lon>-20&&lon<60&&lat<37) return "afrika"; return "osiyo"; }
const DYN=ls.get("olam_dyn",{});
function dynFrom(pg,wl){
  if(!pg.coordinates) return null;
  const id="w"+(wl&&wl!=="en"?wl:"")+pg.pageid; if(byId(id)) return byId(id);
  const lat=pg.coordinates[0].lat, lon=pg.coordinates[0].lon, title=pg.title;
  const loc=pg.langlinks?.[0]?.["*"]; const local=(wl&&wl!=="en")?title:(loc||title);
  const text=(pg.description||"")+" "+(pg.extract||"")+" "+title;
  const first=(pg.extract||pg.description||"").split(/(?<=[.!?。])\s/)[0].slice(0,170);
  const p={id,t:title.replace(/ /g,"_"),q:title,n:local,c:pg.description?pg.description.slice(0,60):"",reg:guessReg(lat,lon),tags:guessTags(text),best:"—",s:first||title,g:PAL2[pg.pageid%PAL2.length],lat,lon,dyn:1,wl:wl||"en",desc:pg.extract||"",wurl:`https://${wl||"en"}.wikipedia.org/wiki/`+encodeURIComponent(title.replace(/ /g,"_"))};
  if(pg.thumbnail&&!/\.(svg|png)/i.test(pg.thumbnail.source)&&!BADIMG.test(pg.thumbnail.source)&&pg.thumbnail.width>=pg.thumbnail.height*0.7) p.img=pg.thumbnail.source;
  PLACES.push(p); IDX[id]=p; return p;
}
function dynKeep(p){ if(!p||!p.dyn||p.keep) return; p.keep=1; const {id,t:tt,q,n,c,reg,tags,s,g,lat,lon,img,wurl,wl,desc,wt,cc,wd}=p; DYN[id]={id,t:tt,q,n,c,reg,tags,best:"—",s,g,lat,lon,img,wurl,wl,wt,cc,wd,desc:(desc||"").slice(0,600),dyn:1,keep:1}; const ks=Object.keys(DYN); if(ks.length>150) delete DYN[ks[0]]; ls.set("olam_dyn",DYN); }
Object.values(DYN).forEach(p=>{ if(!IDX[p.id]){ PLACES.push(p); IDX[p.id]=p; } });
const WP=l=>`&prop=pageimages|description|coordinates|extracts|langlinks&piprop=thumbnail&pithumbsize=960&pilimit=50&exintro=1&explaintext=1&exsentences=3&exlimit=20&lllimit=50&colimit=50${l?"&lllang="+l:""}`;
async function worldSearch(q){
  const wl=WL(LANG); const jobs=[fetch(WAPI+"&generator=search&gsrlimit=20&gsrsearch="+encodeURIComponent(q)+WP(wl!=="en"?wl:"")).then(r=>r.json()).then(d=>Object.values(d.query?.pages||{}).sort((a,b)=>(a.index||0)-(b.index||0)).map(x=>dynFrom(x,"en")))];
  if(wl!=="en") jobs.push(fetch(`https://${wl}.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&generator=search&gsrlimit=12&gsrsearch=`+encodeURIComponent(q)+WP("")+(wl==="zh"?"&variant=zh-cn":"")).then(r=>r.json()).then(d=>Object.values(d.query?.pages||{}).sort((a,b)=>(a.index||0)-(b.index||0)).map(x=>dynFrom(x,wl))).catch(()=>[]));
  const r=(await Promise.all(jobs)).flat().filter(Boolean); const seen=new Set(); return r.filter(p=>{ const k=Math.round(p.lat*50)+","+Math.round(p.lon*50); if(seen.has(k)) return false; seen.add(k); return true; });
}
async function worldNear(lat,lon){
  const wl=WL(LANG); const d=await (await fetch(WAPI+"&generator=geosearch&ggsradius=10000&ggslimit=40&ggscoord="+lat+"|"+lon+WP(wl!=="en"?wl:""))).json();
  return Object.values(d.query?.pages||{}).map(x=>dynFrom(x,"en")).filter(Boolean);
}
const forYou = ()=>{ const w=taste(), tot=Object.values(w).reduce((a,b)=>a+b,0)||1; return PLACES.filter(p=>!p.dyn||p.keep).map(p=>[p,score(p,w,tot)]).sort((a,b)=>b[1]-a[1]).map(x=>x[0]); };

/* ================= WIKIPEDIA (koordinata, rasm) ================= */
async function loadAll(){
  const list=PLACES.filter(p=>!p.dyn);
  for(let i=0;i<list.length;i+=20){
    const chunk=list.slice(i,i+20);
    try{
      const u=WAPI+"&prop=pageimages|coordinates|info&inprop=url&piprop=thumbnail|name&pithumbsize=960&pilimit=50&colimit=50&titles="+encodeURIComponent(chunk.map(p=>p.t.replace(/_/g," ")).join("|"));
      const d=(await (await fetch(u)).json()).query||{};
      const map={}; (d.normalized||[]).forEach(x=>map[x.from]=x.to); const red={}; (d.redirects||[]).forEach(x=>red[x.from]=x.to);
      const pages={}; Object.values(d.pages||{}).forEach(pg=>pages[pg.title]=pg);
      chunk.forEach(p=>{ let k=p.t.replace(/_/g," "); k=map[k]||k; k=red[k]||k; const pg=pages[k]; if(!pg) return;
        if(pg.thumbnail&&!p.hq&&!/\.(svg|png|gif)/i.test(pg.thumbnail.source)&&!BADIMG.test(pg.pageimage||"")) p.img=pg.thumbnail.source;
        if(pg.coordinates&&p.lat==null){ p.lat=pg.coordinates[0].lat; p.lon=pg.coordinates[0].lon; }
        p.wurl=pg.fullurl; });
    }catch(e){}
    refresh();
  }
  // asosiy rasmi yo'q joylar uchun galereyadan rasm
  for(const p of PLACES.filter(x=>!x.dyn&&!x.img)){ const g=await loadGallery(p); if(g[0]){ p.img=g[0].replace(/\/\d+px-/,"/960px-"); refresh(); } }
}
let refT;
function refresh(){ clearTimeout(refT); refT=setTimeout(()=>{
  if($("#ob").classList.contains("on")){ obBg(); if(obStep===3) renderOb(); return; }
  if(["home","explore","profile"].includes(cur)){ const v=$("#"+cur), st=v.scrollTop; render(cur); v.scrollTop=st; }
},150); }
const QIC={};
async function loadGallery(p){
  if(p.gallery) return p.gallery;
  if(p.user&&!p.wurl){ p.gallery=p.img?[p.img]:[]; return p.gallery; }
  let g=IMG[p.id]?.length?await commonsUrls(IMG[p.id]):[];
  if(p.img&&!g.some(u=>u.split("/").pop().replace(/^\d+px-/,"")===p.img.split("/").pop().replace(/^\d+px-/,""))) g.push(big(p.img));
  const fname=u=>decodeURIComponent(u.split("/").pop().replace(/^\d+px-/,""));
  const add=arr=>arr.forEach(u=>{ if(u&&!g.some(x=>fname(x)===fname(u))) g.push(u); });
  const name=(p.nt||p.t).replace(/_/g," ").replace(/\s*\(.*?\)\s*/g,"").replace(/,.*$/,"").trim();
  const words=name.toLowerCase().split(/\s+/).filter(w=>w.length>=4);
  // 1) Commons sifatli rasmlari (Quality images)
  try{ const u="https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=6&gsrlimit=20&gsrsearch="+encodeURIComponent('"'+name+'" incategory:Quality_images')+"&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1280";
    const d=await (await fetch(u)).json();
    add(Object.values(d.query?.pages||{}).sort((a,b)=>(a.index||0)-(b.index||0)).filter(x=>{ const ii=x.imageinfo?.[0]; return ii&&/jpeg/.test(ii.mime)&&ii.width>=1500&&!BADIMG.test(x.title)&&(!words.length||words.some(w=>x.title.toLowerCase().includes(w))); }).slice(0,8).map(x=>x.imageinfo[0].thumburl));
  }catch(e){}
  // 2) Wikipedia maqola rasmlari
  if(g.length<6){ try{
    const d=await (await fetch(`https://${p.wl||"en"}.wikipedia.org/api/rest_v1/page/media-list/`+encodeURIComponent(p.t))).json();
    add((d.items||[]).filter(i=>i.type==="image"&&i.srcset&&!/\.(svg|gif|png)$/i.test(i.title)&&!BADIMG.test(i.title)).slice(0,8).map(i=>{ const s=i.srcset[i.srcset.length-1].src; return s.startsWith("//")?"https:"+s:s; }));
  }catch(e){} }
  // 3) hali 7 tadan kam bo'lsa — Commons'dan katta o'lchamli (≥1600px) boshqa suratlar
  if(g.length<7){ try{ const u="https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=6&gsrlimit=40&gsrsearch="+encodeURIComponent('"'+name+'" filetype:bitmap')+"&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1280";
    const d=await (await fetch(u)).json();
    add(Object.values(d.query?.pages||{}).sort((a,b)=>(a.index||0)-(b.index||0)).filter(x=>{ const ii=x.imageinfo?.[0]; return ii&&/jpeg/.test(ii.mime)&&ii.width>=1600&&ii.height>=900&&!BADIMG.test(x.title)&&(!words.length||words.some(w=>x.title.toLowerCase().includes(w))); }).slice(0,12-g.length).map(x=>x.imageinfo[0].thumburl));
  }catch(e){} }
  p.gallery=g.slice(0,14);
  return p.gallery;
}
async function loadVideo(p){
  if(!SET.video) return null;
  if(p.video!==undefined) return p.video;
  p.video=null;
  let pv=VID[p.id]||[]; if(SITE){ const land=pv.filter(x=>/_1920_1080_/.test(x)); if(land.length) pv=land; } if(pv.length){ p.vlist=pv.map(pexels); p.video=p.vlist[Math.floor(Math.random()*pv.length)]; return p.video; }
  try{
    const u="https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=6&gsrlimit=10&gsrsearch="+encodeURIComponent("filetype:video "+p.q)+"&prop=videoinfo&viprop=url|derivatives";
    const d=await (await fetch(u)).json();
    const pages=Object.values(d.query?.pages||{}).filter(x=>x.videoinfo).sort((a,b)=>(a.index||0)-(b.index||0));
    const webm=document.createElement("video").canPlayType('video/webm; codecs="vp9"');
    const near=arr=>arr.sort((a,b)=>Math.abs(a.height-1080)-Math.abs(b.height-1080))[0];
    const got=[]; for(const pg of pages){ const ds=pg.videoinfo[0].derivatives||[]; const pick=near(ds.filter(x=>/mp4/.test(x.type)&&x.height>=480))||(webm&&near(ds.filter(x=>/webm/.test(x.type)&&x.height>=480))); if(pick) got.push(pick.src); if(got.length>=3) break; }
    if(got.length){ p.vlist=got; p.video=got[0]; }
  }catch(e){}
  return p.video;
}

/* ================= ONBOARDING ================= */
let obStep=0, obData={}, obI=0, obTimer;
function obBg(){
  const pool=PLACES.filter(p=>VID[p.id]?.length&&p.img); const all=pool.length?pool:PLACES;
  const p=all[(obI++*7)%all.length]; const a=$("#obA"), b=$("#obB"), v=$("#obV");
  const [on,off]=a.classList.contains("on")?[b,a]:[a,b];
  on.style.backgroundImage=p.img?`url("${big(p.img)}"), ${grad(p)}`:grad(p); on.classList.add("on"); off.classList.remove("on");
  const cap=$("#obCap"); if(cap) cap.textContent=pN(p)+" · "+pCountry(p);
  if(v&&SET.video&&VID[p.id]?.length){ v.style.opacity=0; setTimeout(()=>{ v.src=pexels(VID[p.id][0]); v.play().catch(()=>{}); },350); v.onplaying=()=>{ v.style.opacity=1; }; }
}
function startOb(){ obStep=0; obData={lat:U?.lat??null,lon:U?.lon??null,name:U?.name||"",country:U?.country||"UZ",interests:U?.interests||[],regions:U?.regions||[],dream:U?.dream||null,style:U?.style??"",with:U?.with??"",season:U?.season??""};
  $("#ob").classList.add("on"); obBg(); clearInterval(obTimer); obTimer=setInterval(obBg,9000); renderOb(); }
const steps=n=>`<div class="steps">${[1,2,3,4].map(i=>`<i class="${i<=n?"on":""}"></i>`).join("")}</div>`;
const langChips=(fn)=>`<div class="opts lng">${LANGS.map(([k,n,f])=>`<button class="opt ${LANG===k?"on":""}" onclick="setLang('${k}');${fn}">${n}</button>`).join("")}</div>`;
function renderOb(){
  const B=$("#obBody"), Dd=obData; B.classList.toggle("splash",obStep===0);
  const back=`<button class="btn o" onclick="obStep--;renderOb()">←</button>`;
  if(obStep===0){
    B.innerHTML=`<div class="logo">OLAM</div><h1>${t("ob_h1")}</h1><p class="sub">${t("ob_sub")}</p>${langChips("renderOb()")}
      <div class="obb"><button class="btn g" onclick="mPlay();obNext()">${t("start")}</button></div>`;
  } else if(obStep===1){
    B.innerHTML=`${steps(1)}<h1>${t("ob1_h")}</h1><p class="sub">${t("ob1_sub")}</p>
      <label class="f">${t("name")}</label><input class="t" id="nm" placeholder="${esc(t("name_ph"))}" value="${esc(Dd.name)}" oninput="obData.name=this.value">
      <label class="f">${t("loc_q")}</label><button class="locb ${Dd.lat!=null?"on":""}" onclick="locate(ok=>renderOb())">${ICON.locate}<span>${Dd.lat!=null?t("loc_ok"):t("loc_b")}</span></button>
      <label class="f">${t("from")}</label><div class="opts">${Object.keys(COUNTRIES).map(c=>`<button class="opt ${Dd.country===c?"on":""}" onclick="obData.country='${c}';renderOb()">${esc(cname(c))}</button>`).join("")}</div>
      <div class="obb">${back}<button class="btn g" onclick="obNext()">${t("next")}</button></div>`;
  } else if(obStep===2){
    const C=CAT();
    B.innerHTML=`${steps(2)}<h1>${t("ob2_h")}</h1><p class="sub">${t("ob2_sub")}</p>
      <div class="opts">${TAGS.map(k=>`<button class="opt ${Dd.interests.includes(k)?"on":""}" onclick="tog(obData.interests,'${k}');renderOb()">${C[k]}</button>`).join("")}</div>
      <div class="obb">${back}<button class="btn g" ${Dd.interests.length?"":"disabled"} onclick="obNext()">${t("next")}</button></div>`;
  } else if(obStep===3){
    const R=REGN(); const sug=PLACES.filter(p=>!p.dyn&&p.img&&(!Dd.regions.length||Dd.regions.includes(p.reg))).sort((a,b)=>b.tags.filter(x=>Dd.interests.includes(x)).length-a.tags.filter(x=>Dd.interests.includes(x)).length).slice(0,9);
    B.innerHTML=`${steps(3)}<h1>${t("ob3_h")}</h1><p class="sub">${t("ob3_sub")}</p>
      <div class="opts">${REGS.map(k=>`<button class="opt ${Dd.regions.includes(k)?"on":""}" onclick="tog(obData.regions,'${k}');renderOb()">${R[k]}</button>`).join("")}</div>
      <label class="f">${t("dream")}</label>
      <div class="dream">${sug.map(p=>ph(p,Dd.dream===p.id?"on":"",`<span>${esc(pN(p))}</span>`,false,`onclick="obData.dream=obData.dream==='${p.id}'?null:'${p.id}';renderOb()"`)).join("")}</div>
      <div class="obb">${back}<button class="btn g" ${Dd.regions.length?"":"disabled"} onclick="obNext()">${t("next")}</button></div>`;
  } else {
    const o=(key,arr)=>arr.map((x,i)=>`<button class="opt ${String(Dd[key])===String(i)?"on":""}" onclick="obData.${key}='${i}';renderOb()">${x}</button>`).join("");
    B.innerHTML=`${steps(4)}<h1>${t("ob4_h")}</h1><p class="sub">${t("ob4_sub")}</p>
      <label class="f">${t("budget")}</label><div class="opts">${o("style",tl("sty"))}</div>
      <label class="f">${t("with")}</label><div class="opts">${o("with",tl("wth"))}</div>
      <label class="f">${clean(t("s_ui"))}</label><div class="uipick">${[["white",t("ui_white")],["glass",t("ui_glass")]].map(([v,l])=>`<button class="${curUI()===v?"on":""} u-${v}" onclick="uiPick('${v}');renderOb()"><i><b></b><b></b><b></b></i>${l}</button>`).join("")}</div>
      <label class="f">${t("season_q")}</label><div class="opts">${o("season",tl("sea"))}</div>
      <div class="obb">${back}<button class="btn g" onclick="obDone()">${t("done")}</button></div>`;
  }
}
function tog(arr,k){ const i=arr.indexOf(k); i<0?arr.push(k):arr.splice(i,1); }
function obNext(){ obStep++; renderOb(); }
function obDone(){
  U={...obData,name:obData.name.trim()||t("traveler")}; ls.set("olam_user",U);
  clearInterval(obTimer); $("#ob").classList.remove("on"); mPause(); $("#obV")?.pause(); go("home");
  toast(t("picked",{n:forYou().filter(p=>score(p)>=3).length||PLACES.length}));
}

/* ================= ASOSIY ================= */
function cardH(p,cls="",tag=""){ return ph(p,"card "+cls,`${tag?`<div class="tag">${tag}</div>`:""}<div class="ci"><b>${esc(pN(p))}</b><small>${esc(pCountry(p))}</small></div>`,false,`onclick="openPlace('${p.id}')"`); }
function gcard(p){ return `<div class="gc" onclick="openPlace('${p.id}')">${ph(p,"gi",`<button class="hrt ${saved.has(p.id)?"on":""}" aria-label="${esc(t("b_save"))}" onclick="event.stopPropagation();save('${p.id}');this.classList.toggle('on',saved.has('${p.id}'))">${ICON.heart}</button>`)}<b>${esc(pN(p))}</b><div class="meta"><span>${PIN}${esc(pCountry(p))}</span><span class="r">${rate(p)}</span></div></div>`; }
function renderHome(){ if(SITE) return renderHomeSite(); setTimeout(fillAIPicks,0);
  const C=CAT(), R=REGN(), PR=PER();
  const list=forYou(), hero=(U?.dream&&byId(U.dream))||list[0];
  const near=PLACES.filter(p=>!p.dyn&&p.lat!=null&&p.id!==hero.id).sort((a,b)=>dist(a)-dist(b)).slice(0,4);
  const name=esc(U?.name||t("friend"));
  const dchips=TAGS.map(k=>{ const p=PLACES.find(x=>x.tags[0]===k&&x.img)||PLACES.find(x=>x.tags.includes(k)&&x.img)||PLACES.find(x=>x.tags.includes(k)); return p?`<button class="dchip" onclick="openMood('${k}')">${ph(p)}<span>${clean(C[k])}</span></button>`:""; }).join("");
  const cats=NEWCATS.map(k=>{ const p=PLACES.find(x=>x.tags[0]===k&&x.img)||PLACES.find(x=>x.tags.includes(k)&&x.img); const n=PLACES.filter(x=>x.tags.includes(k)).length; return p?ph(p,"catt",`<div class="ci"><b>${catIcon(k)}</b><small>${esc(clean(C[k]))} · ${n}</small></div>`,false,`onclick="openMood('${k}')"`):""; }).join("");
  const popular=list.filter(p=>p.id!==hero.id).slice(0,8);
  $("#home").innerHTML=`
   <header class="hd"><div class="avatar" onclick="go('profile')">${esc((U?.name||"S")[0].toUpperCase())}</div>
     <div class="hdt"><small>${PIN}${esc(cname(U?.country||"UZ"))}</small><b>${t("hello",{name})}</b></div>
     <button class="ibtn" aria-label="${esc(t("ap_h"))}" onclick="openAdd()"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>
     <button class="ibtn" aria-label="${esc(t("settings"))}" onclick="openSettings()">${ICON.gear}</button></header>
   <h1 class="hq">${esc(t("hd_sub"))}</h1>
   <div class="sbar"><div class="sin" onclick="go('explore');setTimeout(()=>$('#xq')?.focus(),60)">${ICON.search}<span>${t("search_home")}</span></div>
     <button class="sfil" aria-label="${esc(t("cats_all"))}" onclick="openCats()">${ICON.filter}</button></div>
   <div class="tiles">
     <button class="tile" onclick="go('watch')"><i>${ICON.play}</i>${t("t_watch")}</button>
     <button class="tile" onclick="openMap()"><i>${ICON.map}</i>${t("t_map")}</button>
     <button class="tile" onclick="openQuiz()"><i>${ICON.target}</i>${t("t_quiz")}</button>
     <button class="tile" onclick="openChat()"><i>${ICON.spark}</i>${t("t_ai")}</button>
     <button class="tile" onclick="openTrips()"><i>${ICON.bag}</i>${t("t_trips")}</button>
   </div>
   ${(()=>{ const dp=dailyPlace(); return dp?`<div class="sec"><h2>${t("daily")}<small>${t("daily_sub")}</small></h2></div><div class="daily" onclick="go('watch','${dp.id}')">${SET.video?`<video src="${pexels(VID[dp.id][0])}" autoplay muted loop playsinline preload="metadata"></video>`:img(dp,true)}<div class="dci"><b>${esc(pN(dp))}</b><small>${PIN}${esc(pCountry(dp))}</small></div><span class="dpl">${ICON.play}</span></div>`:""; })()}
   <div class="sec"><h2>${t("dirs")}</h2><span onclick="openCats()">${t("all")}</span></div>
   <div class="dchips">${dchips}</div>
   <div class="sec"><h2>${t("ctry_h")}<small>${t("ctry_sub")}</small></h2><span onclick="openCountries()">${t("all")}</span></div>
   <div class="chips" style="padding-top:0">${ctryChips()}</div>
   <div class="sec"><h2>${U?.dream===hero.id?t("dream_place"):t("today")}</h2></div>
   <div class="feat ph" style="background:${grad(hero)}" onclick="openPlace('${hero.id}')">${img(hero,true)}<div class="badge">${STAR}${rate(hero)} · ${esc(pCountry(hero))}</div>
     <div class="fi"><h1>${esc(pN(hero))}</h1><p>${esc(pS(hero))}</p>
       <div class="row"><button class="pill g" onclick="event.stopPropagation();go('watch','${hero.id}')">${ICON.play} ${t("watch_now")}</button>
       <button class="pill o" onclick="event.stopPropagation();openPlace('${hero.id}')">${t("details")}</button></div></div></div>
   <div class="sec" id="aisec"><h2>${t("ai_picked")}<small>${t("ai_rec")}</small></h2><span onclick="openChat()">${t("ask")}</span></div><div class="aipick" id="aipick"><div class="ld">${t("ai_loading")}</div></div>
   <div class="sec"><h2>${t("cats_h")}<small>${t("cats_sub")}</small></h2><span onclick="openCats()">${t("all")}</span></div>
   <div class="cats">${cats}</div>
   <div class="sec"><h2>${t("won_h")}<small>${t("won_sub")}</small></h2><span onclick="X.tag='wonder';X.q='';X.reg='all';go('explore')">${t("all")}</span></div>
   <div id="wond">${wondersHTML()}</div>
   <div class="sec"><h2>${t("best_h")}<small>${PR[topTags(1)[0]]||t("based")}</small></h2><span onclick="go('explore')">${t("all")}</span></div>
   <div class="grid2">${popular.map(gcard).join("")}</div>
   ${near.length?`<div class="sec"><h2>${t("near_h")}<small>${t("near_sub",{c:esc(cname(U?.country||"UZ"))})}</small></h2></div>
   ${near.map(p=>`<div class="li" onclick="openPlace('${p.id}')">${ph(p)}<div><b>${esc(pN(p))}</b><small>${PIN}${esc(pCountry(p))} · ${km(dist(p))}</small></div><span class="go"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>`).join("")}`:""}
   ${topTags(2).map(x=>{ const l=list.filter(p=>p.tags.includes(x)&&p.id!==hero.id).slice(0,10); return l.length?`<div class="sec"><h2>${t("for_p",{p:clean(PR[x]).toLowerCase()})}<small>${t("because",{i:clean(C[x]).toLowerCase()})}</small></h2><span onclick="openMood('${x}')">${t("all")}</span></div><div class="hs">${l.map(p=>cardH(p)).join("")}</div>`:""; }).join("")}
   <div class="sec"><h2>${t("world_h")}<small>${t("world_sub")}</small></h2><span onclick="go('explore');setTimeout(()=>$('#xq')?.focus(),60)">${t("search_b")}</span></div>
   ${["yevropa","osiyo","amerika","afrika","okeaniya","uz"].map(r=>{ const l=list.filter(p=>p.reg===r).slice(0,14); return `<div class="sec" style="padding-top:8px"><h2 style="font-size:16px">${R[r]}</h2><span onclick="X.reg='${r}';X.tag='all';go('explore')">${PLACES.filter(p=>p.reg===r).length} ${t("places")}</span></div><div class="hs">${l.map(p=>cardH(p,"sm")).join("")}</div>`; }).join("")}
   <div class="foot"></div>`;
}
function openMood(k){ LRN.t[k]=(LRN.t[k]||0)+1; ls.set("olam_learn",LRN); X.tag=k; X.q=""; X.reg="all"; go("explore"); }

/* ================= KATEGORIYALAR ================= */
function openCats(){ const C=CAT(); const O=$("#catv"); O.classList.add("on"); O.scrollTop=0;
  const tile=k=>{ const p=PLACES.find(x=>x.tags[0]===k&&x.img)||PLACES.find(x=>x.tags.includes(k)&&x.img)||PLACES.find(x=>x.tags.includes(k)); const n=PLACES.filter(x=>x.tags.includes(k)).length;
    return p?ph(p,"catt",`<div class="ci"><b>${catIcon(k)}</b><small>${esc(clean(C[k]))} · ${n}</small></div>`,false,`onclick="closeCats();openMood('${k}')"`):""; };
  const wp=byId("giza"); const WN=tl("won");
  O.innerHTML=`<button class="ovx" onclick="closeCats()">${ICON.down}</button><div class="seth"><h1>${t("cats_all")}</h1><p class="sp">${t("cats_pick")}</p></div>
   <div class="cats" style="padding:0">${wp?ph(wp,"catt",`<div class="ci"><b>${catIcon("wonder")}</b><small>${esc(clean(t("won_chip")))} · ${new Set(Object.values(WONDERS).flatMap(w=>w.ids)).size}</small></div>`,false,`onclick="closeCats();X.tag='wonder';X.q='';X.reg='all';go('explore')"`):""}${TAGS.map(tile).join("")}</div><div class="foot"></div>`; }
function closeCats(){ $("#catv").classList.remove("on"); }

/* ================= JOY QO'SHISH ================= */
const MINE=ls.get("olam_mine",{});
function addUserPlace(p){ if(IDX[p.id]) return IDX[p.id]; p.t=p.t||p.n||p.id; p.q=p.q||p.n||p.t; p.n=p.n||p.t; p.c=p.c||""; p.s=p.s||""; p.dyn=1; p.keep=1; p.user=1; p.tags=p.tags||["tabiat"]; p.g=p.g||PAL2[hash(p.id)%PAL2.length]; p.best=p.best||"—"; PLACES.push(p); IDX[p.id]=p; return p; }
Object.values(MINE).forEach(addUserPlace);
async function loadCommunity(){ try{ const d=await wpost({mode:"plist"}); (d.items||[]).forEach(x=>{ if(x&&x.id&&!IDX[x.id]) addUserPlace({...x}); }); refresh(); }catch(e){} }
const AP={img:"",lat:null,lon:null,cat:"tabiat",reg:"uz"};
function openAdd(){ const O=$("#addv"); O.classList.add("on"); O.scrollTop=0; AP.img=""; AP.lat=AP.lon=null; renderAdd(); }
function closeAdd(){ $("#addv").classList.remove("on"); }
function renderAdd(manual){ const C=CAT(), R=REGN(); const O=$("#addv");
  O.innerHTML=`<button class="ovx" onclick="closeAdd()">${ICON.down}</button><div class="seth"><h1>${t("ap_h")}</h1><p class="sp">${t("ap_sub")}</p></div>
   <label class="search" style="margin:6px 0 10px">${ICON.search}<input id="apq" placeholder="${esc(t("ap_search"))}" oninput="apSearch(this.value)"></label>
   <div id="apr"></div>
   <button class="pill o2 wide" style="margin:10px 0" onclick="$('#apm').style.display='block';this.remove()">${t("ap_manual")}</button>
   <div id="apm" class="sgrp" style="display:${manual?"block":"none"}">
     <label class="f">${t("ap_name")}</label><input class="t" id="apn" maxlength="80">
     <label class="f">${t("ap_country")}</label><input class="t" id="apc" maxlength="80">
     <label class="f">${t("ap_cat")}</label><div class="opts">${TAGS.map(k=>`<button class="opt ${AP.cat===k?"on":""}" onclick="AP.cat='${k}';this.parentNode.querySelectorAll('.opt').forEach(b=>b.classList.remove('on'));this.classList.add('on')">${C[k]}</button>`).join("")}</div>
     <label class="f">${t("ap_reg")}</label><div class="opts">${REGS.map(k=>`<button class="opt ${AP.reg===k?"on":""}" onclick="AP.reg='${k}';this.parentNode.querySelectorAll('.opt').forEach(b=>b.classList.remove('on'));this.classList.add('on')">${R[k]}</button>`).join("")}</div>
     <label class="f">${t("ap_desc")}</label><textarea class="t" id="apd" rows="3" maxlength="600"></textarea>
     <div class="row" style="margin-top:12px"><label class="pill o2" style="flex:1">${t("ap_photo")}<input type="file" accept="image/*" hidden onchange="apPhoto(this.files[0])"></label><button class="pill o2" style="flex:1" id="apg" onclick="apGeo()">${t("ap_geo")}</button></div>
     <div id="apim" class="ph" style="height:180px;border-radius:18px;margin-top:10px;display:none"></div>
     <p class="sp" style="margin-top:10px">${t("ap_tip")}</p>
     <button class="btn g wide" style="margin-top:6px" onclick="apSave()">${t("ap_save")}</button></div>
   ${Object.keys(MINE).length?`<div class="sl" style="margin-top:16px">${t("ap_mine")}</div><div class="grid2" style="padding:0">${Object.keys(MINE).map(byId).filter(Boolean).map(gcard).join("")}</div>`:""}<div class="foot"></div>`; }
let APT; function apSearch(q){ clearTimeout(APT); const box=$("#apr"); q=q.trim(); if(q.length<2){ box.innerHTML=""; return; } box.innerHTML=`<p class="sp">${t("searching",{q:esc(q)})}</p>`;
  APT=setTimeout(async()=>{ let r=[]; try{ r=await worldSearch(q); }catch(e){} const loc=PLACES.filter(p=>!p.dyn&&[pN(p),p.n,p.t].join(" ").toLowerCase().includes(q.toLowerCase())).slice(0,4);
    if($("#apq")?.value.trim()!==q) return;
    box.innerHTML=[...loc,...r.filter(x=>!loc.includes(x))].slice(0,12).map(p=>`<div class="li" style="margin:0 0 10px">${ph(p)}<div style="min-width:0;flex:1"><b>${esc(pN(p))}</b><small>${esc(pS(p).slice(0,80))}</small></div><button class="pill g" style="flex:0 0 auto;padding:9px 12px" onclick="apPick('${p.id}')">${p.dyn&&!p.keep?t("ap_add"):"→"}</button></div>`).join("")||`<p class="sp">${t("not_found")}</p>`; },600); }
function apPick(id){ const p=byId(id); if(!p) return; if(p.dyn&&!p.keep){ dynKeep(p); MINE[p.id]={id:p.id,t:p.t,q:p.q,n:p.n,c:p.c,reg:p.reg,tags:p.tags,s:p.s,lat:p.lat,lon:p.lon,img:p.img,wurl:p.wurl,wl:p.wl,desc:(p.desc||"").slice(0,600)}; p.user=1; ls.set("olam_mine",MINE);
    wpost({mode:"padd",place:MINE[p.id]}).catch(()=>{}); toast(t("ap_added")); }
  closeAdd(); openPlace(id); }
function apPhoto(f){ if(!f) return; const fr=new FileReader(); fr.onload=()=>{ const im=new Image(); im.onload=()=>{ const k=Math.min(1,900/Math.max(im.width,im.height)); const c=document.createElement("canvas"); c.width=Math.round(im.width*k); c.height=Math.round(im.height*k); c.getContext("2d").drawImage(im,0,0,c.width,c.height); AP.img=c.toDataURL("image/jpeg",0.72); const b=$("#apim"); b.style.display="block"; b.innerHTML=`<img src="${AP.img}" alt="">`; }; im.src=fr.result; }; fr.readAsDataURL(f); }
function apGeo(){ try{ navigator.geolocation.getCurrentPosition(pos=>{ AP.lat=+pos.coords.latitude.toFixed(5); AP.lon=+pos.coords.longitude.toFixed(5); const b=$("#apg"); if(b) b.textContent=t("ap_geo_ok"); },()=>{},{timeout:10000}); }catch(e){} }
function apSave(){ const n=$("#apn").value.trim(), c=$("#apc").value.trim(), d=$("#apd").value.trim(); if(!n||!AP.img){ toast(t("ap_need")); return; }
  const id="u"+Date.now().toString(36); const p={id,t:n,q:n,n,c,reg:AP.reg,tags:[AP.cat],s:(d.split(/(?<=[.!?])\s/)[0]||n).slice(0,160),desc:d,lat:AP.lat,lon:AP.lon,img:AP.img};
  MINE[id]=p; ls.set("olam_mine",MINE); addUserPlace({...p}); wpost({mode:"padd",place:p}).catch(()=>{}); toast(t("ap_added")); closeAdd(); openPlace(id); }

/* ================= OB-HAVO, VALYUTA, 360° ================= */
const WXS={sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 part:'<path d="M8 3v1.5M3.5 5l1 1M2 9.5h1.5M12.5 5l-1 1"/><path d="M5.5 11.5a3 3 0 1 1 5.2-3"/><path d="M8 20h9a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.4 1.6A3.2 3.2 0 0 0 8 20z"/>',
 cloud:'<path d="M7 19h10a5 5 0 0 0 0-10 6.5 6.5 0 0 0-12.4 2A4 4 0 0 0 7 19z"/>',
 fog:'<path d="M4 9h16M3 13h18M5 17h14"/>',
 rain:'<path d="M7 15h10a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4 1.8A3.6 3.6 0 0 0 7 15zM8 18l-1 3M12 18l-1 3M16 18l-1 3"/>',
 snow:'<path d="M7 14h10a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4 1.8A3.6 3.6 0 0 0 7 14zM8 18v.01M12 20v.01M16 18v.01M10 22v.01M14 22v.01"/>',
 storm:'<path d="M7 14h10a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4 1.8A3.6 3.6 0 0 0 7 14zM13 15l-3 4h4l-3 4"/>'};
const WXI=c=>SV(WXS[c===0?"sun":c<=2?"part":c===3?"cloud":c<=48?"fog":c<=67?"rain":c<=77?"snow":c<=82?"rain":c<=86?"snow":"storm"],"wx");
async function loadWx(p){ const el=$("#wx"); if(!el||p.lat==null) { if(el) el.remove(); return; }
  try{ const d=await (await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${p.lat}&longitude=${p.lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=6`)).json();
    if(!$("#wx")||!d.current) return; let df; try{ df=new Intl.DateTimeFormat(LOC[LANG],{weekday:"short"}); }catch(e){ df=new Intl.DateTimeFormat("en",{weekday:"short"}); }
    $("#wx").innerHTML=`<div class="sl">${t("wx_h")}</div><div class="wxr"><div class="wxn"><span>${WXI(d.current.weather_code)}</span><b>${Math.round(d.current.temperature_2m)}°</b><small>${t("now_t")}</small></div>${d.daily.time.slice(1).map((x,i)=>`<div><small>${df.format(new Date(x+"T12:00"))}</small><span>${WXI(d.daily.weather_code[i+1])}</span><b>${Math.round(d.daily.temperature_2m_max[i+1])}°</b><small>${Math.round(d.daily.temperature_2m_min[i+1])}°</small></div>`).join("")}</div>`;
  }catch(e){ $("#wx")?.remove(); } }
const CUR={UZ:"UZS",KG:"KGS",KZ:"KZT",TJ:"TJS",TM:"TMT",AF:"AFN",AZ:"AZN",RU:"RUB",TR:"TRY",AE:"AED",SA:"SAR",CN:"CNY",IN:"INR",KR:"KRW",DE:"EUR",GB:"GBP",US:"USD",GR:"EUR",FR:"EUR",PE:"PEN",MV:"MVR",JP:"JPY",IT:"EUR",JO:"JOD",PF:"XPF",CA:"CAD",AR:"ARS",BR:"BRL",KH:"KHR",ID:"IDR",NO:"NOK",IS:"ISK",ES:"EUR",HR:"EUR",VN:"VND",AT:"EUR",ZM:"ZMW",ZW:"USD",BO:"BOB",AU:"AUD",NZ:"NZD",CH:"CHF",SI:"EUR",CZ:"CZK",IE:"EUR",NL:"EUR",HU:"HUF",NP:"NPR",MY:"MYR",SG:"SGD",TH:"THB",MM:"MMK",HK:"HKD",PH:"PHP",BT:"BTN",GE:"GEL",CL:"CLP",MX:"MXN",EC:"USD",VE:"VES",EG:"EGP",MA:"MAD",ZA:"ZAR",TZ:"TZS",SC:"SCR",NA:"NAD",IQ:"IQD",VA:"EUR",QA:"QAR",KE:"KES",BE:"EUR",DK:"DKK",PT:"EUR",TW:"TWD",IR:"IRR",PK:"PKR",PS:"ILS",CU:"CUP",CO:"COP",BW:"BWP",MG:"MGA",YE:"YER",GT:"GTQ",LK:"LKR",FO:"DKK",OTHER:"USD"};
let FX=ls.get("olam_fx",null);
async function loadFx(p){ const el=$("#fx"); if(!el) return; const pc=CUR[(p.cc||"").split("/")[0]], uc=CUR[U?.country||"UZ"]||"USD"; if(!pc||pc===uc){ el.remove(); return; }
  try{ if(!FX||Date.now()-FX.ts>12*3600e3){ const d=await (await fetch("https://open.er-api.com/v6/latest/USD")).json(); if(d.rates){ FX={ts:Date.now(),r:d.rates}; ls.set("olam_fx",FX); } }
    const a=FX?.r?.[pc], b=FX?.r?.[uc]; if(!a||!b||!$("#fx")) { $("#fx")?.remove(); return; }
    const v=b/a; const nf=new Intl.NumberFormat(LOC[LANG],{maximumFractionDigits:v<10?2:0});
    $("#fx").innerHTML=`<div class="sl">${t("cur_h")}</div><div class="fxr"><b>1 ${pc}</b><span>≈</span><b>${nf.format(v)} ${uc}</b></div><div class="fxr s"><span>100 ${uc} ≈ ${new Intl.NumberFormat(LOC[LANG],{maximumFractionDigits:2}).format(100/v)} ${pc}</span></div>`;
  }catch(e){ $("#fx")?.remove(); } }
const gmapsUrl=p=>p.lat!=null?`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lon}`:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.q||pN(p))}`;
const gdirUrl=p=>`https://www.google.com/maps/dir/?api=1${U?.lat!=null?`&origin=${U.lat},${U.lon}`:""}&destination=${p.lat!=null?p.lat+","+p.lon:encodeURIComponent(p.q||pN(p))}`;
/* joylashuvni aniqlash */
function locate(cb){ if(!navigator.geolocation){ toast(t("loc_no")); cb&&cb(false); return; }
  navigator.geolocation.getCurrentPosition(pos=>{ const la=+pos.coords.latitude.toFixed(4), lo=+pos.coords.longitude.toFixed(4);
    if(typeof obData==="object"&&$("#ob").classList.contains("on")){ obData.lat=la; obData.lon=lo; }
    if(U){ U.lat=la; U.lon=lo; if(!SITE||ls.get("olam_user",null)) ls.set("olam_user",U); }
    toast(t("loc_ok")); cb&&cb(true); },()=>{ toast(t("loc_den")); cb&&cb(false); },{enableHighAccuracy:false,timeout:12000,maximumAge:6e5}); }
const panoUrl=p=>p.lat!=null?`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${p.lat},${p.lon}`:`https://www.google.com/maps/search/${encodeURIComponent(p.q)}`;

/* ================= SAYOHATLARIM ================= */
const TRIPS=ls.get("olam_trips",[]);
const keepTrips=()=>ls.set("olam_trips",TRIPS);
function openTrips(){ const O=$("#tripv"); O.classList.add("on"); O.scrollTop=0; renderTrips(); }
function closeTrips(){ $("#tripv").classList.remove("on"); }
function renderTrips(){ $("#tripv").innerHTML=`<button class="ovx" onclick="closeTrips()">${ICON.down}</button><div class="seth"><h1>${t("trips")}</h1></div>
  <form class="cin" style="padding:6px 0 4px;background:none" onsubmit="event.preventDefault();tripNew($('#trn').value)"><input id="trn" maxlength="40" placeholder="${esc(t("trip_name_ph"))}"><button aria-label="${esc(t("create"))}">＋</button></form>
  ${TRIPS.length?TRIPS.map((tr,i)=>{ const ps=tr.ids.map(byId).filter(Boolean); return `<div class="sgrp"><div class="row" style="justify-content:space-between;align-items:center"><div class="sl" style="margin:0">${ICON.bag} ${esc(tr.name)}</div><small class="sp" style="margin:0">${t("trip_places",{n:ps.length})}</small></div>
    <div class="hs" style="padding:10px 0 4px">${ps.map(p=>`<div style="position:relative;flex:0 0 40%">${cardH(p,"sm")}<button class="hrt" style="z-index:3" onclick="event.stopPropagation();tripRm(${i},'${p.id}')">✕</button></div>`).join("")||`<p class="sp">${t("trip_empty")}</p>`}</div>
    <div class="row">${ps.length?`<button class="pill g" style="flex:1" onclick="tripPlan(${i})">${t("trip_plan")}</button>`:""}<button class="pill o2" onclick="tripDel(${i})" aria-label="delete">${ICON.trash}</button></div></div>`; }).join(""):`<div class="empty">${t("trip_empty")}</div>`}<div class="foot"></div>`; }
function tripNew(name,addId){ name=(name||"").trim()||t("t_trips")+" "+(TRIPS.length+1); TRIPS.push({name,ids:addId?[addId]:[]}); keepTrips(); if(addId){ toast(t("trip_added")); closeSheet(); } else renderTrips(); }
function tripRm(i,id){ TRIPS[i].ids=TRIPS[i].ids.filter(x=>x!==id); keepTrips(); renderTrips(); }
function tripDel(i){ TRIPS.splice(i,1); keepTrips(); renderTrips(); }
function tripPlan(i){ const ps=TRIPS[i].ids.map(byId).filter(Boolean); closeTrips(); openChat(); chatSend(t("trip_plan_q",{list:ps.map(p=>pN(p)+" ("+pCountry(p)+")").join(", ")})); }
function tripAdd(id){ const S=$("#sh"); S.dataset.k="trip"; S.classList.add("on");
  S.innerHTML=`<div class="shb" onclick="event.stopPropagation()"><div class="shh"><b>${t("trip_pick")}</b><button class="x" onclick="closeSheet()">${ICON.down}</button></div><div class="shl">
   ${TRIPS.map((tr,i)=>`<div class="trk"><span>${ICON.bag} ${esc(tr.name)} · ${tr.ids.length}</span><button onclick="${tr.ids.includes(id)?"":`TRIPS[${i}].ids.push('${id}');keepTrips();`}toast(t('trip_added'));closeSheet()">${tr.ids.includes(id)?"✓":"＋"}</button></div>`).join("")}
   <form class="cin" style="padding:6px 0 0;background:none" onsubmit="event.preventDefault();tripNew($('#trn2').value,'${id}')"><input id="trn2" maxlength="40" placeholder="${esc(t("trip_name_ph"))}"><button>＋</button></form></div></div>`; }
const dailyPlace=()=>{ const pool=PLACES.filter(p=>!p.dyn&&VID[p.id]?.length); const d=Math.floor(Date.now()/864e5); return pool[(d*7919)%pool.length]; };

/* ================= KASHF ET ================= */
const X={tag:"all",q:"",reg:"all"};
const matchX=p=>(X.tag==="all"||(X.tag==="wonder"?wondersOf(p.id).length>0:p.tags.includes(X.tag)))&&(X.reg==="all"||p.reg===X.reg);
function renderExplore(){
  const C=CAT(), R=REGN();
  $("#explore").innerHTML=`<div class="xhead"><div class="row" style="justify-content:space-between;align-items:center;margin-bottom:14px"><h1 style="margin:0">${t("exp_h")}</h1><div class="row"><button class="pill o2" onclick="openCats()" aria-label="${esc(t("cats_all"))}">${ICON.filter}</button><button class="pill g" onclick="openAdd()">＋</button></div></div><label class="search">${ICON.search}<input id="xq" placeholder="${esc(t("exp_ph"))}" value="${esc(X.q)}" oninput="X.q=this.value;renderMas()"></label></div>
   <div class="chips"><button class="chip ${X.tag==="all"?"on":""}" onclick="X.tag='all';renderExplore()">${t("all")}</button><button class="chip ${X.tag==="wonder"?"on":""}" onclick="X.tag='wonder';renderExplore()">${t("won_chip")}</button>${TAGS.map(k=>`<button class="chip ${X.tag===k?"on":""}" onclick="X.tag='${k}';renderExplore()">${C[k]}</button>`).join("")}</div>
   <div class="chips" style="padding-top:0"><button class="chip ${X.reg==="all"?"on":""}" onclick="X.reg='all';renderExplore()">${t("whole")}</button>${REGS.map(k=>`<button class="chip ${X.reg===k?"on":""}" onclick="X.reg='${k}';renderExplore()">${R[k]}</button>`).join("")}</div>
   <div class="ainote" style="margin-top:2px">${t("n_places",{n:forYou().filter(matchX).length})}</div>
   <div id="mas"></div><div id="wres"></div><div class="foot"></div>`;
  renderMas();
  const s=$("#explore .chips .chip.on"); if(s) s.scrollIntoView({inline:"center",block:"nearest"});
}
function renderMas(){
  const q=X.q.toLowerCase().trim();
  const l=forYou().filter(p=>matchX(p)&&(!q||[pN(p),p.n,p.c,p.t,pC(p)].join(" ").toLowerCase().includes(q)));
  const aiBtn=q?`<button class="aisearch" onclick="aiSearch()">${t("ai_search",{q:esc(X.q.trim())})}</button>`:"";
  $("#mas").innerHTML=(l.length?`<div class="grid2">${l.slice(0,q?60:400).map(gcard).join("")}</div>`:(q?"":`<div class="empty">${t("nothing")}</div>`))+aiBtn;
  clearTimeout(X.wt); const W2=$("#wres"); if(!W2) return;
  const qq=X.q.trim(); if(qq.length<2){ W2.innerHTML=""; return; }
  W2.innerHTML=`<div class="sec"><h2>${t("from_world")}<small>${t("searching",{q:esc(qq)})}</small></h2></div>`;
  X.wt=setTimeout(async()=>{ let r=[]; try{ r=await worldSearch(qq); }catch(e){}
    if(X.q.trim()!==qq||!$("#wres")) return;
    const ids=new Set(l.map(p=>p.id)); r=r.filter(p=>!ids.has(p.id));
    $("#wres").innerHTML=`<div class="sec"><h2>${t("from_world")}<small>${r.length?t("found",{n:r.length}):t("not_found")}</small></h2></div>${r.length?`<div class="grid2">${r.map(gcard).join("")}</div>`:""}`;
  },600);
}

/* ================= PROFIL ================= */
function renderProfile(){
  const C=CAT(), R=REGN(), PR=PER();
  const l=PLACES.filter(p=>saved.has(p.id));
  const w=taste(), tot=Object.values(w).reduce((a,b)=>a+b,0)||1, top=Object.entries(w).sort((a,b)=>b[1]-a[1]).slice(0,6), seen=Object.keys(LRN.v).length;
  const extra=[optTxt("sty",U?.style),optTxt("wth",U?.with),optTxt("sea",U?.season)].filter(Boolean).join(" · ");
  $("#profile").innerHTML=`<div class="prof"><button class="ibtn pset" aria-label="${esc(t("settings"))}" onclick="openSettings()">${ICON.gear}</button><div class="av">${esc((U?.name||"S")[0].toUpperCase())}</div><h1>${esc(U?.name||t("traveler"))}</h1>
     <p>${PIN}${esc(cname(U?.country||"UZ"))} · ${t("stats",{s:saved.size,l:liked.size})}</p>
     <div class="opts">${(U?.interests||[]).map(k=>`<span class="opt on">${C[k]||k}</span>`).join("")}${(U?.regions||[]).map(k=>`<span class="opt">${R[k]||k}</span>`).join("")}</div>
     <button class="reset" onclick="startOb()">${t("change_int")}</button> · <button class="reset" onclick="openSettings()">${t("settings")}</button></div>
   <div class="sec"><h2>${t("knows_h")}<small>${t("knows_sub")}</small></h2></div>
   <div class="taste"><div class="persona">${PR[top[0][0]]}</div><p>${t("seen",{n:seen})}${extra?" · "+extra:""}</p>
     ${top.map(([k,v])=>{ const pc=Math.round(v/tot*100); return `<div class="tb"><span>${C[k]}</span><i><b style="width:${pc}%"></b></i><em>${pc}%</em></div>`; }).join("")}
     <button class="ask" onclick="analyzeMe()">${t("analyze")}</button></div>
   <div class="sec"><h2>${t("trips")}</h2><span onclick="openTrips()">${TRIPS.length} →</span></div>
   <div class="sec" id="savedSec"><h2>${t("saved_h")}</h2><span>${l.length}</span></div>
   ${l.length?`<div class="grid2">${l.map(gcard).join("")}</div>`:`<div class="empty">${t("saved_empty")}</div>`}<div class="foot"></div>`;
}
function analyzeMe(){ openChat(); chatSend(t("analyze_q",{list:Object.entries(LRN.v).sort((a,b)=>b[1]-a[1]).slice(0,6).map(e=>byId(e[0])&&pN(byId(e[0]))).filter(Boolean).join(", ")||"—"})); }

/* ================= SOZLAMALAR ================= */
function openSettings(){ if(cur==="watch"&&!W.paused) wPause(); renderSettings(); $("#set").classList.add("on"); $("#set").scrollTop=0; }
function closeSettings(){ $("#set").classList.remove("on"); }
function seg(key,opts){ return `<div class="seg">${opts.map(([v,l])=>`<button class="${String(SET[key])===String(v)?"on":""}" onclick="setOpt('${key}',${typeof v==="string"?`'${v}'`:v})">${l}</button>`).join("")}</div>`; }
function renderSettings(){
  $("#set").innerHTML=`<button class="ovx" onclick="closeSettings()">${ICON.down}</button>
   <div class="seth"><h1>${t("set_h")}</h1></div>
   <div class="sgrp"><div class="sl">${t("s_lang")}</div><div class="langs">${LANGS.map(([k,n,f])=>`<button class="${LANG===k?"on":""}" onclick="setLang('${k}');renderSettings()">${n}</button>`).join("")}</div></div>
   <div class="sgrp"><div class="sl">${t("s_music")}</div>${seg("music",[[true,t("on")],[false,t("off")]])}<button class="pill o2 wide" style="margin-top:8px" onclick="openMusic()">${t("music_h")} · ${t("m_mine")}</button></div>
   <div class="sgrp"><div class="sl">${t("s_amb")}</div>${seg("amb",[[true,t("on")],[false,t("off")]])}<p class="sp" style="margin:8px 0 0">${t("amb_t")}</p></div>
   <div class="sgrp"><div class="sl">${t("s_notif")}</div><div class="seg"><button class="${SET.notif?"on":""}" onclick="notifToggle(true)">${t("on")}</button><button class="${SET.notif?"":"on"}" onclick="notifToggle(false)">${t("off")}</button></div><p class="sp" style="margin:8px 0 0">${t("notif_t")}</p></div>
   <div class="sgrp"><div class="sl">${t("s_off")}</div><p class="sp" style="margin:0">${t("off_t")}</p></div>
   <div class="sgrp"><div class="sl">${t("s_video")}</div>${seg("video",[[true,t("v_on")],[false,t("v_off")]])}</div>
   <div class="sgrp"><div class="sl">${t("cat_h")}</div><p class="sp" id="wcst">${catTxt()}</p><p class="sp" style="margin:0">${t("cat_t")}</p></div>
   <div class="sgrp"><div class="sl">${t("s_ui")}</div><div class="uipick">${[["white",t("ui_white")],["glass",t("ui_glass")]].map(([v,l])=>`<button class="${curUI()===v?"on":""} u-${v}" onclick="uiPick('${v}');renderSettings()"><i><b></b><b></b><b></b></i>${l}</button>`).join("")}</div><p class="sp" style="margin:10px 0 0">${t("ui_t")}</p></div>
   <div class="sgrp"><div class="sl">${t("s_theme")}</div>${seg("theme",[["auto",t("th_auto")],["light",t("th_light")],["dark",t("th_dark")]])}</div>
   <div class="sgrp"><div class="sl">${t("s_units")}</div>${seg("unit",[["km",t("u_km")],["mi",t("u_mi")]])}</div>
   <div class="sgrp"><div class="sl">${t("s_speed")}</div>${seg("speed",[[1,t("sp1")],[2,t("sp2")],[3,t("sp3")]])}</div>
   <div class="sgrp"><div class="sl">${t("loc_q")}</div><button class="locb ${U?.lat!=null?"on":""}" onclick="locate(()=>renderSettings())">${ICON.locate}<span>${U?.lat!=null?t("loc_ok")+" · "+U.lat+", "+U.lon:t("loc_b")}</span></button></div>
   <div class="sgrp"><div class="sl">${t("s_prof")}</div><p class="sp">${esc(U?.name||"")} · ${esc(cname(U?.country||"UZ"))}</p><button class="pill o2 wide" onclick="closeSettings();startOb()">${t("edit")}</button></div>
   <div class="sgrp"><div class="sl">${t("s_share")}</div><button class="pill o2 wide" onclick="shareApp()">${ICON.share} OLAM</button></div>${SITE?"":`<div class="sgrp"><a class="pill o2 wide" href="./">${t("open_site")}</a></div>`}
   <div class="sgrp"><div class="sl">${t("s_install")}</div><p class="sp">${t("install_t")}</p></div>
   <div class="sgrp"><div class="sl">${t("s_clear")}</div><div id="clr"><button class="pill o2 wide" onclick="askClear()">${t("clear_b")}</button></div></div>
   <div class="sgrp"><div class="sl">${t("s_about")}</div><p class="sp">${t("about_t")}</p><p class="sp">v3.0 · ${PLACES.filter(p=>!p.dyn||p.cat).length} ${t("places")}</p></div>
   <div class="foot"></div>`;
}
function setOpt(k,v){ SET[k]=v; saveSet();
  if(k==="theme") applyTheme(); if(k==="amb"&&!v) ambStop(); if(k==="music"){ v?mPlay():mPause(); } if(k==="video"){ PLACES.forEach(p=>{ p.video=undefined; }); }
  renderSettings(); }
const curUI=()=>SITE?(SET.sui||"glass"):(SET.ui||"white");
function applyUI(){ const R=document.documentElement; R.dataset.ui=curUI();
  if(curUI()==="glass"){ const p=dailyPlace()||PLACES.find(x=>x.img); const u=p&&p.img?big(p.img):""; R.style.setProperty("--uibg",u?`url("${u}")`:"none"); } }
function uiPick(v){ SET[SITE?"sui":"ui"]=v; saveSet(); applyUI(); applyTheme(); }
function applyTheme(){ const dark=(SITE&&curUI()==="glass")||SET.theme==="dark"||(SET.theme==="auto"&&matchMedia("(prefers-color-scheme: dark)").matches); document.documentElement.dataset.theme=dark?"dark":"light"; document.querySelector('meta[name=theme-color]')?.setAttribute("content",dark?"#0e1622":"#f4f8fd"); }
try{ matchMedia("(prefers-color-scheme: dark)").addEventListener("change",applyTheme); }catch(e){}
function setLang(k){ if(k===LANG) return; const oldCat=catLang(); LANG=k; if(oldCat!==catLang()||k==="uzk"||oldCat==="uz"){ catReset(); setTimeout(()=>catLoad(),400); } SET.lang=k; saveSet(); lzLoad(); applyLang(); toast(t("lang_set"));
  if(!$("#ob").classList.contains("on")){ render(cur==="watch"?"home":cur); if(cur==="watch") go("home"); }
  if(!(k==="uz"||k==="uzk")){ wikiNames(); aiTaglines(); } }
function applyLang(){ document.documentElement.lang=LOC[LANG]; document.documentElement.dir=LANG==="ar"?"rtl":"ltr";
  const NK={home:"nav_home",explore:"nav_exp",watch:"nav_watch",saved:"nav_saved",profile:"nav_prof",map:"t_map"};
  document.querySelectorAll(".nav button,.tlinks button").forEach(b=>{ const k=NK[b.dataset.v]; if(!k) return; const l=clean(t(k)); b.setAttribute("aria-label",l); const sp=b.querySelector("span"); if(sp) sp.textContent=l; else if(b.closest(".tlinks")) b.textContent=l; });
  document.querySelectorAll("[data-t]").forEach(e=>{ e.textContent=t(e.dataset.t); }); const lb=$("#tlang"); if(lb){ const L=LANGS.find(x=>x[0]===LANG); lb.innerHTML=catIcon("globe")+(LANG==="uzk"?"ЎЗ":LANG.toUpperCase()); } }
function askClear(){ $("#clr").innerHTML=`<p class="sp">${t("clear_q")}</p><div class="row"><button class="pill g" onclick="clearData()">${t("yes")}</button><button class="pill o2" onclick="renderSettings()">${t("no")}</button></div>`; }
function clearData(){ ["olam_saved","olam_liked","olam_learn","olam_aipick","olam_dyn"].forEach(k=>{ try{localStorage.removeItem(k)}catch(e){} }); saved.clear(); liked.clear(); LRN.t={}; LRN.r={}; LRN.v={}; AIP=null; toast(t("cleared")); renderSettings(); }
async function shareApp(){ const url=location.href.split("#")[0]; try{ if(navigator.share){ await navigator.share({title:"OLAM",text:t("ob_sub"),url}); return; } await navigator.clipboard.writeText(url); toast(t("copied")); }catch(e){} }

/* ================= TOMOSHA ================= */
const W={list:[],i:0,t:null,paused:false,dur:9000,start:0,left:0};
const SPD=()=>({1:12000,2:9000,3:6500})[SET.speed]||9000;
function renderWatch(startId){
  W.list=forYou(); if(startId){ const i=W.list.findIndex(p=>p.id===startId); if(i>=0) W.list.unshift(...W.list.splice(i,1)); else if(byId(startId)) W.list.unshift(byId(startId)); } W.i=0;
  $("#watch").innerHTML=`<div class="layer" id="la"></div><div class="layer" id="lb"></div><video id="wv" playsinline muted loop></video><div class="wshade"></div>
   <div class="wbar"><i id="wbi"></i></div>
   <div class="wtop"><div class="brand">OLAM</div><div class="wnext" id="wn"></div><button class="ib" onclick="openMusic()" id="wm" aria-label="Music"></button></div>
   <div class="wtap" id="wtap"></div><div class="paused" id="wp"><div>${ICON.pause}</div></div><div class="hint" id="wh">${t("hint")}</div>
   <div class="wtxt" id="wt"></div><div class="wfact" id="wf"></div>
   <div class="wside"><button class="spk" onclick="const p=W.list[W.i];speak(pN(p)+'. '+pS(p)+' '+(pDesc(p)||''),this)" aria-label="${esc(t("listen"))}">${ICON.sound}</button><button onclick="wFact()" aria-label="AI">${ICON.spark}</button><button id="wl" onclick="wLike()">${ICON.heart}</button><button class="sv" id="ws" onclick="wSave()">${ICON.save}</button>
     <button onclick="openComments(W.list[W.i].id)" aria-label="${esc(t("cm_h"))}">${ICON.chat}</button><button onclick="openPlace(W.list[W.i].id)">${ICON.info}</button><button onclick="share(W.list[W.i].id)">${ICON.share}</button></div>`;
  const tap=$("#wtap"); let y0=null,x0=null;
  tap.onclick=e=>{ const r=tap.getBoundingClientRect(); let x=(e.clientX-r.left)/r.width; if(LANG==="ar") x=1-x; x<.3?wGo(-1):x>.7?wGo(1):wPause(); };
  tap.ontouchstart=e=>{ y0=e.touches[0].clientY; x0=e.touches[0].clientX; };
  tap.ontouchend=e=>{ if(y0==null) return; const dy=e.changedTouches[0].clientY-y0, dx=e.changedTouches[0].clientX-x0; if(Math.abs(dy)>60&&Math.abs(dy)>Math.abs(dx)){ e.preventDefault(); wGo(dy<0?1:-1); } y0=null; };
  $("#wh").classList.add("on"); setTimeout(()=>$("#wh")?.classList.remove("on"),2500);
  mBtn(); mPlay(); wShow();
}
function wShow(){
  const p=W.list[W.i]; const a=$("#la"), b=$("#lb"); if(!a) return; W.shown=Date.now(); clearInterval(W.gt);
  const v=$("#wv"); v.classList.remove("on"); $("#watch")?.classList.remove("vfit"); v.pause(); v.removeAttribute("src"); v.load();
  const put=u=>{ const A=$("#la"),B=$("#lb"); if(!A) return; const [on,off]=A.classList.contains("on")?[B,A]:[A,B]; on.style.backgroundImage=u?`url("${u}"), ${grad(p)}`:grad(p); on.classList.remove("kb"); void on.offsetWidth; on.classList.add("on","kb"); off.classList.remove("on"); setTimeout(()=>off.classList.remove("kb"),1300); };
  if(p.img){ const im=new Image(); im.onload=()=>put(big(p.img)); im.onerror=()=>put(p.img); im.src=big(p.img); } else put(null);
  $("#wf")?.classList.remove("on");
  const tx=$("#wt"); tx.classList.remove("in"); void tx.offsetWidth; const d=dist(p);
  tx.innerHTML=`<div class="kicker">${esc(pC(p))}${d!=null?" · "+km(d):""}</div><h2>${esc(pN(p))}</h2><p>${esc(pS(p))}</p>`; tx.classList.add("in");
  $("#wl").classList.toggle("on",liked.has(p.id)); $("#ws").classList.toggle("on",saved.has(p.id));
  W.dur=SPD(); wTimer(W.dur); ambStart(ambKind(p)); if(window.speechSynthesis?.speaking) speechSynthesis.cancel();
  const id=p.id;
  loadVideo(p).then(src=>{ if(W.list[W.i]?.id!==id||cur!=="watch") return;
    if(!src){ // video yo'q: galereya rasmlari almashib turadi
      loadGallery(p).then(g=>{ if(W.list[W.i]?.id!==id||g.length<2) return; let k=0; clearInterval(W.gt); W.gt=setInterval(()=>{ if(W.paused||W.list[W.i]?.id!==id) return; k=(k+1)%g.length; const im=new Image(); im.onload=()=>put(g[k]); im.src=g[k]; },Math.max(3000,W.dur/3)); });
      return; }
    v.src=src; v.muted=true;
    v.onloadedmetadata=()=>{ if(v.duration>14) v.currentTime=Math.random()*(v.duration-12); };
    v.onplaying=()=>{ if(W.list[W.i]?.id!==id||v.classList.contains("on")) return; $("#watch")?.classList.toggle("vfit",v.videoHeight>v.videoWidth*1.1&&innerWidth>innerHeight*1.1); v.classList.add("on"); W.dur=Math.max(SPD()-2000,Math.min(SPD()+2000,(v.duration||10)*1000)); wTimer(W.dur); };
    v.onerror=()=>{ if(p.vlist&&p.vlist.length>1){ p.vlist=p.vlist.filter(x=>x!==v.src); p.video=p.vlist[0]; } };
    if(!W.paused) v.play().catch(()=>{}); });
  const n=W.list[(W.i+1)%W.list.length]; const wn=$("#wn"); if(wn) wn.innerHTML=`${t("next_l")} <b>${esc(pN(n))}</b>`; if(n.img){ const im=new Image(); im.src=big(n.img); } loadVideo(n);
}
function wTimer(ms){ clearTimeout(W.t); const bar=$("#wbi"); if(!bar) return; W.start=Date.now(); W.left=ms;
  bar.style.transition="none"; bar.style.width="0"; void bar.offsetWidth; if(W.paused) return;
  bar.style.transition=`width ${ms}ms linear`; bar.style.width="100%"; W.t=setTimeout(()=>wGo(1),ms); }
function wGo(d){ const dt=Date.now()-(W.shown||0), sid=W.list[W.i]?.id; if(sid) learn(sid,dt>7000?1.5:dt<2500?-0.7:0.3); W.i=(W.i+d+W.list.length)%W.list.length; const p=W.list[W.i]; if(p.vlist&&p.vlist.length>1) p.video=p.vlist[Math.floor(Math.random()*p.vlist.length)]; W.paused=false; $("#wp")?.classList.remove("on"); wShow(); }
function wPause(){ const bar=$("#wbi"), v=$("#wv"); if(!bar) return; W.paused=!W.paused; $("#wp").classList.toggle("on",W.paused);
  if(W.paused){ clearTimeout(W.t); const done=Date.now()-W.start; W.left=Math.max(500,W.left-done); bar.style.width=getComputedStyle(bar).width; bar.style.transition="none"; v.pause(); }
  else { bar.style.transition=`width ${W.left}ms linear`; bar.style.width="100%"; W.start=Date.now(); W.t=setTimeout(()=>wGo(1),W.left); if(v.getAttribute("src")) v.play().catch(()=>{}); } }
function wStop(){ ambStop(); try{ speechSynthesis.cancel(); }catch(e){} clearTimeout(W.t); clearInterval(W.gt); const v=$("#wv"); if(v) v.pause(); mPause(); }
function wLike(){ const id=W.list[W.i].id; liked.has(id)?liked.delete(id):(liked.add(id),learn(id,3)); keep(); $("#wl").classList.toggle("on",liked.has(id)); }
function wSave(){ save(W.list[W.i].id); $("#ws").classList.toggle("on",saved.has(W.list[W.i].id)); }
document.addEventListener("keydown",e=>{ if(cur!=="watch"||$("#detail").classList.contains("on")||$("#chat").classList.contains("on")) return;
  if(e.key==="ArrowRight"||e.key==="ArrowDown") wGo(1); if(e.key==="ArrowLeft"||e.key==="ArrowUp") wGo(-1); if(e.key===" "){ e.preventDefault(); wPause(); } });
document.addEventListener("visibilitychange",()=>{ if(document.hidden&&cur==="watch"&&!W.paused) wPause(); if(document.hidden) BGM.pause(); });

/* ================= JOY SAHIFASI ================= */
async function openPlace(id){
  const p=byId(id), DD=$("#detail"); if(!p) return; dynKeep(p); learn(id,1);
  if(cur==="watch"&&!W.paused) wPause();
  const others=PLACES.filter(x=>x.id!==id&&(!x.dyn||x.keep)).map(x=>({x,s:x.tags.filter(y=>p.tags.includes(y)).length*2+(x.reg===p.reg?1:0)+score(x)/10})).sort((a,b)=>b.s-a.s).slice(0,10).map(o=>o.x);
  const C=CAT(), R=REGN(), WN=tl("won"), desc=pDesc(p);
  DD.innerHTML=`<div class="dg"><div class="gal" id="gal">${ph(p,"","",true)}</div>
     <button class="x" onclick="closePlace()">${ICON.down}</button><div class="cnt" id="gc" style="display:none"></div></div>
   <div class="dt">${p.user?`<div class="wbadge">${t("ap_user")}</div>`:""}${wondersOf(p.id).map(w=>`<div class="wbadge">${WN[w][0]}</div>`).join("")}<div class="kicker">${p.tags.map(x=>C[x]?clean(C[x]):"").filter(Boolean).join(" · ")}</div><h1>${esc(pN(p))}</h1><div class="loc"><span>${PIN}${esc(pC(p))}</span><span class="r">${rate(p)}</span></div></div>
   <div class="db">
     <div class="row"><button class="pill g" onclick="closePlace();go('watch','${p.id}')">${ICON.play} ${t("b_watch")}</button>
       <button class="pill o" onclick="closePlace();openMap('${p.id}')">${ICON.pin}<span>${clean(t("b_map"))}</span></button>
       <button class="pill o" onclick="tripAdd('${p.id}')" aria-label="${esc(t("trip_add"))}">${ICON.bag}</button>
       <button class="pill o sv ${saved.has(p.id)?"on":""}" onclick="save('${p.id}');this.classList.toggle('on',saved.has('${p.id}'));this.querySelector('span').textContent=clean(saved.has('${p.id}')?t('b_saved'):t('b_save'))">${ICON.save}<span>${clean(saved.has(p.id)?t("b_saved"):t("b_save"))}</span></button></div>
     <button class="ask" onclick="openChat('${p.id}')">${ICON.spark}<span>${clean(t("ask_guide"))}</span></button>
     <button class="pill o2" style="width:100%;margin-top:8px" onclick="openComments('${p.id}')">${ICON.chat}<span>${clean(t("cm_btn"))}</span></button>
     <div class="aibar">${tl("aiq").map((q,i)=>`<button onclick="aiAsk('${p.id}',${i})">${ICON.spark}${esc(clean(q[0]))}</button>`).join("")}</div>
     <div class="tagline">${esc(pS(p))}</div>
     <div class="facts"><div>${t("best_time")}<b>${bestTxt(p.best)}</b></div><div>${t("from_you")}<b>${km(dist(p))}</b></div><div>${t("region")}<b>${clean(R[p.reg])}</b></div></div>
     <div id="pvid"></div>
     <div class="sgrp wxb" id="wx"><div class="sl">${t("wx_h")}</div><div class="sp">…</div></div><div class="sgrp" id="fx"></div>
     <div class="gmap"><a class="pill gm" href="${gmapsUrl(p)}" target="_blank" rel="noopener">${ICON.pin}<span>${t("gm_open")}</span></a><a class="pill gm g2" href="${gdirUrl(p)}" target="_blank" rel="noopener">${ICON.route}<span>${t("gm_dir")}</span></a></div>
     <a class="pill o2 wide" style="margin-top:8px" href="${panoUrl(p)}" target="_blank" rel="noopener">${ICON.eye}<span>${clean(t("pano"))} · Google Maps</span></a>
     <div class="sec" style="padding:14px 0 8px"><h2>${t("about_h")}</h2><span class="spk" onclick="speak(pN(byId('${p.id}'))+'. '+($('#pdesc')?.textContent||''),this)">${t("listen")}</span></div>
     <div class="wiki" id="pdesc">${desc?esc(desc):t("translating")}</div>
     ${p.wurl?`<div class="wiki"><small><a href="${p.wurl}" target="_blank" rel="noopener">${t("more_wiki")} ↗</a></small></div>`:""}
     <button class="pill o2" style="width:100%;margin-top:12px" onclick="openChat('${p.id}');chatSend(t('explain_q',{p:pN(byId('${p.id}'))}))">${t("explain")}</button>
   </div>
   <div class="sec"><h2>${t("others_h")}<small>${t("may_like")}</small></h2></div>
   ${others.map(o=>{ const s=pS(o); return `<div class="rec" onclick="openPlace('${o.id}')">${ph(o)}<div><b>${esc(pN(o))}</b><small>${esc(pCountry(o))}<br>${esc(s.length>60?s.slice(0,58)+"…":s)}</small></div></div>`; }).join("")}
   <div class="foot"></div>`;
  DD.classList.add("on"); DD.scrollTop=0;
  if(!desc) fillDesc(p); loadWx(p); loadFx(p); loadPVids(p);
  const g=await loadGallery(p);
  if(g.length>1&&DD.classList.contains("on")&&$("#gal")&&pN(p)===$("#detail h1")?.textContent){
    $("#gal").innerHTML=g.map((u,i)=>`<div class="ph" style="background:${grad(p)}"><img src="${big(u)}" alt="" ${i?'loading="lazy"':""} decoding="async" onerror="${FB}"></div>`).join("");
    const gc=$("#gc"); gc.style.display=""; gc.textContent=`1 / ${g.length}`;
    $("#gal").onscroll=e=>{ gc.textContent=`${Math.round(Math.abs(e.target.scrollLeft)/e.target.clientWidth)+1} / ${g.length}`; };
  }
}
async function loadPVids(p){ const box=$("#pvid"); if(!box||!SET.video) return; const id=p.id;
  await loadVideo(p); const l=[...new Set((VID[p.id]||[]).map(pexels).concat(p.vlist||[]))].slice(0,3);
  if(!l.length||$("#detail h1")?.textContent!==pN(p)||!$("#pvid")) return;
  $("#pvid").innerHTML=`<div class="sl" style="margin-top:18px">${t("videos_h")} · ${l.length}</div><div class="pvids">${l.map(u=>`<video src="${u}" muted playsinline loop preload="metadata" controls onmouseenter="this.play().catch(()=>{})" onmouseleave="this.pause()"></video>`).join("")}</div>`; }
async function fillDesc(p){
  const lang=LANG; let txt="";
  try{ // mahalliy Wikipedia
    const title=p.wt?.[WL(lang)]||(lang==="en"?(p.nt||p.t).replace(/_/g," "):LZ[p.id]?.lt);
    if(title){ const d=await (await fetch(`https://${WL(lang)}.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=extracts&exintro=1&explaintext=1&exsentences=5${lang==="zh"?"&variant=zh-cn":""}&titles=`+encodeURIComponent(title))).json();
      txt=Object.values(d.query?.pages||{})[0]?.extract||""; }
  }catch(e){}
  if(!txt&&p.wt?.en&&lang!=="en"){ try{ const d=await (await fetch("https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=extracts&exintro=1&explaintext=1&exsentences=5&titles="+encodeURIComponent(p.wt.en))).json(); const en=Object.values(d.query?.pages||{})[0]?.extract||""; if(en){ try{ txt=await aiTranslate(en); }catch(e){} if(!txt) txt=en; } }catch(e){} }
  if(!txt&&DESC[p.id]){ try{ txt=await aiTranslate(DESC[p.id]); }catch(e){} }
  if(!txt) txt=DESC[p.id]||"";
  if(lang!==LANG) return; LZ[p.id]=LZ[p.id]||{}; LZ[p.id].x=txt; ls.set("olam_lz_"+LANG,LZ);
  const el=$("#pdesc"); if(el&&$("#detail").classList.contains("on")&&$("#detail h1")?.textContent===pN(p)) el.textContent=txt;
}
function closePlace(){ $("#detail").classList.remove("on"); }

/* ================= OLAM GID (AI chat) ================= */
const GID_URL="https://olam-gid.behruzbekhasanboyev31.workers.dev";
const CH={place:null,msgs:[],busy:false};
function openChat(id){
  if(cur==="watch"&&!W.paused) wPause();
  if(CH.place!==(id||null)){ CH.place=id||null; CH.msgs=[]; }
  const p=id?byId(id):null; const sug=p?tl("sg_p"):tl("sg_g");
  const vp=p&&VID[p.id]?.length?p:forYou().find(x=>VID[x.id]?.length);
  $("#chat").innerHTML=`<div class="chh"><button class="x" onclick="closeChat()">${ICON.down}</button>
     <div><b>${t("guide")}</b><small>${p?esc(t("about_p",{p:pN(p)})):t("any_q")}</small></div></div>
   ${vp&&SET.video?`<div class="chv"><video src="${pexels(VID[vp.id][0])}" autoplay muted loop playsinline></video><div class="chvt">${PIN}${esc(pN(vp))}</div></div>`:""}
   <div class="msgs" id="msgs"></div>
   <div class="sugg">${sug.map(s=>`<button onclick="chatSend(this.textContent)">${esc(s)}</button>`).join("")}</div>
   <form class="cin" onsubmit="event.preventDefault();chatSend($('#cq').value)"><input id="cq" placeholder="${esc(t("ask_ph"))}" autocomplete="off"><button aria-label="${esc(t("send"))}">↑</button></form>`;
  $("#chat").classList.add("on"); drawMsgs();
}
function closeChat(){ $("#chat").classList.remove("on"); }
function drawMsgs(){
  const box=$("#msgs"); if(!box) return; const p=CH.place?byId(CH.place):null; const name=U?.name||t("friend");
  box.innerHTML=`<div class="m a">${esc(p?t("hi_p",{name,p:pN(p)}):t("hi_g",{name}))}</div>`+CH.msgs.map((m,i)=>`<div class="m ${m.role==="user"?"u":"a"}">${esc(m.text)}${m.role!=="user"?`<button class="spk mspk" onclick="speak(CH.msgs[${i}].text,this)" aria-label="${esc(t("listen"))}">${ICON.sound}</button>`:""}</div>`+(m.role!=="user"?placeCards(m.text):"")).join("")+(CH.busy?`<div class="m a t">${t("typing")}</div>`:"");
  box.scrollTop=box.scrollHeight;
}
function placeCards(text){ const low=" "+String(text).toLowerCase()+" "; const out=[];
  for(const p of PLACES){ if(p.dyn&&!p.keep) continue; const ns=[pN(p),p.n,(p.nt||p.t).replace(/_/g," ").replace(/\s*\(.*?\)/g,""),LZ[p.id]?.n].filter(x=>x&&x.length>=4).map(x=>x.toLowerCase());
    if(ns.some(n=>low.includes(n))&&!out.includes(p)) out.push(p); if(out.length>=4) break; }
  return out.length?`<div class="pcards">${out.map(p=>`<div class="pcard" onclick="closeChat();openPlace('${p.id}')">${ph(p)}<div><b>${esc(pN(p))}</b><small>${t("open_app")}</small></div></div>`).join("")}</div>`:""; }
const reqUser=()=>({name:U?.name,country:cname(U?.country||"UZ"),interests:userCtx()});
async function chatSend(text){
  text=(text||"").trim(); if(!text||CH.busy) return;
  const inp=$("#cq"); if(inp) inp.value="";
  CH.msgs.push({role:"user",text}); CH.busy=true; drawMsgs(); if(CH.place) learn(CH.place,2);
  let ans;
  try{ const p=CH.place?byId(CH.place):null;
    const r=await fetch(GID_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:CH.msgs.slice(-10),lang:LANG,place:p?`${pN(p)} (${p.n}, ${pC(p)})`:"",user:reqUser()})});
    ans=(await r.json()).text||t("no_ans");
  }catch(e){ ans=t("net_err"); }
  CH.msgs.push({role:"model",text:ans}); CH.busy=false; drawMsgs();
}

/* ================= AI HAMMA JOYDA ================= */
async function ai(prompt,place){
  const r=await fetch(GID_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[{role:"user",text:prompt}],lang:LANG,place:place||"",user:reqUser()})});
  return (await r.json()).text||"";
}
const LIST=()=>PLACES.filter(p=>!p.dyn).map(p=>`${p.id}=${(p.nt||p.t).replace(/_/g," ")}`).join("; ");
const cleanId=s=>String(s||"").toLowerCase().replace(/[^a-z0-9]/g,"");
const idsFrom=x=>{ const out=[]; (String(x).toLowerCase().match(/[a-z0-9]+/g)||[]).forEach(w=>{ if(byId(w)&&!out.includes(w)) out.push(w); }); return out; };
let AIP=null, AIPP=null;
async function fillAIPicks(){
  const box=$("#aipick"); if(!box) return;
  const key=new Date().toISOString().slice(0,10)+"|"+LANG+"|"+topTags(3).join()+"|"+(U?.regions||[]).join()+"|"+(U?.dream||"");
  if(AIP&&AIP.key!==key) AIP=null;
  if(!AIP){ const c=ls.get("olam_aipick",null); if(c&&c.key===key) AIP=c; }
  if(!AIP){ if(!AIPP) AIPP=(async()=>{ try{
      const x=await ai(`Pick the 3 places from this list that suit me best. Write each on its own line exactly as: id | why it suits me (one short sentence in my language). Nothing else. List: ${LIST()}`);
      const items=x.split("\n").map(l=>l.split("|")).filter(a=>a.length>=2&&byId(cleanId(a[0]))).slice(0,3).map(a=>({id:cleanId(a[0]),why:a.slice(1).join(" ").replace(/\*/g,"").trim()}));
      if(items.length){ AIP={key,items}; ls.set("olam_aipick",AIP); }
    }catch(e){} AIPP=null; })(); await AIPP; }
  const b=$("#aipick"); if(!b) return;
  if(!AIP){ $("#aisec")?.remove(); b.remove(); return; }
  b.innerHTML=AIP.items.map(x=>{ const p=byId(x.id); return `<div class="it" onclick="openPlace('${p.id}')">${ph(p)}<div><b>${esc(pN(p))}</b><small>${esc(x.why)}</small></div></div>`; }).join("");
}
function aiAsk(id,i){ const p=byId(id); openChat(id); chatSend(tl("aiq")[i][1].split("{p}").join(pN(p))); }
async function wFact(){
  const p=W.list[W.i], el=$("#wf"); if(!el) return;
  if(el.classList.contains("on")&&el.dataset.id===p.id){ el.classList.remove("on"); return; }
  el.dataset.id=p.id; el.classList.add("on"); if(!W.paused) wPause();
  const k="fact_"+LANG; if(p[k]){ el.textContent=p[k]; return; }
  el.textContent=t("thinking");
  try{ p[k]=(await ai(t("fact_q",{p:pN(p)}),`${pN(p)} (${pC(p)})`)).trim(); }catch(e){ p[k]=""; }
  if(el.dataset.id===p.id) el.textContent=p[k]?p[k]:t("ai_fail");
}
async function aiSearch(){
  const q=X.q.trim(); if(!q) return;
  $("#mas").innerHTML=`<div class="empty">${t("ai_searching",{q:esc(q)})}</div>`;
  let ids=[]; try{ ids=idsFrom(await ai(`User request: "${q}". From the list, write only the ids (comma separated) of up to 8 places that best match the request. Nothing else. List: ${LIST()}`)); }catch(e){}
  const l=ids.map(byId).filter(Boolean);
  $("#mas").innerHTML=l.length?`<div class="ainote">${t("ai_chose",{q:esc(q)})}</div><div class="grid2">${l.map(gcard).join("")}</div>`:`<div class="empty">${t("ai_none")}</div>`;
}

/* ================= XARITA ================= */
let MAP=null;
function loadLeaflet(){ return new Promise((res,rej)=>{ if(window.L&&window.L.map) return res();
  const l=document.createElement("link"); l.rel="stylesheet"; l.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.appendChild(l);
  const sc=document.createElement("script"); sc.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"; sc.onload=()=>res(); sc.onerror=rej; document.head.appendChild(sc); }); }
const thumb=(p,w=120)=>p.img?p.img.replace(/\/\d+px-/,"/"+w+"px-").replace(/([?&]width=)\d+/,"$1"+w):"";
async function openMap(focus){
  const O=$("#mapv"); O.classList.add("on");
  if(!O.innerHTML||O.dataset.l!==LANG){ if(MAP){ MAP.remove(); MAP=null; } O.dataset.l=LANG;
    O.innerHTML=`<div id="mapc"></div><button class="ovx" onclick="closeMap()">${ICON.down}</button><div class="maptitle">${t("map_h")}<small id="maphint">${t("zoom")}</small></div><div class="mapcard" id="mapcard"></div>`; }
  try{ await loadLeaflet(); }catch(e){ $("#mapc").innerHTML=`<div class="empty">${t("map_fail")}</div>`; return; }
  const Lf=window.L;
  if(!MAP){
    MAP=Lf.map("mapc",{zoomControl:false,worldCopyJump:true,minZoom:2}).setView([30,40],2);
    Lf.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{attribution:'&copy; OpenStreetMap, &copy; CARTO',subdomains:"abcd",maxZoom:18}).addTo(MAP);
    const setZ=()=>{ $("#mapc").dataset.z=Math.min(6,MAP.getZoom()); }; MAP.on("zoomend",setZ); setZ();
    MAP._mk=new Set();
    MAP.addPin=p=>{ if(p.lat==null||MAP._mk.has(p.id)) return; MAP._mk.add(p.id);
      const ic=Lf.divIcon({className:"",html:`<div class="mkw"><div class="mk ${p.dyn?"dy":""}" style="background:${grad(p)}">${p.img?`<img src="${thumb(p)}" alt="" loading="lazy" onerror="this.remove()">`:""}</div></div>`,iconSize:[44,44],iconAnchor:[22,22]});
      Lf.marker([p.lat,p.lon],{icon:ic}).addTo(MAP).on("click",()=>mapPick(p.id)); };
    PLACES.filter(p=>!p.dyn||(p.keep&&!p.cat)||(p.cat&&p.sl>=70)).forEach(MAP.addPin);
    let nt; MAP.on("moveend",()=>{ clearTimeout(nt); const z=MAP.getZoom(), hint=$("#maphint"); if(z>=4){ const bb=MAP.getBounds(); PLACES.filter(p=>p.cat&&!MAP._mk.has(p.id)&&bb.contains([p.lat,p.lon])).slice(0,300).forEach(MAP.addPin); }
      if(z<9){ if(hint) hint.textContent=t("zoom"); return; }
      if(hint) hint.textContent=t("area_load");
      nt=setTimeout(async()=>{ const c=MAP.getCenter(); let r=[]; try{ r=await worldNear(c.lat.toFixed(4),c.lng.toFixed(4)); }catch(e){} r.forEach(MAP.addPin); if(hint) hint.textContent=r.length?t("area_n",{n:r.length}):t("area_0"); },500); });
  }
  setTimeout(()=>MAP.invalidateSize(),60);
  if(focus){ const p=byId(focus); if(p?.lat!=null){ MAP.setView([p.lat,p.lon],6); mapPick(focus); } }
}
function mapPick(id){ const p=byId(id), c=$("#mapcard"); learn(id,0.5);
  c.innerHTML=`${ph(p,"mci")}<div class="mct"><b>${esc(pN(p))}</b><small>${PIN}${esc(pCountry(p))} · ${km(dist(p))}</small><p>${esc(pS(p))}</p>
    <div class="row"><button class="pill g" onclick="openPlace('${p.id}')">${t("details")}</button><button class="pill o2" onclick="closeMap();go('watch','${p.id}')">${ICON.play} ${t("b_watch")}</button></div></div>`;
  c.classList.add("on"); }
function closeMap(){ $("#mapv").classList.remove("on"); }

/* ================= O'YIN ================= */
const QZ={score:0,n:0,best:ls.get("olam_best",0),p:null,done:false};
const shuffle=a=>{ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
function openQuiz(){ QZ.score=0; QZ.n=0; $("#quiz").classList.add("on"); qNext(); }
function closeQuiz(){ $("#quiz").classList.remove("on"); clearTimeout(QZ.t); }
function qNext(){
  const pool=PLACES.filter(p=>p.img&&(!p.dyn||p.cat));
  if(pool.length<4){ $("#quiz").innerHTML=`<button class="ovx" onclick="closeQuiz()">${ICON.down}</button><div class="empty">${t("img_load")}</div>`; clearTimeout(QZ.t); QZ.t=setTimeout(()=>{ if($("#quiz").classList.contains("on")) qNext(); },1500); return; }
  const p=pool[Math.floor(Math.random()*pool.length)]; QZ.p=p; QZ.done=false; QZ.n++;
  const opts=shuffle([p,...shuffle(pool.filter(x=>x.id!==p.id)).slice(0,3)]);
  $("#quiz").innerHTML=`<button class="ovx" onclick="closeQuiz()">${ICON.down}</button>
   <div class="qhead"><b>${t("quiz_h")}</b><span>${t("score")}: <b>${QZ.score}</b> · ${t("record")}: ${QZ.best}</span></div>
   <div class="qimg ph" style="background:${grad(p)}"><img src="${big(p.img)}" alt="" onerror="${FB}"><div class="qn">${t("q_n",{n:QZ.n})}</div></div>
   <div class="qopts">${opts.map(o=>`<button class="qo" data-id="${o.id}" onclick="qAns('${o.id}',this)"><b>${esc(pN(o))}</b><small>${esc(pCountry(o))}</small></button>`).join("")}</div>
   <div class="qres" id="qres"></div>`;
}
function qAns(id,btn){
  if(QZ.done||!QZ.p) return; QZ.done=true; const p=QZ.p, ok=id===p.id;
  document.querySelectorAll(".qo").forEach(b=>{ if(b.dataset.id===p.id) b.classList.add("ok"); });
  if(ok){ QZ.score++; if(QZ.score>QZ.best){ QZ.best=QZ.score; ls.set("olam_best",QZ.score); } } else btn.classList.add("bad");
  learn(p.id,0.5);
  $("#qres").innerHTML=`<div class="qmsg ${ok?"ok":"bad"}">${ok?t("ok"):t("bad",{p:esc(pN(p))})}</div><p>${esc(pS(p))}</p>
   <div class="row"><button class="pill g" onclick="qNext()">${t("next_q")}</button><button class="pill o2" onclick="openPlace('${p.id}')">${t("details")}</button></div>`;
  $(".qhead span").innerHTML=`${t("score")}: <b>${QZ.score}</b> · ${t("record")}: ${QZ.best}`;
}

/* ================= UMUMIY ================= */
function render(v,arg){ ({home:renderHome,explore:renderExplore,profile:renderProfile,watch:()=>renderWatch(arg)})[v](); }
function go(v,arg){
  if(cur==="watch"&&v!=="watch") wStop();
  cur=v; closePlace(); closeMap(); closeQuiz(); closeSettings(); closeCats(); closeAdd(); closeSheet(); closeTrips();
  document.querySelectorAll(".view").forEach(x=>x.classList.toggle("on",x.id===v));
  document.body.dataset.v=v; closeCountry(); document.querySelectorAll(".nav button,.tlinks button").forEach(b=>b.classList.toggle("on",b.dataset.v===(arg==="saved"?"saved":v)));
  render(v,v==="watch"?arg:undefined);
  const el=$("#"+v); el.scrollTop=0;
  if(arg==="saved") setTimeout(()=>{ const s=$("#savedSec"); if(s) el.scrollTop=s.offsetTop-10; },0);
}
function save(id){ saved.has(id)?saved.delete(id):(saved.add(id),learn(id,4)); keep(); toast(saved.has(id)?t("added"):t("removed")); }
async function share(id){ const p=byId(id), text=t("share_t",{p:pN(p),c:pCountry(p),s:pS(p)});
  try{ if(navigator.share){ await navigator.share({title:pN(p),text,url:location.href.split("#")[0]}); return; } await navigator.clipboard.writeText(text); toast(t("copied")); }catch(e){} }
function toast(x){ const el=$("#toast"); el.textContent=x; el.classList.add("on"); clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove("on"),2000); }

/* ================= DAVLATLAR (Wikidata — har bir davlatdagi barcha diqqatga sazovor joylar) ================= */
// [ISO kod, Wikidata QID, mintaqa]
const CTRY=[["UZ","Q265","uz"],["KZ","Q232","osiyo"],["KG","Q813","osiyo"],["TJ","Q863","osiyo"],["TM","Q874","osiyo"],["TR","Q43","osiyo"],["AE","Q878","osiyo"],["SA","Q851","osiyo"],["AZ","Q227","osiyo"],["GE","Q230","osiyo"],["AM","Q399","osiyo"],["RU","Q159","yevropa"],
 ["CN","Q148","osiyo"],["JP","Q17","osiyo"],["KR","Q884","osiyo"],["IN","Q668","osiyo"],["TH","Q869","osiyo"],["VN","Q881","osiyo"],["ID","Q252","osiyo"],["MY","Q833","osiyo"],["SG","Q334","osiyo"],["PH","Q928","osiyo"],["NP","Q837","osiyo"],["LK","Q854","osiyo"],["MV","Q826","osiyo"],["PK","Q843","osiyo"],["IR","Q794","osiyo"],["JO","Q810","osiyo"],["OM","Q842","osiyo"],["QA","Q846","osiyo"],["MN","Q711","osiyo"],["KH","Q424","osiyo"],["LA","Q819","osiyo"],["BT","Q917","osiyo"],
 ["EG","Q79","afrika"],["MA","Q1028","afrika"],["TN","Q948","afrika"],["ZA","Q258","afrika"],["KE","Q114","afrika"],["TZ","Q924","afrika"],
 ["FR","Q142","yevropa"],["IT","Q38","yevropa"],["ES","Q29","yevropa"],["DE","Q183","yevropa"],["GB","Q145","yevropa"],["PT","Q45","yevropa"],["GR","Q41","yevropa"],["NL","Q55","yevropa"],["CH","Q39","yevropa"],["AT","Q40","yevropa"],["CZ","Q213","yevropa"],["PL","Q36","yevropa"],["HU","Q28","yevropa"],["HR","Q224","yevropa"],["NO","Q20","yevropa"],["SE","Q34","yevropa"],["FI","Q33","yevropa"],["DK","Q35","yevropa"],["IS","Q189","yevropa"],["IE","Q27","yevropa"],["BE","Q31","yevropa"],["UA","Q212","yevropa"],
 ["US","Q30","amerika"],["CA","Q16","amerika"],["MX","Q96","amerika"],["CU","Q241","amerika"],["BR","Q155","amerika"],["AR","Q414","amerika"],["PE","Q419","amerika"],["CL","Q298","amerika"],["CO","Q739","amerika"],["EC","Q736","amerika"],["BO","Q750","amerika"],
 ["AU","Q408","okeaniya"],["NZ","Q664","okeaniya"]];
// Wikidata turi → OLAM kategoriyalari
const WDT={Q570116:[],Q8502:["tog"],Q8072:["tog"],Q46831:["tog"],Q133056:["tog"],Q35666:["qor","tog"],Q130003:["qor"],Q23397:["dengiz","tabiat"],Q40080:["dengiz"],Q23442:["dengiz"],Q131681:["dengiz","tabiat"],Q39715:["dengiz"],
 Q34038:["sharshara","tabiat"],Q177380:["sharshara","tabiat"],Q46169:["tabiat","park"],Q179049:["tabiat"],Q473972:["tabiat"],Q22698:["park"],Q1107656:["park","tabiat"],Q167346:["park","tabiat"],Q39816:["tabiat","tog"],Q35509:["tabiat"],
 Q150784:["sahro","tabiat"],Q8514:["sahro"],Q32815:["islom","ibodat","tarix"],Q132834:["islom","tarix"],Q48356:["islom","tarix"],Q162875:["tarix","islom"],Q16970:["ibodat","tarix"],Q2977:["ibodat","tarix"],Q5393308:["ibodat","tarix"],Q842402:["ibodat","tarix"],Q44539:["ibodat","tarix"],
 Q33506:["muzey"],Q207694:["muzey"],Q23413:["saroy","tarix"],Q57821:["tarix"],Q1785071:["tarix"],Q16560:["saroy","tarix"],Q839954:["tarix"],Q109607:["tarix"],Q676050:["tarix","shahar"],Q4989906:["tarix","shahar"],Q12518:["zamon","shahar"],Q11303:["zamon","shahar"],Q12280:["shahar"],Q174782:["shahar"],
 Q11707:["taom"],Q30022:["taom"],Q37654:["taom","shahar"],Q11315:["shahar","zamon"],Q740326:["dam","park"],Q1501:["dam"],Q875157:["dam","tabiat"],Q27686:["dam"],Q22746:["park","tabiat"],Q43501:["zoo"],Q2281788:["zoo"],Q483110:["stadion"],Q194195:["park"],Q2416723:["park"],Q9259:["tarix"]};
const CT={code:null,list:[],tag:"fit",n:60,busy:false};
const CTC={};   // xotiradagi kesh: kod|til → joylar
const flag=c=>"";
function ctryChips(){ const mine=U?.country&&CTRY.find(c=>c[0]===U.country); const top=[...(mine?[mine]:[]),...CTRY.filter(c=>c!==mine)].slice(0,14);
  return top.map(c=>`<button class="chip" onclick="openCountry('${c[0]}')">${esc(cname(c[0]))}</button>`).join("")+`<button class="chip" onclick="openCountries()">${t("all")} · ${CTRY.length}</button>`; }
function ensureCtryView(){ let O=$("#ctryv"); if(!O){ O=document.createElement("section"); O.className="ov"; O.id="ctryv"; $("#app").insertBefore(O,$("#sh")); } return O; }
function openCountries(){ if(!ALLC) allCountries().then(()=>{ if($("#ctryv")?.classList.contains("on")&&!CT.code) openCountries(); }); const O=ensureCtryView(); O.classList.add("on"); O.scrollTop=0; CT.code=null; const R=REGN();
  O.innerHTML=`<button class="ovx" onclick="closeCountry()">${ICON.down}</button><div class="seth"><h1>${t("ctry_h")}</h1><p class="sp">${t("ctry_sub")}</p></div>
   ${REGS.filter(r=>r!=="uz").map(r=>{ const l=(ALLC||CTRY).filter(c=>c[2]===r||(r==="osiyo"&&c[2]==="uz")); return l.length?`<div class="sl" style="margin-top:18px">${R[r]}</div><div class="opts">${l.map(c=>`<button class="opt" onclick="openCountry('${c[0]}')">${esc(cname(c[0]))}</button>`).join("")}</div>`:""; }).join("")}<div class="foot"></div>`; }
function closeCountry(){ $("#ctryv")?.classList.remove("on"); }
const BIGC=["FR","IT","ES","DE","GB","US","RU","CN","JP","IN","PL","CZ","AT","CH","NL","BE","PT","GR","SE","NO","FI","DK","CA","BR","MX","AU","UA","HU","TR","IR"];
const WDQ=(qid,lang,big)=>`SELECT ?item ?itemLabel ?itemDescription ?img ?coord ?cls ?sl ?en ?loc WHERE {
 { VALUES ?cls { ${Object.keys(WDT).filter(k=>k!=="Q9259").map(k=>"wd:"+k).join(" ")} } ?item wdt:P31 ?cls . }
 UNION { ?item wdt:P1435 wd:Q9259 . BIND(wd:Q9259 AS ?cls) }
 ?item wdt:P17 wd:${qid} ; wdt:P18 ?img ; wdt:P625 ?coord ; wikibase:sitelinks ?sl .
 FILTER(?sl >= IF(?cls IN (wd:Q16970,wd:Q44539,wd:Q12280,wd:Q22698,wd:Q27686,wd:Q11315), ${big?10:4}, ${big?4:1}))
 OPTIONAL { ?ea schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> ; schema:name ?en . }
 ${lang!=="en"?`OPTIONAL { ?la schema:about ?item ; schema:isPartOf <https://${lang}.wikipedia.org/> ; schema:name ?loc . }`:""}
 SERVICE wikibase:label { bd:serviceParam wikibase:language "${lang},en,ru" . }
} ORDER BY DESC(?sl) LIMIT 2500`;
// Wikidata qatori → ixcham yozuv [qid,label,en,loc,desc,file,lat,lon,cls,sl,iso,reg]
function wdCompact(r,code,reg){
  const m=/Point\(([-\d.]+) ([-\d.]+)\)/.exec(r.coord?.value||""); if(!m) return null;
  const file=decodeURIComponent((r.img?.value.split("FilePath/")[1]||"")); if(!file||/\.(svg|png|gif|tif|tiff|webm|ogv|pdf)$/i.test(file)||BADIMG.test(file)) return null;
  const label=r.itemLabel?.value||""; if(!label||/^Q\d+$/.test(label)) return null;
  return [r.item.value.split("/").pop(),label,r.en?.value||"",r.loc?.value||"",r.itemDescription?.value||"",file,+(+m[2]).toFixed(5),+(+m[1]).toFixed(5),r.cls.value.split("/").pop(),+r.sl.value,code,reg==="uz"&&code!=="UZ"?"osiyo":reg];
}
function mkPlace(c,lang,cat){
  const [qid,label,en,loc,desc,file,lat,lon,cls,sl,code,reg]=c; const id="q"+qid;
  if(IDX[id]){ if(cat){ IDX[id].keep=1; IDX[id].cat=1; } return IDX[id]; }
  let tags=[...(WDT[cls]||[])]; if(!tags.length) tags=guessTags(label+" "+desc+" "+en); if(cls==="Q9259"&&!tags.includes("tarix")) tags.push("tarix");
  const wl=loc?lang:"en", title=loc||en;
  const p={id,t:(en||label).replace(/ /g,"_"),q:en||label,n:LANG==="uzk"?cyr(label):label,c:cname(code),cc:code,reg,tags:[...new Set(tags)],best:"—",
    s:desc?desc.charAt(0).toUpperCase()+desc.slice(1):cname(code),g:PAL2[hash(id)%PAL2.length],lat,lon,dyn:1,wd:1,wl,sl,
    img:"https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(file.replace(/ /g,"_"))+"?width=960",
    wt:{en,[lang]:loc||undefined},wurl:title?`https://${wl}.wikipedia.org/wiki/`+encodeURIComponent(title.replace(/ /g,"_")):"https://www.wikidata.org/wiki/"+qid};
  if(cat){ p.keep=1; p.cat=1; }
  PLACES.push(p); IDX[id]=p; return p;
}
function wdPlace(r,code,reg,lang){ const c=wdCompact(r,code,reg); return c?mkPlace(c,lang,false):null; }
async function wdLoad(code){
  const c=(ALLC||CTRY).find(x=>x[0]===code); if(!c) return [];
  const lang=WL(LANG)==="uz"||WL(LANG)==="uzk"?"uz":WL(LANG), key=code+"|"+lang; if(CTC[key]) return CTC[key];
  const d=await (await fetch("https://query.wikidata.org/sparql?format=json&query="+encodeURIComponent(WDQ(c[1],lang,BIGC.includes(code))),{headers:{Accept:"application/sparql-results+json"}})).json();
  const seen=new Set(), out=[];
  for(const r of d.results?.bindings||[]){ const q=r.item.value; if(seen.has(q)) continue; const p=wdPlace(r,code,c[2],lang); if(p){ seen.add(q); out.push(p); } }
  // bir xil joydagi takroriy yozuvlarni olib tashlash (koordinata bo'yicha)
  const pos=new Set(); const res=out.filter(p=>{ const k=Math.round(p.lat*300)+","+Math.round(p.lon*300); if(pos.has(k)) return false; pos.add(k); return true; });
  CTC[key]=res; return res;
}
function ctryScore(p){ const w=taste(), tot=Object.values(w).reduce((a,b)=>a+b,0)||1; return p.tags.reduce((a,x)=>a+(w[x]||0)/tot,0)*6+Math.log2(1+(p.sl||1)); }
async function openCountry(code){
  const O=ensureCtryView(); O.classList.add("on"); O.scrollTop=0; CT.code=code; CT.tag=(U?.interests||[]).length?"fit":"all"; CT.n=60; CT.list=[];
  const own=PLACES.filter(p=>!p.dyn&&(p.cc||"").split("/").includes(code));
  O.innerHTML=`<button class="ovx" onclick="openCountries()">${ICON.down}</button><div class="seth"><h1>${esc(cname(code))}</h1><p class="sp" id="ctn">${t("ctry_load")}</p></div><div id="ctb">${own.length?`<div class="grid2" style="padding:0">${own.map(gcard).join("")}</div>`:""}<div class="empty">${t("ctry_load")}</div></div>`;
  let l=[]; try{ l=await wdLoad(code); }catch(e){ if(CT.code===code) $("#ctb").innerHTML=(own.length?`<div class="grid2" style="padding:0">${own.map(gcard).join("")}</div>`:"")+`<div class="empty">${t("ctry_fail")}</div>`; return; }
  if(CT.code!==code) return;
  const ids=new Set(own.map(p=>p.id)), ownT=new Set(own.map(p=>(p.nt||p.t).replace(/_/g," ").toLowerCase()));
  CT.list=[...own,...l.filter(p=>!ids.has(p.id)&&!ownT.has((p.wt?.en||"").toLowerCase()))]; renderCountry();
}
function renderCountry(){ const C=CAT(); const all=CT.list; if(!$("#ctb")) return;
  const tags=TAGS.filter(k=>all.some(p=>p.tags.includes(k)));
  let l=CT.tag==="fit"?all.slice().sort((a,b)=>ctryScore(b)-ctryScore(a)):CT.tag==="all"?all:all.filter(p=>p.tags.includes(CT.tag));
  $("#ctn").textContent=t("ctry_n",{n:all.length});
  $("#ctb").innerHTML=`<div class="chips" style="padding:4px 0 14px">${(U?.interests||[]).length?`<button class="chip ${CT.tag==="fit"?"on":""}" onclick="CT.tag='fit';CT.n=60;renderCountry()">${ICON.spark}${t("for_you_f")}</button>`:""}<button class="chip ${CT.tag==="all"?"on":""}" onclick="CT.tag='all';CT.n=60;renderCountry()">${t("all")} · ${all.length}</button>${tags.map(k=>`<button class="chip ${CT.tag===k?"on":""}" onclick="CT.tag='${k}';CT.n=60;renderCountry()">${C[k]} · ${all.filter(p=>p.tags.includes(k)).length}</button>`).join("")}</div>
   ${l.length?`<div class="grid2" style="padding:0">${l.slice(0,CT.n).map(gcard).join("")}</div>`:`<div class="empty">${t("nothing")}</div>`}
   ${l.length>CT.n?`<button class="pill o2 wide" style="margin-top:16px" onclick="CT.n+=60;renderCountry()">${t("ctry_more")} · ${l.length-CT.n}</button>`:""}<div class="foot"></div>`; }


/* ================= DUNYO KATALOGI — ilovaga oldindan qo'shilgan ~3000+ joy =================
   Joylar GitHub'da har oy yig'iladi (scripts/build-catalog.mjs) va assets/catalog/<til>.json sifatida
   ilova bilan birga keladi. Foydalanuvchi qurilmasida alohida saqlanmaydi. */
const WC={busy:false,n:0};
const catLang=()=>{ const l=WL(LANG); return l==="uzk"?"uz":l; };
let ALLC=null;   // barcha mustaqil davlatlar: [ISO, QID, mintaqa]
async function allCountries(){ return ALLC||CTRY; }
let CURD=null;   // qo'lda tanlangan joylar — takrorlanmasin
function catDup(c){ if(!CURD) CURD={t:new Set(PLACES.filter(p=>!p.dyn).map(p=>(p.nt||p.t).replace(/_/g," ").toLowerCase())),g:PLACES.filter(p=>!p.dyn&&p.lat!=null)};
  if(c[2]&&CURD.t.has(c[2].toLowerCase())) return true;
  const k=Math.cos(c[6]*Math.PI/180); return CURD.g.some(p=>{ const dx=(p.lon-c[7])*k, dy=p.lat-c[6]; return dx*dx+dy*dy<1.6e-5; }); }   // ~450 m
function catReset(){ for(let i=PLACES.length-1;i>=0;i--){ const p=PLACES[i]; if(p.cat&&!saved.has(p.id)){ delete IDX[p.id]; PLACES.splice(i,1); } } WC.n=0; }
function catTxt(){ return WC.busy?t("ctry_load"):t("cat_st",{n:WC.n}); }
function catUI(){ const N=PLACES.filter(p=>!p.dyn||p.cat).length; const h=$("#hN"); if(h) h.textContent=N+"+"; const s=$("#wcst"); if(s) s.textContent=catTxt(); }
async function catLoad(){
  if(WC.busy) return; WC.busy=true; const lang=catLang();
  try{
    let r=await fetch("assets/catalog/"+lang+".json"); if(!r.ok&&lang!=="en") r=await fetch("assets/catalog/en.json");
    if(r.ok){ const d=await r.json(); if(lang===catLang()){
      if(Array.isArray(d.countries)&&d.countries.length){ const known=new Set(CTRY.map(x=>x[0])); ALLC=[...CTRY,...d.countries.filter(x=>!known.has(x[0]))]; }
      (d.items||[]).forEach(c=>{ if(!catDup(c)) mkPlace(c,lang,true); }); } }
  }catch(e){}
  WC.busy=false; WC.n=PLACES.filter(p=>p.cat).length; refresh(); catUI();
}
// avvalgi versiya qurilmaga yozgan katalogni tozalash
try{ idb().then(db=>{ try{ db.transaction("kv","readwrite").objectStore("kv").clear(); }catch(e){} }).catch(()=>{}); }catch(e){}

/* ================= SAYT REJIMI ================= */
const HB={i:0,timer:null,pool:null};
function heroPool(){ if(HB.pool&&HB.pool.length) return HB.pool; const d=dailyPlace(); const v=PLACES.filter(p=>!p.dyn&&p.img&&(VID[p.id]||[]).some(x=>/_1920_1080_/.test(x)));
  const rest=PLACES.filter(p=>!p.dyn&&p.img&&!v.includes(p)).sort((a,b)=>score(b)-score(a)).slice(0,12);
  HB.pool=[...(d&&d.img?[d]:[]),...shuffle(v),...rest].filter((p,i,a)=>a.indexOf(p)===i); return HB.pool; }
function heroNext(){ const H=$("#shero"); if(!H||cur!=="home") return; const pool=heroPool(); if(!pool.length) return; const p=pool[HB.i++%pool.length];
  const a=$("#hbA"), b=$("#hbB"), v=$("#hbV"); const [on,off]=a.classList.contains("on")?[b,a]:[a,b];
  const u=huge(p.img); const im=new Image(); im.onload=()=>{ on.style.backgroundImage=`url("${u}")`; on.classList.add("on"); off.classList.remove("on"); }; im.onerror=()=>{ on.style.backgroundImage=`url("${big(p.img)}"), ${grad(p)}`; on.classList.add("on"); off.classList.remove("on"); }; im.src=u;
  const cap=$("#hcap"); if(cap){ cap.textContent=pN(p)+" · "+pCountry(p); cap.onclick=()=>openPlace(p.id); cap.style.cursor="pointer"; }
  const land=(VID[p.id]||[]).filter(x=>/_1920_1080_/.test(x));
  if(v){ v.classList.remove("on"); if(SET.video&&land.length&&!matchMedia("(prefers-reduced-motion:reduce)").matches){ setTimeout(()=>{ v.src=pexels(land[Math.floor(Math.random()*land.length)]); v.play().catch(()=>{}); },400); v.onplaying=()=>v.classList.add("on"); } else { v.pause(); v.removeAttribute("src"); } } }
function heroSearch(q){ q=(q||"").trim(); X.q=q; X.tag="all"; X.reg="all"; go("explore"); }
function renderHomeSite(){ setTimeout(fillAIPicks,0);
  const H=$("#home"), C=CAT(), R=REGN(), PR=PER(), N=PLACES.filter(p=>!p.dyn||p.cat).length;
  if(!$("#shero")||H.dataset.l!==LANG){ H.dataset.l=LANG;
    H.innerHTML=`<section class="shero" id="shero"><div class="bgl" id="hbA"></div><div class="bgl" id="hbB"></div><video id="hbV" muted playsinline loop preload="none"></video>
      <div class="bigw" aria-hidden="true">OLAM</div><button class="hcap" id="hcap"></button>
      <div class="hgrid"><div><span class="hkick"><i></i>${esc(t("hd_sub"))}</span><h1 class="htitle">${t("ob_h1")}</h1><p class="hsub">${t("ob_sub")}</p>
        <div class="hbtns"><button class="hbtn" onclick="go('watch')">${t("watch_now")}<span class="arw">${ICON.arrow}</span></button><button class="hbtn gl" onclick="openMap()">${clean(t("map_h"))}</button></div></div>
       <div class="hpanel"><form class="hsearch" onsubmit="event.preventDefault();heroSearch(this.q.value)">${ICON.search}<input name="q" placeholder="${esc(t("search_home"))}" autocomplete="off"><button>${t("search_b")}</button></form>
        <div class="hchips">${["dengiz","tog","tarix","islom","sharshara","shahar"].map(k=>`<button onclick="openMood('${k}')">${C[k]}</button>`).join("")}</div></div></div>
      <div class="hfoot"><div class="hstat"><i>${ICON.pin}</i><b id="hN">${N}+</b><small>${t("places")}</small></div><div class="hstat"><i>${ICON.map}</i><b>${(ALLC||CTRY).length}</b><small>${t("st_ctry")}</small></div><div class="hstat"><i><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg></i><b>${LANGS.length}</b><small>${t("st_lang")}</small></div><div class="hstat"><i>${ICON.spark}</i><b>AI</b><small>${t("t_ai")}</small></div>
       ${(()=>{ const dp=dailyPlace(); return dp?`<div class="hday" onclick="go('watch','${dp.id}')"><div><small>${t("daily")}</small><b>${esc(pN(dp))} · ${esc(pCountry(dp))}</b></div><span class="arw">${ICON.play}</span></div>`:""; })()}</div>
      <div class="hscroll" aria-hidden="true"></div></section><div id="hbody"></div>`;
    HB.pool=null; clearInterval(HB.timer); heroNext(); HB.timer=setInterval(()=>{ if(!document.hidden) heroNext(); },10000);
  }
  const list=forYou(), hero=(U?.dream&&byId(U.dream))||list[0];
  const dirs=TAGS.map(k=>{ const p=PLACES.find(x=>x.tags[0]===k&&x.img)||PLACES.find(x=>x.tags.includes(k)&&x.img)||PLACES.find(x=>x.tags.includes(k)); return p?`<button onclick="openMood('${k}')">${ph(p)}${clean(C[k])}</button>`:""; }).join("");
  const cats=NEWCATS.map(k=>{ const p=PLACES.find(x=>x.tags[0]===k&&x.img)||PLACES.find(x=>x.tags.includes(k)&&x.img)||PLACES.find(x=>x.tags.includes(k)); const n=PLACES.filter(x=>x.tags.includes(k)).length; return p?ph(p,"catt",`<div class="ci"><b>${catIcon(k)}</b><small>${esc(clean(C[k]))} · ${n}</small></div>`,false,`onclick="openMood('${k}')"`):""; }).join("");
  const dcard=(p,cls="")=>`<div class="dcard ${cls}" onclick="openPlace('${p.id}')">${ph(p,"","",true)}<span class="dtag">${STAR}${rate(p)}</span><span class="arw">${ICON.arrow}</span><div class="dci2"><b>${esc(pN(p))}</b><small>${PIN}${esc(pCountry(p))}</small></div></div>`;
  const top=(l=>l.length>=7?l:list.filter(p=>p.id!==hero.id))(list.filter(p=>p.id!==hero.id&&p.img)).slice(0,7);
  const dp=dailyPlace();
  $("#hbody").innerHTML=`
   <div class="sec"><div><span class="slabel">${t("dirs")}</span><h2>${t("cats_sub")}</h2></div><span onclick="openCats()">${t("all")} →</span></div>
   <div class="dirs">${dirs}</div>
   <div class="sec"><div><span class="slabel">${U?.dream===hero.id?t("dream_place"):t("today")}</span><h2>${t("best_h")}</h2><small>${PR[topTags(1)[0]]||t("based")}</small></div><span onclick="go('explore')">${t("all")} →</span></div>
   <div class="dgrid">${top.map((p,i)=>dcard(p,i===0?"big":"")).join("")}</div>
   <div class="sec"><div><span class="slabel">${ICON.spark}AI</span><h2>${clean(t("ai_picked"))}</h2><small>${t("ai_rec")}</small></div></div>
   <div class="sfeat"><div class="feat ph" style="background:${grad(hero)}" onclick="openPlace('${hero.id}')"><img src="${huge(hero.img||"")}" alt="" onerror="this.src='${big(hero.img||"")}';this.onerror=null"><div class="badge">${STAR}${rate(hero)} · ${esc(pCountry(hero))}</div>
      <div class="fi"><h1>${esc(pN(hero))}</h1><p>${esc(pS(hero))}</p><div class="row"><button class="pill g" onclick="event.stopPropagation();go('watch','${hero.id}')">${ICON.play} ${t("watch_now")}</button><button class="pill o" onclick="event.stopPropagation();openChat('${hero.id}')">${clean(t("t_ai"))}</button></div></div></div>
     <div class="side">${dp?`<div class="daily" onclick="go('watch','${dp.id}')">${SET.video?`<video src="${pexels(((VID[dp.id]||[]).find(x=>/_1920_1080_/.test(x)))||VID[dp.id][0])}" autoplay muted loop playsinline preload="metadata"></video>`:img(dp,true)}<div class="dci"><b>${esc(pN(dp))}</b><small>${t("daily")} · ${esc(pCountry(dp))}</small></div><span class="dpl">${ICON.play}</span></div>`:""}
      <div class="aipick"><div class="aiph" id="aisec">${clean(t("ai_rec"))}<span onclick="openChat()">${t("ask")} →</span></div><div id="aipick"><div class="ld">${t("ai_loading")}</div></div></div></div></div>
   <div class="sec"><div><span class="slabel">${catIcon("globe")}${t("ctry_h")}</span><h2>${t("ctry_sub")}</h2></div><span onclick="openCountries()">${t("all")} · ${CTRY.length} →</span></div>
   <div class="chips" style="padding-top:0">${ctryChips()}</div>
   <div class="sec"><div><span class="slabel">${t("cats_h")}</span><h2>${t("cats_sub")}</h2></div><span onclick="openCats()">${t("all")} →</span></div>
   <div class="cats">${cats}</div>
   <div class="sec"><div><span class="slabel">${catIcon("wonder")}${clean(t("won_chip"))}</span><h2>${t("won_h")}</h2><small>${t("won_sub")}</small></div><span onclick="X.tag='wonder';X.q='';X.reg='all';go('explore')">${t("all")} →</span></div>
   <div id="wond">${wondersHTML()}</div>
   <div class="sec"><div><span class="slabel">${t("for_you_f")}</span><h2>${t("best_h")}</h2></div><span onclick="go('explore')">${t("all")} →</span></div>
   <div class="grid2">${list.filter(p=>p.id!==hero.id).slice(7,19).map(gcard).join("")}</div>
   <div class="sec"><div><span class="slabel">${catIcon("globe")}OLAM</span><h2>${clean(t("world_h"))}</h2><small>${t("world_sub")}</small></div><span onclick="go('explore');setTimeout(()=>$('#xq')?.focus(),60)">${t("search_b")} →</span></div>
   ${["yevropa","osiyo","amerika","afrika","okeaniya","uz"].map(r=>{ const l=list.filter(p=>p.reg===r).slice(0,14); return `<div class="sec" style="padding-top:18px;padding-bottom:12px"><h2 style="font-size:20px;letter-spacing:-.4px">${R[r]}</h2><span onclick="X.reg='${r}';X.tag='all';go('explore')">${PLACES.filter(p=>p.reg===r).length} ${t("places")} →</span></div><div class="hs">${l.map(p=>cardH(p,"sm")).join("")}</div>`; }).join("")}
   <section class="sapp"><div><span class="slabel" style="background:rgba(255,255,255,.16);border-color:rgba(255,255,255,.3);color:#fff">OLAM App</span><h2>${t("app_h")}</h2><p>${t("app_p")}</p>
     <div class="hbtns"><a class="hbtn" href="app/">${t("get_app")}<span class="arw">${ICON.arrow}</span></a><button class="hbtn gl" onclick="shareApp()">${clean(t("s_share"))}</button></div></div>
     <div class="phone ph" style="position:relative">${hero.img?ph(hero,"","",true):""}<div class="pui"><b>${esc(pN(hero))}</b>${PIN}${esc(pCountry(hero))}</div></div></section>
   <footer class="sfooter"><div><div class="logo dark"><i>O</i>OLAM</div><p>${t("about_t")}</p></div>
     <div><h4>OLAM</h4><button onclick="go('explore')">${clean(t("nav_exp"))}</button><button onclick="go('watch')">${clean(t("nav_watch"))}</button><button onclick="openMap()">${clean(t("t_map"))}</button><button onclick="openQuiz()">${clean(t("t_quiz"))}</button><button onclick="openChat()">${clean(t("t_ai"))}</button></div>
     <div><h4>${clean(t("s_lang"))}</h4>${LANGS.slice(0,6).map(([k,n,f])=>`<button onclick="setLang('${k}')">${n}</button>`).join("")}<a href="app/">${t("get_app")}</a></div>
     <div class="copy"><span>© ${new Date().getFullYear()} OLAM</span><span>Wikipedia · Wikimedia Commons · Pexels · Open-Meteo</span></div></footer>`;
}
function langSheet(){ const S=$("#sh"); S.dataset.k="lang"; S.classList.add("on");
  S.innerHTML=`<div class="shb" onclick="event.stopPropagation()"><div class="shh"><b>${t("s_lang")}</b><button class="x" onclick="closeSheet()">${ICON.down}</button></div><div class="shl"><div class="langs">${LANGS.map(([k,n,f])=>`<button class="${LANG===k?"on":""}" onclick="setLang('${k}');closeSheet()">${n}</button>`).join("")}</div></div></div>`; }
function siteInit(){
  const H=$("#home"), T=$("#topbar"); if(H&&T) H.addEventListener("scroll",()=>{ T.classList.toggle("solid",H.scrollTop>40); H.classList.toggle("deep",H.scrollTop>innerHeight*.6); },{passive:true});
}

/* ================= START ================= */
applyTheme(); applyUI(); applyLang();
if(!U&&SITE) U={name:"",country:"UZ",interests:[],regions:[],dream:null,style:"",with:"",season:""};
if(!SITE&&(!U||U.lat==null)&&!ls.get("olam_locask",false)){ ls.set("olam_locask",true); setTimeout(()=>locate(()=>{ if($("#ob").classList.contains("on")&&obStep===1) renderOb(); }),1200); }
if(U) go("home"); else startOb();
if(SITE) siteInit();
setTimeout(()=>catLoad(),600);
loadHeroes(); loadAll(); mQueue(); loadCommunity(); setTimeout(()=>dailyNotify(false),4000); if(QP&&byId(QP)) setTimeout(()=>openPlace(QP),300);
if(!(LANG==="uz"||LANG==="uzk")){ wikiNames().then(aiTaglines); }

