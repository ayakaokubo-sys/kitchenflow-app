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
 * 食材名の正規化マップ
 * 冷蔵庫の具体的な食材名 → レシピのキーワード（汎用名）に変換
 */
const NORMALIZE_MAP = {
  // 鶏肉系
  "鶏むね肉": "鶏肉", "鶏もも肉": "鶏肉", "鶏ささみ": "鶏肉",
  "鶏ひき肉": "鶏肉", "鶏手羽元": "鶏肉", "鶏手羽先": "鶏肉",
  "手羽元": "鶏肉", "手羽先": "鶏肉", "鶏レバー": "鶏肉",
  // 豚肉系
  "豚バラ": "豚肉", "豚こま": "豚肉", "豚ひき肉": "豚肉",
  "豚ロース": "豚肉", "豚肩ロース": "豚肉", "豚薄切り": "豚肉",
  "豚こまぎれ": "豚肉", "豚バラ肉": "豚肉",
  // 牛肉系
  "牛こま": "牛肉", "牛ひき肉": "牛肉", "牛ロース": "牛肉",
  "牛バラ": "牛肉", "牛薄切り": "牛肉", "牛こまぎれ": "牛肉",
  // ひき肉系
  "合いびき肉": "ひき肉", "合挽き肉": "ひき肉", "豚ひき肉": "ひき肉",
  "鶏ひき肉": "ひき肉",
  // きのこ系
  "しめじ": "きのこ", "えのき": "きのこ", "まいたけ": "きのこ",
  "エリンギ": "きのこ", "しいたけ": "きのこ", "なめこ": "きのこ",
  "エノキダケ": "きのこ", "えのきだけ": "きのこ",
  // 魚介系
  "鮭の切り身": "鮭", "生鮭": "鮭", "塩鮭": "鮭",
  "さばの切り身": "さば", "塩さば": "さば",
  "むきえび": "えび", "冷凍えび": "えび", "ブラックタイガー": "えび",
  // ねぎ系
  "小ねぎ": "ねぎ", "万能ねぎ": "ねぎ", "青ねぎ": "ねぎ",
  // 葉物野菜
  "大葉": "しそ",
  // 大豆製品
  "絹ごし豆腐": "豆腐", "木綿豆腐": "豆腐", "絹豆腐": "豆腐",
  "厚揚げ": "油揚げ",
  // その他
  "ウインナー": "ベーコン", "ソーセージ": "ベーコン",
};

/**
 * 食材名を汎用キーワードに正規化する
 */
function normalize(name) {
  // 完全一致を試みる
  if (NORMALIZE_MAP[name]) return NORMALIZE_MAP[name];
  // 前方一致（例: 「鶏むね肉（皮なし）」→ 「鶏むね肉」）
  for (const [key, val] of Object.entries(NORMALIZE_MAP)) {
    if (name.startsWith(key) || key.startsWith(name)) return val;
  }
  return name;
}

/**
 * 冷蔵庫の食材名とレシピキーワードが一致するか判定
 * 正規化マップを使って「鶏むね肉」と「鶏肉」なども一致させる
 */
function matchIngredient(fridgeName, keyword) {
  if (fridgeName.includes(keyword) || keyword.includes(fridgeName)) return true;
  const nFridge = normalize(fridgeName);
  const nKeyword = normalize(keyword);
  if (nFridge === nKeyword) return true;
  if (nFridge.includes(keyword) || keyword.includes(nFridge)) return true;
  if (fridgeName.includes(nKeyword) || nKeyword.includes(fridgeName)) return true;
  return false;
}

/**
 * レシピに必要な「買い足し食材」を返す（調味料除外・冷蔵庫にあるものも除外）
 */
export function getIngredientsToBuy(recipe, fridgeItems) {
  return recipe.keywords.filter((kw) => {
    if (SEASONINGS.has(kw)) return false;
    return !fridgeItems.some((item) => matchIngredient(item.name, kw));
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
    const matched = recipe.keywords.some((kw) => matchIngredient(item.name, kw));
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
