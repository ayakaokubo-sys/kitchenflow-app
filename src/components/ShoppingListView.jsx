import { useState } from "react";
import AddFoodModal from "./AddFoodModal";

export default function ShoppingListView({
  items, onToggle, onRemove, onUpdateItem, onClearChecked, onAddItem, onAddToFridge, onAddAllCheckedToFridge,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showChecked, setShowChecked] = useState(false);

  const unchecked = items.filter((i) => !i.checked);
  const checked   = items.filter((i) => i.checked);

  function handleModalAdd({ name, quantity, unit }) {
    onAddItem({ name, amount: quantity, unit });
    setShowAddModal(false);
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-4">
      {/* ツールバー */}
      <div className="flex items-center justify-between">
        <p className="font-semibold text-base" style={{ color: "#1c1a16" }}>
          買い物リスト
          {unchecked.length > 0 && (
            <span className="ml-2 text-sm font-normal" style={{ color: "#9a8a78" }}>
              {unchecked.length} 件
            </span>
          )}
        </p>
        <button
          onClick={() => setShowAddModal(true)}
          className="font-semibold text-xs px-3 py-2 rounded-full flex items-center gap-1 active:scale-95 transition-all"
          style={{ backgroundColor: "#2B4721", color: "#ddf0c0" }}
        >
          <span>＋</span> 手動追加
        </button>
      </div>

      {showAddModal && (
        <AddFoodModal
          onAdd={handleModalAdd}
          onClose={() => setShowAddModal(false)}
          hideExpiry
        />
      )}

      {/* 未購入リスト */}
      {unchecked.length === 0 && checked.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-3">🛒</p>
          <p className="font-medium" style={{ color: "#9a8a78" }}>買い物リストは空です</p>
          <p className="text-sm mt-1" style={{ color: "#b0a090" }}>献立プランから自動追加、または手動で追加できます</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {unchecked.map((item) => (
              <ShoppingItem
                key={item.id}
                item={item}
                onToggle={onToggle}
                onRemove={onRemove}
                onUpdateItem={onUpdateItem}
              />
            ))}
          </div>

          {/* 購入済みセクション */}
          {checked.length > 0 && (
            <div>
              <div className="flex items-center justify-between py-2">
                <button
                  onClick={() => setShowChecked((v) => !v)}
                  className="flex items-center gap-1.5 text-xs font-semibold hover:opacity-70 transition-opacity"
                  style={{ color: "#9a8a78" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className={`w-4 h-4 transition-transform ${showChecked ? "rotate-180" : ""}`}
                  >
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                  購入済み（{checked.length}件）
                </button>
                <button
                  onClick={() => onAddAllCheckedToFridge?.(checked)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full active:scale-95 transition-all"
                  style={{ backgroundColor: "rgba(43,71,33,0.08)", color: "#2B4721", border: "1px solid rgba(43,71,33,0.2)" }}
                >
                  🧊 食材を冷蔵庫へ
                </button>
              </div>

              {showChecked && (
                <div className="flex flex-col gap-3 opacity-60">
                  {checked.map((item) => (
                    <ShoppingItem
                      key={item.id}
                      item={item}
                      onToggle={onToggle}
                      onRemove={onRemove}
                      onUpdateItem={onUpdateItem}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

const checkPopStyle = `
@keyframes checkPop {
  0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
  60%  { transform: scale(1.3) rotate(5deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
.check-pop { animation: checkPop 0.22s ease-out both; }
`;

function ShoppingItem({ item, onToggle, onRemove, onUpdateItem }) {
  const [amountInput, setAmountInput] = useState(String(item.amount));
  const [unitInput, setUnitInput] = useState(item.unit);
  const [animatingChecked, setAnimatingChecked] = useState(false);

  function handleCheckboxClick() {
    if (!item.checked) {
      setAnimatingChecked(true);
      setTimeout(() => { setAnimatingChecked(false); onToggle(item.id); }, 300);
    } else {
      onToggle(item.id);
    }
  }

  const displayChecked = item.checked || animatingChecked;

  function handleAmountBlur() {
    const n = parseInt(amountInput, 10);
    if (!isNaN(n) && n >= 1) {
      onUpdateItem?.(item.id, { amount: n });
      setAmountInput(String(n));
    } else {
      setAmountInput(String(item.amount));
    }
  }

  function handleUnitBlur() {
    const val = unitInput.trim();
    if (val) {
      onUpdateItem?.(item.id, { unit: val });
    } else {
      setUnitInput(item.unit);
    }
  }

  return (
    <>
      <style>{checkPopStyle}</style>
      <div className="flex items-center gap-3">
        {/* 正方形チェックボックス（カード外・左） */}
        <button
          onClick={handleCheckboxClick}
          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors"
          style={{
            backgroundColor: displayChecked ? "#2B4721" : "#ffffff",
            border: displayChecked ? "2px solid #2B4721" : "2px solid #c0b8b0",
          }}
        >
          {displayChecked && (
            <svg key={animatingChecked ? "anim" : "static"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 check-pop" style={{ color: "#ffffff" }}>
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* カード本体: 1行レイアウト（名前中央揃え） */}
        <div
          className="flex-1 rounded-2xl overflow-hidden shadow-sm"
          style={{
            backgroundColor: "#ffffff",
            border: "2px solid #e8ddd0",
            opacity: displayChecked ? 0.65 : 1,
          }}
        >
          <div className="px-4 py-3 flex items-center gap-2">
            {/* 食材名（flex-1で伸び、上下中央） */}
            <span
              className="font-bold text-base flex-1 min-w-0 truncate"
              style={{
                color: displayChecked ? "#9a8a78" : "#1c1a16",
                textDecoration: displayChecked ? "line-through" : "none",
              }}
            >
              {item.name}
            </span>

            {/* 数量・単位 */}
            <input
              type="number"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              onBlur={handleAmountBlur}
              onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
              min="1"
              className="w-14 h-8 text-center font-bold text-sm rounded-lg border focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              style={{ backgroundColor: "#f4f4f4", color: "#1c1a16", borderColor: "#d4cbbf" }}
            />
            <input
              type="text"
              value={unitInput}
              onChange={(e) => setUnitInput(e.target.value)}
              onBlur={handleUnitBlur}
              onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
              className="w-10 h-8 text-center font-medium text-xs rounded-lg border focus:outline-none"
              style={{ backgroundColor: "#f4f4f4", color: "#7a9a62", borderColor: "#d4cbbf" }}
            />

            {/* 閉じるボタン */}
            <button
              onClick={() => onRemove(item.id)}
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-70 active:scale-90"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e0d8d0" }}
            >
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="#c0b8b0" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
