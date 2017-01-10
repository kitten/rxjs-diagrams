import React from 'react'

import {
  leftGradientColor,
  rightGradientColor,
  EMISSION_RADIUS
} from './constants'

const COMPLETION_HEIGHT = 2.4 * EMISSION_RADIUS

const generateColor = x => leftGradientColor
  .mix(rightGradientColor, x)

const Completion = ({
  x,
  height,
  width
}) => (
  <rect
    fill={generateColor(x)}
    width={3}
    height={COMPLETION_HEIGHT * height}
    x={x * width - 1}
    y={(0.5 - COMPLETION_HEIGHT / 2) * height}
  />
)

export default Completion

