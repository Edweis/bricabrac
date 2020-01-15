import { StatusT } from './types';

const tintColor = '#2f95dc';

export default {
  tintColor,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
  status: {
    [StatusT.accepted]: '#28a745',
    [StatusT.refused]: '#dc3545',
    [StatusT.none]: '#ffc107',
  },
  orange: '#f4511e',
  black: '#000000',
  white: '#FFFFFF',
};
