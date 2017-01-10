const scaleVector = (width, height) => ([ x, y ]) => ([
  typeof x === 'number' ? x * width : x,
  typeof y === 'number' ? y * height : y
])

export default scaleVector
