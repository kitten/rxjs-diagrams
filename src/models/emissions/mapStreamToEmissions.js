import { Observable } from 'rxjs/BehaviorSubject'
import { observeOn } from 'rxjs/operator/observeOn'
import { timestamp } from 'rxjs/operator/timestamp'
import { reduce } from 'rxjs/operator/reduce'
import { map } from 'rxjs/operator/map'
import { publishReplay } from 'rxjs/operator/publishReplay'

import { COMPLETION_OFFSET } from './makeVirtualStream'
import makeDiagramModel from './makeDiagramModel'

const mapStreamToEmissions = (scheduler, emission$) => {
  const res = emission$
    ::observeOn(scheduler)
    ::timestamp(scheduler)
    ::reduce((acc, { value, timestamp }) => {
      acc.push({ x: timestamp, d: value })
      return acc
    }, [])
    ::map(emissions => (
      makeDiagramModel(emissions, scheduler.now() - COMPLETION_OFFSET)
    ))
    ::publishReplay(1)

  res.connect()

  return res
}

export default mapStreamToEmissions
