import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { getMovieCredits } from '../../../Api/movie';
import { useAppSelector } from '../../../app/hooks';

const style = {
    position: 'absolute' as 'absolute',
    top: '20px',
    left: '20px',
    right: '20px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:'block',
  };
  
function MovieDetailModal(props:{movie_data: any, open: boolean, onClose:()=>void}) {

    const cast = useAppSelector(state => state.movie.cast);

    useEffect(()=>{
        if(props.open === true){
            getMovieCredits(props.movie_data.id)
        }
    }, [props.open]);

    return (
      <div>
        <Modal
          open={props.open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ overflowY: "scroll"}}
          onClose={props.onClose}
        >
            <Box sx={style} onClick={props.onClose}>
                <Typography id="modal-modal-title" variant="h3" component="h2">
                    {props.movie_data.title}
                </Typography>
                <Typography id="modal-modal-release-date" variant="h6" component="h2">
                    {'Release Date: ' + props.movie_data.release_date}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {props.movie_data.overview}
                </Typography>
                <List dense sx={{top:'10px'}}>
                {Object.values(cast).map((value:any) => {
                    const avatar_url = 'https://image.tmdb.org/t/p/w45/' + value.profile_path;
                    return (
                        <ListItem
                            key={value.id}
                        >
                            <ListItemAvatar>
                                <Avatar
                                alt={value.name}
                                src={avatar_url}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={value.name+' as '+value.character} />
                        </ListItem>
                    );
                })}
                 </List>
            </Box>
        </Modal>
      </div>
    );
  }
  
export default MovieDetailModal;