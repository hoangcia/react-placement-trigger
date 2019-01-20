import { createStore, applyMiddleware /*, compose*/ } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/RootReducer';

export const configureStore = (initialState = {}) => {  
  
  return createStore(
   rootReducer,
   initialState,
    applyMiddleware(thunk)
  );
  
  /*Only for Development purpose - enable 'compose' method to use this Chrome extension*/
  
 /*
  const composeEnhancers =
    typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
  );
  return createStore(rootReducer, initialState, enhancer);
  */
};