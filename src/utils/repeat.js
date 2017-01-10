const repeat = (start, end, amount) => {
  const range = end - start
  const step = range / amount

  const arr = []

  for (let i = start; i <= end; i += step) {
    arr.push(i)
  }

  return arr
}

export default repeat
