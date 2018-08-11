import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, buttonSmall }) => {
	let { buttonStyle, textStyle } = styles;

	if (buttonSmall) {
		buttonStyle = { ...buttonStyle, padding: 1 };
	}

	return (
		<TouchableOpacity onPress={onPress} style={buttonStyle}>
			<Text style={textStyle}>{children}</Text>
		</TouchableOpacity>
	);
};

let styles = {
	buttonStyle: {
		backgroundColor: '#fff',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#007aff',
		padding: 10,
		marginRight: 10,
		marginLeft: 10
	},
	textStyle: {
		alignSelf: 'center',
		color: '#007aff',
		fontSize: 16,
		fontWeight: '600',
		paddingTop: 4,
		paddingBottom: 4
	}
};

export { Button };
