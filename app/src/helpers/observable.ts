import { useEffect, useState } from 'react';
import _ from 'lodash';

type Listener<T> = (val: T) => void;
type Unsubscriber = () => void;

export class Observable<T> {
  private listeners: Listener<T>[];

  readonly name: string;

  private omitFields: string[];

  constructor(private val: T, omitField?: string | null, name = '(unamed)') {
    this.listeners = [];
    this.omitFields = omitField != null ? [omitField] : [];
    this.name = name;
  }

  get(): T {
    return this.val;
  }

  set(newValue: Partial<T>) {
    const valToCompare =
      newValue instanceof Object
        ? _.omit((newValue as unknown) as object, this.omitFields)
        : newValue;
    if (!_.isEqual(this.val, valToCompare)) {
      this.val = { ...this.val, newValue };
      if (!this.listeners) {
        console.warn('no listeners ! skipped.');
        return;
      }
      this.listeners.forEach(listener => listener(this.val));
    }
  }

  subscribe(listener: Listener<T>): Unsubscriber {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

export function useObservable<T>(observable: Observable<T>): T {
  const [val, setVal] = useState(observable.get());

  useEffect(() => {
    return observable.subscribe(setVal);
  }, [observable]);

  return val;
}
