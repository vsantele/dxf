/**
 * Group entities by their layer name
 * @param {import('./types').Entity[]} entities - Array of entities to group
 * @returns {import('./types').GroupedEntities} Object with layer names as keys and arrays of entities as values
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
