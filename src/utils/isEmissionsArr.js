export const isEmission = obj => (
  typeof obj === 'object' &&
  typeof obj.x === 'number' &&
  obj.x === obj.x &&
  obj.x > 0 &&
  obj.d !== undefined &&
  obj.d !== null
)

export const isEmissionsArr = arr => (
  Array.isArray(arr) &&
  arr.every(isEmission)
)
