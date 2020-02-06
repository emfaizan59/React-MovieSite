import React from 'react'
import './MovieInfoBar.css'
import {calcTime, convertMoney} from '../../../helpers'
const MovieInfoBar = (props) => {
    return (
        <div className="rmdb-movieinfobar">
            <div className="rmdb-movieinfobar-content">
                <div className="rmdb-movieinfobar-content-col">
                    <div className="rmdb-movieinfobar-info">
                    <h4>Running Time: {calcTime(props.info.runtime)} </h4>
            
                    </div>
                </div>


                <div className="rmdb-movieinfobar-content-col">
                    <div className="rmdb-movieinfobar-info">
                   <h4>Budget: {convertMoney(props.info.budget)}</h4>
                    </div>
                </div>


                <div className="rmdb-movieinfobar-content-col">
                    <div className="rmdb-movieinfobar-info">
                    <h4>Revenue: {convertMoney(props.info.revenue)}</h4>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default MovieInfoBar