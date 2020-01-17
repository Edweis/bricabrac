import { useContext } from 'react';
import { NavigationContext } from 'react-navigation';

export { NavigationProp } from '../constants/types';
export const useNavigation = () => useContext(NavigationContext);
