import React, { Component } from 'react';
import Loader from './Loader/Loader.jsx';
import * as api from '../services/Api';
import Searchbar from './Searchbar/Searchbar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Button from './Button/Button.jsx';
import Modal from './Modal/Modal.jsx';
import styles from './App.module.css';

export default class App extends Component {
  state = {
    images: [],
    category: '',
    isLoading: false,
    isModalOpen: false,
    imageToOpen: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { images } = this.state;
    if (images !== prevState.images) {
      this.scrollFunc();
    }
  }

  scrollFunc = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  loadMore = () => {
    const { category, page } = this.state;

    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    api.searchByQuery(category, page).then(response =>
      this.setState(state => ({
        images: [...state.images, ...response.data.hits],
      })),
    );
  };

  handleChangeCategory = value => {
    this.setState(
      {
        category: value,
        images: [],
        isLoading: true,
      },
      this.fetchImg(value),
    );
  };

  fetchImg = value => {
    api
      .searchByQuery(value)
      .then(response =>
        this.setState({
          images: response.data.hits,
        }),
      )
      .catch(err => {
        throw new Error(err);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  openModal = ({ target }) => {
    const { images } = this.state;
    const imageUrl = images.find(item => {
      return item.id === Number(target.id);
    }).largeImageURL;
    this.setState({
      isModalOpen: true,
      imageToOpen: imageUrl,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { isModalOpen, imageToOpen, images, isLoading } = this.state;
    return (
      <section className={styles.wrap}>
        {' '}
        {isLoading && <Loader />}{' '}
        <Searchbar onSubmit={this.handleChangeCategory} />{' '}
        <ImageGallery items={images} openModal={this.openModal} />{' '}
        {images.length > 0 && <Button loadMore={this.loadMore} />}{' '}
        {isModalOpen && (
          <Modal imageToOpen={imageToOpen} closeModal={this.closeModal} />
        )}{' '}
      </section>
    );
  }
}
