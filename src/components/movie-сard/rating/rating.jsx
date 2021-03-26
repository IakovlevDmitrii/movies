import React, { Component } from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';

import './rating.css';
import apiService from '../../../services/api-service';

const description = [
  'terrible',
  'terrible',
  'bad',
  'bad',
  'normal',
  'normal',
  'good',
  'good',
  'wonderful',
  'wonderful',
];

export default class Rating extends Component {
  state = {
    rating: 0,
  };

  componentDidMount() {
    const { rating } = this.props;
    this.setState({
      rating,
    });
  }

  onRateChange = (rating) => {
    this.setState({
      rating,
    });

    const { guestSessionId, id } = this.props;

    apiService.sendRate(guestSessionId, id, rating);
  };

  render() {
    const { rating } = this.state;

    return (
      <div className="movie-card__rate">
        <Rate allowHalf count={10} onChange={this.onRateChange} value={rating} tooltips={description} />
      </div>
    );
  }
}

Rating.propTypes = {
  guestSessionId: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};
