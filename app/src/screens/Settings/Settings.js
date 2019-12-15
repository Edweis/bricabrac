import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Linking } from 'expo';
import firebase from '../../firebase';

const GITHUB_LINK = 'https://github.com/Edweis/bricabrac/issues';
const Settings = () => {
  return (
    <View>
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
        onPress={() => firebase.auth().signOut()}
      />
    </View>
  );
};

Settings.navigationOptions = { title: 'Paramètres' };

export default Settings;
