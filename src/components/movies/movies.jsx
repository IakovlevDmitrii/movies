import React from 'react';
import { Col, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';

import MovieCard from '../movie-сard';

import './movies.css';

const Movies = ({ moviesList, onPageChange, pageNumber, totalResults }) => {
  const movies = moviesList.map((movie) => {
    const { id } = movie;

    return (
      <Col sm={24} md={moviesList.length === 1 ? 24 : 12} key={id} flex="1 1 100%">
        <MovieCard movie={movie} />
      </Col>
    );
  });

  return (
    <>
      <Row gutter={{ sm: 16, md: 24, lg: 32 }}>{movies}</Row>
      <div className="pagination">
        <Pagination
          current={pageNumber}
          defaultPageSize="20"
          hideOnSinglePage
          onChange={onPageChange}
          size="small"
          showSizeChanger={false}
          total={totalResults}
        />
      </div>
    </>
  );
};

Movies.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
};

export default Movies;
