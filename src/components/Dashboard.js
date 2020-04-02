import React from 'react';
import Cards from './Cards';
import StatsRow from './StatsRow';

function Dashboard() {

    return (
        <div className='center-block'>

            <StatsRow/>
            <Cards/>
        </div>

    );
}

export default Dashboard;
