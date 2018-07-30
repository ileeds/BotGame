import React, { Component } from 'react';
import { View } from 'react-native';
import requireAuth from '../components/requireAuth';

class InviteFriends extends Component {
	render() {
		return <View />;
	}
}

export default requireAuth(InviteFriends);
