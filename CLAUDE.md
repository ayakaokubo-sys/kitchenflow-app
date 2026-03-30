# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

No test runner is configured.

## Environment

`.env` file at the project root (optional — app works without these keys):
```
VITE_ANTHROPIC_API_KEY=sk-ant-api03-...   # 旧: AI献立プラン用 (現在は未使用)
VITE_UNSPLASH_ACCESS_KEY=...              # 旧: Unsplash食材画像表示用 (現在は未使用)
VITE_GEMINI_API_KEY=...                   # Gemini食材画像生成用 (aistudio.google.com)
```

**Unsplash Access Key の取得:**
1. https://unsplash.com/developers でアカウント作成
2. "New Application" → Access Key をコピー
3. `.env` に `VITE_UNSPLASH_ACCESS_KEY=<key>` を追記
4. 開発サーバーを再起動 (`npm run dev`)

キーがない場合、FoodCard はグラデーション背景にフォールバックします。画像は `localStorage` にキャッシュされます（キー: `freshkeep_img_cache`）。

## Architecture

**Stack:** React 19 + Vite + Tailwind CSS 3 (no router, no global state library)

**Three-tab SPA** managed entirely in `src/App.jsx` via `activeTab` state (`"fridge"` | `"planner"` | `"shopping"`). All fridge item state lives in `App.jsx`; shopping list state is encapsulated in `useShoppingList`.

### State & persistence

| State | Location | Persistence |
|---|---|---|
| Fridge items | `App.jsx` useState | In-memory only (resets on reload) |
| Shopping list | `useShoppingList` hook | `localStorage` (`freshkeep_shopping_list`) |
| Frequent foods | `useFrequentFoods` hook | `localStorage` (`freshkeep_frequent_foods`) |

### Key data flows

**Expiry auto-calculation:** `src/data/expiryDays.js` maps food name keywords → days. `getExpiryDays(name)` does keyword matching; `calcExpiryDate(isoDate, days)` returns a `YYYY-MM-DD` string. Used in both `AddFoodModal` and the `initialData` prefill path.

**Recipe suggestions (single ingredient):** `src/data/recipes.js` maps keywords → array of English recipe names. Displayed in `RecipeSuggestion.jsx` which cycles through them with a fade animation.

**Combo meal planner (AI):** `src/api/claudeApi.js` calls `claude-sonnet-4-6` with a structured Japanese prompt requesting JSON output. The response is parsed and rendered as recipe cards in `ComboPlanner.jsx`. Uses `anthropic-dangerous-allow-browser: true` header for browser-side requests.

**Shopping list → fridge loop:** Checking a shopping item reveals a "冷蔵庫へ" button → sets `modalInitialData` in `App.jsx` → opens `AddFoodModal` with name/amount/unit prefilled.

**Consume plan:** `handleConsumePlan` in `App.jsx` matches recipe ingredient names against fridge items by substring (fuzzy), subtracts amounts when units match, and removes items that reach zero.

### Component responsibilities

- `FoodCard` — inline editing of emoji (opens `EmojiPickerModal`), name, expiry date; quantity ±
- `AddFoodModal` — category accordion + keyword search across `FOOD_CATEGORIES` (~283 items in `src/data/foodCategories.js`); accepts `initialData` prop for prefill
- `EmojiPickerModal` — grid of ~100 food emojis grouped by category with search
- `ComboPlanner` — AI plan generation, recipe exclusion (passes excluded list back into prompt), per-recipe and bulk add-to-shopping-list
- `ShoppingListView` — unchecked/checked sections, manual add form, "冷蔵庫へ" per checked item
- `BottomNav` — fixed bottom bar; shows badge on 買い物リスト tab for unchecked count

### Styling conventions

Tailwind utility classes only; no CSS modules or `App.css` (that file is vestigial). Warning state for items expiring within 3 days: `bg-red-50 border-red-300`. Brand color: `emerald-500`. Toasts use an inline `@keyframes fadeInUp` injected via `<style>` in `App.jsx`.
