import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import firebase, { IS_DEV, getCurrentUser, logout } from '../../firebase';
import colors from '../../constants/colors';
import { useNavigation } from '../../hooks/navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
const release = IS_DEV
  ? {
      icon: 'ios-bug',
      name: 'Développement',
      description:
        'La base de developpement ne contient pas tous les éléments de la base de production',
    }
  : {
      icon: 'ios-information-circle',
      name: 'Production',
      description: 'Les changements sont sauvegardés sur le serveur officiel.',
    };

const GITHUB_LINK = 'https://github.com/Edweis/bricabrac/issues';
const Settings = () => {
  const user = getCurrentUser();
  const navigation = useNavigation();
  const loginInfo = user
    ? `${user.email} - ${user.uid.substring(0, 7)}`
    : 'null';
  const openInWebBrowser = async (url: string) => {
    await WebBrowser.openBrowserAsync(url, {
      toolbarColor: colors.orange,
      controlsColor: colors.white,
    });
  };
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
