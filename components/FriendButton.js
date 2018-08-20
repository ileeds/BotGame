import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const FriendButton = ({ onPress, status, style }) => {
	if (status === 'invite') {
		return (
			<TouchableOpacity onPress={onPress}>
				<Image
					style={[style, styles.containerStyle]}
					source={require('../assets/icons8-invite-96.png')}
				/>
			</TouchableOpacity>
		);
	} else {
		return (
			<TouchableOpacity onPress={onPress}>
				<Image
					style={[style, styles.containerStyle]}
					source={require('../assets/icons8-add-user-male-52.png')}
				/>
			</TouchableOpacity>
		);
	}
};

const styles = {
	containerStyle: {
		width: 24,
		height: 24
	}
};

export default FriendButton;
