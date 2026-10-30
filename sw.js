// OLAM — internetsiz rejim va bildirishnomalar
const V="olam-v23", APP=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{ self.skipWaiting(); e.waitUntil(caches.open(V).then(c=>c.addAll(APP).catch(()=>{}))); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!=="olam-img").map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch",e=>{ const r=e.request; if(r.method!=="GET") return; const u=new URL(r.url);
  if(u.origin===location.origin){ e.respondWith(fetch(r).then(res=>{ const cp=res.clone(); caches.open(V).then(c=>c.put(r,cp)); return res; }).catch(()=>caches.match(r).then(m=>m||caches.match("./index.html")))); return; }
  if(/upload\.wikimedia\.org|basemaps\.cartocdn\.com|fonts\.(gstatic|googleapis)\.com|unpkg\.com/.test(u.host)){
    e.respondWith(caches.open("olam-img").then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{ if(res.ok||res.type==="opaque"){ c.put(r,res.clone()); c.keys().then(k=>{ if(k.length>600) c.delete(k[0]); }); } return res; })))); }
});
self.addEventListener("notificationclick",e=>{ e.notification.close(); const id=e.notification.data&&e.notification.data.id;
  e.waitUntil(self.clients.matchAll({type:"window"}).then(cs=>{ for(const c of cs){ c.postMessage({open:id}); return c.focus(); } return self.clients.openWindow("./"+(id?"?p="+id:"")); })); });
