import { TODOS_DATA, TODOS_ERROR, TODOS_LOAD } from './todosType';

const InitialState = {
	loading: false,
	data: [],
	error: false,
};

export const todosReducer = (state = InitialState, action) => {
	switch (action.type) {
		case TODOS_LOAD:
			return {
				...state,
				loading: true,
			};
		case TODOS_DATA:
			return {
				...state,
				loading: false,
				data: action.payload,
			};

		case TODOS_ERROR:
			return {
				...state,
				loading: false,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};
