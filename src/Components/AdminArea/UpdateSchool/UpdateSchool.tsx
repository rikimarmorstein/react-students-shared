import { useNavigate, useParams } from "react-router-dom";
import "./UpdateSchool.css";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
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
    const { register, handleSubmit, formState, setValue } = useForm<SchoolUserModel>();

    const schoolId: number = Number(params.id);
    const [school, setSchool] = useState<SchoolUserModel>(store.getState().schoolState.schools.filter(school => school.id === schoolId)[0]);
    useEffect(() => {

       adminService.getOneSchool(schoolId)

            .then((s) => {
                setValue("id", s.data.id)

                setValue("schoolName", s.data.schoolName)
                setValue("address", s.data.address)
               
                setValue("password", s.data.password)
                setValue("phone", s.data.phone)

            })
            .catch((err) =>
                notificationService.error(err)
            );
    }, []);
    async function send(school: SchoolUserModel) {
        try {
            
             await adminService.updateSchool(school);
          
            notificationService.success("פרטי בית ספר עודכנו בהצלחה");
            store.dispatch(updateSchoolAction(school))

            navigate("/admin-home/all-schools");
        } catch (error: any) {
            notificationService.error(error)
        }
    }
    
    return (
        <div className="UpdateSchool">
			 <form className='UpdateSchool'>

                <h1>עדכון בית ספר</h1>

                <label htmlFor="schoolName">שם  של בית הספר</label>
                <TextField type="text" {...register("schoolName",
                    {
                        required: { value: true, message: "חסר  שם" },
                      
                    })} />  
                <span>{formState.errors?.schoolName?.message}</span><br /><br />

                <label htmlFor="address">כתובת</label>
                <TextField {...register("address")} id='address' type="text" />
                <span>{formState.errors?.address?.message}</span><br /><br />

                <label htmlFor="password"> סיסמא  </label>
                <TextField {...register("password")} id='password' type="text" />
                <span>{formState.errors?.password?.message}</span><br /><br />

                <label htmlFor="phone">טלפון</label>
                <TextField {...register("phone")} id='phone' type="text" />
                <span>{formState.errors?.phone?.message}</span><br /><br />

                <div className='vertical-center'>
                    <button onClick={handleSubmit(send)}>שמור</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateSchool;
