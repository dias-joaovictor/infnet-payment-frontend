"use client";

import {Box, TextField} from "@mui/material";
import {Edit} from "@refinedev/mui";
import {IFee} from "@app/fee/types/IFee";
import {useParsed, useShow} from "@refinedev/core";
import {useForm} from "@refinedev/react-hook-form";

export default function FeeEdit() {
    const {id} = useParsed();

    const {
        saveButtonProps,
        refineCore: {formLoading, onFinish},
        register,
        formState: {errors},
    } = useForm<IFee>({
        refineCoreProps: {
            resource: "fees",
            id,
            action: "edit"
        }
    });

    const {query} = useShow<IFee>({resource: "fees", id});

    return (
        <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
            <Box
                component="form"
                sx={{display: "flex", flexDirection: "column"}}
                autoComplete="off"
            >
                <TextField
                    id={"id"}
                    {...register("id")}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="text"
                    label={"ID"}
                    disabled={true}
                />
                <TextField
                    id={"feeAmount"}
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
                    id={"fromDate"}
                    {...register("fromDate", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.fromDate}
                    helperText={(errors as any)?.fromDate?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="date"
                    label={"Start Date"}
                    name="fromDate"
                />
            </Box>
        </Edit>
    );
}
