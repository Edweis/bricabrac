// @flow
import React from 'react';
import { useNavigation } from '../hooks/navigation';
import { useProject } from '../hooks/project';
import { SourceT } from '../constants/types';
import colors from '../constants/colors';
import HeaderIconButton from './HeaderIconButton';

export default function ProjectButton() {
  const [project, setProject] = useProject();
  const isProjectOn = project != null;
  const navigation = useNavigation();
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
    <HeaderIconButton
      name="ios-book"
      onPress={onPress}
      color={isProjectOn ? colors.orange : null}
    />
  );
}
