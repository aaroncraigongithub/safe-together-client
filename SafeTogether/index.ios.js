import React from 'react'
import { AppRegistry } from 'react-native'
import App from './app/containers/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './app/reducers'

// middleware that logs actions
const loggerMiddleware = createLogger(
  { predicate: (getState, action) => __DEV__  }
);

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
  );

  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

const SafeTogetherApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('SafeTogether', () => SafeTogetherApp);
