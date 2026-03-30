import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  {
    label: "野菜",
    emojis: [
      "🥦","🥕","🧅","🧄","🥔","🍠","🌽","🥒","🍆","🥑","🍅","🌶️",
      "🫑","🥬","🥗","🫛","🌿","🪴",
    ],
  },
  {
    label: "果物",
    emojis: [
      "🍎","🍊","🍋","🍇","🍓","🫐","🍈","🍑","🍒","🍍","🥭","🍌",
      "🍉","🍐","🥝","🍏","🫒","🍄",
    ],
  },
  {
    label: "肉・魚",
    emojis: [
      "🍗","🥩","🥓","🌭","🍖","🐟","🦐","🦑","🦀","🦞","🦪","🍣",
      "🍤","🥚","🐠","🐡","🫀",
    ],
  },
  {
    label: "乳製品・穀物",
    emojis: [
      "🥛","🧀","🧈","🍳","🥞","🧇","🍞","🥐","🥖","🫓","🥨","🥯",
      "🧁","🍰","🎂","🍮",
    ],
  },
  {
    label: "調理済み・その他",
    emojis: [
      "🍱","🍜","🍝","🍛","🍲","🥘","🫕","🍙","🍚","🍘","🥟","🥡",
      "🍦","🍧","🍫","🧃","🥤","🍶","🧂","🫙","🧊","🍺","☕","🫖",
    ],
  },
];

const ALL_EMOJIS = CATEGORIES.flatMap((c) => c.emojis);

export default function EmojiPickerModal({ currentEmoji, onSelect, onClose }) {
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  // シンプルな文字列一致（絵文字自体の部分一致）
  const filtered = query.trim()
    ? ALL_EMOJIS.filter((e) => e.includes(query.trim()))
    : null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm flex flex-col overflow-hidden max-h-[80vh]">
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentEmoji}</span>
            <h2 className="text-base font-bold text-gray-800">絵文字を選択</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-lg"
          >
            ×
          </button>
        </div>

        {/* 検索 */}
        <div className="px-4 pb-2 flex-shrink-0">
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="絵文字を入力して検索..."
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* 絵文字グリッド */}
        <div className="overflow-y-auto px-4 pb-4 flex-1">
          {filtered ? (
            filtered.length > 0 ? (
              <EmojiGrid emojis={filtered} current={currentEmoji} onSelect={onSelect} />
            ) : (
              <p className="text-center text-gray-400 text-sm py-8">該当なし</p>
            )
          ) : (
            CATEGORIES.map((cat) => (
              <div key={cat.label} className="mb-4">
                <p className="text-xs font-semibold text-gray-400 mb-1">{cat.label}</p>
                <EmojiGrid emojis={cat.emojis} current={currentEmoji} onSelect={onSelect} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function EmojiGrid({ emojis, current, onSelect }) {
  return (
    <div className="grid grid-cols-8 gap-1">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          className={`
            text-2xl w-9 h-9 flex items-center justify-center rounded-xl
            hover:bg-emerald-50 hover:scale-110 transition-transform
            ${emoji === current ? "bg-emerald-100 ring-2 ring-emerald-400" : ""}
          `}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
