import React, { Component, createRef } from 'react';
import T from 'prop-types';
import style from './Modal.module.css';

export default class Modal extends Component {
  imgRef = createRef();

  static propTypes = {
    imageToOpen: T.string.isRequired,
    closeModal: T.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.code !== 'Escape') return;

    this.props.closeModal();
  };

  handleImgClick = e => {
    const { current } = this.imgRef;

    if (current && e.target !== current) return;

    this.props.closeModal();
  };

  render() {
    const { imageToOpen } = this.props;
    return (
      <div
        className={style.Overlay}
        onClick={this.handleImgClick}
        role="presentation"
      >
        <div className={style.Modal}>
          <img src={imageToOpen} alt="" role="presentation" />
        </div>{' '}
      </div>
    );
  }
}
