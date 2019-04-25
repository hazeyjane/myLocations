import { ADD_LOCATION, REMOVE_LOCATION, UPDATE_LOCATION } from "../actionTypes";

let previousKey = 0;

export function addLocation(location, customKey = undefined) {
	let key;
	if (customKey != undefined){
		key = customKey
	} else {
		key = previousKey + 1;
		previousKey = key;	
	}
	return {
		type: ADD_LOCATION,
		location,
		key
	};	
}

export function updateLocation(location, giveNewId = false) {
	let key;
	if (giveNewId) {
		key = previousKey + 1;
		previousKey = key;	
	} else {
		key = location.key;
	}
	return {
		type: UPDATE_LOCATION,
		location,
		key
	};	
}

export function removeLocation(key) {
	return {
		type: REMOVE_LOCATION,
    	key
	};	
}