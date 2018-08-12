import React from 'react';
import { Text } from 'react-native';
import { Button, ErrorMessage, Spinner } from '../components/common';

export const renderErrorAndLoading = (error, loading) => {
	if (error) {
		return <ErrorMessage error={error} />;
	}
	if (loading) {
		return <Spinner size="large" />;
	}
};

export const renderButton = (text, onPress, changeStyles) => {
	const { buttonStyle, textStyle } = styles;

	let changeButtonStyle,
		changeTextStyle = null;

	if (changeStyles) {
		changeButtonStyle = changeStyles.buttonStyle;
		changeTextStyle = changeStyles.textStyle;
	}

	return (
		<Button style={[buttonStyle, changeButtonStyle]} onPress={onPress}>
			<Text style={[textStyle, changeTextStyle]}>{text}</Text>
		</Button>
	);
};

const styles = {
	buttonStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 20,
		marginRight: 20,
		height: 40
	},
	textStyle: {
		fontSize: 30,
		color: 'white',
		fontWeight: 'bold'
	}
};
