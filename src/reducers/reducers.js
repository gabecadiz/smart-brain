import { CHANGE_EMAIL_FIELD } from '../constants/constants';

const initialState = {
  email: ''
};

export const setLoginField = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_EMAIL_FIELD:
      return Object.assign({}, state, { email: action.payload });
    default:
      return state;
  }
};
