import React from 'react'

import { EMISSION_RADIUS } from './constants'
import { white, black } from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/font'

const circleStyle = isDraggable => ({
  cursor: isDraggable ? 'ew-resize' : 'default'
})

const textStyle = height => ({
  fontFamily,
  fontSize: `${height * 0.24}px`,
  lineHeight: `${height * 0.24}px`,
  userSelect: 'none',
  pointerEvents: 'none'
})

const Emission = ({
  x,
  d,
  width,
  height,
  stroke = "url(#bg)",
  onMouseUp,
  onMouseDown,
  isDraggable,
  ...rest
}) => (
  <g>
    <circle
      style={circleStyle(isDraggable)}
      cx={x * width}
      cy={height / 2}
      r={EMISSION_RADIUS * height}
      fill={white.opacity(.95)}
      stroke={stroke}
      strokeWidth={2}
      onMouseDown={() => {
        onMouseDown && onMouseDown({ ...rest, x, d })
      }}
      onMouseUp={() => {
        onMouseUp && onMouseUp({ ...rest, x, d })
      }}
    />

    <text
      x={x * width}
      y={height / 2}
      dy={0.08 * height}
      textAnchor="middle"
      stroke={black}
      style={textStyle(height)}
    >
      {d}
    </text>
  </g>
)

export default Emission
