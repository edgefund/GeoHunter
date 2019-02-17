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
<<<<<<< HEAD
    yield delay(100);
  }
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    // const response = yield call(fetchDog);
    // const dog = response.data.message;
=======
>>>>>>> 1379b6bc81d1c754d2cebdcb41a463430d106e11

    yield delay(5000);
  }
}
