import { useState, useRef } from "react";
import { FOOD_CATEGORIES } from "../data/foodCategories";

function calcDaysLeft(expiryDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
}

function formatExpiryDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getMonth() + 1}月${d.getDate()}日まで`;
}

function getCardStyle(daysLeft) {
  if (daysLeft < 0)  return { bg: "#4a1a1a", text: "#ffffff", sub: "rgba(255,255,255,0.5)", input: "rgba(255,255,255,0.12)", border: null, dark: true };
  if (daysLeft === 0) return { bg: "#ffffff", text: "#1c1a16", sub: "#9a6a3a", input: "#f4f4f4", border: "#f97316", dark: false };
  if (daysLeft <= 3)  return { bg: "#ffffff", text: "#1c1a16", sub: "#9a6a3a", input: "#f4f4f4", border: "#fb923c", dark: false };
  return { bg: "#ffffff", text: "#1c1a16", sub: "#7a9a62", input: "#f4f4f4", border: null, dark: false };
}

function StatusBadge({ daysLeft }) {
  const base = "text-xs font-black px-2 py-0.5 rounded-full border text-center";
  const style = { display: "inline-block", minWidth: "72px" };
  if (daysLeft < 0)  return <span className={base} style={{ ...style, backgroundColor: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}>期限切れ</span>;
  if (daysLeft === 0) return <span className={base} style={{ ...style, backgroundColor: "#fff3e0", borderColor: "#f97316", color: "#c2410c" }}>今日まで</span>;
  if (daysLeft <= 3)  return <span className={base} style={{ ...style, backgroundColor: "#fff7ed", borderColor: "#fb923c", color: "#ea580c" }}>あと {daysLeft} 日</span>;
  return <span className={base} style={{ ...style, backgroundColor: "rgba(45,80,22,0.08)", borderColor: "rgba(45,80,22,0.2)", color: "#2d5016" }}>あと {daysLeft} 日</span>;
}

const ALL_CATEGORIES = [...FOOD_CATEGORIES, { label: "その他", emoji: "🍽️" }];

export default function FoodCard({
  item, onUpdateQuantity, onUpdateExpiry, onUpdateName, onUpdateUnit, onUpdateCategory, onClose,
}) {
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(item.name);
  const [editingExpiry, setEditingExpiry] = useState(false);
  const [expiryInput, setExpiryInput] = useState(item.expiryDate);
  const [qtyInput, setQtyInput] = useState(String(item.quantity));
  const [unitInput, setUnitInput] = useState(item.unit);
  const nameInputRef = useRef(null);

  const daysLeft = calcDaysLeft(item.expiryDate);
  const s = getCardStyle(daysLeft);

  function handleNameSubmit() {
    const val = nameInput.trim();
    if (val) onUpdateName(item.id, val); else setNameInput(item.name);
    setEditingName(false);
  }
  function handleExpirySubmit() {
    if (expiryInput) onUpdateExpiry(item.id, expiryInput);
    setEditingExpiry(false);
  }
  function handleQtyBlur() {
    const n = parseInt(qtyInput, 10);
    if (!isNaN(n) && n >= 1) {
      const delta = n - item.quantity;
      if (delta !== 0) onUpdateQuantity(item.id, delta);
      setQtyInput(String(n));
    } else {
      setQtyInput(String(item.quantity));
    }
  }
  function handleUnitBlur() {
    const val = unitInput.trim();
    if (val) {
      onUpdateUnit?.(item.id, val);
    } else {
      setUnitInput(item.unit);
    }
  }

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-sm"
      style={{
        backgroundColor: s.bg,
        border: s.border ? `2px solid ${s.border}` : "2px solid #e8ddd0",
      }}
    >
      <div className="px-4 py-3 flex flex-col gap-2">

        {/* 上段: 食材名（左）＋ Closeボタン（右） */}
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            {editingName ? (
              <input
                ref={nameInputRef}
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onBlur={handleNameSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleNameSubmit();
                  if (e.key === "Escape") { setNameInput(item.name); setEditingName(false); }
                }}
                autoFocus
                className="font-bold text-base bg-transparent border-b-2 focus:outline-none w-full"
                style={{ color: s.text, borderColor: s.sub }}
              />
            ) : (
              <button
                onClick={() => { setNameInput(item.name); setEditingName(true); }}
                className="font-bold text-base leading-tight hover:opacity-70 text-left truncate w-full block"
                style={{ color: s.text }}
              >
                {item.name}
              </button>
            )}
          </div>

          {/* 閉じるボタン */}
          <button
            onClick={() => onClose(item.id)}
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-70 active:scale-90"
            style={{
              backgroundColor: s.dark ? "rgba(255,255,255,0.12)" : "#ffffff",
              border: s.dark ? "1px solid rgba(255,255,255,0.25)" : "1px solid #e0d8d0",
            }}
          >
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5"
                stroke={s.dark ? "rgba(255,255,255,0.7)" : "#c0b8b0"}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* 下段: バッジ＋日付（左）＋ 数量入力＋単位入力（右） */}
        <div className="flex items-center justify-between gap-2">

          {/* 左: バッジ + 日付 + カテゴリー */}
          <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
            <StatusBadge daysLeft={daysLeft} />
            {editingExpiry ? (
              <input
                type="date"
                value={expiryInput}
                onChange={(e) => setExpiryInput(e.target.value)}
                onBlur={handleExpirySubmit}
                onKeyDown={(e) => e.key === "Enter" && handleExpirySubmit()}
                autoFocus
                className="border rounded-lg px-1.5 py-0.5 text-xs focus:outline-none"
                style={{ borderColor: s.sub, color: "#1c1a16" }}
              />
            ) : (
              <button
                onClick={() => { setExpiryInput(item.expiryDate); setEditingExpiry(true); }}
                className="text-xs font-medium hover:underline whitespace-nowrap"
                style={{ color: s.sub }}
              >
                {formatExpiryDate(item.expiryDate)}
              </button>
            )}
            {/* カテゴリー変更セレクター */}
            <select
              value={item.category ?? "その他"}
              onChange={(e) => onUpdateCategory?.(item.id, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="text-xs rounded-lg focus:outline-none"
              style={{
                backgroundColor: s.dark ? "rgba(255,255,255,0.12)" : "#f0efee",
                color: s.dark ? "rgba(255,255,255,0.6)" : "#8a7a65",
                border: s.dark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #e0d8d0",
                padding: "1px 4px",
                maxWidth: "72px",
              }}
            >
              {ALL_CATEGORIES.map((cat) => (
                <option key={cat.label} value={cat.label}>{cat.emoji} {cat.label}</option>
              ))}
            </select>
          </div>

          {/* 右: 数量入力 + 単位入力（両方固定幅・直接編集） */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <input
              type="number"
              value={qtyInput}
              onChange={(e) => setQtyInput(e.target.value)}
              onBlur={handleQtyBlur}
              onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
              min="1"
              className="w-14 h-8 text-center font-bold text-sm rounded-lg border focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              style={{ backgroundColor: s.input, color: s.text, borderColor: s.dark ? "rgba(255,255,255,0.2)" : "#d4cbbf" }}
            />
            <input
              type="text"
              value={unitInput}
              onChange={(e) => setUnitInput(e.target.value)}
              onBlur={handleUnitBlur}
              onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
              className="w-10 h-8 text-center font-medium text-xs rounded-lg border focus:outline-none"
              style={{ backgroundColor: s.input, color: s.dark ? "rgba(255,255,255,0.7)" : s.sub, borderColor: s.dark ? "rgba(255,255,255,0.2)" : "#d4cbbf" }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
