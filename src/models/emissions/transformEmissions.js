import makeScheduler from './makeScheduler'
import makeVirtualStream from './makeVirtualStream'
import makeDiagramModel from './makeDiagramModel'
import mapStreamToEmissions from './mapStreamToEmissions'

const transformEmissions = (transform, end, ...emissionsArr) => {
  const scheduler = makeScheduler()

  const emission$Arr = emissionsArr.map(emissions => (
    makeVirtualStream(scheduler, makeDiagramModel(emissions, end))
  ))

  const emission$ = transform(...emission$Arr, scheduler)
  const result = mapStreamToEmissions(scheduler, emission$)

  scheduler.flush()

  return result
}

export default transformEmissions
