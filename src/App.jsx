import { useState, useEffect } from "react";
import FoodCard from "./components/FoodCard";
import AddFoodModal from "./components/AddFoodModal";
import BottomNav from "./components/BottomNav";
import ComboPlanner from "./components/ComboPlanner";
import ShoppingListView from "./components/ShoppingListView";
import { useShoppingList } from "./hooks/useShoppingList";
import PhotoScanModal from "./components/PhotoScanModal";
import { getExpiryDays, calcExpiryDate } from "./data/expiryDays";
import { FOOD_CATEGORIES, ALL_FOODS } from "./data/foodCategories";


function getFoodCategory(name) {
  // 1. 完全一致を優先
  const exact = ALL_FOODS.find((f) => f.name === name);
  if (exact) return exact.category;
  // 2. 部分一致 → 最長一致（より具体的なもの）を採用
  const partials = ALL_FOODS.filter(
    (f) => name.includes(f.name) || f.name.includes(name)
  );
  if (partials.length === 0) return "その他";
  partials.sort((a, b) => b.name.length - a.name.length);
  return partials[0].category;
}

function calcDaysLeft(expiryDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
}

const INITIAL_ITEMS = [
  {
    id: 1, name: "卵", emoji: "🥚", unit: "個", quantity: 6,
    expiryDate: (() => { const d = new Date(); d.setDate(d.getDate() + 2); return d.toISOString().split("T")[0]; })(),
    registeredAt: new Date().toISOString(),
  },
  {
    id: 2, name: "牛乳", emoji: "🥛", unit: "本", quantity: 2,
    expiryDate: (() => { const d = new Date(); d.setDate(d.getDate() + 5); return d.toISOString().split("T")[0]; })(),
    registeredAt: new Date().toISOString(),
  },
  {
    id: 3, name: "鶏肉", emoji: "🍗", unit: "g", quantity: 300,
    expiryDate: (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split("T")[0]; })(),
    registeredAt: new Date().toISOString(),
  },
];

let nextId = (() => {
  try {
    const saved = localStorage.getItem("freshkeep_fridge_items");
    if (saved) {
      const items = JSON.parse(saved);
      if (items.length > 0) return Math.max(...items.map((i) => i.id)) + 1;
    }
  } catch {}
  return 10;
})();

const SOURCE_URLS = {
  "サッポロビール": "https://www.sapporobeer.jp/feature/recipe/",
  "キリンレシピノート": "https://recipe.kirin.co.jp/",
  "アサヒビール": "https://www.asahibeer.co.jp/enjoy/recipe/index.psp.html",
  "サントリー": "https://recipe.suntory.co.jp/",
  "ビール女子": "https://beergirl.net/category/recipe/",
};

export default function App() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("freshkeep_fridge_items");
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ITEMS;
  });
  const [activeTab, setActiveTab] = useState("fridge");
  const [showModal, setShowModal] = useState(false);
  const [modalInitialData, setModalInitialData] = useState(null);
  const [showPhotoScan, setShowPhotoScan] = useState(false);
  const [toast, setToast] = useState(null);
  const [showAllFridgeItems, setShowAllFridgeItems] = useState(false);
  const [customCategories, setCustomCategories] = useState(() => {
    try {
      const saved = localStorage.getItem("freshkeep_custom_categories");
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });
  const [showNewCatInput, setShowNewCatInput] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [dragOverCatId, setDragOverCatId] = useState(null);

  // 冷蔵庫アイテムをlocalStorageに永続化
  useEffect(() => {
    try {
      localStorage.setItem("freshkeep_fridge_items", JSON.stringify(items));
    } catch {}
  }, [items]);

  // カスタムカテゴリーを永続化
  useEffect(() => {
    try {
      localStorage.setItem("freshkeep_custom_categories", JSON.stringify(customCategories));
    } catch {}
  }, [customCategories]);

  const shopping = useShoppingList();

  const [todayMenu, setTodayMenu] = useState([]);

  // 賞味期限が近い順にソート
  const sortedItems = [...items].sort(
    (a, b) => calcDaysLeft(a.expiryDate) - calcDaysLeft(b.expiryDate)
  );

  const warningCount = items.filter((i) => calcDaysLeft(i.expiryDate) <= 3).length;
  const uncheckedShoppingCount = shopping.items.filter((i) => !i.checked).length;

  // トースト表示
  function showToast(msg) {
    setToast(msg);
  }
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  // カスタムカテゴリー管理
  function handleAddCustomCategory() {
    const name = newCatName.trim();
    if (!name) return;
    setCustomCategories((prev) => [...prev, { id: Date.now(), name }]);
    setNewCatName("");
    setShowNewCatInput(false);
  }
  function handleDeleteCustomCategory(catId) {
    setCustomCategories((prev) => prev.filter((c) => c.id !== catId));
    setItems((prev) => prev.map((item) =>
      item.customCategoryId === catId ? { ...item, customCategoryId: null } : item
    ));
  }
  function handleDropToCategory(itemId, catId) {
    setItems((prev) => prev.map((item) =>
      item.id === itemId ? { ...item, customCategoryId: catId ?? null } : item
    ));
  }

  // 冷蔵庫CRUD

  function handleAdd({ name, emoji, unit, quantity, expiryDate }) {
    setItems((prev) => [
      ...prev,
      { id: nextId++, name, emoji, unit, quantity, expiryDate, category: getFoodCategory(name), registeredAt: new Date().toISOString() },
    ]);
    setShowModal(false);
    setModalInitialData(null);
  }

  // 写真スキャンから複数食材を一括追加
  function handleAddFromScan(foodList) {
    const now = new Date().toISOString();
    setItems((prev) => [
      ...prev,
      ...foodList.map((f) => ({ id: nextId++, ...f, registeredAt: now })),
    ]);
    setShowPhotoScan(false);
    showToast(`🧊 ${foodList.length}品を追加しました`);
  }

  function handleUpdateQuantity(id, delta) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  }

  function handleUpdateExpiry(id, date) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, expiryDate: date } : item))
    );
  }

  function handleUpdateEmoji(id, emoji) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, emoji } : item))
    );
  }

  function handleUpdateName(id, name) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name } : item))
    );
  }

  function handleUpdateUnit(id, unit) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unit } : item))
    );
  }

  function handleClose(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  // 献立プラン実行 → 食材消費
  function handleConsumePlan(usedIngredients) {
    setItems((prev) => {
      let next = [...prev];
      usedIngredients.forEach(({ name, amount, unit }) => {
        const idx = next.findIndex(
          (item) =>
            item.name.includes(name) || name.includes(item.name)
        );
        if (idx === -1) return;
        const item = next[idx];
        // 単位が一致する場合のみ差し引く
        if (item.unit === unit) {
          const newQty = item.quantity - amount;
          if (newQty <= 0) {
            next = next.filter((_, i) => i !== idx);
          } else {
            next = next.map((it, i) => (i === idx ? { ...it, quantity: newQty } : it));
          }
        }
      });
      return next;
    });
    setActiveTab("fridge");
  }

  // 買い物リスト → 冷蔵庫登録
  function handleAddToFridgeFromShopping(shoppingItem) {
    setModalInitialData({
      name: shoppingItem.name,
      amount: shoppingItem.amount,
      unit: shoppingItem.unit,
    });
    setShowModal(true);
    setActiveTab("fridge");
  }

  // 今日の献立 追加
  function handleAddToToday(newMenuItems) {
    setTodayMenu((prev) => {
      const existing = new Set(prev.map((r) => r.name));
      return [...prev, ...newMenuItems.filter((r) => !existing.has(r.name))];
    });
  }

  // 今日の献立 削除
  function handleRemoveFromTodayMenu(name) {
    setTodayMenu((prev) => prev.filter((r) => r.name !== name));
  }

  // 「食べた」→ そのレシピのキーワードに一致する冷蔵庫食材を消費
  function handleEatRecipe(recipe) {
    const keywords = recipe.keywords ?? [];
    if (keywords.length > 0) {
      setItems((prev) =>
        prev.filter(
          (item) => !keywords.some((kw) => item.name.includes(kw) || kw.includes(item.name))
        )
      );
    }
    setTodayMenu((prev) => prev.filter((r) => r.name !== recipe.name));
    showToast("🍽️ 冷蔵庫から食材を削除しました");
  }

  // 購入済みアイテムを一括で冷蔵庫に追加
  function handleAddAllCheckedToFridge(checkedItems) {
    if (checkedItems.length === 0) return;
    const now = new Date().toISOString();
    const newItems = checkedItems.map((si) => ({
      id: nextId++,
      name: si.name,
      emoji: "🍱",
      unit: si.unit,
      quantity: si.amount,
      expiryDate: calcExpiryDate(now, getExpiryDays(si.name)),
      registeredAt: now,
    }));
    setItems((prev) => [...prev, ...newItems]);
    shopping.clearChecked();
    showToast(`🧊 ${newItems.length}品を冷蔵庫に追加しました`);
    setActiveTab("fridge");
  }

  // モーダルを閉じる
  function handleCloseModal() {
    setShowModal(false);
    setModalInitialData(null);
  }

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: "#F1E9DD" }}>
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 backdrop-blur border-b shadow-sm" style={{ backgroundColor: "rgba(241,233,221,0.92)", borderColor: "#e8d9c4" }}>
        <div className="max-w-lg mx-auto px-5 py-4 flex items-center justify-center">
          <h1 className="text-xl font-black leading-tight tracking-tight" style={{ color: "#1c1a16" }}>Kitchenflow</h1>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main>
        {/* 冷蔵庫タブ */}
        {activeTab === "fridge" && (
          <div className="max-w-lg mx-auto px-4 py-6">
            {/* 食材を追加ボタン群 */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 font-bold py-3 rounded-full text-sm transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95"
                style={{ backgroundColor: "#2B4721", color: "#ddf0c0" }}
              >
                <span className="text-base leading-none font-black">＋</span>
                <span>食材を追加</span>
              </button>
              <button
                onClick={() => setShowPhotoScan(true)}
                className="w-12 h-12 rounded-full font-black text-base transition-all shadow-md flex items-center justify-center active:scale-95 flex-shrink-0"
                style={{ backgroundColor: "#ffffff", border: "1.5px solid #c0b8b0", color: "#2B4721" }}
                title="写真から食材を追加"
              >
                📷
              </button>
            </div>

            {/* カテゴリーを追加（食材がある場合のみ表示） */}
            {showNewCatInput ? (
              <div className="mb-4 rounded-2xl overflow-hidden shadow-sm" style={{ backgroundColor: "#ffffff", border: "1.5px solid #e8ddd0" }}>
                <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: "#f0e8e0" }}>
                  <span className="text-sm font-semibold" style={{ color: "#1c1a16" }}>カテゴリーを選択</span>
                  <button
                    onClick={() => setShowNewCatInput(false)}
                    className="w-6 h-6 rounded-full flex items-center justify-center hover:opacity-70"
                    style={{ backgroundColor: "#f4f4f4", border: "1px solid #e0d8d0" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="#c0b8b0" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                <div className="max-h-52 overflow-y-auto">
                  {FOOD_CATEGORIES
                    .filter((cat) => !customCategories.some((c) => c.name === cat.label))
                    .map((cat) => (
                      <button
                        key={cat.label}
                        onClick={() => {
                          setCustomCategories((prev) => [...prev, { id: Date.now(), name: cat.label }]);
                          setShowNewCatInput(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:opacity-70 active:scale-95 border-b last:border-0 transition-all"
                        style={{ borderColor: "#f0e8e0", color: "#1c1a16" }}
                      >
                        <span className="text-base">{cat.emoji}</span>
                        <span className="text-sm font-semibold">{cat.label}</span>
                      </button>
                    ))}
                </div>
              </div>
            ) : sortedItems.length > 0 ? (
              <button
                onClick={() => setShowNewCatInput(true)}
                className="mb-3 flex items-center gap-1 hover:opacity-70 active:scale-95 transition-all"
                style={{ color: "#8a7a65" }}
              >
                <span className="text-sm font-semibold">＋ カテゴリーを追加</span>
              </button>
            ) : null}

            {/* カスタムカテゴリーエリア */}
            {customCategories.map((cat) => {
              const catItems = sortedItems.filter((i) => i.customCategoryId === cat.id);
              const isOver = dragOverCatId === cat.id;
              return (
                <div
                  key={cat.id}
                  className="rounded-2xl p-3 mb-4 transition-colors"
                  style={{
                    border: isOver ? "2px dashed #2B4721" : "2px dashed #c8b99a",
                    backgroundColor: isOver ? "rgba(43,71,33,0.04)" : "transparent",
                  }}
                  onDragOver={(e) => { e.preventDefault(); setDragOverCatId(cat.id); }}
                  onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragOverCatId(null); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const id = parseInt(e.dataTransfer.getData("text/plain"), 10);
                    if (!isNaN(id)) handleDropToCategory(id, cat.id);
                    setDragOverCatId(null);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold" style={{ color: "#5a4a35" }}>{cat.name}</p>
                    <button
                      onClick={() => handleDeleteCustomCategory(cat.id)}
                      className="w-5 h-5 rounded-full flex items-center justify-center hover:opacity-70"
                      style={{ color: "#c0b0a0" }}
                    >
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                  {catItems.length === 0 ? (
                    <p className="text-xs text-center py-4" style={{ color: "#b0a090" }}>ここにドラッグ</p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {catItems.map((item) => (
                        <FoodCard
                          key={item.id}
                          item={item}
                          onUpdateQuantity={handleUpdateQuantity}
                          onUpdateExpiry={handleUpdateExpiry}
                          onUpdateName={handleUpdateName}
                          onUpdateUnit={handleUpdateUnit}
                          onClose={handleClose}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* 標準食材エリア（カスタムカテゴリー未割り当て） */}
            {(() => {
              const standardItems = sortedItems.filter((i) => !i.customCategoryId);
              if (standardItems.length === 0 && customCategories.length > 0) return null;

              const urgentItems = standardItems.filter((i) => calcDaysLeft(i.expiryDate) <= 3);
              const otherItems  = standardItems.filter((i) => calcDaysLeft(i.expiryDate) >  3);
              const displayItems = showAllFridgeItems ? standardItems : urgentItems;

              const renderGroup = (itemList) => {
                const allCats = [...FOOD_CATEGORIES, { label: "その他", emoji: "🍽️" }];
                return allCats.map((cat) => {
                  const catItems = itemList.filter((i) => getFoodCategory(i.name) === cat.label);
                  if (catItems.length === 0) return null;
                  return (
                    <div key={cat.label}>
                      <p className="text-sm font-semibold mb-2" style={{ color: "#8a7a65" }}>
                        {cat.emoji} {cat.label}
                      </p>
                      <div className="flex flex-col gap-3">
                        {catItems.map((item) => (
                          <FoodCard
                            key={item.id}
                            item={item}
                            onUpdateQuantity={handleUpdateQuantity}
                            onUpdateExpiry={handleUpdateExpiry}
                            onUpdateName={handleUpdateName}
                            onUpdateUnit={handleUpdateUnit}
                            onClose={handleClose}
                          />
                        ))}
                      </div>
                    </div>
                  );
                });
              };

              return (
                <div
                  className="flex flex-col gap-5"
                  onDragOver={(e) => { e.preventDefault(); setDragOverCatId("standard"); }}
                  onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragOverCatId(null); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const id = parseInt(e.dataTransfer.getData("text/plain"), 10);
                    if (!isNaN(id)) handleDropToCategory(id, null);
                    setDragOverCatId(null);
                  }}
                  style={{ outline: dragOverCatId === "standard" ? "2px dashed #c8b99a" : "none", borderRadius: "16px", padding: dragOverCatId === "standard" ? "8px" : "0" }}
                >
                  {standardItems.length === 0 ? (
                    <div className="text-center py-20">
                      <p className="text-5xl mb-4">🍽️</p>
                      <p className="text-gray-400 font-medium">食材が登録されていません</p>
                      <p className="text-gray-300 text-sm mt-1">「＋ 追加」から食材を登録しましょう</p>
                    </div>
                  ) : (
                    <>
                      {urgentItems.length === 0 && !showAllFridgeItems && (
                        <p className="text-sm text-center py-4" style={{ color: "#9a8a78" }}>
                          期限が迫っている食材はありません
                        </p>
                      )}
                      {renderGroup(displayItems)}

                      {otherItems.length > 0 && (
                        <div className="flex justify-end">
                          <button
                            onClick={() => setShowAllFridgeItems((v) => !v)}
                            className="text-xs font-semibold flex items-center gap-1 hover:opacity-70 active:scale-95 transition-all"
                            style={{ color: "#8a7a65" }}
                          >
                            {showAllFridgeItems ? <>折りたたむ <span>▲</span></> : <>他に {otherItems.length} 品の食材 <span>▼</span></>}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* 献立プランタブ */}
        {activeTab === "planner" && (
          <ComboPlanner
            fridgeItems={sortedItems}
            todayMenu={todayMenu}
            onAddToToday={handleAddToToday}
            onRemoveFromToday={handleRemoveFromTodayMenu}
            onAddToShoppingList={shopping.addItems}
            onEatRecipe={handleEatRecipe}
            onShowToast={showToast}
          />
        )}

        {/* 買い物リストタブ */}
        {activeTab === "shopping" && (
          <ShoppingListView
            items={shopping.items}
            onToggle={shopping.toggleItem}
            onRemove={shopping.removeItem}
            onUpdateItem={shopping.updateItem}
            onClearChecked={shopping.clearChecked}
            onAddItem={(item) => shopping.addItem(item)}
            onAddToFridge={handleAddToFridgeFromShopping}
            onAddAllCheckedToFridge={handleAddAllCheckedToFridge}
          />
        )}
      </main>

      {/* ボトムナビ */}
      <BottomNav
        activeTab={activeTab}
        onChange={setActiveTab}
        shoppingCount={uncheckedShoppingCount}
      />

      {/* 写真スキャンモーダル */}
      {showPhotoScan && (
        <PhotoScanModal
          onAdd={handleAddFromScan}
          onClose={() => setShowPhotoScan(false)}
        />
      )}

      {/* 食材追加モーダル */}
      {showModal && (
        <AddFoodModal
          onAdd={handleAdd}
          onClose={handleCloseModal}
          initialData={modalInitialData}
        />
      )}

      {/* トースト通知 */}
      {toast && (
        <div
          key={toast}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-2xl whitespace-nowrap"
          style={{ backgroundColor: "#2B4721", animation: "fadeInUp 0.25s ease-out" }}
        >
          {toast}
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, 12px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
