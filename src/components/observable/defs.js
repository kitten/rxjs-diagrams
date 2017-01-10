import React from 'react'
import Color from 'goethe'

const leftGradientColor = Color([ 227, 89, 18 ]).lighten(.13)
const rightGradientColor = Color([ 197, 5, 59 ]).lighten(.13)

const Defs = () => (
  <defs>
    <linearGradient id="bg">
      <stop offset="0%" stopColor={leftGradientColor}/>
      <stop offset="100%" stopColor={rightGradientColor}/>
    </linearGradient>
  </defs>
)

export default Defs
