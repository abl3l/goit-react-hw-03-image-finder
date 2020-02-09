import React, { Component } from 'react';
import Loader from './Loader/Loader.jsx';
import * as api from '../services/Api';
import Searchbar from './Searchbar/Searchbar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Button from './Button/Button.jsx';
import Modal from './Modal/Modal.jsx';

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
    const { category, page } = this.state;
    if (page !== prevState.page) {
      api.searchByQuery(category, page).then(response =>
        this.setState(state => ({
          images: [...state.images, ...response.data.hits],
        })),
      );
    }
  }

  scrollFunc = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      this.scrollFunc(),
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
      <section>
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
