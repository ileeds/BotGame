import React, { Component } from 'react';
import { Text } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';

class HomeHeader extends Component {
	render() {
		return (
			<Header>
				<Text style={styles.textStyle}>Welcome, {this.props.username}!</Text>
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
