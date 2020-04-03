import React from 'react';
import Cards from './Cards';
import StatsRow from './StatsRow';
import Android from '../assets/android.png';

function Dashboard() {

    return (
        <div className='center-block'>
            <StatsRow/>
            <Cards/>
            <div className='android-container'>
                <img className='img-thumbnail' alt='Download our Android App' src={Android}/>
            </div>
        </div>

    );
}

export default Dashboard;
