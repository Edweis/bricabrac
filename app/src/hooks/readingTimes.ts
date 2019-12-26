import _ from 'lodash';
import { useMemo } from 'react';
import { getCurrentUserId } from '../firebase';
import { setFirestore } from './firestore';
import { ReadingTimeT, SourceT } from '../constants/types';
import { DEFAULT_READING_TIME } from '../constants/defaults';
import { useObservable } from '../helpers/observable';
import { readingTimesService } from '../helpers/store';

export const READING_TIME_COLLECTION = 'readingTimes';

export const useUserReadingTimes = (userId?: string, source?: SourceT) => {
  const readingTimes = useObservable(readingTimesService.value);
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

  return useMemo(() => {
    if (!readingTimes.length) return DEFAULT_READING_TIME;
    return _.maxBy(readingTimes, 'endTime') as ReadingTimeT;
  }, [readingTimes]);
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
