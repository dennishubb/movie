import { useAppSelector } from '../app/hooks';

export function QueryBuilder(){
    //https://developer.themoviedb.org/reference/discover-movie
    const [genre, ratings, sort, title, page, currentActive] = [JSON.parse(localStorage.getItem('genres') || ''), JSON.parse(localStorage.getItem('ratings') || '') || [0, 10], localStorage.getItem('sort'), localStorage.getItem('title') || '', localStorage.getItem('page') || '1', localStorage.getItem('currentActive')];

    let queryString = process.env.REACT_APP_API_URL! + process.env.REACT_APP_API_VERSION;
    const api_key = process.env.REACT_APP_API_KEY;

    if(currentActive === 'title' && title.length > 0){
        //TMDB do not have an API that searches for title with sort and filters, hence we have to separate it to it's own query
        //https://developer.themoviedb.org/reference/search-movie
        return queryString + '/search/movie?api_key=' + api_key + '&page=' + page + '&query=' + title ;
    }

    queryString += '/discover/movie?api_key=' + api_key + '&page=' + page + '&sort_by=' + sort;

    if(genre.length > 0){
        queryString += '&with_genres=';
        Object.values(genre).map((value) => {
            queryString += value +',';
        });
    }

    queryString += '&vote_average.gte=' + ratings[0] + '&vote_average.lte=' + ratings[1];

    return queryString;
}