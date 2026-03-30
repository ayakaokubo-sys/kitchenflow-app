const API_URL = "https://api.anthropic.com/v1/messages";

function getApiKey() {
  return import.meta.env.VITE_ANTHROPIC_API_KEY ?? "";
}

export function hasApiKey() {
  return !!getApiKey();
}

/**
 * 冷蔵庫の食材リストを渡してAIに献立プランを提案させる。
 * excludedRecipes: 除外するレシピ名の配列（再生成時に使用）
 */
export async function fetchComboMealPlan(fridgeItems, excludedRecipes = []) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("NO_API_KEY");

  const itemList = fridgeItems
    .map((item) => `- ${item.name}: ${item.quantity}${item.unit}（賞味期限: ${item.expiryDate}）`)
    .join("\n");

  const excludeNote =
    excludedRecipes.length > 0
      ? `\n\n【除外するレシピ】以下のレシピは提案しないこと:\n${excludedRecipes.map((r) => `- ${r}`).join("\n")}`
      : "";

  const prompt = `あなたは家庭料理の専門家です。以下の冷蔵庫の食材を使って、今日の献立プランを提案してください。

【冷蔵庫の食材】
${itemList}

【要件】
- 賞味期限が近い食材を優先的に使い切る献立を提案する
- 2〜3品のレシピを組み合わせて、できるだけ多くの食材を消費するプランにする
- 各レシピごとに「冷蔵庫から使う食材と数量」「追加で買う必要がある食材」を明示する
- ingredients_to_buy は最小限（家庭に常備していないものだけ）にする
- remaining_in_fridge は、冷蔵庫の食材から使った分を差し引いた残りを記載する${excludeNote}

【出力形式】
必ず以下のJSON形式のみで出力すること。JSONの前後に説明文・コードブロック記号を入れないこと。

{
  "plan_title": "プランタイトル（例: 今日の使い切りプラン）",
  "total_ingredients_used": ["食材1", "食材2"],
  "recipes": [
    {
      "name": "料理名",
      "description": "料理の簡単な説明（1〜2文）",
      "ingredients_from_fridge": [
        { "name": "食材名", "amount": 数値, "unit": "単位" }
      ],
      "ingredients_to_buy": [
        { "name": "食材名", "amount": 数値, "unit": "単位" }
      ],
      "servings": 人数
    }
  ],
  "remaining_in_fridge": [
    { "name": "食材名", "amount": 数値, "unit": "単位" }
  ]
}`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-allow-browser": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API_ERROR: ${res.status} ${text}`);
  }

  const data = await res.json();
  const raw = data.content[0].text.trim();

  // JSONブロック記号が混入した場合でも対応
  const jsonStr = raw.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();

  try {
    return JSON.parse(jsonStr);
  } catch {
    // フォールバック: 最初の { } ブロックを抽出
    const match = jsonStr.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("PARSE_ERROR");
    return JSON.parse(match[0]);
  }
}
