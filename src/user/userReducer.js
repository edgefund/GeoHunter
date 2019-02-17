const initialState = {
  data: null,
  nextTag: null,
  
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null,
      nextTag: null,
    })
  }

  if (action.type === 'USER_NEXT_TAG')
  {
    return Object.assign({}, state, {
      nextTag: action.nextTag
    })
  }

  return state
}

export default userReducer
