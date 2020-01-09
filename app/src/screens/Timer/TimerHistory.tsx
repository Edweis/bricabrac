import React from 'react';
import _ from 'lodash';
import { StyleSheet, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useUserReadingTimes } from '../../hooks/readingTimes';
import { getReadingInsight } from './helpers';
import { getDisplayedSource } from '../../helpers';
import { getCurrentUserId } from '../../firebase';

const styles = StyleSheet.create({
  container: { width: '100%' },
});

export default () => {
  const userId = getCurrentUserId();
  const readingTimes = useUserReadingTimes(userId);
  const sortedReadingTimes = _(readingTimes)
    .sortBy(readingTime =>
      readingTime.endTime == null ? 0 : readingTime.endTime.toMillis(),
    )
    .reverse();
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {sortedReadingTimes.map(readingTime => {
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
    </ScrollView>
  );
};
