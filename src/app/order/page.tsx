"use client";

import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {DeleteButton, EditButton, List, ShowButton, useDataGrid,} from "@refinedev/mui";
import React from "react";
import {IOrder} from "@app/order/types/IOrder";


export default function OrderList() {
    const {dataGridProps} = useDataGrid<IOrder>();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "string",
                width: 300
            },
            {
                field: "orderDate",
                headerName: "Order Date",
                type: "String",
                minWidth: 50
            },
            {
                field: "amount",
                headerName: "Order Amount",
                type: "number",
                minWidth: 50,
            },
            {
                field: "fee",
                headerName: "Order Fee",
                type: "number",
                minWidth: 50,
            },
            {
                field: "totalAmount",
                headerName: "Total Amount",
                type: "number",
                minWidth: 50,
            },
            {
                field: "customer",
                headerName: "Customer",
                type: "string",
                width: 400,
                valueGetter: (params) =>
                    params.row?.customer.fullName.concat(' - ', params.row?.customer.id),
                headerAlign: "center",
                align: "right"
            },
            {
                field: "link",
                headerName: "",
                sortable: false,
                width: 350,
                renderCell: function render({row}) {
                    return (
                        <>
                            <ShowButton hideText resource="customers" recordItemId={row?.customer.id}/>
                        </>
                    );
                },
                align: "left", // Aligns the content to the right
                headerAlign: "center", // Aligns the header to the right
                flex: 1,
                minWidth: 80,
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
