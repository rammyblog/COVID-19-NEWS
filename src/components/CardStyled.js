import styled from 'styled-components';


export const CardStyled = styled.div` 

        .card {
                   background-color: ${props => props.bgColor};
                   color: ${props => props.textColor}
        }
        
        .card-title{
            font-weight: 700;
        }
        
        .card-footer {
                background-color: ${props => props.bgFooter}
        }
`

