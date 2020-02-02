import React from 'react';
import { View, Text } from 'react-native';
import { ConceptAnalysisT } from '../../constants/types';
import { formatContent, formatTags } from './helpers';
import colors from '../../constants/colors';

function ConceptContent({
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
      {hasDeps && (
        <Text style={{ fontStyle: 'italic' }}>{formatTags(conceptDeps)}</Text>
      )}
      <Text style={{ color: colors.grey }}>{displayedContent}</Text>
    </View>
  );
}
ConceptContent.defaultProps = { content: null };

export default ConceptContent;
