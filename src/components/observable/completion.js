import React from 'react'

import {
  rightGradientColor,
  EMISSION_RADIUS
} from './constants'

const COMPLETION_HEIGHT = 2.4 * EMISSION_RADIUS
const BOLD_FACTOR = 1.2

const rectStyle = isDraggable => ({
  cursor: isDraggable ? 'ew-resize' : 'default'
})

const Completion = ({
  isDraggable,
  x,
  height,
  width,
  bold,
  onMouseDown
}) => (
  <rect
    fill={rightGradientColor}
    width={3}
    height={(bold ? BOLD_FACTOR : 1) * COMPLETION_HEIGHT * height}
    x={x * width - 1}
    y={(0.5 - (bold ? BOLD_FACTOR : 1) * COMPLETION_HEIGHT / 2) * height}
    onMouseDown={evt => {
      evt.preventDefault()
      onMouseDown && onMouseDown({ x })
    }}
    onTouchStart={evt => {
      onMouseDown && onMouseDown({ x })
    }}
    style={rectStyle(isDraggable)}
  />
)

export default Completion

