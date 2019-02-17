const initialState = {
    QRData: {},
    chainData: {}
}

const minigameReducer = (state = initialState, action) => {
    if (action.type === 'GOT_QR_DATA') {
        return Object.assign({}, state, {
            QRData: action.payload
        });
    }

    if (action.type === 'GOT_CHAIN_DATA') {
        return Object.assign({}, state, {
            chainData: action.payload
        });
    }

    return state;
}

export default minigameReducer;
