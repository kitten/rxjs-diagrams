import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged'
import { delay } from 'rxjs/operator/delay'
import { withKnobs, number } from '@kadira/storybook-addon-knobs';

import ChainDiagram from './chainDiagram'
import OperatorDiagram from '../operatorDiagram/index'

const end = 100
const completion = 80
const emissions = [
  { x: 5, d: 1 },
  { x: 20, d: 2 },
  { x: 35, d: 2 },
  { x: 60, d: 1 },
  { x: 70, d: 3 }
]

storiesOf('ChainDiagram', module)
  .addDecorator(withKnobs)
  .add('.delay(5).distinctUntilChanged()', () => (
    <ChainDiagram
      width={number('Width', 500)}
      height={number('Height', 50)}
      completion={completion}
      end={end}
    >
      <OperatorDiagram
        emissions={emissions}
        transform={(obs, s) => obs::delay(5, s)}
        label=".sleep(5)"
      />
      <OperatorDiagram
        transform={obs => obs::distinctUntilChanged()}
        label=".distinctUntilChanged()"
      />
      <OperatorDiagram
        transform={(obs, s) => obs::delay(5, s)}
        label=".delay(5)"
      />



    </ChainDiagram>
  ))
