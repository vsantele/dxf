import headerHandler from './handlers/header'
import tablesHandler from './handlers/tables'
import blocksHandler from './handlers/blocks'
import entitiesHandler from './handlers/entities'
import objectsHandler from './handlers/objects'
import logger from './util/logger'

/**
 * Parse the value into the native representation
 * @param {number} type - The DXF group code type
 * @param {string} value - The string value to parse
 * @returns {number|string} The parsed value (number or string)
 */
const parseValue = (type, value) => {
  if (type >= 10 && type < 60) {
    return parseFloat(value, 10)
  } else if (type >= 210 && type < 240) {
    return parseFloat(value, 10)
  } else if (type >= 60 && type < 100) {
    return parseInt(value, 10)
  } else {
    return value
  }
}

/**
 * Content lines are alternate lines of type and value
 * @param {string[]} contentLines - Array of content lines from DXF file
 * @returns {Array<[number, any]>} Array of [type, value] tuples
 */
const convertToTypesAndValues = (contentLines) => {
  let state = 'type'
  let type
  const typesAndValues = []
  for (const line of contentLines) {
    if (state === 'type') {
      type = parseInt(line, 10)
      state = 'value'
    } else {
      typesAndValues.push([type, parseValue(type, line)])
      state = 'type'
    }
  }
  return typesAndValues
}

/**
 * Separate tuples into sections
 * @param {Array<[number, any]>} tuples - Array of [type, value] tuples
 * @returns {Array<Array<[number, any]>>} Array of sections, each containing tuples
 */
const separateSections = (tuples) => {
  let sectionTuples
  return tuples.reduce((sections, tuple) => {
    if (tuple[0] === 0 && tuple[1] === 'SECTION') {
      sectionTuples = []
    } else if (tuple[0] === 0 && tuple[1] === 'ENDSEC') {
      sections.push(sectionTuples)
      sectionTuples = undefined
    } else if (sectionTuples !== undefined) {
      sectionTuples.push(tuple)
    }
    return sections
  }, [])
}

/**
 * Reduce a section by processing its content tuples
 * @param {Object} acc - The accumulator object
 * @param {Array<[number, any]>} section - Section tuples to process
 * @returns {Object} Updated accumulator with section data
 */
const reduceSection = (acc, section) => {
  const sectionType = section[0][1]
  const contentTuples = section.slice(1)
  switch (sectionType) {
    case 'HEADER':
      acc.header = headerHandler(contentTuples)
      break
    case 'TABLES':
      acc.tables = tablesHandler(contentTuples)
      break
    case 'BLOCKS':
      acc.blocks = blocksHandler(contentTuples)
      break
    case 'ENTITIES':
      acc.entities = entitiesHandler(contentTuples)
      break
    case 'OBJECTS':
      acc.objects = objectsHandler(contentTuples)
      break
    default:
      logger.warn(`Unsupported section: ${sectionType}`)
  }
  return acc
}

/**
 * Parse a DXF string into a structured object
 * @param {string} string - The DXF file content as a string
 * @returns {import('./types').ParsedDXF} Parsed DXF data with sections (header, tables, blocks, entities, objects)
 */
export default (string) => {
  const lines = string.split(/\r\n|\r|\n/g)
  const tuples = convertToTypesAndValues(lines)
  const sections = separateSections(tuples)
  const result = sections.reduce(reduceSection, {
    // Start with empty defaults in the event of empty sections
    header: {},
    blocks: [],
    entities: [],
    objects: { layouts: [] },
    tables: { layers: {}, styles: {}, ltypes: {} },
  })
  return result
}
