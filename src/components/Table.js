import React from 'react';
import {Table} from "react-bootstrap";

export default function TableComponent({data}) {
    console.log(data)
    return (
        <>
        {data ? <Table striped bordered hover>
            <thead>
            <tr>
                <th>Country</th>
                <th>Total cases</th>
                <th>Total Recovered</th>
                <th>Total deaths</th>
            </tr>
            </thead>
            <tbody>
            {

                data.map(country => (
                    <tr>
                        <td>{country.country_name}</td>
                        <td>{country.cases}</td>
                        <td>{country.total_recovered}</td>
                        <td>{country.deaths}</td>
                    </tr>
                ))
            }

            </tbody>
        </Table> : null}
        </>
    )
}