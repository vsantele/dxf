import { assign } from './attdef'

/**
 * Type constant for ATTRIB entity
 * @type {string}
 */
export const TYPE = 'ATTRIB'

/**
 * Process ATTRIB entity tuples
 * @param {Array<[number, any]>} tuples - Array of [type, value] tuples
 * @returns {Object} Processed ATTRIB entity
 */
export const process = (tuples) => {
  return tuples.reduce(
    (entity, tuple) => {
      const type = tuple[0]
      const value = tuple[1]

      assign(entity, type, value)

      return entity
    },
    {
      type: TYPE,
      subclassMarker: 'AcDbText',
      thickness: 0,
      scaleX: 1,
      mtext: {},
      text: {},
    },
  )
}

export default { TYPE, process }
