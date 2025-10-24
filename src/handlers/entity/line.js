import common from './common'

/**
 * Type constant for LINE entity
 * @type {string}
 */
export const TYPE = 'LINE'

/**
 * Process LINE entity tuples
 * @param {Array<[number, any]>} tuples - Array of [type, value] tuples
 * @returns {Object} Processed LINE entity
 */
export const process = (tuples) => {
  return tuples.reduce(
    (entity, tuple) => {
      const type = tuple[0]
      const value = tuple[1]
      switch (type) {
        case 10:
          entity.start.x = value
          break
        case 20:
          entity.start.y = value
          break
        case 30:
          entity.start.z = value
          break
        case 39:
          entity.thickness = value
          break
        case 11:
          entity.end.x = value
          break
        case 21:
          entity.end.y = value
          break
        case 31:
          entity.end.z = value
          break
        default:
          Object.assign(entity, common(type, value))
          break
      }
      return entity
    },
    {
      type: TYPE,
      start: {},
      end: {},
    },
  )
}

export default { TYPE, process }
