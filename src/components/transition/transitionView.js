import React, { Component, PropTypes } from 'react'
import { EmissionsView } from '../observable'
import { Motion, spring, presets } from 'react-motion'

const parameters = {
  stiffness: 30,
  damping: 10
}

class TransitionObservableView extends Component {
  static propTypes = {
    noTransition: PropTypes.bool
  }

  render() {
    const { noTransition, end } = this.props

    return (
      <Motion
        defaultStyle={{
          end: noTransition ? end : 1
        }}
        style={{
          end: spring(end, parameters)
        }}
      >
        {
          ({ end }) => (
            <EmissionsView
              {...this.props}
              end={end}
            />
          )
        }
      </Motion>
    )
  }
}

export default TransitionObservableView
