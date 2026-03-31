import { useState, useEffect, useRef } from "react";
import { getRecipes } from "../data/recipes";

export default function RecipeSuggestion({ topItem }) {
  const recipes = getRecipes(topItem.name);
  const [recipeIndex, setRecipeIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const prevItemId = useRef(topItem.id);

  // 先頭食材が変わったらレシピをリセット
  useEffect(() => {
    if (prevItemId.current !== topItem.id) {
      prevItemId.current = topItem.id;
      setRecipeIndex(0);
      setVisible(true);
    }
  }, [topItem.id]);

  function handleReload() {
    setVisible(false);
    setTimeout(() => {
      setRecipeIndex((i) => (i + 1) % recipes.length);
      setVisible(true);
    }, 200);
  }

  const recipeName = recipes[recipeIndex];

  return (
    <div className="relative flex items-start gap-3 mb-4">
      {/* キャラクターアイコン */}
      <div className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-md" style={{ backgroundColor: "#2B4721" }}>
        🧑‍🍳
      </div>

      {/* 吹き出し */}
      <div className="relative rounded-3xl rounded-tl-lg shadow-md px-4 py-3 flex-1" style={{ backgroundColor: "#ffffff" }}>
        {/* テキスト部分 */}
        <p
          className="text-sm leading-relaxed pr-8 font-medium"
          style={{
            color: "#4a3f2f",
            opacity: visible ? 1 : 0,
            transition: "opacity 200ms ease-in-out",
          }}
        >
          How about making{" "}
          <span className="font-black" style={{ color: "#2B4721" }}>{recipeName}</span>{" "}
          with{" "}
          <span className="font-black" style={{ color: "#1c1a16" }}>{topItem.name}</span>?
        </p>

        {/* インジケーター */}
        <div
          className="flex gap-1 mt-2"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 200ms ease-in-out",
          }}
        >
          {recipes.map((_, i) => (
            <span
              key={i}
              className="block w-1.5 h-1.5 rounded-full transition-colors"
              style={{ backgroundColor: i === recipeIndex ? "#4a7a2a" : "#e8dcc8" }}
            />
          ))}
        </div>

        {/* リロードボタン */}
        <button
          onClick={handleReload}
          title="別のレシピを提案"
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-colors group hover:opacity-70"
          style={{ color: "#7a9a62" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
