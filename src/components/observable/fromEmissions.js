import React from 'react'
import ObservableView from './view'
import { isEmissionsArr } from '../../utils/isEmissionsArr'

const selectValue = obj => obj.x

function fromEmissions(arr, end, completion) {
  if (!isEmissionsArr(arr)) {
    throw new Error([
      'Expected each value in `emissions` to be an emission',
      '({ x: [number], d: [string] })'
    ].join('. '))
  }

  const min = Math.min.apply(null, arr.map(selectValue))
  const max = typeof end === 'number' ? end : Math.max.apply(null, arr.map(selectValue))
  const range = max - min

  const minFactor = min / range

  const emissions = arr
    .filter(({ x }) => x <= max)
    .sort((a, b) => a.x - b.x)
    .map(({ x, ...rest }) => ({
      ...rest,
      x: x / range - minFactor
    }))

  return props => (
    <ObservableView
      {...props}
      completion={completion ? Math.min(completion / range, 1) : 0}
      emissions={emissions}
    />
  )
}

export default fromEmissions
