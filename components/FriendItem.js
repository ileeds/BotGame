import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { ListItem, Text } from 'native-base';
import { invite, getInvites } from '../actions/network_actions';
import InviteFriendButton from './InviteFriendButton';

class FriendsItem extends Component {
	renderIcon() {
		if (this.props.status === 'invited') {
			return (
				<Image
					source={require('../assets/icons8-historical-filled-50.png')}
					style={{ width: 24, height: 24 }}
				/>
			);
		}
		return (
			<InviteFriendButton
				onPress={() => {
					this.props.invite(this.props.dbDigit);
					this.props.getInvites();
				}}
			/>
		);
	}

	render() {
		return (
			<ListItem style={{ flex: 1 }}>
				<Text style={{ flex: 1 }}>{this.props.name}</Text>
				<Text style={{ flex: 1 }}>{this.props.dbDigit}</Text>
				{this.renderIcon()}
			</ListItem>
		);
	}
}

export default connect(
	null,
	{ invite, getInvites }
)(FriendsItem);
