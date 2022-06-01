import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Payment
      </Typography>
      <img src={require("../../resources/creditCardTemplate.png")} width="90%"/>
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={10}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}