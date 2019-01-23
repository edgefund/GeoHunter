import * as blockchainActions from './blockchain/blockchainActions';
import * as scannerActions from './scanner/scannerActions';

export const ActionCreators = Object.assign({},
    blockchainActions,
    scannerActions
);
