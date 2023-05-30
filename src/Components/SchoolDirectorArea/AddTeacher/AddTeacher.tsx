import "./AddTeacher.css";
import * as yup from 'yup';
// import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import { useForm } from "react-hook-form";

function AddTeacher(): JSX.Element {
    const navigate = useNavigate();
    // const params = useParams();
    // const couponId: number = Number(params.id);
    const [currentImage, setCurrentImage] = useState<string>("");

    // function getDateWithOutTime (): Date {
    //     let curDate = new Date();
    //     curDate.setHours(0, 0, 0, 0);
    //     return curDate;
    // }
    
    const schema = yup.object().shape({
        clientType: yup.string().required("ClientType is required"),
        name: yup.string().required("Name is required"),
        phone: yup.string().required("Phone is required"),
        password: yup.number().min(1).required("Password is required"),
        numClass: yup.number().min(0).required("Num Class is required")
    })
    
    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const selectedImage = e.currentTarget.value
        setCurrentImage(selectedImage);
    }
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<CouponModel>({
        mode: "all",
        resolver: yupResolver(schema),
    })

    const sendCoupon = (coupon: CouponModel): void => {
        companyService.addCoupon(coupon).then((res) => {
            store.dispatch(addCouponAction(coupon));
            notify.success("Added coupon successfully");
            navigate("/company/coupons");
        }).catch((error) => {
            notify.error(error);
        })
    }

    return (
        <div>
            <h1>Add Coupon</h1>
            <form className='AddCoupon' onSubmit={handleSubmit(sendCoupon)}>
                <select {...register("category")} name="category" id="category">
                    <option value="FOOD">Food</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="RESTAURANT">Restaurant</option>
                    <option value="VACATION">Vacation</option>
                </select>
                <span>{errors.category?.message}</span>

                <label htmlFor="title">Title</label>
                <span>{errors.title?.message}</span>
                <input {...register("title")} id='title' type="text" placeholder='title company here' />

                <label htmlFor="description">Description</label>
                <span>{errors.description?.message}</span>
                <input {...register("description")} id='description' type="text" placeholder='Description here' />

                <label htmlFor="startDate">Start Date</label>
                <span>{errors.startDate?.message}</span>
                <input {...register("startDate")} id='startDate' type="date" placeholder='Start Date here' />

                <label htmlFor="endDate">End Date</label>
                <span>{errors.endDate?.message}</span>
                <input {...register("endDate")} id='endDate' type="date" placeholder='End Date here' />

                <label htmlFor="amount">Amount</label>
                <span>{errors.amount?.message}</span>
                <input {...register("amount")} id='amount' type="number" placeholder='amount here' />

                <label htmlFor="price">Price</label>
                <span>{errors.price?.message}</span>
                <input {...register("price")} id='price' type="number" step={0.01} placeholder='price here' />

                <label htmlFor="image">Image</label>
                <img id="img" src={currentImage} alt="image" />
                <span>{errors.image?.message}</span>
                <input {...register("image")} id='image' type="text" onChange={handleImageChange} placeholder='image here' />

                <button disabled={!isValid}>Add</button>
            </form>
        </div>
    );
}

export default AddTeacher;
