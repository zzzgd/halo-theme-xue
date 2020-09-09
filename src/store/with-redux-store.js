import { applyMiddleware, createStore } from 'redux';
import { createRouterMiddleware } from 'connected-next-router';
import { format } from 'url';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import Router from 'next/router';
import combinedReducer from './reducer';

const bindMiddleware = middleware => {
  const { composeWithDevTools } = require('redux-devtools-extension');
  return composeWithDevTools(applyMiddleware(...middleware));
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (typeof window !== 'undefined' && state?.router) {
      // preserve router value on client side navigation
      nextState.router = state.router;
    }
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const initStore = context => {
  const routerMiddleware = createRouterMiddleware();
  const { asPath, pathname, query } = context.ctx || Router.router || {};
  let initialState;
  if (asPath) {
    const url = format({ pathname, query });
    initialState = {
      router: {
        url,
        asPath,
        query,
        pathname,
      },
    };
  }
  return createStore(reducer, initialState, bindMiddleware([routerMiddleware]));
};

export const wrapper = createWrapper(initStore);
