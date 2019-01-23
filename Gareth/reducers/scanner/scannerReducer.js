import { GOT_CAMERA_PERMISSION, TOGGLE_SCANNING, BARCODE_SCANNED } from '../../actions/scanner/scannerActionNames';

const defaultState = {
    scanning: false,
    hasCameraPermission: null,
    network: "unknown"
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case GOT_CAMERA_PERMISSION:
            return {
                ...state,
                hasCameraPermission: action.payload
            };

        case TOGGLE_SCANNING:
            return {
                ...state,
                scanning: action.payload
            };

        case BARCODE_SCANNED:
            return {
                ...state,
                barCodeData: action.payload
            }
        default:
            return state;
    }
}
