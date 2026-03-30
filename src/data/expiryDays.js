// 食材名（キーワード）→ 賞味期限日数のマッピング
// キーワードが食材名に含まれているかで判定する
export const EXPIRY_RULES = [
  // 肉類
  { keywords: ["鶏肉", "チキン", "とりにく", "ささみ", "手羽"], days: 3 },
  { keywords: ["牛肉", "ビーフ", "ステーキ", "ひき肉", "挽き肉", "ミンチ"], days: 3 },
  { keywords: ["豚肉", "ポーク", "ロース", "バラ肉", "ヒレ"], days: 3 },
  { keywords: ["羊肉", "ラム", "マトン"], days: 3 },
  { keywords: ["ベーコン", "ハム", "ソーセージ", "ウインナー"], days: 7 },

  // 魚介類
  { keywords: ["魚", "サーモン", "鮭", "マグロ", "まぐろ", "刺身", "さしみ"], days: 2 },
  { keywords: ["エビ", "えび", "イカ", "いか", "タコ", "たこ", "貝", "ホタテ", "牡蠣"], days: 2 },
  { keywords: ["サバ", "アジ", "イワシ", "ブリ", "タイ", "鯛"], days: 2 },
  { keywords: ["ツナ缶", "缶詰"], days: 365 * 3 },

  // 乳製品・卵
  { keywords: ["卵", "たまご", "玉子", "エッグ"], days: 14 },
  { keywords: ["牛乳", "ミルク", "豆乳"], days: 7 },
  { keywords: ["ヨーグルト"], days: 14 },
  { keywords: ["チーズ"], days: 30 },
  { keywords: ["バター", "マーガリン"], days: 30 },
  { keywords: ["生クリーム", "クリーム"], days: 7 },

  // 豆腐・大豆製品
  { keywords: ["豆腐", "とうふ"], days: 5 },
  { keywords: ["納豆", "なっとう"], days: 7 },
  { keywords: ["油揚げ", "厚揚げ", "がんもどき"], days: 3 },

  // 野菜（葉物・足が早いもの）
  { keywords: ["もやし"], days: 3 },
  { keywords: ["ほうれん草", "小松菜", "水菜", "ルッコラ"], days: 4 },
  { keywords: ["レタス", "サラダ"], days: 5 },
  { keywords: ["キャベツ"], days: 7 },
  { keywords: ["ブロッコリー", "カリフラワー"], days: 5 },
  { keywords: ["トマト", "きゅうり", "ナス", "なす"], days: 5 },
  { keywords: ["ピーマン", "パプリカ"], days: 7 },
  { keywords: ["ねぎ", "ネギ", "玉ねぎ", "たまねぎ", "長ねぎ"], days: 14 },
  { keywords: ["にんじん", "人参", "ニンジン"], days: 14 },
  { keywords: ["大根", "だいこん"], days: 14 },
  { keywords: ["じゃがいも", "ジャガイモ", "サツマイモ", "さつまいも"], days: 30 },
  { keywords: ["かぼちゃ", "南瓜"], days: 30 },
  { keywords: ["アボカド"], days: 4 },
  { keywords: ["きのこ", "しめじ", "えのき", "まいたけ", "エリンギ"], days: 5 },

  // 果物
  { keywords: ["いちご", "苺"], days: 5 },
  { keywords: ["バナナ"], days: 5 },
  { keywords: ["りんご", "林檎"], days: 30 },
  { keywords: ["みかん", "オレンジ"], days: 14 },
  { keywords: ["ぶどう", "葡萄"], days: 5 },
  { keywords: ["桃", "もも"], days: 5 },
  { keywords: ["スイカ", "メロン"], days: 7 },

  // 調味料・その他
  { keywords: ["味噌", "みそ"], days: 90 },
  { keywords: ["醤油", "しょうゆ"], days: 180 },
  { keywords: ["マヨネーズ"], days: 90 },
  { keywords: ["ケチャップ"], days: 90 },
  { keywords: ["ドレッシング"], days: 30 },
  { keywords: ["パン", "食パン"], days: 5 },
  { keywords: ["ご飯", "米飯"], days: 1 },
];

// デフォルト（該当なし）
export const DEFAULT_EXPIRY_DAYS = 7;

/**
 * 食材名から消費期限日数を返す
 */
export function getExpiryDays(foodName) {
  const name = foodName.toLowerCase();
  for (const rule of EXPIRY_RULES) {
    if (rule.keywords.some((kw) => name.includes(kw))) {
      return rule.days;
    }
  }
  return DEFAULT_EXPIRY_DAYS;
}

/**
 * 登録日と日数から賞味期限日付文字列 (YYYY-MM-DD) を返す
 */
export function calcExpiryDate(registeredAt, days) {
  const d = new Date(registeredAt);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}
