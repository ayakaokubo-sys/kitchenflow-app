import {
  Egg, Fish, Beef, Apple, Carrot, Milk, Coffee, Cherry,
  Grape, Sandwich, Cookie, IceCream2, Banana,
  Pizza, Salad, Soup, Wheat, Drumstick, Shell, Citrus,
  Nut, Candy, Popcorn, UtensilsCrossed,
  LeafyGreen, Sprout, Vegan, Beer, CupSoda,
} from "lucide-react";

const ICON_MAP = [
  // 肉類
  { keywords: ["鶏肉", "チキン", "ささみ", "手羽"], Icon: Drumstick },
  { keywords: ["牛肉", "ビーフ", "ステーキ"], Icon: Beef },
  { keywords: ["ひき肉", "挽き肉", "ミンチ", "合いびき"], Icon: Beef },
  { keywords: ["豚肉", "ポーク", "ロース", "バラ", "ヒレ"], Icon: Beef },
  { keywords: ["ベーコン", "ハム", "ソーセージ", "ウインナー"], Icon: Beef },
  { keywords: ["ラム", "羊肉"], Icon: Beef },

  // 魚介類
  { keywords: ["鮭", "サーモン", "マグロ", "まぐろ", "サバ", "さば", "アジ", "ブリ", "タラ"], Icon: Fish },
  { keywords: ["エビ", "えび", "ホタテ", "牡蠣", "かき", "アサリ", "あさり", "イカ", "タコ"], Icon: Shell },

  // 乳製品・卵
  { keywords: ["卵", "たまご", "玉子"], Icon: Egg },
  { keywords: ["牛乳", "ミルク"], Icon: Milk },
  { keywords: ["豆乳"], Icon: Milk },
  { keywords: ["ヨーグルト"], Icon: CupSoda },
  { keywords: ["チーズ"], Icon: Cookie },
  { keywords: ["バター"], Icon: Cookie },
  { keywords: ["生クリーム", "クリーム"], Icon: CupSoda },

  // 豆腐・大豆
  { keywords: ["豆腐", "とうふ", "油揚げ", "厚揚げ"], Icon: Vegan },
  { keywords: ["納豆"], Icon: Vegan },

  // 葉物野菜
  { keywords: ["キャベツ", "レタス", "サラダ菜", "白菜", "水菜", "ほうれん草", "小松菜"], Icon: LeafyGreen },

  // 緑野菜
  { keywords: ["ブロッコリー", "きゅうり", "キュウリ", "アスパラ"], Icon: Sprout },

  // 実野菜
  { keywords: ["トマト", "ピーマン", "なす", "ナス", "ズッキーニ", "アボカド"], Icon: Vegan },

  // 根菜・芋
  { keywords: ["にんじん", "人参", "ニンジン"], Icon: Carrot },
  { keywords: ["じゃがいも", "ジャガイモ", "さつまいも", "サツマイモ"], Icon: Sprout },
  { keywords: ["かぼちゃ", "南瓜"], Icon: Sprout },
  { keywords: ["大根"], Icon: Sprout },
  { keywords: ["ごぼう", "れんこん"], Icon: Sprout },
  { keywords: ["玉ねぎ", "たまねぎ", "長ねぎ", "ねぎ", "ネギ"], Icon: Sprout },

  // もやし・その他野菜
  { keywords: ["もやし"], Icon: Sprout },
  { keywords: ["とうもろこし", "コーン"], Icon: Popcorn },

  // きのこ
  { keywords: ["きのこ", "しめじ", "えのき", "エリンギ", "しいたけ", "まいたけ"], Icon: Sprout },

  // 果物
  { keywords: ["りんご", "リンゴ", "林檎"], Icon: Apple },
  { keywords: ["バナナ"], Icon: Banana },
  { keywords: ["みかん", "オレンジ"], Icon: Citrus },
  { keywords: ["レモン"], Icon: Citrus },
  { keywords: ["いちご", "苺"], Icon: Cherry },
  { keywords: ["ぶどう", "グレープ"], Icon: Grape },
  { keywords: ["もも", "ピーチ", "梨", "なし", "キウイ"], Icon: Apple },

  // パン・主食
  { keywords: ["食パン", "パン"], Icon: Sandwich },
  { keywords: ["米", "ご飯", "うどん", "そば", "パスタ", "麺", "小麦"], Icon: Wheat },

  // スープ
  { keywords: ["スープ", "みそ", "味噌", "出汁", "だし"], Icon: Soup },

  // お菓子・デザート
  { keywords: ["アイス"], Icon: IceCream2 },
  { keywords: ["ケーキ", "クッキー"], Icon: Cookie },
  { keywords: ["チョコ", "キャンディ", "グミ"], Icon: Candy },

  // 飲み物
  { keywords: ["コーヒー", "紅茶", "お茶"], Icon: Coffee },
  { keywords: ["ビール", "ワイン", "酒"], Icon: Beer },

  // サラダ
  { keywords: ["サラダ"], Icon: Salad },

  // ピザ
  { keywords: ["ピザ"], Icon: Pizza },
];

export function getFoodIcon(name) {
  for (const entry of ICON_MAP) {
    if (entry.keywords.some((kw) => name.includes(kw) || kw.includes(name))) {
      return entry.Icon;
    }
  }
  return UtensilsCrossed;
}
