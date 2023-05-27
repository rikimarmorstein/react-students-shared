import axios, { AxiosResponse } from "axios";
import appConfig from "../Utils/Config";
import SchoolUserModel from "../Models/SchoolUserModel";
import tokenAxios from "../Utils/Interceptors";
import TeacherUserModel from "../Models/TeacherUserModel";

class SchoolDirectorService{
    private schoolDirectorUrl = appConfig.schoolDirectorUrl;
    
    public updateSchool(school: SchoolUserModel): Promise<AxiosResponse<any>> {
        return tokenAxios.put(this.schoolDirectorUrl +  "school", school);
    }

    public addTeacher(teacher: TeacherUserModel): Promise<AxiosResponse<any>> {
        return tokenAxios.post(this.schoolDirectorUrl + "teacher" , teacher);
    }

    public updateTeacher(teacher: TeacherUserModel): Promise<AxiosResponse<any>> {
        return tokenAxios.put(this.schoolDirectorUrl + "teacher" , teacher);
    }

    public deleteTeacher(teacherId: number): Promise<AxiosResponse<any>> {
        return tokenAxios.delete(this.schoolDirectorUrl + "teacher/" + teacherId);
    }

    public getOneTeacher(teacherId: number): Promise<AxiosResponse<TeacherUserModel>> {
        return tokenAxios.get(this.schoolDirectorUrl + "one-teacher/" + teacherId);
    }

    public getAllTeachers(): Promise<AxiosResponse<TeacherUserModel[]>> {
        return tokenAxios.get(this.schoolDirectorUrl + "all-teachers");
    }
}

const schoolDirectorService = new SchoolDirectorService();
export default schoolDirectorService;