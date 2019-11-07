import React, { useContext } from 'react';

export const ProjectSetterContext = React.createContext([
  null,
  () => {
    throw Error('setProject is not yet defined');
  }
]);
export const useProject = () => useContext(ProjectSetterContext);
