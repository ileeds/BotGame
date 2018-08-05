import React from 'react';
import { View, Text } from 'react-native';

export default ({ error }) => {
	return (
		<View>
			<Text>{error}</Text>
		</View>
	);
};
