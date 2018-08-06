import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import firebase from '../../config/firebase';
import {
	verifyAuth,
	getCode,
	anotherCode,
	sendCode,
	setUsername
} from '../auth_actions';
import { LOGIN_SUCCESS, LOGIN_FAIL } from '../types';
import { initialProps, updateStore } from '../../testUtils/test_props';
import { ROOT_URL } from '../../appUtils/puppet';

const { navigation, initialState, store } = initialProps();

describe('authActions', () => {
	beforeAll(() => {
		moxios.install();
	});

	afterAll(() => {
		moxios.uninstall();
	});

	it('verifies auth', () => {
		const onAuthStateChanged = jest.fn();
		jest.spyOn(firebase, 'auth').mockImplementation(() => {
			return {
				onAuthStateChanged
			};
		});
		store.dispatch(verifyAuth());
		expect(onAuthStateChanged).toBeCalled();
		store.dispatch({ type: LOGIN_SUCCESS });
		expect(store.getState().auth.loggedIn).toBe(true);
		store.dispatch({ type: LOGIN_FAIL });
		expect(store.getState().auth.loggedIn).toBe(false);
	});

	it('gets code', async done => {
		const phone = '111-111-1111';
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({ status: 200 });
		});
		await store.dispatch(getCode(phone));
		setTimeout(() => {
			expect(store.getState().auth.phone).toBe(phone);
		});
		done();
	});

	it('gets another code', async done => {
		const phone = '111-111-1111';
		store = updateStore('phone', phone);
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({ status: 200 });
		});
		await store.dispatch(anotherCode());
		setTimeout(() => {
			expect(store.getState().auth.phone).toBe(phone);
		});
		done();
	});

	it('sends code', async done => {
		const signInWithCustomToken = jest.fn();
		jest.spyOn(firebase, 'auth').mockImplementation(() => {
			return {
				signInWithCustomToken
			};
		});
		const phone = '111-111-1111';
		const code = '2222';
		const token = 'asfklaslkfnkslanfklasflknekalnf';
		store = updateStore('phone', phone);
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: { token }
			});
		});
		await store.dispatch(sendCode(code));
		setTimeout(() => {
			expect(signInWithCustomToken.mock.calls[0][0]).toBe(token);
		});
		done();
	});

	it('sets username', async done => {
		const updateProfile = jest.fn(() => {
			return Promise.resolve('result of updateProfile');
		});
		jest.spyOn(firebase, 'auth').mockImplementation(() => {
			return {
				currentUser: {
					updateProfile
				}
			};
		});

		const username = 'user123';
		await store.dispatch(setUsername(username));
		setTimeout(() => {
			expect(store.getState().auth.username).toBe(username);
		});
		done();
	});
});
