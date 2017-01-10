import React from 'react'
import ObservableView from './view'

const isEmission = (obj) => (
  typeof obj === 'object' &&
  typeof obj.x === 'number' &&
  obj.x === obj.x &&
  obj.x > 0 &&
  obj.d !== undefined &&
  obj.d !== null
)

const selectValue = obj => obj.x

function fromEmissions(arr, end, completion) {
  if (!Array.isArray(arr) || !arr.every(isEmission)) {
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
      completion={Math.min(completion / range, 1)}
      emissions={emissions}
    />
  )
}

export default fromEmissions
