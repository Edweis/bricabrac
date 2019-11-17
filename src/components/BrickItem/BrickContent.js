// @flow
import React from 'react';
import { View, Text } from 'react-native';
import { ConceptDepsT } from '../../constants/types';
import { formatContent, formatTags } from './helpers';

function BrickContent({
  content,
  tags,
  asConcept
}: {
  content?: string,
  tags: ConceptDepsT,
  asConcept: boolean
}) {
  return (
    <View>
      {!!tags.deps.length && <Text>{formatTags(tags)}</Text>}
      <Text>{formatContent(content, asConcept)}</Text>
    </View>
  );
}
BrickContent.defaultProps = { content: null };

export default BrickContent;
