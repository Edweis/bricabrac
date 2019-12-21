import React, { useState, useCallback, useEffect } from 'react';
import { useBricks, BrickContext } from './bricks';
import { useConcepts, ConceptContext } from './concepts';
import { ProjectSetterContext } from './project';
import { useUsers, UserContext } from './users';
import { useReadingTimes, ReadingTimeContext } from './readingTimes';
import { LoadingContext, useLoadings, useIsFullyLoaded } from './loadings';

const providers = [
  [ProjectSetterContext, useState],
  [BrickContext, useBricks],
  [ConceptContext, useConcepts],
  [UserContext, useUsers],
  [ReadingTimeContext, useReadingTimes],
];

// Not used for the moment but can be a library by itself to replace redux for hooks
const useGlobalProvider = () => {
  return useCallback(
    providers.reduce(
      (Component, [Context, useGetter]) => ({ children }) => {
        /* eslint-disable-next-line react-hooks/rules-of-hooks */
        const value = useGetter();
        return (
          <Component>
            <Context.Provider value={value}>{children}</Context.Provider>
          </Component>
        );
      },
      ({ children }) => <>{children}</>,
    ),
    [],
  );
};

// const AppLoading = () =>{
//   const isStateLoading = useIsFullyLoaded();
//   const [isAppLoading, setAppLoading] = useState(true);
//
// }

/* Has to be in a sub component to reach the LoadingContext */
const SubGlobalProvider = ({ children }) => {
  const GlobalProvider = useGlobalProvider();
  return <GlobalProvider>{children}</GlobalProvider>;
};

export default ({ children }) => {
  const state = useLoadings();
  return (
    <LoadingContext.Provider value={state}>
      <SubGlobalProvider>{children}</SubGlobalProvider>
    </LoadingContext.Provider>
  );
};
