import React from 'react';
import { View, Image } from 'react-native';
import { renderButton } from '../appUtils/renderFunctions';
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
		<View style={{ flex: 1 }}>
			<CardSection style={logoContainerStyle}>
				<Image style={imageStyle} source={require('../assets/logo.png')} />
			</CardSection>
			<CardSection style={availableContainerStyle}>
				{renderButton('Local Play')}
			</CardSection>
			<CardSection style={unavailableContainerStyle}>
				{renderButton('Online Play')}
			</CardSection>
			<CardSection style={donateContainerStyle}>
				{renderButton('Donate')}
			</CardSection>
			<View style={{ flex: 0.5, backgroundColor }} />
		</View>
	);
};

const styles = {
	logoContainerStyle: {
		flex: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor
	},
	imageStyle: { width: 200, height: 200 },
	availableContainerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor
	},
	unavailableContainerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor
	},
	donateContainerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor
	}
};

export default HomeBody;
