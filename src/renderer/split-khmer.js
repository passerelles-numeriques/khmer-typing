import GraphemeSplitter from 'grapheme-splitter'

/**
 * Splits a text in khmer into an array of separate graphemes
 * Each grapheme is what would normally be considered as a "letter", but can be the result of multiple typed keys
 * Uses grapheme.splitter and corrects its mistakes related to khmer
 * @param text the text to split
 * @return an array of graphemes
 */
export default function splitKhmerRunes (text) {
  text.normalize()
  const splitter = new GraphemeSplitter()
  let graphemes = splitter.splitGraphemes(text)
  // Correct one mistake that happens in Khmer language
  let previousCodePoint = null
  for (let i = 0; i < graphemes.length; i++) {
    if (previousCodePoint === 0x17d2) {
      graphemes[i - 1] += graphemes[i]
      graphemes.splice(i, 1)
      i-- // decrement
    }
    previousCodePoint = [...graphemes[i]].pop().charCodeAt(0) // get last codepoint
  }
  return graphemes
}
