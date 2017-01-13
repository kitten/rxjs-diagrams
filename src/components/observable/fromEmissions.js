import React from 'react'
import ObservableView from './view'
import { isEmissionsArr } from '../../utils/isEmissionsArr'

const selectValue = obj => obj.x

function fromEmissions(arr, range, completion) {
  if (!isEmissionsArr(arr)) {
    throw new Error([
      'Expected each value in `emissions` to be an emission',
      '({ x: [number], d: [string] })'
    ].join('. '))
  }

  const min = Math.min.apply(null, arr.map(selectValue))
  const max = typeof range === 'number' ? range : completion

  const emissions = arr
    .filter(({ x }) => x <= completion)
    .sort((a, b) => a.x - b.x)
    .map(({ x, ...rest }) => ({
      ...rest,
      x: x / max
    }))

  return props => (
    <ObservableView
      {...props}
      completion={(
        completion / max
      )}
      emissions={emissions}
    />
  )
}

export default fromEmissions
