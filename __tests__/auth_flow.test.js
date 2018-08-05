import React from 'react';
import { shallow } from 'enzyme';
import { initialProps, updateStore } from '../testUtils/test_props';
import Splash from '../screens/Splash';

const { navigation, initialState, store } = initialProps();

describe('Auth Flow', () => {
	it('can do auth flow', () => {
		updateWrapped(null, null);
		expect(navigation.navigate.mock.calls[0][0]).toBe('start');

		updateWrapped('phone', '111-111-1111');
		expect(navigation.navigate.mock.calls[1][0]).toBe('enterCode');

		updateWrapped('loggedIn', true);
		expect(navigation.navigate.mock.calls[2][0]).toBe('username');

		updateWrapped('username', 'user123');
		expect(navigation.navigate.mock.calls[3][0]).toBe('main');
	});
});

updateWrapped = (key, value) => {
	store = updateStore(key, value);
	shallow(<Splash store={store} navigation={navigation} />).dive();
};
