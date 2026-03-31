import RECIPES from "./beerRecipes.json";

export const CATEGORIES = ["主食", "主菜", "副菜", "汁物・スープ"];

// 買い足し対象から除外する調味料・常備品
const SEASONINGS = new Set([
  "醤油", "しょうゆ", "みりん", "酒", "料理酒", "塩", "砂糖", "こしょう", "黒こしょう",
  "ごま油", "オリーブオイル", "サラダ油", "油", "片栗粉", "小麦粉", "だし", "だしの素",
  "めんつゆ", "ラー油", "豆板醤", "甜麺醤", "ナンプラー", "花椒", "唐辛子",
  "酢", "ケチャップ", "マヨネーズ", "ソース", "BBQソース", "甘酢", "オイスターソース",
  "粒マスタード", "ごま", "七味", "山椒", "わさび", "ジンギスカンたれ",
  "サフラン", "サワークリーム",
]);

/**
 * レシピに必要な「買い足し食材」を返す（調味料除外・冷蔵庫にあるものも除外）
 */
export function getIngredientsToBuy(recipe, fridgeItems) {
  return recipe.keywords.filter((kw) => {
    if (SEASONINGS.has(kw)) return false;
    return !fridgeItems.some((item) => item.name.includes(kw) || kw.includes(item.name));
  });
}

/**
 * レシピ詳細ページ（クックパッド検索）のURLを返す
 */
export function getRecipeUrl(recipe) {
  if (recipe.recipe_url) return recipe.recipe_url;
  const q = encodeURIComponent(recipe.name);
  return `https://cookpad.com/search/${q}`;
}

/**
 * 冷蔵庫の食材との一致スコアを計算する。
 * 賞味期限が近い食材にボーナスを付与。
 */
function scoreRecipe(recipe, fridgeItems) {
  let score = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const item of fridgeItems) {
    const matched = recipe.keywords.some(
      (kw) => item.name.includes(kw) || kw.includes(item.name)
    );
    if (!matched) continue;

    const expiry = new Date(item.expiryDate);
    expiry.setHours(0, 0, 0, 0);
    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (daysLeft <= 1) score += 10;
    else if (daysLeft <= 3) score += 6;
    else if (daysLeft <= 7) score += 3;
    else score += 1;
  }
  return score;
}

/**
 * カテゴリを指定してレシピを返す。
 * consumeFirst=true: 冷蔵庫の食材を使うレシピを期限の近い順に優先表示
 * consumeFirst=false: ランダム表示（スコアなし）
 */
export function pickRecipes(category, fridgeItems, excludedIds = [], count = 8, consumeFirst = false) {
  const pool = RECIPES.filter(
    (r) => r.category === category && !excludedIds.includes(r.id)
  );

  if (consumeFirst) {
    const scored = pool.map((r) => ({ ...r, _score: scoreRecipe(r, fridgeItems) }));
    const matched = scored.filter((r) => r._score > 0);
    const source = matched.length > 0 ? matched : scored;
    source.sort((a, b) => b._score - a._score || Math.random() - 0.5);
    return source.slice(0, count);
  }

  // OFFモード: ランダム
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count);
}
