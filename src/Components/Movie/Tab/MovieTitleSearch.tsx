import { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import './MovieTitleSearch.css';
import { discoverMovie } from '../../../Api/movie';

function MovieTitleSearch() {

    const [movieTitle, setTitle] = useState('');

    const initialRenderFlag = useRef(true);

    const searchTitle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        initialRenderFlag.current = false;
        setTitle(event.target.value);
    };

    useEffect(()=>{
        localStorage.setItem('title', movieTitle);
        localStorage.setItem('currentActive', 'title');
        if(!initialRenderFlag.current)
            discoverMovie();
    }, [movieTitle]);

    return (
        <div id="movieTitleSearch">
            <TextField className='TextField' value={movieTitle} sx={{width:'280px'}} id="standard-basic" label="Title" variant="standard" onChange={(e) => searchTitle(e)}/>
        </div>
    );
}
  
export default MovieTitleSearch;