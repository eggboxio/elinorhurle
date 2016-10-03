import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import data from './data'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  data
})

export default todoApp
