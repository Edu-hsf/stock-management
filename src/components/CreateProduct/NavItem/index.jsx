import { useContext, useEffect, useState } from 'react'
import './styles.scss'
import { ActiveProductNavContext } from '../../../Context/ActiveProductNav'

export default function NavItem({ id, setShowSession, children }) {
    const { activeProductNav, setActiveProductNav } = useContext(ActiveProductNavContext)
    const [active, setActive] = useState('')
    useEffect(() => {
        activeProductNav === id ? setActive('active') : setActive(''), [activeProductNav]
        
        switch (activeProductNav) {
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
    })

    const handleClick = (id) => {
        setActive('active')
        setActiveProductNav(id)
        sessionStorage.setItem('activeProductNav', id)
    }

    return (
        <li
            className={active}
            onClick={() => handleClick(id)}
        >
            {children}
        </li>
    )
}