import "./AdminLogin.css";
import ClientType from "../../../Models/ClientType";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Select, TextField } from "@mui/material";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function AdminLogin(): JSX.Element { const { register, handleSubmit, formState } = useForm<CredentialsModel>();

const navigate = useNavigate();

function send(credentials: CredentialsModel) {
    credentials.clientType = ClientType.ADMIN;

    authService.login(credentials).then(() => {
        notificationService.success("! ברוך הבא ");
        runLogoutTimer();
        navigate("/admin-home");
    })
        .catch((err) =>
            notificationService.error(err)
        );
}
const runLogoutTimer = () => {

    setTimeout(() => {
        authService.logout();

        navigate("/login")

    }, 1_800_000) // 30:00 minutes - 1800000

}

const [value, setValue] = React.useState('');

// const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setValue((event.target as HTMLInputElement).value);
// };


const [values, setValues] = useState({
password: '',
weight: '',
weightRange: '',
showPassword: false,
});


const handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
setValues({ ...values, [prop]: event.target.value });
};

const handleClickShowPassword = () => {
setValues({ ...values, showPassword: !values.showPassword });
};

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
event.preventDefault();
};
    return (
        <div className="AdminLogin">
			    <form onSubmit={handleSubmit(send)} >
                <TextField id="text" label="phone" variant="outlined" required {...register("phone",
                    {
                        required: { value: true, message: "חסר מייל" },
                      //  minLength: { value: 2, message: " קצר מדי" },

                    }
                )}

                />  <span>{formState.errors?.phone?.message}</span>
                <br /><br />
                <FormControl id="password" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" variant="outlined" >Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            required {...register("password")}
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <BsEye className="eye" /> : <BsEyeSlash className="eye" />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
                <Button id="button" variant="outlined" color="primary" type="submit">התחברות</Button>
            </form>

        </div>
    );
}

export default AdminLogin;
