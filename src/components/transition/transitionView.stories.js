import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs, number, boolean } from '@kadira/storybook-addon-knobs';

import TransitionView from './transitionView'

storiesOf('TransitionView', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <TransitionView
      width={number('Width', 500)}
      height={number('Height', 50)}
      emissions={[
        { x: 5, d: 1 },
        { x: 20, d: 2 },
        { x: 35, d: 2 },
        { x: 60, d: 1 },
        { x: 70, d: 3 }
      ]}
      end={80}
      completion={number('Completion', 80)}
    />
  ))

