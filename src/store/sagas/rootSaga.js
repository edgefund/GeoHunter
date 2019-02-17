import { leaderboardSagas } from './leaderboardSagas'
import { all } from "redux-saga/effects";

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    leaderboardSagas(),
  ])
}