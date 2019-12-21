import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { facebookLogin, emailLogin, googleLogin, IS_DEV } from '../firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: { marginTop: 16, width: '50%' },
});

const iconName = IS_DEV ? 'ios-bug' : 'ios-information';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Input
        label="email"
        value={email}
        onChangeText={setEmail}
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <Input
        label="password"
        value={password}
        onChangeText={setPassword}
        autoCompleteType="password"
      />
      <Button
        containerStyle={styles.button}
        title="Se connecter"
        onPress={() => emailLogin(email, password)}
      />
      <Button
        containerStyle={styles.button}
        title="Facebook Login"
        onPress={() => facebookLogin()}
      />
      <Button
        containerStyle={styles.button}
        title="Google Login"
        onPress={() => googleLogin()}
      />
      <Icon name={iconName} type="ionicon" />
    </View>
  );
}
