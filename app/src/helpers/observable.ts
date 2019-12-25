import { useEffect, useState } from 'react';
import _ from 'lodash';

type Listener<T> = (val: T) => void;
type Unsubscriber = () => void;

export class Observable<T> {
  private listeners: Listener<T>[];

  private omitFields: string[];

  constructor(private val: T, omitField?: string) {
    this.listeners = [];
    this.omitFields = omitField != null ? [omitField] : [];
  }

  get(): T {
    return this.val;
  }

  set(val: T) {
    const valToCompare =
      val instanceof Object
        ? _.omit((val as unknown) as object, this.omitFields)
        : val;
    if (!_.isEqual(this.val, valToCompare)) {
      this.val = val;
      if (!this.listeners) {
        console.warn('no listeners ! skipped.');
        return;
      }
      this.listeners.forEach(listener => listener(val));
    }
  }

  subscribe(listener: Listener<T>): Unsubscriber {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

export function useObservable<T extends object>(observable: Observable<T>): T {
  const [val, setVal] = useState(observable.get());

  useEffect(() => {
    return observable.subscribe(setVal);
  }, [observable]);

  return val;
}
