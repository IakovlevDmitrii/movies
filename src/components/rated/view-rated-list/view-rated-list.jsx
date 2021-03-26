import React, { Component } from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

import Alert from '../../alert';
import apiService from '../../../services/api-service';
import Movies from '../../movies/movies';

import '../../movies/movies.css';

export default class ViewRatedList extends Component {
  state = {
    hasError: false,
    isMoviesNotFound: false,
    loading: true,
    moviesList: null,
    pageNumber: 1,
    totalResults: null,
  };

  componentDidMount() {
    const { guestSessionId } = this.props;
    this.guestSessionId = guestSessionId;

    apiService.getRatedMoviesList(guestSessionId).then(this.onMoviesLoaded).catch(this.onError);
  }

  componentDidUpdate(prevProps, prevState) {
    const { pageNumber } = this.state;

    if (pageNumber !== prevState.pageNumber) {
      apiService.getRatedMoviesList(this.guestSessionId, pageNumber).then(this.onMoviesLoaded).catch(this.onError);
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
          guestSessionId={this.guestSessionId}
          moviesList={moviesList}
          onPageChange={this.onPageChange}
          pageNumber={pageNumber}
          totalResults={totalResults}
        />
      );
    }

    return <Alert type="info" message="Movies not found" description="You can try again" />;
  }
}

ViewRatedList.propTypes = {
  guestSessionId: PropTypes.string.isRequired,
};
