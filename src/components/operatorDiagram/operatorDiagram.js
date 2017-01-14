import React, { PureComponent, PropTypes } from 'react'
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
  static propTypes = {
    label: PropTypes.string,
    transform: PropTypes.func.isRequired,
    emissions: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
      PropTypes.arrayOf(PropTypes.object)
    ]).isRequired
  }

  static defaultProps = {
    width: 500,
    height: 50
  }

  state = {}

  processInput = input => {
    const { transform, completion } = this.props

    const output$ = transformEmissions(transform, completion, ...input)

    output$.subscribe(output => {
      this.setState({ output })
    })
  }

  initInput = emissions => {
    const hasMultipleInputs = emissions.some(Array.isArray)

    const input = hasMultipleInputs ?
        emissions :
        [ emissions ]

    this.setState({ input })
    this.processInput(input)
  }

  updateEmissions = (i, emissions) => {
    const input = this.state.input.slice()
    input[i] = emissions

    this.setState({ input })
    this.processInput(input)
  }

  componentWillMount() {
    this.initInput(this.props.emissions)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.emissions !== nextProps.emissions) {
      this.initInput(nextProps.emissions)
    }
  }

  render() {
    const {
      end,
      width,
      height,
      transform,
      label
    } = this.props

    const {
      output,
      input
    } = this.state

    if (!output) {
      return null
    }

    const totalHeight = height * (2 + input.length) + 2 * (PADDING_FACTOR * height)

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

        {
          input.map((emissions, i) => (
            <DraggableView
              {...this.props}
              key={i}
              emissions={emissions}
              onChange={input => this.updateEmissions(i, input)}
              y={i * height}
            />
          ))
        }

        <TransformNote
          width={width - 2 * PADDING_FACTOR * width}
          height={height}
          x={PADDING_FACTOR * width}
          y={height * input.length + PADDING_FACTOR * height}
        >
          {label || transfom.toString()}
        </TransformNote>

        <TransitionView
          {...this.props}
          y={height * (input.length + 1) + 2 * PADDING_FACTOR * height}
          emissions={output.emissions}
          completion={output.completion}
        />
      </svg>
    )
  }
}

export default OperatorDiagram
