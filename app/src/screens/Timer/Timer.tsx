import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import _ from 'lodash';
import InputValidated from '../../components/InputValidated';
import SourcePicker from '../../components/SourcePicker';
import ActionModal from '../../components/ActionModal';
import TimerHistory from './TimerHistory';
import { timerService } from '../../helpers/store';
import {
  useLastReadPage,
  useLastReadSource,
  setReadingTime,
  useTimer,
} from '../../hooks/readingTimes';
import TimerDisplay from './TimerDisplay';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
});
const Timer = () => {
  const timer = useTimer();
  const [displayedTimer, setDisplayedTimer] = useState(0);
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEndPageModalShown, setIsEndPageModalShown] = useState(false);
  // const [isOn, setIsOn] = useState(false);
  // const [timer, setTimer] = useState(0);
  // const [startTime, setStartTime] = useState(null);

  const lastReadSource = useLastReadSource();
  // const [source, setSource] = useState(lastReadSource);
  useEffect(() => {
    timerService.set({ source: lastReadSource });
  }, [lastReadSource]);

  const lastReadPage = useLastReadPage(timer.source);
  useEffect(() => {
    timerService.set({ startPage: lastReadPage });
  }, [lastReadPage]);

  // const [endTime, setEndTime] = useState(null);

  const startTimer = () => {
    // if (_.isNaN(timer.startPage)) setErrorMessage("Ce n'est pas un nombre !");
    // else {
    timerService.set({ isOn: true });
    timerService.set({ startTime: new Date() });
    // }
  };

  const stopTimer = () => {
    timerService.set({ endTime: new Date() });
    setIsEndPageModalShown(true);
    timerService.set({ isOn: false });
    setDisplayedTimer(0);
  };

  const submitReadingTime = (endPage: number) =>
    setReadingTime(timerService.toReadingTime(endPage));

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (timer.isOn) {
      const interval = setInterval(() => {
        const timeEnlapsed = timerService.getTimeSinceStarted();
        setDisplayedTimer(timeEnlapsed);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer.isOn, timer]);

  return (
    <View style={styles.container}>
      <TimerDisplay timer={displayedTimer} />

      <SourcePicker
        source={timer.source}
        onChange={source => timerService.set({ source })}
        readOnly={timer.isOn}
      />
      <InputValidated<number>
        label="Page de début de lecture"
        value={timer.startPage.toString()}
        validator={(text: string): number => _.toNumber(text)}
        onChangeText={(startPage: number) => timerService.set({ startPage })}
        autoCompleteType="off"
        keyboardType="decimal-pad"
        disabled={timer.isOn}
      />
      {!timer.isOn ? (
        <Button title="Start" onPress={startTimer} />
      ) : (
        <Button title="Stop" onPress={stopTimer} />
      )}
      <ActionModal
        show={isEndPageModalShown}
        title="Quelle est la prochaine page non lue ? (décimales acceptées)"
        submitText="Envoyer"
        onClose={() => setIsEndPageModalShown(false)}
        onSubmit={submitReadingTime}
        defaultValue={timer.startPage}
        inputProps={{ autoCompleteType: 'off', keyboardType: 'decimal-pad' }}
      />
      <TimerHistory />
    </View>
  );
};

Timer.navigationOptions = { title: 'Timer' };

export default Timer;
