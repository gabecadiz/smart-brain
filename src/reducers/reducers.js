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
  CHANGE_URL_FIELD,
  REQUEST_CLARIFAI_PENDING,
  REQUEST_CLARIFAI_SUCCESS,
  REQUEST_CLARIFAI_FAILED,
  REQUEST_COUNT_SUCCESS,
  REQUEST_COUNT_FAILED
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
    case REQUEST_COUNT_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          entries: action.payload
        }
      };
    case REQUEST_COUNT_FAILED:
      return Object.assign({}, state, { error: action.payload });
    // signout/change route to sign in handled on index.js root reducer
    // case ROUTE_CHANGE_SIGN_IN:
    //   return Object.assign({}, state, { ...initialStateUser });
    case ROUTE_CHANGE_REGISTER:
      return Object.assign({}, state, { route: action.payload });
    default:
      return state;
  }
};

const initialStateAPI = {
  imageUrl: '',
  displayImage: false,
  box: [],
  clarifaiPending: false,
  clarifaiError: ''
};

export const requestAPI = (state = initialStateAPI, action = {}) => {
  switch (action.type) {
    case CHANGE_URL_FIELD:
      return Object.assign({}, state, { imageUrl: action.payload, box: [] });
    case REQUEST_CLARIFAI_PENDING:
      return Object.assign({}, state, {
        clarifaiPending: true,
        displayImage: true,
        box: []
      });
    case REQUEST_CLARIFAI_SUCCESS:
      return Object.assign({}, state, {
        box: action.payload
      });
    case REQUEST_CLARIFAI_FAILED:
      return Object.assign({}, state, { clarifaiError: action.payload });
    default:
      return state;
  }
};
