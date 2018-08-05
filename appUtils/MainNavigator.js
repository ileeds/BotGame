import {
	createBottomTabNavigator,
	createStackNavigator
} from 'react-navigation';

import AddFriends from '../screens/AddFriends';
import Anonymous from '../screens/Anonymous';
import EnterCode from '../screens/EnterCode';
import Home from '../screens/Home';
import InviteFriends from '../screens/InviteFriends';
import Lobby from '../screens/Lobby';
import NonAnonymous from '../screens/NonAnonymous';
import Result from '../screens/Result';
import Splash from '../screens/Splash';
import SendCode from '../screens/SendCode';
import Username from '../screens/Username';

export default createStackNavigator(
	{
		splash: Splash,
		start: createBottomTabNavigator(
			{
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
			},
			{
				navigationOptions: {
					tabBarVisible: false
				}
			}
		)
	},
	{
		headerMode: 'none'
	}
);
