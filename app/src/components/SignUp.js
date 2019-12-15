import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { facebookLogin, emailLogin, googleLogin } from '../firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: { marginTop: 16, width: '50%' },
});

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
    </View>
  );
}
