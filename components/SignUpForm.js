import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { getCode } from '../actions';
import { renderErrorAndLoading } from '../appUtils/renderFunctions';

class SignUpForm extends Component {
	state = { phone: '' };

	render() {
		return (
			<View>
				{renderErrorAndLoading(this.props.error, this.props.loading)}
				<View style={{ marginBottom: 10 }}>
					<FormLabel>Enter Phone Number</FormLabel>
					<FormInput
						value={this.state.phone}
						onChangeText={phone => this.setState({ phone })}
						keyboardType={'phone-pad'}
					/>
				</View>
				<Button
					onPress={() => this.props.getCode(this.state.phone)}
					title="Submit"
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { error, loading } = auth;
	return { error, loading };
};

export default connect(
	mapStateToProps,
	{ getCode }
)(SignUpForm);
