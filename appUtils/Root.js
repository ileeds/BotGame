import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from '../store';
import { verifyAuth } from '../actions';

export default ({ children, initialState = {} }) => {
	const { persistor, store } = configureStore();
	store.dispatch(verifyAuth());

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>{children}</PersistGate>
		</Provider>
	);
};
