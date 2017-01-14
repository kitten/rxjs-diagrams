import React, { PureComponent } from 'react'
import { transformEmissions } from '../../models/emissions/index'
import DraggableView from '../draggable/index'
import TransitionView from '../transition/index'
import TransformNote from './transformNote'

import {
  leftGradientColor,
  rightGradientColor
} from '../observable/constants'

const PADDING_FACTOR = 0.2

class OperatorDiagram extends PureComponent {
  static defaultProps = {
    width: 500,
    height: 50
  }

  state = {}

  processInput = input => {
    const { transform, completion } = this.props

    const output$ = transformEmissions(transform, completion, input)

    output$.subscribe(output => {
      this.setState({ output })
    })
  }

  componentDidMount() {
    this.processInput(this.props.emissions)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.emissions !== nextProps.emissions) {
      this.processInput(nextProps.emissions)
    }
  }

  render() {
    const { end, width, height, transform, label } = this.props
    const { output } = this.state

    if (!output) {
      return null
    }

    const { emissions, completion } = output
    const totalHeight = height * 3 + 2 * (PADDING_FACTOR * height)

    return (
      <svg
        viewBox={`0 0 ${width} ${totalHeight}`}
        width={width}
        height={totalHeight}
      >
        <defs>
          <linearGradient id="stroke">
            <stop offset="0%" stopColor={leftGradientColor}/>
            <stop offset="100%" stopColor={rightGradientColor}/>
          </linearGradient>
        </defs>

        <DraggableView
          {...this.props}
          onChange={this.processInput}
        />

        <TransformNote
          width={width - 2 * PADDING_FACTOR * width}
          height={height}
          x={PADDING_FACTOR * width}
          y={height + PADDING_FACTOR * height}
        >
          {label || transfom.toString()}
        </TransformNote>

        <TransitionView
          {...this.props}
          y={2 * (height + PADDING_FACTOR * height)}
          emissions={emissions}
          completion={completion}
        />
      </svg>
    )
  }
}

export default OperatorDiagram
