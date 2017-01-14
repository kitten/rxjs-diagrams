import {
  EMISSION_RADIUS,
  ARROW_WIDTH_FACTOR,
  PADDING_FACTOR
} from './constants'

const makeTransformFactor = ({ width, height }) => {
  const strokeFactor = 2 / height
  const emissionRadius = EMISSION_RADIUS + strokeFactor
  const boundedPadding = (PADDING_FACTOR * width > emissionRadius * height) ? PADDING_FACTOR : (emissionRadius * height) / width
  const upperBound = 1 - boundedPadding - ARROW_WIDTH_FACTOR

  const transformFactor = x => (
    (upperBound - boundedPadding) * x + boundedPadding
  )

  return transformFactor
}

export default makeTransformFactor
