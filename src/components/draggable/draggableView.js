import React, { PureComponent } from 'react'
import TransitionView from '../transition/transitionView'
import { fromEvent } from 'rxjs/observable/fromEvent'
import { share } from 'rxjs/operator/share'
import { takeUntil } from 'rxjs/operator/takeUntil'
import { map } from 'rxjs/operator/map'
import { throttleTime } from 'rxjs/operator/throttleTime'
import { _finally } from 'rxjs/operator/finally'

const mousemove$ = fromEvent(window, 'mousemove')::share()
const mouseup$ = fromEvent(window, 'mouseup')::share()

const transformEmissions = emissions => (
  emissions
    .map((data, i) => ({
      ...data,
      id: i
    }))
)

class DraggableView extends PureComponent {
  state = {
    isDragging: -1,
    emissions: transformEmissions(this.props.emissions),
    completion: this.props.completion
  }

  storeRef = ref => {
    this.svg = ref
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

  onMouseDownEmission = ({ id, leftX, rightX }) => {
    const { svg } = this
    const { emissions } = this.state

    this.setState({ isDragging: id })

    mousemove$
      ::takeUntil(mouseup$)
      ::_finally(() => {
        this.setState({ isDragging: -1 })
      })
      ::throttleTime(1000 / 60) // NOTE: Throttle to 60 FPS
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
      .subscribe(x => this.updateX(id, x))
  }

  onMouseDownCompletion = ({ leftX, rightX }) => {
    const { svg } = this

    mousemove$
      ::takeUntil(mouseup$)
      ::throttleTime(1000 / 60) // NOTE: Throttle to 60 FPS
      ::map(({ clientX }) => {
        const { left } = svg.getBoundingClientRect()

        const max = this.getMax()
        const width = rightX - leftX

        const relativeX = Math.max(0, clientX - left - leftX)
        const newX = relativeX / width * max

        return Math.min(
          Math.max(0, newX),
          max
        )
      })
      .subscribe(x => {
        this.setState({ completion: x })
      })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.emissions !== nextProps.emissions) {
      this.setState({
        emissions: transformEmissions(nextProps.emissions)
      })
    }
  }

  render() {
    const { completion, emissions, isDragging } = this.state

    return (
      <TransitionView
        {...this.props}
        getRef={this.storeRef}
        onMouseDownEmission={this.onMouseDownEmission}
        onMouseDownCompletion={this.onMouseDownCompletion}
        emissions={emissions}
        completion={completion}
        isDragging={isDragging}
      />
    )
  }
}

export default DraggableView
