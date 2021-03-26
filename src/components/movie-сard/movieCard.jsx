import React from 'react';
import PropTypes from 'prop-types';

import ErrorBoundary from '../error-boundary';
import Genres from './genres/genres';
import Rate from './rate';

import './movie-card.css';
import posterNotFound from './poster-not-found-grey.png';

const MovieCard = ({ movie: { genreIds, id, overview, posterUrl, rating, releaseDate, title, voteAverage } }) => {
  let voteAverageClassName = 'movie-card__vote-average';

  if (voteAverage >= 7) {
    voteAverageClassName += ' movie-card__vote-average_wonderful';
  } else if (voteAverage >= 5) {
    voteAverageClassName += ' movie-card__vote-average_good';
  } else if (voteAverage >= 3) {
    voteAverageClassName += ' movie-card__vote-average_normal';
  } else {
    voteAverageClassName += ' movie-card__vote-average_bad';
  }

  return (
    <ErrorBoundary>
      <article className="movie-card">
        <div className="movie-card__poster">
          <img className="movie-card__image" src={posterUrl || posterNotFound} alt={`Poster: ${title}`} />
        </div>
        <div className="movie-card__title">
          <h5>{title}</h5>
        </div>
        <div className={voteAverageClassName}>{voteAverage}</div>
        <p className="movie-card__release-date">{releaseDate}</p>
        <Genres genreIds={genreIds} />
        <p className="movie-card__overview">{overview}</p>
        <Rate rating={rating} id={id} />
      </article>
    </ErrorBoundary>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    id: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    posterUrl: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
    rating: PropTypes.number.isRequired,
    releaseDate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    voteAverage: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;
