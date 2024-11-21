import styled from 'styled-components'
import { ComponentProps } from '@/interfaces'

export interface AlertType extends ComponentProps{
    direction: 'down' | 'up' | string
}

export const StyledAlertDanger = styled.div<AlertType>`
    position: fixed;
    top: -60px;
    z-index: 10;
    margin: 0 auto;
    transition: 500ms transform ease-out;
    transform: ${props => props.direction === 'down' ? 'translateY(100px)' : props.direction === 'up' ? 'translateY(0)' : ''};
`

export const StyledAlertSuccess = styled.div<AlertType>`
    position: fixed;
    top: -60px;
    z-index: 10;
    margin: 0 auto;
    transition: 500ms transform ease-out;
    transform: ${props => props.direction === 'down' ? 'translateY(100px)' : props.direction === 'up' ? 'translateY(0)' : ''};
`
