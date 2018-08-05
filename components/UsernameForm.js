import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { setUsername } from '../actions';
import ErrorMessage from './ErrorMessage';

class UsernameForm extends Component {
	state = { username: '' };

	render() {
		return (
			<View>
				<ErrorMessage error={this.props.error} />
				<View style={{ marginBottom: 10 }}>
					<FormLabel>Enter Username</FormLabel>
					<FormInput
						value={this.state.username}
						onChangeText={username => this.setState({ username })}
					/>
				</View>
				<Button
					onPress={() => this.props.setUsername(this.state.username)}
					title="Submit"
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { error } = auth;
	return { error };
};

export default connect(
	mapStateToProps,
	{ setUsername }
)(UsernameForm);
