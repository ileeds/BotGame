import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MainNavigator from './appUtils/MainNavigator';
import Root from './appUtils/Root';

export default class App extends Component {
	render() {
		return (
			<Root>
				<View style={styles.container}>
					<MainNavigator />
				</View>
			</Root>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'space-around'
	}
});
