import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeToSignIn, routeToRegister } from '../../actions/actions';

const mapStateToProps = state => {
  return {
    route: state.requestLogin.route,
    isSignedIn: state.requestLogin.isSignedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    routeToSignIn: route => dispatch(routeToSignIn(route)),
    routeToRegister: route => dispatch(routeToRegister(route))
  };
};

class Navigation extends Component {
  render() {
    const { isSignedIn, routeToSignIn, routeToRegister } = this.props;

    return (
      <div>
        {isSignedIn ? (
          <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p
              onClick={() => routeToSignIn('signin')}
              className='f3 link dim black underline pa3 pointer'
            >
              Sign Out
            </p>
          </nav>
        ) : (
          <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p
              onClick={() => routeToSignIn('signin')}
              className='f3 link dim black underline pa3 pointer'
            >
              Sign In
            </p>
            <p
              onClick={() => routeToRegister('register')}
              className='f3 link dim black underline pa3 pointer'
            >
              Register
            </p>
          </nav>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
