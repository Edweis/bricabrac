import _ from 'lodash';
import { BrickT, ConceptAnalysisT } from '../../constants/types';

export const getFeaturedBrick = (bricks: BrickT[]): BrickT | null => {
  if (bricks.length === 0) return null;
  const grouped = _(bricks)
    .groupBy('status')
    .mapValues(bs => _.sortBy(bs, b => b.submitTime.toDate().getTime()))
    .value();

  if (!_.isEmpty(grouped.accepted)) return grouped.accepted[0];
  if (!_.isEmpty(grouped.none)) return grouped.none[0];
  if (!_.isEmpty(grouped.refused)) return grouped.refused[0];
  throw Error('Error brick has no status');
};

export const formatConceptTitle = (title: string, asConcept: boolean): string =>
  asConcept ? `${title} (concept)` : title;

export const formatContent = (content?: string, asConcept?: boolean) => {
  const text = content || 'Pas encore de brique !';
  return asConcept ? null : text.split('\n')[0].substring(0, 57);
};

export const formatTags = (tags: ConceptAnalysisT) => {
  let text = tags.deps.map(t => `#${t}`).join(' ');
  if (tags.isCyclical) text += ' (Cyclique)';
  return text;
};
