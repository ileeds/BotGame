import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
	createBottomTabNavigator,
	createStackNavigator
} from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './store';
import { verifyAuth } from './actions';

import AddFriends from './screens/AddFriends';
import Anonymous from './screens/Anonymous';
import EnterCode from './screens/EnterCode';
import Home from './screens/Home';
import InviteFriends from './screens/InviteFriends';
import Lobby from './screens/Lobby';
import NonAnonymous from './screens/NonAnonymous';
import Result from './screens/Result';
import Splash from './screens/Splash';
import SendCode from './screens/SendCode';
import Username from './screens/Username';

export default class App extends React.Component {
	render() {
		const { persistor, store } = configureStore();
		store.dispatch(verifyAuth());

		const MainNavigator = createStackNavigator(
			{
				splash: Splash,
				start: createBottomTabNavigator({
					sendCode: SendCode,
					enterCode: EnterCode,
					username: Username,
					main: createBottomTabNavigator({
						home: Home,
						inviteFriends: InviteFriends,
						addFriends: AddFriends,
						lobby: Lobby,
						game: createBottomTabNavigator({
							anonymous: Anonymous,
							nonAnonymous: NonAnonymous,
							result: Result
						})
					})
				})
			},
			{
				headerMode: 'none'
			}
		);

		return (
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<View style={styles.container}>
						<MainNavigator />
					</View>
				</PersistGate>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'space-around'
	}
});
