import React from 'react';
import { View, Image } from 'react-native';
import ButtonLarge from './ButtonLarge';
import NavigationService from '../appUtils/NavigationService';
import { CardSection } from './common';
import { backgroundColor } from '../appUtils/puppet';

const HomeBody = () => {
	const {
		logoContainerStyle,
		imageStyle,
		availableContainerStyle,
		unavailableContainerStyle,
		donateContainerStyle
	} = styles;
	return (
		<View style={{ flex: 1, backgroundColor }}>
			<CardSection style={logoContainerStyle}>
				<Image style={imageStyle} source={require('../assets/logo.png')} />
			</CardSection>
			<CardSection style={availableContainerStyle}>
				<ButtonLarge
					onPress={() => NavigationService.navigate('inviteFriends')}
					text="Local Play"
				/>
			</CardSection>
			<CardSection style={unavailableContainerStyle}>
				<ButtonLarge text="Online Play" />
			</CardSection>
			<CardSection style={donateContainerStyle}>
				<ButtonLarge text="Donate" />
			</CardSection>
			<View style={{ flex: 0.5, backgroundColor }} />
		</View>
	);
};

const styles = {
	logoContainerStyle: {
		flex: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageStyle: { width: 200, height: 200 },
	availableContainerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	unavailableContainerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	donateContainerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
};

export default HomeBody;
