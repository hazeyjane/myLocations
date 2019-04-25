import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";

export function configureStore() {
	const store = createStore(rootReducer);
	return store;
}