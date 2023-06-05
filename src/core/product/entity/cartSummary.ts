export interface CartSummary {
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    taxRate: number;
    shippingAddres?: ShippingAddres; 
}

export interface ShippingAddres {
    name: string;
    surnames: string;
    address: string;
    address2: string;
    city: string;
    country: string;
    postalCode: string;
    phone: string;
}