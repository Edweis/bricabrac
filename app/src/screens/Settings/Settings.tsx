import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase, { getCurrentUser, logout, IS_DEV } from '../../firebase';
import { useNavigation } from '../../hooks/navigation';
import {
  release,
  emailToAuthor,
  GITHUB_LINK,
  openInWebBrowser,
} from './helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const Settings = () => {
  const user = getCurrentUser();
  const navigation = useNavigation();
  const loginInfo =
    user != null ? `${user.email} - ${user.uid.substring(0, 7)}` : 'null';
  return (
    <View style={styles.container}>
      <View>
        <ListItem
          leftIcon={{ name: release.icon, type: 'ionicon' }}
          title={release.name}
          subtitle={release.description}
          onPress={() => logout(navigation)}
          bottomDivider
        />
        <ListItem
          leftIcon={{ name: 'logo-github', type: 'ionicon' }}
          title="Issues github"
          subtitle="Un problème ? une suggestion ? clique ici !"
          onPress={() => openInWebBrowser(GITHUB_LINK)}
          bottomDivider
        />
        <ListItem
          leftIcon={{ name: 'ios-mail', type: 'ionicon' }}
          title="Contacter l'auteur de cette app"
          subtitle="Feedback ? kapochamo@gmail.com"
          onPress={emailToAuthor}
          bottomDivider
        />
        <ListItem
          leftIcon={{ name: 'ios-log-out', type: 'ionicon' }}
          title="Se deconnecter"
          subtitle={loginInfo}
          onPress={() => firebase.auth().signOut()}
        />
        {IS_DEV && (
          <ListItem
            leftIcon={{ name: 'ion-ios-close-circle', type: 'ionicon' }}
            title="Générer une erreur"
            onPress={() => {
              throw Error('Fake Error');
            }}
          />
        )}
      </View>
    </View>
  );
};

Settings.navigationOptions = { title: 'Paramètres' };

export default Settings;
