import { ADD_CATEGORY, REMOVE_CATEGORY, UPDATE_CATEGORY } from "../actionTypes";

const DEFAULT_STATE = {
	categories: []
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case ADD_CATEGORY:
			return { categories: [...state.categories, {...action.category, key: action.key.toString()}] };
		case UPDATE_CATEGORY:
			return { 				
				categories: state.categories.map(item => {
					if (item.key == action.category.key){
						return {...action.category, key: action.key.toString()}
					} else {
						return item;
					}
				})
			}
		case REMOVE_CATEGORY:
			return { categories: state.categories.filter(item => item.key != action.key) };
		default:
			return state;
	}
};