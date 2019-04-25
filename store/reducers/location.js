import { ADD_LOCATION, REMOVE_LOCATION, UPDATE_LOCATION } from "../actionTypes";

const DEFAULT_STATE = {
	locations: []
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case ADD_LOCATION:
			return { locations: [...state.locations, {...action.location, key: action.key.toString()}] };
		case UPDATE_LOCATION:
			return { 				
				locations: state.locations.map(item => {
					if (item.key == action.location.key){
						return {...action.location, key: action.key.toString()}
					} else {
						return item;
					}
				})
			}
		case REMOVE_LOCATION:
			return { locations: state.locations.filter(item => item.key != action.key) };
		default:
			return state;
	}
};