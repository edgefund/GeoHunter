import { takeLatest, call, put, delay, select } from "redux-saga/effects";
import { getTotalTags, getUser, getTotalUsers } from '../../provider/geohunterContract'


export const getCurrentUserDid = (state) => {
  if(state.user.data === null) {
    return 0
  }
  return state.user.data.did;
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* leaderboardSagas() {
  yield call(pollLeaderboard)
  yield takeLatest('POLL_LEADERBOARD', pollLeaderboard)
}

// function that makes the api request and returns a Promise for response
function* pollLeaderboard() {
  while(true) {
    let currentDid = yield select(getCurrentUserDid)

    let numUsersObj = yield call(getTotalUsers);
    let numUsers = numUsersObj._totalUsers

    for (let userIndex = 1; userIndex <= numUsers; userIndex++) {
      // Pull data
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

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    // const response = yield call(fetchDog);
    // const dog = response.data.message;

    // dispatch a success action to the store with the new dog
    // yield put({ type: "API_CALL_SUCCESS", dog });

  } catch (error) {
    // dispatch a failure action to the store with the error
    // yield put({ type: "API_CALL_FAILURE", error });
  }
}
