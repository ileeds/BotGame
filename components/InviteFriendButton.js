import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const InviteFriendButton = ({ onPress, style }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Image
				style={[style, styles.containerStyle]}
				source={require('../assets/icons8-add-user-male-50.png')}
			/>
		</TouchableOpacity>
	);
};

const styles = {
	containerStyle: {
		width: 24,
		height: 24
	}
};

export default InviteFriendButton;
