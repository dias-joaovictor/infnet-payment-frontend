"use client";

import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {DeleteButton, EditButton, List, ShowButton, useDataGrid,} from "@refinedev/mui";
import React from "react";
import {IPayment} from "@app/payment/types/IPayment";
import {CurrencyFormatter} from "@components/currency-formatter/CurrencyFormatter";


export default function PaymentList() {
    const {dataGridProps} = useDataGrid<IPayment>();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "type",
                headerName: "Type",
                type: "string",
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
        <List canCreate={true}>
            <DataGrid {...dataGridProps} columns={columns} autoHeight/>
        </List>
    );
}
