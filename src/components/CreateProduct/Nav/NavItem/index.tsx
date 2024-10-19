import './styles.scss'
import { useContext, useEffect, useState } from 'react'
import { ActiveNavContext } from '../../CreateProductContexts/ActiveNav'
import { ShowSessionContextType } from '../../CreateProductContexts/ShowSessionContext'

interface NavItemType extends ShowSessionContextType {
    id: number
}

export default function NavItem({ id, setShowSession, children, className }: NavItemType) {
    const { activeNav, setActiveNav } = useContext(ActiveNavContext)!

    const [active, setActive] = useState('')

    useEffect(() => {
        activeNav === id ? setActive('active') : setActive('')
        
        switch (activeNav) {
            case 1:
                setShowSession && setShowSession('data')
                break;

            case 2:
                setShowSession && setShowSession('stock')
                break;

            case 3:
                setShowSession && setShowSession('details')
                break;
        }
    }, [activeNav]) 

    const handleClick = (id: number) => {
        setActive('active')
        setActiveNav(id)
        sessionStorage.setItem('ActiveNav', String(id))
    }

    return (
        <li
            className={`${active} ${className}`}
            onClick={() => handleClick(id)}
        >
            {children}
        </li>
    )
}