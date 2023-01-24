import { REMOVE_USER, USER } from './userType';

const initailState = {
	user: '',
};

export const userReducers = (state = initailState, action) => {
	switch (action.type) {
		case USER:
			return {
				...state,
				user: action.payload,
			};
		case REMOVE_USER:
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
};
