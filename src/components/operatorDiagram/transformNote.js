import React from 'react'
import { white, black } from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/font'

const textStyle = height => ({
  fontFamily,
  fontSize: `${height * 0.24}px`,
  lineHeight: `${height * 0.24}px`
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
      width={width}
      height={height}
      fill={white}
    />

    <text
      x={x + width / 2}
      y={y + height / 2}
      textAnchor="middle"
      alignmentBaseline="central"
      stroke={black}
      style={textStyle(height)}
    >
      {children}
    </text>
  </g>
)

export default TransformNote
