const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const CACHE_KEY = "freshkeep_recipe_img_cache";

function getCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch { return {}; }
}
function setCache(cache) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch {}
}

/**
 * 料理名からGeminiで料理写真風画像を生成してbase64 data URLを返す。
 * localStorageにキャッシュされるので同じ料理は1度しか生成しない。
 */
export async function generateRecipeImage(recipeName) {
  if (!API_KEY) return null;

  const cache = getCache();
  if (cache[recipeName]) return cache[recipeName];

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a professional food photo of "${recipeName}", a Japanese home-cooked dish. Beautifully plated, appetizing, warm natural lighting, close-up shot.`,
            }],
          }],
          generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
        }),
      }
    );

    if (!res.ok) {
      console.warn("Gemini recipe image error:", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (!part) {
      console.warn("Gemini recipe image: no image part in response", JSON.stringify(data).slice(0, 300));
      return null;
    }

    const dataUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    setCache({ ...getCache(), [recipeName]: dataUrl });
    return dataUrl;
  } catch (e) {
    console.warn("Gemini recipe image exception:", e.message);
    return null;
  }
}
