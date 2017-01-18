import React from 'react'
import { white, black, gray } from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/font'

const textStyle = height => ({
  fontFamily,
  fontSize: `${height * 0.24}px`,
  lineHeight: `${height * 0.24}px`,
  textShadow: 'none'
})

const TransformNote = ({
  children,
  width = 500,
  height = 50,
  x = 0,
  y = 0
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={width - 2}
      height={height}
      fill={white.opacity(.95)}
      stroke="url(#stroke)"
      strokeWidth={2}
    />

    <text
      x={x + width / 2}
      y={y + height / 2}
      textAnchor="middle"
      alignmentBaseline="central"
      stroke={black}
      fill={black}
      style={textStyle(height)}
    >
      {children}
    </text>
  </g>
)

export default TransformNote
