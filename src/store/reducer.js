import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from '../user/userReducer'
import contractReducer from './contractReducer'
import web3Reducer from './web3Reducer'
import leaderboardReducer from './leaderboardReducer'
import minigameReducer from './minigameReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  contracts: contractReducer,
  minigame: minigameReducer,
  leaderboard: leaderboardReducer,
})

export default reducer
