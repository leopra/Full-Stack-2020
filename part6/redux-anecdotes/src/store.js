import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import anedReducer from "./reducers/anecdoteReducer"
import notificationReducer from "./reducers/notificationReducer"
import { composeWithDevTools } from 'redux-devtools-extension'
import filterReducer from "./reducers/filterReducer"


const reducer = combineReducers({
  anecdotes: anedReducer,
  notifications: notificationReducer,
  filter: filterReducer
})

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)