import _ from 'lodash';
import { BrickT, ConceptAnalysisT } from '../../constants/types';

export const getFeaturedBrick = (bricks: BrickT[]): BrickT | null => {
  if (bricks.length === 0) return null;
  return _.sortBy(bricks, b => b.submitTime.toDate().getTime())[0];
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
