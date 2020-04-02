import React, {useContext} from 'react';
import {FooterStyled} from "./FooterStyled";
import {newsContext} from "../../context/NewsContext";


export default function Footer() {
    const {loading} = useContext(newsContext);
    return (
        <>
        {
            !loading ? <FooterStyled>
            <p>Made with <span role='img' aria-label='Love' aria-labelledby='love'>❤️</span> by <a href='https://github.com/rammyblog/'>Onasanya Babatunde</a> & <a href='https://github.com/yorubadeveloper'>Oyelekan Oluwabukunmi</a> </p>
        </FooterStyled> : null
        }
        </>

    )
}