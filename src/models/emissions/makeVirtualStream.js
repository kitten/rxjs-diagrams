import { Observable } from 'rxjs/Observable'
import { merge } from 'rxjs/observable/merge'
import { takeUntil } from 'rxjs/operator/takeUntil'
import { share } from 'rxjs/operator/share'

export const COMPLETION_OFFSET = 0.00001

const makeVirtualEmission = (scheduler, value, delay) => {
  return new Observable(observer => {
    scheduler.schedule(() => {
      observer.next(value)
    }, delay, value)
  })
}

const makeVirtualStream = (scheduler, diagram) => {
  const { emissions, completion } = diagram

  const partials = emissions.map(({ x, d }) => (
    makeVirtualEmission(scheduler, d, x)
  ))

  const completion$ = makeVirtualEmission(scheduler, null, completion + COMPLETION_OFFSET)

  const emission$ = merge(...partials)
    ::takeUntil(completion$)
    ::share()

  return emission$
}

export default makeVirtualStream
