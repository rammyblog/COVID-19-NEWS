import {Card} from "react-bootstrap";
import React from "react";
import {CardStyled} from './CardStyled'

const StatsCard = ({color, stats, type, bgColor, textColor, bgFooter}) => {

    return (
        <CardStyled bgColor={bgColor} textColor={textColor} bgFooter={bgFooter}>
             <Card
            style={{width: '8rem', height: '5.6rem' }}
            className='w-1/3 flex flex-col rounded overflow-hidden shadow text-center'
        >
            <Card.Body className='h-16 pt-2 flex flex-auto items-center justify-center bg-red-100 text-xl lg:text-3xl font-bold font-sans'>
                <Card.Title>{stats}  </Card.Title>
            </Card.Body>
            <Card.Footer>{type} </Card.Footer>
        </Card>
        </CardStyled>

    )

};

export default StatsCard