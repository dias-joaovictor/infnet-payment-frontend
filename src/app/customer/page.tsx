"use client";

import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {DeleteButton, EditButton, List, ShowButton, useDataGrid,} from "@refinedev/mui";
import React from "react";
import {ICustomer} from "@app/customer/types/ICustomer";


export default function CustomerList() {
    const {dataGridProps} = useDataGrid<ICustomer>();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "string",
                width: 300
            },
            {
                field: "fullName",
                headerName: "Full Name",
                type: "String",
                minWidth: 50,
                width: 300
            },
            {
                field: "dateOfBirth",
                headerName: "Date of Birth",
                type: "string",
                minWidth: 50,
                width: 300
            },
            {
                field: "enabled",
                headerName: "Is Customer Enabled",
                type: "boolean",
                minWidth: 50,
                width: 300
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
