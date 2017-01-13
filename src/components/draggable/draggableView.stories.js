import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs, number, boolean } from '@kadira/storybook-addon-knobs';

import DraggableView from './draggableView'

storiesOf('DraggableView', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <DraggableView
      width={number('Width', 500)}
      height={number('Height', 50)}
      emissions={[
        { x: 5, d: 1 },
        { x: 20, d: 2 },
        { x: 35, d: 2 },
        { x: 60, d: 1 },
        { x: 70, d: 3 }
      ]}
      completion={80}
      end={80}
    />
  ))

