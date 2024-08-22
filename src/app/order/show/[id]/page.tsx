"use client";

import {Box, Grid, Stack, Typography} from "@mui/material";
import {useShow} from "@refinedev/core";
import {Show, TextFieldComponent as TextField} from "@refinedev/mui";
import {IOrder} from "@app/order/types/IOrder";
import React from "react";
import PaymentList from "@app/payment/page";


export default function OrderShow() {
    const {query} = useShow<IOrder>();
    const {data, isLoading} = query;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2} paddingLeft={5}>
                    <Grid xs={6}>
                        <Stack paddingTop={1} gap={7}
                            // divider={<Divider orientation="horizontal" flexItem/>}
                        >
                            <Stack gap={5}>
                                <Typography variant="h5" fontWeight="bold">
                                    {"Order Data"}
                                </Typography>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {"ID"}
                                    <TextField value={record?.id}/>
                                </Typography>


                                <Typography variant="body1" fontWeight="bold">
                                    {"Order Date"}
                                    <TextField value={record?.orderDate}/>
                                </Typography>


                                <Typography variant="body1" fontWeight="bold">
                                    {"Amount"}
                                    <TextField value={'$' + record?.amount}/>
                                </Typography>

                                <Typography variant="body1" fontWeight="bold">
                                    {"Order Fee"}
                                    <TextField value={'$' + record?.fee}/>
                                </Typography>

                                <Typography variant="body1" fontWeight="bold">
                                    {"Total Amount"}
                                    <TextField value={'$' + record?.totalAmount}/>
                                </Typography>

                                <Typography variant="body1" fontWeight="bold">
                                    {"Total Paid"}
                                    <TextField value={'$' + record?.totalPaid}/>
                                </Typography>

                                <Typography variant="body1" fontWeight="bold">
                                    {"Remaining Amount"}
                                    <TextField value={'$' + record?.remainingAmount}/>
                                </Typography>
                            </Stack>
                            <Stack gap={4}>
                                <Typography variant="h5" fontWeight="bold">
                                    {"Customer Data"}
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {"Customer ID"}
                                    <TextField value={record?.customer?.id}/>
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {"Customer Name"}
                                    <TextField value={record?.customer?.fullName}/>
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid xs={6}>
                        <Typography variant="h5" fontWeight="bold">
                            {"Payment Data"}
                        </Typography>
                        <PaymentList orderId={record?.id!} parentLoading={isLoading}/>
                    </Grid>
                </Grid>
            </Box>


        </Show>

    );
}
