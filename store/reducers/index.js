import { combineReducers } from "redux";
import category from "./category";
import location from "./location"; 

const rootReducer = combineReducers({
	category,
	location
});

export default rootReducer;