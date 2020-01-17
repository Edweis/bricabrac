import { useContext } from 'react';
import { NavigationContext } from 'react-navigation';
import { NavigationProp as _NavigationProp } from '../constants/types';

export const useNavigation = () => useContext(NavigationContext);
export type NavigationOptionsProps = { navigation: _NavigationProp };
export type NavigationProp = _NavigationProp;
