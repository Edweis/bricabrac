import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from '../screens/Authentification';

export default createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      AuthLoading: AuthNavigator,
    },
    { initialRouteName: 'AuthLoading' },
  ),
);
