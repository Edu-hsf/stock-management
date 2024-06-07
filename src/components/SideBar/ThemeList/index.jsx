import { useContext, useEffect, useState } from "react"
import { ActiveThemeItemContext } from "../../Context/ActiveThemeItemContext"

export default function ThemeList(props) {
    const {activeThemeItem, setActiveThemeItem} = useContext(ActiveThemeItemContext)
    const [active, setActive] = useState('')

    useEffect(() => {
        if (activeThemeItem !== props.id) {
            setActive('')
        }   
    }, [activeThemeItem])

    const handleClick = () => {
        setActive('active')
        setActiveThemeItem(props.id)
    } 

    return (
        <li
            className={`${active} ${props.className}`}
            onClick={handleClick}
        >
            {props.children}
        </li>
    )
}