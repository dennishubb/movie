import { useAppSelector } from '../../../app/hooks';
import { useState, useEffect, useRef } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { genres } from '../../../constants/genres';
import MovieDetailModal from '../Detail/MovieDetailModal';
import './MovieList.css';
import { discoverMovie } from '../../../Api/movie';

function MovieList() {

    const movies = useAppSelector(state => state.movie.movies);
    const pagination = useAppSelector(state => state.movie.pagination);

    const [modalOpen, setModalOpen] = useState(false);
    const [movieData, setMovieData] = useState({});
    const [page, setPage] = useState('1');
    const initialRenderFlag = useRef(true);

    const openMovieDetail = (movie_data:any) => {
        setModalOpen(true);
        setMovieData(movie_data);
    }

    const paginate = (event: React.ChangeEvent<unknown>, page: number) => {
        initialRenderFlag.current = false;
        setPage(page.toString());
    }

    useEffect(()=>{
        localStorage.setItem('page', page);
        if(!initialRenderFlag.current)
            discoverMovie();
    }, [page]);

    return (
        <div id="movieListGroup">
            <ImageList cols={3}>
                {Object.values(movies).map((value:any) => {
                    let imgUrl = '';
                    if(!value.poster_path){
                        imgUrl = 'https://demofree.sirv.com/nope-not-here.jpg?w=150';
                    }else{
                        imgUrl = 'https://image.tmdb.org/t/p/original/'+value.poster_path;
                    }
                    let genre_string = '';
                    const genre_count = value.genre_ids.length;
                    Object.values(value.genre_ids).map((value:any, index:number) => {
                        const object = genres.find(obj => obj.id === value);
                        if(genre_count - 1 === index){
                            genre_string += object!.name
                        }else{
                            genre_string += object!.name + ', ';
                        }
                    })
                    return (
                        <button key={'button'+value.id} onClick={() => openMovieDetail(value)} className='movieListButton'>
                        <ImageListItem key={'ImageListItem'+value.id}>
                        <img key={'img'+value.id}
                            src={`${imgUrl}`}
                            alt={value.title}
                            loading="lazy"
                        />
                        <ImageListItemBar key={'ImageListItemBar'+value.id}
                            title={value.title + ' (' + value.vote_average + '/10)'}
                            subtitle={genre_string}
                        />
                        </ImageListItem>
                        </button>
                    );
                })}
            </ImageList>
            <MovieDetailModal movie_data={movieData} open={modalOpen} onClose={() => setModalOpen(false)}></MovieDetailModal>
            <Stack alignItems={'center'} sx={{margin:'auto'}}>
                <Pagination size='medium' color='primary' page={pagination.page} count={pagination.total_pages} onChange={(e, p) => paginate(e, p)}/>
            </Stack>
        </div>
    );
}
  
export default MovieList;