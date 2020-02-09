import React from 'react';
import T from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.jsx';
import style from './ImageGallery.module.css';

const ImageGallery = ({ items, openModal }) => {
  return (
    <ul className={style.ImageGallery}>
      {' '}
      {items.map(el => (
        <li key={el.id}>
          <ImageGalleryItem item={el} openModal={openModal} />{' '}
        </li>
      ))}{' '}
    </ul>
  );
};
ImageGallery.propTypes = {
  items: T.arrayOf(T.shape({})).isRequired,
  openModal: T.func.isRequired,
};
export default ImageGallery;
