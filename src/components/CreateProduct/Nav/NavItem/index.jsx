import './styles.scss'
import { useContext, useEffect, useState } from 'react'
import { ActiveNavContext } from '../../CreateProductContexts/ActiveNav'

export default function NavItem({ id, setShowSession, children, className }) {
    const { activeNav, setActiveNav } = useContext(ActiveNavContext)

    const [active, setActive] = useState('')

    useEffect(() => {
        activeNav === id ? setActive('active') : setActive('')
        
        switch (activeNav) {
            case '1':
                setShowSession('data')
                break;

            case '2':
                setShowSession('stock')
                break;

            case '3':
                setShowSession('details')
                break;
        }
    }, [activeNav]) 

    const handleClick = (id) => {
        setActive('active')
        setActiveNav(id)
        sessionStorage.setItem('ActiveNav', id)
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