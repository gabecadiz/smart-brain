import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ImageLinkForm.css';
import { onImageUrlChange, onRequestClarifai } from '../../actions/actions';

const mapStateToProps = state => {
  return {
    id: state.requestLogin.user.id,
    imageUrl: state.requestAPI.imageUrl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onImageUrlChange: event => dispatch(onImageUrlChange(event.target.value)),
    onRequestClarifai: (imageUrl, id) =>
      dispatch(onRequestClarifai(imageUrl, id))
  };
};

class ImageLinkForm extends Component {
  render() {
    const { onImageUrlChange, onRequestClarifai, id, imageUrl } = this.props;
    return (
      <div>
        <p className='f3'>
          {'This magic Brain will detect faces in your pictures. Give it a try'}
        </p>
        <div className='center'>
          <div className='form center pa4 br3 shadow-5'>
            <input
              className='f4 pa2 w-70 center'
              type='text'
              onChange={onImageUrlChange}
            />
            <button
              onClick={() => onRequestClarifai(imageUrl, id)}
              className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            >
              Detect
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageLinkForm);
