interface lineProps {
    name: string,
    quantity: number,
    code: string,
    category: string,
    price: number | string
}

export default function Line({ name, quantity, code, category, price }: lineProps) {
    price = price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
    return (
        <tr>
            <th scope="row" className="product-name" style={{ width: "20%" }}>
                {name}
            </th>
            <td style={{ width: "20%" }}>{quantity}</td>
            <td style={{ width: "20%" }}>{code}</td>
            <td style={{ width: "20%" }}>{category}</td>
            <td style={{ width: "20%" }}>{price}</td>
        </tr>
    )
}