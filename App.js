import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Asset, AppLoading, Notifications } from 'expo';
import MainNavigator from './appUtils/MainNavigator';
import Root from './appUtils/Root';
import registerForNotifications from './appUtils/push_notifications';

export default class App extends Component {
	state = {
		isReady: false
	};

	componentDidMount() {
		registerForNotifications();
		Notifications.addListener(notification => {
			const {
				data: { text },
				origin
			} = notification;

			if (origin === 'received' && text) {
				Alert.alert('New Push Notification', text, [{ text: 'Ok' }]);
			}
		});
	}

	render() {
		if (!this.state.isReady) {
			return (
				<AppLoading
					startAsync={this._cacheResourcesAsync}
					onFinish={() => this.setState({ isReady: true })}
					onError={console.warn}
				/>
			);
		}
		return (
			<Root>
				<View style={styles.container}>
					<MainNavigator />
				</View>
			</Root>
		);
	}

	async _cacheResourcesAsync() {
		const images = [require('./assets/logo.png')];

		const cacheImages = images.map(image => {
			return Asset.fromModule(image).downloadAsync();
		});
		return Promise.all(cacheImages);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around'
	}
});
