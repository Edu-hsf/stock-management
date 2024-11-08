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
            <th scope="row" className="product-name">
                {name}
            </th>
            <td>{quantity}</td>
            <td>{code}</td>
            <td>{category}</td>
            <td>{price}</td>
        </tr>
    )
}