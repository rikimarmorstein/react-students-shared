import "./AddTeacher.css";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import { useForm } from "react-hook-form";
import TeacherUserModel from "../../../Models/TeacherUserModel";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import { addTeacherAction } from "../../../Redux/SchoolDirectorState";

function AddTeacher(): JSX.Element {

    const navigate = useNavigate();

    const schema = yup.object().shape({
        // clientType: yup.string().required("ClientType is required"),
        name: yup.string().required("שדה זה חובה"),
        phone: yup.string().required("שדה זה חובה"),
        password: yup.number().min(4).required("שדה זה חובה"),
        numClass: yup.number()
    })

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<TeacherUserModel>({
        mode: "all",
        resolver: yupResolver(schema),
    })

    const sendTeacher = (teacher: TeacherUserModel): void => {
        schoolDirectorService.addTeacher(teacher).then((res) => {
            store.dispatch(addTeacherAction(teacher));
            notify.success("Added teacher successfully");
            navigate("/school-director");
        }).catch((error) => {
            notify.error(error);
        })
    }

    return (
        <div>
            <h1>הוספת מורה</h1>
            {/* clientType: yup.string().required("ClientType is required"), */}
            <form className='AddTeacher' onSubmit={handleSubmit(sendTeacher)}>

                <label htmlFor="name">שם המורה</label>
                <span>{errors.name?.message}</span>
                <input {...register("name")} id='name' type="text" placeholder='הזן את שם המורה' />

                <label htmlFor="phone"> טלפון של המורה</label>
                <span>{errors.phone?.message}</span>
                <input {...register("phone")} id='phone' type="number" placeholder='הזן מספר טלפון' />

                <label htmlFor="password">סיסמה חד פעמית</label>
                <span>{errors.password?.message}</span>
                <input {...register("password")} id='password' type="text" placeholder='הזן סיסמה חד פעמית' />

                <label htmlFor="numClass">מספר כיתה אליה משויך</label>
                <span>{errors.numClass?.message}</span>
                <input {...register("numClass")} id='numClass' type="number" placeholder='הזן מספר כיתה שאליה המורה משויך' />

                <button disabled={!isValid}>הוספה</button>
            </form>
        </div>
    );
}

export default AddTeacher;
