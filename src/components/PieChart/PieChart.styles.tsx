import styled from "styled-components";

export const StyledGraphic = styled.div`
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    border-color: transparent;
    transition: border-color 350ms ease-in-out, transform 400ms ease-in-out;

    &:hover {
        border: 1px solid var(--light-green);
        transform: scale(0.995);
    }
`

export const StyledViewProductBtn = styled.button`
    border: 1px solid var(--orange);
    color: var(--orange);
    width: 200px;

    &:hover {
        background-color: var(--orange);
        color: #fff;
    }
`