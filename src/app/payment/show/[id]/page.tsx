"use client";

import {Stack, Typography} from "@mui/material";
import {useShow} from "@refinedev/core";
import {Show, TextFieldComponent as TextField} from "@refinedev/mui";
import {IFee} from "@app/fee/types/IFee";


export default function FeeShow() {
    const {query} = useShow<IFee>();
    const {data, isLoading} = query;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {"ID"}
                </Typography>
                <TextField value={record?.id}/>
                <Typography variant="body1" fontWeight="bold">
                    {"Amount"}
                </Typography>
                <TextField value={record?.feeAmount}/>
                <Typography variant="body1" fontWeight="bold">
                    {"Starting Date"}
                </Typography>
                <TextField value={record?.fromDate}/>
            </Stack>
        </Show>
    );
}
