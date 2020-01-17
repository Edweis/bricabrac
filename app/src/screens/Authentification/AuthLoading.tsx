import React, { useEffect } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { onAuthChange } from '../../firebase';
import { StorageKey, store } from '../../storage';
import colors from '../../constants/colors';
import { useNavigation } from '../../hooks/navigation';
import { AuthNavigation } from './constants';

const Rooter = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const subscriber = onAuthChange(newUser => {
      if (newUser && newUser.email) store(StorageKey.EMAIL, newUser.email);
      console.debug('onAuthChange', newUser);
      navigation.navigate(newUser == null ? AuthNavigation.LOGIN : 'Main');
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View>
      <ActivityIndicator color={colors.orange} size="large" />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default Rooter;
