import React from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { getReadingInsight } from '../helpers';
import { getDisplayedSource } from '../../../helpers';
import EmptyHistory from './EmptyHistory';
import { ReadingTimeT } from '../../../constants/types';
import { useUserEmailMap } from '../../../hooks/users';

type Props = { readingTimes: ReadingTimeT[]; showEmail?: boolean };
const HistoryList = (props: Props) => {
  const userToEmail = useUserEmailMap();
  if (props.readingTimes.length === 0) return <EmptyHistory />;
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      {props.readingTimes.map(readingTime => {
        const { source, startPage, endPage, id, userId } = readingTime;
        const readingInsight = getReadingInsight(readingTime);
        const displayedSource = getDisplayedSource(source);
        let subtitle = readingInsight;
        if (props.showEmail) subtitle += `\npar ${userToEmail[userId]}`;
        return (
          <ListItem
            key={id}
            title={displayedSource}
            rightSubtitle={`${startPage} - ${endPage}`}
            subtitle={subtitle}
            bottomDivider
          />
        );
      })}
    </ScrollView>
  );
};

HistoryList.defaultProps = { showEmail: false };
export default HistoryList;
