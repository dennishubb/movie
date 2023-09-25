import '../Styles/carparkView.css';
import './Movie/Filter/MovieFilter';
import MovieFilter from './Movie/Filter/MovieFilter';
import MovieList from './Movie/List/MovieList';
import MovieSort from './Movie/Sort/MovieSort';
import MovieTitleSearch from './Movie/Tab/MovieTitleSearch';
import { useEffect } from 'react';
import { discoverMovie } from '../Api/movie';

function MovieView() {

    useEffect(() => discoverMovie(), []);

    localStorage.setItem('ratings', JSON.stringify([0, 10]));
    localStorage.setItem('genres', JSON.stringify([]));

    return (
        <div>
            <MovieTitleSearch></MovieTitleSearch>
            <MovieFilter></MovieFilter>
            <MovieSort></MovieSort>
            <MovieList></MovieList>
        </div>
    );
}
  
export default MovieView;