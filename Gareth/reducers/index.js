import { combineReducers } from 'redux';

import blockchainReducer from './blockchain/blockchainReducer';
import scannerReducer from './scanner/scannerReducer';

export default combineReducers({
    blockchainReducer,
    scannerReducer
});
