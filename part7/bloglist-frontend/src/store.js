import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import notificationReducer from "./reducers/notificationReducer"
import userReducer from "./reducers/userReducer"
import { composeWithDevTools } from 'redux-devtools-extension'
import AllUsersReducer from "./reducers/allUsersReducer"

const reducer = combineReducers({
  notifications: notificationReducer,
  user: userReducer,
  allUsers: AllUsersReducer
})

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)