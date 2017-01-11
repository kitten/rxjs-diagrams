import fromEmissions from './fromEmissions'

const EmissionsView = ({ emissions, end, completion, ...props }) => fromEmissions(emissions, end, completion)(props)

export default EmissionsView
