import "./styles.scss"
import arrow from "../../assets/green-arrow.png"
import { StyledTable } from "./StockTable.styles"
import { useEffect, useRef, useState } from "react";
import Line from "./Line";

type tableProductsType = {
    name: string,
    code: string,
    category: string,
    quantity: number,
    price: number
}

interface StockTablesProps {
    stockName: string
    tableProducts: Array<tableProductsType>
}

export default function StockTables({ stockName, tableProducts }: StockTablesProps) {
    const contentRef = useRef<HTMLTableSectionElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [maxHeight, setMaxHeight] = useState("50px");

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (contentRef.current) {
            setMaxHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : "50px");
        }
    }, [isExpanded]);

    return (
        <div className="stock-tables d-flex align-items-center">
            <StyledTable ref={contentRef} maxHeight={maxHeight}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="stock-name cursor-pointer" onClick={toggleContent} style={{ width: "20%" }}>
                                <img
                                    src={arrow}
                                    alt="green-arrow"
                                    style={{
                                        transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                                        transition: "transform 0.3s",
                                    }}
                                />
                                <span>{stockName}</span>
                            </th>
                            <th scope="col" style={{ width: "20%" }}>Quantity</th>
                            <th scope="col" style={{ width: "20%" }}>Code</th>
                            <th scope="col" style={{ width: "20%" }}>Category</th>
                            <th scope="col" style={{ width: "20%" }}>Price</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        {tableProducts.map((product) => (
                            <Line
                                key={product.code}
                                name={product.name}
                                quantity={product.quantity}
                                code={product.code}
                                category={product.category}
                                price={product.price}
                            />
                        ))}
                    </tbody>
                </table>
            </StyledTable>
        </div>
    )
} 