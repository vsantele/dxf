import common from './common'

export const TYPE = 'CIRCLE'

export const process = (tuples: any[]) => {
  return tuples.reduce(
    (entity: { x: any; y: any; z: any; r: any }, tuple: any[]) => {
      const type = tuple[0]
      const value = tuple[1]
      switch (type) {
        case 10:
          entity.x = value
          break
        case 20:
          entity.y = value
          break
        case 30:
          entity.z = value
          break
        case 40:
          entity.r = value
          break
        default:
          Object.assign(entity, common(type, value))
          break
      }
      return entity
    },
    {
      type: TYPE,
    },
  )
}

export default { TYPE, process }
