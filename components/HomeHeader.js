import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../appUtils/NavigationService';
import { Header, Button } from './common';

class HomeHeader extends Component {
	render() {
		return (
			<Header headerText={'Welcome, ' + this.props.username + '!'}>
				<Button
					onPress={() => NavigationService.navigate('friends')}
					buttonSmall
				>
					Friends >
				</Button>
			</Header>
		);
	}
}

const styles = {
	textStyle: {
		textAlign: 'center',
		flex: 1,
		color: 'white',
		fontSize: 16
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
