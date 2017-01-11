import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged'
import { map } from 'rxjs/operator/map'
import { first } from 'rxjs/operator/first'
import { delay } from 'rxjs/operator/delay'

import ObservableRenderer from '../../components/ObservableRenderer'
import { transformEmissions } from './index'
import { fromEmissions } from '../../components/observable'

storiesOf('Emissions', module)
  .add('.distinctUntilChanged()', () => {
    const width = 80
    const input = [
      { x: 5, d: 1 },
      { x: 20, d: 2 },
      { x: 35, d: 2 },
      { x: 60, d: 1 },
      { x: 70, d: 3 }
    ]

    const output = transformEmissions(
      obs => obs::distinctUntilChanged(),
      width,
      input
    )

    const Input = fromEmissions(input, width, width)

    return (
      <div>
        <Input/>

        <ObservableRenderer
          source={output}
          transform={({ emissions, completion }) => {
            const View = fromEmissions(emissions, width, completion)
            return <View/>
          }}
        />
      </div>
    )
  })
  .add('.map(x => x * 10)', () => {
    const width = 80
    const input = [
      { x: 5, d: 1 },
      { x: 20, d: 2 },
      { x: 35, d: 2 },
      { x: 60, d: 1 },
      { x: 70, d: 3 }
    ]

    const output = transformEmissions(
      obs => obs::map(x => x * 10),
      width,
      input
    )

    const Input = fromEmissions(input, width, width)

    return (
      <div>
        <Input/>

        <ObservableRenderer
          source={output}
          transform={({ emissions, completion }) => {
            const View = fromEmissions(emissions, width, completion)
            return <View/>
          }}
        />
      </div>
    )
  })
  .add('.first()', () => {
    const width = 80
    const input = [
      { x: 5, d: 1 },
      { x: 20, d: 2 },
      { x: 35, d: 2 },
      { x: 60, d: 1 },
      { x: 70, d: 3 }
    ]

    const output = transformEmissions(
      obs => obs::first(),
      width,
      input
    )

    const Input = fromEmissions(input, width, width)

    return (
      <div>
        <Input/>

        <ObservableRenderer
          source={output}
          transform={({ emissions, completion }) => {
            const View = fromEmissions(emissions, width, completion)
            return <View/>
          }}
        />
      </div>
    )
  })
  .add('.delay(5)', () => {
    const width = 80
    const input = [
      { x: 5, d: 1 },
      { x: 20, d: 2 },
      { x: 35, d: 2 },
      { x: 60, d: 1 },
      { x: 70, d: 3 }
    ]

    const output = transformEmissions(
      (obs, scheduler) => obs::delay(5, scheduler),
      width,
      input
    )

    const Input = fromEmissions(input, width, width)

    return (
      <div>
        <Input/>

        <ObservableRenderer
          source={output}
          transform={({ emissions, completion }) => {
            const View = fromEmissions(emissions, width, completion)
            return <View/>
          }}
        />
      </div>
    )
  })
