import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  useCurrentUserReadingTimes,
  useOtherUserReadingTimes,
} from '../helpers';
import HistoryList from './HistoryList';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
  container: { height: '100%', width: '100%' },
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
  const otherUsersReadingTimes = useOtherUserReadingTimes();

  const userTab = useCallback(
    () => <HistoryList readingTimes={userReadingTimes} />,
    [userReadingTimes],
  );
  const otherTab = useCallback(
    () => <HistoryList readingTimes={otherUsersReadingTimes} showEmail />,
    [userReadingTimes],
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'user', title: 'Mes lectures' },
    { key: 'other', title: 'Autres' },
  ]);

  const renderScene = SceneMap({ user: userTab, other: otherTab });

  return (
    <View style={styles.container}>
      <TabView
        renderTabBar={CustomTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </View>
  );
};

export default HistoryContainer;
