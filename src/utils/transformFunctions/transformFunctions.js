import { format } from 'date-fns';

const transformOverview = (text) => {
  const redExp = /.{170}\S*/s;
  const overview = text || 'No overview found';

  return overview.length > 170 ? `${overview.match(redExp)} ...` : overview;
};

const transformPosterUrl = (url) => {
  const apiImagesUrl = 'https://image.tmdb.org/t/p/';
  const posterSize = 'w185';

  return url ? `${apiImagesUrl}${posterSize}${url}` : false;
};

const transformReleaseDate = (date) => {
  return date ? format(new Date(date), 'MMMM d, yyyy') : 'No release date found';
};

const transformMovie = (movie, rate) => {
  const genreIds = movie.genre_ids;
  const { id } = movie;
  const overview = transformOverview(movie.overview);
  const posterUrl = transformPosterUrl(movie.poster_path);
  const rating = movie.rating || rate;
  const releaseDate = transformReleaseDate(movie.release_date);
  const title = movie.original_title;
  const voteAverage = movie.vote_average;

  return {
    genreIds,
    id,
    overview,
    posterUrl,
    rating,
    releaseDate,
    title,
    voteAverage,
  };
};

const transformSearchResult = (searchResult, rated) => {
  const moviesList = searchResult.results.map((movie) => {
    const { id } = movie;
    const rating = id in rated ? rated[id] : 0;

    return transformMovie(movie, rating);
  });

  const totalResults = searchResult.total_results;

  return {
    moviesList,
    totalResults,
  };
};

export { transformMovie, transformOverview, transformPosterUrl, transformReleaseDate, transformSearchResult };
