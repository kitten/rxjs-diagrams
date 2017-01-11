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
      [ 0, 0.5 - HEIGHT_FACTOR ],
      [ 1 - ARROW_WIDTH_FACTOR, 0.5 - HEIGHT_FACTOR ],
      [ 1 - ARROW_WIDTH_FACTOR, 0.5 - ARROW_HEIGHT_FACTOR ],
      [ 1, 0.5 ],
      [ 1 - ARROW_WIDTH_FACTOR, 0.5 + ARROW_HEIGHT_FACTOR ],
      [ 1 - ARROW_WIDTH_FACTOR, 0.5 + HEIGHT_FACTOR ],
      [ 0, 0.5 + HEIGHT_FACTOR ]
    ].map(scaleVector(width, height)))}
    fill="url(#bg)"
  />
)

export default Arrow
