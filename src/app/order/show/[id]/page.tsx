"use client";

import {Box, Grid, Stack, Typography} from "@mui/material";
import {useShow} from "@refinedev/core";
import {DeleteButton, EditButton, Show, ShowButton, TextFieldComponent as TextField} from "@refinedev/mui";
import {IOrder} from "@app/order/types/IOrder";
import React from "react";
import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {CurrencyFormatter} from "@components/currency-formatter/CurrencyFormatter";


export default function OrderShow() {
    const {query} = useShow<IOrder>();
    const {data, isLoading} = query;
    const record = data?.data;

    const paymentRows = record?.payments || []

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "type",
                headerName: "Type",
                type: "string",
                width: 100
            },
            {
                field: "id",
                headerName: "ID",
                type: "string",
                width: 300
            },
            {
                field: "amount",
                headerName: "Payment Amount",
                type: "number",
                minWidth: 50,
                valueFormatter: CurrencyFormatter({currency: "USD", locale: "en-US"}),
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                renderCell: function render({row}) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id}/>
                            <ShowButton hideText recordItemId={row.id}/>
                            <DeleteButton hideText recordItemId={row.id}/>
                        </>
                    );
                },
                align: "right", // Aligns the content to the right
                headerAlign: "right", // Aligns the header to the right
                flex: 1,
                minWidth: 80,
            },
        ],
        []
    );

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
                        <DataGrid
                            rows={paymentRows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {page: 0, pageSize: 5},
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />
                    </Grid>
                </Grid>
            </Box>


        </Show>

    );
}
