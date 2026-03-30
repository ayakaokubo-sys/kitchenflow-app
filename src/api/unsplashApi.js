const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const CACHE_KEY = "freshkeep_img_cache";

export function hasUnsplashKey() {
  return !!ACCESS_KEY;
}

function getCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch { return {}; }
}
function setCache(cache) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch {}
}

/**
 * 英語キーワードで Unsplash から食材画像URLを取得（localStorageキャッシュ付き）
 * @returns {Promise<string|null>} 画像URL または null
 */
export async function fetchFoodImage(query) {
  if (!ACCESS_KEY) return null;

  const cache = getCache();
  if (cache[query]) return cache[query];

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + " close up macro")}&per_page=5&orientation=squarish&content_filter=high&client_id=${ACCESS_KEY}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.results?.length) return null;

    // 上位5件からランダムに1枚選ぶ
    const idx = Math.floor(Math.random() * data.results.length);
    const url = data.results[idx].urls.regular;

    const next = { ...cache, [query]: url };
    setCache(next);
    return url;
  } catch {
    return null;
  }
}

/** キャッシュをクリアする */
export function clearImageCache() {
  localStorage.removeItem(CACHE_KEY);
}
