import axios, { AxiosResponse } from "axios";
import appConfig from "../Utils/Config";
import SchoolUserModel from "../Models/SchoolUserModel";
import tokenAxios from "../Utils/Interceptors";
import TeacherUserModel from "../Models/TeacherUserModel";
import StudentUserModel from "../Models/StudentUserModel";

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

    public addStudent(student: StudentUserModel): Promise<AxiosResponse<any>> {
        return tokenAxios.post(this.schoolDirectorUrl + "student" , student);
    }

    public updateStudent(student: StudentUserModel): Promise<AxiosResponse<any>> {
        return tokenAxios.put(this.schoolDirectorUrl + "student" , student);
    }

    public deleteStudent(studentId: number): Promise<AxiosResponse<any>> {
        return tokenAxios.delete(this.schoolDirectorUrl + "student/" + studentId);
    }

    public getAllStudents(): Promise<AxiosResponse<StudentUserModel[]>> {
        return tokenAxios.get(this.schoolDirectorUrl + "all-students");
    }
    
    public getOneStudent(studentId: number): Promise<AxiosResponse<StudentUserModel>> {
        return tokenAxios.get(this.schoolDirectorUrl + "one-student/" + studentId);
    }

    public getAllStudentsByClass(numClass: number): Promise<AxiosResponse<StudentUserModel[]>> {
        return tokenAxios.get(this.schoolDirectorUrl + "all-student-class?all-student-class="+ numClass);
    }
}

const schoolDirectorService = new SchoolDirectorService();
export default schoolDirectorService;