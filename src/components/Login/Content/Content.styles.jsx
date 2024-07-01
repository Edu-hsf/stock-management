import styled from 'styled-components'

export const StyledContent = styled.div`
    background-color: #fff;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    width: 900px;
    height: 500px;
    overflow: hidden;
    border-radius: 20px;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 787px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        max-width: 500px;
        height: auto;
        max-height: 100%;
        margin: 20px;
        align-items: start;
    }

    @media screen and (max-height: 790px) {
        height: 800px;
    }
`