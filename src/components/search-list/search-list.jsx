import React, { Component } from 'react';
import { Layout } from 'antd';

import Input from '../input';
import ViewSearchList from './view-search-list';

const { Content } = Layout;

export default class SearchList extends Component {
  state = {
    searchText: '',
  };

  onSearchAdded = (searchText) => {
    this.setState({ searchText });
  };

  render() {
    const { searchText } = this.state;

    return (
      <>
        <Input onSearchAdded={this.onSearchAdded} searchText={searchText} />
        <Content className="content">
          <ViewSearchList searchText={searchText} />
        </Content>
      </>
    );
  }
}
