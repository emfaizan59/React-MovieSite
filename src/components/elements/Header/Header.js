import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return     (
        <div className="rmdb-header">
                <div className="rmdb-header-content">
               <Link to="/">
                    <img className="rmdb-logo" src="./images/reactMovie_logo.png" alt="Movie Logo"/>
                    </Link>
                    <img className="rmdb-tmdb-logo" src="./images/tmdb_logo.png" alt="Logo"/>
                </div>
        </div>
    )
}

export default Header;