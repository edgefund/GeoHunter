const initialState = {
  data: null,
  loggingIn: false,
  nextTag: 1,

}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN')
  {
    // TODO: Add nextTag?
    return Object.assign({}, state, {
      data: action.payload,
      loggingIn: false,
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null,
      nextTag: null,
      loggingIn: false,
    })
  }

  if (action.type === 'USER_NEXT_TAG')
  {
    return Object.assign({}, state, {
      nextTag: action.nextTag
    })
  }

  if (action.type === 'USER_LOGGING_IN') {
    return Object.assign({}, state, {
      loggingIn: true
    })
  }

  return state
}

export default userReducer
