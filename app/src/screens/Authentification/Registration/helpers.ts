import _ from 'lodash';
import { RegistrationT } from '../../../constants/types';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const checkRegistration = (registration: RegistrationT) => {
  const areEmpty = _.values(registration).some(value => !value || value === '');
  if (!areEmpty) throw Error('Some fields are empty');
  const isEmail = EMAIL_REGEX.test(String(registration.email).toLowerCase());
  if (!isEmail) throw Error('Invalid email');

  const arePasswordEqual =
    registration.password === registration.passwordConfirmation;

  if (!arePasswordEqual) throw Error('Password are not equal');
};
