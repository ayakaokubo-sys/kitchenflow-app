/**
 * 日本語食材名 → Unsplash 検索用英語キーワード
 * "close up macro" はAPIクエリ側で付加するのでここでは不要
 * 食材そのものをクローズアップした写真がヒットするよう具体的に記述
 */
const KEYWORD_MAP = [
  // 肉類
  { keywords: ["鶏肉", "チキン", "ささみ", "手羽"], en: "raw chicken thigh" },
  { keywords: ["牛肉", "ビーフ", "ステーキ"], en: "raw beef steak meat" },
  { keywords: ["ひき肉", "挽き肉", "ミンチ", "合いびき"], en: "ground beef minced meat" },
  { keywords: ["豚肉", "ポーク", "ロース", "バラ"], en: "raw pork belly" },
  { keywords: ["ベーコン"], en: "bacon strips raw" },
  { keywords: ["ハム"], en: "sliced ham" },
  { keywords: ["ソーセージ", "ウインナー"], en: "sausage raw" },
  { keywords: ["ラム", "羊肉"], en: "raw lamb chop" },

  // 魚介類
  { keywords: ["鮭", "サーモン"], en: "fresh salmon fillet raw" },
  { keywords: ["マグロ", "まぐろ"], en: "fresh tuna block raw" },
  { keywords: ["サバ", "さば"], en: "mackerel fish raw" },
  { keywords: ["エビ", "えび"], en: "fresh raw shrimp prawn" },
  { keywords: ["イカ", "いか"], en: "fresh squid raw" },
  { keywords: ["タコ", "たこ"], en: "fresh octopus raw" },
  { keywords: ["ブリ", "ぶり"], en: "yellowtail fish fillet" },
  { keywords: ["アジ", "あじ"], en: "mackerel fish whole" },
  { keywords: ["タラ", "たら"], en: "cod fish fillet raw" },
  { keywords: ["ホタテ"], en: "fresh scallop raw" },
  { keywords: ["牡蠣", "かき"], en: "fresh oyster shell" },
  { keywords: ["アサリ", "あさり"], en: "clam shells fresh" },

  // 乳製品・卵
  { keywords: ["卵", "たまご", "玉子"], en: "cracked egg yolk raw" },
  { keywords: ["牛乳", "ミルク"], en: "milk splash white" },
  { keywords: ["豆乳"], en: "soy milk white" },
  { keywords: ["ヨーグルト"], en: "yogurt white creamy" },
  { keywords: ["チーズ"], en: "cheese block texture" },
  { keywords: ["バター"], en: "butter yellow block" },
  { keywords: ["生クリーム", "クリーム"], en: "whipped cream texture" },

  // 豆腐・大豆製品
  { keywords: ["豆腐", "とうふ"], en: "fresh tofu white block" },
  { keywords: ["納豆"], en: "natto fermented soybeans" },
  { keywords: ["油揚げ", "厚揚げ"], en: "fried tofu aburaage" },

  // 野菜
  { keywords: ["キャベツ"], en: "cabbage cross section cut" },
  { keywords: ["レタス", "サラダ菜"], en: "fresh lettuce leaves" },
  { keywords: ["ほうれん草"], en: "fresh spinach leaves" },
  { keywords: ["小松菜"], en: "bok choy fresh leaves" },
  { keywords: ["白菜"], en: "napa cabbage leaves" },
  { keywords: ["水菜"], en: "fresh green salad leaves" },
  { keywords: ["ブロッコリー"], en: "fresh broccoli florets" },
  { keywords: ["トマト"], en: "ripe red tomato sliced" },
  { keywords: ["きゅうり", "キュウリ"], en: "cucumber sliced cross section" },
  { keywords: ["なす", "ナス"], en: "purple eggplant aubergine" },
  { keywords: ["ピーマン"], en: "green bell pepper halved" },
  { keywords: ["にんじん", "人参"], en: "fresh carrot orange" },
  { keywords: ["大根"], en: "daikon radish white" },
  { keywords: ["玉ねぎ", "たまねぎ"], en: "onion sliced cross section" },
  { keywords: ["長ねぎ", "ねぎ", "ネギ"], en: "fresh green onion leek" },
  { keywords: ["じゃがいも", "ジャガイモ"], en: "raw potato halved" },
  { keywords: ["さつまいも", "サツマイモ"], en: "sweet potato orange flesh" },
  { keywords: ["かぼちゃ", "南瓜"], en: "pumpkin squash cut orange" },
  { keywords: ["アボカド"], en: "avocado halved pit green" },
  { keywords: ["もやし"], en: "bean sprouts white fresh" },
  { keywords: ["ごぼう"], en: "burdock root vegetable" },
  { keywords: ["れんこん"], en: "lotus root cross section" },
  { keywords: ["ズッキーニ"], en: "zucchini green sliced" },
  { keywords: ["とうもろこし", "コーン"], en: "corn on cob yellow" },

  // きのこ
  { keywords: ["しめじ"], en: "shimeji mushroom cluster" },
  { keywords: ["えのき"], en: "enoki mushroom white" },
  { keywords: ["エリンギ"], en: "king oyster mushroom" },
  { keywords: ["まいたけ", "マイタケ"], en: "maitake hen of woods mushroom" },
  { keywords: ["しいたけ"], en: "shiitake mushroom fresh" },
  { keywords: ["きのこ"], en: "wild mushroom fresh" },

  // 果物
  { keywords: ["りんご", "リンゴ", "林檎"], en: "apple red sliced" },
  { keywords: ["バナナ"], en: "banana yellow ripe" },
  { keywords: ["みかん", "オレンジ"], en: "orange citrus slice" },
  { keywords: ["いちご", "苺"], en: "fresh strawberry red" },
  { keywords: ["ぶどう", "グレープ"], en: "grapes bunch close" },
  { keywords: ["もも", "ピーチ"], en: "peach halved stone fruit" },
  { keywords: ["梨", "なし"], en: "pear fresh cut" },
  { keywords: ["レモン"], en: "lemon yellow sliced" },
  { keywords: ["キウイ"], en: "kiwi fruit halved green" },

  // パン・主食
  { keywords: ["食パン", "パン"], en: "bread slice texture" },

  // 調味料・その他
  { keywords: ["みそ", "味噌"], en: "miso paste brown" },
];

/**
 * 日本語の食材名から英語の Unsplash 検索クエリを返す
 */
export function toEnglishQuery(japaneseName) {
  for (const entry of KEYWORD_MAP) {
    if (entry.keywords.some((kw) => japaneseName.includes(kw) || kw.includes(japaneseName))) {
      return entry.en;
    }
  }
  return japaneseName;
}
