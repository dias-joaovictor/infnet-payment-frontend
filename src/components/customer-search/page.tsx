import React, {useEffect, useState} from "react";
import {Autocomplete, Box, CircularProgress, FormControl, FormLabel, IconButton, TextField} from "@mui/material";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import {ICustomer} from "@app/customer/types/ICustomer";

const CUSTOMERS_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customers`;

interface CustomerSearchProps {
    initialCustomerId?: string;
    onCustomerSelected: (customer: ICustomer) => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({initialCustomerId, onCustomerSelected}) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [customer, setCustomer] = useState<ICustomer | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<ICustomer[]>([]);

    useEffect(() => {
        if (initialCustomerId) {
            fetchCustomerById(initialCustomerId);
        }
    }, [initialCustomerId]);

    const fetchCustomerById = async (id: string) => {
        setLoading(true);
        try {
            const response = await axios.get<ICustomer>(`${CUSTOMERS_URL}/${id}`);
            if (response.data) {
                setCustomer(response.data);
                setSearchTerm(`${response.data.id} - ${response.data.fullName}`);
                onCustomerSelected(response.data);
            }
        } catch (error) {
            console.error("Error fetching customer by ID:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomersByName = async (name: string) => {
        setLoading(true);
        try {
            const response = await axios.get<ICustomer[]>(CUSTOMERS_URL, {
                params: {fullName: name},
            });
            setOptions(response.data);
        } catch (error) {
            console.error("Error fetching customers by name:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        setCustomer(null);

        if (value.match(/^[0-9a-fA-F-]{36}$/)) {
            fetchCustomerById(value);
        } else if (value.length > 2) {
            fetchCustomersByName(value);
        } else {
            setOptions([]);
        }
    };

    const handleCustomerSelect = (event: any, selectedCustomer: ICustomer | null) => {
        if (selectedCustomer) {
            setCustomer(selectedCustomer);
            setSearchTerm(`${selectedCustomer.id} - ${selectedCustomer.fullName}`);
            onCustomerSelected(selectedCustomer);
        }
    };

    const handleClearSelection = () => {
        setCustomer(null);
        setSearchTerm("");
        setOptions([]);
    };

    return (
        <FormControl component="fieldset" sx={{marginBottom: 2, width: '100%'}}>
            <FormLabel component="legend" sx={{marginBottom: 1}}>Customer Search</FormLabel>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <Autocomplete
                    options={options}
                    getOptionLabel={(option) => `${option.id} - ${option.fullName}`}
                    onChange={handleCustomerSelect}
                    inputValue={searchTerm}
                    onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Customer"
                            variant="outlined"
                            fullWidth
                            onChange={handleSearch}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                    sx={{flexGrow: 1}}
                />
                {customer && (
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <TextField
                            label="Selected Customer"
                            value={`${customer.id} - ${customer.fullName}`}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            disabled
                            sx={{flexGrow: 1}}
                        />
                        <IconButton onClick={handleClearSelection} sx={{marginLeft: 1}} color={"error"}>
                            <ClearIcon/>
                        </IconButton>
                    </Box>
                )}
            </Box>
        </FormControl>
    );
};

export default CustomerSearch;
