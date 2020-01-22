import React, { useState, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import ElasticView from '../ElasticView';
import { useFocusOnMount } from '../../../hooks/helpers';
import { checkRegistration } from './helpers';
import { register } from '../../../firebase';
import { RegistrationT } from '../../../constants/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: { marginTop: 16, width: '50%' },
});

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const submit = async () => {
    const registration: RegistrationT = {
      email,
      password,
      passwordConfirmation,
    };
    try {
      checkRegistration(registration);
      setErrorMessage(null);
      await register(registration);
    } catch (err) {
      console.warn(err);
      setErrorMessage(err.message);
    }
  };

  const focusOnMountRef = useFocusOnMount<Input>();
  const passwordRef = useRef<Input>(null);
  const passwordConfirmationRef = useRef<Input>(null);
  const focusPassword = () =>
    passwordRef.current && passwordRef.current.focus();
  const focusPasswordConfirmation = () =>
    passwordConfirmationRef.current && passwordConfirmationRef.current.focus();

  return (
    <ElasticView contentContainerStyle={styles.container}>
      <Input
        label="email"
        value={email}
        onChangeText={setEmail}
        autoCompleteType="email"
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="next"
        ref={focusOnMountRef}
        onSubmitEditing={focusPassword}
        selectTextOnFocus
      />
      <Input
        label="password"
        value={password}
        onChangeText={setPassword}
        autoCompleteType="password"
        secureTextEntry
        ref={passwordRef}
        onSubmitEditing={focusPasswordConfirmation}
        selectTextOnFocus
        returnKeyType="next"
      />
      <Input
        label="password confirmation"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        autoCompleteType="password"
        secureTextEntry
        ref={passwordConfirmationRef}
        onSubmitEditing={submit}
        selectTextOnFocus
      />
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <Button
        containerStyle={styles.button}
        title="Créer le compte et se connecter"
        onPress={submit}
      />
    </ElasticView>
  );
};

Registration.navigationOptions = () => ({ title: 'Créer un compte' });
export default Registration;
