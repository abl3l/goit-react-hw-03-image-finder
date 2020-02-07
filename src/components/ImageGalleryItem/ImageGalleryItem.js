import React from 'react';
import T from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item, openModal }) => {
  return (
    <img
      className={styles.ImageGalleryItem_image}
      id={item.id}
      src={item.webformatURL}
      alt=""
      onClick={openModal}
      role="presentation"
    />
  );
};

ImageGalleryItem.propTypes = {
  item: T.shape({
    webformatURL: T.string.isRequired,
    tags: T.string.isRequired,
    id: T.number.isRequired,
  }).isRequired,
  openModal: T.func.isRequired,
};

export default ImageGalleryItem;
