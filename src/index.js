import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { setLoginField, requestLogin, requestAPI } from './reducers/reducers';
import 'tachyons';

const logger = createLogger();
const appReducer = combineReducers({
  setLoginField,
  requestLogin,
  requestAPI
});
//root reducer setup to completely reset store state at logout/route changing to sign in component
const rootReducer = (state, action) => {
  if (action.type === 'ROUTE_CHANGE_SIGN_IN') {
    state = undefined;
  }
  return appReducer(state, action);
};
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
