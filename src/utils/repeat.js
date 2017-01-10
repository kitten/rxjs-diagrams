const repeat = (start, end, step) => {
  const arr = []

  for (let i = start; i <= end; i += step) {
    arr.push(i)
  }

  return arr
}

export default repeat
