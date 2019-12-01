import _ from 'lodash';
import { useMemo } from 'react';
import { getCurrentUserId } from '../firebase';
import { useFirestore, setFirestore } from './helpers';
import { ReadingTimeT, SourceT } from '../constants/types';
import { DEFAULT_READING_TIME } from '../constants/defaults';

export const READING_TIME_COLLECTION = 'readingTimes';

export const genAcceptationId = (brickId: string, userId: string) =>
  `${userId}-${brickId}`;

export const useUserReadingTimes = (userId?: string, source?: SourceT) => {
  const readingTimes = useFirestore(READING_TIME_COLLECTION);
  const filteredReadingTimes = readingTimes
    .filter(rt => userId == null || rt.userId === userId)
    .filter(rt => source == null || rt.source === source);
  return filteredReadingTimes;
};

const useLastRead = (source?: SourceT) => {
  const userId = getCurrentUserId();
  const readingTimes = useUserReadingTimes(userId, source);

  return useMemo(() => {
    if (!readingTimes.length) return DEFAULT_READING_TIME;
    return _.maxBy(readingTimes, 'endTime');
  }, [readingTimes, source]);
};

export const useLastReadPage = (source?: SourceT) => {
  return useLastRead(source).endPage;
};

export const useLastReadSource = (source?: SourceT) => {
  return useLastRead(source).source;
};

export const setReadingTime = (readingTime: ReadingTimeT) => {
  setFirestore(READING_TIME_COLLECTION, readingTime);
};
