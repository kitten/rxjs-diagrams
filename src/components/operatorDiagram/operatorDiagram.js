import React, { PureComponent } from 'react'
import { transformEmissions } from '../../models/emissions/index'
import DraggableView from '../draggable/index'
import TransitionView from '../transition/index'
import TransformNote from './transformNote'

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

    return (
      <svg
        viewBox={`0 0 ${width} ${height * 3}`}
        width={width}
        height={height * 3}
      >
        <DraggableView
          {...this.props}
          onChange={this.processInput}
        />

        <TransformNote
          width={width}
          height={height}
          y={height}
        >
          {label || transfom.toString()}
        </TransformNote>

        <TransitionView
          {...this.props}
          y={2 * height}
          emissions={emissions}
          completion={completion}
        />
      </svg>
    )
  }
}

export default OperatorDiagram
