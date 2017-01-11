const selectValue = obj => obj.x

const makeDiagramModel = (emissions, end) => {
  let completion = end
  if (!completion) {
    completion = Math.max.apply(null, emissions.map(selectValue))
  }

  return {
    emissions,
    completion
  }
}

export default makeDiagramModel
