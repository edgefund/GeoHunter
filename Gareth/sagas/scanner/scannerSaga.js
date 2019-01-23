import { put, takeEvery, call } from 'redux-saga/effects';
import { Permissions } from 'expo';
import {
    GET_CAMERA_PERMISSION,
    GOT_CAMERA_PERMISSION
} from '../../actions/scanner/scannerActionNames';

export default function* scannerSaga() {
    yield takeEvery(GET_CAMERA_PERMISSION, askCameraPermission);
}

export function* askCameraPermission() {
    try {
        const { status } = yield call(Permissions.askAsync, Permissions.CAMERA);

        if (status === 'granted') {
            yield put({ type: GOT_CAMERA_PERMISSION, payload: true });
        } else {
            yield put({ type: GOT_CAMERA_PERMISSION, payload: false });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: GOT_CAMERA_PERMISSION, payload: false });
    }
}
