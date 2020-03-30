import styled from 'styled-components';

export const CardsRowStyled = styled.div `
    display: grid;
    grid-template-columns: repeat(3, 1fr));
    justify-content: center;
    align-items: center;
    
    @media only screen and (max-width: 768px) {
                    display: block;
                }
`