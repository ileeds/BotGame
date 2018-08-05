import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import Splash from '../screens/Splash';
import reducers from '../testUtils/test_reducer';

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

describe('Auth Flow', () => {
	jest.useFakeTimers();
	beforeEach(() => {
		moxios.install();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it('can do auth flow', done => {
		const initialState = {
			auth: {
				phone: null,
				codeSent: false,
				loggedIn: false,
				username: null
			}
		};

		const navigation = { navigate: jest.fn() };
		const store = createStore(reducers, initialState, applyMiddleware(thunk));

		const wrapped = shallow(
			<Splash store={store} navigation={navigation} />
		).dive();
		expect(navigation.navigate.mock.calls[0][0]).toBe('start');
		done();
	});
});
