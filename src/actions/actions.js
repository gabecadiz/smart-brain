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
  CHANGE_URL_FIELD,
  REQUEST_CLARIFAI_PENDING,
  REQUEST_CLARIFAI_SUCCESS,
  REQUEST_CLARIFAI_FAILED,
  REQUEST_COUNT_SUCCESS,
  REQUEST_COUNT_FAILED
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
  fetch('https://pure-tundra-20739.herokuapp.com/signin', {
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
  fetch('https://pure-tundra-20739.herokuapp.com/register', {
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

export const onRequestClarifai = (imageUrl, id) => dispatch => {
  dispatch({ type: REQUEST_CLARIFAI_PENDING });
  fetch('https://pure-tundra-20739.herokuapp.com/imagesurl', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: imageUrl
    })
  })
    .then(res => res.json())
    .then(data => {
      //returns an array of face boundary locations from input image

      let clarifaiArray = data.outputs[0].data.regions.map(region => {
        let boundaries = region.region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);

        return {
          leftCol: boundaries.left_col * width,
          topRow: boundaries.top_row * height,
          rightCol: width - boundaries.right_col * width,
          bottomRow: height - boundaries.bottom_row * height + 50
        };
      });
      dispatch({ type: REQUEST_CLARIFAI_SUCCESS, payload: clarifaiArray });
    })
    .then(() => {
      fetch('https://pure-tundra-20739.herokuapp.com/images', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id
        })
      })
        .then(res => res.json())
        .then(count =>
          dispatch({ type: REQUEST_COUNT_SUCCESS, payload: count })
        )
        .catch(error =>
          dispatch({ type: REQUEST_COUNT_FAILED, payload: error })
        );
    })
    .catch(error =>
      dispatch({ type: REQUEST_CLARIFAI_FAILED, payload: error })
    );
};

export const onImageUrlChange = url => ({
  type: CHANGE_URL_FIELD,
  payload: url
});
