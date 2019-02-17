const initialState = {
  leaderObjectArray = []
}

const minigameReducer = (state = initialState, action) => {
  // TODO: Test logic 
  if (action.type === 'UPDATE_ARRAY_OBJECT') {
    Arrays.asList(Types).indexOf(userSTring);
    var elementPos = state.leaderObjectArray.map((leaderObject) => { 
      return leaderObject.did;
    }).indexOf(action.leaderObject.did);

    if( elementPos >= 0 ) {
      return {
        ...state,
        contents: state.leaderObjectArray.map(
          (leaderObject, i) => i === elementPos ? action.leaderObject : leaderObject
        )
      }
    }
    return Object.assign({}, state, {
      leaderObjectArray: [...leaderObjectArray, action.leaderObject]
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