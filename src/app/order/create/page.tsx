"use client";

import {Box, TextField} from "@mui/material";
import {Create} from "@refinedev/mui";
import {useForm} from "@refinedev/react-hook-form";
import {ICustomer} from "@app/customer/types/ICustomer";
import CustomerSearch from "@components/customer-search/page";
import {useEffect} from "react";
import axios from "axios";
import {IOrder} from "@app/order/types/IOrder";

const FEE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/fees`;

export default function OrderCreate() {
    const {
        saveButtonProps,
        refineCore: {formLoading, query},
        register,
        formState: {errors},
        watch,
        setValue,
        getValues
    } = useForm<IOrder>();

    const order = query?.data?.data;

    const handleCustomerSelected = (customer: ICustomer) => {
        setValue("customer.id", customer.id);
        setValue("customer.fullname", customer.fullName); // Assuming there's a field for customer full name
    };

    const orderDate = watch("orderDate");
    const amount = watch("amount");

    useEffect(() => {
        if (orderDate) {
            fetchFee(orderDate);
        }
        calculateAmounts();
    }, [orderDate, amount]);

    const calculateAmounts = async () => {
        const fee = getValues("fee");
        const amount = getValues("amount");

        // Update the totalAmount field
        const totalAmount = parseFloat(fee) + parseFloat(amount || 0);
        setValue("totalAmount", totalAmount);
        setValue("totalPaid", 0);
        setValue("remainingAmount", totalAmount);
    }

    const fetchFee = async (date: string) => {
        try {
            const response = await axios.get(`${FEE_URL}/byDate/${date}`, {});

            if (response.data) {
                const fee = response.data;
                setValue("fee", fee);
            }
        } catch (error) {
            console.error("Error fetching fee and total amount:", error);
        }
    };

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{display: "flex", flexDirection: "column"}}
                gap={2}
                autoComplete="off"
            >
                <TextField
                    id={"orderDate"}
                    {...register("orderDate", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.orderDate}
                    helperText={(errors as any)?.orderDate?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    defaultValue={new Date().toISOString().split('T')[0]}
                    type="date"
                    label={"Order Date"}
                    name="orderDate"
                />

                <TextField
                    id={"amount"}
                    {...register("amount", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.amount}
                    helperText={(errors as any)?.amount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="number"
                    label={"Amount"}
                    name="amount"
                />

                <TextField
                    id={"fee"}
                    {...register("fee", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.fee}
                    helperText={(errors as any)?.fee?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="number"
                    label={"Fee"}
                    name="fee"
                    disabled={true}
                />

                <TextField
                    id={"totalAmount"}
                    {...register("totalAmount", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.totalAmount}
                    helperText={(errors as any)?.totalAmount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="number"
                    label={"Total Amount"}
                    name="totalAmount"
                    disabled={true}
                />

                <TextField
                    id={"totalPaid"}
                    {...register("totalPaid", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.totalPaid}
                    helperText={(errors as any)?.totalPaid?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="number"
                    label={"Total Paid"}
                    name="totalPaid"
                    disabled={true}
                />

                <TextField
                    id={"remainingAmount"}
                    {...register("remainingAmount", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.totalPaid}
                    helperText={(errors as any)?.totalPaid?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="number"
                    label={"Remaining Amount"}
                    name="remainingAmount"
                    disabled={true}
                />

                <CustomerSearch
                    initialCustomerId={order?.customer?.id}
                    onCustomerSelected={handleCustomerSelected}
                />
            </Box>
        </Create>
    );
}
