import React, { Component } from 'react';
import { View, Button, Platform } from 'react-native';
import InviteFriendsBody from '../components/InviteFriendsBody';

class InviteFriends extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Invite',
			headerLeft: (
				<Button
					title="< Friends"
					color="#017BFF"
					onPress={() => navigation.navigate('friends')}
				/>
			),
			style: {
				marginTop: Platform.OS === 'android' ? 24 : 0
			}
		};
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<InviteFriendsBody />
			</View>
		);
	}
}

export default InviteFriends;
