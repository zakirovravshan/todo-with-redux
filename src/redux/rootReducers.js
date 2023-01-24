import { combineReducers } from 'redux';
import { todosReducer } from './todos/todosReducer';
import { tokenReducers } from './token/tokenReducers';
import { userReducers } from './users/userReducers';

export const rootReducers = combineReducers({
	token: tokenReducers,
	user: userReducers,
	todos: todosReducer,
});
