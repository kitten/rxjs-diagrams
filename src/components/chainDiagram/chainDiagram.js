import React, { PureComponent, PropTypes, cloneElement, Children } from 'react'
import OperatorDiagram from '../operatorDiagram/index'

class ChainDiagram extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    completion: PropTypes.number,
    end: PropTypes.number.isRequired
  }

  static defaultProps = {
    width: 500,
    height: 50
  }

  state = {
    inputs: []
  }

  onChange = (i, completion, emissions) => {
    const inputs = this.state.inputs.slice()
    inputs[i] = { completion, emissions }

    this.setState({ inputs })
  }

  calcHeight = (i, { emissions }) => {
    const { height } = this.props
    const length = (
      emissions ?
        (emissions.every(Array.isArray) ? emissions.length : 1) :
        0
    )

    const totalHeight = height * (2 + length) + 2 * (0.2 * height)

    return totalHeight
  }

  render() {
    const {
      height,
      width,
      children,
      completion,
      end
    } = this.props

    const { inputs } = this.state

    let y = 0
    const newChildren = Children.map(children, (child, i) => {
      const lastY = y
      y += this.calcHeight(i, child.props)

      if (i === 0) {
        return cloneElement(child, {
          key: i,
          onChange: result => this.onChange(0, result.completion, result.emissions),
          end,
          completion,
          width,
          height,
          y: lastY
        })
      }

      const input = inputs[i - 1]
      if (!input) {
        return null
      }

      const onChange = ({ completion, emissions }) => {
        const childEmissions = child.props.emissions || []

        let inputEmissions = childEmissions.every(Array.isArray) ?
          childEmissions : [ childEmissions ]

        inputEmissions = emissions.concat(childEmissions)

        this.onChange(
          i,
          completion,
          inputEmissions
        )
      }

      return cloneElement(child, {
        key: i,
        onChange,
        emissions: input.emissions,
        completion: input.completion,
        skip: 1,
        end,
        width,
        height,
        y: lastY
      })
    })

    return (
      <svg
        viewBox={`0 0 ${width} ${y}`}
        width={width}
        height={y}
      >
        {newChildren}
      </svg>
    )
  }
}

export default ChainDiagram
