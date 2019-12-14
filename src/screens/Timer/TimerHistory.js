import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useReadingTimeContext } from '../../hooks/readingTimes';
import { formatTimer } from './helpers';
import { getDisplayedSource } from '../../helpers';

const styles = StyleSheet.create({
  container: { width: '100%' },
});

export default () => {
  const readingTimes = useReadingTimeContext();

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {readingTimes.map(readingTime => {
        const { source, endTime, startTime, startPage, endPage } = readingTime;
        const durationTime = endTime.toMillis() - startTime.toMillis();
        const duration = formatTimer(durationTime);
        const displayedSource = getDisplayedSource(source);

        console.debug({ source, durationTime, startPage, endPage });
        return (
          <ListItem
            key={startTime.toMillis()}
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
