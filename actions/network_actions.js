import firebase from '../config/firebase';
import axios from 'axios';

import {
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
			const inviteRef = firebase
				.database()
				.ref(`users/${phone}/invites`)
				.update({ [phoneTo]: false })
				.then(() => {
					dispatch({ type: UPDATEINVITES_SUCCESS, payload: phoneTo });
				})
				.catch(err => {
					dispatch({ type: UPDATEINVITES_FAIL });
				});
		})
		.catch(err => {
			dispatch({ type: SENDINVITE_FAIL });
		});
};
