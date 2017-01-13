import {
  EMISSION_RADIUS,
  ARROW_WIDTH_FACTOR,
  PADDING_FACTOR
} from './constants'

const makeTransformFactor = ({ width, height, scale }) => {
  const strokeFactor = 2 / height
  const emissionRadius = EMISSION_RADIUS + strokeFactor
  const boundedPadding = (PADDING_FACTOR * width > emissionRadius * height) ? PADDING_FACTOR : (emissionRadius * height) / width
  const upperBound = 1 - boundedPadding - ARROW_WIDTH_FACTOR

  const transformFactor = x => (
    (upperBound - boundedPadding) * (x / scale) + boundedPadding
  )

  return transformFactor
}

export default makeTransformFactor
