"use client";

import {Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Create} from "@refinedev/mui";
import {useForm} from "@refinedev/react-hook-form";
import {IPayment} from "@app/payment/types/IPayment";
import {useParams} from "next/navigation";
import {useEffect} from "react";
import {useGo} from "@refinedev/core";

export default function PaymentCreate() {

    const {orderId} = useParams();
    const go = useGo();

    const {
        saveButtonProps,
        refineCore: {formLoading},
        register,
        setValue,
        watch,
        formState: {errors},
    } = useForm<IPayment>({
        refineCoreProps: {
            redirect: false,
            onMutationSuccess: () => {
                go({to: `/order/show/${orderId}`});
            }
        }
    });


    useEffect(() => {
        setValue("orderId", orderId);
    }, [orderId, setValue]);

    // Watch the payment type to render conditional fields
    const type = watch("type");

    return (
        <Create isLoading={formLoading} goBack {...saveButtonProps}>
            <Box
                component="form"
                sx={{display: "flex", flexDirection: "column"}}
                autoComplete="off"
            >
                <TextField
                    {...register("orderId", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.orderId}
                    helperText={(errors as any)?.orderId?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="text"
                    label={"Order Id"}
                    name="orderId"
                    disabled
                />
                <TextField
                    {...register("amount", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.amount}
                    helperText={(errors as any)?.amount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="number"
                    label={"Amount"}
                    name="amount"
                />

                <FormControl
                    fullWidth
                    margin="normal"
                    error={!!(errors as any)?.type}
                >
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                        labelId="type-label"
                        id="type"
                        label="Type"
                        defaultValue=""
                        {...register("type", {
                            required: "This field is required",
                        })}
                    >
                        <MenuItem value="CARD">CARD</MenuItem>
                        <MenuItem value="PIX">PIX</MenuItem>
                    </Select>
                    {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
                </FormControl>

                {type === "CARD" && (
                    <>
                        <TextField
                            {...register("cardHash", {
                                required: "Card Hash is required",
                            })}
                            error={!!(errors as any)?.cardHash}
                            helperText={(errors as any)?.cardHash?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            type="text"
                            label={"Card Hash"}
                            name="cardHash"
                        />
                        <TextField
                            {...register("cardholderName", {
                                required: "Cardholder Name is required",
                            })}
                            error={!!(errors as any)?.cardholderName}
                            helperText={(errors as any)?.cardholderName?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            type="text"
                            label={"Cardholder Name"}
                            name="cardholderName"
                        />
                        <TextField
                            {...register("expiryDate", {
                                required: "Expiry Date is required",
                            })}
                            error={!!(errors as any)?.expiryDate}
                            helperText={(errors as any)?.expiryDate?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            type="text"
                            label={"Expiry Date"}
                            name="expiryDate"
                        />
                    </>
                )}

                {type === "PIX" && (
                    <TextField
                        {...register("pixKey", {
                            required: "PIX Key is required",
                        })}
                        error={!!(errors as any)?.pixKey}
                        helperText={(errors as any)?.pixKey?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label={"PIX Key"}
                        name="pixKey"
                    />
                )}
            </Box>
        </Create>
    );
}
