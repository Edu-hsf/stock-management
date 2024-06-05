import { useContext, useEffect, useState } from "react"
import { ActiveListItemContext } from "../../Context/ActiveListItemContext"

export default function List(props) {
    const {activeListItem, setActiveListItem} = useContext(ActiveListItemContext)
    const [active, setActive] = useState('')

    useEffect(() => {
        if (activeListItem !== props.id) {
            setActive('')
        }   
    }, [activeListItem])

    const handleClick = () => {
        setActive('active')
        setActiveListItem(props.id)
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