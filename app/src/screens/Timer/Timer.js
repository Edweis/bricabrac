import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import _ from 'lodash';
import { Input } from 'react-native-elements';
import SourcePicker from '../../components/SourcePicker';
import ActionModal from '../../components/ActionModal';
import TimerHistory from './TimerHistory';
import {
  useLastReadPage,
  useLastReadSource,
  setReadingTime,
} from '../../hooks/readingTimes';
import TimerDisplay from './TimerDisplay';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
});
const Timer = () => {
  const [isOn, setIsOn] = useState(false);
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const lastReadSource = useLastReadSource();
  const [source, setSource] = useState(lastReadSource);

  const lastReadPage = useLastReadPage(source);
  const [startPage, setStartPage] = useState(lastReadPage.toString());

  const [isEndPageModalShown, setIsEndPageModalShown] = useState(false);
  const [endTime, setEndTime] = useState(null);

  const startTimer = () => {
    if (_.isNaN(startPage)) setStartPage("Ce n'est pas un nombre !");
    else {
      setIsOn(true);
      setStartTime(Date.now());
    }
  };

  const stopTimer = () => {
    setEndTime(Date.now());
    setIsEndPageModalShown(true);
    setIsOn(false);
    setTimer(0);
  };

  const submitReadingTime = endPage =>
    setReadingTime({
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      startPage: _.toNumber(startPage),
      endPage: _.toNumber(endPage),
      source,
    });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isOn) {
      const interval = setInterval(() => {
        setTimer(timer + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOn, timer]);

  return (
    <View style={styles.container}>
      <TimerDisplay timer={timer} />

      <SourcePicker source={source} onChange={setSource} readOnly={isOn} />
      <Input
        label="Page de début de lecture"
        value={startPage}
        disabled={isOn}
        onChangeText={setStartPage}
      />
      {!isOn ? (
        <Button title="Start" onPress={startTimer} />
      ) : (
        <Button title="Stop" onPress={stopTimer} />
      )}
      <ActionModal
        show={isEndPageModalShown}
        title="T'es à quelle page ?"
        submitText="Envoyer"
        onClose={() => setIsEndPageModalShown(false)}
        onSubmit={submitReadingTime}
      />
      <TimerHistory />
    </View>
  );
};

Timer.navigationOptions = { title: 'Timer' };

export default Timer;
