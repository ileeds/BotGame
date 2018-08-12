import React, { Component } from 'react';
import { View, Button, Platform } from 'react-native';
import FriendsBody from '../components/FriendsBody';

class Friends extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Friends',
			headerRight: (
				<Button
					title="Invite >"
					color="#017BFF"
					onPress={() => navigation.navigate('inviteFriends')}
				/>
			),
			headerLeft: (
				<Button
					title="< Home"
					color="#017BFF"
					onPress={() => navigation.navigate('home')}
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
				<FriendsBody />
			</View>
		);
	}
}

export default Friends;
