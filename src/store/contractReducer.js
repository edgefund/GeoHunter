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

  return state
}

export default contractReducer
