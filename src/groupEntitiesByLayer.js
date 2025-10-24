/**
 * Group entities by their layer name
 * @param {Array} entities - Array of entities to group
 * @returns {Object} Object with layer names as keys and arrays of entities as values
 */
export default (entities) => {
  return entities.reduce((acc, entity) => {
    const layer = entity.layer
    if (!acc[layer]) {
      acc[layer] = []
    }
    acc[layer].push(entity)
    return acc
  }, {})
}
