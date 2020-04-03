import React from 'react';
import {Table} from "react-bootstrap";

export default function TableComponent({data, headers, states}) {
    return (
        <>
            {data || states ?
                <div>
                    <Table striped bordered hover size="sm" responsive="sm">
                        <thead>
                        <tr>
                            {
                                headers ? headers.map((heading, idx) => (

                                    <th key={idx}>{heading}</th>

                                )) : null

                            }
                        </tr>
                        </thead>
                        <tbody>
                        {

                            data ? data.map((country, idx) => (
                                <tr key={idx}>
                                    <td>{country.country_name}</td>
                                    <td>{country.cases}</td>
                                    <td>{country.total_recovered}</td>
                                    <td>{country.deaths}</td>
                                </tr>
                            )) : null
                        }

                        {
                            states ? states.map((state, idx) => (
                                <tr key={idx}>
                                    <td>{state.state}</td>
                                    <td>{state.number_confirmed}</td>
                                </tr>
                            )) : null
                        }

                        </tbody>
                    </Table>
                </div>
                : null}
        </>
    )
}