import _ from 'lodash';
import { getDeps } from '../concepts';

const allDeps = _.map(
  {
    one: [],
    'one bis': [],
    two: ['one'],
    'two bis': ['one'],
    three: ['two'],
    'three bis': ['two', 'one bis', 'two bis'], // same grand parent one both parents
    'three ter': ['two', 'one'], // redundant one
    four: ['five'],
    five: ['six'],
    six: ['four'],
    seven: ['five']
  },
  (v, k) => ({ name: k, deps: v })
);

describe('test getDeps', () => {
  it('should return only the dep when it has no deps', () => {
    expect(getDeps(allDeps, 'unknown dep')).toEqual({
      deps: [],
      isCyclical: false
    });
  });
  it('should find zéro, one and two level deps', () => {
    expect(getDeps(allDeps, 'one')).toEqual({
      deps: [],
      isCyclical: false
    });
    expect(getDeps(allDeps, 'two')).toEqual({
      deps: ['one'],
      isCyclical: false
    });
    expect(getDeps(allDeps, 'three')).toEqual({
      deps: ['two', 'one'],
      isCyclical: false
    });
  });
  it('should remove duplicate parents and only keep the last', () => {
    expect(getDeps(allDeps, 'three bis')).toEqual({
      deps: ['two', 'one', 'one bis', 'two bis'],
      isCyclical: false
    });
  });
  it('should detect cylces', () => {
    expect(getDeps(allDeps, 'four')).toEqual({
      deps: ['five', 'six', 'four'],
      isCyclical: true
    });
  });
  it('should detect pointed cylces', () => {
    expect(getDeps(allDeps, 'seven')).toEqual({
      deps: ['five', 'six', 'four'],
      isCyclical: true
    });
  });
  it('should crash if deps are redundants', () => {});
});
