import React, { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { TextField } from '@mui/material';

export default function Calender() {
    

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="DateTimePicker"
          value={true}
          onChange={(newValue) => {
            
          }}
        />
      </LocalizationProvider>
    );
}


