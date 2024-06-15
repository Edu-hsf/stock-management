import { useContext, useEffect, useState } from "react"
import { ActiveThemeItemContext } from "../../../Context/ActiveThemeItemContext"

export default function ThemeList(props) {
    const {activeThemeItem, setActiveThemeItem} = useContext(ActiveThemeItemContext)
    const [active, setActive] = useState('')

    useEffect(() => activeThemeItem !== props.id ? setActive('') : setActive('active'), [activeThemeItem])

    const handleClick = () => {
        setActive('active')
        setActiveThemeItem(props.id)
        sessionStorage.setItem('activeTheme', props.id)
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