/**
 * Convert an RGB array to a CSS string definition.
 * Converts white lines to black as the default.
 * @param {import('../types').RGBColor} rgb - RGB color array [r, g, b]
 * @returns {string} CSS rgb() string
 */
export default (rgb) => {
  if (rgb[0] === 255 && rgb[1] === 255 && rgb[2] === 255) {
    return 'rgb(0, 0, 0)'
  } else {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
  }
}
