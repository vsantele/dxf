export default (entities: any[]) => {
  return entities.reduce((acc: { [x: string]: any[] }, entity: { layer: any }) => {
    const layer = entity.layer
    if (!acc[layer]) {
      acc[layer] = []
    }
    acc[layer].push(entity)
    return acc
  }, {})
}
