import styled from 'styled-components'

interface LoaderProps {
    loaderColor?: string,
    loaderWidth?: string,
    loaderHeight?: string,
    loaderThickness?: string
}

export const StyledLoader = styled.div.withConfig({
    shouldForwardProp: (prop) => !['loaderColor', 'loaderWidth', 'loaderHeight', 'loaderThickness'].includes(prop)
})<LoaderProps>`
    width: ${({ loaderWidth }) => loaderWidth || '45px'};
    height: ${({ loaderHeight }) => loaderHeight || '45px'};
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite;

    &::before {
        content: "";
        box-sizing: border-box;
        position: absolute;
        inset: 0px;
        border-radius: 50%;
        border: ${({ loaderThickness }) => loaderThickness || '5px'} solid ${({ loaderColor }) => loaderColor || '#fff'};
        animation: prixClipFix 2s linear infinite;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg)
        }
    }

    @keyframes prixClipFix {
        0% {
            clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)
        }

        25% {
            clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)
        }

        50% {
            clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)
        }

        75% {
            clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)
        }

        100% {
            clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)
        }
    }
`