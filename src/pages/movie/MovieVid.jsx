import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './movievid.css';
const MovieVid = () => {
  return (
    <section className='movievideo'>
    <video className="video" autoPlay loop muted controls src=''/>
    </section>
  )
}

export default MovieVid