import React, {useContext} from 'react';
import {FooterStyled} from "./FooterStyled";
import {newsContext} from "../../context/NewsContext";
import {StatsContext} from "../../context/StatsContext";


export default function Footer() {
    const {loading: newsLoading} = useContext(newsContext);
    const {loading: statsLoading} = useContext(StatsContext)
    return (
        <>
        {
            !newsLoading || !statsLoading ? <FooterStyled>
            <p>Made with <span role='img' aria-label='Love' aria-labelledby='love'>❤️</span> by <a href='https://github.com/rammyblog/'>Onasanya Babatunde</a> & <a href='https://github.com/yorubadeveloper'>Oyelekan Oluwabukunmi</a> </p>
        </FooterStyled> : null
        }
        </>

    )
}