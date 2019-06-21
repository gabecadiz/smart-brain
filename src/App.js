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

const mapStateToProps = state => {
  return {
    route: state.requestLogin.route,
    isSignedIn: state.requestLogin.isSignedIn,
    user: state.requestLogin.user,
    imageUrl: state.requestAPI.imageUrl,
    displayImage: state.requestAPI.displayImage,
    box: state.requestAPI.box
  };
};

const mapDispatchToProps = dispatch => {
  return {
    routeToSignIn: route => dispatch(routeToSignIn(route))
  };
};
class App extends Component {
  render() {
    const {
      route,
      isSignedIn,
      routeToSignIn,
      user,
      imageUrl,
      displayImage,
      box
    } = this.props;
    return (
      <div className='App'>
        <Particles className='particles' params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={routeToSignIn} />
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm />
            <FaceRecognition
              box={box}
              imageUrl={imageUrl}
              displayImage={displayImage}
            />
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
