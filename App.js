import React from 'react';
import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/reducers/places';
import { init } from './helpers/db';

init()
	.then(() => console.log('initialized db'))
	.catch(() => console.log('db initialization failed'));

const store = createStore(
	placesReducer,
	applyMiddleware(ReduxThunk)
);

export default function App() {
	return (
		<Provider store={store}>
			<PlacesNavigator />
		</Provider>
	);
}
