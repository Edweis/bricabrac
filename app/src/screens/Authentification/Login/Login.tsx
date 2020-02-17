import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import ElasticView from '../ElasticView';
import { emailLogin, IS_DEV } from '../../../firebase';
import { useNavigation } from '../../../hooks/navigation';

import { useLastEmail } from './hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: { marginTop: 16, width: '50%' },
  scrollContainer: { flex: 1 },
});

const iconName = IS_DEV ? 'ios-bug' : 'ios-information-circle';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef<Input>(null);
  const navigation = useNavigation();
  const focusPassword = () =>
    passwordInputRef.current && passwordInputRef.current.focus();

  useLastEmail(lastEmail => {
    setEmail(lastEmail);
    focusPassword();
  });

  return (
    <ElasticView contentContainerStyle={styles.container}>
      <Input
        label="email"
        value={email}
        onChangeText={text => setEmail(text.trim())}
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
        type="clear"
      />
      <Button
        containerStyle={styles.button}
        title="Créer compte"
        onPress={() => navigation.navigate('Registration', { email })}
        type="clear"
      />
      <Icon name={iconName} type="ionicon" />
    </ElasticView>
  );
}

Login.navigationOptions = {
  title: 'Login',
};

export default Login;
