import React, { Component } from 'react';
import { Layout } from 'antd';

import apiService from '../../services/api-service';

import Alert from '../alert';
import ErrorBoundary from '../error-boundary';
import { GenresProvider } from '../../context/genres-context';
import { GuestSessionIdProvider } from '../../context/guest-session-id-context';
import Menu from '../menu';
import RatedList from '../rated';
import SearchList from '../search-list';

import 'antd/dist/antd.css';
import './app.css';

export default class App extends Component {
  state = {
    genresData: null,
    guestSessionId: '',
    hasError: false,
    selectedTab: 'search',
  };

  componentDidMount() {
    apiService
      .getGuestSessionId()
      .then((id) => this.onGuestSessionIdLoaded(id))
      .catch(this.onError);

    apiService
      .getGenres()
      .then((genres) => this.onGenresLoaded(genres))
      .catch(this.onError);
  }

  onGuestSessionIdLoaded = (id) => {
    this.setState({
      guestSessionId: id,
    });
  };

  onGenresLoaded = (genres) => {
    this.setState({
      genresData: genres,
    });
  };

  onError = () => {
    this.setState({
      hasError: true,
    });
  };

  onTabChange = (selectedTab) => {
    this.setState({ selectedTab });
  };

  render() {
    const { genresData, guestSessionId, hasError, selectedTab } = this.state;

    if (hasError) {
      return <Alert type="error" message="Error" description="Something has gone wrong" />;
    }

    const getMoviesList = () => {
      switch (selectedTab) {
        case 'search':
          return <SearchList />;
        case 'rated':
          return <RatedList />;
        default:
          return <SearchList />;
      }
    };

    return (
      <ErrorBoundary>
        <GuestSessionIdProvider value={guestSessionId}>
          <GenresProvider value={genresData}>
            <Layout>
              <Menu onTabChange={this.onTabChange} selectedTab={selectedTab} />
              {getMoviesList()}
            </Layout>
          </GenresProvider>
        </GuestSessionIdProvider>
      </ErrorBoundary>
    );
  }
}
