import { Observable } from 'rxjs/Observable'
import makeScheduler from './makeScheduler'
import makeVirtualStream from './makeVirtualStream'
import makeDiagramModel from './makeDiagramModel'
import mapStreamToEmissions from './mapStreamToEmissions'

const transformEmissions = (transform, completion, ...emissionsArr) => new Observable(observer => {
  const scheduler = makeScheduler()
  const emission$Arr = emissionsArr.map(emissions => (
    makeVirtualStream(scheduler, makeDiagramModel(emissions, completion))
  ))

  const emission$ = transform(...emission$Arr, scheduler)
  const result = mapStreamToEmissions(scheduler, emission$)
  const sub = result.subscribe(observer)

  scheduler.flush()

  return sub.unsubscribe.bind(sub)
})

export default transformEmissions
