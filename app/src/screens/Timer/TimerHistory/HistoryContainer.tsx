import React, { useCallback } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useCurrentUserReadingTimes } from '../helpers';
import { useUserReadingTimes } from '../../../hooks/readingTimes';
import HistoryList from './HistoryList';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
  container: { width: '100%' },
});

function CustomTabBar(props: any) {
  return (
    <TabBar
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
      activeColor={colors.orange}
      inactiveColor={colors.lightOrange}
      indicatorStyle={{ backgroundColor: colors.orange }}
      style={{ backgroundColor: 'white' }}
    />
  );
}

const HistoryContainer = () => {
  const userReadingTimes = useCurrentUserReadingTimes();
  const allReadingTimes = useUserReadingTimes();

  const userTab = useCallback(
    () => <HistoryList readingTimes={userReadingTimes} />,
    [userReadingTimes],
  );
  const allTab = useCallback(
    () => <HistoryList readingTimes={allReadingTimes} showEmail />,
    [userReadingTimes],
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'user', title: 'Mes lectures' },
    { key: 'all', title: 'Toutes' },
  ]);

  const renderScene = SceneMap({ user: userTab, all: allTab });

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <TabView
        renderTabBar={CustomTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </ScrollView>
  );
};

export default HistoryContainer;
