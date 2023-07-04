import { useNavigate } from "react-router-dom";
import "./ParentLogin.css";
import { useForm } from "react-hook-form";
import CredentialsModel from "../../../Models/CredentialsModel";
import ClientType from "../../../Models/ClientType";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import { Button, TextField } from "@mui/material";


function ParentLogin(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    const navigate = useNavigate();

    function send(credentials: CredentialsModel) {
        credentials.clientType = ClientType.PARENTS;

        authService.login(credentials).then(() => {
            notificationService.success("! ברוך הבא ");
            runLogoutTimer();
            navigate("/parent-home");
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
    // const [value, setValue] =useState<string>('');

    // const [value, setValue] = React.useState('');

    // const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue((event.target as HTMLInputElement).value);
    //   };



    // const [values, setValues] = useState({
    //     password: '',
    //     weight: '',
    //     weightRange: '',
    //     showPassword: false,
    // });


    // const handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };

    // const handleClickShowPassword = () => {
    //     setValues({ ...values, showPassword: !values.showPassword });
    // };

    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };


    return (
        <div className="ParentLogin">

            <form onSubmit={handleSubmit(send)} >
                <TextField id="text" label="phone" variant="outlined" required {...register("phone",
                    {
                        required: { value: true, message: "חסר טלפון" },
                        minLength: { value: 9, message: "הטלפון קצר מדי" },
                        maxLength: { value: 10, message: "הטלפון ארוך מדי" }

                    }
                )}

                />  <span>{formState.errors?.phone?.message}</span>
                <br /><br />

                <Button id="button" variant="outlined" color="primary" type="submit">התחברות</Button>
            </form>


        </div>
    );
}

export default ParentLogin;
