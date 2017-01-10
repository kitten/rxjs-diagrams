import React, { PureComponent } from 'react'
import Color from 'goethe'
import { styled } from 'styled-components'

import { white, blue } from '../constants/colors'
import scaleVector from '../utils/scaleVector'
import points from '../utils/points'
import repeat from '../utils/repeat'

const leftGradientColor = Color([ 227, 89, 18 ])
const rightGradientColor = Color([ 197, 5, 59 ])
const scale = scaleVector(500, 200)

const ObservableView = props => (
  <svg viewBox="0 0 500 200" {...props}>
    <defs>
      <linearGradient id="bg">
        <stop offset="0%" stopColor={leftGradientColor.toString()}/>
        <stop offset="100%" stopColor={rightGradientColor.toString()}/>
      </linearGradient>
    </defs>

    <polygon
      points={points([
        [ 0, 0.475 ],
        [ 0.94, 0.475 ],
        [ 0.94, 0.435 ],
        [ 1, 0.5 ],
        [ 0.94, 0.565 ],
        [ 0.94, 0.525 ],
        [ 0, 0.525 ]
      ].map(scale))}
      fill="url(#bg)"
    />

    {
      repeat(20, 500, 40).map(x => (
        <rect
          fill={white.opacity(.75)}
          width={1}
          height={200}
          x={x}
          y={0}
        />
      ))
    }

    <circle
      cx={200}
      cy={100}
      r={14}
      fill={white.opacity(.95)}
      stroke="url(#bg)"
      strokeWidth={2}
    />

    <circle
      cx={250}
      cy={100}
      r={14}
      fill={white.opacity(.95)}
      stroke="url(#bg)"
      strokeWidth={2}
    />

  </svg>
)

export default ObservableView
