import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import LoaderStyles from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    <LoaderStyles type="ThreeDots" color="#3f51b5" height={100} width={100} />
  </div>
);

export default Loader;
