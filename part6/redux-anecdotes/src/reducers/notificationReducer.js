const initialState = ""

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DO_MESSAGE": {
      return action.data
    }
    case "DEL_MESSAGE":
      return initialState
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: "DO_MESSAGE",
    data: {
      message,
    }
  }
}


export const removeNotification = () => {
  return {
    type: "DEL_MESSAGE",
  }
}

export const showNotification = (message, timeout) => {
  return (dispatch) => {
    const action = setNotification(message)
    dispatch(action)

    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout)
  }
}

export default notificationReducer