import React, { PureComponent } from 'react'
import TransitionView from '../transition/transitionView'
import { empty } from 'rxjs/observable/fromEvent'
import { fromEvent } from 'rxjs/observable/fromEvent'
import { share } from 'rxjs/operator/share'
import { takeUntil } from 'rxjs/operator/takeUntil'
import { map } from 'rxjs/operator/map'
import { merge } from 'rxjs/operator/merge'
import { throttleTime } from 'rxjs/operator/throttleTime'
import { _finally } from 'rxjs/operator/finally'

const mousemove$ = (
  typeof window === 'undefined' ?
    empty() :
    fromEvent(window, 'mousemove')
      ::merge(
        fromEvent(window, 'touchmove')
          ::map(({ touches }) => touches[0])
      )
      ::share()
)

const mouseup$ = (
  typeof window === 'undefined' ?
    empty() :
    fromEvent(window, 'mouseup')
      ::merge(fromEvent(window, 'touchend'))
      ::merge(fromEvent(window, 'touchcancel'))
      ::share()
)

const transformEmissions = emissions => (
  emissions
    .map((data, i) => ({
      ...data,
      index: i
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

  updateX = (index, x) => {
    const { emissions } = this.state
    const { onChangeEmissions } = this.props

    const newEmissions = emissions.map(emission => (
      emission.index === index ?
        { ...emission, x } :
        emission
    ))

    this.setState({
      emissions: newEmissions
    })

    if (onChangeEmissions) {
      onChangeEmissions(newEmissions)
    }
  }

  transformMove = (isCompletion, leftX, rightX, { clientX }) => {
    const { svg } = this
    const { completion } = this.props
    const { left, width } = svg.getBoundingClientRect()

    const scale = this.props.width / width
    const max = this.getMax()
    const range = rightX - leftX

    const relativeX = Math.max(0, scale * (clientX - left) - leftX)
    const newX = relativeX / range * max

    return Math.min(
      Math.max(isCompletion ? 0.0001 : 0, newX),
      isCompletion ? max : completion
    )
  }

  onMouseDownEmission = ({ index, leftX, rightX }) => {
    const { emissions } = this.state

    this.setState({ isDragging: index })

    mousemove$
      ::takeUntil(mouseup$)
      ::_finally(() => {
        this.setState({ isDragging: -1 })
      })
      ::throttleTime(1000 / 60) // NOTE: Throttle to 60 FPS
      ::map(this.transformMove.bind(this, false, leftX, rightX))
      .subscribe(x => this.updateX(index, x))
  }

  onMouseDownCompletion = ({ leftX, rightX }) => {
    const { svg } = this

    mousemove$
      ::takeUntil(mouseup$)
      ::throttleTime(1000 / 60) // NOTE: Throttle to 60 FPS
      ::map(this.transformMove.bind(this, true, leftX, rightX))
      .subscribe(x => {
        const { onChangeCompletion } = this.props

        this.setState({ completion: x })

        if (onChangeCompletion) {
          onChangeCompletion(x)
        }
      })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.emissions !== nextProps.emissions) {
      this.setState({
        emissions: transformEmissions(nextProps.emissions)
      })
    }

    if (this.props.completion !== nextProps.completion) {
      this.setState({
        completion: nextProps.completion
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
