// @flow
import React from 'react';
import { Icon } from 'react-native-elements';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import colors from '../constants/colors';
import BrickMaker from '../screens/BrickMaker';
import ConceptList from '../screens/ConceptList';
import ConceptBrickList from '../screens/BrickMaker/ConceptBrickList';
import SourceList from '../screens/BrickMaker/SourceList';
import SettingsNavigator from '../screens/Settings';
import TimerScreen from '../screens/Timer';

const config = Platform.select({
  web: { headerMode: 'screen' },
  initialRouteName: 'ConceptList',
  default: {},
});
// import { NavigationState, NavigationScreenProp } from 'react-navigation';
// export const type NavigationProps = { navigation: NavigationScreenProp<NavigationState> };

const BrickNavigator = createStackNavigator(
  {
    ConceptList,
    BrickMaker,
    ConceptBrickList,
    SourceList,
  },
  config,
);

const TimerNavigator = createStackNavigator(
  {
    TimerScreen,
    ConceptList,
    BrickMaker,
    SourceList,
  },
  { initialRouteName: 'TimerScreen' },
);

const tabNavigatorSettings = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }: { tintColor: string }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Bricks') iconName = `home`;
      else if (routeName === 'Timer') iconName = `timer`;
      else if (routeName === 'Settings') iconName = `settings`;

      // if (focused) iconName = `iconName${focused ? '' : '-outline'}`;
      // You can return any component that you like here!
      return <Icon name={iconName} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: colors.orange,
    inactiveTintColor: colors.black,
  },
};

const TabNavigator = createBottomTabNavigator(
  {
    Bricks: BrickNavigator,
    Timer: TimerNavigator,
    Settings: SettingsNavigator,
  },
  tabNavigatorSettings,
);

export default TabNavigator;
