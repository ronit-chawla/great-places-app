import React, {
	useEffect,
	useState,
	useCallback
} from 'react';
import {
	StyleSheet,
	Platform,
	FlatList,
	RefreshControl
} from 'react-native';
import {
	HeaderButtons,
	Item
} from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderBtn from '../components/HeaderBtn';
import PlaceItem from '../components/PlaceItem';
import { loadPlaces } from '../store/actions/places';

const PlacesList = ({ navigation }) => {
	const [
		isRefreshing,
		setIsRefreshing
	] = useState(false);
	const places = useSelector(state => state.places);
	const dispatch = useDispatch();
	const fetchPlaces = useCallback(
		async () => {
			setIsRefreshing(true);
			await dispatch(loadPlaces());
			setIsRefreshing(false);
		},
		[
			dispatch,
			setIsRefreshing
		]
	);
	useEffect(
		() => {
			fetchPlaces();
		},
		[
			dispatch
		]
	);

	return (
		<FlatList
			refreshControl={
				<RefreshControl
					onRefresh={fetchPlaces}
					refreshing={isRefreshing}
				/>
			}
			data={places}
			renderItem={data => (
				<PlaceItem
					{...data.item}
					onSelect={() =>
						navigation.navigate(
							'PlaceDetails',
							{
								id    : data.item.id,
								title : data.item.title
							}
						)}
				/>
			)}
		/>
	);
};

PlacesList.navigationOptions = ({ navigation }) => ({
	headerTitle : 'All Places',
	headerRight : () => (
		<HeaderButtons HeaderButtonComponent={HeaderBtn}>
			<Item
				title="Add Place"
				iconName={
					Platform.OS === 'android' ? (
						'md-add'
					) : (
						'ios-add'
					)
				}
				onPress={() =>
					navigation.navigate('NewPlace')}
			/>
		</HeaderButtons>
	)
});

export default PlacesList;

const styles = StyleSheet.create({});
