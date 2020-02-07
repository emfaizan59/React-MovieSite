import React from 'react';
import './HeroImage.css';
import {Link} from 'react-router-dom';
const HeroImage = (props) => {
    return (
        <div className="rmdb-heroimage"
        style={{
            background : 
            `linear-gradient(to bottom, rgba(0,0,0,0)
            39%, rgba(0,0,0,0)
            41%, rgba(0,0,0,0.65)
            100%),
            url('${props.image}'), #1c1c1c`
        }}
        >
            <div className="rmdb-heroimage-content"  >
                <div className="rmdb-heroimage-text">
                <Link to = {{ pathname : `/${props.movieId}` }}>
                <a>{props.title}</a>
                </Link>
                <p>{props.text}</p>
                </div>

            </div>
        </div>
    )
}

export default HeroImage;