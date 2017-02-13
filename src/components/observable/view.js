import React, { PropTypes } from 'react'

import { white, blue, black, gray } from '../../constants/colors'

import {
  EMISSION_RADIUS,
  ARROW_WIDTH_FACTOR
} from './constants'

import Defs from './defs'
import Arrow from './arrow'
import Separators from './separators'
import Emission from './emission'
import Completion from './completion'
import makeTransformFactor from './makeTransformFactor'

let RUNNING_ID = 0
const SEPARATORS = 20

const ObservableView = ({
  width = 500,
  height = 50,
  id = '',
  x,
  y,
  completion = 1,
  emissions = [],
  onMouseDownEmission,
  onMouseDownCompletion,
  getRef,
  isDragging, // NOTE: id of the emission that is being dragged
  onChange, // NOTE: Just for isDraggable
  style,
  className
}) => {
  const transformFactor = makeTransformFactor({ width, height })

  const last = emissions[emissions.length - 1]
  const lastCoincidesCompletion = last && last.x === completion

  const leftX = transformFactor(0) * width
  const rightX = transformFactor(1) * width

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      x={x}
      y={y}
      ref={ref => getRef && getRef(ref)}
      style={style}
      className={className}
    >
      <Defs x={completion ? transformFactor(completion) : 1} id={id}/>
      <Arrow height={height} width={width} id={id}/>
      <Separators height={height} width={width} transformFactor={transformFactor}/>

      { completion && (
        <Completion
          isDraggable={typeof onMouseDownCompletion === 'function'}
          bold={lastCoincidesCompletion}
          x={transformFactor(completion)}
          height={height}
          width={width}
          onMouseDown={data => {
            onMouseDownCompletion && onMouseDownCompletion({
              ...data,
              leftX,
              rightX
            })
          }}
        />
      )}

      {
        emissions.map(({ x, ...props }, i) => (
          <Emission
            {...props}
            key={i}
            id={id}
            isDraggable={typeof onMouseDownEmission === 'function'}
            isDragging={props.id !== undefined && isDragging === props.id}
            width={width}
            height={height}
            x={transformFactor(x)}
            onMouseDown={data => {
              onMouseDownEmission && onMouseDownEmission({
                ...data,
                leftX,
                rightX
              })
            }}
          />
        ))
      }
    </svg>
  )
}

ObservableView.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  completion: PropTypes.number,
  emissions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMouseDownEmission: PropTypes.func,
  onMouseDownCompletion: PropTypes.func,
  getRef: PropTypes.func,
  isDragging: PropTypes.number,
  onChange: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string
}

export default ObservableView
