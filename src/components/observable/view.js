import React from 'react'
import styled from 'styled-components'

import { white, blue, black, gray } from '../../constants/colors'
import repeat from '../../utils/repeat'

import {
  HEIGHT_FACTOR,
  EMISSION_RADIUS,
  ARROW_HEIGHT_FACTOR,
  ARROW_WIDTH_FACTOR
} from './constants'

import Defs from './defs'
import Arrow from './arrow'
import Emission from './emission'
import Completion from './completion'

const PADDING_FACTOR = 0.03
const SEPARATORS = 20

const ObservableView = ({
  width = 500,
  height = 50,
  scale = 1,
  completion = 1,
  emissions = []
}) => {
  const boundedPadding = (PADDING_FACTOR * width > EMISSION_RADIUS * height) ? PADDING_FACTOR : (EMISSION_RADIUS * height) / width
  const upperBound = 1 - boundedPadding - ARROW_WIDTH_FACTOR
  const transformFactor = x => (
    (upperBound - boundedPadding) * (x / scale) + boundedPadding
  )

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
    >
      <Defs/>
      <Arrow height={height} width={width}/>

      {
        repeat(boundedPadding, upperBound, SEPARATORS).map(x => (
          <rect
            fill={white.opacity(.75)}
            width={1}
            height={HEIGHT_FACTOR * 2 * height}
            x={Math.round(x * width)}
            y={(0.5 - HEIGHT_FACTOR) * height}
          />
        ))
      }

      { completion && (
        <Completion
          x={transformFactor(completion)}
          height={height}
          width={width}
        />
      )}

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
