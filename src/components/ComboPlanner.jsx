import { useState, useEffect } from "react";
import { CATEGORIES, pickRecipes, getIngredientsToBuy, getRecipeUrl } from "../data/beerRecipeUtils";
import { ALL_FOODS } from "../data/foodCategories";
import { fetchRecipeImage } from "../api/pixabayApi";

const CATEGORY_EMOJI = {
  主食: "🍚",
  主菜: "🍖",
  副菜: "🥗",
  "汁物・スープ": "🍲",
};

const MAX_BUY_TAGS = 3;

export default function ComboPlanner({
  fridgeItems,
  todayMenu,
  onAddToToday,
  onRemoveFromToday,
  onAddToShoppingList,
  onEatRecipe,
  onShowToast,
}) {
  const [activeCategory, setActiveCategory] = useState("主菜");
  const [recipes, setRecipes] = useState(null);
  const [excludedByCategory, setExcludedByCategory] = useState({});

  function generate() {
    const excluded = excludedByCategory[activeCategory] ?? [];
    const result = pickRecipes(activeCategory, fridgeItems, excluded, 8);
    const finalResult = result.length > 0
      ? result
      : pickRecipes(activeCategory, fridgeItems, [], 8);

    setRecipes({ category: activeCategory, items: finalResult });
    setExcludedByCategory((prev) => {
      const newIds = finalResult.map((r) => r.id);
      const prevIds = prev[activeCategory] ?? [];
      return { ...prev, [activeCategory]: [...new Set([...prevIds, ...newIds])] };
    });
  }

  function switchCategory(cat) {
    setActiveCategory(cat);
    setRecipes(null);
  }

  function handleAddToToday(recipe) {
    const buyIngredients = getIngredientsToBuy(recipe, fridgeItems).map((name) => {
      const foodData = ALL_FOODS.find(
        (f) => f.name === name || name.includes(f.name) || f.name.includes(name)
      );
      return {
        name,
        amount: 1,
        unit: foodData?.unit ?? "個",
      };
    });
    onAddToToday([{
      name: recipe.name,
      source: recipe.source,
      keywords: recipe.keywords,
      recipe_url: recipe.recipe_url ?? null,
      ingredients_to_buy: buyIngredients,
    }]);
  }

  function handleAddAllToShoppingList() {
    const allToBuy = todayMenu.flatMap((r) =>
      (r.ingredients_to_buy ?? []).map((ing) => ({ ...ing, source: "献立プラン" }))
    );
    if (allToBuy.length > 0) {
      onAddToShoppingList(allToBuy);
      onShowToast?.(`🛒 ${allToBuy.length}品を買い物リストに追加しました`);
    } else {
      onShowToast?.("買い足しが必要な食材はありません");
    }
  }

  const displayItems = recipes?.category === activeCategory ? recipes.items : null;
  const isRegenerate = recipes?.category === activeCategory;

  return (
    <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-4">

      {/* 今日の献立 */}
      <p className="font-semibold text-base" style={{ color: "#1c1a16" }}>今日の献立</p>

      {todayMenu.length === 0 ? (
        <p className="text-sm" style={{ color: "#9a9a9a" }}>献立がまだ選ばれていません</p>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {todayMenu.map((recipe) => {
              const url = recipe.recipe_url ?? getRecipeUrl(recipe);
              return (
                <div
                  key={recipe.name}
                  className="rounded-2xl px-4 py-3 shadow-sm flex flex-col gap-2"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  {/* 上段: 料理名 + closeボタン */}
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm flex-1 min-w-0 truncate" style={{ color: "#1c1a16" }}>
                      {recipe.name}
                    </span>
                    <button
                      onClick={() => onRemoveFromToday?.(recipe.name)}
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-70 active:scale-90"
                      style={{ backgroundColor: "#ffffff", border: "1px solid #e0d8d0" }}
                    >
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="#c0b8b0" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* 下段: ボタン群 */}
                  <div className="flex items-center gap-2">
                    {url && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap"
                        style={{ backgroundColor: "rgba(43,71,33,0.08)", color: "#2B4721", border: "1px solid rgba(43,71,33,0.2)" }}
                      >
                        🍳 レシピを見る
                      </a>
                    )}
                    <button
                      onClick={() => onEatRecipe?.(recipe)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap active:scale-95"
                      style={{ backgroundColor: "#2B4721", color: "#ddf0c0" }}
                    >
                      🍽️ 食べた
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 買い物リストへ追加ボタン */}
          <button
            onClick={handleAddAllToShoppingList}
            className="w-full font-semibold py-3 rounded-full text-sm transition-all shadow-sm active:scale-95"
            style={{ backgroundColor: "#f5f0ea", color: "#5a4a35", border: "1.5px solid #e0d5c5" }}
          >
            🛒 必要な食材を買い物リストに追加
          </button>
        </>
      )}

      {/* 料理を探す */}
      <p className="font-semibold text-base mt-2" style={{ color: "#1c1a16" }}>料理を探す</p>

      {/* カテゴリータブ */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => switchCategory(cat)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                backgroundColor: isActive ? "#2B4721" : "#d8d0c8",
                color: isActive ? "#ddf0c0" : "#4a3a28",
              }}
            >
              {CATEGORY_EMOJI[cat]} {cat}
            </button>
          );
        })}
      </div>

      {/* 料理を探すボタン */}
      {fridgeItems.length === 0 ? (
        <div className="rounded-2xl px-4 py-3 text-sm" style={{ backgroundColor: "#ffffff", color: "#9a9a9a" }}>
          冷蔵庫に食材を登録してから使用してください
        </div>
      ) : (
        <button
          onClick={generate}
          className="w-full font-semibold py-3.5 rounded-full text-sm transition-all shadow-md active:scale-95"
          style={{ backgroundColor: "#2B4721", color: "#ddf0c0" }}
        >
          {isRegenerate ? "🔁 別の料理を探す" : "🔍 料理を探す"}
        </button>
      )}

      {/* レシピカード（横スクロール・全幅） */}
      {displayItems && displayItems.length > 0 && (
        <div
          className="flex gap-3 overflow-x-auto pb-2"
          style={{
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            alignItems: "stretch",
            marginLeft: "-1rem",
            marginRight: "-1rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            scrollSnapType: "x mandatory",
          }}
        >
          {displayItems.map((recipe) => (
            <div key={recipe.id} style={{ width: "calc(100vw - 2.5rem)", maxWidth: "480px", flexShrink: 0, display: "flex", height: "300px", scrollSnapAlign: "start" }}>
              <RecipeCard
                recipe={recipe}
                fridgeItems={fridgeItems}
                alreadyAdded={todayMenu.some((m) => m.name === recipe.name)}
                onAdd={() => handleAddToToday(recipe)}
                onRemove={() => {/* excluded from display on next generate */}}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RecipeCard({ recipe, fridgeItems, alreadyAdded, onAdd }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchRecipeImage(recipe.name).then((url) => {
      if (!cancelled) { setImgUrl(url); setImgLoading(false); }
    });
    return () => { cancelled = true; };
  }, [recipe.name]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 🧊 冷蔵庫の一致食材（賞味期限が近い順）
  const matchedFridge = fridgeItems
    .filter((item) => recipe.keywords.some((kw) => item.name.includes(kw) || kw.includes(item.name)))
    .sort((a, b) => {
      const da = Math.ceil((new Date(a.expiryDate) - today) / 86400000);
      const db = Math.ceil((new Date(b.expiryDate) - today) / 86400000);
      return da - db;
    });

  // 🛒 買い足し食材
  const toBuy = getIngredientsToBuy(recipe, fridgeItems);
  const toBuyVisible = toBuy.slice(0, MAX_BUY_TAGS);
  const toBuyExtra = toBuy.length - MAX_BUY_TAGS;

  return (
    <div
      className="rounded-2xl shadow-sm flex flex-col overflow-hidden w-full"
      style={{
        backgroundColor: "#ffffff",
        border: alreadyAdded ? "2px solid #2B4721" : "2px solid #e8ddd0",
      }}
    >
      {/* 料理画像エリア */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ height: "120px" }}>
        {imgUrl ? (
          <img src={imgUrl} alt={recipe.name} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-3xl"
            style={{
              background: imgLoading
                ? "linear-gradient(135deg, #e8ddd0 0%, #d8cfc4 100%)"
                : "linear-gradient(135deg, #dff0c0 0%, #c8e0a0 100%)",
            }}
          >
            {imgLoading ? "" : "🍽️"}
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <h4 className="font-semibold text-sm leading-snug" style={{ color: "#1c1a16" }}>{recipe.name}</h4>

        {/* 食材タグ */}
        {(matchedFridge.length > 0 || toBuy.length > 0) && (
          <div className="flex flex-wrap gap-1">
            {matchedFridge.map((item) => {
              const d = Math.ceil((new Date(item.expiryDate) - today) / 86400000);
              const urgent = d <= 3;
              return (
                <span
                  key={item.id}
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: urgent ? "#fff0f0" : "#dff0c0",
                    color: urgent ? "#cc4444" : "#2B4721",
                  }}
                >
                  🧊 {item.name}
                </span>
              );
            })}
            {toBuyVisible.map((kw) => (
              <span
                key={kw}
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "#f5f0ea", color: "#7a6a55" }}
              >
                🛒 {kw}
              </span>
            ))}
            {toBuyExtra > 0 && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "#ede8e0", color: "#8a7a65" }}
              >
                +{toBuyExtra}点
              </span>
            )}
          </div>
        )}

        {/* 献立に追加ボタン */}
        <button
          onClick={onAdd}
          disabled={alreadyAdded}
          className="mt-auto w-full py-2 rounded-full text-xs font-semibold transition-all active:scale-95 disabled:opacity-50"
          style={{
            backgroundColor: alreadyAdded ? "#ede8e0" : "#2B4721",
            color: alreadyAdded ? "#8a7a65" : "#ddf0c0",
          }}
        >
          {alreadyAdded ? "✓ 追加済み" : "＋ 献立に追加"}
        </button>
      </div>
    </div>
  );
}
