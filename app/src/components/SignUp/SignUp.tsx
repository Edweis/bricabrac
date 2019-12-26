import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { facebookLogin, emailLogin, googleLogin, IS_DEV } from '../../firebase';
import { useLastEmail } from './hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: { marginTop: 16, width: '50%' },
});

const iconName = IS_DEV ? 'ios-bug' : 'ios-information-circle';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef<Input>(null);
  const focusPassword = () =>
    passwordInputRef.current && passwordInputRef.current.focus();
  useLastEmail(lastEmail => {
    setEmail(lastEmail);
    focusPassword();
  });

  return (
    <View style={styles.container}>
      <Input
        label="email"
        value={email}
        onChangeText={setEmail}
        autoCompleteType="email"
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={focusPassword}
        selectTextOnFocus
      />
      <Input
        label="password"
        value={password}
        onChangeText={setPassword}
        autoCompleteType="password"
        secureTextEntry
        ref={passwordInputRef}
        onSubmitEditing={() => emailLogin(email, password)}
        selectTextOnFocus
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
