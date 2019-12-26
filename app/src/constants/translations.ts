import { StatusT } from './types';

export const translateStatus: { [value in StatusT]: string } = {
  [StatusT.accepted]: 'acceptée',
  [StatusT.refused]: 'réfutée',
  [StatusT.none]: 'sans avis',
};

export const a = 1;
