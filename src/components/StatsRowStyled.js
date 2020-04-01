import styled from 'styled-components';

export const StatsRowStyled = styled.div`
        display: ${(props) =>  props.component === 'data' ? 'block' : 'flex'};
        margin-bottom: 34px;
        justify-content: center;
        padding: 20px;
     
        
        .country-container{
               text-align: left;
               text-align: ${(props) =>  props.component === 'data' ? 'center' : 'left'};
               font-weight: ${(props) =>  props.component === 'data' ? 'bold' : 'normal'};

               margin-right: 1rem;
               margin-bottom: 10px;  
        }
        
        .country-container > h6{
        
               font-weight: ${(props) =>  props.component === 'data' ? 'bolder' : 'normal'};
               font-size: 2rem;

        }
        
        

        
        .stats-container{
                display: grid;
                gap: 10px;
                margin-bottom: 34px;
                text-align: center;
                justify-content: center;
                font-weight: 700;
                grid-auto-flow: column;
                grid-template-columns: 1fr 1fr 1fr;
        }
        
        @media only screen and (max-width: 768px) {
                    display: block;
                }
`