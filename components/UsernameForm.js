import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { setUsername } from '../actions';

class UsernameForm extends Component {
	state = { username: '' };

	render() {
		return (
			<View>
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

export default connect(
	null,
	{ setUsername }
)(UsernameForm);
