import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import notificationReducer from "./reducers/notificationReducer"
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  notifications: notificationReducer,
})

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)