import { takeEvery, call, put, select } from "redux-saga/effects";
import { nextTagRequired } from '../../provider/geohunterContract'

export function* minigameSaga() {
    yield takeEvery('GET_IPFS_IMAGE', getIpfsImageHash)
}

export const getCurrentUserDid = (state) => {
    if(state.user.data === null) {
      return 0
    }
    return state.user.data.did;
  }

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* getIpfsImageHash() {
  let currentDid = yield select(getCurrentUserDid);
  const tag = yield call(nextTagRequired, currentDid);
  yield put({type: 'GOT_IPFS_IMAGE', payload:tag});
}
