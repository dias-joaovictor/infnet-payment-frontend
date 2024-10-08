"use client";

import {Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Edit} from "@refinedev/mui";
import {useForm} from "@refinedev/react-hook-form";
import {ICardPayment, IPayment, IPixPayment} from "@app/payment/types/IPayment";
import {useEffect} from "react";
import {useGo} from "@refinedev/core";
import {Controller} from "react-hook-form";

export default function PaymentEdit() {
    const go = useGo();

    const {
        saveButtonProps,
        refineCore: {formLoading, queryResult},
        register,
        control,
        watch,
        setValue,
        formState: {errors},
    } = useForm<IPayment>({
            refineCoreProps: {
                redirect: false,
                onMutationSuccess: (data) => {
                    if (data?.data) {
                        const orderId = data.data.orderId;
                        go({to: `/order/show/${orderId}`});
                    }
                }
            }
        }
    );

    // const type = watch("type");

    // Effect to set the initial value of the select input when the data is loaded
    // useEffect(() => {
    //     if (queryResult?.data?.data) {
    //         const paymentData = queryResult.data.data as IPayment;
    //         setValue("type", paymentData.type);
    //         if (paymentData.type === 'CARD') {
    //             const cardPayment = queryResult.data.data as ICardPayment;
    //             setValue("cardHash", cardPayment.cardHash);
    //             setValue("cardholderName", cardPayment.cardholderName);
    //             setValue("expiryDate", cardPayment.expiryDate);
    //         } else {
    //             const pixPayment = queryResult.data.data as IPixPayment;
    //             setValue("pixKey", pixPayment.pixKey);
    //         }
    //     }
    // }, [queryResult]);

    const type = watch("type");  // Get the current type value

    // Effect to set the initial value of the select input when the data is loaded
    useEffect(() => {
        if (!type && queryResult?.data?.data) {  // Check if type is not set
            const paymentData = queryResult.data.data as IPayment;

            setValue("type", paymentData.type);

            if (paymentData.type === 'CARD') {
                const cardPayment = paymentData as ICardPayment;
                setValue("cardHash", cardPayment.cardHash);
                setValue("cardholderName", cardPayment.cardholderName);
                setValue("expiryDate", cardPayment.expiryDate);
            } else if (paymentData.type === 'PIX') {
                const pixPayment = paymentData as IPixPayment;
                setValue("pixKey", pixPayment.pixKey);
            }
        }
    }, [queryResult, setValue, type]);

    return (
        <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
            <Box
                component="form"
                sx={{display: "flex", flexDirection: "column"}}
                autoComplete="off"
            >
                <TextField
                    {...register("id", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.id}
                    helperText={(errors as any)?.id?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="text"
                    label={"Id"}
                    name="id"
                    disabled
                />
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
                    error={!!errors.type}
                >
                    <InputLabel id="type-label">Type</InputLabel>
                    <Controller
                        name="type"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <Select
                                {...field}
                                labelId="type-label"
                                label="Type"
                            >
                                <MenuItem value="CARD">CARD</MenuItem>
                                <MenuItem value="PIX">PIX</MenuItem>
                            </Select>
                        )}
                    />
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
        </Edit>
    );
}
