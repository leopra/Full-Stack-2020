const initialState = ""

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DO_MESSAGE": {
      console.log(action.data)
      clearTimeout(state.reset)
      return action.data.message
    }
    case "DEL_MESSAGE":
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: "DO_MESSAGE",
      data: {
        message,
        reset: setTimeout(() => {
          dispatch(removeNotification())
        }, timeout)
      }
    })
  }
}


export const removeNotification = () => {
  return {
    type: "DEL_MESSAGE"
  }
}

export default notificationReducer