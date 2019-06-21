import {
  CHANGE_EMAIL_FIELD,
  CHANGE_PASSWORD_FIELD,
  CHANGE_NAME_FIELD,
  REQUEST_LOGIN_PENDING,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILED,
  REQUEST_REGISTER_PENDING,
  REQUEST_REGISTER_SUCCESS,
  REQUEST_REGISTER_FAILED,
  ROUTE_CHANGE_REGISTER,
  CHANGE_URL_FIELD
} from '../constants/constants';

const initialStateForm = {
  email: '',
  password: ''
};

export const setLoginField = (state = initialStateForm, action = {}) => {
  switch (action.type) {
    case CHANGE_EMAIL_FIELD:
      return Object.assign({}, state, { email: action.payload });
    case CHANGE_PASSWORD_FIELD:
      return Object.assign({}, state, { password: action.payload });
    case CHANGE_NAME_FIELD:
      return Object.assign({}, state, { name: action.payload });
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
  route: 'signin',
  isSignedIn: false
};
//handles all user related state
export const requestLogin = (state = initialStateUser, action = {}) => {
  switch (action.type) {
    case REQUEST_LOGIN_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload,
        isPending: false,
        route: 'home',
        isSignedIn: true
      });
    case REQUEST_LOGIN_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false
      });
    case REQUEST_REGISTER_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_REGISTER_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload,
        isPending: false,
        route: 'home',
        isSignedIn: true
      });
    case REQUEST_REGISTER_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false
      });
    // signout/change route to sign in handled on index.js root reducer
    // case ROUTE_CHANGE_SIGN_IN:
    //   return Object.assign({}, state, { ...initialStateUser });
    case ROUTE_CHANGE_REGISTER:
      return Object.assign({}, state, { route: action.payload });
    default:
      return state;
  }
};

const initialStateAPI = {};

export const requestAPI = (state = initialStateAPI, action = {}) => {
  switch (action.type) {
    case CHANGE_URL_FIELD:
      return Object.assign({}, state, { imageUrl: action.payload });
    default:
      return state;
  }
};
