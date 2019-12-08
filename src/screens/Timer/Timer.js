import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { StyleSheet, View, Text, Button } from 'react-native';
import _ from 'lodash';
import { Input } from 'react-native-elements';
import SourcePicker from '../../components/SourcePicker';
import ActionModal from '../../components/ActionModal';
import {
  useLastReadPage,
  useLastReadSource,
  setReadingTime,
} from '../../hooks/readingTimes';

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
    else setIsOn(true);
  };

  const stopTimer = () => {
    setEndTime(moment());
    setIsEndPageModalShown(true);
    setIsOn(false);
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isOn) {
      setStartTime(moment());
      const interval = setInterval(() => setTimer(moment() - startTime), 1000);
      return () => clearInterval(interval);
    }
  }, [isOn, startTime]);

  return (
    <View style={styles.container}>
      <Text>{moment.utc(timer).format('HH:mm:ss')}</Text>
      {!isOn ? (
        <Button title="Start" onPress={startTimer} />
      ) : (
        <>
          <Button title="Stop" onPress={stopTimer} />
        </>
      )}
      <Input
        label="Page de début de lecture"
        value={startPage}
        disabled={isOn}
        onChangeText={setStartPage}
      />
      <SourcePicker source={source} onChange={setSource} readOnly={isOn} />
      <ActionModal
        show={isEndPageModalShown}
        title="T'es à quelle page ?"
        submitText="Envoyer"
        onClose={() => setIsEndPageModalShown(false)}
        onSubmit={endPage =>
          setReadingTime({
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            startPage: _.toNumber(startPage),
            endPage: _.toNumber(endPage),
            source,
          })
        }
      />
    </View>
  );
};

Timer.navigationOptions = { title: 'Timer' };

export default Timer;
