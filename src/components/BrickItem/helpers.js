import _ from 'lodash';
import type { BrickT } from '../../constants/types';

export const getFeaturedBrick = (bricks: BrickT[]): BrickT | null => {
  if (!bricks.length) return null;
  // console.debug(bricks.map(b => ({ id: b.id, submitTime: b.submitTime })));
  const grouped = _(bricks)
    .groupBy('status')
    .mapValues(bs => _.sortBy(bs, b => b.submitTime.toDate().getTime()))
    .value();

  if (!_.isEmpty(grouped.accepted)) return grouped.accepted[0];
  if (!_.isEmpty(grouped.none)) return grouped.none[0];
  if (!_.isEmpty(grouped.refused)) return grouped.refused[0];
  return null;
};

export const formatConceptTitle = (title: string): string =>
  `${title} (concept)`;
