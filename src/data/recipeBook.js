/**
 * 静的レシピブック（100パターン）
 * ingredients: 冷蔵庫マッチング対象の主要食材
 *   - keywords: 冷蔵庫の食材名と突合するキーワード配列
 *   - name/amount/unit: 買い物リスト用
 */
export const RECIPE_BOOK = [
  // --- 和食・丼 ---
  {
    id: 1, name: "親子丼", description: "鶏肉と卵をだしで煮た定番の丼料理",
    ingredients: [
      { name: "鶏肉", amount: 200, unit: "g", keywords: ["鶏", "チキン", "ささみ"] },
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご", "玉子"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "長ネギ", "小ねぎ", "万能ねぎ"] },
    ],
  },
  {
    id: 2, name: "牛丼", description: "薄切り牛肉と玉ねぎを甘辛く煮た丼",
    ingredients: [
      { name: "牛肉（薄切り）", amount: 200, unit: "g", keywords: ["牛肉", "ビーフ"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "長ネギ", "小ねぎ", "万能ねぎ"] },
    ],
  },
  {
    id: 3, name: "サーモン丼", description: "新鮮な鮭を醤油とわさびでシンプルに",
    ingredients: [
      { name: "鮭（刺身用）", amount: 150, unit: "g", keywords: ["鮭", "サーモン"] },
      { name: "アボカド", amount: 1, unit: "個", keywords: ["アボカド"] },
    ],
  },
  {
    id: 4, name: "マグロ丼", description: "まぐろの刺身をたれに漬けた漬け丼",
    ingredients: [
      { name: "マグロ（刺身用）", amount: 150, unit: "g", keywords: ["マグロ", "まぐろ"] },
    ],
  },
  {
    id: 5, name: "ちらし寿司", description: "卵・えび・野菜を彩りよく散らした酢飯",
    ingredients: [
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
      { name: "えび", amount: 8, unit: "尾", keywords: ["エビ", "えび"] },
      { name: "鮭", amount: 100, unit: "g", keywords: ["鮭", "サーモン"] },
    ],
  },
  // --- 肉料理 ---
  {
    id: 6, name: "鶏の唐揚げ", description: "醤油・生姜・にんにくで下味をつけてカリっと揚げる",
    ingredients: [
      { name: "鶏もも肉", amount: 300, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
      { name: "にんにく", amount: 2, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
    ],
  },
  {
    id: 7, name: "鶏の照り焼き", description: "甘辛いたれをからめたジューシーな照り焼き",
    ingredients: [
      { name: "鶏もも肉", amount: 300, unit: "g", keywords: ["鶏", "チキン"] },
    ],
  },
  {
    id: 8, name: "豚の生姜焼き", description: "豚肉と玉ねぎを生姜だれで炒めた定番",
    ingredients: [
      { name: "豚肩ロース", amount: 250, unit: "g", keywords: ["豚", "ポーク"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
    ],
  },
  {
    id: 9, name: "豚カツ（トンカツ）", description: "パン粉をまぶして揚げた肉厚とんかつ",
    ingredients: [
      { name: "豚ロース", amount: 250, unit: "g", keywords: ["豚", "ポーク"] },
      { name: "卵", amount: 1, unit: "個", keywords: ["卵", "たまご"] },
    ],
  },
  {
    id: 10, name: "ハンバーグ", description: "合いびき肉と玉ねぎで作るジューシーハンバーグ",
    ingredients: [
      { name: "合いびき肉", amount: 300, unit: "g", keywords: ["ひき肉", "挽き肉", "ミンチ", "合いびき"] },
      { name: "玉ねぎ", amount: 0.5, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "卵", amount: 1, unit: "個", keywords: ["卵", "たまご"] },
    ],
  },
  {
    id: 11, name: "酢豚", description: "揚げた豚肉に甘酢あんをかけた中華料理",
    ingredients: [
      { name: "豚バラ肉", amount: 250, unit: "g", keywords: ["豚", "ポーク"] },
      { name: "ピーマン", amount: 2, unit: "個", keywords: ["ピーマン"] },
      { name: "にんじん", amount: 0.5, unit: "本", keywords: ["にんじん", "人参"] },
      { name: "玉ねぎ", amount: 0.5, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
    ],
  },
  {
    id: 12, name: "回鍋肉（ホイコーロー）", description: "豚バラ・キャベツ・ピーマンの甜麺醤炒め",
    ingredients: [
      { name: "豚バラ肉", amount: 200, unit: "g", keywords: ["豚", "ポーク"] },
      { name: "キャベツ", amount: 300, unit: "g", keywords: ["キャベツ"] },
      { name: "ピーマン", amount: 2, unit: "個", keywords: ["ピーマン"] },
      { name: "にんにく", amount: 2, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
    ],
  },
  {
    id: 13, name: "青椒肉絲（チンジャオロース）", description: "牛肉とピーマンの細切り炒め",
    ingredients: [
      { name: "牛肉（薄切り）", amount: 150, unit: "g", keywords: ["牛肉", "ビーフ"] },
      { name: "ピーマン", amount: 3, unit: "個", keywords: ["ピーマン"] },
    ],
  },
  {
    id: 14, name: "鶏ナンバン", description: "揚げた鶏肉に甘酢とタルタルをかけた南蛮漬け",
    ingredients: [
      { name: "鶏もも肉", amount: 300, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
    ],
  },
  {
    id: 15, name: "棒棒鶏（バンバンジー）", description: "蒸し鶏ときゅうりにごまだれをかけた前菜",
    ingredients: [
      { name: "鶏むね肉", amount: 200, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "きゅうり", amount: 1, unit: "本", keywords: ["きゅうり"] },
    ],
  },
  {
    id: 16, name: "ガパオライス", description: "鶏ひき肉とバジルのタイ風炒めご飯",
    ingredients: [
      { name: "鶏ひき肉", amount: 200, unit: "g", keywords: ["鶏", "チキン", "ひき肉"] },
      { name: "卵", amount: 1, unit: "個", keywords: ["卵", "たまご"] },
      { name: "ピーマン", amount: 2, unit: "個", keywords: ["ピーマン"] },
      { name: "にんにく", amount: 2, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
    ],
  },
  {
    id: 17, name: "タコライス", description: "スパイシーな挽き肉とトマト・レタスをのせた沖縄発祥丼",
    ingredients: [
      { name: "合いびき肉", amount: 200, unit: "g", keywords: ["ひき肉", "挽き肉", "合いびき"] },
      { name: "トマト", amount: 1, unit: "個", keywords: ["トマト"] },
      { name: "レタス", amount: 3, unit: "枚", keywords: ["レタス"] },
    ],
  },
  {
    id: 18, name: "チキンソテー（レモンバター）", description: "鶏肉をバターでソテーしてレモンをしぼる",
    ingredients: [
      { name: "鶏もも肉", amount: 250, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "バター", amount: 15, unit: "g", keywords: ["バター"] },
    ],
  },
  {
    id: 19, name: "ポークソテー（マスタード）", description: "豚ロースをハニーマスタードソースで",
    ingredients: [
      { name: "豚ロース", amount: 250, unit: "g", keywords: ["豚", "ポーク"] },
    ],
  },
  {
    id: 20, name: "タンドリーチキン", description: "ヨーグルトとスパイスに漬けてグリルした鶏肉",
    ingredients: [
      { name: "鶏もも肉", amount: 300, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "ヨーグルト", amount: 100, unit: "g", keywords: ["ヨーグルト"] },
    ],
  },
  // --- 魚料理 ---
  {
    id: 21, name: "鮭の塩焼き", description: "シンプルな塩で焼いた定番の焼き魚",
    ingredients: [
      { name: "鮭", amount: 2, unit: "切れ", keywords: ["鮭", "サーモン"] },
    ],
  },
  {
    id: 22, name: "鮭のムニエル", description: "鮭にバターとレモンを合わせたフランス式",
    ingredients: [
      { name: "鮭", amount: 2, unit: "切れ", keywords: ["鮭", "サーモン"] },
      { name: "バター", amount: 20, unit: "g", keywords: ["バター"] },
    ],
  },
  {
    id: 23, name: "鮭の照り焼き", description: "甘辛いたれで焼き上げた鮭の照り焼き",
    ingredients: [
      { name: "鮭", amount: 2, unit: "切れ", keywords: ["鮭", "サーモン"] },
    ],
  },
  {
    id: 24, name: "サバの味噌煮", description: "さばを甘辛い味噌と生姜で煮た定番和食",
    ingredients: [
      { name: "サバ", amount: 2, unit: "切れ", keywords: ["サバ", "さば"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
    ],
  },
  {
    id: 25, name: "えびチリ", description: "えびをチリソースで炒めた中華の定番",
    ingredients: [
      { name: "えび", amount: 200, unit: "g", keywords: ["エビ", "えび"] },
    ],
  },
  {
    id: 26, name: "えびのガーリック炒め", description: "にんにくとバターで炒めたシンプルなえび料理",
    ingredients: [
      { name: "えび", amount: 200, unit: "g", keywords: ["エビ", "えび"] },
      { name: "バター", amount: 15, unit: "g", keywords: ["バター"] },
      { name: "にんにく", amount: 2, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
    ],
  },
  {
    id: 27, name: "アクアパッツァ", description: "白身魚・あさり・トマトをワインで蒸した地中海料理",
    ingredients: [
      { name: "白身魚（鮭/タラ）", amount: 2, unit: "切れ", keywords: ["鮭", "サーモン", "タラ"] },
      { name: "トマト", amount: 1, unit: "個", keywords: ["トマト"] },
    ],
  },
  // --- 卵料理 ---
  {
    id: 28, name: "だし巻き卵", description: "だし汁を含んだふわふわの卵焼き",
    ingredients: [
      { name: "卵", amount: 3, unit: "個", keywords: ["卵", "たまご", "玉子"] },
    ],
  },
  {
    id: 29, name: "スクランブルエッグ", description: "バターでふんわり仕上げたスクランブルエッグ",
    ingredients: [
      { name: "卵", amount: 3, unit: "個", keywords: ["卵", "たまご"] },
      { name: "牛乳", amount: 30, unit: "ml", keywords: ["牛乳", "ミルク"] },
      { name: "バター", amount: 10, unit: "g", keywords: ["バター"] },
    ],
  },
  {
    id: 30, name: "オムライス", description: "ケチャップライスを薄焼き卵で包んだ洋食の王様",
    ingredients: [
      { name: "卵", amount: 3, unit: "個", keywords: ["卵", "たまご"] },
      { name: "鶏肉", amount: 100, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "玉ねぎ", amount: 0.5, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
    ],
  },
  {
    id: 31, name: "茶碗蒸し", description: "だしのきいた上品なやわらか卵蒸し料理",
    ingredients: [
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
      { name: "鶏肉", amount: 50, unit: "g", keywords: ["鶏", "チキン"] },
    ],
  },
  {
    id: 32, name: "ポーチドエッグのサラダ", description: "半熟ポーチドエッグをのせた朝食サラダ",
    ingredients: [
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
      { name: "レタス", amount: 4, unit: "枚", keywords: ["レタス", "サラダ菜"] },
      { name: "ベーコン", amount: 2, unit: "枚", keywords: ["ベーコン"] },
    ],
  },
  // --- 豆腐・大豆 ---
  {
    id: 33, name: "麻婆豆腐", description: "豆腐と挽き肉を花椒・豆板醤で辛く煮た中華",
    ingredients: [
      { name: "豆腐", amount: 1, unit: "丁", keywords: ["豆腐", "とうふ"] },
      { name: "豚ひき肉", amount: 100, unit: "g", keywords: ["豚", "ひき肉", "挽き肉"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
      { name: "にんにく", amount: 2, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "長ネギ", "小ねぎ", "万能ねぎ"] },
    ],
  },
  {
    id: 34, name: "揚げ出し豆腐", description: "豆腐を揚げてだし醤油をかけた定番小鉢",
    ingredients: [
      { name: "豆腐", amount: 1, unit: "丁", keywords: ["豆腐", "とうふ"] },
    ],
  },
  {
    id: 35, name: "豆腐ステーキ（和風きのこあんかけ）", description: "豆腐をこんがり焼いてきのこあんをかける",
    ingredients: [
      { name: "豆腐", amount: 1, unit: "丁", keywords: ["豆腐", "とうふ"] },
      { name: "しめじ", amount: 100, unit: "g", keywords: ["きのこ", "しめじ", "えのき", "エリンギ"] },
    ],
  },
  {
    id: 36, name: "納豆チャーハン", description: "納豆と卵を使ったパラパラチャーハン",
    ingredients: [
      { name: "納豆", amount: 1, unit: "パック", keywords: ["納豆"] },
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
    ],
  },
  // --- 野菜料理 ---
  {
    id: 37, name: "肉じゃが", description: "牛肉・じゃがいも・にんじんの甘辛煮",
    ingredients: [
      { name: "牛肉（薄切り）", amount: 150, unit: "g", keywords: ["牛肉", "ビーフ"] },
      { name: "じゃがいも", amount: 3, unit: "個", keywords: ["じゃがいも", "ジャガイモ"] },
      { name: "にんじん", amount: 1, unit: "本", keywords: ["にんじん", "人参"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
    ],
  },
  {
    id: 38, name: "ポテトサラダ", description: "じゃがいも・玉ねぎ・にんじん・卵のマヨネーズ和え",
    ingredients: [
      { name: "じゃがいも", amount: 3, unit: "個", keywords: ["じゃがいも", "ジャガイモ"] },
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
      { name: "玉ねぎ", amount: 0.5, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "にんじん", amount: 0.5, unit: "本", keywords: ["にんじん", "人参"] },
    ],
  },
  {
    id: 39, name: "コロッケ", description: "じゃがいもと挽き肉を揚げた定番コロッケ",
    ingredients: [
      { name: "じゃがいも", amount: 3, unit: "個", keywords: ["じゃがいも", "ジャガイモ"] },
      { name: "合いびき肉", amount: 100, unit: "g", keywords: ["ひき肉", "挽き肉", "合いびき"] },
      { name: "玉ねぎ", amount: 0.5, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
    ],
  },
  {
    id: 40, name: "かぼちゃの煮物", description: "かぼちゃを甘辛く煮た和食の定番小鉢",
    ingredients: [
      { name: "かぼちゃ", amount: 300, unit: "g", keywords: ["かぼちゃ", "南瓜"] },
    ],
  },
  {
    id: 41, name: "かぼちゃのポタージュ", description: "かぼちゃと牛乳を合わせた濃厚スープ",
    ingredients: [
      { name: "かぼちゃ", amount: 300, unit: "g", keywords: ["かぼちゃ", "南瓜"] },
      { name: "牛乳", amount: 200, unit: "ml", keywords: ["牛乳", "ミルク"] },
      { name: "玉ねぎ", amount: 0.5, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
    ],
  },
  {
    id: 42, name: "さつまいもの天ぷら", description: "さつまいもをサクッと揚げた甘い天ぷら",
    ingredients: [
      { name: "さつまいも", amount: 1, unit: "本", keywords: ["さつまいも", "サツマイモ"] },
    ],
  },
  {
    id: 43, name: "大学芋", description: "さつまいもをカラメルで絡めた甘いおやつ",
    ingredients: [
      { name: "さつまいも", amount: 1, unit: "本", keywords: ["さつまいも", "サツマイモ"] },
    ],
  },
  {
    id: 44, name: "きんぴらごぼう", description: "ごぼうとにんじんの甘辛炒め煮",
    ingredients: [
      { name: "ごぼう", amount: 1, unit: "本", keywords: ["ごぼう"] },
      { name: "にんじん", amount: 0.5, unit: "本", keywords: ["にんじん", "人参"] },
    ],
  },
  {
    id: 45, name: "ほうれん草のお浸し", description: "だし醤油をかけたシンプルなほうれん草のお浸し",
    ingredients: [
      { name: "ほうれん草", amount: 1, unit: "束", keywords: ["ほうれん草", "ホウレン草"] },
    ],
  },
  {
    id: 46, name: "もやし炒め（ニラバター）", description: "もやしとニラをバターで炒めたシンプル副菜",
    ingredients: [
      { name: "もやし", amount: 200, unit: "g", keywords: ["もやし"] },
      { name: "バター", amount: 10, unit: "g", keywords: ["バター"] },
      { name: "ニラ", amount: 0.5, unit: "束", keywords: ["ニラ", "にら"] },
    ],
  },
  {
    id: 47, name: "きのこのソテー", description: "しめじ・えのき・エリンギをバターとガーリックで炒める",
    ingredients: [
      { name: "しめじ", amount: 100, unit: "g", keywords: ["きのこ", "しめじ"] },
      { name: "エリンギ", amount: 100, unit: "g", keywords: ["エリンギ", "きのこ"] },
      { name: "バター", amount: 15, unit: "g", keywords: ["バター"] },
      { name: "にんにく", amount: 1, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
    ],
  },
  {
    id: 48, name: "ラタトゥイユ", description: "トマト・ズッキーニ・ナスを煮込んだ南フランス料理",
    ingredients: [
      { name: "トマト", amount: 2, unit: "個", keywords: ["トマト"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
    ],
  },
  {
    id: 49, name: "にんじんのポタージュ", description: "にんじんの甘さが引き立つ鮮やかなスープ",
    ingredients: [
      { name: "にんじん", amount: 2, unit: "本", keywords: ["にんじん", "人参"] },
      { name: "玉ねぎ", amount: 0.5, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "牛乳", amount: 150, unit: "ml", keywords: ["牛乳", "ミルク"] },
    ],
  },
  {
    id: 50, name: "ブロッコリーのグラタン", description: "ブロッコリーをホワイトソースとチーズで焼いたグラタン",
    ingredients: [
      { name: "ブロッコリー", amount: 1, unit: "株", keywords: ["ブロッコリー"] },
      { name: "牛乳", amount: 200, unit: "ml", keywords: ["牛乳", "ミルク"] },
      { name: "チーズ", amount: 50, unit: "g", keywords: ["チーズ"] },
    ],
  },
  // --- カレー・シチュー ---
  {
    id: 51, name: "チキンカレー", description: "鶏肉・じゃがいも・にんじんの定番カレー",
    ingredients: [
      { name: "鶏肉", amount: 300, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "じゃがいも", amount: 2, unit: "個", keywords: ["じゃがいも", "ジャガイモ"] },
      { name: "にんじん", amount: 1, unit: "本", keywords: ["にんじん", "人参"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "にんにく", amount: 2, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
    ],
  },
  {
    id: 52, name: "バターチキンカレー", description: "トマトと牛乳でまろやかに仕上げたカレー",
    ingredients: [
      { name: "鶏肉", amount: 300, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "トマト", amount: 2, unit: "個", keywords: ["トマト"] },
      { name: "牛乳", amount: 100, unit: "ml", keywords: ["牛乳", "ミルク"] },
      { name: "バター", amount: 20, unit: "g", keywords: ["バター"] },
      { name: "にんにく", amount: 2, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
    ],
  },
  {
    id: 53, name: "ドライカレー", description: "挽き肉と野菜を炒めたご飯にかけるドライカレー",
    ingredients: [
      { name: "合いびき肉", amount: 200, unit: "g", keywords: ["ひき肉", "挽き肉", "合いびき"] },
      { name: "にんじん", amount: 0.5, unit: "本", keywords: ["にんじん", "人参"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
    ],
  },
  {
    id: 54, name: "クリームシチュー", description: "鶏肉と野菜を牛乳ベースのまろやかなシチューで",
    ingredients: [
      { name: "鶏肉", amount: 250, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "じゃがいも", amount: 2, unit: "個", keywords: ["じゃがいも", "ジャガイモ"] },
      { name: "にんじん", amount: 1, unit: "本", keywords: ["にんじん", "人参"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "牛乳", amount: 300, unit: "ml", keywords: ["牛乳", "ミルク"] },
    ],
  },
  {
    id: 55, name: "ビーフシチュー", description: "牛肉をデミグラスソースでじっくり煮込んだ洋食",
    ingredients: [
      { name: "牛肉（塊）", amount: 300, unit: "g", keywords: ["牛肉", "ビーフ"] },
      { name: "じゃがいも", amount: 2, unit: "個", keywords: ["じゃがいも", "ジャガイモ"] },
      { name: "にんじん", amount: 1, unit: "本", keywords: ["にんじん", "人参"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
    ],
  },
  // --- パスタ ---
  {
    id: 56, name: "カルボナーラ", description: "卵とベーコンのクリーミーなパスタ",
    ingredients: [
      { name: "ベーコン", amount: 80, unit: "g", keywords: ["ベーコン"] },
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
    ],
  },
  {
    id: 57, name: "ナポリタン", description: "ソーセージと野菜のケチャップパスタ",
    ingredients: [
      { name: "ソーセージ", amount: 3, unit: "本", keywords: ["ソーセージ", "ウインナー"] },
      { name: "ピーマン", amount: 2, unit: "個", keywords: ["ピーマン"] },
      { name: "玉ねぎ", amount: 0.5, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
    ],
  },
  {
    id: 58, name: "トマトソースパスタ", description: "新鮮トマトとバジルのシンプルなパスタ",
    ingredients: [
      { name: "トマト", amount: 2, unit: "個", keywords: ["トマト"] },
    ],
  },
  {
    id: 59, name: "きのこクリームパスタ", description: "きのこと生クリームのリッチなパスタ",
    ingredients: [
      { name: "しめじ", amount: 100, unit: "g", keywords: ["きのこ", "しめじ", "えのき"] },
      { name: "牛乳", amount: 150, unit: "ml", keywords: ["牛乳", "ミルク"] },
      { name: "ベーコン", amount: 50, unit: "g", keywords: ["ベーコン"] },
    ],
  },
  {
    id: 60, name: "えびとブロッコリーのパスタ", description: "えびとブロッコリーのシンプルな塩パスタ",
    ingredients: [
      { name: "えび", amount: 150, unit: "g", keywords: ["エビ", "えび"] },
      { name: "ブロッコリー", amount: 0.5, unit: "株", keywords: ["ブロッコリー"] },
    ],
  },
  {
    id: 61, name: "アボカドとサーモンのパスタ", description: "アボカドと鮭の濃厚なコールドパスタ",
    ingredients: [
      { name: "アボカド", amount: 1, unit: "個", keywords: ["アボカド"] },
      { name: "鮭（刺身用）", amount: 100, unit: "g", keywords: ["鮭", "サーモン"] },
    ],
  },
  // --- 鍋・汁物 ---
  {
    id: 62, name: "豚汁", description: "豚肉・根菜・こんにゃくの具だくさん味噌汁",
    ingredients: [
      { name: "豚肉", amount: 100, unit: "g", keywords: ["豚", "ポーク"] },
      { name: "大根", amount: 0.3, unit: "本", keywords: ["大根"] },
      { name: "にんじん", amount: 0.5, unit: "本", keywords: ["にんじん", "人参"] },
      { name: "じゃがいも", amount: 1, unit: "個", keywords: ["じゃがいも", "ジャガイモ"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "長ネギ", "小ねぎ", "万能ねぎ"] },
    ],
  },
  {
    id: 63, name: "水炊き", description: "鶏肉と白菜・豆腐のあっさりした鍋",
    ingredients: [
      { name: "鶏肉", amount: 300, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "豆腐", amount: 1, unit: "丁", keywords: ["豆腐", "とうふ"] },
      { name: "白菜", amount: 300, unit: "g", keywords: ["白菜", "はくさい"] },
      { name: "長ねぎ", amount: 1, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "長ネギ"] },
    ],
  },
  {
    id: 64, name: "すき焼き", description: "牛肉・豆腐・白菜を甘辛いたれで煮るご馳走鍋",
    ingredients: [
      { name: "牛肉（薄切り）", amount: 300, unit: "g", keywords: ["牛肉", "ビーフ"] },
      { name: "豆腐", amount: 1, unit: "丁", keywords: ["豆腐", "とうふ"] },
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
      { name: "長ねぎ", amount: 1, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "長ネギ"] },
      { name: "白菜", amount: 200, unit: "g", keywords: ["白菜", "はくさい"] },
    ],
  },
  {
    id: 65, name: "豆乳鍋", description: "豆乳ベースのまろやかな鍋、白菜と豆腐がよく合う",
    ingredients: [
      { name: "豆乳", amount: 400, unit: "ml", keywords: ["豆乳"] },
      { name: "豆腐", amount: 1, unit: "丁", keywords: ["豆腐", "とうふ"] },
      { name: "白菜", amount: 300, unit: "g", keywords: ["白菜", "はくさい"] },
      { name: "長ねぎ", amount: 1, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "長ネギ"] },
    ],
  },
  {
    id: 66, name: "キムチ鍋", description: "豚肉・豆腐・白菜のピリ辛キムチ鍋",
    ingredients: [
      { name: "豚肉", amount: 200, unit: "g", keywords: ["豚", "ポーク"] },
      { name: "豆腐", amount: 1, unit: "丁", keywords: ["豆腐", "とうふ"] },
      { name: "白菜", amount: 300, unit: "g", keywords: ["白菜", "はくさい"] },
      { name: "長ねぎ", amount: 1, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "長ネギ"] },
    ],
  },
  {
    id: 67, name: "ミネストローネ", description: "トマトと野菜の具だくさんイタリアンスープ",
    ingredients: [
      { name: "トマト", amount: 2, unit: "個", keywords: ["トマト"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "にんじん", amount: 0.5, unit: "本", keywords: ["にんじん", "人参"] },
    ],
  },
  {
    id: 68, name: "フレンチオニオンスープ", description: "玉ねぎをじっくり炒めてチーズをのせた濃厚スープ",
    ingredients: [
      { name: "玉ねぎ", amount: 2, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "チーズ", amount: 40, unit: "g", keywords: ["チーズ"] },
    ],
  },
  {
    id: 69, name: "ポトフ", description: "牛肉と野菜をコンソメでじっくり煮込んだ洋食スープ",
    ingredients: [
      { name: "牛肉（塊）", amount: 200, unit: "g", keywords: ["牛肉", "ビーフ"] },
      { name: "じゃがいも", amount: 2, unit: "個", keywords: ["じゃがいも", "ジャガイモ"] },
      { name: "にんじん", amount: 1, unit: "本", keywords: ["にんじん", "人参"] },
    ],
  },
  // --- 麺・ご飯 ---
  {
    id: 70, name: "チャーハン（ベーコンと卵）", description: "ベーコンと卵のパラパラチャーハン",
    ingredients: [
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
      { name: "ベーコン", amount: 60, unit: "g", keywords: ["ベーコン", "ハム"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "長ネギ", "小ねぎ", "万能ねぎ"] },
    ],
  },
  {
    id: 71, name: "焼きうどん", description: "豚肉・キャベツ・もやしのソース焼きうどん",
    ingredients: [
      { name: "豚肉", amount: 100, unit: "g", keywords: ["豚", "ポーク"] },
      { name: "キャベツ", amount: 150, unit: "g", keywords: ["キャベツ"] },
      { name: "もやし", amount: 100, unit: "g", keywords: ["もやし"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "長ネギ", "小ねぎ", "万能ねぎ"] },
    ],
  },
  {
    id: 72, name: "冷やし中華", description: "きゅうり・ハム・卵の細切りをのせた冷麺",
    ingredients: [
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
      { name: "きゅうり", amount: 1, unit: "本", keywords: ["きゅうり"] },
      { name: "ハム", amount: 3, unit: "枚", keywords: ["ハム", "ベーコン"] },
    ],
  },
  {
    id: 73, name: "炊き込みご飯（鶏ときのこ）", description: "鶏肉・きのこ・にんじんをだしで炊き込んだご飯",
    ingredients: [
      { name: "鶏肉", amount: 150, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "しめじ", amount: 100, unit: "g", keywords: ["きのこ", "しめじ", "えのき"] },
      { name: "にんじん", amount: 0.5, unit: "本", keywords: ["にんじん", "人参"] },
    ],
  },
  {
    id: 74, name: "餃子", description: "豚ひき肉・キャベツ・ニラを包んで焼いた餃子",
    ingredients: [
      { name: "豚ひき肉", amount: 200, unit: "g", keywords: ["豚", "ひき肉", "挽き肉"] },
      { name: "キャベツ", amount: 200, unit: "g", keywords: ["キャベツ"] },
      { name: "ニラ", amount: 0.5, unit: "束", keywords: ["ニラ", "にら"] },
      { name: "にんにく", amount: 2, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
    ],
  },
  {
    id: 75, name: "お好み焼き", description: "キャベツ・卵・豚肉のふわふわお好み焼き",
    ingredients: [
      { name: "キャベツ", amount: 300, unit: "g", keywords: ["キャベツ"] },
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
      { name: "豚バラ肉", amount: 150, unit: "g", keywords: ["豚", "ポーク"] },
    ],
  },
  {
    id: 76, name: "ビビンバ", description: "牛肉・ほうれん草・もやし・卵のご飯にコチュジャン",
    ingredients: [
      { name: "牛肉（薄切り）", amount: 150, unit: "g", keywords: ["牛肉", "ビーフ"] },
      { name: "ほうれん草", amount: 1, unit: "束", keywords: ["ほうれん草"] },
      { name: "もやし", amount: 100, unit: "g", keywords: ["もやし"] },
      { name: "卵", amount: 1, unit: "個", keywords: ["卵", "たまご"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "長ネギ", "小ねぎ", "万能ねぎ"] },
    ],
  },
  {
    id: 77, name: "チヂミ", description: "にら・海鮮・卵の韓国風おやき",
    ingredients: [
      { name: "えび", amount: 100, unit: "g", keywords: ["エビ", "えび"] },
      { name: "卵", amount: 1, unit: "個", keywords: ["卵", "たまご"] },
    ],
  },
  // --- パン・洋食 ---
  {
    id: 78, name: "フレンチトースト", description: "卵と牛乳に浸したパンをバターで焼いた朝食の定番",
    ingredients: [
      { name: "食パン", amount: 2, unit: "枚", keywords: ["食パン", "パン"] },
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
      { name: "牛乳", amount: 100, unit: "ml", keywords: ["牛乳", "ミルク"] },
      { name: "バター", amount: 10, unit: "g", keywords: ["バター"] },
    ],
  },
  {
    id: 79, name: "ピザトースト", description: "ケチャップ・チーズをのせてトーストしたパン",
    ingredients: [
      { name: "食パン", amount: 2, unit: "枚", keywords: ["食パン", "パン"] },
      { name: "チーズ", amount: 40, unit: "g", keywords: ["チーズ"] },
      { name: "ソーセージ", amount: 2, unit: "本", keywords: ["ソーセージ", "ウインナー"] },
    ],
  },
  {
    id: 80, name: "グリルドチーズサンド", description: "チーズをたっぷり挟んで焼いたサンドイッチ",
    ingredients: [
      { name: "食パン", amount: 2, unit: "枚", keywords: ["食パン", "パン"] },
      { name: "チーズ", amount: 50, unit: "g", keywords: ["チーズ"] },
      { name: "バター", amount: 10, unit: "g", keywords: ["バター"] },
    ],
  },
  {
    id: 81, name: "グラタン（マカロニ）", description: "ホワイトソースとチーズで焼き上げたマカロニグラタン",
    ingredients: [
      { name: "牛乳", amount: 300, unit: "ml", keywords: ["牛乳", "ミルク"] },
      { name: "玉ねぎ", amount: 0.5, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "チーズ", amount: 50, unit: "g", keywords: ["チーズ"] },
      { name: "ベーコン", amount: 60, unit: "g", keywords: ["ベーコン"] },
    ],
  },
  {
    id: 82, name: "アヒージョ", description: "えびやきのこをオリーブオイルとにんにくで煮るスペイン料理",
    ingredients: [
      { name: "えび", amount: 150, unit: "g", keywords: ["エビ", "えび"] },
      { name: "しめじ", amount: 100, unit: "g", keywords: ["きのこ", "しめじ"] },
      { name: "にんにく", amount: 3, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
    ],
  },
  {
    id: 83, name: "カプレーゼ", description: "トマト・モッツァレラチーズ・バジルのイタリアン前菜",
    ingredients: [
      { name: "トマト", amount: 2, unit: "個", keywords: ["トマト"] },
      { name: "チーズ（モッツァレラ）", amount: 100, unit: "g", keywords: ["チーズ"] },
    ],
  },
  {
    id: 84, name: "シーザーサラダ", description: "レタス・ベーコン・クルトンのシーザーソースサラダ",
    ingredients: [
      { name: "レタス", amount: 0.5, unit: "玉", keywords: ["レタス", "サラダ菜"] },
      { name: "ベーコン", amount: 40, unit: "g", keywords: ["ベーコン"] },
      { name: "卵", amount: 1, unit: "個", keywords: ["卵", "たまご"] },
    ],
  },
  // --- スムージー・デザート ---
  {
    id: 85, name: "バナナスムージー", description: "バナナと牛乳をミキサーにかけたヘルシードリンク",
    ingredients: [
      { name: "バナナ", amount: 2, unit: "本", keywords: ["バナナ"] },
      { name: "牛乳", amount: 200, unit: "ml", keywords: ["牛乳", "ミルク"] },
    ],
  },
  {
    id: 86, name: "バナナパンケーキ", description: "バナナを生地に混ぜたふんわりパンケーキ",
    ingredients: [
      { name: "バナナ", amount: 1, unit: "本", keywords: ["バナナ"] },
      { name: "卵", amount: 1, unit: "個", keywords: ["卵", "たまご"] },
      { name: "牛乳", amount: 100, unit: "ml", keywords: ["牛乳", "ミルク"] },
    ],
  },
  {
    id: 87, name: "ヨーグルトパフェ", description: "ヨーグルトにフルーツとグラノーラをのせたパフェ",
    ingredients: [
      { name: "ヨーグルト", amount: 150, unit: "g", keywords: ["ヨーグルト"] },
      { name: "バナナ", amount: 1, unit: "本", keywords: ["バナナ"] },
    ],
  },
  {
    id: 88, name: "アップルパイ（簡単）", description: "りんごと砂糖を煮てパイシートで包んだ手作りアップルパイ",
    ingredients: [
      { name: "りんご", amount: 2, unit: "個", keywords: ["りんご", "リンゴ", "林檎"] },
    ],
  },
  {
    id: 89, name: "りんごのキャラメル煮", description: "りんごをバターとキャラメルで煮たデザート",
    ingredients: [
      { name: "りんご", amount: 2, unit: "個", keywords: ["りんご", "リンゴ", "林檎"] },
      { name: "バター", amount: 15, unit: "g", keywords: ["バター"] },
    ],
  },
  {
    id: 90, name: "アボカドトースト", description: "アボカドをつぶして塩・レモンで味付けしてのせるトースト",
    ingredients: [
      { name: "アボカド", amount: 1, unit: "個", keywords: ["アボカド"] },
      { name: "食パン", amount: 2, unit: "枚", keywords: ["食パン", "パン"] },
      { name: "卵", amount: 1, unit: "個", keywords: ["卵", "たまご"] },
    ],
  },
  // --- 追加レシピ ---
  {
    id: 91, name: "筑前煮", description: "鶏肉・ごぼう・れんこん・こんにゃくを甘辛く煮た正月料理",
    ingredients: [
      { name: "鶏もも肉", amount: 200, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "にんじん", amount: 1, unit: "本", keywords: ["にんじん", "人参"] },
    ],
  },
  {
    id: 92, name: "大根の煮物", description: "大根を昆布だしで炊いたシンプルな和食",
    ingredients: [
      { name: "大根", amount: 0.5, unit: "本", keywords: ["大根"] },
    ],
  },
  {
    id: 93, name: "ぶり大根", description: "ぶりと大根を甘辛く煮た冬の定番和食",
    ingredients: [
      { name: "ぶり", amount: 2, unit: "切れ", keywords: ["ぶり", "ブリ"] },
      { name: "大根", amount: 0.3, unit: "本", keywords: ["大根"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
    ],
  },
  {
    id: 94, name: "ひじきの煮物", description: "ひじき・にんじん・油揚げを甘辛く煮た常備菜",
    ingredients: [
      { name: "にんじん", amount: 0.5, unit: "本", keywords: ["にんじん", "人参"] },
    ],
  },
  {
    id: 95, name: "サバのカレー炒め", description: "さばをカレー粉とにんにくで炒めたエスニック風",
    ingredients: [
      { name: "サバ", amount: 2, unit: "切れ", keywords: ["サバ", "さば"] },
    ],
  },
  {
    id: 96, name: "小松菜の卵炒め", description: "小松菜と卵をシンプルに炒めた中華風副菜",
    ingredients: [
      { name: "小松菜", amount: 1, unit: "束", keywords: ["小松菜", "ほうれん草", "水菜"] },
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
    ],
  },
  {
    id: 97, name: "トマトと卵の中華炒め", description: "トマトと卵をふんわり炒めた中国の家庭料理",
    ingredients: [
      { name: "トマト", amount: 2, unit: "個", keywords: ["トマト"] },
      { name: "卵", amount: 3, unit: "個", keywords: ["卵", "たまご"] },
    ],
  },
  {
    id: 98, name: "アボカドとえびのサラダ", description: "アボカド・えび・レタスのマヨネーズサラダ",
    ingredients: [
      { name: "アボカド", amount: 1, unit: "個", keywords: ["アボカド"] },
      { name: "えび", amount: 100, unit: "g", keywords: ["エビ", "えび"] },
      { name: "レタス", amount: 3, unit: "枚", keywords: ["レタス"] },
    ],
  },
  {
    id: 99, name: "ソーセージと野菜のホットドッグ", description: "ソーセージとキャベツをパンに挟んだ手軽な一品",
    ingredients: [
      { name: "ソーセージ", amount: 4, unit: "本", keywords: ["ソーセージ", "ウインナー"] },
      { name: "キャベツ", amount: 100, unit: "g", keywords: ["キャベツ"] },
    ],
  },
  {
    id: 100, name: "チーズオムレツ", description: "中にチーズを入れてとろりと仕上げたオムレツ",
    ingredients: [
      { name: "卵", amount: 3, unit: "個", keywords: ["卵", "たまご"] },
      { name: "チーズ", amount: 30, unit: "g", keywords: ["チーズ"] },
      { name: "バター", amount: 10, unit: "g", keywords: ["バター"] },
    ],
  },
  // --- 追加レシピ（101〜150） ---
  {
    id: 101, name: "キムチチャーハン", description: "キムチと卵のピリ辛チャーハン",
    ingredients: [
      { name: "キムチ", amount: 100, unit: "g", keywords: ["キムチ", "きむち"] },
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
      { name: "豚肉", amount: 80, unit: "g", keywords: ["豚", "ポーク"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "長ネギ", "小ねぎ"] },
    ],
  },
  {
    id: 102, name: "参鶏湯風スープ", description: "鶏肉・生姜・にんにくで煮込んだ韓国風滋養スープ",
    ingredients: [
      { name: "鶏もも肉", amount: 300, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "生姜", amount: 2, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
      { name: "にんにく", amount: 3, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
      { name: "長ねぎ", amount: 1, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "長ネギ"] },
    ],
  },
  {
    id: 103, name: "スンドゥブチゲ", description: "豆腐と卵のピリ辛韓国鍋",
    ingredients: [
      { name: "豆腐", amount: 1, unit: "丁", keywords: ["豆腐", "とうふ"] },
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
      { name: "豚肉", amount: 100, unit: "g", keywords: ["豚", "ポーク"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "長ネギ"] },
    ],
  },
  {
    id: 104, name: "プルコギ", description: "甘辛いたれに漬けた韓国風牛肉炒め",
    ingredients: [
      { name: "牛肉（薄切り）", amount: 250, unit: "g", keywords: ["牛肉", "ビーフ"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "にんじん", amount: 0.5, unit: "本", keywords: ["にんじん", "人参"] },
      { name: "にんにく", amount: 2, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
    ],
  },
  {
    id: 105, name: "ナムル盛り合わせ", description: "ほうれん草・もやし・にんじんのごま油和え",
    ingredients: [
      { name: "ほうれん草", amount: 1, unit: "束", keywords: ["ほうれん草", "小松菜"] },
      { name: "もやし", amount: 200, unit: "g", keywords: ["もやし"] },
      { name: "にんじん", amount: 1, unit: "本", keywords: ["にんじん", "人参"] },
    ],
  },
  {
    id: 106, name: "豚バラ大根", description: "豚バラと大根をだし醤油でじっくり煮た和食",
    ingredients: [
      { name: "豚バラ肉", amount: 200, unit: "g", keywords: ["豚", "ポーク"] },
      { name: "大根", amount: 0.5, unit: "本", keywords: ["大根"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ"] },
    ],
  },
  {
    id: 107, name: "鶏じゃが", description: "鶏肉とじゃがいもを甘辛く煮た肉じゃがのバリエーション",
    ingredients: [
      { name: "鶏もも肉", amount: 200, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "じゃがいも", amount: 3, unit: "個", keywords: ["じゃがいも", "ジャガイモ"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "にんじん", amount: 1, unit: "本", keywords: ["にんじん", "人参"] },
    ],
  },
  {
    id: 108, name: "なすの味噌炒め", description: "なすと豚肉を甜麺醤・味噌で炒めた中華風",
    ingredients: [
      { name: "なす", amount: 3, unit: "本", keywords: ["なす", "ナス", "茄子"] },
      { name: "豚肉", amount: 100, unit: "g", keywords: ["豚", "ポーク"] },
      { name: "にんにく", amount: 2, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
    ],
  },
  {
    id: 109, name: "なすのグラタン", description: "なすとひき肉をホワイトソースとチーズで焼く",
    ingredients: [
      { name: "なす", amount: 2, unit: "本", keywords: ["なす", "ナス", "茄子"] },
      { name: "合いびき肉", amount: 150, unit: "g", keywords: ["ひき肉", "挽き肉", "合いびき"] },
      { name: "チーズ", amount: 50, unit: "g", keywords: ["チーズ"] },
      { name: "牛乳", amount: 150, unit: "ml", keywords: ["牛乳", "ミルク"] },
    ],
  },
  {
    id: 110, name: "ズッキーニのソテー", description: "ズッキーニをオリーブオイルとにんにくで焼いたシンプルなイタリアン副菜",
    ingredients: [
      { name: "ズッキーニ", amount: 2, unit: "本", keywords: ["ズッキーニ"] },
      { name: "にんにく", amount: 1, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
    ],
  },
  {
    id: 111, name: "かぶの煮物", description: "かぶを昆布だしで優しく炊いた和食の一品",
    ingredients: [
      { name: "かぶ", amount: 4, unit: "個", keywords: ["かぶ", "カブ"] },
    ],
  },
  {
    id: 112, name: "れんこんのきんぴら", description: "れんこんをごま油と醤油で炒めた歯ごたえのある副菜",
    ingredients: [
      { name: "れんこん", amount: 200, unit: "g", keywords: ["れんこん", "蓮根", "レンコン"] },
      { name: "にんじん", amount: 0.5, unit: "本", keywords: ["にんじん", "人参"] },
    ],
  },
  {
    id: 113, name: "春雨サラダ", description: "春雨・きゅうり・ハムのごまドレッシング和え",
    ingredients: [
      { name: "きゅうり", amount: 1, unit: "本", keywords: ["きゅうり"] },
      { name: "ハム", amount: 3, unit: "枚", keywords: ["ハム", "ベーコン"] },
    ],
  },
  {
    id: 114, name: "冷奴", description: "豆腐にネギ・生姜・かつおをのせた夏の定番小鉢",
    ingredients: [
      { name: "豆腐", amount: 1, unit: "丁", keywords: ["豆腐", "とうふ"] },
      { name: "長ねぎ", amount: 0.3, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "万能ねぎ"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
    ],
  },
  {
    id: 115, name: "豆腐ハンバーグ", description: "豆腐を加えてふんわり仕上げた和風ハンバーグ",
    ingredients: [
      { name: "豆腐", amount: 0.5, unit: "丁", keywords: ["豆腐", "とうふ"] },
      { name: "合いびき肉", amount: 200, unit: "g", keywords: ["ひき肉", "挽き肉", "合いびき"] },
      { name: "卵", amount: 1, unit: "個", keywords: ["卵", "たまご"] },
      { name: "玉ねぎ", amount: 0.5, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
    ],
  },
  {
    id: 116, name: "ロールキャベツ", description: "キャベツで挽き肉を包んでコンソメで煮込む洋食",
    ingredients: [
      { name: "キャベツ", amount: 6, unit: "枚", keywords: ["キャベツ"] },
      { name: "合いびき肉", amount: 250, unit: "g", keywords: ["ひき肉", "挽き肉", "合いびき"] },
      { name: "玉ねぎ", amount: 0.5, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "卵", amount: 1, unit: "個", keywords: ["卵", "たまご"] },
    ],
  },
  {
    id: 117, name: "白菜のクリーム煮", description: "白菜とベーコンを牛乳で煮込んだやさしい味わい",
    ingredients: [
      { name: "白菜", amount: 400, unit: "g", keywords: ["白菜", "はくさい"] },
      { name: "ベーコン", amount: 60, unit: "g", keywords: ["ベーコン", "ハム"] },
      { name: "牛乳", amount: 200, unit: "ml", keywords: ["牛乳", "ミルク"] },
    ],
  },
  {
    id: 118, name: "白菜と豚肉のミルフィーユ鍋", description: "白菜と豚バラを交互に重ねたミルフィーユ鍋",
    ingredients: [
      { name: "白菜", amount: 500, unit: "g", keywords: ["白菜", "はくさい"] },
      { name: "豚バラ肉", amount: 300, unit: "g", keywords: ["豚", "ポーク"] },
    ],
  },
  {
    id: 119, name: "ガーリックシュリンプ", description: "えびをにんにくバターとレモンで炒めたハワイアン風",
    ingredients: [
      { name: "えび", amount: 200, unit: "g", keywords: ["エビ", "えび"] },
      { name: "にんにく", amount: 3, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
      { name: "バター", amount: 20, unit: "g", keywords: ["バター"] },
    ],
  },
  {
    id: 120, name: "鮭のクリームパスタ", description: "鮭と牛乳でまろやかに仕上げたクリームパスタ",
    ingredients: [
      { name: "鮭", amount: 2, unit: "切れ", keywords: ["鮭", "サーモン"] },
      { name: "牛乳", amount: 200, unit: "ml", keywords: ["牛乳", "ミルク"] },
      { name: "玉ねぎ", amount: 0.5, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
    ],
  },
  {
    id: 121, name: "ツナとトマトのパスタ", description: "ツナ缶とトマトのシンプルなパスタ",
    ingredients: [
      { name: "トマト", amount: 2, unit: "個", keywords: ["トマト"] },
      { name: "玉ねぎ", amount: 0.5, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "にんにく", amount: 1, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
    ],
  },
  {
    id: 122, name: "ほうれん草とベーコンのパスタ", description: "ほうれん草とベーコンをオリーブオイルで和えたパスタ",
    ingredients: [
      { name: "ほうれん草", amount: 1, unit: "束", keywords: ["ほうれん草", "小松菜"] },
      { name: "ベーコン", amount: 60, unit: "g", keywords: ["ベーコン"] },
      { name: "にんにく", amount: 1, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
    ],
  },
  {
    id: 123, name: "きゅうりの浅漬け", description: "きゅうりを塩と昆布で漬けたさっぱり副菜",
    ingredients: [
      { name: "きゅうり", amount: 2, unit: "本", keywords: ["きゅうり"] },
    ],
  },
  {
    id: 124, name: "酢の物（きゅうりとわかめ）", description: "きゅうりとわかめを三杯酢で和えた和食の副菜",
    ingredients: [
      { name: "きゅうり", amount: 1, unit: "本", keywords: ["きゅうり"] },
    ],
  },
  {
    id: 125, name: "鶏むね肉のゆで鶏", description: "鶏むね肉を低温でしっとり仕上げた万能ゆで鶏",
    ingredients: [
      { name: "鶏むね肉", amount: 300, unit: "g", keywords: ["鶏", "チキン", "ささみ"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ"] },
    ],
  },
  {
    id: 126, name: "チキンのトマト煮", description: "鶏肉とトマトをハーブと一緒に煮込んだイタリアン風",
    ingredients: [
      { name: "鶏もも肉", amount: 300, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "トマト", amount: 2, unit: "個", keywords: ["トマト"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "にんにく", amount: 2, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
    ],
  },
  {
    id: 127, name: "ポークビーンズ", description: "豚肉と豆をトマトで煮込んだアメリカンなスープ",
    ingredients: [
      { name: "豚肉", amount: 150, unit: "g", keywords: ["豚", "ポーク"] },
      { name: "トマト", amount: 2, unit: "個", keywords: ["トマト"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "にんにく", amount: 1, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
    ],
  },
  {
    id: 128, name: "牛肉とブロッコリーのオイスター炒め", description: "牛肉とブロッコリーをオイスターソースで炒めた中華",
    ingredients: [
      { name: "牛肉（薄切り）", amount: 150, unit: "g", keywords: ["牛肉", "ビーフ"] },
      { name: "ブロッコリー", amount: 1, unit: "株", keywords: ["ブロッコリー"] },
      { name: "にんにく", amount: 1, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
    ],
  },
  {
    id: 129, name: "豚キムチ炒め", description: "豚肉とキムチをごま油で炒めたご飯が進む一品",
    ingredients: [
      { name: "豚バラ肉", amount: 200, unit: "g", keywords: ["豚", "ポーク"] },
      { name: "キムチ", amount: 150, unit: "g", keywords: ["キムチ", "きむち"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ"] },
    ],
  },
  {
    id: 130, name: "豚バラとキャベツの塩炒め", description: "豚バラとキャベツをシンプルに塩こしょうで炒める",
    ingredients: [
      { name: "豚バラ肉", amount: 200, unit: "g", keywords: ["豚", "ポーク"] },
      { name: "キャベツ", amount: 300, unit: "g", keywords: ["キャベツ"] },
      { name: "にんにく", amount: 1, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
    ],
  },
  {
    id: 131, name: "えびと卵のふわふわ炒め", description: "えびと卵をふんわり炒めた中華料理",
    ingredients: [
      { name: "えび", amount: 150, unit: "g", keywords: ["エビ", "えび"] },
      { name: "卵", amount: 3, unit: "個", keywords: ["卵", "たまご"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "小ねぎ"] },
    ],
  },
  {
    id: 132, name: "牛肉の甘辛炒め", description: "牛肉を醤油・みりん・砂糖で甘辛く炒めた丼の具",
    ingredients: [
      { name: "牛肉（薄切り）", amount: 200, unit: "g", keywords: ["牛肉", "ビーフ"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ"] },
    ],
  },
  {
    id: 133, name: "高野豆腐の煮物", description: "高野豆腐をだし醤油でじっくり含め煮した和食",
    ingredients: [
      { name: "にんじん", amount: 0.5, unit: "本", keywords: ["にんじん", "人参"] },
    ],
  },
  {
    id: 134, name: "鶏肉と根菜の煮物", description: "鶏肉・ごぼう・にんじん・こんにゃくの醤油煮",
    ingredients: [
      { name: "鶏もも肉", amount: 200, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "にんじん", amount: 1, unit: "本", keywords: ["にんじん", "人参"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
    ],
  },
  {
    id: 135, name: "ソーセージとじゃがいもの炒め", description: "ソーセージとじゃがいもをパセリバターで炒めた洋食",
    ingredients: [
      { name: "ソーセージ", amount: 4, unit: "本", keywords: ["ソーセージ", "ウインナー"] },
      { name: "じゃがいも", amount: 2, unit: "個", keywords: ["じゃがいも", "ジャガイモ"] },
      { name: "玉ねぎ", amount: 0.5, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
    ],
  },
  {
    id: 136, name: "ほうれん草とツナのサラダ", description: "ほうれん草とツナをポン酢ドレッシングで和えたサラダ",
    ingredients: [
      { name: "ほうれん草", amount: 1, unit: "束", keywords: ["ほうれん草", "小松菜", "水菜"] },
    ],
  },
  {
    id: 137, name: "アボカドとトマトのサラダ", description: "アボカド・トマト・玉ねぎのさっぱりサラダ",
    ingredients: [
      { name: "アボカド", amount: 1, unit: "個", keywords: ["アボカド"] },
      { name: "トマト", amount: 1, unit: "個", keywords: ["トマト"] },
      { name: "玉ねぎ", amount: 0.25, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
    ],
  },
  {
    id: 138, name: "グリーンサラダ", description: "レタス・きゅうり・トマトのシンプルサラダ",
    ingredients: [
      { name: "レタス", amount: 0.5, unit: "玉", keywords: ["レタス", "サラダ菜"] },
      { name: "きゅうり", amount: 1, unit: "本", keywords: ["きゅうり"] },
      { name: "トマト", amount: 1, unit: "個", keywords: ["トマト"] },
    ],
  },
  {
    id: 139, name: "コールスロー", description: "キャベツとにんじんをマヨネーズで和えたサラダ",
    ingredients: [
      { name: "キャベツ", amount: 200, unit: "g", keywords: ["キャベツ"] },
      { name: "にんじん", amount: 0.5, unit: "本", keywords: ["にんじん", "人参"] },
    ],
  },
  {
    id: 140, name: "豆腐と卵のあんかけ", description: "豆腐に卵と鶏ひき肉のあんをかけた和食",
    ingredients: [
      { name: "豆腐", amount: 1, unit: "丁", keywords: ["豆腐", "とうふ"] },
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
    ],
  },
  {
    id: 141, name: "ピペラード", description: "パプリカ・トマト・卵のバスク地方の煮込み料理",
    ingredients: [
      { name: "卵", amount: 3, unit: "個", keywords: ["卵", "たまご"] },
      { name: "トマト", amount: 2, unit: "個", keywords: ["トマト"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
    ],
  },
  {
    id: 142, name: "カオマンガイ", description: "鶏肉の旨みを吸わせたご飯とゆで鶏のタイ料理",
    ingredients: [
      { name: "鶏もも肉", amount: 300, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "生姜", amount: 2, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
      { name: "にんにく", amount: 2, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
      { name: "長ねぎ", amount: 1, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ"] },
    ],
  },
  {
    id: 143, name: "パッタイ風焼きそば", description: "えびと卵のナンプラー風味の焼きそば",
    ingredients: [
      { name: "えび", amount: 100, unit: "g", keywords: ["エビ", "えび"] },
      { name: "卵", amount: 2, unit: "個", keywords: ["卵", "たまご"] },
      { name: "もやし", amount: 100, unit: "g", keywords: ["もやし"] },
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "小ねぎ"] },
    ],
  },
  {
    id: 144, name: "鶏手羽元の甘辛煮", description: "手羽元を醤油・みりん・酢で煮た骨付き鶏の煮物",
    ingredients: [
      { name: "鶏手羽元", amount: 6, unit: "本", keywords: ["鶏", "チキン", "手羽"] },
      { name: "生姜", amount: 2, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
      { name: "にんにく", amount: 2, unit: "かけ", keywords: ["にんにく", "ガーリック", "ニンニク"] },
    ],
  },
  {
    id: 145, name: "小松菜と豆腐のみそ汁", description: "小松菜と豆腐の定番みそ汁",
    ingredients: [
      { name: "小松菜", amount: 0.5, unit: "束", keywords: ["小松菜", "ほうれん草", "水菜"] },
      { name: "豆腐", amount: 0.5, unit: "丁", keywords: ["豆腐", "とうふ"] },
      { name: "長ねぎ", amount: 0.3, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "小ねぎ"] },
    ],
  },
  {
    id: 146, name: "大根と油揚げのみそ汁", description: "大根と油揚げの定番みそ汁",
    ingredients: [
      { name: "大根", amount: 0.2, unit: "本", keywords: ["大根"] },
      { name: "長ねぎ", amount: 0.3, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "小ねぎ"] },
    ],
  },
  {
    id: 147, name: "わかめとねぎのみそ汁", description: "わかめと長ねぎのシンプルなみそ汁",
    ingredients: [
      { name: "長ねぎ", amount: 0.5, unit: "本", keywords: ["ネギ", "ねぎ", "長ねぎ", "小ねぎ", "万能ねぎ"] },
      { name: "豆腐", amount: 0.5, unit: "丁", keywords: ["豆腐", "とうふ"] },
    ],
  },
  {
    id: 148, name: "鮭のちゃんちゃん焼き", description: "鮭と野菜を味噌バターで蒸し焼きにした北海道料理",
    ingredients: [
      { name: "鮭", amount: 2, unit: "切れ", keywords: ["鮭", "サーモン"] },
      { name: "キャベツ", amount: 200, unit: "g", keywords: ["キャベツ"] },
      { name: "玉ねぎ", amount: 1, unit: "個", keywords: ["玉ねぎ", "たまねぎ"] },
      { name: "バター", amount: 20, unit: "g", keywords: ["バター"] },
    ],
  },
  {
    id: 149, name: "タラの西京焼き", description: "タラを白みそに漬けて焼いた上品な和食",
    ingredients: [
      { name: "タラ", amount: 2, unit: "切れ", keywords: ["タラ", "たら", "白身魚"] },
    ],
  },
  {
    id: 150, name: "鶏ごぼうの混ぜご飯", description: "鶏肉とごぼうをだしで炊いて混ぜたご飯",
    ingredients: [
      { name: "鶏もも肉", amount: 150, unit: "g", keywords: ["鶏", "チキン"] },
      { name: "にんじん", amount: 0.5, unit: "本", keywords: ["にんじん", "人参"] },
      { name: "生姜", amount: 1, unit: "かけ", keywords: ["生姜", "しょうが", "ショウガ"] },
    ],
  },
];

export const RECIPE_CATEGORIES = {
  "丼・ご飯":         [1,2,3,4,5,70,73,101,150],
  "肉料理":           [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,91,106,107,125,126,128,129,130,132,134,144],
  "魚・えび":         [21,22,23,24,25,26,27,93,95,119,131,148,149],
  "卵・豆腐":         [28,29,30,31,32,33,34,35,36,96,97,100,114,115,140],
  "野菜・副菜":       [37,38,39,40,41,42,43,44,45,46,47,48,49,50,94,108,110,111,112,113,117,123,124,133,136,137,138,139],
  "カレー・シチュー": [51,52,53,54,55],
  "パスタ・麺":       [56,57,58,59,60,61,71,72,75,120,121,122,143],
  "鍋・スープ":       [62,63,64,65,66,67,68,69,118,145,146,147],
  "韓国料理":         [76,102,103,104,105,129],
  "洋食":             [78,79,80,81,82,83,84,109,116,127,135,141],
  "デザート":         [85,86,87,88,89],
};

/**
 * 冷蔵庫の食材リストとレシピの食材をマッチングして
 * ingredients_from_fridge / ingredients_to_buy に分類する
 */
function matchIngredients(recipe, fridgeItems) {
  const fromFridge = [];
  const toBuy = [];

  for (const ing of recipe.ingredients) {
    const match = fridgeItems.find((fi) =>
      ing.keywords.some((kw) => fi.name.includes(kw) || kw.includes(fi.name))
    );
    if (match) {
      fromFridge.push({ name: match.name, amount: ing.amount, unit: ing.unit });
    } else {
      toBuy.push({ name: ing.name, amount: ing.amount, unit: ing.unit });
    }
  }
  return { fromFridge, toBuy };
}

/**
 * 冷蔵庫の食材をなるべく多く消費できるレシピを優先して3つ選ぶ
 *
 * アルゴリズム:
 * 1. 全レシピをスコアリング（冷蔵庫マッチ数 + 期限近い食材ボーナス）
 * 2. スコア上位をベースに、3品合計でカバーできる冷蔵庫食材の種類が最大になるよう選出
 * 3. 同スコア内はランダム（毎回同じにならないよう）
 */
export function pickRandomRecipes(fridgeItems, count = 3, category = null) {
  const pool = category && RECIPE_CATEGORIES[category]
    ? RECIPE_BOOK.filter((r) => RECIPE_CATEGORIES[category].includes(r.id))
    : RECIPE_BOOK;
  // 期限3日以内の食材名リスト（ボーナス対象）
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const urgentNames = fridgeItems
    .filter((fi) => {
      const d = new Date(fi.expiryDate);
      d.setHours(0, 0, 0, 0);
      return Math.ceil((d - today) / 86400000) <= 3;
    })
    .map((fi) => fi.name);

  // 全レシピをスコアリング
  const scored = pool.map((recipe) => {
    const { fromFridge, toBuy } = matchIngredients(recipe, fridgeItems);
    // 基本スコア: マッチ数 × 10
    // ボーナス: 期限近い食材を使うなら +5/品
    const urgentBonus = fromFridge.filter((ing) =>
      urgentNames.some((n) => ing.name.includes(n) || n.includes(ing.name))
    ).length * 5;
    const score = fromFridge.length * 10 + urgentBonus;
    return { recipe, fromFridge, toBuy, score };
  });

  // スコア降順でソート（同スコアはランダム）
  const sorted = [...scored].sort((a, b) =>
    b.score !== a.score ? b.score - a.score : Math.random() - 0.5
  );

  // スコア上位から、カバーする冷蔵庫食材の種類が最大になるよう貪欲に選出
  const selected = [];
  const coveredFridgeItems = new Set();

  // まず上位候補プール（スコア1以上）から食材カバレッジ最大化で選ぶ
  const candidates = sorted.filter((s) => s.score > 0);
  const fallback = sorted; // スコア0でも候補がなければ使う

  const finalPool = candidates.length >= count ? candidates : fallback;

  for (const item of finalPool) {
    if (selected.length >= count) break;
    selected.push(item);
    item.fromFridge.forEach((ing) => coveredFridgeItems.add(ing.name));
  }

  // 足りない場合は残りからランダム補充（重複なし）
  if (selected.length < count) {
    const remaining = sorted.filter((s) => !selected.includes(s));
    const shuffled = remaining.sort(() => Math.random() - 0.5);
    for (const item of shuffled) {
      if (selected.length >= count) break;
      selected.push(item);
    }
  }

  return selected.map(({ recipe, fromFridge, toBuy }) => ({
    name: recipe.name,
    description: recipe.description,
    ingredients_from_fridge: fromFridge,
    ingredients_to_buy: toBuy,
  }));
}
