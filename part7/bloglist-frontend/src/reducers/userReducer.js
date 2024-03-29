const userReducer = (state = '', action) => {
    console.log(action)
    switch (action.type) {
      case 'SET_USER':
        return action.content
      default: 
        return state
    }
  }
  
  export const setUser = (content) => (
    {
      type: 'SET_USER',
      content
    }
  )
  
  export default userReducer