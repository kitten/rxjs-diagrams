import React from 'react'

import {
  leftGradientColor,
  rightGradientColor
} from './constants'

const Defs = ({ x = 1 }) => (
  <defs>
    <linearGradient id="bg">
      <stop offset="0%" stopColor={leftGradientColor}/>
      <stop offset={`${x * 100}%`} stopColor={rightGradientColor}/>

      {(x && x < 1) && (
        <stop offset={`${x * 100 + 0.01}%`} stopColor={rightGradientColor.grayscale()}/>
      )}

      {(x && x < 1) && (
        <stop offset="100%" stopColor={rightGradientColor.grayscale()}/>
      )}
    </linearGradient>

    <linearGradient id="stroke">
      <stop offset="0%" stopColor={leftGradientColor}/>
      <stop offset="100%" stopColor={rightGradientColor}/>
    </linearGradient>
  </defs>
)

export default Defs
