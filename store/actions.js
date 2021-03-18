import Movie from "../models/Movie";
import { API_URL, genres, getBackdropPath, getImagePath } from "../config";

export const GET_MOVIES_START = "GET_MOVIES_START";
export const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";
export const GET_MOVIES_FAIL = "GET_MOVIES_FAIL";

export const getMovies = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_MOVIES_START });
      let response = await fetch(API_URL);
      response = await response.json();
      const MoviesList = [];
      response.results.forEach((movie) =>
        MoviesList.push(
          new Movie(
            movie.id,
            movie.title,
            movie.overview,
            getImagePath(movie.poster_path),
            getBackdropPath(movie.backdrop_path),
            movie.genre_ids.map((id) => genres[id]),
            movie.vote_average
          )
        )
      );
      dispatch({ type: GET_MOVIES_SUCCESS, payload: MoviesList });
    } catch (error) {
      dispatch({ type: GET_MOVIES_FAIL, payload: error });
    }
  };
};
