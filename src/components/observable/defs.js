import React from 'react'

import {
  leftGradientColor,
  rightGradientColor
} from './constants'

const Defs = ({ id, x = 1 }) => (
  <defs>
    <linearGradient id={`bg-${id}`}>
      <stop offset="0%" stopColor={leftGradientColor}/>
      <stop offset={`${x * 100}%`} stopColor={rightGradientColor}/>

      {(x && x < 1) && (
        <stop offset={`${x * 100}%`} stopColor={rightGradientColor.grayscale()}/>
      )}

      {(x && x < 1) && (
        <stop offset="100%" stopColor={rightGradientColor.grayscale()}/>
      )}
    </linearGradient>

    <linearGradient id="stroke">
      <stop offset="0%" stopColor={leftGradientColor}/>
      <stop offset="100%" stopColor={rightGradientColor}/>
    </linearGradient>

    <filter
      id="shadow"
      x="-50%"
      y="-50%"
      width="200%"
      height="200%"
    >
      <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>
)

export default Defs
