import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged'
import { map } from 'rxjs/operator/map'
import { first } from 'rxjs/operator/first'

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
  .add('.map()', () => {
    const width = 80
    const input = [
      { x: 5, d: 1 },
      { x: 20, d: 2 },
      { x: 35, d: 2 },
      { x: 60, d: 1 },
      { x: 70, d: 3 }
    ]

    const output = transformEmissions(
      obs => obs::map(x => String.fromCharCode(64 + x)),
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


