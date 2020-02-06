import React from 'react'
import './MovieInfo.css'
import {IMAGE_BASE_URL , BACKDROP_SIZE , POSTER_SIZE } from '../../../config';
import MovieThumb from '../MovieThumb/MovieThumb';

const MovieInfoBar = (props) => {
    return(
      <div className="rmdb-movieinfo"
        style = {{
            background : props.movie.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${props.movie.backdrop_path}')` : '#fffffff'
        }}
        >
            <div className="rmdb-movieinfo-content">
            <div className="rmdb-movieinfo-thumb">
                <MovieThumb
                    image = {props.movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.movie.poster_path}` : './images/no_image.jpg'  }
                    clickable = {false}
               />
            </div>
            <div className="rmdb-movieinfo-text">
              <h1>{props.movie.title}</h1>
              <h3>PLOT</h3>
              <p>{props.movie.overview}</p>
              <h3>IMDB Ratings</h3>
                <div classNam="rmdb-rating">
              <meter min = '0' max = '100' optimum = '100' high='70' low ='0' value ={props.movie.vote_average * 10}></meter>
              <p>{props.movie.vote_average*10}%</p>
              </div>
              {props.directors.length > 1 ? <h3>Directors</h3> : <h3>Director</h3> }
            <p>{props.directors.map( (element,i) => {
              return <p key={i} className="imdb-director">{element.name}</p>
            } )}</p>
            </div>
            
            </div>
            
        </div>
          )
}


export default MovieInfoBar;