import React, { PureComponent, PropTypes } from 'react'
import { transformEmissions, makeDiagramModel } from '../../models/emissions/index'
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
    skip: PropTypes.number,
    emissions: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
      PropTypes.arrayOf(PropTypes.object)
    ]).isRequired,
    onChange: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number,
    fit: PropTypes.bool,
    style: PropTypes.style
  }

  static defaultProps = {
    skip: 0,
    width: 500,
    height: 50,
    fit: false
  }

  state = {
    completion: this.props.completion
  }

  processInput = (input, completion) => {
    const { transform, onChange } = this.props

    const output$ = transformEmissions(transform, completion, ...input)

    this.input = input // Store input for next use

    output$.subscribe(output => {
      this.setState({ output, completion })

      if (onChange) {
        onChange(output)
      }
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
      emissions,
      skip,
      x,
      y,
      fit,
      style
    } = this.props

    const {
      output,
      completion
    } = this.state

    if (!output) {
      return null
    }

    const input = getInput(emissions)
    const totalHeight = height * (2 + input.length - skip) + 2 * (PADDING_FACTOR * height)

    return (
      <svg
        viewBox={`0 0 ${width} ${totalHeight}`}
        width={fit ? undefined : width}
        height={fit ? undefined : totalHeight}
        x={x}
        y={y}
        style={style}
      >
        <defs>
          <linearGradient id="diagram-stroke">
            <stop offset="0%" stopColor={leftGradientColor}/>
            <stop offset="100%" stopColor={rightGradientColor}/>
          </linearGradient>
        </defs>

        {
          input.slice(skip).map((e, i) => (
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
          y={height * (input.length - skip) + PADDING_FACTOR * height}
        >
          {label || transfom.toString()}
        </TransformNote>

        <TransitionView
          {...this.props}
          id='result'
          y={height * (input.length + 1 - skip) + 2 * PADDING_FACTOR * height}
          emissions={output.emissions}
          completion={output.completion}
        />
      </svg>
    )
  }
}

export default OperatorDiagram
