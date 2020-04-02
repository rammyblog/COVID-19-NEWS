import {Card} from "react-bootstrap";
import React, {useContext} from "react";
import {CardStyled} from './CardStyled'
import {StatsContext} from "../context/StatsContext";
// import Spinner as Spin from "./containers/Spinner";
import Spinner from 'react-bootstrap/Spinner'

const StatsCard = ({color, stats, type, bgColor, textColor, bgFooter, new_cases}) => {
    const {loading} = useContext(StatsContext);
    return (
        <CardStyled bgColor={bgColor} textColor={textColor} bgFooter={bgFooter}>
            <Card
                style={{width: 'auto', height: '5.6rem'}}
                className='w-1/3 flex flex-col rounded overflow-hidden shadow text-center'
            >
                <Card.Body
                    className='h-16 flex flex-auto items-center justify-center bg-red-100  font-bold font-sans'>
                    <Card.Title> {loading ? <Spinner animation="grow"/> : <>{stats} <span className='new-cases-span'>{Math.sign(new_cases) === 1 || Math.sign(new_cases) === 0 ? '+' + new_cases : '-' + new_cases}</span></>}</Card.Title>
                </Card.Body>
                <Card.Footer>{type} </Card.Footer>
            </Card>
        </CardStyled>

    )

};

export default StatsCard