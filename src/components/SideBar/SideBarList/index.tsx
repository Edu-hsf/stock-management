import { useContext, useEffect, useState } from "react"
import { ActiveListItemContext } from "@/Context/ActiveListItemContext"
import { ComponentProps } from "@/interfaces"

interface ListType extends ComponentProps {
    id: number
}

export default function List({ className, id, children }: ListType) {
    const {activeListItem, setActiveListItem} = useContext(ActiveListItemContext)!
    const [active, setActive] = useState<string>('')

    useEffect(() => activeListItem !== id ? setActive('') : setActive('active'), [activeListItem])

    const handleClick = () => {
        setActive('active')
        setActiveListItem(id)
        sessionStorage.setItem('activeList', String(id))
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