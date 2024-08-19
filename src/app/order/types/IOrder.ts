import {ICustomer} from "@app/customer/types/ICustomer";

export interface IOrder {
    id: string;
    orderDate: string;
    amount: number;
    totalAmount: number;
    fee: number;
    customer: ICustomer;
}
