import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs, number, boolean } from '@kadira/storybook-addon-knobs';

import ObservableView from './view'
import EmissionsView from './emissionsView'

storiesOf('Observable', module)
  .addDecorator(withKnobs)
  .add('View', () => (
    <ObservableView
      width={number('Width', 500)}
      height={number('Height', 50)}
      emissions={[
        { x: 0, d: 'A' },
        { x: 0.25, d: 'B' },
        { x: 0.5, d: 'C' },
        { x: 0.75, d: 'D' }
      ]}
      completion={number('Completion', 0.75)}
    />
  ))
  .add('EmissionsView', () => (
    <EmissionsView
      width={number('Width', 500)}
      height={number('Height', 50)}
      emissions={[
        { x: 5, d: 1 },
        { x: 20, d: 2 },
        { x: 35, d: 2 },
        { x: 60, d: 1 },
        { x: 70, d: 3 }
      ]}
      end={number('End', 80)}
      completion={number('Completion', 80)}
    />
  ))

