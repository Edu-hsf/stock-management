import styled from 'styled-components'
import { MoveType } from '../../../../pages/Login'

export const StyledBanner = styled.div<MoveType>`
    height: 100%;
    width: 50%;
    position: absolute;
    background-color: var(--light-green);
    transition: 1s transform ease-in-out, 1s border-radius ease-in-out;
    transform: ${props => props.move_x === 'right' ? 'translateX(100%)' : 'translateX(0)'};
    border-radius: ${props => props.move_x === 'right' ? '180px 0px 0px 80px' : '0px 180px 80px 0px'};
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 90%;
    }

    @media screen and (max-width: 787px){
        height: 50%;
        width: 100%;
        transform: ${props => props.move_y === 'top' ? 'translateY(0)' : 'translateY(100%)'};
        border-radius: ${props => props.move_y === 'top' ? '20px 20px 40px 40px' : '40px 40px 20px 20px'};

        img {
            height: 100%;
            width: auto;
        }
    }

    @media screen and (max-height: 760px) {
        min-height: 350px;
        max-height: 365px;
        img {
            height: 360px;
        }

    }

    @media screen and (max-width: 480px) {
        img {
            width: 100%;
            height: auto;
        }
    }
`