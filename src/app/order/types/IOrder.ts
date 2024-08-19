import {ICustomer} from "@app/customer/types/ICustomer";
import {IPayment} from "@app/payment/types/IPayment";

export interface IOrder {
    id: string;
    orderDate: string;
    amount: number;
    totalAmount: number;
    fee: number;
    totalPaid: number;
    remainingAmount: number;
    customer: ICustomer;
    payments: IPayment[];
}