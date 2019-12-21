import { createContext, useContext, useCallback, useState } from 'react';
import _ from 'lodash';

export const LoadingContext = createContext([]);
export const useLoadings = () => useState({});
export const useLoadingContext = () => useContext(LoadingContext);
export const useIsStateLoading = () => {
  const [loadings] = useLoadingContext();
  const values = _.values(loadings);
  return values.length === 0 || values.some(value => value);
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
