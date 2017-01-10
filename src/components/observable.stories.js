import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ObservableView from './observable'

storiesOf('<ObservableView/>', module)
  .add('default', () => (
    <ObservableView width={600} height={300}/>
  ))
