// OLAM — tabiiy ovoz (TTS) uchun alohida Cloudflare Worker.
// Cloudflare'da "olam-tts" nomli worker yarating va shu faylning hammasini o'sha yerga qo'ying.
// Settings → Variables and Secrets: AZURE_KEY (Secret) va AZURE_REGION (Text, masalan: westeurope).
// Ilova manzili: https://olam-tts.<sizning-subdomen>.workers.dev  (POST {text, lang} → audio/mpeg)

const VOICES = {
  uz: "uz-UZ-MadinaNeural", uzk: "uz-UZ-MadinaNeural", ru: "ru-RU-SvetlanaNeural", en: "en-US-JennyNeural",
  tr: "tr-TR-EmelNeural", kk: "kk-KZ-AigulNeural", ky: "ru-RU-SvetlanaNeural", tg: "ru-RU-SvetlanaNeural",
  ar: "ar-SA-ZariyahNeural", zh: "zh-CN-XiaoxiaoNeural",
};
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...CORS, "Content-Type": "application/json" } });
const xml = s => String(s).replace(/[<>&'"]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    if (request.method !== "POST") return json({ ok: true, service: "olam-tts", ready: !!env.AZURE_KEY });
    let body = {}; try { body = await request.json(); } catch (e) { return json({ error: "bad json" }, 400); }
    const text = String(body.text || "").replace(/\s+/g, " ").trim().slice(0, 2500);
    const voice = VOICES[body.lang] || VOICES.en;
    if (!text) return json({ error: "empty text" }, 400);
    if (!env.AZURE_KEY) return json({ error: "AZURE_KEY is not set" }, 503);

    // bir xil matn qayta so'ralsa — keshdan (limit tejaladi)
    const cacheKey = new Request("https://olam-tts.cache/" + voice + "/" + encodeURIComponent(text.slice(0, 1200)) + "/" + text.length);
    const cache = caches.default;
    const hit = await cache.match(cacheKey); if (hit) return hit;

    const ssml = `<speak version="1.0" xml:lang="${voice.slice(0, 5)}"><voice name="${voice}"><prosody rate="-4%">${xml(text)}</prosody></voice></speak>`;
    const r = await fetch(`https://${env.AZURE_REGION || "westeurope"}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: "POST",
      headers: { "Ocp-Apim-Subscription-Key": env.AZURE_KEY, "Content-Type": "application/ssml+xml", "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3", "User-Agent": "olam-tts" },
      body: ssml,
    });
    if (!r.ok) return json({ error: "azure " + r.status }, 502);
    const res = new Response(r.body, { headers: { ...CORS, "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=2592000" } });
    ctx.waitUntil(cache.put(cacheKey, res.clone()));
    return res;
  },
};
