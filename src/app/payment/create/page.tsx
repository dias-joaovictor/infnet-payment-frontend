"use client";

import {Box, TextField} from "@mui/material";
import {Create} from "@refinedev/mui";
import {useForm} from "@refinedev/react-hook-form";
import {IFee} from "@app/fee/types/IFee";

export default function FeeCreate() {
    const {
        saveButtonProps,
        refineCore: {formLoading},
        register,
        formState: {errors},
    } = useForm<IFee>();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{display: "flex", flexDirection: "column"}}
                autoComplete="off"
            >
                <TextField
                    {...register("feeAmount", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.feeAmount}
                    helperText={(errors as any)?.feeAmount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="number"
                    label={"Amount"}
                    name="feeAmount"
                />
                <TextField
                    {...register("fromDate", {
                        required: "This field is required"
                    })}
                    error={!!(errors as any)?.fromDate}
                    helperText={(errors as any)?.fromDate?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="date"
                    label={"Starting Date"}
                    name="fromDate"
                    defaultValue={new Date().toISOString().split('T')[0]}
                />
            </Box>
        </Create>
    );
}
