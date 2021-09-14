import { Grid, TextField } from '@material-ui/core';
import { NextPage } from 'next';

const LoginPage: NextPage = () => {
  return (
    <Grid container>
      <p>ورود</p>
      <TextField
        required
        id="standard-required"
        label="Required"
        defaultValue="نام کاربری"
      />
      <TextField
        id="standard-password-input"
        label="رمزعبور"
        type="password"
        autoComplete="current-password"
      />
    </Grid>
  );
};

export default LoginPage;
