import React, {useEffect, useState} from 'react';
import axios from "axios";
import TableComponent from "./Table";
import PieChart from "./PieChart";
import {DataAnalyticsStyled} from "./DataAnaylticsStyled";
import {Spinner} from "react-bootstrap";


const Analytics = () => {
    // const data = [color, stats, type, bgColor, textColor, bgFooter];

    const [countriesAffected, setcountriesAffected] = useState([]);
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
    //
    // useEffect(() => {
    //     if (countriesAffected.length >= 1) {
    //         let tempCountriesAffected = countriesAffected.slice();
    //         let total_cases = tempCountriesAffected.reduce((accumulate, current) => {
    //             return accumulate + parseFloat(current.cases.replace(/,/g, ''))
    //         });
    //         let total_deaths = tempCountriesAffected.reduce((accumulate, current) => {
    //             return accumulate + parseFloat(current.deaths.replace(/,/g, ''))
    //         });
    //         let total_recovered = tempCountriesAffected.reduce((accumulate, current) => {
    //             return accumulate + parseFloat(current.total_recovered.replace(/,/g, ''))
    //         });
    //         setTotalDeath(total_deaths);
    //         setConfirmed(total_cases);
    //
    //     }
    //
    // }, [countriesAffected]);


    return (
        <DataAnalyticsStyled>
            <div style={{background: '#f2f2f2', width: '100%', justifyContent: 'center', display: 'flex'}}>
                {
                    totalRecovered ? <PieChart total_cases={totalConfirmed} total_deaths={totalDeaths}
                                               total_recovered={totalRecovered}/> : <Spinner animation={"grow"}/>
                }
            </div>
            <TableComponent data={countriesAffected}/>
        </DataAnalyticsStyled>
    );
};

export default Analytics;