import {
  CHANGE_EMAIL_FIELD,
  REQUEST_LOGIN_PENDING,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILED
} from '../constants/constants';

const initialStateForm = {
  email: ''
};

export const setLoginField = (state = initialStateForm, action = {}) => {
  switch (action.type) {
    case CHANGE_EMAIL_FIELD:
      return Object.assign({}, state, { email: action.payload });
    default:
      return state;
  }
};

const initialStateUser = {
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
  isPending: false,
  error: '',
  route: 'signin'
};

export const requestLogin = (state = initialStateUser, action = {}) => {
  switch (action.type) {
    case REQUEST_LOGIN_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload,
        isPending: false,
        route: 'home'
      });
    case REQUEST_LOGIN_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false
      });
    default:
      return state;
  }
};
