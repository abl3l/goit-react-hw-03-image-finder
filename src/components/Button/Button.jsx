import React from 'react';
import T from 'prop-types';
import styles from './Button.module.css';

const Button = ({ loadMore }) => (
  <button type="button" onClick={loadMore} className={styles.Button}>
    Load more{' '}
  </button>
);

Button.propTypes = {
  loadMore: T.func.isRequired,
};
export default Button;
