import React from 'react';
import { LoadingContext, useLoadings } from './loadings';

export default ({ children }: Props) => {
  const state = useLoadings();
  return (
    <LoadingContext.Provider value={state}>{children}</LoadingContext.Provider>
  );
};
