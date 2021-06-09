import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Colors from '../constants/Colors';

import PlacesList from '../screens/PlacesList';
import PlaceDetails from '../screens/PlaceDetails';
import NewPlace from '../screens/NewPlace';
import Map from '../screens/Map';

const Navigator = createStackNavigator(
	{
		Places       : PlacesList,
		PlaceDetails,
		NewPlace,
		Map
	},
	{
		defaultNavigationOptions : {
			headerStyle     : {
				backgroundColor :
					Platform.OS === 'android'
						? Colors.primary
						: ''
			},
			headerTintColor :
				Platform.OS === 'android'
					? '#fff'
					: Colors.primary
		}
	}
);

export default createAppContainer(Navigator);
