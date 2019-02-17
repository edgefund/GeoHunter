const initialState = {
    QRData: {},
    chainData: {},
    userLoggedIn: false
}

const minigameReducer = (state = initialState, action) => {
    if (action.type === 'QRCODE_SCANNED') {
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