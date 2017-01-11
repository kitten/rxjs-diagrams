import React from 'react'

import scaleVector from '../../utils/scaleVector'
import points from '../../utils/points'
import {
  HEIGHT_FACTOR,
  ARROW_WIDTH_FACTOR,
  ARROW_HEIGHT_FACTOR
} from './constants'

const Arrow = ({ height, width }) => (
  <polygon
    points={points([
      [ 0, `${height / 2 - (HEIGHT_FACTOR * height)}` ],
      [ 1 - ARROW_WIDTH_FACTOR, `${height / 2 - (HEIGHT_FACTOR * height)}` ],
      [ 1 - ARROW_WIDTH_FACTOR, `${height / 2 - (ARROW_HEIGHT_FACTOR * height)}` ],
      [ 1, 0.5 ],
      [ 1 - ARROW_WIDTH_FACTOR, `${height / 2 + (ARROW_HEIGHT_FACTOR * height)}` ],
      [ 1 - ARROW_WIDTH_FACTOR, `${height / 2 + (HEIGHT_FACTOR * height)}` ],
      [ 0, `${height / 2 + (HEIGHT_FACTOR * height)}` ]
    ].map(scaleVector(width, height)))}
    fill="url(#bg)"
  />
)

export default Arrow
