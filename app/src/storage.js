import { AsyncStorage } from 'react-native';

export const EMAIL_KEY = 'lastEmail';
export const store = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Failed sorting data in storage', { key, value });
  }
};

export const fetch = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Failed fetching data in storage', { key });
    return null;
  }
};
