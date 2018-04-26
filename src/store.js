import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import browserHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import indexReducer from './reducers/indexReducer';

export const history = browserHistory();

const middleware = [
    thunk,
    logger,
    routerMiddleware(history),
];

const composeEnhancers = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
);

export default createStore(indexReducer, composeEnhancers);
