import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged'
import { delay } from 'rxjs/operator/delay'
import { withKnobs, number } from '@kadira/storybook-addon-knobs';

import OperatorDiagram from './operatorDiagram'

storiesOf('OperatorDiagram', module)
  .addDecorator(withKnobs)
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
        width={number('Width', 500)}
        height={number('Height', 50)}
        emissions={emissions}
        transform={obs => obs::distinctUntilChanged()}
        end={end}
        completion={completion}
        label=".distinctUntilChanged()"
      />
    )
  })
  .add('.delay(5)', () => {
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
        transform={(obs, scheduler) => obs::delay(5, scheduler)}
        end={end}
        completion={completion}
        label=".delay(5)"
      />
    )
  })
