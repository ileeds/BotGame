import React from 'react';
import { Text, View } from 'react-native';

const Header = ({ children, headerText }) => {
	let { textStyle, viewStyle, childrenContainerStyle } = styles;
	if (!children) {
		viewStyle = { ...viewStyle, flexDirection: 'column' };
		textStyle = { ...textStyle, marginTop: 10 };
	}
	return (
		<View style={viewStyle}>
			<Text style={textStyle}>{headerText}</Text>
			<View style={childrenContainerStyle}>{children}</View>
		</View>
	);
};

const styles = {
	viewStyle: {
		backgroundColor: '#F8F8F8',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 60,
		paddingTop: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative',
		flexDirection: 'row'
	},
	textStyle: {
		fontSize: 20,
		marginLeft: 20,
		marginRight: 20
	},
	childrenContainerStyle: {
		width: '30%',
		marginRight: 10
	}
};

export { Header };
