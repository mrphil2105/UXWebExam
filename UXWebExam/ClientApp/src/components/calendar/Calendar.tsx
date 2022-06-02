import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

interface Props {
    name: string;
    value: Date | null;
    onChange: (value: Date | null) => void;
}

const Calendar = (props: Props) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={props.name}
                inputFormat="dd/MM/yyyy"
                value={props.value}
                onChange={props.onChange}
                renderInput={params => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}

export default Calendar;
