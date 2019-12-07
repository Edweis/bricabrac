import React, { useState, useCallback } from 'react';
import { useBricks, BrickContext } from './bricks';
import { useConcepts, ConceptContext } from './concepts';
import { ProjectSetterContext } from './project';
import { useUsers, UserContext } from './users';
import { useReadingTimes, ReadingTimeContext } from './readingTimes';

const providers = [
  [ProjectSetterContext, useState],
  [BrickContext, useBricks],
  [ConceptContext, useConcepts],
  [UserContext, useUsers],
  [ReadingTimeContext, useReadingTimes]
];

// Not used for the moment but can be a library by itself to replace redux for hooks
const useGlobalProvider = () => {
  return useCallback(
    providers.reduce(
      (Component, [Context, useGetter]) => ({ children }) => {
        const value = useGetter();
        return (
          <Component>
            <Context.Provider value={value}>{children}</Context.Provider>
          </Component>
        );
      },
      ({ children }) => <>{children}</>
    ),
    []
  );
};
export default useGlobalProvider;
