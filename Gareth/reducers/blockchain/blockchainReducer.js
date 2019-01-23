import { CHOOSE_NETWORK } from '../../actions/blockchain/blockchainActionNames';

export default (state = { network: "unknown" }, action) => {
    switch (action.type) {
        case CHOOSE_NETWORK:
            return {
                ...state,
                network: action.payload
            };

        default:
            return state;
    }
}
