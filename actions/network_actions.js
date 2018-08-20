import firebase from '../config/firebase';
import axios from 'axios';

import {
	GETINVITES_SUCCESS,
	GETINVITES_FAIL,
	SENDINVITE_SUCCESS,
	SENDINVITE_FAIL,
	UPDATEINVITES_SUCCESS,
	UPDATEINVITES_FAIL
} from './types';

export const invite = phoneTo => (dispatch, getState) => {
	const { phone } = getState().auth;
	firebase
		.database()
		.ref(`users/${phoneTo}/pushToken`)
		.once('value', async snapshot => {
			await axios.post('https://exp.host/--/api/v2/push/send', {
				to: snapshot.val(),
				data: { text: 'Hi' }
			});
		})
		.then(() => {
			dispatch({ type: SENDINVITE_SUCCESS });
			let updateObject = {
				[`invites/${phone}/${phoneTo}`]: 'sent',
				[`invites/${phoneTo}/${phone}`]: 'received'
			};
			const inviteRef = firebase
				.database()
				.ref()
				.update(updateObject)
				.then(() => {
					dispatch({ type: UPDATEINVITES_SUCCESS });
				})
				.catch(err => {
					dispatch({ type: UPDATEINVITES_FAIL });
				});
		})
		.catch(err => {
			dispatch({ type: SENDINVITE_FAIL });
		});
};

export const getInvites = () => async (dispatch, getState) => {
	const { phone } = getState().auth;
	let invites = [];
	firebase
		.database()
		.ref(`invites/${phone}`)
		.once('value', snapshot => {
			invites = Object.keys(snapshot.val());
		})
		.then(() => {
			dispatch({ type: GETINVITES_SUCCESS, payload: invites });
		})
		.catch(err => {
			dispatch({ type: GETINVITES_FAIL });
		});
};
