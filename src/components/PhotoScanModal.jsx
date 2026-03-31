import { useState, useRef } from "react";
import { scanFoodFromPhoto, hasGeminiKey } from "../api/scanFoodApi";
import { getExpiryDays, calcExpiryDate } from "../data/expiryDays";

export default function PhotoScanModal({ onAdd, onClose }) {
  const [preview, setPreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [expiryDates, setExpiryDates] = useState({});
  const [quantities, setQuantities] = useState({});
  const [units, setUnits] = useState({});
  const [error, setError] = useState(null);
  const cameraInputRef = useRef();
  const libraryInputRef = useRef();

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      compressImage(ev.target.result, 1024, 0.75).then((compressed) => {
        setPreview(compressed.dataUrl);
        setImageData({ base64: compressed.base64, mimeType: "image/jpeg" });
        setResults(null);
        setExpiryDates({});
        setQuantities({});
        setUnits({});
        setError(null);
      });
    };
    reader.readAsDataURL(file);
  }

  function compressImage(dataUrl, maxSize, quality) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        const compressed = canvas.toDataURL("image/jpeg", quality);
        resolve({ dataUrl: compressed, base64: compressed.split(",")[1] });
      };
      img.src = dataUrl;
    });
  }

  async function handleScan() {
    if (!imageData) return;
    setScanning(true);
    setError(null);
    try {
      const items = await scanFoodFromPhoto(imageData.base64, imageData.mimeType);
      setResults(items);
      setSelected(new Set(items.map((_, i) => i)));
      const now = new Date().toISOString();
      const dates = {}, qtys = {}, us = {};
      items.forEach((item, i) => {
        dates[i] = calcExpiryDate(now, getExpiryDays(item.name));
        qtys[i] = String(item.quantity ?? 1);
        us[i] = item.unit ?? "個";
      });
      setExpiryDates(dates);
      setQuantities(qtys);
      setUnits(us);
    } catch (e) {
      setError(e.message ?? "不明なエラー");
    } finally {
      setScanning(false);
    }
  }

  function toggleSelect(i) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  }

  function handleAdd() {
    const toAdd = results
      .map((item, i) => ({ item, i }))
      .filter(({ i }) => selected.has(i))
      .map(({ item, i }) => ({
        name: item.name,
        emoji: item.emoji || "🍽️",
        quantity: parseInt(quantities[i], 10) || 1,
        unit: units[i] || "個",
        expiryDate: expiryDates[i] ?? calcExpiryDate(new Date().toISOString(), getExpiryDays(item.name)),
      }));
    onAdd(toAdd);
  }

  const noKey = !hasGeminiKey();

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-lg rounded-t-3xl overflow-y-auto"
        style={{ backgroundColor: "#fdf8f2", maxHeight: "90vh" }}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="text-lg font-semibold" style={{ color: "#1c1a16" }}>写真で食材を追加</h2>
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

        <div className="px-5 pb-8">
          {noKey && (
            <div className="mb-4 p-3 rounded-xl text-sm" style={{ backgroundColor: "#fff3cd", color: "#856404" }}>
              ⚠️ VITE_GROQ_API_KEY が未設定です。Vercelの環境変数に追加してください。
            </div>
          )}

          <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
          <input ref={libraryInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

          {!preview ? (
            <div className="space-y-3">
              {/* カメラボタン */}
              <button
                onClick={() => cameraInputRef.current.click()}
                disabled={noKey}
                className="w-full py-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                style={{ borderColor: "#c8b99a" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#ede8e0" }}
                >
                  <span className="text-3xl leading-none">📷</span>
                </div>
                <span className="font-semibold text-sm" style={{ color: "#8a7a65" }}>カメラで撮影する</span>
              </button>
              {/* ライブラリボタン */}
              <button
                onClick={() => libraryInputRef.current.click()}
                disabled={noKey}
                className="w-full py-5 rounded-2xl border-2 border-dashed flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                style={{ borderColor: "#c8b99a" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#ede8e0" }}
                >
                  <span className="text-xl leading-none">🖼️</span>
                </div>
                <span className="font-semibold text-sm" style={{ color: "#8a7a65" }}>フォトライブラリから選ぶ</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* プレビュー */}
              <div className="relative rounded-2xl overflow-hidden" style={{ backgroundColor: "#000" }}>
                <img src={preview} alt="preview" className="w-full object-contain" style={{ maxHeight: 240 }} />
                <button
                  onClick={() => { setPreview(null); setImageData(null); setResults(null); setError(null); }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 active:scale-90"
                  style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
                >
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <div className="flex gap-3">
                <button onClick={() => cameraInputRef.current.click()} className="text-sm font-semibold underline" style={{ color: "#2B4721" }}>撮り直す</button>
                <span style={{ color: "#c8b99a" }}>|</span>
                <button onClick={() => libraryInputRef.current.click()} className="text-sm font-semibold underline" style={{ color: "#2B4721" }}>ライブラリから選ぶ</button>
              </div>

              {!results && (
                <button
                  onClick={handleScan}
                  disabled={scanning || noKey}
                  className="w-full py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-50"
                  style={{ backgroundColor: "#2B4721", color: "#ddf0c0" }}
                >
                  {scanning ? <><span className="inline-block animate-spin">⟳</span> AIが食材を認識中...</> : "🔍 食材を認識する"}
                </button>
              )}

              {error && (
                <div className="p-3 rounded-xl text-sm" style={{ backgroundColor: "#fde8e8", color: "#b91c1c" }}>❌ {error}</div>
              )}

              {results && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm" style={{ color: "#1c1a16" }}>
                      {results.length === 0 ? "食材が見つかりませんでした" : `${results.length}品を認識しました`}
                    </p>
                    {results.length > 0 && (
                      <button
                        onClick={() => setSelected(selected.size === results.length ? new Set() : new Set(results.map((_, i) => i)))}
                        className="text-xs font-semibold" style={{ color: "#2B4721" }}
                      >
                        {selected.size === results.length ? "すべて解除" : "すべて選択"}
                      </button>
                    )}
                  </div>

                  {results.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl"
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1.5px solid #e0d5c5",
                      }}
                    >
                      {/* 食材行 */}
                      <label className="flex items-center gap-3 p-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selected.has(i)}
                          onChange={() => toggleSelect(i)}
                          className="w-4 h-4 accent-green-800 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate" style={{ color: "#1c1a16" }}>{item.name}</p>
                        </div>
                      </label>

                      {/* 賞味期限・数量・単位行（チェック時のみ） */}
                      {selected.has(i) && (
                        <div className="flex items-center gap-2 px-3 pb-3" onClick={(e) => e.stopPropagation()}>
                          <span className="text-xs font-semibold shrink-0" style={{ color: "#5a4a35" }}>賞味期限</span>
                          <input
                            type="date"
                            value={expiryDates[i] ?? ""}
                            onChange={(e) => setExpiryDates((prev) => ({ ...prev, [i]: e.target.value }))}
                            className="text-xs px-2 py-1 rounded-lg border focus:outline-none"
                            style={{ borderColor: "#c8b99a", color: "#1c1a16", backgroundColor: "#fdf8f2", width: "130px", flexShrink: 0 }}
                          />
                          <input
                            type="number"
                            value={quantities[i] ?? String(item.quantity ?? 1)}
                            onChange={(e) => setQuantities((prev) => ({ ...prev, [i]: e.target.value }))}
                            min="1"
                            className="h-7 text-center text-xs font-bold rounded-lg border focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                            style={{ backgroundColor: "#f4f4f4", color: "#1c1a16", borderColor: "#d4cbbf", width: "44px", flexShrink: 0 }}
                          />
                          <input
                            type="text"
                            value={units[i] ?? item.unit ?? "個"}
                            onChange={(e) => setUnits((prev) => ({ ...prev, [i]: e.target.value }))}
                            className="h-7 text-center text-xs rounded-lg border focus:outline-none"
                            style={{ backgroundColor: "#f4f4f4", color: "#7a9a62", borderColor: "#d4cbbf", width: "52px", flexShrink: 0 }}
                          />
                        </div>
                      )}
                    </div>
                  ))}

                  {results.length > 0 && (
                    <>
                      <button
                        onClick={handleScan}
                        className="w-full py-2.5 rounded-full text-sm font-semibold border"
                        style={{ borderColor: "#c8b99a", color: "#5a4a35", backgroundColor: "#fdf8f2" }}
                      >🔄 再認識する</button>
                      <button
                        onClick={handleAdd}
                        disabled={selected.size === 0}
                        className="w-full py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-40"
                        style={{ backgroundColor: "#2B4721", color: "#ddf0c0" }}
                      >
                        🧊 {selected.size}品を冷蔵庫に追加
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
