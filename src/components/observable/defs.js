import React from 'react'

import {
  leftGradientColor,
  rightGradientColor
} from './constants'

const Defs = ({ x }) => (
  <defs>
    <linearGradient id="bg">
      <stop offset="0%" stopColor={leftGradientColor}/>
      <stop offset={`${x * 100}%`} stopColor={rightGradientColor}/>
      <stop offset={`${x * 100 + 0.01}%`} stopColor={rightGradientColor.grayscale()}/>
      <stop offset="100%" stopColor={rightGradientColor.grayscale()}/>
    </linearGradient>

    <linearGradient id="stroke">
      <stop offset="0%" stopColor={leftGradientColor}/>
      <stop offset="100%" stopColor={rightGradientColor}/>
    </linearGradient>
  </defs>
)

export default Defs
