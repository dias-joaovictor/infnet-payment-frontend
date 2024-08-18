"use client";

import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {DeleteButton, EditButton, List, ShowButton, useDataGrid,} from "@refinedev/mui";
import React from "react";
import {IFee} from "@app/fee/types/IFee";


export default function FeeList() {
    const {dataGridProps} = useDataGrid<IFee>({resource: 'fees'});

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "string",
                width: 300
            },
            {
                field: "feeAmount",
                headerName: "Amount",
                type: "number",
                minWidth: 50,
                width: 300
            },
            {
                field: "fromDate",
                headerName: "Start Date",
                type: "string",
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
                            <DeleteButton hideText recordItemId={row.id} resource={"fees"}/>
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
        <List resource={'fee'} canCreate={true}>
            <DataGrid {...dataGridProps} columns={columns} autoHeight/>
        </List>
    );
}
