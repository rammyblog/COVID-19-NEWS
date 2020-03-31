import React from "react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";



const BarchartComponent = ({data}) => {

    return ( <BarChart style={{display:'flex', width:'100%', height:'100%'}} width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="pv" fill="#8884d8"/>
                <Bar dataKey="uv" fill="#82ca9d"/>
            </BarChart>

    )
}


export default BarchartComponent