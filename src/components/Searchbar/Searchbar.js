import React, { Component } from 'react';
import T from 'prop-types';
import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  static propTypes = {
    onSubmit: T.func.isRequired,
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.value);

    this.setState({
      value: '',
    });
  };

  render() {
    const { value } = this.state;
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchForm_button}>
            <span className={styles.SearchForm_button_label}> Search </span>{' '}
          </button>

          <input
            className={styles.SearchForm_input}
            onChange={this.handleChange}
            value={value}
            type="text"
            autoComplete="off"
            placeholder="Search images and photos"
          />
        </form>{' '}
      </header>
    );
  }
}
