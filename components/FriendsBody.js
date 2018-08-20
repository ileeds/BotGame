import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
	Container,
	Content,
	Header,
	List,
	ListItem,
	Tab,
	Tabs
} from 'native-base';
import { CardSection } from './common';
import { backgroundColor } from '../appUtils/puppet';

class FriendsBody extends Component {
	renderInvitations() {}

	renderSentInvites() {}

	renderFriends() {}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Container style={{ flex: 1 }}>
					<Header style={{ flex: 1 }} hasTabs />
					<Tabs style={{ flex: 10 }}>
						<Tab heading="Friend Invites">
							<Content>
								<List>{this.renderInvitations()}</List>
							</Content>
						</Tab>
						<Tab heading="Sent Invites">
							<Content>
								<List>{this.renderSentInvites()}</List>
							</Content>
						</Tab>
						<Tab heading="Friends">
							<Content>
								<List>{this.renderFriends()}</List>
							</Content>
						</Tab>
					</Tabs>
				</Container>
			</View>
		);
	}
}

const mapStateToProps = ({ network }) => {
	const { invites } = network;
	return { invites };
};

export default connect(mapStateToProps)(FriendsBody);
