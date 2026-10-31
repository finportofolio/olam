// OLAM — tabiiy ovoz (TTS) uchun Cloudflare Worker qo'shimchasi.
// Ilova "Tinglash" bosilganda GID_URL'ga {mode:"tts", lang, text} yuboradi va audio/mpeg kutadi.
// Ovozlar: Microsoft Azure Speech (bepul tarifda oyiga 500 000 belgi). O'zbek tilida tabiiy ayol/erkak ovozi bor.
//
// Ulash:
//  1) portal.azure.com → "Speech service" yarating (Free F0 tarif) → Keys and Endpoint'dan KEY va REGION'ni oling.
//  2) Cloudflare → Workers → olam-gid → Settings → Variables: AZURE_KEY (secret) va AZURE_REGION (masalan: westeurope).
//  3) Mavjud worker'ning fetch() ichida, so'rov JSON'ini o'qigandan keyin:
//        if (body.mode === "tts") return handleTTS(body, env);
//     va shu fayldagi handleTTS funksiyasini worker kodiga qo'shing.

const VOICES = {
  uz: "uz-UZ-MadinaNeural", uzk: "uz-UZ-MadinaNeural", ru: "ru-RU-SvetlanaNeural", en: "en-US-JennyNeural",
  tr: "tr-TR-EmelNeural", kk: "kk-KZ-AigulNeural", ky: "ru-RU-SvetlanaNeural", tg: "ru-RU-SvetlanaNeural",
  ar: "ar-SA-ZariyahNeural", zh: "zh-CN-XiaoxiaoNeural",
};
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" };
const xml = s => String(s).replace(/[<>&'"]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));

export async function handleTTS(body, env) {
  const text = String(body.text || "").slice(0, 2500).trim();
  const voice = VOICES[body.lang] || VOICES.en;
  if (!text || !env.AZURE_KEY) return new Response(JSON.stringify({ error: "tts unavailable" }), { status: 400, headers: { ...CORS, "Content-Type": "application/json" } });
  // bir xil matn qayta so'ralsa — keshdan
  const key = new Request("https://tts.cache/" + voice + "/" + encodeURIComponent(text.slice(0, 900)) + "/" + text.length);
  const cache = caches.default; const hit = await cache.match(key); if (hit) return hit;
  const lang = voice.slice(0, 5);
  const ssml = `<speak version="1.0" xml:lang="${lang}"><voice name="${voice}"><prosody rate="-4%">${xml(text)}</prosody></voice></speak>`;
  const r = await fetch(`https://${env.AZURE_REGION || "westeurope"}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: "POST",
    headers: { "Ocp-Apim-Subscription-Key": env.AZURE_KEY, "Content-Type": "application/ssml+xml", "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3", "User-Agent": "olam" },
    body: ssml,
  });
  if (!r.ok) return new Response(JSON.stringify({ error: "tts " + r.status }), { status: 502, headers: { ...CORS, "Content-Type": "application/json" } });
  const res = new Response(r.body, { headers: { ...CORS, "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=2592000" } });
  await cache.put(key, res.clone());
  return res;
}
