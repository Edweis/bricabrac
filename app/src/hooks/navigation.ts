import { useContext } from 'react';
import {
  NavigationContext,
  NavigationScreenProp,
  NavigationRoute,
} from 'react-navigation';

export const useNavigation = () => useContext(NavigationContext);
export type NavigationProp = NavigationScreenProp<NavigationRoute>;
