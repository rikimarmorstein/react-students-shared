import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import "./TeacherLogin.css";
import CredentialsModel from "../../../Models/CredentialsModel";
import { useForm } from "react-hook-form";
import ClientType from "../../../Models/ClientType";
import authService from "../../../Services/AuthService";
import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import notificationService from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";

function TeacherLogin(): JSX.Element {

  const { register, handleSubmit, formState } = useForm<CredentialsModel>();

  const navigate = useNavigate();

  function send(credentials: CredentialsModel) {
    credentials.clientType = ClientType.TEACHER;

    authService.login(credentials).then(() => {
      notificationService.success("! ברוך הבא ");
      runLogoutTimer();
      navigate("/teacher-home");
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
  // const [value, setValue] =useState<string>('');

  // const [value, setValue] = React.useState('');

  // const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setValue((event.target as HTMLInputElement).value);
  //   };



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
    <div className="TeacherLogin">

      <form onSubmit={handleSubmit(send)} >
        <TextField id="text" label="phone" variant="outlined" required {...register("phone",
          {
            required: { value: true, message: "חסר טלפון" },
            minLength: { value: 9, message: "הטלפון קצר מדי" },
            maxLength: { value: 10, message: "הטלפון ארוך מדי" }

          }
        )}

        //   InputProps={{
        //     endAdornment: <InputAdornment position="end">
        //         {/* <MdAttachEmail className="emailIcon" /> */}
        //         </InputAdornment>,
        //   }}
        />                     <span>{formState.errors?.phone?.message}</span>
        {/* <span>Must include @ and .</span><br /><br /> */}
        <br /><br/>
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

export default TeacherLogin;
