import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PhoneInput from 'react-native-phone-input';
import { getCode } from '../actions';
import { renderErrorAndLoading } from '../appUtils/renderFunctions';
import ButtonLarge from './ButtonLarge';
import { CardSection } from './common';
import { backgroundColor } from '../appUtils/puppet';

class SignUpForm extends Component {
	state = { phone: this.props.phone };

	componentDidMount() {
		this.phone.focus();
	}

	render() {
		const { textStyle, phoneInputStyle } = styles;
		return (
			<View style={{ backgroundColor, flex: 1 }}>
				<View style={{ flex: 0.5 }} />
				<CardSection>
					<PhoneInput
						ref={ref => {
							this.phone = ref;
						}}
						pickerItemStyle={{ fontSize: 30 }}
						textStyle={textStyle}
						flagStyle={{ width: 100, height: 60, borderWidth: 0 }}
						onChangePhoneNumber={phone => this.setState({ phone })}
						value={this.state.phone}
						style={phoneInputStyle}
					/>
				</CardSection>

				<CardSection>
					<ButtonLarge
						text="Submit"
						onPress={() => {
							this.props.getCode(
								String(this.state.phone).replace(/[^\d]/g, '')
							);
						}}
					/>
				</CardSection>

				{renderErrorAndLoading(this.props.error, this.props.loading)}
				<View style={{ flex: 2 }} />
			</View>
		);
	}
}

const styles = {
	textStyle: {
		fontSize: 30,
		color: 'white',
		height: 100,
		letterSpacing: 3
	},
	phoneInputStyle: {
		position: 'relative',
		marginRight: 20,
		marginLeft: 20
	}
};

const mapStateToProps = ({ auth }) => {
	const { phone, error, loading } = auth;
	return { phone, error, loading };
};

export default connect(
	mapStateToProps,
	{ getCode }
)(SignUpForm);
