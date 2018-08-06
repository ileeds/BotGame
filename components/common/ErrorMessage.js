import React from 'react';
import { Text } from 'react-native';

const ErrorMessage = ({ error }) => {
	return <Text style={styles.errorTextStyle}>{error}</Text>;
};

const styles = {
	errorTextStyle: {
		alignSelf: 'center',
		color: 'red'
	}
};

export { ErrorMessage };
