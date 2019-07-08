### Smart Brain Summary

Smart Brain is a React.js based front-end that is combined with a Node/Express API [backend](https://github.com/gabecadiz/smart-brain-api)

Smart brain is a single page application that allows users to submit a link to a photo. If a correct image link is inputted and submitted, the app will display the image and shortly update to provide boxes around any faces detected by the Clarifai face detection model.

## Register / Sign In Capabilities

![Smart Brain Register/ SignUp](/assets/smart-brain-login-reg.gif)

## Face Detection (

![Smart Brain Single Face Detection](/assets/smart-brain-single-face.gif)
![Smart Brain Multiple Face Detection](/assets/smart-brain-multiple-faces.gif)

### Setup

Smart Brain is deployed via Heroku and can be found [here](https://smart-brain-gc.herokuapp.com/)

### Front End Dependencies

- React
- React-particles-js
- React-Redux
- React-tilt
- Redux
- Redux-logger
- Redux-thunk
- tachyons

### Back End Dependencies

[backend](https://github.com/gabecadiz/smart-brain-api)

- Bcrypt
- Clarifai
- Cors
- Express
- Knex
- Nodemon
- Pg
