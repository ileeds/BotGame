import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../appUtils/NavigationService';
import { renderButton } from '../appUtils/renderFunctions';
import { Header, Button } from './common';
import { backgroundColor } from '../appUtils/puppet';

class HomeHeader extends Component {
	render() {
		const { headerStyle, textStyle, buttonStyle } = styles;
		return (
			<Header
				style={headerStyle}
				headerText={'Welcome, ' + this.props.username + '!'}
			>
				{renderButton(
					'Friends >',
					() => NavigationService.navigate('friends'),
					{
						textStyle,
						buttonStyle
					}
				)}
			</Header>
		);
	}
}

const styles = {
	headerStyle: { fontWeight: 'bold' },
	textStyle: {
		fontSize: 20,
		color: '#4CB9E6',
		fontWeight: 'normal'
	},
	buttonStyle: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		alignSelf: 'flex-end',
		marginRight: 5
	}
};

const mapStateToProps = ({ auth }) => {
	const { username } = auth;
	return { username };
};

export default connect(
	mapStateToProps,
	null
)(HomeHeader);
