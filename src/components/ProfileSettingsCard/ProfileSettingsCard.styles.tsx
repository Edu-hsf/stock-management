import styled from 'styled-components'

export const StyledCardRoot = styled.div`
    height: 100vh;
    width: 100%;

    .container-fluid {
        min-height: 700px;
        width: 450px;
        background-color: #fff;
        border-radius: 8px;
        padding-top: 10px;
    }
`
export const StyledCardBanner = styled.div<{width?: string}>`
    img {
        width: ${props => props.width || '200px'};
    }
`

export const StyledCardInputOPT = styled.div<{width?: string}>`
    img {
        width: ${props => props.width};
    }
`