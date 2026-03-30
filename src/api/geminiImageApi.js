const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const CACHE_KEY = "freshkeep_gemini_img_cache";

export function hasGeminiKey() {
  return !!API_KEY;
}

function getCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch { return {}; }
}
function setCache(cache) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch {}
}

/**
 * Gemini でApple絵文字風の食材画像を生成してbase64 data URLを返す
 * localStorageにキャッシュされるので同じ食材は1度しか生成しない
 */
export async function generateFoodImage(foodName) {
  if (!API_KEY) return null;

  const cache = getCache();
  if (cache[foodName]) return cache[foodName];

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Create a single food illustration in Apple emoji style of "${foodName}".
Style: flat design, vibrant saturated colors, clean white background, rounded soft shapes, no text, no labels, centered composition, cute and simple like iOS emoji.`,
            }],
          }],
          generationConfig: { responseModalities: ["IMAGE"] },
        }),
      }
    );

    if (!res.ok) return null;
    const data = await res.json();
    const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (!part) return null;

    const dataUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    const next = { ...cache, [foodName]: dataUrl };
    setCache(next);
    return dataUrl;
  } catch {
    return null;
  }
}

export function clearGeminiImageCache() {
  localStorage.removeItem(CACHE_KEY);
}
