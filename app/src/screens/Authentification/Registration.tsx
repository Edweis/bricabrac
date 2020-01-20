import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Registration = () => (
  <View style={styles.container}>
    <Text>Registration Component</Text>
  </View>
);

Registration.navigationOptions = () => {
  return {
    title: 'Créer un compte',
  };
};
export default Registration;
