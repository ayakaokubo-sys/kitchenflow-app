/**
 * 絵文字文字列 → Twemoji SVG URL に変換する
 * https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/{codepoint}.svg
 */
function toCodePoint(emoji) {
  // ZWJ シーケンス以外は variation selector (U+FE0F) を除去
  const clean = emoji.indexOf("\u200D") < 0 ? emoji.replace(/\uFE0F/g, "") : emoji;
  const points = [];
  let i = 0;
  while (i < clean.length) {
    const code = clean.charCodeAt(i);
    if (code >= 0xD800 && code <= 0xDBFF) {
      const next = clean.charCodeAt(i + 1);
      points.push((0x10000 + ((code - 0xD800) << 10) + (next - 0xDC00)).toString(16));
      i += 2;
    } else {
      points.push(code.toString(16));
      i++;
    }
  }
  return points.join("-");
}

export function emojiToTwemojiUrl(emoji) {
  const cp = toCodePoint(emoji);
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${cp}.svg`;
}
