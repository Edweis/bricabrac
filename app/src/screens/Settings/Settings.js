import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Linking } from 'expo';
import firebase, { IS_DEV, getCurrentUser } from '../../firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const GITHUB_LINK = 'https://github.com/Edweis/bricabrac/issues';
const Settings = () => {
  const release = IS_DEV
    ? {
        icon: 'ios-bug',
        name: 'Développement',
        description:
          'La base de developpement ne contient pas tous les éléments de la base de production',
      }
    : {
        icon: 'ios-information',
        name: 'Production',
        description: 'Les changements sont sauvegardé sur le serveur officiel.',
      };
  const user = getCurrentUser();
  const loginInfo = `${user.email} - ${user.uid.substring(0, 7)}`;
  return (
    <View style={styles.container}>
      <View>
        <ListItem
          leftIcon={{ name: release.icon, type: 'ionicon' }}
          title={release.name}
          subtitle={release.description}
          onPress={() => firebase.auth().signOut()}
          bottomDivider
        />
        <ListItem
          leftIcon={{ name: 'logo-github', type: 'ionicon' }}
          title="Issues github"
          subtitle="Un problème ? clique ici !"
          onPress={() => Linking.openURL(GITHUB_LINK)}
          bottomDivider
        />
        <ListItem
          leftIcon={{ name: 'ios-log-out', type: 'ionicon' }}
          title="Se deconnecter"
          subtitle={loginInfo}
          onPress={() => firebase.auth().signOut()}
        />
      </View>
    </View>
  );
};

Settings.navigationOptions = { title: 'Paramètres' };

export default Settings;
