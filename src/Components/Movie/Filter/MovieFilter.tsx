import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { useState, useEffect, useRef } from 'react';
import './MovieFilter.css';
import { discoverMovie } from '../../../Api/movie';
import { genres } from '../../../constants/genres';

function MovieFilter() {

    const [ratings, setRatings] = useState<number[]>(JSON.parse(localStorage.getItem('ratings') || '') || [0,10]);
    const [selectedGenres, setSelectedGenres] = useState(JSON.parse(localStorage.getItem('genres') || '') || []);
    const initialRenderFlag = useRef(true);

    useEffect(()=>{
        localStorage.setItem('ratings', JSON.stringify(ratings));
        localStorage.setItem('currentActive', 'filter');
        if(!initialRenderFlag.current)
            discoverMovie();
    }, [ratings]);

    useEffect(()=>{
        localStorage.setItem('genres', JSON.stringify(selectedGenres));
        localStorage.setItem('currentActive', 'filter');
        if(!initialRenderFlag.current)
            discoverMovie();
    }, [selectedGenres]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        initialRenderFlag.current = false;
        setRatings(newValue as number[]);
    };

    const slider_marks = [
        {
            value: 0,
            label: '0',
          },
          {
            value: 10,
            label: '10',
          },
    ];

    const genre_click = (e:any) => {
        initialRenderFlag.current  = false;
        const selected_genre_id = e.target.id;
        if(selectedGenres!.includes(e.target.id)){
            const index = selectedGenres.indexOf(selected_genre_id);
            selectedGenres.splice(index, 1);
        }
        else
            selectedGenres.push(selected_genre_id);
        setSelectedGenres([...selectedGenres]);
    }

    return (
        <div id="movieFilterGroup">
            <div id="movieGenreGroup">
                {Object.values(genres).map((value) => {
                    return (
                        <Button id={value.id.toString()} variant="text" sx={selectedGenres.includes(value.id.toString()) ? {fontWeight:700} : {}} key={value.id} className='movieGenre' onClick={genre_click}>
                            {value.name}
                        </Button>
                    );
                })}
            </div>
            <div id='ratingsSlider'>
                <div>Ratings</div>
                <div id="sliderContainer">
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={ratings}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    max={10}
                    marks={slider_marks}
                    />
                </div>
            </div>
        </div>
    );
}
  
export default MovieFilter;