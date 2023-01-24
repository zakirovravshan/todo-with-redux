import { TODOS_DATA, TODOS_ERROR, TODOS_LOAD } from './todosType';

export const todosLoad = () => {
	return {
		type: TODOS_LOAD,
	};
};

export const todosData = (todos) => {
	return {
		type: TODOS_DATA,
		payload: todos,
	};
};

export const todosError = (error) => {
	return {
		type: TODOS_ERROR,
		payload: error,
	};
};
