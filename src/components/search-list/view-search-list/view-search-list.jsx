import React, { Component } from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

import Alert from '../../alert';
import apiService from '../../../services/api-service';
import Movies from '../../movies';

export default class ViewSearchList extends Component {
  state = {
    hasError: false,
    isMoviesNotFound: false,
    loading: false,
    moviesList: null,
    pageNumber: 1,
    totalResults: null,
  };

  componentDidUpdate(prevProps, prevStats) {
    const { searchText } = this.props;
    const { pageNumber } = this.state;

    if (searchText !== prevProps.searchText) {
      this.getMoviesList(searchText);
    }

    if (pageNumber !== prevStats.pageNumber) {
      this.getMoviesList(searchText, pageNumber);
    }
  }

  onMoviesLoaded = ({ moviesList, totalResults }) => {
    if (!totalResults) {
      this.setState({
        isMoviesNotFound: true,
        loading: false,
        moviesList: null,
      });

      return;
    }

    this.setState({
      loading: false,
      moviesList,
      totalResults,
    });
  };

  getMoviesList = (text, page = 1) => {
    if (text === '') {
      this.setState({
        hasError: false,
        isMoviesNotFound: false,
        loading: false,
        moviesList: null,
        totalResults: null,
      });

      return;
    }

    this.setState({
      hasError: false,
      isMoviesNotFound: false,
      loading: true,
      moviesList: null,
      totalResults: null,
    });

    const { pageNumber } = this.state;

    if (pageNumber !== page) {
      this.setState({
        pageNumber: page,
      });
    }

    apiService.getSearchResult(text, page).then(this.onMoviesLoaded).catch(this.onError);
  };

  onError = () => {
    this.setState({
      hasError: true,
      loading: false,
    });
  };

  onPageChange = (newPage) => {
    const { pageNumber } = this.state;

    if (newPage !== pageNumber) {
      this.setState({
        pageNumber: newPage,
      });
    }
  };

  render() {
    const { hasError, isMoviesNotFound, loading, moviesList, pageNumber, totalResults } = this.state;

    if (hasError) {
      return <Alert type="error" message="Error" description="Something has gone wrong" />;
    }

    if (isMoviesNotFound) {
      return <Alert type="info" message="Movies not found" description="You can try again" />;
    }

    if (loading) return <Spin size="large" />;

    if (moviesList) {
      return (
        <Movies
          moviesList={moviesList}
          onPageChange={this.onPageChange}
          pageNumber={pageNumber}
          totalResults={totalResults}
        />
      );
    }

    return <Alert type="success" message="Movies search" description="Enter a title of a movie" />;
  }
}

ViewSearchList.propTypes = {
  searchText: PropTypes.string.isRequired,
};
