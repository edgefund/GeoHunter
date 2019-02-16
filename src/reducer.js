import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import contractReducer from './store/contractReducer'
import web3Reducer from './store/web3Reducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  contracts: contractReducer,
})

export default reducer
