import { VirtualTimeScheduler, VirtualAction } from 'rxjs/scheduler/VirtualTimeScheduler'

const makeScheduler = () => new VirtualTimeScheduler(VirtualAction)

export default makeScheduler
