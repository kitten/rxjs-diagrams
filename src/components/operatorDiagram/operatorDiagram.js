import React, { PureComponent } from 'react'
import { transformEmissions } from '../../models/emissions/index'
import DraggableView from '../draggable/index'
import TransitionView from '../transition/index'

class OperatorDiagram extends PureComponent {
  state = {}

  processInput = input => {
    const { transform, end } = this.props

    const output$ = transformEmissions(transform, end, input)

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
    const { end } = this.props
    const { output } = this.state

    if (!output) {
      return null
    }

    const { emissions, completion } = output

    return (
      <div>
        <DraggableView
          {...this.props}
          onChange={this.processInput}
        />
        <br />
        <TransitionView
          {...this.props}
          emissions={emissions}
          end={end}
          completion={completion}
        />
      </div>
    )
  }
}

export default OperatorDiagram
