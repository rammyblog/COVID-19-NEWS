import React, {useContext} from 'react';
import Cards from './Cards';
import StatsRow from './StatsRow';
import Android from '../assets/android.png';
import {newsContext} from "../context/NewsContext";

function Dashboard() {
    const {news} = useContext(newsContext);
    return (
        <div className='center-block'>
            <StatsRow/>
            <Cards/>
            {
                news ? <div className='android-container'>
                <a href='https://linkshortly.herokuapp.com/l/pi8ly/' ><img className='img-thumbnail' alt='Download our Android App' src={Android}/> </a>
            </div> : null
            }

        </div>

    );
}

export default Dashboard;
