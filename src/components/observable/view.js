import React from 'react'
import styled from 'styled-components'

import { EMISSION_RADIUS } from './constants'
import { white, blue, black, gray } from '../../constants/colors'
import scaleVector from '../../utils/scaleVector'
import points from '../../utils/points'
import repeat from '../../utils/repeat'

import Defs from './defs'
import Emission from './emission'

const PADDING_FACTOR = 0.03
const ARROW_FACTOR = 0.06
const SEPARATORS = 20
const COMPLETION_HEIGHT = 8 * EMISSION_RADIUS

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
      <Defs/>

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
            stroke="url(#bg)"
            x={transformFactor(x)}
            d={d}
          />
        ))
      }
    </svg>
  )
}

export default ObservableView
