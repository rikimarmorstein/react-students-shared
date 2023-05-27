import {AxiosResponse}  from "axios";
import appConfig from "../Utils/Config";
import tokenAxios from "../Utils/Interceptors";
import StudentUserModel from "../Models/StudentUserModel";

class ParentService{
    private parentrUrl = appConfig.parentUrl;

    public getAllStudentsByPhone(phone:string): Promise<AxiosResponse<StudentUserModel []>> {
        return tokenAxios.get(this.parentrUrl + "all-students-phone?all-students-phone="+ phone);
    }

}

const parentService = new ParentService();
export default parentService;