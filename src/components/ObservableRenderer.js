import React, { PureComponent } from 'react'

class ObservableRenderer extends PureComponent {
  state = {
    value: undefined
  }

  componentWillMount() {
    const { source } = this.props

    this.sub = source.subscribe(value => {
      this.setState({ value })
    })
  }

  componentWillUnmount() {
    this.sub.unsubscribe()
  }

  render() {
    const { transform } = this.props
    const { value } = this.state

    return value ? transform(value) : null
  }
}

export default ObservableRenderer
