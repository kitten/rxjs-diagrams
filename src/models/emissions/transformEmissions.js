import { Observable } from 'rxjs/Observable'
import { from } from 'rxjs/observable/from'
import makeScheduler from './makeScheduler'
import makeVirtualStream from './makeVirtualStream'
import makeDiagramModel from './makeDiagramModel'
import mapStreamToEmissions from './mapStreamToEmissions'

const transformEmissions = (transform, completion, ...emissionsArr) => new Observable(observer => {
  const scheduler = makeScheduler()
  const emission$Arr = emissionsArr.map(emissions => (
    makeVirtualStream(scheduler, makeDiagramModel(emissions, completion))
  ))

  let emission$
  try {
    emission$ = from(transform(...emission$Arr, scheduler))
  } catch (err) {
    observer.error(err)
    return undefined
  }

  const result = mapStreamToEmissions(scheduler, emission$)
  const sub = result.subscribe(observer)

  scheduler.flush()

  return sub.unsubscribe.bind(sub)
})

export default transformEmissions
