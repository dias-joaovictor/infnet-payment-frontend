import {GridValueFormatterParams} from "@mui/x-data-grid";

interface CurrencyFormatterProps {
    currency?: string;
    locale?: string;
}

export const CurrencyFormatter = ({currency = "USD", locale = "en-US"}: CurrencyFormatterProps) => {
    return (params: GridValueFormatterParams) => {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
        }).format(params?.value);
    };
};
