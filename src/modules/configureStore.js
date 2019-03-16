import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { history } from '../history';
import createSagaMiddleware from 'redux-saga'
import { saga } from './rootSaga'

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(routerMiddleware(history), thunk, sagaMiddleware));
const store = createStore(connectRouter(history)(rootReducer), enhancer);

sagaMiddleware.run(saga);

window.store = store;

export default store;
