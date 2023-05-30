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
        clientType: yup.string().required("ClientType is required"),
        name: yup.string().required("Name is required"),
        phone: yup.string().required("Phone is required"),
        password: yup.number().min(1).required("Password is required"),
        numClass: yup.number().min(0).required("Num Class is required")
    })

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<TeacherUserModel>({
        mode: "all",
        resolver: yupResolver(schema),
    })

    const sendTeacher = (teacher: TeacherUserModel): void => {
        schoolDirectorService.addTeacher(teacher).then((res) => {
            store.dispatch(addTeacherAction(teacher));
            notify.success("Added teacher successfully");
            navigate("/?????????");
        }).catch((error) => {
            notify.error(error);
        })
    }

    return (
        <div>
            <h1>Add Teacher</h1>

            {/* clientType: yup.string().required("ClientType is required"), */}


            <form className='AddCoupon' onSubmit={handleSubmit(sendTeacher)}>
                {/* <select {...register("category")} name="category" id="category">
                    <option value="FOOD">Food</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="RESTAURANT">Restaurant</option>
                    <option value="VACATION">Vacation</option>
                </select>
                <span>{errors.category?.message}</span> */}

                <label htmlFor="name">Name</label>
                <span>{errors.name?.message}</span>
                <input {...register("name")} id='name' type="text" placeholder='name teacher here' />

                <label htmlFor="phone"> Phone</label>
                <span>{errors.phone?.message}</span>
                <input {...register("phone")} id='phone' type="number" placeholder=' phone here' />


                <label htmlFor="password">Password</label>
                <span>{errors.password?.message}</span>
                <input {...register("password")} id='password' type="text" placeholder='password here' />

                <label htmlFor="numClass">Num Class</label>
                <span>{errors.numClass?.message}</span>
                <input {...register("numClass")} id='numClass' type="number" placeholder='numClass here' />

                <button disabled={!isValid}>Add</button>
            </form>
        </div>
    );
}

export default AddTeacher;
