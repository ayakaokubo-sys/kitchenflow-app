const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

export function hasGeminiRecipeKey() {
  return !!API_KEY;
}

/**
 * 冷蔵庫の食材をもとに、日本のビール会社レシピサイト風の料理を提案する。
 * （サッポロ・キリン・アサヒ・サントリーなどの家庭料理・おつまみスタイル）
 * excludedNames: 除外するレシピ名の配列（再生成時に使用）
 */
export async function fetchRecipeSuggestions(fridgeItems, excludedNames = []) {
  if (!API_KEY) throw new Error("NO_API_KEY");

  const itemList = fridgeItems
    .map((item) => `- ${item.name}: ${item.quantity}${item.unit}（賞味期限: ${item.expiryDate}）`)
    .join("\n");

  const excludeNote =
    excludedNames.length > 0
      ? `\n\n【除外するレシピ】以下はすでに提案済みなので絶対に含めないこと:\n${excludedNames.map((n) => `- ${n}`).join("\n")}`
      : "";

  const prompt = `あなたはサッポロビール・キリン・アサヒ・サントリーなどの日本のビール会社が運営する家庭料理レシピサイトの料理研究家です。
以下の冷蔵庫の食材を使って、そのサイト風の美味しいレシピを8〜10品提案してください。

スタイルの特徴:
- ビールやお酒に合うおつまみ・居酒屋風の家庭料理
- 身近な食材で作れるシンプルな料理
- 旬の食材を活かした和・洋・中のバランスの良い献立
- 賞味期限が近い食材を優先して使い切る

【冷蔵庫の食材】
${itemList}
${excludeNote}

【出力形式】
必ず以下のJSON配列のみで出力すること。JSONの前後に説明文・コードブロック記号を入れないこと。

[
  {
    "name": "料理名",
    "description": "料理の魅力的な説明（1〜2文、食欲をそそる表現で）",
    "category": "主食 or 主菜 or 副菜 or おつまみ or スープ or デザート",
    "ingredients_from_fridge": [
      { "name": "食材名", "amount": 数値, "unit": "単位" }
    ],
    "ingredients_to_buy": [
      { "name": "食材名", "amount": 数値, "unit": "単位" }
    ]
  }
]`;

  const res = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 4096,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API_ERROR: ${res.status} ${text}`);
  }

  const data = await res.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

  // JSONブロック記号が混入した場合でも対応
  const jsonStr = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/, "").trim();

  try {
    return JSON.parse(jsonStr);
  } catch {
    const match = jsonStr.match(/\[[\s\S]*\]/);
    if (!match) throw new Error("PARSE_ERROR");
    return JSON.parse(match[0]);
  }
}
