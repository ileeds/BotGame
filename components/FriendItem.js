import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, TouchableOpacity } from 'react-native';
import { ListItem, Text } from 'native-base';
import { invite } from '../actions/network_actions';

class FriendsItem extends Component {
	renderIcon() {
		if (this.props.invites.includes(this.props.dbDigit)) {
			return (
				<Image
					source={require('../assets/icons8-historical-filled-50.png')}
					style={{ width: 24, height: 24 }}
				/>
			);
		}
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.invite(this.props.dbDigit);
				}}
			>
				<Image
					source={require('../assets/icons8-add-user-male-50.png')}
					style={{ width: 24, height: 24 }}
				/>
			</TouchableOpacity>
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

const mapStateToProps = ({ network }) => {
	const { invites } = network;
	return { invites };
};

export default connect(
	mapStateToProps,
	{ invite }
)(FriendsItem);
