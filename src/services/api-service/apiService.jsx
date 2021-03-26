import { transformSearchResult } from '../../utils/transformFunctions';

class ApiService {
  apiUrl = `https://api.themoviedb.org/3/`;

  apiKey = '87cd013fe4c8dcadb74340ec535ca33e';

  rated = {};

  async getResource(extraUrl) {
    const response = await fetch(`${this.apiUrl}${extraUrl}`);

    if (!response.ok) {
      throw new Error(`Could not fetch ${this.apiUrl}${extraUrl}, received ${response.status}`);
    }

    return response.json();
  }

  async getGuestSessionId() {
    const guestSession = await this.getResource(`authentication/guest_session/new?api_key=${this.apiKey}`);

    return guestSession.guest_session_id;
  }

  async getSearchResult(searchText, page) {
    const searchResult = await this.getResource(
      `search/movie?api_key=${this.apiKey}&query=${searchText}&language=en-US&page=${page}`
    );

    return transformSearchResult(searchResult, this.rated);
  }

  async sendRate(guestSessionId, movieId, rating) {
    const rate = {
      value: rating,
    };

    await fetch(`${this.apiUrl}movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(rate),
    });

    this.rated[movieId] = rating;
  }

  async getRatedMoviesList(guestSessionId, page = 1) {
    const ratedMovies = await this.getResource(
      `guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc&page=${page}`
    );

    return transformSearchResult(ratedMovies, this.rated);
  }

  async getGenres() {
    const genresList = await this.getResource(`genre/movie/list?api_key=${this.apiKey}&language=en-US`);

    return genresList.genres;
  }
}

export default new ApiService();
