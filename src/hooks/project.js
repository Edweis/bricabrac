import React, { useContext } from 'react';
import { ProjectSetterT } from '../constants/types';

export const ProjectSetterContext = React.createContext([
  null,
  () => {
    throw Error('setProject is not yet defined');
  },
]);
export const useProject = (): ProjectSetterT =>
  useContext(ProjectSetterContext);
