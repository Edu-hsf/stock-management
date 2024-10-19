import { ChangeEventHandler, ReactNode } from "react";

export interface ComponentProps {
    children?: ReactNode;
    className?: string;
    onClick?: ChangeEventHandler;
}

export interface ProductType {
    name: string;
    productCode: string;
    storage: string;
    category: string;
    price: string;
    currencyOptions: string;
    length: string;
    lengthOptions: string;
    stockMin: string;
    stockMax: string;
    quantity: string;
    description: string;
    imageProduct: File | string | ArrayBuffer | null;
}