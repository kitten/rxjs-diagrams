import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ObservableView from './view'
import fromEmissions from './fromEmissions'

storiesOf('Observable', module)
  .add('View', () => (
    <ObservableView
      width={500}
      height={50}
      emissions={[
        { x: 0, d: 'A' },
        { x: 0.25, d: 'B' },
        { x: 0.5, d: 'C' },
        { x: 0.75, d: 'D' }
      ]}
      completion={0.75}
    />
  ))
  .add('fromEmissions', () => {
    const View = fromEmissions([
      { x: 5, d: 1 },
      { x: 20, d: 2 },
      { x: 35, d: 2 },
      { x: 60, d: 1 },
      { x: 70, d: 3 }
    ], 80)

    return <View width={500} height={50}/>
  })
