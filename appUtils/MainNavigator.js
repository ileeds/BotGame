import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { getInitialScreen } from '../actions';
import NavigationService from './NavigationService';

import Friends from '../screens/Friends';
import Anonymous from '../screens/Anonymous';
import EnterCode from '../screens/EnterCode';
import Home from '../screens/Home';
import InviteFriends from '../screens/InviteFriends';
import Lobby from '../screens/Lobby';
import NonAnonymous from '../screens/NonAnonymous';
import Result from '../screens/Result';
import Splash from '../screens/Splash';
import GetCode from '../screens/GetCode';
import Username from '../screens/Username';

const Nav = createStackNavigator(
	{
		splash: Splash,
		getCode: GetCode,
		enterCode: EnterCode,
		username: Username,
		home: Home,
		friends: Friends,
		inviteFriends: InviteFriends,
		lobby: Lobby,
		anonymous: Anonymous,
		nonAnonymous: NonAnonymous,
		result: Result
	},
	{
		navigationOptions: {
			tabBarVisible: false,
			gesturesEnabled: false
		},
		headerMode: 'none'
	}
);

class MainNavigator extends React.Component {
	componentDidMount() {
		this.props.getInitialScreen();
	}

	render() {
		return (
			<Nav
				ref={navigatorRef => {
					NavigationService.setTopLevelNavigator(navigatorRef);
				}}
			/>
		);
	}
}

export default connect(
	null,
	{ getInitialScreen }
)(MainNavigator);
