import React from 'react';
import { mount } from 'enzyme';
import { initialProps, updateStore } from '../testUtils/test_props';
import Root from '../appUtils/Root';
import MainNavigator from '../appUtils/MainNavigator';
import { getInitialScreen } from '../actions';

require('react-native-mock-render/mock');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = new JSDOM('').window;
global.document = document;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
	if (typeof global[property] === 'undefined') {
		global[property] = document.defaultView[property];
	}
});

const { navigation, initialState, store } = initialProps();
jest.useFakeTimers();

describe('Auth Flow', () => {
	it('can do auth flow', () => {
		const wrapped = mount(
			<Root initialState={initialState}>
				<MainNavigator store={store} />
			</Root>
		);
		store.dispatch(getInitialScreen());
		console.log(wrapped.debug());
	});
});

// updateWrapped = (key, value) => {
// 	store = updateStore(key, value);
// 	return mount(
// 		<Root initialState={initialState}>
// 			<MainNavigator store={store} navigation={navigation} />
// 		</Root>
// 	);
// };
