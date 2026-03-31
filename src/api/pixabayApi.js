const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
const CACHE_KEY = "freshkeep_pixabay_img_cache";

function getCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch { return {}; }
}
function setCache(cache) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch {}
}

/**
 * 料理名でPixabayから食材写真URLを取得（localStorageキャッシュ付き）
 * 同じ料理は2回目以降キャッシュから返す
 */
export async function fetchRecipeImage(recipeName) {
  if (!API_KEY) return null;

  const cache = getCache();
  if (cache[recipeName]) return cache[recipeName];

  try {
    const query = encodeURIComponent(recipeName + " 料理");
    const res = await fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&category=food&per_page=5&safesearch=true&orientation=horizontal`
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.hits?.length) {
      // 日本語でヒットしない場合は "japanese food" で再検索
      const res2 = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent("japanese food")}&image_type=photo&category=food&per_page=10&safesearch=true&orientation=horizontal`
      );
      if (!res2.ok) return null;
      const data2 = await res2.json();
      if (!data2.hits?.length) return null;
      const url2 = data2.hits[Math.floor(Math.random() * Math.min(5, data2.hits.length))].webformatURL;
      setCache({ ...getCache(), [recipeName]: url2 });
      return url2;
    }
    const url = data.hits[Math.floor(Math.random() * Math.min(5, data.hits.length))].webformatURL;
    setCache({ ...getCache(), [recipeName]: url });
    return url;
  } catch {
    return null;
  }
}
