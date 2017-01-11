import React from 'react'

import {
  leftGradientColor,
  rightGradientColor,
  EMISSION_RADIUS
} from './constants'

const COMPLETION_HEIGHT = 2.4 * EMISSION_RADIUS
const BOLD_FACTOR = 1.2

const generateColor = x => leftGradientColor
  .mix(rightGradientColor, x)

const Completion = ({
  x,
  height,
  width,
  bold
}) => (
  <rect
    fill={generateColor(x)}
    width={3}
    height={(bold ? BOLD_FACTOR : 1) * COMPLETION_HEIGHT * height}
    x={x * width - 1}
    y={(0.5 - (bold ? BOLD_FACTOR : 1) * COMPLETION_HEIGHT / 2) * height}
  />
)

export default Completion

