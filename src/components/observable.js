import React, { PureComponent } from 'react'
import Color from 'goethe'
import styled from 'styled-components'

import { white, blue, black, gray } from '../constants/colors'
import { fontFamily, fontSize } from '../constants/font'
import scaleVector from '../utils/scaleVector'
import points from '../utils/points'
import repeat from '../utils/repeat'

const leftGradientColor = Color([ 227, 89, 18 ]).lighten(.13)
const rightGradientColor = Color([ 197, 5, 59 ]).lighten(.13)

const PADDING_FACTOR = 0.03
const ARROW_FACTOR = 0.06
const EMISSION_RADIUS = 0.028
const SEPARATORS = 20
const COMPLETION_HEIGHT = 8 * EMISSION_RADIUS
const UPPER_BOUND = 1 - PADDING_FACTOR - ARROW_FACTOR

const transformFactor = x => (
  (UPPER_BOUND - PADDING_FACTOR) * x + PADDING_FACTOR
)

const Text = styled.text`
  font-family: ${fontFamily};
  font-size: ${fontSize};
  line-height: ${fontSize};
  user-select: none;
`

const Emission = ({
  x,
  d,
  width,
  height
}) => (
  <g>
    <circle
      cx={x * width}
      cy={height / 2}
      r={14}
      fill={white.opacity(.95)}
      stroke="url(#bg)"
      strokeWidth={2}
    />

    <Text
      x={x * width}
      y={height / 2}
      dy={5}
      textAnchor="middle"
      stroke={black}
    >
      {d}
    </Text>
  </g>
)

const ObservableView = ({
  width = 500,
  height = 200,
  completion = 1,
  emissions = []
}) => (
  <svg
    viewBox={`0 0 ${width} ${height}`}
    width={width}
    height={height}
  >
    <defs>
      <linearGradient id="bg">
        <stop offset="0%" stopColor={leftGradientColor}/>
        <stop offset="100%" stopColor={rightGradientColor}/>
      </linearGradient>

      <linearGradient id="completion">
        <stop offset="0%" stopColor={gray.opacity(0.8)}/>
        <stop offset="100%" stopColor={gray.opacity(0.001)}/>
      </linearGradient>
    </defs>

    <polygon
      points={points([
        [ 0, `${height / 2 - 5}` ],
        [ 1 - ARROW_FACTOR, `${height / 2 - 5}` ],
        [ 1 - ARROW_FACTOR, `${height / 2 - 12}` ],
        [ 1, 0.5 ],
        [ 1 - ARROW_FACTOR, `${height / 2 + 12}` ],
        [ 1 - ARROW_FACTOR, `${height / 2 + 5}` ],
        [ 0, `${height / 2 + 5}` ]
      ].map(scaleVector(width, height)))}
      fill="url(#bg)"
    />

    {
      repeat(PADDING_FACTOR, UPPER_BOUND, SEPARATORS).map(x => (
        <rect
          fill={white.opacity(.75)}
          width={1}
          height={height}
          x={Math.round(x * width)}
          y={0}
        />
      ))
    }

    <rect
      fill={gray}
      width={3}
      height={COMPLETION_HEIGHT * height}
      x={transformFactor(completion) * width - 1}
      y={(0.5 - COMPLETION_HEIGHT / 2) * height}
    />

    {
      emissions.map(({ x, d }, i) => (
        <Emission
          key={i}
          width={width}
          height={height}
          x={transformFactor(x)}
          d={d}
        />
      ))
    }
  </svg>
)

export default ObservableView
