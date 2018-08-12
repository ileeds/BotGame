import React from 'react';
import { View } from 'react-native';
import { CardSection } from './common';
import { backgroundColor } from '../appUtils/puppet';

const InviteFriendsBody = () => {
	return (
		<View style={{ flex: 1, backgroundColor }}>
			<CardSection />
			<CardSection />
			<View style={{ flex: 0.5 }} />
		</View>
	);
};

export default InviteFriendsBody;
