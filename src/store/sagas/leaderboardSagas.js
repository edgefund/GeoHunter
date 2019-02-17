import { takeLatest, call, put, delay, select } from "redux-saga/effects";
import { getUser, getTotalUsers } from '../../provider/geohunterContract'

export const getCurrentUserDid = (state) => {
  if (state.user.data === null) {
    return 0
  }
  return state.user.data.did;
}

export function* leaderboardSagas() {
  yield call(pollLeaderboard)
  yield takeLatest('POLL_LEADERBOARD', pollLeaderboard)
}

function* pollLeaderboard() {
  while (true) {

    let currentDid = yield select(getCurrentUserDid)

    let numUsersObj = yield call(getTotalUsers);
    let numUsers = numUsersObj._totalUsers

    for (let userIndex = 1; userIndex <= numUsers; userIndex++) {

      let user = yield call(getUser, userIndex);

      if (user._userDid === currentDid) {
        yield put({
          type: 'USER_NEXT_TAG',
          nextTag: parseInt(user._progress, 10) + 1,
        })
      }

      yield put({
        type: 'UPDATE_ARRAY_OBJECT',
        leaderObject: user,
      })
    }

    yield delay(50);
  }
}
