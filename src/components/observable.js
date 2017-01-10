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
const EMISSION_RADIUS = 0.28
const SEPARATORS = 20
const COMPLETION_HEIGHT = 8 * EMISSION_RADIUS

const Text = styled.text`
  font-family: ${fontFamily};
  font-size: ${({ height }) => `${height * 0.24}px`};
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
      r={EMISSION_RADIUS * height}
      fill={white.opacity(.95)}
      stroke="url(#bg)"
      strokeWidth={2}
    />

    <Text
      x={x * width}
      y={height / 2}
      height={height}
      dy={0.08 * height}
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
}) => {
  const boundedPadding = (PADDING_FACTOR * width > EMISSION_RADIUS * height) ? PADDING_FACTOR : (EMISSION_RADIUS * height) / width
  const upperBound = 1 - boundedPadding - ARROW_FACTOR
  const transformFactor = x => (
    (upperBound - boundedPadding) * x + boundedPadding
  )

  return (
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
          [ 0, `${height / 2 - (0.1 * height)}` ],
          [ 1 - ARROW_FACTOR, `${height / 2 - (0.1 * height)}` ],
          [ 1 - ARROW_FACTOR, `${height / 2 - (0.24 * height)}` ],
          [ 1, 0.5 ],
          [ 1 - ARROW_FACTOR, `${height / 2 + (0.24 * height)}` ],
          [ 1 - ARROW_FACTOR, `${height / 2 + (0.1 * height)}` ],
          [ 0, `${height / 2 + (0.1 * height)}` ]
        ].map(scaleVector(width, height)))}
        fill="url(#bg)"
      />

      {
        repeat(boundedPadding, upperBound, SEPARATORS).map(x => (
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
}

export default ObservableView
