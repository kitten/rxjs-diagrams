import React from 'react'

import {
  leftGradientColor,
  rightGradientColor
} from './constants'

const Defs = () => (
  <defs>
    <linearGradient id="bg">
      <stop offset="0%" stopColor={leftGradientColor}/>
      <stop offset="100%" stopColor={rightGradientColor}/>
    </linearGradient>
  </defs>
)

export default Defs
