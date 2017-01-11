import React from 'react'

import { white } from '../../constants/colors'
import repeat from '../../utils/repeat'
import points from '../../utils/points'
import scaleVector from '../../utils/scaleVector'

import {
  HEIGHT_FACTOR
} from './constants'

const WIDTH_FACTOR = 0.005

const Separators = ({ height, width, transformFactor }) => (
  <g>
    {
      repeat(0, 1, 20).map((f, i) => {
        const x1 = Math.round((transformFactor(f) - WIDTH_FACTOR) * width)
        const x2 = Math.round((transformFactor(f) + WIDTH_FACTOR) * width)

        return (
          <g key={i}>
            <line
              x1={x1}
              y1={(0.5 - HEIGHT_FACTOR) * height}
              x2={x2}
              y2={0.5 * height}
              strokeWidth={1}
              stroke={white.opacity(.75)}
            />
            <line
              x1={x2}
              y1={0.5 * height}
              x2={x1}
              y2={(0.5 + HEIGHT_FACTOR) * height}
              strokeWidth={1}
              stroke={white.opacity(.75)}
            />
          </g>
        )
      })
    }
  </g>
)

export default Separators
