import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ObservableView from './view'

storiesOf('<ObservableView/>', module)
  .add('default', () => (
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
