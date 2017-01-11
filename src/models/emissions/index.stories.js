import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged'
import { map } from 'rxjs/operator/map'
import { first } from 'rxjs/operator/first'
import { delay } from 'rxjs/operator/delay'
import { combineLatest } from 'rxjs/observable/combineLatest'

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
  .add('.combineLatest((x, y) => `${x}${y}`)', () => {
    const width = 80
    const inputA = [
      { x: 5, d: 1 },
      { x: 20, d: 2 },
      { x: 35, d: 3 },
      { x: 60, d: 4 },
      { x: 70, d: 5 }
    ]

    const inputB = [
      { x: 5, d: 'A' },
      { x: 28, d: 'B' },
      { x: 35, d: 'C' },
      { x: 45, d: 'D' },
      { x: 70, d: 'E' }
    ]

    const output = transformEmissions(
      (a, b, scheduler) => combineLatest(a, b, (x, y) => `${x}${y}`, scheduler),
      width,
      inputA,
      inputB
    )

    const InputA = fromEmissions(inputA, width, width)
    const InputB = fromEmissions(inputB, width, width)

    return (
      <div>
        <InputA/>
        <InputB/>

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
