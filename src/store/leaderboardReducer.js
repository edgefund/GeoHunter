const initialState = {
  leaderObjectArray: []
}

const minigameReducer = (state = initialState, action) => {
  if (action.type === 'UPDATE_ARRAY_OBJECT') {

    var elementPos = state.leaderObjectArray.map((leaderObject) => {
      return leaderObject._userDid;
    }).indexOf(action.leaderObject._userDid);

    var newArray = Object.assign({}, state.leaderObjectArray);

    newArray[elementPos] = action.leaderObject;

    if ( elementPos >= 0 ) {
      const newState = {
        ...state,
        contents: newArray
      }

      return newState;
    }

    return Object.assign({}, state, {
      leaderObjectArray: [...state.leaderObjectArray, action.leaderObject]
    });
  }

  if (action.type === 'CLEAR_ARRAY') {
    return Object.assign({}, state, {
      leaderObjectArray: []
    });
  }

  return state;
}

export default minigameReducer;
