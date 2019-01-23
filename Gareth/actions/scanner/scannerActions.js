import {
    TOGGLE_SCANNING,
    GET_CAMERA_PERMISSION,
    BARCODE_SCANNED
} from './scannerActionNames';

export const toggleScanning = (payload) => ({ type: TOGGLE_SCANNING, payload });
export const getCameraPermission = () => ({ type: GET_CAMERA_PERMISSION });
export const barCodeScanned = (payload) => ({ type: BARCODE_SCANNED, payload });
