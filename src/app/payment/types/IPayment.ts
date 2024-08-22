export interface IPayment {
    id: string;
    amount: number;
    type: string;
    orderId: string;
}

export interface ICardPayment extends IPayment {
    cardHash: string;
    cardholderName: string;
    expiryDate: string;
}

export interface IPixPayment extends IPayment {
    pixKey: string;
}
