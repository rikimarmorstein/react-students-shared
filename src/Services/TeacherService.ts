import { AxiosResponse } from "axios";
import appConfig from "../Utils/Config";
import tokenAxios from "../Utils/Interceptors";
import StudentUserModel from "../Models/StudentUserModel";
import TeacherUserModel from "../Models/TeacherUserModel";

class TeacherService{
    private teacherUrl = appConfig.teacherUrl;

    public getTeacherDetails(): Promise<AxiosResponse<TeacherUserModel>>{
        return tokenAxios.get(this.teacherUrl + "teacher");
    }

    public updateTeacherMe(teacher: TeacherUserModel): Promise<AxiosResponse<any>> {
        return tokenAxios.put(this.teacherUrl+ "update-teacher" , teacher);
    }

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