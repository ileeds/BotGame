import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';

export default async () => {
	let previousToken = await AsyncStorage.getItem('push_token');

	if (previousToken) {
		return;
	}

	let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

	if (status !== 'granted') {
		return;
	}

	let token = await Notifications.getExpoPushTokenAsync();
	AsyncStorage.setItem('push_token', token);
};
