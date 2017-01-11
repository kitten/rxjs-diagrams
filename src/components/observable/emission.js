import React from 'react'
import styled from 'styled-components'

import { EMISSION_RADIUS } from './constants'
import { white, black } from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/font'

const Text = styled.text`
  font-family: ${fontFamily};
  font-size: ${props => `${props.height * 0.24}px`};
  line-height: ${fontSize};
  user-select: none;
`

const Emission = ({
  x,
  d,
  width,
  height,
  stroke = "url(#bg)",
  onMouseUp,
  onMouseDown,
  ...rest
}) => (
  <g>
    <circle
      cx={x * width}
      cy={height / 2}
      r={EMISSION_RADIUS * height}
      fill={white.opacity(.95)}
      stroke={stroke}
      strokeWidth={2}
      onMouseDown={evt => {
        onMouseDown && onMouseDown({ ...rest, x, d }, evt)
      }}
      onMouseUp={evt => {
        onMouseUp && onMouseUp({ ...rest, x, d }, evt)
      }}
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

export default Emission
