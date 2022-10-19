import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { legacy_createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import RootReducer from './reducers'
import { getUsers } from './actions/users'
import { getPost } from './actions/post'

const store = legacy_createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(getUsers())
store.dispatch(getPost())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
