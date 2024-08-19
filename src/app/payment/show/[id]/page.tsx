"use client";

import {Stack, Typography} from "@mui/material";
import {useShow} from "@refinedev/core";
import {Show, TextFieldComponent as TextField} from "@refinedev/mui";
import {ICardPayment, IPayment, IPixPayment} from "@app/payment/types/IPayment";


export default function FeeShow() {
    const {query} = useShow<IPayment>();
    const {data, isLoading} = query;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {"ID"}
                    <TextField value={record?.id}/>
                </Typography>

                <Typography variant="body1" fontWeight="bold">
                    {"Amount"}
                    <TextField value={record?.amount}/>
                </Typography>

                <Typography variant="body1" fontWeight="bold">
                    {"Type"}
                    <TextField value={record?.type}/>
                </Typography>

                {record?.type === 'PIX' ? (
                    <Typography variant="body1" fontWeight="bold">
                        {"Pix Key"}
                        <TextField value={(record as IPixPayment)?.pixKey}/>
                    </Typography>
                ) : (
                    <>
                        <Typography variant="body1" fontWeight="bold">
                            {"Card Hash"}
                            <TextField value={(record as ICardPayment)?.cardHash}/>
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            {"Card Holder Name"}
                            <TextField value={(record as ICardPayment)?.cardholderName}/>
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            {"Expiration Date"}
                            <TextField value={(record as ICardPayment)?.expiryDate}/>
                        </Typography>
                    </>
                )}

            </Stack>
        </Show>
    );
}
