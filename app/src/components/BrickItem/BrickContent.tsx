import React from 'react';
import { View, Text } from 'react-native';
import { ConceptAnalysisT } from '../../constants/types';
import { formatContent, formatTags } from './helpers';

function BrickContent({
  content,
  conceptDeps,
  asConcept,
}: {
  content?: string;
  conceptDeps: ConceptAnalysisT;
  asConcept: boolean;
}) {
  const displayedContent = formatContent(content, asConcept);
  const hasDeps = !!conceptDeps.deps.length;
  if (!hasDeps && !displayedContent) return null;
  return (
    <View>
      {hasDeps && <Text>{formatTags(conceptDeps)}</Text>}
      <Text>{displayedContent}</Text>
    </View>
  );
}
BrickContent.defaultProps = { content: null };

export default BrickContent;
