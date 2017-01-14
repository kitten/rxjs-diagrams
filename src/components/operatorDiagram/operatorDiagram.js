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

const getInput = emissions => {
  const hasMultipleInputs = emissions.some(Array.isArray)

  return hasMultipleInputs ?
      emissions :
      [ emissions ]
}

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

  state = {
    completion: this.props.completion
  }

  processInput = (input, completion) => {
    const { transform } = this.props

    const output$ = transformEmissions(transform, completion, ...input)

    this.input = input // Store input for next use

    output$.subscribe(output => {
      this.setState({ output, completion })
    })
  }

  updateEmissions = (i, emissions) => {
    const input = this.input.slice()
    input[i] = emissions

    this.processInput(input, this.state.completion)
  }

  updateCompletion = completion => {
    this.processInput(this.input, completion)
  }

  componentWillMount() {
    this.processInput(getInput(this.props.emissions), this.props.completion)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.emissions !== nextProps.emissions ||
      this.props.completion !== nextProps.completion
    ) {
      this.processInput(getInput(nextProps.emissions), nextProps.completion)
    }
  }

  render() {
    const {
      end,
      width,
      height,
      transform,
      label,
      emissions
    } = this.props

    const {
      output,
      completion
    } = this.state

    if (!output) {
      return null
    }

    const input = getInput(emissions)
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
          input.map((e, i) => (
            <DraggableView
              {...this.props}
              key={i}
              id={`input-${i}`}
              emissions={e}
              completion={completion}
              onChangeEmissions={input => this.updateEmissions(i, input)}
              onChangeCompletion={this.updateCompletion}
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
          id='result'
          y={height * (input.length + 1) + 2 * PADDING_FACTOR * height}
          emissions={output.emissions}
          completion={output.completion}
        />
      </svg>
    )
  }
}

export default OperatorDiagram
