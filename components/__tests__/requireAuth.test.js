import React from 'react';
import { shallow } from 'enzyme';
import { initialProps, updateStore } from '../../testUtils/test_props';
import Home from '../../screens/Home';

describe('Require Auth Flow', () => {
	const { navigation, initialState, store } = initialProps();

	it('navigates correctly', () => {
		shallow(<Home store={store} navigation={navigation} />).dive();
		expect(navigation.navigate.mock.calls[0][0]).toBe('sendCode');

		let updatedStore = updateStore('phone', '111-111-1111');
		shallow(<Home store={updatedStore} navigation={navigation} />).dive();
		expect(navigation.navigate.mock.calls[1][0]).toBe('enterCode');

		updatedStore = updateStore('loggedIn', true);
		expect(navigation.navigate.mock.calls.length).toBe(2);
	});
});
