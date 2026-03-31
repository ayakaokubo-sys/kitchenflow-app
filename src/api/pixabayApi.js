const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const CACHE_KEY = "freshkeep_unsplash_img_cache";

function getCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch { return {}; }
}
function setCache(cache) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch {}
}

// 日本語レシピ名 → 英語検索クエリ
const RECIPE_QUERY_MAP = {
  "親子丼": "oyakodon chicken egg rice bowl",
  "カレーライス": "japanese curry rice",
  "オムライス": "omurice japanese omelette rice",
  "チャーハン": "japanese fried rice",
  "鮭の炊き込みご飯": "japanese salmon rice",
  "きのこのバターパスタ": "mushroom butter pasta",
  "ナポリタン": "japanese napolitan pasta",
  "ミートソーススパゲッティ": "spaghetti bolognese meat sauce",
  "焼きそば": "yakisoba stir fried noodles",
  "鶏そぼろ丼": "chicken soboro rice bowl",
  "ツナと野菜の炊き込みご飯": "tuna vegetable rice",
  "豚肉と野菜の焼きうどん": "yaki udon stir fried noodles",
  "かに玉丼": "crab egg rice bowl",
  "豚キムチ炒飯": "kimchi fried rice",
  "牛丼": "gyudon beef rice bowl",
  "豚丼": "pork rice bowl japanese",
  "まぐろ丼": "tuna sashimi rice bowl",
  "海鮮丼": "kaisen don seafood rice bowl",
  "ビビンバ": "bibimbap korean rice bowl",
  "そぼろご飯": "japanese three color rice bowl",
  "月見うどん": "udon noodle egg soup",
  "釜玉うどん": "kamatama udon egg",
  "ざるそば": "zaru soba cold noodles",
  "冷やし中華": "hiyashi chuka cold ramen",
  "カルボナーラ": "carbonara pasta egg bacon",
  "ペペロンチーノ": "aglio olio peperoncino pasta",
  "きのこのクリームパスタ": "mushroom cream pasta",
  "たらこスパゲッティ": "tarako pasta cod roe",
  "明太子パスタ": "mentaiko pasta spicy cod roe",
  "和風きのこパスタ": "japanese mushroom pasta",
  "えびピラフ": "shrimp pilaf rice",
  "ドリア": "japanese doria rice gratin",
  "炊き込みご飯": "takikomi gohan japanese mixed rice",
  "塩焼きそば": "shio yakisoba salt fried noodles",
  "天津飯": "tenshinhan crab egg fried rice",
  "ガパオライス": "gapao thai basil chicken rice",
  "ハヤシライス": "hayashi rice beef stew",
  "スパゲッティグラタン": "pasta gratin baked",
  "サーモン丼": "salmon avocado rice bowl",
  "豚キムチうどん": "pork kimchi udon noodle",
  "鶏のから揚げ": "japanese karaage fried chicken",
  "肉じゃが": "nikujaga japanese meat potato stew",
  "豚の生姜焼き": "ginger pork shogayaki",
  "鶏の照り焼き": "teriyaki chicken",
  "ハンバーグ": "japanese hambagu hamburger steak",
  "鮭のムニエル": "salmon meuniere pan fried",
  "麻婆豆腐": "mapo tofu spicy",
  "豚バラ大根": "pork belly daikon simmered",
  "回鍋肉（ホイコーロー）": "twice cooked pork chinese",
  "さばの味噌煮": "saba miso mackerel simmered",
  "ぶりの照り焼き": "yellowtail teriyaki fish",
  "鶏肉のクリーム煮": "chicken cream stew japanese",
  "豆腐のそぼろ煮": "tofu ground meat simmered",
  "青椒肉絲（チンジャオロース）": "green pepper beef stir fry chinese",
  "豆腐ステーキ": "tofu steak pan fried",
  "アジの塩焼き": "grilled horse mackerel",
  "ポークソテー": "pork saute pan fried",
  "鶏むね肉のピカタ": "chicken piccata egg batter",
  "牛肉のしぐれ煮": "beef ginger soy simmered",
  "鶏もも肉の塩レモン焼き": "lemon chicken grilled",
  "豚バラキャベツの重ね蒸し": "pork cabbage steamed",
  "豚カツ": "tonkatsu pork cutlet",
  "酢豚": "sweet sour pork chinese",
  "豚の角煮": "kakuni braised pork belly",
  "チキンソテー": "chicken saute pan fried",
  "鶏むね肉のチーズ焼き": "cheese chicken breast baked",
  "鶏手羽の甘辛煮": "chicken wing sweet soy simmered",
  "チキンカレー": "chicken curry",
  "キーマカレー": "keema curry minced meat",
  "牛肉のすき煮": "sukiyaki beef tofu",
  "ロールキャベツ": "stuffed cabbage roll",
  "煮込みハンバーグ": "hamburger steak demi glace sauce",
  "鮭の塩焼き": "grilled salmon salt",
  "ぶりの塩焼き": "grilled yellowtail fish",
  "さばの塩焼き": "grilled mackerel salt",
  "たらのホイル焼き": "cod foil baked mushroom",
  "えびチリ": "chili shrimp chinese",
  "えびのガーリック炒め": "garlic shrimp saute",
  "えびフライ": "fried shrimp breaded",
  "ホタテのバター醤油焼き": "scallop butter soy sauce",
  "あさりの酒蒸し": "clam sake steamed",
  "鶏肉の甘酢炒め": "sweet sour chicken stir fry",
  "豚のみそ炒め": "pork miso stir fry eggplant",
  "なすの肉詰め焼き": "stuffed eggplant meat",
  "麻婆なす": "mabo eggplant spicy",
  "豆腐ハンバーグ": "tofu hamburger patty",
  "厚揚げの肉詰め": "thick fried tofu stuffed meat",
  "鶏むね肉の梅しそ焼き": "chicken ume shiso",
  "豚バラキムチ炒め": "pork kimchi stir fry",
  "白身魚のムニエル": "white fish meuniere",
  "鶏ささみの梅和え": "chicken tenderloin ume",
  "豚ヒレカツ": "pork fillet katsu",
  "アジフライ": "horse mackerel fry",
  "サバのカレー焼き": "mackerel curry grilled",
  "鮭のちゃんちゃん焼き": "salmon chanchan yaki miso",
  "豚バラと白菜の重ね蒸し": "pork belly chinese cabbage steamed",
  "手羽先の甘辛焼き": "chicken wing sweet spicy",
  "タコのにんにく炒め": "octopus garlic olive oil",
  "牡蠣のバター炒め": "oyster butter saute",
  "鴨肉の照り焼き": "duck teriyaki",
  "ほうれん草のおひたし": "spinach ohitashi japanese",
  "きんぴらごぼう": "kinpira gobo burdock carrot",
  "かぼちゃの煮物": "pumpkin simmered japanese",
  "ひじきの煮物": "hijiki seaweed simmered",
  "ポテトサラダ": "potato salad japanese",
  "切り干し大根の煮物": "dried daikon simmered",
  "だし巻き卵": "dashimaki tamago rolled egg",
  "野菜炒め": "stir fried vegetables",
  "ブロッコリーのごま和え": "broccoli sesame dressing",
  "なすの味噌炒め": "eggplant miso stir fry",
  "大根なます": "daikon carrot pickled",
  "白菜と豚肉の中華炒め": "chinese cabbage pork stir fry",
  "小松菜と油揚げの炒め": "komatsuna aburaage stir fry",
  "れんこんのきんぴら": "lotus root kinpira",
  "ほうれん草と卵の炒め物": "spinach egg stir fry",
  "茶碗蒸し": "chawanmushi steamed egg custard",
  "卵焼き": "tamagoyaki rolled omelette japanese",
  "冷奴": "hiyayakko cold tofu",
  "揚げ出し豆腐": "agedashi tofu deep fried",
  "白和え": "shiraae tofu spinach",
  "きゅうりの酢の物": "cucumber vinegar salad",
  "里芋の煮物": "taro simmered japanese",
  "じゃがバター": "baked potato butter",
  "にんじんのグラッセ": "glazed carrots",
  "大根の煮物": "daikon simmered",
  "ほうれん草のバターソテー": "spinach butter saute",
  "アスパラのベーコン炒め": "asparagus bacon stir fry",
  "ピーマンの肉詰め": "stuffed bell pepper meat",
  "きのこのソテー": "mushroom saute",
  "かぼちゃサラダ": "pumpkin squash salad",
  "さつまいもの甘煮": "sweet potato simmered",
  "ツナとレタスのサラダ": "tuna lettuce salad",
  "春雨サラダ": "glass noodle salad",
  "もやしのナムル": "bean sprout namul korean",
  "ひじきと大豆の煮物": "hijiki seaweed soybean",
  "きのこのマリネ": "mushroom marinade",
  "トマトとモッツァレラのサラダ": "caprese tomato mozzarella",
  "アボカドとエビのサラダ": "avocado shrimp salad",
  "小松菜の煮浸し": "komatsuna simmered broth",
  "なすのしぎ焼き": "eggplant miso grilled",
  "豆腐と油揚げの味噌汁": "miso soup tofu aburaage",
  "豚汁": "tonjiru pork miso soup",
  "玉ねぎとわかめの味噌汁": "miso soup onion wakame",
  "かぼちゃのポタージュ": "pumpkin potage soup",
  "野菜たっぷりスープ": "vegetable soup",
  "ミネストローネ": "minestrone soup",
  "鶏肉と野菜のスープ": "chicken vegetable soup",
  "なめこと豆腐の味噌汁": "miso soup nameko mushroom",
  "白菜と豆腐の味噌汁": "miso soup cabbage tofu",
  "コーンポタージュ": "corn potage soup",
  "あさりの味噌汁": "miso soup clam",
  "わかめの味噌汁": "miso soup wakame seaweed",
  "じゃがいもの味噌汁": "miso soup potato",
  "長ねぎの味噌汁": "miso soup green onion",
  "えのきの味噌汁": "miso soup enoki mushroom",
  "しじみの味噌汁": "miso soup shijimi clam",
  "豚バラと大根のスープ": "pork belly daikon soup",
  "鶏と野菜の中華スープ": "chicken vegetable chinese soup",
  "トマトと卵のスープ": "tomato egg soup chinese",
  "春雨スープ": "glass noodle soup",
  "キムチ鍋": "kimchi hot pot stew",
  "水炊き": "mizutaki chicken hot pot",
  "おでん": "oden japanese hot pot",
  "クラムチャウダー": "clam chowder soup",
  "トマトとベーコンのスープ": "tomato bacon soup",
  "かぶと油揚げの味噌汁": "miso soup turnip",
};

function getSearchQuery(recipeName) {
  return RECIPE_QUERY_MAP[recipeName] ?? "japanese food dish";
}

export function clearRecipeImageCache() {
  localStorage.removeItem(CACHE_KEY);
}

/**
 * 料理名でUnsplashから食材写真URLを取得（localStorageキャッシュ付き）
 */
export async function fetchRecipeImage(recipeName) {
  if (!API_KEY) return null;

  const cache = getCache();
  if (cache[recipeName] !== undefined) return cache[recipeName] || null;

  try {
    const baseQuery = getSearchQuery(recipeName);
    const query = encodeURIComponent(baseQuery);
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=5&client_id=${API_KEY}&orientation=landscape&content_filter=high`
    );
    if (!res.ok) return null;
    const data = await res.json();

    let results = data.results ?? [];

    // ヒットなしの場合は "japanese food dish" で再検索
    if (results.length === 0) {
      const res2 = await fetch(
        `https://api.unsplash.com/search/photos?query=japanese+food+dish&per_page=10&client_id=${API_KEY}&orientation=landscape&content_filter=high`
      );
      if (res2.ok) {
        const data2 = await res2.json();
        results = data2.results ?? [];
      }
    }

    const url = results.length > 0
      ? results[Math.floor(Math.random() * Math.min(3, results.length))].urls.small
      : null;

    setCache({ ...getCache(), [recipeName]: url ?? "" });
    return url;
  } catch {
    return null;
  }
}
