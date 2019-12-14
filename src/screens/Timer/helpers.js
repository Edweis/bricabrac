export const pad = (n: number) => {
  return `0${n}`.slice(-2);
};
export const formatTimer = (timer: number) => {
  const safeTimer = Math.max(0, timer);
  const minutes = Math.floor(safeTimer / 60);
  const formatedSeconds = pad(safeTimer % 60);
  const fornatedHours = pad(Math.floor(minutes / 60));
  const formatedMinutes = pad(minutes % 60);
  return `${fornatedHours}:${formatedMinutes}:${formatedSeconds}`;
};
