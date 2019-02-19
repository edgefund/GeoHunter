const initialState = {
  initalized: false,
  web3: null, 
}

const web3Reducer = (state = initialState, action) => {
  if (action.type === 'INIT_WEB3') {
    return Object.assign({}, state, {
      web3: action.web3,
      initalized: true,
    })
  }

  if (action.type === 'DISCONNECT_WEB3') {
    return Object.assign({}, state, {
      web3: null,
      initalized: false,
    })
  }

  return state
}

export default web3Reducer
