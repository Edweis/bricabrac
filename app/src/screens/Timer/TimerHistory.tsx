import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { getReadingInsight, useCurrentUserReadingTimes } from './helpers';
import { getDisplayedSource } from '../../helpers';

const styles = StyleSheet.create({
  container: { width: '100%' },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 16,
    height: '100%',
    alignItems: 'center',
  },
  centerText: { textAlign: 'center', marginBottom: 16 },
  justifyText: { textAlign: 'justify', marginBottom: 16 },
});

export default () => {
  const sortedReadingTimes = useCurrentUserReadingTimes();
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {sortedReadingTimes.length ? (
        sortedReadingTimes.map(readingTime => {
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
        })
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.centerText}>Bienvenu(e) sur le Timer !</Text>
          <Text style={styles.justifyText}>
            Le but de cette page est de pouvoir se motiver à lire en mesurant sa
            performance. Cela permet d&apos;éviter de se laisser distraire, et
            d&apos;améliorer sa vitesse de lecture !
          </Text>
          <Text style={styles.justifyText}>
            Pour commencer, {'\n\t'}- choisis une source,{'\n\t'}- entre la page
            à laquelle tu commences,{'\n\t'}- appuie sur start, le chrono va
            s&apos;écouler,
            {'\n\t'}- une fois ta lecture finie, appuie sur stop{'\n\t'}- rentre
            la page à laquelle tu es arrivé(e)
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
