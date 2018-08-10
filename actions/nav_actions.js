import NavigationService from '../appUtils/NavigationService';

export const getInitialScreen = () => (dispatch, getState) => {
	const { auth } = getState();
	if (!auth.phone) {
		NavigationService.navigate('getCode');
	} else if (!auth.loggedIn) {
		NavigationService.navigate('enterCode');
	} else if (!auth.username) {
		NavigationService.navigate('username');
	} else {
		NavigationService.navigate('main');
	}
};
