const initialState = {
  leaderObjectArray: []
}

const minigameReducer = (state = initialState, action) => {
  // TODO: Test logic
  if (action.type === 'UPDATE_ARRAY_OBJECT') {
    // Arrays.asList(Types).indexOf(userSTring);
    var elementPos = state.leaderObjectArray.map((leaderObject) => {
      return leaderObject._userDid;
    }).indexOf(action.leaderObject._userDid);

    if( elementPos >= 0 ) {
      let updatedObjectArray = state.leaderObjectArray.map(
        (leaderObject, i) => i === elementPos ? action.leaderObject : leaderObject
      )

      return Object.assign({}, state, {
        leaderObjectArray: updatedObjectArray
      });
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
