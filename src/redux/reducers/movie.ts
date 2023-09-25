import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: {},
  cast: {},
  pagination:{
    page: 1,
    total_pages: 1,
    total_results: 1,
  }
}

const movie = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {
    setMovie: (state, action) => {
      state.movies = action.payload.results;
      //"errors": [
      //     "page must be less than or equal to 500"
      // ],
      // tmdb API allows up to 500 page only
      // https://www.themoviedb.org/talk/587bea71c3a36846c300ff73
      state.pagination.total_pages = action.payload.total_pages > 500 ? 500 : action.payload.total_pages;
      state.pagination.page = action.payload.page;
    },
    setCast: (state, action) => {
      state.cast = action.payload;
    }
  }
})

export const { setMovie, setCast } = movie.actions
export default movie.reducer