import { ReadingTimeSetT } from '../../constants/types';

export const pad = (n: number) => {
  return `0${n}`.slice(-2);
};
export const formatTimer = (timer: number) => {
  const safeTimer = Math.max(0, Math.round(timer));
  const minutes = Math.floor(safeTimer / 60);
  const formatedSeconds = pad(safeTimer % 60);
  const fornatedHours = pad(Math.floor(minutes / 60));
  const formatedMinutes = pad(minutes % 60);
  return `${fornatedHours}:${formatedMinutes}:${formatedSeconds}`;
};

export const getReadingInsight = (readingTime: ReadingTimeSetT): string => {
  const { endTime, startTime, startPage, endPage } = readingTime;
  if (endTime == null) return '∞';
  const durationTime = endTime.toMillis() - startTime.toMillis();
  const duration = formatTimer(durationTime / 1000);
  const speed = (durationTime / ((endPage - startPage) * 60 * 1000)).toFixed(2);

  return `${duration} (${speed}min/pages)`;
};
