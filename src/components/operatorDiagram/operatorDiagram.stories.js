import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged'
import { delay } from 'rxjs/operator/delay'
import { switchMap } from 'rxjs/operator/switchMap'
import { merge } from 'rxjs/operator/merge'
import { combineLatest } from 'rxjs/observable/combineLatest'
import { of } from 'rxjs/observable/of'
import { withKnobs, number } from '@kadira/storybook-addon-knobs';

import OperatorDiagram from './operatorDiagram'

const end = 100
const completion = 80
const emissions = [
  { x: 5, d: 1 },
  { x: 20, d: 2 },
  { x: 35, d: 2 },
  { x: 60, d: 1 },
  { x: 70, d: 3 }
]

const twoEmissions = [
  emissions,
  [
    { x: 5, d: 'A' },
    { x: 28, d: 'B' },
    { x: 35, d: 'C' },
    { x: 45, d: 'D' },
    { x: 70, d: 'E' }
  ]
]

storiesOf('OperatorDiagram', module)
  .addDecorator(withKnobs)
  .add('.distinctUntilChanged()', () => (
    <OperatorDiagram
      width={number('Width', 500)}
      height={number('Height', 50)}
      fit={true}
      emissions={emissions}
      transform={obs => obs::distinctUntilChanged()}
      end={end}
      completion={completion}
      label=".distinctUntilChanged()"
    />
  ))
  .add('.delay(5)', () => (
    <OperatorDiagram
      emissions={emissions}
      transform={(obs, scheduler) => obs::delay(5, scheduler)}
      end={end}
      completion={completion}
      label=".delay(5)"
    />
  ))
  .add('.combineLatest((x, y) => \'\' + x + y)', () => (
    <OperatorDiagram
      emissions={twoEmissions}
      transform={(a, b, scheduler) => combineLatest(a, b, (x, y) => '' + x + y)}
      end={end}
      completion={completion}
      label=".combineLatest((x, y) => '' + x + y)"
    />
  ))
  .add('.switchMap((x) => Observable.of(x, x + 1))', () => (
    <OperatorDiagram
      emissions={[
        { x: 5, d: 1 },
        { x: 35, d: 2 },
        { x: 70, d: 3 }
      ]}
      transform={(obs, s) => obs::switchMap(x => (
        of(x, s)::merge(of(x + 1, s)::delay(10, s))
      ))}
      end={end}
      completion={completion}
      label=".switchMap((x) => Observable.of(x, x + 1))"
    />
  ))
