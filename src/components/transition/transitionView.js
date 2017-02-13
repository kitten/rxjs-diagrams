import React from 'react'
import { EmissionsView } from '../observable'
import { Motion, spring, presets } from 'react-motion'

const parameters = {
  stiffness: 30,
  damping: 10
}

const TransitionObservableView = props => typeof window === 'undefined' ? (
  <EmissionsView {...props} />
) : (
  <Motion
    defaultStyle={{
      end: 1
    }}
    style={{
      end: spring(props.end, parameters)
    }}
  >
    {
      ({ end }) => (
        <EmissionsView
          {...props}
          end={end}
        />
      )
    }
  </Motion>
)

export default TransitionObservableView
