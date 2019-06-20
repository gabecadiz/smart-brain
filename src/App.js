import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import particleOptions from './particleOptions';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import { routeToSignIn } from './actions/actions';

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

const mapStateToProps = state => {
  return {
    route: state.requestLogin.route,
    isSignedIn: state.requestLogin.isSignedIn,
    user: state.requestLogin.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    routeToSignIn: route => dispatch(routeToSignIn(route))
  };
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };
  //returns an array of face boundary locations from input image
  calculateFaceLocation = data => {
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

    return clarifaiArray;
  };
  displayFaceBox = box => {
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('http://localhost:3003/imagesurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3003/images', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  render() {
    const { box, imageUrl } = this.state;
    const { route, isSignedIn, routeToSignIn, user } = this.props;
    return (
      <div className='App'>
        <Particles className='particles' params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={routeToSignIn} />
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === 'signin' ? (
          <SignIn />
        ) : (
          <Register />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
