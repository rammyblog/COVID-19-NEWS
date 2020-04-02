import React from 'react';
import {FooterStyled} from "./FooterStyled";


export default function Footer() {
    return (
        <FooterStyled>
            <p>Made with <span role='img' aria-label='Love' aria-labelledby='love'>❤️</span> by <a href='https://github.com/rammyblog/'>Onasanya Babatunde</a> & <a href='https://github.com/yorubadeveloper'>Oyelekan Oluwabukunmi</a> </p>
        </FooterStyled>
    )
}