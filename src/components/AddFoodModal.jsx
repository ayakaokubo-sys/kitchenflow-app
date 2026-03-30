import { useState, useRef, useEffect } from "react";
import { getExpiryDays, calcExpiryDate } from "../data/expiryDays";
import { useFrequentFoods } from "../hooks/useFrequentFoods";
import { FOOD_CATEGORIES, ALL_FOODS } from "../data/foodCategories";

export default function AddFoodModal({ onAdd, onClose, initialData = null }) {
  const [query, setQuery] = useState(initialData?.name ?? "");
  const [quantity, setQuantity] = useState(String(initialData?.amount ?? 1));
  const [unitInput, setUnitInput] = useState(initialData?.unit ?? "個");
  const [selectedFood, setSelectedFood] = useState(null);
  const [expiryDate, setExpiryDate] = useState(() => {
    if (!initialData?.name) return "";
    return calcExpiryDate(new Date().toISOString(), getExpiryDays(initialData.name));
  });
  const [openCategory, setOpenCategory] = useState(null);
  const inputRef = useRef(null);
  const { topFoods, record } = useFrequentFoods();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 検索結果（クエリがあるときだけ）
  const searchResults = query.trim()
    ? ALL_FOODS.filter((f) => f.name.includes(query.trim()))
    : null;

  function selectFood(food) {
    setSelectedFood(food);
    setQuery(food.name);
    setUnitInput(food.unit ?? "個");
    setOpenCategory(null);
    const today = new Date().toISOString();
    setExpiryDate(calcExpiryDate(today, getExpiryDays(food.name)));
  }

  function handleQueryChange(e) {
    const val = e.target.value;
    setQuery(val);
    setSelectedFood(null);
    setOpenCategory(null);
    if (val.trim()) {
      setExpiryDate(calcExpiryDate(new Date().toISOString(), getExpiryDays(val)));
    } else {
      setExpiryDate("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const name = query.trim();
    if (!name || !expiryDate) return;
    const qty = parseInt(quantity, 10);
    const food = {
      name,
      emoji: selectedFood?.emoji ?? "🍱",
      unit: unitInput.trim() || "個",
      quantity: isNaN(qty) || qty < 1 ? 1 : qty,
      expiryDate,
    };
    record(food);
    onAdd(food);
  }

  function toggleCategory(label) {
    setOpenCategory((prev) => (prev === label ? null : label));
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden max-h-[90vh]">
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-800">食材を追加</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:opacity-70 active:scale-90"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e0d8d0" }}
          >
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="#c0b8b0" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* スクロール可能なフォーム領域 */}
        <div className="overflow-y-auto flex-1 px-5 pb-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* 検索入力 */}
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                食材名を入力・検索
              </label>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleQueryChange}
                placeholder="例: 卵、鶏肉、牛乳..."
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-800 text-sm"
              />
            </div>

            {/* よく購入するタグ */}
            {topFoods.length > 0 && !query.trim() && (
              <div>
                <p className="text-xs font-semibold text-gray-400 mb-1.5">よく購入する</p>
                <div className="flex flex-wrap gap-1.5">
                  {topFoods.map((food) => (
                    <button
                      key={food.name}
                      type="button"
                      onClick={() => selectFood(food)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium hover:opacity-80 transition-colors"
                      style={{ backgroundColor: "rgba(45,80,22,0.08)", border: "1px solid rgba(45,80,22,0.2)", color: "#2d5016" }}
                    >
                      <span>{food.emoji}</span>
                      <span>{food.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* カテゴリー一覧 or 検索結果 */}
            {!selectedFood && (
              <div>
                <p className="text-xs font-semibold text-gray-400 mb-1.5">
                  {query.trim() ? "検索結果" : "カテゴリーから選ぶ"}
                </p>

                {/* 検索モード */}
                {searchResults !== null ? (
                  <div className="rounded-xl border border-gray-100 overflow-hidden max-h-52 overflow-y-auto">
                    {searchResults.length === 0 ? (
                      <p className="text-xs text-gray-400 p-3">
                        「{query}」を登録します（カスタム食材）
                      </p>
                    ) : (
                      searchResults.map((food) => (
                        <FoodRow key={`${food.category}-${food.name}`} food={food} onSelect={selectFood} showCategory />
                      ))
                    )}
                  </div>
                ) : (
                  /* カテゴリーアコーディオン */
                  <div className="rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-100 max-h-52 overflow-y-auto">
                    {FOOD_CATEGORIES.map((cat) => {
                      const isOpen = openCategory === cat.label;
                      return (
                        <div key={cat.label}>
                          {/* カテゴリー見出し */}
                          <button
                            type="button"
                            onClick={() => toggleCategory(cat.label)}
                            className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                          >
                            <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                              <span className="text-base">{cat.emoji}</span>
                              {cat.label}
                              <span className="text-xs font-normal text-gray-400">
                                {cat.items.length}種類
                              </span>
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>

                          {/* 食材リスト（展開時） */}
                          {isOpen && (
                            <div className="bg-gray-50 divide-y divide-gray-100">
                              {cat.items.map((food) => (
                                <FoodRow key={food.name} food={food} onSelect={selectFood} />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* 数量 */}
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-2 block">数量</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  onBlur={() => {
                    const n = parseInt(quantity, 10);
                    setQuantity(String(isNaN(n) || n < 1 ? 1 : n));
                  }}
                  min="1"
                  className="w-16 h-10 text-center font-bold text-sm rounded-xl border focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  style={{ backgroundColor: "#f4f4f4", color: "#1c1a16", borderColor: "#d4cbbf" }}
                />
                <input
                  type="text"
                  value={unitInput}
                  onChange={(e) => setUnitInput(e.target.value)}
                  className="w-14 h-10 text-center font-medium text-sm rounded-xl border focus:outline-none"
                  style={{ backgroundColor: "#f4f4f4", color: "#7a9a62", borderColor: "#d4cbbf" }}
                />
              </div>
            </div>

            {/* 賞味期限 */}
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                賞味期限
                <span className="ml-1 font-normal text-gray-400">（自動計算・編集可）</span>
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none text-sm"
                style={{ "--tw-ring-color": "#2d5016" }}
              />
            </div>

            <button
              type="submit"
              disabled={!query.trim() || !expiryDate}
              className="w-full font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#2d5016", color: "#ddf0c0" }}
            >
              追加する
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function FoodRow({ food, onSelect, showCategory = false }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(food)}
      className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2 transition-colors"
    >
      <span className="flex-1">{food.name}</span>
      {showCategory && (
        <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
          {food.category}
        </span>
      )}
      <span className="text-xs text-gray-400">{food.unit}</span>
    </button>
  );
}
