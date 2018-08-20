import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, List, ListItem, Text } from 'native-base';
import { Contacts } from 'expo';
import PhoneInput from 'react-native-phone-input';
import { CardSection, Spinner } from './common';
import FriendItem from './FriendItem';
import InviteFriendButton from './InviteFriendButton';
import { invite, getInvites } from '../actions/network_actions';

class InviteFriendsBody extends Component {
	state = {
		isReady: false,
		data: {},
		phone: null
	};

	async componentWillMount() {
		this.props.getInvites();

		let alphaData = {
			A: [],
			B: [],
			C: [],
			D: [],
			E: [],
			F: [],
			G: [],
			H: [],
			I: [],
			J: [],
			K: [],
			L: [],
			M: [],
			N: [],
			O: [],
			P: [],
			Q: [],
			R: [],
			S: [],
			T: [],
			U: [],
			V: [],
			W: [],
			X: [],
			Y: [],
			Z: []
		};

		const { data } = await Contacts.getContactsAsync({
			fields: [Contacts.Fields.PhoneNumbers]
		});

		data.map(({ name, phoneNumbers, id }) => {
			if (name && phoneNumbers) {
				const char = name.charAt(0).toUpperCase();
				if (char.match(/[a-z]/i)) {
					alphaData[char].push({
						name,
						id,
						digits: phoneNumbers[0].digits
					});
				}
			}
		});

		for (let val in alphaData) {
			alphaData[val].sort((a, b) => {
				var nameA = a.name;
				var nameB = b.name;
				return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
			});
		}

		this.setState({ data: alphaData, isReady: true });
	}

	renderContacts() {
		return Object.entries(this.state.data).map(([key, value]) => {
			return this.renderKeyAndValue(key, value);
		});
	}

	renderKeyAndValue(key, value) {
		return (
			<View key={key} style={{ flex: 1 }}>
				<ListItem itemDivider>
					<Text>{key}</Text>
				</ListItem>
				{this.renderFriends(value)}
			</View>
		);
	}

	renderFriends(value) {
		return value.map(contact => {
			const { name, id, digits } = contact;
			let dbDigit = String(digits).replace(/[^\d]/g, '');
			dbDigit = dbDigit.length < 11 ? `1${dbDigit}` : dbDigit;

			if (dbDigit.length == 11) {
				if (this.props.invites.includes(dbDigit)) {
					return (
						<FriendItem
							key={id}
							name={name}
							dbDigit={dbDigit}
							status={'invited'}
						/>
					);
				}
				return (
					<FriendItem key={id} name={name} dbDigit={dbDigit} status={'none'} />
				);
			}
		});
	}

	render() {
		if (!this.state.isReady) {
			return (
				<View style={{ flex: 1 }}>
					<Spinner size={'large'} />
				</View>
			);
		}
		return (
			<View style={{ flex: 1 }}>
				<CardSection style={{ flex: 1 }}>
					<PhoneInput
						onPressFlag={() => {}}
						onChangePhoneNumber={phone => this.setState({ phone })}
						value={this.state.phone}
						textStyle={{ fontSize: 15 }}
						style={{
							position: 'relative',
							marginRight: 20,
							marginLeft: 20
						}}
					/>
					<InviteFriendButton
						style={{ marginRight: 40 }}
						onPress={() => {
							this.props.invite(String(this.state.phone).replace(/[^\d]/g, ''));
							this.props.getInvites();
						}}
					/>
				</CardSection>
				<Container style={{ flex: 6 }}>
					<Content>
						<List>{this.renderContacts()}</List>
					</Content>
				</Container>
			</View>
		);
	}
}

const mapStateToProps = ({ network }) => {
	const { invites } = network;
	return { invites };
};

export default connect(
	mapStateToProps,
	{ invite, getInvites }
)(InviteFriendsBody);
