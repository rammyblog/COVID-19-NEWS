import styled from 'styled-components';

export const StatsRowStyled = styled.div`
        display: flex;
        margin-bottom: 34px;
        justify-content: center;
     
        
        .country-container{
               text-align: left;
               margin-right: 1rem
               
        }
        
        
        .stats-container{
                display: grid;
                gap: 10px;
                margin-bottom: 34px;
                text-align: center;
                justify-content: center;
                font-weight: 700;
                grid-auto-flow: column
        }
        
        @media only screen and (max-width: 768px) {
                    display: block;
                }
`