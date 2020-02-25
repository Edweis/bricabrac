import { useMemo } from 'react';
import { ReadingTimeSetT } from '../../constants/types';
import { getCurrentUserId } from '../../firebase';
import { useUserReadingTimes, useReadingTimes } from '../../hooks/readingTimes';

export const pad = (n: number) => {
  return `0${n}`.slice(-2);
};
export const formatTimer = (timer: number) => {
  const safeTimer = Math.max(0, Math.round(timer));
  const minutes = Math.floor(safeTimer / 60);
  const formatedSeconds = pad(safeTimer % 60);
  const formatedHours = pad(Math.floor(minutes / 60));
  const formatedMinutes = pad(minutes % 60);
  return `${formatedHours}:${formatedMinutes}:${formatedSeconds}`;
};

export const getReadingInsight = (readingTime: ReadingTimeSetT): string => {
  const { endTime, startTime, startPage, endPage } = readingTime;
  if (endTime == null) return '∞';
  const durationTime = endTime.toMillis() - startTime.toMillis();
  const duration = formatTimer(durationTime / 1000);
  const speed = (durationTime / ((endPage - startPage) * 60 * 1000)).toFixed(2);

  return `${duration} (${speed}min/page)`;
};

export const useCurrentUserReadingTimes = () => {
  const userId = getCurrentUserId();
  return useUserReadingTimes(userId);
};

export const useOtherUserReadingTimes = () => {
  const userId = getCurrentUserId();
  const readingTimes = useReadingTimes();
  return useMemo(
    () => readingTimes.filter(readingTime => readingTime.userId !== userId),
    [userId, readingTimes],
  );
};
