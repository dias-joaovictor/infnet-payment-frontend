"use client";

import {Box, Checkbox, FormControl, FormControlLabel, TextField} from "@mui/material";
import {Create} from "@refinedev/mui";
import {useForm} from "@refinedev/react-hook-form";
import {ICustomer} from "@app/customer/types/ICustomer";

export default function FeeCreate() {
    const {
        saveButtonProps,
        refineCore: {formLoading},
        register,
        formState: {errors},
    } = useForm<ICustomer>();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{display: "flex", flexDirection: "column"}}
                autoComplete="off"
            >
                <TextField
                    id={"fullName"}
                    {...register("fullName", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.fullName}
                    helperText={(errors as any)?.fullName?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="text"
                    label={"fullName"}
                    name="fullName"
                />
                <TextField
                    id={"dateOfBirth"}
                    {...register("dateOfBirth", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.dateOfBirth}
                    helperText={(errors as any)?.dateOfBirth?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="date"
                    label={"Date of Birth"}
                    name="dateOfBirth"
                />
                <FormControl margin="normal" fullWidth error={!!errors.enabled}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                id="enabled"
                                {...register("enabled")}
                            />
                        }
                        label="Is Customer Enabled" // Label text that appears next to the checkbox
                    />
                </FormControl>
            </Box>
        </Create>
    );
}
