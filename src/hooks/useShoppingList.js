import { useState } from "react";

const STORAGE_KEY = "freshkeep_shopping_list";
let nextId = Date.now();

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function persist(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useShoppingList() {
  const [items, setItems] = useState(load);

  function addItem({ name, amount, unit, source = null }) {
    setItems((prev) => {
      // 未購入の同名アイテムがあれば数量を合算
      const existing = prev.find((i) => i.name === name && !i.checked);
      let next;
      if (existing) {
        next = prev.map((i) =>
          i.id === existing.id ? { ...i, amount: i.amount + amount } : i
        );
      } else {
        next = [
          ...prev,
          {
            id: String(nextId++),
            name,
            amount,
            unit,
            checked: false,
            source,
            createdAt: new Date().toISOString(),
          },
        ];
      }
      persist(next);
      return next;
    });
  }

  function addItems(newItems) {
    // 一括追加（重複は合算）
    newItems.forEach((item) => addItem(item));
  }

  function toggleItem(id) {
    setItems((prev) => {
      const next = prev.map((i) =>
        i.id === id ? { ...i, checked: !i.checked } : i
      );
      persist(next);
      return next;
    });
  }

  function removeItem(id) {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      persist(next);
      return next;
    });
  }

  function clearChecked() {
    setItems((prev) => {
      const next = prev.filter((i) => !i.checked);
      persist(next);
      return next;
    });
  }

  function clearAll() {
    persist([]);
    setItems([]);
  }

  function updateItem(id, changes) {
    setItems((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, ...changes } : i));
      persist(next);
      return next;
    });
  }

  function clearBySource(source) {
    setItems((prev) => {
      const next = prev.filter((i) => i.source !== source);
      persist(next);
      return next;
    });
  }

  return { items, addItem, addItems, toggleItem, removeItem, updateItem, clearChecked, clearAll, clearBySource };
}
