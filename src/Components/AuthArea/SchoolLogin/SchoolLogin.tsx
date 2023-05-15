import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ClientType from "../../../Models/ClientType";
import CredentialsModel from "../../../Models/CredentialsModel";
// import { logoutAction as logoutCompany } from "../../../Redux/CompanyState";
// import { logoutAction as logoutCoupon } from "../../../Redux/CouponState";
// import { logoutAction as logoutCustomer } from "../../../Redux/CustomerState";
import store from "../../../Redux/Store";
// import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Select, TextField } from "@mui/material";
import { BsEye, BsEyeSlash } from "react-icons/bs";
// import { FaUserAlt } from "react-icons/fa";
import React, { useState } from "react";
import "./SchoolLogin.css";
import authService from "../../../Services/AuthService";

function SchoolLogin(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    const navigate = useNavigate();

    function send(credentials: CredentialsModel) {
      // setClientType(ClientType.SCHOOL);
      console.log(credentials.clientType);
      credentials.phone === "SCHOOL_DIRECTOR";

      console.log(credentials.phone);

      authService.login(credentials).then(() => {
        notificationService.success("Welcome!");
        runLogoutTimer();
        navigate("/school-home");
     })
        .catch((err) =>
          notificationService.error(err)
        );
    }
    const runLogoutTimer = () => {
  
      setTimeout(() => {
        authService.logout();
        // store.dispatch(logoutCompany());
        // store.dispatch(logoutCoupon());
        // store.dispatch(logoutCustomer());
  
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
  
  
    // function isValidateEmail(email: string): boolean {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   return emailRegex.test(email)
    // }
    return (
        <div className="SchoolLogin">
              
	<form onSubmit={handleSubmit(send)} >
<TextField id="text" label="phone" variant="outlined" required {...register("phone",
  {
    required: { value: true, message: "Missing phone" },
    // validate: (value) => isValidateEmail(value) || "Invalid email address",
    minLength: { value: 9, message: "Phone too short" },
    maxLength: { value: 10, message: "Phone no too short" }

  }
)}

//   InputProps={{
//     endAdornment: <InputAdornment position="end">
//         {/* <MdAttachEmail className="emailIcon" /> */}
//         </InputAdornment>,
//   }}
/>                     <span>{formState.errors?.phone?.message}</span>
{/* <span>Must include @ and .</span><br /><br /> */}
<br />
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

<Button id="button" variant="outlined" color="primary" type="submit">Login</Button>
</form>

        </div>
    );
}

export default SchoolLogin;
