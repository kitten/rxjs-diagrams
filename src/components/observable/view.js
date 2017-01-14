import React from 'react'

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

const SEPARATORS = 20

const ObservableView = ({
  width = 500,
  height = 50,
  x,
  y,
  scale = 1,
  completion = 1,
  emissions = [],
  onMouseDown,
  onMouseUp,
  getRef,
  onChange // NOTE: Just for isDraggable
}) => {
  const transformFactor = makeTransformFactor({ width, height, scale })

  const last = emissions[emissions.length - 1]
  const lastCoincidesCompletion = last.x === completion

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
    >
      <Defs x={completion ? transformFactor(completion) : 1}/>
      <Arrow height={height} width={width}/>
      <Separators height={height} width={width} transformFactor={transformFactor}/>

      { completion && (
        <Completion
          bold={lastCoincidesCompletion}
          x={transformFactor(completion)}
          height={height}
          width={width}
        />
      )}

      {
        emissions.map(({ x, d, ...rest }, i) => (
          <Emission
            {...rest}
            isDraggable={typeof onChange === 'function'}
            key={i}
            width={width}
            height={height}
            stroke="url(#stroke)"
            x={transformFactor(x)}
            d={d}
            onMouseDown={(data) => {
              onMouseDown && onMouseDown({
                ...data,
                leftX,
                rightX
              })
            }}
            onMouseUp={(data) => {
              onMouseUp && onMouseUp({
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

export default ObservableView
