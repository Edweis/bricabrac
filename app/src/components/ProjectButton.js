// @flow
import React from 'react';
import { useNavigation } from '../hooks/navigation';
import { useObservable } from '../helpers/observable';
import { projectService } from '../helpers/store';
import { SourceT } from '../constants/types';
import colors from '../constants/colors';
import HeaderIconButton from './HeaderIconButton';

export default function ProjectButton() {
  const project = useObservable(projectService.project);
  const isProjectOn = project != null;
  const navigation = useNavigation();
  const onSelect = (newSource: SourceT) => {
    projectService.set(newSource);
    navigation.pop();
  };
  const onPress = () => {
    if (isProjectOn) projectService.reset();
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
