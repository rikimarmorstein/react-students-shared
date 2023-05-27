import axios, { AxiosResponse } from "axios";
import appConfig from "../Utils/Config";
import CredentialsModel from "../Models/CredentialsModel";
import SchoolUserModel from "../Models/SchoolUserModel";
import tokenAxios from "../Utils/Interceptors";
import StudentUserModel from "../Models/StudentUserModel";

class TeacherService{
    private teacherUrl = appConfig.teacherUrl;

    // public admin(UserCredentials: CredentialsModel): Promise<AxiosResponse<string>> {
    //     return axios.post(this.adminUrl, UserCredentials);
    // }

    
    // public addSchool(school: SchoolUserModel): Promise<AxiosResponse<any>> {
    //     return tokenAxios.post(this.adminUrl + "school", school);
    // }

    // public updateSchool(school: SchoolUserModel): Promise<AxiosResponse<any>> {
    //     return tokenAxios.put(this.adminUrl +  "school", school);
    // }

    // public deleteSchool(schoolId: number): Promise<AxiosResponse<any>> {
    //     return tokenAxios.delete(this.adminUrl + "school/" + schoolId);
    // }

    public getAllStudents(): Promise<AxiosResponse<StudentUserModel []>> {
        return tokenAxios.get(this.teacherUrl + "all-students");
    }

    public getAllStudentsByClass(numClass:number): Promise<AxiosResponse<StudentUserModel []>> {
        return tokenAxios.get(this.teacherUrl + "all-students/" + numClass);
    }

    public getAllStudentsToTravel(): Promise<AxiosResponse<StudentUserModel []>> {
        return tokenAxios.get(this.teacherUrl + "all-students/isTravel");
    }

    public getAllStudentsToTravelByBus(numBus:number): Promise<AxiosResponse<StudentUserModel []>> {
        return tokenAxios.get(this.teacherUrl + "all-students/isTravel/" + numBus);
    }

    public getOneStudent(studentId:number): Promise<AxiosResponse<StudentUserModel>> {
        return tokenAxios.get(this.teacherUrl + "one-student/"+ studentId);
    }

    public isStudentTravel(studentId:number): Promise<AxiosResponse<any>> {
        return tokenAxios.get(this.teacherUrl + "isStudentTravel" + studentId);
    }

}

const teacherService = new TeacherService();
export default teacherService;