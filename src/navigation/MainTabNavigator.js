import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, NavigationState, NavigationScreenProp } from 'react-navigation';

import BrickMaker from '../screens/BrickMaker';
import BrickList from '../screens/BrickList';

const config = Platform.select({
  web: { headerMode: 'screen' },
  initialRouteName: 'BrickList',
  default: {},
});

const NavigationProps = {}; // { navigation: NavigationScreenProp<NavigationState> };

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
//   ),
// };
//
// SettingsStack.path = '';

const AppNavigator = createStackNavigator(
  {
    BrickList,
    BrickMaker,
  },
  config,
);

export default AppNavigator;
