import React, { PureComponent } from 'react'
import TransitionView from '../transition/transitionView'
import { fromEvent } from 'rxjs/observable/fromEvent'
import { share } from 'rxjs/operator/share'
import { takeUntil } from 'rxjs/operator/takeUntil'
import { map } from 'rxjs/operator/map'
import { _finally } from 'rxjs/operator/finally'

const mousemove$ = fromEvent(window, 'mousemove')::share()
const mouseup$ = fromEvent(window, 'mouseup')::share()

class DraggableView extends PureComponent {
  state = {
    isDragging: -1
  }

  storeRef = ref => {
    this.svg = ref
  }

  transformEmissions = emissions => {
    this.setState({
      emissions: emissions.map((data, i) => ({
        ...data,
        id: i
      }))
    })
  }

  getMax = () => {
    const { end, completion } = this.props
    return typeof end === 'number' ? end : completion
  }

  updateX = (id, x) => {
    const { emissions } = this.state
    const { onChange } = this.props

    const newEmissions = emissions.map(emission => (
      emission.id === id ?
        { ...emission, x } :
        emission
    ))

    this.setState({
      emissions: newEmissions
    })

    if (onChange) {
      onChange(newEmissions)
    }
  }

  onMouseDown = ({ id, leftX, rightX }) => {
    const { svg } = this
    const { emissions } = this.state

    this.setState({ isDragging: id })

    mousemove$
      ::takeUntil(mouseup$)
      ::_finally(() => {
        this.setState({ isDragging: -1 })
      })
      ::map(({ clientX }) => {
        const { completion } = this.props
        const { left } = svg.getBoundingClientRect()

        const max = this.getMax()
        const width = rightX - leftX

        const relativeX = Math.max(0, clientX - left - leftX)
        const newX = relativeX / width * max

        return Math.min(
          Math.max(0, newX),
          completion
        )
      })
      .subscribe(newX => this.updateX(id, newX))
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
    const { emissions, isDragging } = this.state

    return (
      <TransitionView
        {...this.props}
        getRef={this.storeRef}
        onMouseDown={this.onMouseDown}
        emissions={emissions}
        isDragging={isDragging}
      />
    )
  }
}

export default DraggableView
