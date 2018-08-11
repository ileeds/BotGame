import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { getCode } from '../actions';
import { renderErrorAndLoading } from '../appUtils/renderFunctions';
import { CardSection, Input, Button } from './common';

class SignUpForm extends Component {
	state = { phone: this.props.phone };

	render() {
		return (
			<View>
				<CardSection>
					<Input
						label="Phone"
						placeholder="111-111-1111"
						onChangeText={phone => this.setState({ phone })}
						value={this.state.phone}
						keyboardType={'phone-pad'}
					/>
				</CardSection>

				<Button
					onPress={() => {
						this.props.getCode(this.state.phone);
					}}
				>
					Submit
				</Button>

				{renderErrorAndLoading(this.props.error, this.props.loading)}
			</View>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { phone, error, loading } = auth;
	return { phone, error, loading };
};

export default connect(
	mapStateToProps,
	{ getCode }
)(SignUpForm);
