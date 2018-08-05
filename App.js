import React from 'react';
import { StyleSheet, View } from 'react-native';
import Root from './appUtils/Root';
import MainNavigator from './appUtils/MainNavigator';

export default class App extends React.Component {
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
