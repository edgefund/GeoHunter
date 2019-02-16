const initialState = {
  contracts: []
}

const contractReducer = (state = initialState, action) => {
  if (action.type === 'ADD_CONTRACT') {
    return Object.assign({}, state, {
      contracts: [
        ...state.contracts, 
        action.contract,
      ]
    })
  }
  // if (action.type === 'USER_LOGGED_OUT') {
  //   return Object.assign({}, state, {
  //     data: null
  //   })
  // }

  return state
}

export default contractReducer
