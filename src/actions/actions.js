import {
  CHANGE_EMAIL_FIELD,
  REQUEST_LOGIN_PENDING,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILED
} from '../constants/constants';

export const onEmailChange = email => ({
  type: CHANGE_EMAIL_FIELD,
  payload: email
});

export const requestLogin = (email, password) => dispatch => {
  dispatch({ type: REQUEST_LOGIN_PENDING });
  console.log('inside req login', email);
  console.log('inside req login', password);
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

  // .then(user => {
  //   if (user.id) {
  //     this.props.loadUser(user);
  //     this.props.onRouteChange('home');
  //   }
  // });
};
