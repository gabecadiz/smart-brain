import { CHANGE_EMAIL_FIELD } from '../constants/constants';

export const onEmailChange = email => ({
  type: CHANGE_EMAIL_FIELD,
  payload: email
});
