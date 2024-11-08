import '../styles.scss'
import { ActiveNavProvider } from "../CreateProductContexts/ActiveNav";
import { ShowSessionContext } from "../CreateProductContexts/ShowSessionContext";
import { ProductFormContext } from "../CreateProductContexts/ProductFormContext";
import NavItem from './NavItem'
import { useContext } from 'react';

export default function Nav() {
    const { setShowSession } = useContext(ShowSessionContext)!
    const { errors } = useContext(ProductFormContext)!

    return (
        <div className="nav mt-5 w-100 m-0">
            <ul className='list-unstyled'>
                <ActiveNavProvider>
                    <NavItem
                        setShowSession={setShowSession}
                        id={1}
                    >
                        {errors.name || errors.price || errors.category || errors.storage || errors.productCode || errors.length ? (
                            <>
                                Data
                                <span className='text-danger ms-1'>!</span>
                            </>
                        ) : (
                            <>
                                Data
                            </>
                        )}
                    </NavItem>
                    <NavItem setShowSession={setShowSession} id={2}>
                        {errors.quantity ? (
                            <>
                                Stock
                                <span className='text-danger ms-1'>!</span>
                            </>
                        ) : (
                            <>
                                Stock
                            </>
                        )}
                    </NavItem>
                    <NavItem setShowSession={setShowSession} id={3}>
                        {errors.description ? (
                            <>
                                Details
                                <span className='text-danger ms-1'>!</span>
                            </>
                        ) : (
                            <>
                                Details
                            </>
                        )}
                    </NavItem>
                </ActiveNavProvider>
            </ul>
        </div>
    )
}