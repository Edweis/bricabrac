// @flow
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import BrickMaker from '../screens/BrickMaker';
import ConceptList from '../screens/ConceptList';
import ConceptBrickList from '../screens/BrickMaker/ConceptBrickList';
import SourceList from '../screens/BrickMaker/SourceList';

import TimerScreen from '../screens/Timer';

const config = Platform.select({
  web: { headerMode: 'screen' },
  initialRouteName: 'ConceptList',
  default: {}
});
// import { NavigationState, NavigationScreenProp } from 'react-navigation';
// export const type NavigationProps = { navigation: NavigationScreenProp<NavigationState> };

const BrickNavigator = createStackNavigator(
  {
    ConceptList,
    BrickMaker,
    ConceptBrickList,
    SourceList
  },
  config
);

const TimerNavigator = createStackNavigator(
  {
    TimerScreen,
    ConceptList,
    BrickMaker,
    SourceList
  },
  { initialRouteName: 'TimerScreen' }
);

const TabNavigator = createBottomTabNavigator({
  Bricks: BrickNavigator,
  Timer: TimerNavigator
});

export default TabNavigator;
