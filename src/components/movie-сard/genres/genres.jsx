import React from 'react';
import PropTypes from 'prop-types';
import { GenresConsumer } from '../../../context/genres-context';

const Genres = ({ genreIds }) => {
  return (
    <GenresConsumer>
      {(genresData) => {
        const genreList = genreIds.map((genreId) => {
          const genreData = genresData.find((genre) => genre.id === genreId);
          return (
            <div className="movie-card__genre" key={genreId}>
              {genreData.name}
            </div>
          );
        });
        return <div className="movie-card__genres">{genreList}</div>;
      }}
    </GenresConsumer>
  );
};

Genres.propTypes = {
  genreIds: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default Genres;
