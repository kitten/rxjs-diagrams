import React from 'react'

import {
  rightGradientColor,
  EMISSION_RADIUS
} from './constants'

const COMPLETION_HEIGHT = 2.4 * EMISSION_RADIUS
const BOLD_FACTOR = 1.2

const Completion = ({
  x,
  height,
  width,
  bold,
  onMouseUp,
  onMouseDown
}) => (
  <rect
    fill={rightGradientColor}
    width={3}
    height={(bold ? BOLD_FACTOR : 1) * COMPLETION_HEIGHT * height}
    x={x * width - 1}
    y={(0.5 - (bold ? BOLD_FACTOR : 1) * COMPLETION_HEIGHT / 2) * height}
    onMouseDown={evt => {
      onMouseDown && onMouseDown({ x }, evt)
    }}
    onMouseUp={evt => {
      onMouseUp && onMouseUp({ x }, evt)
    }}
  />
)

export default Completion

