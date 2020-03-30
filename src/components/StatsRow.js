import React, {useContext} from 'react';
import StatsCard from "./StatsCard";
import {StatsContext} from "../context/StatsContext";
import {StatsRowStyled} from "./StatsRowStyled";
import Filter from './Autocomplete';

const StatsRow = () => {
    const {stats} = useContext(StatsContext);

    return (
        <>

            {
                stats.map(stat => (
                    <StatsRowStyled>
                        <div className='country-container'>
                            <h6>Stats Overview</h6>
                         <Filter />
                         </div>
                        <div className='stats-container'>
                        <StatsCard color='danger' stats={stat.total_cases} type='Confirmed' bgColor='#fff5f5'
                                   textColor='#000' bgFooter='#fed7d7'/>
                        <StatsCard color='success' stats={stat.total_recovered} type='Recovered' bgColor='#f0fff4'
                                   textColor='#38a169' bgFooter='#c6f6d5'/>
                        <StatsCard color='light' stats={stat.total_deaths} type='Deaths' bgColor='#edf2f7'
                                   textColor='#718096' bgFooter='#e2e8f0'/>
                        </div>
                    </StatsRowStyled>
                ))
            }


        </>
    )

};

export default StatsRow