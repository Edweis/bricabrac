import React from 'react';
import _ from 'lodash';
import { StyleSheet, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useUserReadingTimes } from '../../hooks/readingTimes';
import { formatTimer } from './helpers';
import { getDisplayedSource } from '../../helpers';
import { getCurrentUserId } from '../../firebase';

const styles = StyleSheet.create({
  container: { width: '100%' },
});

export default () => {
  const userId = getCurrentUserId();
  const readingTimes = useUserReadingTimes(userId);
  const sortedReadingTimes = _.sortBy(readingTimes, readingTime =>
    readingTime.endTime.toMillis(),
  );
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {sortedReadingTimes.map(readingTime => {
        const {
          source,
          endTime,
          startTime,
          startPage,
          endPage,
          id,
        } = readingTime;
        const durationTime = endTime.toMillis() - startTime.toMillis();
        const duration = formatTimer(durationTime / 1000);
        const displayedSource = getDisplayedSource(source);

        return (
          <ListItem
            key={id}
            title={displayedSource}
            rightSubtitle={`${startPage} - ${endPage}`}
            subtitle={duration}
            bottomDivider
          />
        );
      })}
    </ScrollView>
  );
};
