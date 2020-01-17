import { createSwitchNavigator } from 'react-navigation';
import AuthLoading from './AuthLoading';
import Registration from './Registration';
import Login from './Login';
import { AuthNavigation } from './constants';

const navigator = createSwitchNavigator(
  { AuthLoading, Registration, Login },
  { initialRouteName: AuthNavigation.AUTH_LOADING },
);

export default navigator;
