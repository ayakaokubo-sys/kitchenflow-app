// 食材キーワード → レシピ名（英語）のマッピング
// キーワードが食材名に含まれているかで判定する
export const RECIPE_MAP = [
  {
    keywords: ["卵", "たまご", "玉子", "エッグ"],
    recipes: ["Tamagoyaki", "Oyakodon", "Omelette", "Chawanmushi", "Scrambled Eggs"],
  },
  {
    keywords: ["鶏肉", "チキン", "とりにく", "ささみ", "手羽"],
    recipes: ["Karaage", "Chicken Curry", "Oyakodon", "Chicken Teriyaki", "Chicken Nanban"],
  },
  {
    keywords: ["牛肉", "ビーフ", "ステーキ", "ひき肉", "挽き肉", "ミンチ"],
    recipes: ["Beef Stew", "Gyudon", "Hamburger Steak", "Beef Curry", "Nikujaga"],
  },
  {
    keywords: ["豚肉", "ポーク", "ロース", "バラ肉", "ヒレ"],
    recipes: ["Tonkatsu", "Pork Ginger Stir-fry", "Kakuni", "Pork Miso Soup", "Shogayaki"],
  },
  {
    keywords: ["牛乳", "ミルク"],
    recipes: ["Gratin", "White Stew", "Pancakes", "Cream Pasta", "Milk Soup"],
  },
  {
    keywords: ["豆乳"],
    recipes: ["Soy Milk Hotpot", "Soy Milk Soup", "Tofu Smoothie", "Soy Milk Pasta", "Chilled Tofu"],
  },
  {
    keywords: ["豆腐", "とうふ"],
    recipes: ["Agedashi Tofu", "Mapo Tofu", "Hiyayakko", "Miso Soup with Tofu", "Tofu Steak"],
  },
  {
    keywords: ["納豆", "なっとう"],
    recipes: ["Natto Toast", "Natto Pasta", "Natto Omelette", "Natto Rice Bowl", "Natto Salad"],
  },
  {
    keywords: ["もやし"],
    recipes: ["Moyashi Stir-fry", "Moyashi Namul", "Moyashi Soup", "Ramen with Moyashi", "Moyashi Gyoza"],
  },
  {
    keywords: ["ほうれん草", "小松菜", "水菜"],
    recipes: ["Ohitashi", "Spinach Omelette", "Creamed Spinach", "Green Smoothie", "Spinach Soup"],
  },
  {
    keywords: ["キャベツ"],
    recipes: ["Okonomiyaki", "Coleslaw", "Cabbage Rolls", "Stir-fried Cabbage", "Cabbage Miso Soup"],
  },
  {
    keywords: ["レタス", "サラダ"],
    recipes: ["Caesar Salad", "BLT Sandwich", "Lettuce Wrap", "Garden Salad", "Lettuce Fried Rice"],
  },
  {
    keywords: ["トマト"],
    recipes: ["Tomato Pasta", "Caprese Salad", "Tomato Soup", "Shakshuka", "Bruschetta"],
  },
  {
    keywords: ["きゅうり"],
    recipes: ["Tsukemono", "Cucumber Namul", "Cold Noodle Salad", "Cucumber Soup", "Greek Salad"],
  },
  {
    keywords: ["にんじん", "人参", "ニンジン"],
    recipes: ["Carrot Kinpira", "Carrot Soup", "Carrot Cake", "Carrot Namul", "Carrot Salad"],
  },
  {
    keywords: ["玉ねぎ", "たまねぎ", "ねぎ", "ネギ"],
    recipes: ["French Onion Soup", "Hayashi Rice", "Onion Gratin", "Onion Stir-fry", "Onion Miso Soup"],
  },
  {
    keywords: ["じゃがいも", "ジャガイモ"],
    recipes: ["Nikujaga", "Potato Salad", "Croquette", "Vichyssoise", "Aloo Curry"],
  },
  {
    keywords: ["サツマイモ", "さつまいも"],
    recipes: ["Daigaku Imo", "Sweet Potato Tempura", "Sweet Potato Soup", "Sweet Potato Salad", "Mont Blanc"],
  },
  {
    keywords: ["かぼちゃ", "南瓜"],
    recipes: ["Kabocha Soup", "Kabocha Tempura", "Kabocha Salad", "Kabocha Curry", "Kabocha Gratin"],
  },
  {
    keywords: ["アボカド"],
    recipes: ["Avocado Toast", "Guacamole", "Avocado Sushi", "Avocado Pasta", "Avocado Smoothie"],
  },
  {
    keywords: ["ブロッコリー"],
    recipes: ["Broccoli Stir-fry", "Broccoli Soup", "Broccoli Gratin", "Broccoli Salad", "Broccoli Pasta"],
  },
  {
    keywords: ["きのこ", "しめじ", "えのき", "まいたけ", "エリンギ"],
    recipes: ["Mushroom Pasta", "Mushroom Risotto", "Mushroom Soup", "Mushroom Stir-fry", "Mushroom Hotpot"],
  },
  {
    keywords: ["鮭", "サーモン"],
    recipes: ["Salmon Teriyaki", "Salmon Pasta", "Salmon Meuniere", "Salmon Donburi", "Salmon Miso Soup"],
  },
  {
    keywords: ["マグロ", "まぐろ"],
    recipes: ["Tuna Donburi", "Tuna Sashimi", "Tuna Pasta", "Tuna Salad", "Spicy Tuna Roll"],
  },
  {
    keywords: ["エビ", "えび"],
    recipes: ["Shrimp Tempura", "Shrimp Pasta", "Shrimp Chili", "Shrimp Gratin", "Shrimp Fried Rice"],
  },
  {
    keywords: ["イカ", "いか"],
    recipes: ["Ika Rings", "Ika Somen", "Squid Stir-fry", "Ika Tempura", "Squid Ink Pasta"],
  },
  {
    keywords: ["ヨーグルト"],
    recipes: ["Yogurt Parfait", "Lassi", "Tzatziki", "Yogurt Smoothie", "Yogurt Cake"],
  },
  {
    keywords: ["チーズ"],
    recipes: ["Cheese Gratin", "Cheese Omelette", "Pizza Toast", "Cheese Fondue", "Caprese Salad"],
  },
  {
    keywords: ["バター", "マーガリン"],
    recipes: ["Butter Pasta", "Butter Rice", "Butter Chicken", "Butter Cookies", "Corn Butter"],
  },
  {
    keywords: ["パン", "食パン"],
    recipes: ["French Toast", "Crouton Salad", "Bread Pudding", "Bruschetta", "Grilled Cheese"],
  },
  {
    keywords: ["バナナ"],
    recipes: ["Banana Smoothie", "Banana Pancakes", "Banana Bread", "Banana Ice Cream", "Banana Cake"],
  },
  {
    keywords: ["りんご", "林檎"],
    recipes: ["Apple Pie", "Apple Salad", "Apple Jam", "Apple Juice", "Caramel Apple"],
  },
  {
    keywords: ["ベーコン", "ハム"],
    recipes: ["Carbonara", "BLT Sandwich", "Quiche", "Bacon Fried Rice", "Potato Soup with Bacon"],
  },
  {
    keywords: ["ソーセージ", "ウインナー"],
    recipes: ["Sausage Pasta", "Hot Dog", "Sausage Stir-fry", "Sausage Soup", "Sausage Pizza"],
  },
];

const DEFAULT_RECIPES = [
  "Stir-fry",
  "Miso Soup",
  "Rice Bowl",
  "Salad",
  "Stew",
];

/**
 * 食材名からレシピリストを返す
 */
export function getRecipes(foodName) {
  const name = foodName;
  for (const entry of RECIPE_MAP) {
    if (entry.keywords.some((kw) => name.includes(kw))) {
      return entry.recipes;
    }
  }
  return DEFAULT_RECIPES;
}
