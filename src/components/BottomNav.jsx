export default function BottomNav({ activeTab, onChange, shoppingCount }) {
  const tabs = [
    { id: "fridge",   label: "冷蔵庫",     icon: "🧊" },
    { id: "planner",  label: "献立プラン",  icon: "👨‍🍳" },
    { id: "shopping", label: "買い物リスト", icon: "🛒" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur border-t shadow-xl"
      style={{ backgroundColor: "rgba(245,237,224,0.96)", borderColor: "#e8d9c4" }}
    >
      <div className="max-w-lg mx-auto flex px-2 py-2 gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl relative transition-all active:scale-95"
              style={{ color: isActive ? "#2d5016" : "#9a8a78" }}
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              <span className="text-xs font-bold">{tab.label}</span>

              {/* 選択インジケーター（下線） */}
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full transition-all"
                style={{
                  width: isActive ? "28px" : "0px",
                  height: "3px",
                  backgroundColor: "#2d5016",
                  opacity: isActive ? 1 : 0,
                }}
              />

              {tab.id === "shopping" && shoppingCount > 0 && (
                <span
                  className="absolute top-1 right-[10%] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center leading-none shadow-sm"
                  style={{ backgroundColor: "#8b3a2a", color: "#fff" }}
                >
                  {shoppingCount > 9 ? "9+" : shoppingCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
