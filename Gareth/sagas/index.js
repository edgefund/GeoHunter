import { all } from 'redux-saga/effects';
import scannerSaga from './scanner/scannerSaga';

export default function* rootSaga() {
    yield all([
        scannerSaga()
    ])
}
