import { useNavigate, useParams } from "react-router-dom";
import "./UpdateSchool.css";
import { TextField } from "@mui/material";
import { useState } from "react";
import SchoolUserModel from "../../../Models/SchoolUserModel";
import store from "../../../Redux/Store";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import adminService from "../../../Services/AdminService";
import { updateSchoolAction } from "../../../Redux/SchoolDirectorState";
import notificationService from "../../../Services/NotificationService";

function UpdateSchool(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const schoolId: number = Number(params.id);
    const [school, setSchool] = useState<SchoolUserModel>(store.getState().schoolState.schools.filter(school => school.id === schoolId)[0]);

    const schema = yup.object().shape({
        schoolName: yup.string().required("חסר שם "),
        address: yup.string().required("חסר כתובת "),
        password: yup.string().required("חסר סיסמא"),
        phone: yup.string().required("חסר טלפון")
    })

    let defaultValueObj = { ...school}

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } } = useForm<SchoolUserModel>({
        defaultValues: defaultValueObj,
        mode: "all",
        resolver: yupResolver(schema),
    })

    const sendUpdateSchool = (school: SchoolUserModel): void => {
        adminService.updateSchool(school).then((res) => {
            store.dispatch(updateSchoolAction(school))
            notificationService.success(" עודכן בהצלחה");
            navigate("/admin-area/all-schools");
        }).catch((error) => {
            notificationService.error(error);
        })
    }

    
    return (
        <div className="UpdateSchool">
			 <form className='UpdateSchool' onSubmit={handleSubmit(sendUpdateSchool)}>

                <h1>עדכון בית ספר</h1>

                <label htmlFor="schoolName">שם  של בית הספר</label>
                <TextField {...register("schoolName")} id='schoolName' type="text" />
                <span>{errors.schoolName?.message}</span>

                <label htmlFor="address">כתובת</label>
                <TextField {...register("address")} id='address' type="text" />
                <span>{errors.address?.message}</span>

                <label htmlFor="password"> סיסמא  </label>
                <TextField {...register("password")} id='password' type="number" />
                <span>{errors.password?.message}</span>

                <label htmlFor="phone">טלפון</label>
                <TextField {...register("phone")} id='phone' type="text" />
                <span>{errors.phone?.message}</span>

                <div className='vertical-center'>
                    <button disabled={!isValid}>עדכן</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateSchool;
