import React from 'react';
import { ListItem } from 'react-native-elements';
import { getReadingInsight } from '../helpers';
import { getDisplayedSource } from '../../../helpers';
import EmptyHistory from './EmptyHistory';
import { ReadingTimeT } from '../../../constants/types';

type Props = { readingTimes: ReadingTimeT[] };
export default (props: Props) => {
  if (props.readingTimes.length === 0) return <EmptyHistory />;
  return (
    <>
      {props.readingTimes.map(readingTime => {
        const { source, startPage, endPage, id } = readingTime;
        const readingInsight = getReadingInsight(readingTime);
        const displayedSource = getDisplayedSource(source);

        return (
          <ListItem
            key={id}
            title={displayedSource}
            rightSubtitle={`${startPage} - ${endPage}`}
            subtitle={readingInsight}
            bottomDivider
          />
        );
      })}
    </>
  );
};
