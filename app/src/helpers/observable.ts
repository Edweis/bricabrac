import { useEffect, useState } from 'react';
import _ from 'lodash';

type Listener<T> = (val: T) => void;
type Unsubscriber = () => void;

const checkListeners = <T>(listeners: Listener<T>[]) => {
  if (!listeners) console.warn('No listeners ! skipped.');
};

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

  update(newObject: Partial<T>) {
    // console.debug({ newObject, here: this.val });
    if (this.val instanceof Object) {
      const valToCompare = _.omit(
        (newObject as unknown) as object,
        this.omitFields,
      );
      if (!_.isEqual(this.val, valToCompare)) {
        this.val = { ...this.val, ...newObject };
        this.notifyAll();
      }
    }
  }

  set(newValue: T) {
    if (!_.isEqual(this.val, newValue)) {
      this.val = newValue;
      this.notifyAll();
    }
  }

  private notifyAll() {
    checkListeners(this.listeners);
    this.listeners.forEach(listener => listener(this.val));
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
    const unsubscribe = observable.subscribe(setVal);
    return unsubscribe;
  }, [observable]);

  return val;
}
