import { createContext, useContext, useCallback, useState } from 'react';
import _ from 'lodash';

type LoadingT = { shouldLoadAgain: boolean, [key: string]: boolean };
const defaultLoading = { shouldLoadAgain: false };
export const useLoadings = () => useState(defaultLoading);
export const LoadingContext = createContext([]);
export const useLoadingContext = () => useContext(LoadingContext);
export const useIsStateLoading = () => {
  const [loadings, setLoadings] = useLoadingContext();
  // DIRTY, Once everything is done, the hook always returns true
  if (loadings.shouldLoadAgain) return false;
  const values = _.values(loadings);
  const isLoading = values.length === 0 || values.some(value => value);
  if (!isLoading)
    setLoadings(prevLoading => ({ ...prevLoading, shouldLoadAgain: true }));
  return isLoading;
};

export const useSetLoading = (collection: string) => {
  const [, setLoadings] = useLoadingContext();

  return useCallback(
    status => {
      setLoadings(loadings => {
        return { ...loadings, [collection]: status };
      });
    },
    [setLoadings],
  );
};
