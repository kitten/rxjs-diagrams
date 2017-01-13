import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged'

import OperatorDiagram from './operatorDiagram'

storiesOf('OperatorDiagram', module)
  .add('.distinctUntilChanged()', () => {
    const end = 100
    const completion = 80
    const emissions = [
      { x: 5, d: 1 },
      { x: 20, d: 2 },
      { x: 35, d: 2 },
      { x: 60, d: 1 },
      { x: 70, d: 3 }
    ]

    return (
      <OperatorDiagram
        emissions={emissions}
        transform={obs => obs::distinctUntilChanged()}
        end={end}
        completion={completion}
      />
    )
  })
