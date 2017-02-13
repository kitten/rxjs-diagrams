import { timestamp } from 'rxjs/operator/timestamp'
import { reduce } from 'rxjs/operator/reduce'
import { map } from 'rxjs/operator/map'

import { COMPLETION_OFFSET } from './makeVirtualStream'
import makeDiagramModel from './makeDiagramModel'

const mapStreamToEmissions = (scheduler, emission$) => {
  const res = emission$
    ::timestamp(scheduler)
    ::reduce((acc, { value, timestamp }) => {
      acc.push({ x: timestamp, d: value })
      return acc
    }, [])
    ::map(emissions => (
      makeDiagramModel(emissions, scheduler.now() - COMPLETION_OFFSET)
    ))

  return res
}

export default mapStreamToEmissions
