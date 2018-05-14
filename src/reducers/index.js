import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';
import thunk from 'redux-thunk';

const reduxDevTool = () => {
	return typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
		? window.devToolsExtension()
		: (f) => f;
};

export default function configureStore(initialState) {
	const middleware = [thunk, ...(process.env.NODE_ENV === 'production' ? [] : [createLogger({ diff: true })])];

	const composedStoreEnhancer = compose(applyMiddleware(...middleware), reduxDevTool());

	const store = composedStoreEnhancer(createStore)(rootReducer, initialState);

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			store.replaceReducer(require('./reducers'));
		});
	}

	return store;
}
