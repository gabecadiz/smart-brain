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
  ROUTE_CHANGE_SIGN_IN,
  ROUTE_CHANGE_REGISTER,
  CHANGE_URL_FIELD
} from '../constants/constants';

export const onEmailChange = email => ({
  type: CHANGE_EMAIL_FIELD,
  payload: email
});

export const onPasswordChange = password => ({
  type: CHANGE_PASSWORD_FIELD,
  payload: password
});

export const onNameChange = name => ({
  type: CHANGE_NAME_FIELD,
  payload: name
});

export const requestLogin = (email, password) => dispatch => {
  dispatch({ type: REQUEST_LOGIN_PENDING });
  fetch('http://localhost:3003/signin', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(res => res.json())
    .then(user => {
      if (!user.id) {
        throw new Error('Invalid login credentials');
      } else {
        return user;
      }
    })
    .then(user => dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: user }))
    .catch(error => dispatch({ type: REQUEST_LOGIN_FAILED, payload: error }));
};

export const routeToSignIn = route => ({
  type: ROUTE_CHANGE_SIGN_IN,
  payload: route
});

export const routeToRegister = route => ({
  type: ROUTE_CHANGE_REGISTER,
  payload: route
});

export const onRequestRegister = (name, email, password) => dispatch => {
  dispatch({ type: REQUEST_REGISTER_PENDING });
  fetch('http://localhost:3003/register', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    })
  })
    .then(res => res.json())
    .then(user => {
      if (!user.id) {
        throw new Error('Invalid register credentials');
      } else {
        return user;
      }
    })
    .then(user => dispatch({ type: REQUEST_REGISTER_SUCCESS, payload: user }))
    .catch(error =>
      dispatch({ type: REQUEST_REGISTER_FAILED, payload: error })
    );
};

// onSignInSubmit = () => {
//   fetch('http://localhost:3003/register', {
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       email: this.state.email,
//       password: this.state.password,
//       name: this.state.name
//     })
//   })
//     .then(res => res.json())
//     .then(user => {
//       if (user.id) {
//         this.props.loadUser(user);
//         this.props.onRouteChange('home');
//       }
//     });
export const onImageLinkChange = url => ({
  type: CHANGE_URL_FIELD,
  payload: url
});
