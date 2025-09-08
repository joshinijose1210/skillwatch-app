import styled from 'styled-components';

export const NavigationStyledArrow = styled.div`
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: beige;
    border-radius: 100%;
    opacity: 70%;
    transition: 300ms;
    :hover {
        opacity: 100%;
    }
    z-index: 10;
`;
export const NavigationArrowsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 90%;
    position: absolute;
`;
