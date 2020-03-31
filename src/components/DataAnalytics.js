import React, {useEffect, useState} from 'react';
import BarchartComponent from "./Barchart";
import axios from "axios";
import TableComponent from "./Table";
import PieChart from "./PieChart";
import {DataAnalyticsStyled} from "./DataAnaylticsStyled";


const Analytics = () => {
    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300
        }
    ];

    const [countriesAffected, setcountriesAffected] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php', {headers: {
                        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                        "x-rapidapi-key": "af071e0d68msh1b09ca43577c8f0p164b67jsn473e4cb936c0"
                    },
                })
                setcountriesAffected(response.data.countries_stat)
            } catch (e) {
                console.log(e)
            }


        }

        fetchData()

    }, []);


    return (
        <DataAnalyticsStyled>
            <div>
            <PieChart />
            </div>
            <TableComponent data={countriesAffected} />
        </DataAnalyticsStyled>
    );
};

export default Analytics;