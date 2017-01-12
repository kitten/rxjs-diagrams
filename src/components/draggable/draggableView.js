import React, { PureComponent } from 'react'
import TransitionView from '../transition/transitionView'

class DraggableView extends PureComponent {
  state = {}

  transformEmissions = emissions => {
    this.setState({
      emissions: emissions.map((data, i) => ({
        ...data,
        id: i
      }))
    })
  }

  componentWillMount() {
    const { emissions } = this.props

    this.transformEmissions(emissions)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.emissions !== nextProps.emissions) {
      this.transformEmissions(nextProps.emissions)
    }
  }

  render() {
    const { emissions } = this.state

    return (
      <TransitionView
        {...this.props}
        emissions={emissions}
      />
    )
  }
}
