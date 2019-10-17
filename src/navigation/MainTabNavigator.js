// @flow
import { Platform } from 'react-native';
import {
  createStackNavigator,
  NavigationState,
  NavigationScreenProp
} from 'react-navigation';

import BrickMaker from '../screens/BrickMaker';
import ConceptList from '../screens/ConceptList';
import ConceptBrickList from '../screens/ConceptBrickList';
import BrickDetails from '../screens/BrickDetails';

const config = Platform.select({
  web: { headerMode: 'screen' },

  initialRouteName: 'ConceptList',
  default: {}
});
// export const type NavigationProps = { navigation: NavigationScreenProp<NavigationState> };

const AppNavigator = createStackNavigator(
  {
    ConceptList,
    BrickMaker,
    ConceptBrickList,
    BrickDetails,
  },
  config
);

export default AppNavigator;
