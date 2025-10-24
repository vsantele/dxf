import insertKnot from './insertKnot'

/**
 * For a pinned spline, the knots have to be repeated k times
 * (where k is the order), at both the beginning and the end
 * @param {number} k - Order of the B-spline
 * @param {Array<number>} knots - Knot vector
 * @returns {boolean} True if the spline is pinned
 */
export const checkPinned = (k, knots) => {
  // Pinned at the start
  for (let i = 1; i < k; ++i) {
    if (knots[i] !== knots[0]) {
      throw Error(`not pinned. order: ${k} knots: ${knots}`)
    }
  }
  // Pinned at the end
  for (let i = knots.length - 2; i > knots.length - k - 1; --i) {
    if (knots[i] !== knots[knots.length - 1]) {
      throw Error(`not pinned. order: ${k} knots: ${knots}`)
    }
  }
}

/**
 * Calculate the multiplicity of a knot
 * @param {Array<number>} knots - Knot vector
 * @param {number} index - Index of the knot
 * @returns {number} Multiplicity of the knot
 */
export const multiplicity = (knots, index) => {
  let m = 1
  for (let i = index + 1; i < knots.length; ++i) {
    if (knots[i] === knots[index]) {
      ++m
    } else {
      break
    }
  }
  return m
}

/**
 * https://saccade.com/writing/graphics/KnotVectors.pdf
 * A quadratic piecewise Bézier knot vector with seven control points
 * will look like this [0 0 0 1 1 2 2 3 3 3]. In general, in a
 * piecewise Bézier knot vector the first k knots are the same,
 * then each subsequent group of k-1 knots is the same,
 * until you get to the end.
 */
export const computeInsertions = (k, knots) => {
  const inserts = []
  let i = k
  while (i < knots.length - k) {
    const knot = knots[i]
    const m = multiplicity(knots, i)
    for (let j = 0; j < k - m - 1; ++j) {
      inserts.push(knot)
    }
    i = i + m
  }
  return inserts
}

/**
 * Convert a B-spline to piecewise Bezier representation
 * @param {number} k - Order of the B-spline
 * @param {Array} controlPoints - Control points
 * @param {Array<number>} knots - Knot vector
 * @returns {{controlPoints: Array, knots: Array<number>}} Piecewise Bezier representation
 */
export default (k, controlPoints, knots) => {
  checkPinned(k, knots)
  const insertions = computeInsertions(k, knots)
  return insertions.reduce(
    (acc, tNew) => {
      return insertKnot(k, acc.controlPoints, acc.knots, tNew)
    },
    { controlPoints, knots },
  )
}
