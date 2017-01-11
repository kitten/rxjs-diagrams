import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { merge } from 'rxjs/observable/merge'
import { delay } from 'rxjs/operator/delay'
import { takeUntil } from 'rxjs/operator/takeUntil'
import { share } from 'rxjs/operator/share'

const makeVirtualEmission = (scheduler, value) => {
  return new Observable(observer => {
    scheduler.schedule(() => {
      observer.next(value)
    })
  })
}

const makeVirtualStream = (scheduler, diagram) => {
  const { emissions, completion } = diagram

  const partials = emissions.map(({ x, d }) => (
    makeVirtualEmission(scheduler, d)
      ::delay(x, scheduler)
  ))

  const completion$ = of(null)::delay(completion, scheduler)

  const emission$ = merge(...partials)
    ::takeUntil(completion$)
    ::share()

  return emission$
}

export default makeVirtualStream
