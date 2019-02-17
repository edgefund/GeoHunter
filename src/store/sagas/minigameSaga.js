import { takeEvery, call, put, select } from "redux-saga/effects";
import { nextTagRequired } from '../../provider/geohunterContract'

export function* minigameSaga() {
    yield takeEvery('GET_IPFS_IMAGE', getIpfsImageHash)
}

export const getCurrentUserDid = (state) => {
    if (state.user.data === null) {
      return 0
    }

    return state.user.data.did;
  }

export function* getIpfsImageHash() {
  const currentDid = yield select(getCurrentUserDid);
  console.log(currentDid);

  const tag = yield call(nextTagRequired, currentDid);

  console.log('What is tag?:', tag);

  yield put({type: 'GOT_IPFS_IMAGE', payload: tag._ipfsHash.toString()});
}
