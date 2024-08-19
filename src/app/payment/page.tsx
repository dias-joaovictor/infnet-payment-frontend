"use client";

import {DeleteButton, EditButton, List, ShowButton, useDataGrid} from "@refinedev/mui";
import {IPayment} from "@app/payment/types/IPayment";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {CurrencyFormatter} from "@components/currency-formatter/CurrencyFormatter";

interface PaymentListProps {
    orderId: string;
    parentLoading: boolean;
}

const PaymentList: React.FC<PaymentListProps> = ({orderId, parentLoading}) => {

    const {dataGridProps} = useDataGrid<IPayment>({
        resource: "payments",
        filters: {
            permanent: [
                {
                    field: "orderId",
                    operator: "eq",
                    value: orderId,
                },
            ],
        },
        queryOptions: {
            enabled: !parentLoading,
        },
    });


    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "type",
                headerName: "Type",
                type: "string",
                width: 100,
                // valueGetter: ({row}) => JSON.stringify(row),
            },
            {
                field: "id",
                headerName: "ID",
                type: "string",
                width: 300
            },
            {
                field: "amount",
                headerName: "Amount",
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
                            <EditButton hideText recordItemId={row.id} resource={"payments"}/>
                            <ShowButton hideText recordItemId={row.id} resource={"payments"}/>
                            <DeleteButton hideText recordItemId={row.id} resource={"payments"}/>
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
        <>
            {orderId ? (
                <List canCreate={true} breadcrumb={false} title="">
                    <DataGrid {...dataGridProps} columns={columns} autoHeight/>
                </List>
            ) : (
                <List canCreate={true}>
                    <DataGrid {...dataGridProps} columns={columns} autoHeight/>
                </List>
            )}
        </>
    );
}


export default PaymentList;
