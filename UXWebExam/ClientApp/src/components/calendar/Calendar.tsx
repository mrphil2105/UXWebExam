import { TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import { useState } from "react";
import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

let selectedDateTime: { toDateString: () => any; toTimeString: () => any } | null;

interface Props {
    name: string;
}

const Calendar = (props: Props) => {
    const [ selectedDateTime, setSelectedDateTime ] = useState<Date | null>(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                label={props.name}
                value={selectedDateTime}
                onChange={newValue => setSelectedDateTime(newValue)}
                renderInput={params => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
export default Calendar;

function getDateTime() {
    if (selectedDateTime != null) {
        return selectedDateTime.toDateString() + selectedDateTime.toTimeString()
    }

    return null;
}
