import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import reducer from './reducer'

// Sagas
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routingMiddleware = routerMiddleware(browserHistory)

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware,
      routingMiddleware,
    )
  )
)

sagaMiddleware.run(rootSaga)


export default store
