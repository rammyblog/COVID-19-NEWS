import React, {useEffect, useState} from 'react';
import axios from "axios";
import PieChart from "./PieChart";
import {DataAnalyticsStyled} from "./DataAnaylticsStyled";
import {Spinner} from "react-bootstrap";
import {StatsRowStyled} from './StatsRowStyled';
import StatsCard from "./StatsCard";
import TableComponent from "./Table";
import {convertStringToNumber} from "./utils/convertStringToNumber";

const Analytics = () => {
    // const data = [color, stats, type, bgColor, textColor, bgFooter];

    const [countriesAffected, setcountriesAffected] = useState([]);
    const [NigeriaData, setNigeriaData] = useState([]);
    const [totalConfirmed, setConfirmed] = useState(null);
    const [totalRecovered, setTotalRecovered] = useState(null);
    const [totalDeaths, setTotalDeath] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php', {
                    headers: {
                        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                        "x-rapidapi-key": "af071e0d68msh1b09ca43577c8f0p164b67jsn473e4cb936c0"
                    },
                });
                const res = await axios.get('https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php', {
                    headers: {
                        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                        "x-rapidapi-key": "af071e0d68msh1b09ca43577c8f0p164b67jsn473e4cb936c0"
                    }
                });
                setcountriesAffected(response.data.countries_stat);
                setTotalDeath(res.data.total_deaths);
                setConfirmed(res.data.total_cases);
                setTotalRecovered(res.data.total_recovered)
            } catch (e) {
                console.log(e)
            }
        }


        fetchData()


    }, []);

    useEffect(() => {
        if (countriesAffected.length >= 1) {
            setNigeriaData(getNigeriaData());
        }

    }, [countriesAffected]);

    const getNigeriaData = () => {

        let temp = countriesAffected.slice();
        temp = temp.filter(country => (country.country_name === 'Nigeria'));
        return temp


    };

    const calcRecovered = (cases, active_cases, total_recovered)=> {
        let new_Recovered = convertStringToNumber(cases) - convertStringToNumber(active_cases) - convertStringToNumber(total_recovered)
        if(convertStringToNumber(total_recovered) < new_Recovered) {
            return new_Recovered
        }else {
            return 0
        }
    }


    return (
        <DataAnalyticsStyled>
            <div style={{background: '#f2f2f2', width: '100%', display: 'flex', flexDirection: 'column'}}>
                {
                    NigeriaData ? NigeriaData.map((data, id) => (
                        <StatsRowStyled component={'data'}>
                            <div className='country-container'>
                                <h6>Nigeria</h6>
                            </div>
                            <div>
                                <div className='stats-container'>
                                    <StatsCard color='danger' stats={data.cases} new_cases={convertStringToNumber(data.new_cases)} type='Confirmed'
                                               bgColor='#fff5f5'
                                               textColor='#000' bgFooter='#fed7d7'/>
                                    <StatsCard color='success' stats={data.total_recovered}  new_cases={calcRecovered(data.cases, data.active_cases, data.total_recovered)}  type='Recovered'
                                               bgColor='#f0fff4'
                                               textColor='#38a169' bgFooter='#c6f6d5'/>
                                    <StatsCard color='light' stats={data.deaths} type='Deaths'  new_cases={convertStringToNumber(data.new_deaths)} bgColor='#edf2f7'
                                               textColor='#718096' bgFooter='#e2e8f0'/>
                                </div>
                            </div>


                        </StatsRowStyled>
                    )) : <Spinner animation={"grow"}/>

                }

                {
                    totalRecovered ?
                        <>
                            <div className='country-container'>
                                <h6>World Statistics</h6>
                            </div>
                        <PieChart total_cases={totalConfirmed} total_deaths={totalDeaths}
                                               total_recovered={totalRecovered}/>
                                               </>
                                               : <Spinner animation={"grow"}/>
                }

            </div>
            <TableComponent data={countriesAffected}/>
        </DataAnalyticsStyled>
    );
};

export default Analytics;
