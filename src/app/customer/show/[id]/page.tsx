"use client";

import {Stack, Typography} from "@mui/material";
import {useShow} from "@refinedev/core";
import {Show, TextFieldComponent as TextField} from "@refinedev/mui";
import {ICustomer} from "@app/customer/types/ICustomer";


export default function FeeShow() {
    const {query} = useShow<ICustomer>();
    const {data, isLoading} = query;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                    {"ID"}
                </Typography>
                <TextField value={record?.id}/>

                <Typography variant="body1" fontWeight="bold">
                    {"Full Name"}
                </Typography>
                <TextField value={record?.fullName}/>

                <Typography variant="body1" fontWeight="bold">
                    {"Date of Birth"}
                </Typography>
                <TextField value={record?.dateOfBirth}/>

                <Typography variant="body1" fontWeight="bold">
                    {"Is Customer Enabled"}
                </Typography>
                <TextField value={record?.enabled ? 'Yes' : 'No'}/>
            </Stack>
        </Show>
    );
}
