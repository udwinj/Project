import { createStore, combineReducers } from 'redux'
import * as switchReducer from './Reducers'


export default function(data) {
//   var reducer = combineReducers(switchReducer)
  var store = createStore(combineReducers(switchReducer))

  return store
}
