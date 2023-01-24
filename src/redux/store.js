import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducers } from './rootReducers';
import { createStore } from 'redux';
import thunk from 'redux-thunk';

export const store = createStore(
	rootReducers,
	composeWithDevTools(applyMiddleware(thunk)),
);
