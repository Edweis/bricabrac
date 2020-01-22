import { createStackNavigator } from 'react-navigation';
import Registration from './Registration';
import Login from './Login';
import { AuthNavigation } from './constants';

const navigator = createStackNavigator(
  { Registration, Login },
  { initialRouteName: AuthNavigation.LOGIN },
);

export default navigator;
