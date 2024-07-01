import Title from "../../../components/Title"
import "./styles.scss"

export default function Stocks() {
    return (
        <div id="stocks" className="container-fluid">
            <Title className='d-flex justify-content-between'>
                Your stocks
                <button className="btn me-3">
                    Create new stock
                </button>
            </Title>
            
        </div>
    )
}