import { PropTypes} from 'react'
import fromEmissions from './fromEmissions'

const EmissionsView = ({ emissions, end, completion, ...props }) => fromEmissions(emissions, end, completion)(props)

EmissionsView.propTypes = {
  completion: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired
}

export default EmissionsView
