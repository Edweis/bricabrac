// @flow
import React, { useContext } from 'react';
import { NavigationContext } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useProject } from '../hooks/project';
import type { SourceT } from '../constants/types';
import colors from '../constants/colors';

const styles = StyleSheet.create({ container: { marginRight: 16 } });
export default function ProjectButton() {
  const [project, setProject] = useProject();
  const isProjectOn = project != null;
  const navigation = useContext(NavigationContext);
  const onSelect = (newSource: SourceT) => {
    setProject(newSource);
    navigation.pop();
  };
  const onPress = () => {
    if (isProjectOn) setProject(null);
    else
      navigation.push('SourceList', { onSelect, title: 'Filtrer par source' });
  };
  return (
    <View style={styles.container}>
      <Icon
        name="ios-book"
        onPress={onPress}
        type="ionicon"
        color={isProjectOn ? colors.orange : null}
      />
    </View>
  );
}
