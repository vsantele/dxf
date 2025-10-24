import logger from './util/logger'
import parseString from './parseString'
import denormalise from './denormalise'
import toSVG from './toSVG'
import toPolylines from './toPolylines'
import groupEntitiesByLayer from './groupEntitiesByLayer'

/**
 * Helper class to simplify working with DXF files
 */
export default class Helper {
  /**
   * Create a new Helper instance
   * @param {string} contents - The DXF file content as a string
   * @throws {Error} If contents is not a string
   */
  constructor(contents) {
    if (!(typeof contents === 'string')) {
      throw Error('Helper constructor expects a DXF string')
    }
    this._contents = contents
    this._parsed = null
    this._denormalised = null
  }

  /**
   * Parse the DXF content
   * @returns {import('./types').ParsedDXF} Parsed DXF data
   */
  parse() {
    this._parsed = parseString(this._contents)
    logger.info('parsed:', this.parsed)
    return this._parsed
  }

  /**
   * Get the parsed DXF data (parses if not already done)
   * @returns {import('./types').ParsedDXF} Parsed DXF data
   */
  get parsed() {
    if (this._parsed === null) {
      this.parse()
    }
    return this._parsed
  }

  /**
   * Denormalise the parsed DXF data (applies transforms to blocks)
   * @returns {import('./types').Entity[]} Array of denormalised entities
   */
  denormalise() {
    this._denormalised = denormalise(this.parsed)
    logger.info('denormalised:', this._denormalised)
    return this._denormalised
  }

  /**
   * Get denormalised entities (denormalises if not already done)
   * @returns {import('./types').Entity[]} Array of denormalised entities
   */
  get denormalised() {
    if (!this._denormalised) {
      this.denormalise()
    }
    return this._denormalised
  }

  /**
   * Group entities by layer
   */
  group() {
    this._groups = groupEntitiesByLayer(this.denormalised)
  }

  /**
   * Get entities grouped by layer
   * @returns {import('./types').GroupedEntities} Entities grouped by layer
   */
  get groups() {
    if (!this._groups) {
      this.group()
    }
    return this._groups
  }

  /**
   * Convert the DXF to SVG
   * @returns {string} SVG representation of the DXF
   */
  toSVG() {
    return toSVG(this.parsed)
  }

  /**
   * Convert entities to polylines for rendering
   * @returns {import('./types').PolylinesResult} Result with bounding box and array of polylines with color information
   */
  toPolylines() {
    return toPolylines(this.parsed)
  }
}
