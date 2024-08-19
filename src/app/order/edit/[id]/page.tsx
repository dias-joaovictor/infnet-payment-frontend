"use client";

import {Box, Checkbox, FormControl, FormControlLabel, TextField} from "@mui/material";
import {Edit} from "@refinedev/mui";
import {useForm} from "@refinedev/react-hook-form";
import {ICustomer} from "@app/customer/types/ICustomer";
import {useEffect, useState} from "react";

export default function OrderEdit() {
    const {
        saveButtonProps,
        refineCore: {formLoading, query},
        register,
        formState: {errors},
        setValue
    } = useForm<ICustomer>();

    const customer = query?.data?.data;

    // State to control the checkbox
    const [checked, setChecked] = useState(false);

    // Set the initial value of the checkbox once the data is loaded
    useEffect(() => {
        if (customer) {
            setChecked(customer.enabled);
            setValue("enabled", customer.enabled); // Update the form state with the fetched value
        }
    }, [customer, setValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        setValue("enabled", event.target.checked); // Update the form state when the checkbox is toggled
    };


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
                                checked={checked} // Controlled component
                                onChange={handleChange} // Handle change manually
                            />
                        }
                        label="Is Customer Enabled" // Label text that appears next to the checkbox
                    />
                </FormControl>

            </Box>
        </Edit>
    );
}
