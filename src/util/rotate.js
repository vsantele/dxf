/**
 * Rotate a point by the given angle.
 * @param {{x: number, y: number}} p - The point to rotate
 * @param {number} angle - The rotation angle in radians
 * @returns {{x: number, y: number}} The rotated point
 */
export default (p, angle) => {
  return {
    x: p.x * Math.cos(angle) - p.y * Math.sin(angle),
    y: p.y * Math.cos(angle) + p.x * Math.sin(angle),
  }
}
