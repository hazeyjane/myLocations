import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import { autoRehydrate } from 'redux-persist'

// here we create our redux store
// we use 'redux-persist' to save and load our redux store when the app 
// after closing the app

export function configureStore() {
  const store = createStore(rootReducer, compose(autoRehydrate()));
	return store;
}