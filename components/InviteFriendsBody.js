import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { Contacts } from 'expo';
import { CardSection, Spinner } from './common';

class InviteFriendsBody extends Component {
	state = {
		isReady: false,
		data: {}
	};

	async componentWillMount() {
		const alphaData = {
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
				return (
					<ListItem style={{ flex: 1 }} key={id}>
						<Text style={{ flex: 1 }}>{name}</Text>
						<Text style={{ flex: 1 }}>{dbDigit}</Text>
						<Image
							source={require('../assets/icons8-add-user-male-50.png')}
							style={{ width: 24, height: 24 }}
						/>
					</ListItem>
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
				<Container>
					<Content>
						<List>{this.renderContacts()}</List>
					</Content>
				</Container>
			</View>
		);
	}
}

export default InviteFriendsBody;
