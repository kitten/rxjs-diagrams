import React from 'react'

import { white } from '../../constants/colors'
import repeat from '../../utils/repeat'

import {
  HEIGHT_FACTOR
} from './constants'

const Separators = ({ height, width, transformFactor }) => (
  <g>
    {
      repeat(0, 1, 20).map((x, i) => (
        <rect
          key={i}
          fill={white.opacity(.75)}
          width={1}
          height={HEIGHT_FACTOR * 2 * height}
          x={Math.round(transformFactor(x) * width)}
          y={(0.5 - HEIGHT_FACTOR) * height}
        />
      ))
    }
  </g>
)

export default Separators
