import { setCast, setMovie } from '../redux/reducers/movie';
import { store } from '../app/store';
import { QueryBuilder } from './queryBuilder';
import axios from 'axios';

export function discoverMovie() {
    axios.get(QueryBuilder())
    .then((response) => {
        store.dispatch(setMovie(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
}

export function getMovieCredits(movie_id:string){
    axios.get('https://api.themoviedb.org/3/movie/'+movie_id+'/credits?api_key='+process.env.REACT_APP_API_KEY)
    .then((response) => {
        store.dispatch(setCast(response.data.cast));
    })
    .catch((error) => {
        console.log(error);
    });
}