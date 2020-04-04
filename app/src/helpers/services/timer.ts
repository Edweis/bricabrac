import { Observable } from '../observable';
import { SourceT, ReadingTimeSetT } from '../../constants/types';
import { Timestamp } from '../../firebase';

type TimerT = {
  isOn: boolean;
  startTime: Date | null;
  endTime: Date | null;
  startPage: number;
  endPage: number;
  source: SourceT;
};
const DEFAULT_READING_TIME: TimerT = {
  isOn: false,
  startTime: null,
  endTime: null,
  startPage: 0,
  endPage: 0,
  source: '',
};
export class TimerService {
  readonly timer = new Observable<TimerT>(DEFAULT_READING_TIME);

  update(partialTimer: Partial<TimerT>) {
    this.timer.update(partialTimer);
  }

  toReadingTime(endPage: number) {
    const { startTime, endTime, startPage, source } = this.timer.get();
    const formatedTime: ReadingTimeSetT = {
      startTime: Timestamp.fromDate(startTime || new Date()),
      endTime: Timestamp.fromDate(endTime || new Date()),
      startPage,
      endPage,
      source,
    };
    return formatedTime;
  }

  getTimeSinceStarted() {
    const { startTime } = this.timer.get();
    if (startTime == null) return 0;
    return (Date.now() - startTime.getTime()) / 1000;
  }
}
