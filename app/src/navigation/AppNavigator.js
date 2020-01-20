import React, { useRef, useEffect } from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  NavigationActions,
} from 'react-navigation';
import Main from './MainTabNavigator';
import AuthNavigator from '../screens/Authentification';
import { useFirestoreAuth } from '../hooks/authentification';

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    { Main, AuthNavigator },
    { initialRouteName: 'AuthNavigator' },
  ),
);

export default () => {
  const navigatorRef = useRef(null);
  const authUser = useFirestoreAuth();
  useEffect(() => {
    if (navigatorRef) {
      const routeName = authUser == null ? 'AuthNavigator' : 'Main';
      const action = NavigationActions.navigate({ routeName });
      navigatorRef.current.dispatch(action);
    }
  }, [authUser]);
  return <AppNavigator ref={navigatorRef} />;
};
