import { useEffect, useState } from 'react';

type Listener<T> = (val: T) => void;
type Unsubscriber = () => void;

export class Observable<T> {
  private listeners: Listener<T>[];

  constructor(private val: T) {
    this.listeners = [];
  }

  get(): T {
    return this.val;
  }

  set(val: T) {
    if (this.val !== val) {
      this.val = val;
      this.listeners.forEach(l => l(val));
      console.debug('observable set to ', this.val, this.listeners);
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
