const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const PROMPT = `この写真に写っている食材・食品をすべて認識してください。

以下のJSON配列形式のみで回答してください（説明文やコードブロックは不要）:
[
  {"name": "食材名（日本語）", "quantity": 数量, "unit": "単位", "emoji": "絵文字1文字"},
  ...
]

ルール:
- nameは一般的な日本語の食材名（例: 卵、豆乳、納豆、レモン）
- quantityは目視で推定できる数量（不明なら1）
- unitは適切な単位（個/本/袋/パック/g/ml など）
- emojiはその食材を表す絵文字1文字
- 同じ食材が複数あっても1エントリにまとめてquantityに合算する
- 写真に食材が見当たらない場合は空配列 [] を返す`;

/**
 * 食材写真をGroq Vision（LLaMA 3.2）に送り、認識された食材リストをJSONで返す
 */
export async function scanFoodFromPhoto(base64Image, mimeType) {
  if (!GROQ_API_KEY) throw new Error("VITE_GROQ_API_KEY が設定されていません");

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: PROMPT },
            { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64Image}` } },
          ],
        },
      ],
      temperature: 0.1,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message ?? `API error ${res.status}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? "";

  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error(`認識結果のJSON取得に失敗しました: ${text.slice(0, 100)}`);

  const items = JSON.parse(jsonMatch[0]);
  if (!Array.isArray(items)) throw new Error("認識結果の形式が不正です");

  return items;
}

export function hasGeminiKey() {
  return !!GROQ_API_KEY;
}
