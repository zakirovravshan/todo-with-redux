import { REMOVE_TOKEN, TOKEN } from './tokenType';

const initailState = {
	token: '',
};

export const tokenReducers = (state = initailState, action) => {
	switch (action.type) {
		case TOKEN:
			return {
				...state,
				token: action.payload,
			};
		case REMOVE_TOKEN:
			return {
				...state,
				token: action.payload,
			};
		default:
			return state;
	}
};
