import _ from 'lodash';
import { useMemo, useContext, createContext } from 'react';
import { getCurrentUserId } from '../firebase';
import { useFirestore, setFirestore } from './helpers';
import { ReadingTimeT, SourceT } from '../constants/types';
import { DEFAULT_READING_TIME } from '../constants/defaults';

export const READING_TIME_COLLECTION = 'readingTimes';

export const useReadingTimes = () => useFirestore(READING_TIME_COLLECTION);
export const ReadingTimeContext = createContext([]);
export const useReadingTimeContext = () => useContext(ReadingTimeContext);

export const useUserReadingTimes = (userId?: string, source?: SourceT) => {
  const readingTimes = useReadingTimeContext();
  const filteredReadingTimes = useMemo(
    () =>
      readingTimes
        .filter(rt => userId == null || rt.userId === userId)
        .filter(rt => source == null || rt.source === source),
    [readingTimes, source, userId],
  );
  return filteredReadingTimes;
};

const useLastRead = (source?: SourceT) => {
  const userId = getCurrentUserId();
  const readingTimes = useUserReadingTimes(userId, source);

  const res = useMemo(() => {
    console.debug('readingTimes changed !');
    if (!readingTimes.length) return DEFAULT_READING_TIME;
    return _.maxBy(readingTimes, 'endTime');
  }, [readingTimes]);
  return res;
};

export const useLastReadPage = (source?: SourceT) => {
  return useLastRead(source).endPage;
};

export const useLastReadSource = (source?: SourceT) => {
  return useLastRead(source).source || '';
};

export const setReadingTime = (readingTime: ReadingTimeT) => {
  const enrichedReadingTimes = {
    ...readingTime,
    userId: getCurrentUserId(),
  };
  setFirestore(READING_TIME_COLLECTION, enrichedReadingTimes);
};
