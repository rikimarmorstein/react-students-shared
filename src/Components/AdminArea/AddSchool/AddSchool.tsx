import { useNavigate } from "react-router-dom";
import SchoolUserModel from "../../../Models/SchoolUserModel";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import "./AddSchool.css";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdHomeWork } from "react-icons/md";

function AddSchool(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<SchoolUserModel>();

    const navigate = useNavigate();

    async function send(school: SchoolUserModel) {
        try {
            await adminService.addSchool(school);
            notificationService.success("School Added");
            navigate("/admin-home/all-schools");
        } catch (error: any) {
            notificationService.error(error);
        }
    }
    return (
        <div className="AddSchool">
            <form>
                <h2>הוספת בית ספר</h2>
                <label><FaUserAlt /> שם בית הספר: </label><br />
                <TextField type="text" {...register("schoolName",
                    {
                        required: { value: true, message: "חסר שם בית הספר" },
                        // validate: (value) => isValidateName(value) || "Name should contains only letters",
                        minLength: { value: 2, message: "שם בית הספר קצר מידי" }
                    })} />
                <span>{formState.errors?.schoolName?.message}</span><br /><br />
                <label><BsFillTelephoneFill/> טלפון: </label><br />
                <TextField type="phone" {...register("phone",
                    {
                        required: { value: true, message: "Missing phone" },
                        // validate: (value) => isValidateEmail(value) || "Email must include @ and .",
                        minLength: { value: 2, message: "phone too short" }
                    })} />
                <span>{formState.errors?.phone?.message}</span><br /><br />
                <label><RiLockPasswordFill />סיסמה: </label><br />
                <TextField type="text" {...register("password",
                    {
                        required: { value: true, message: "Missing password" },
                        minLength: {
                            value: 2, message: "password too short"
                        }
                    })} />
                <span>{formState.errors?.password?.message}</span><br /><br/>
            <label> <MdHomeWork/>כתובת:</label><br/>
                <TextField type="text" {...register("address",
                    {
                        required: { value: true, message: "Missing address" },
                        minLength: {
                            value: 2, message: "address too short"
                        }
                    })} />
                <span>{formState.errors?.address?.message}</span><br />
                <Button onClick={handleSubmit(send)} title="Add school">הוספה</Button>
            </form>
        </div>
    );
}

export default AddSchool;
