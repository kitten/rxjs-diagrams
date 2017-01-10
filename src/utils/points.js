const points = (arr = []) => (
  arr.map(coor => coor.join(',')).join(' ')
)

export default points
