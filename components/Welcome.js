import React from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';

const Welcome = () => (
	<Header>
		<Text style={styles.textStyle}>Welcome to Bot Game</Text>
	</Header>
);

const styles = {
	textStyle: {
		textAlign: 'center',
		flex: 1,
		color: 'white',
		fontSize: 16
	}
};

export default Welcome;
