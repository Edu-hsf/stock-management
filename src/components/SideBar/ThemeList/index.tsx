import { useContext, useEffect, useState } from "react"
import { ActiveThemeItemContext } from "@/Context/ActiveThemeItemContext"
import { ComponentProps } from "@/interfaces"

interface ThemeList extends ComponentProps {
    id: number
}

export default function ThemeList({ children, className, id }: ThemeList) {
    const {activeThemeItem, setActiveThemeItem} = useContext(ActiveThemeItemContext)!
    const [active, setActive] = useState('')

    useEffect(() => activeThemeItem !== id ? setActive('') : setActive('active'), [activeThemeItem])

    const handleClick = () => {
        setActive('active')
        setActiveThemeItem(id)
        sessionStorage.setItem('activeTheme', String(id))
    } 

    return (
        <li
            className={`${active} ${className}`}
            onClick={handleClick}
        >
            {children}
        </li>
    )
}