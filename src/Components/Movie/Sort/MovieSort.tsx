import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './MovieSort.css';
import { discoverMovie } from '../../../Api/movie';

function MovieSort() {

    const [sort, setSort] = useState('popularity.desc');

    const initialRenderFlag = useRef(true);

    const selectSort = (event: SelectChangeEvent) => {
        initialRenderFlag.current = false;
        setSort(event.target.value as string);
    };

    useEffect(()=>{
        localStorage.setItem('sort', sort);
        localStorage.setItem('currentActive', 'sort');
        if(!initialRenderFlag.current)
            discoverMovie();
    }, [sort]);

    return (
        <div id="movieSortGroup">
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort By"
                onChange={selectSort}
                >
                <MenuItem value={'popularity.desc'}>Popularity DESC</MenuItem>
                <MenuItem value={'popularity.asc'}>Popularity ASC</MenuItem>
                <MenuItem value={'vote_average.desc'}>Ratings DESC</MenuItem>
                <MenuItem value={'vote_average.asc'}>Ratings ASC</MenuItem>
                <MenuItem value={'primary_release_date.desc'}>Release Date DESC</MenuItem>
                <MenuItem value={'primary_release_date.asc'}>Release Date ASC</MenuItem>
                </Select>
            </FormControl>
            </Box>
        </div>
    );
}
  
export default MovieSort;