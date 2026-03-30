import { useState } from "react";

const STORAGE_KEY = "freshkeep_frequent_foods";
const MAX_TAGS = 8;

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function persist(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * 購入履歴を localStorage に保存・取得するフック。
 * record(food) を呼ぶたびにその食材のカウントを +1 する。
 * topFoods は購入回数の多い順に最大 MAX_TAGS 件返す。
 */
export function useFrequentFoods() {
  const [counts, setCounts] = useState(load);

  function record(food) {
    setCounts((prev) => {
      const next = { ...prev };
      const key = food.name;
      next[key] = {
        name: food.name,
        emoji: food.emoji,
        unit: food.unit,
        count: (next[key]?.count ?? 0) + 1,
      };
      persist(next);
      return next;
    });
  }

  const topFoods = Object.values(counts)
    .sort((a, b) => b.count - a.count)
    .slice(0, MAX_TAGS);

  return { topFoods, record };
}
