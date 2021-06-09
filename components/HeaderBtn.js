import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButton } from 'react-navigation-header-buttons';

import Colors from '../constants/Colors';

const HeaderBtn = props => (
	<HeaderButton
		{...props}
		IconComponent={Ionicons}
		iconSize={24}
		color={
			Platform.OS === 'android' ? (
				'#fff'
			) : (
				Colors.primary
			)
		}
	/>
);

export default HeaderBtn;
