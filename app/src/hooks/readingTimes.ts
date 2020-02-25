import _ from 'lodash';
import { useMemo } from 'react';
import { getCurrentUserId } from '../firebase';
import { setFirestore } from './firestore';
import { ReadingTimeSetT, SourceT } from '../constants/types';
import { DEFAULT_READING_TIME } from '../constants/defaults';
import { useObservable } from '../helpers/observable';
import { readingTimesService, timerService } from '../helpers/store';

export const READING_TIME_COLLECTION = 'readingTimes';
export const useTimer = () => useObservable(timerService.timer);
export const useReadingTimes = () => useObservable(readingTimesService.value);

export const useUserReadingTimes = (userId?: string, source?: SourceT) => {
  const readingTimes = useReadingTimes();
  const filteredReadingTimes = useMemo(() => {
    const filtered = readingTimes
      .filter(rt => userId == null || rt.userId === userId)
      .filter(rt => source == null || rt.source === source);

    const sorted = _(filtered)
      .sortBy(readingTime =>
        readingTime.endTime == null ? 0 : readingTime.endTime.toMillis(),
      )
      .reverse()
      .value();
    return sorted;
  }, [readingTimes, source, userId]);
  return filteredReadingTimes;
};

const useLastRead = (source?: SourceT) => {
  const userId = getCurrentUserId();
  const readingTimes = useUserReadingTimes(userId, source);

  return useMemo(() => {
    if (!readingTimes.length) return DEFAULT_READING_TIME;
    return _.maxBy(readingTimes, 'endTime') as ReadingTimeSetT;
  }, [readingTimes]);
};

export const useLastReadPage = (source?: SourceT) => {
  return useLastRead(source).endPage;
};

export const useLastReadSource = (source?: SourceT) => {
  return useLastRead(source).source || '';
};

export const setReadingTime = (readingTime: ReadingTimeSetT) => {
  const enrichedReadingTimes = {
    ...readingTime,
    userId: getCurrentUserId(),
  };
  setFirestore(READING_TIME_COLLECTION, enrichedReadingTimes);
};
