import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  onEmailChange,
  onPasswordChange,
  requestLogin,
  routeToRegister
} from '../../actions/actions';

const mapStateToProps = state => {
  return {
    email: state.setLoginField.email,
    password: state.setLoginField.password,
    user: state.requestLogin.user,
    isPending: state.requestLogin.isPending,
    error: state.requestLogin.error,
    route: state.requestLogin.route
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEmailChange: event => dispatch(onEmailChange(event.target.value)),
    onPasswordChange: event => dispatch(onPasswordChange(event.target.value)),
    onRequestLogin: (email, password) =>
      dispatch(requestLogin(email, password)),
    routeToRegister: route => dispatch(routeToRegister(route))
  };
};
class SignIn extends Component {
  render() {
    const {
      routeToRegister,
      onEmailChange,
      onPasswordChange,
      onRequestLogin
    } = this.props;
    return (
      <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  onChange={onEmailChange}
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='email'
                  name='email-address'
                  id='email-address'
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password
                </label>
                <input
                  onChange={onPasswordChange}
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='password'
                  id='password'
                />
              </div>
            </fieldset>
            <div className=''>
              <input
                onClick={() =>
                  onRequestLogin(this.props.email, this.props.password)
                }
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='Sign in'
              />
            </div>
            <div className='lh-copy mt3'>
              <p
                onClick={() => routeToRegister('register')}
                className='f6 link dim black db pointer'
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
