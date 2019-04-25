import { ADD_CATEGORY, REMOVE_CATEGORY, UPDATE_CATEGORY } from "../actionTypes";

let previousKey = 0;

export function addCategory(category, customKey = undefined) {
	let key;
	if (customKey != undefined){
		key = customKey
	} else {
		key = previousKey + 1;
		previousKey = key;	
	}
	return {
		type: ADD_CATEGORY,
		category,
		key
	};	
}

export function updateCategory(category, giveNewId = false) {
	let key;
	if (giveNewId) {
		key = previousKey + 1;
		previousKey = key;	
	} else {
		key = category.key;
	}
	return {
		type: UPDATE_CATEGORY,
		category,
		key
	};	
}

export function removeCategory(key) {
	return {
		type: REMOVE_CATEGORY,
    	key
	};	
}