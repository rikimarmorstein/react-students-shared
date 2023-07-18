import { AxiosResponse } from "axios";
import appConfig from "../Utils/Config";
import SchoolUserModel from "../Models/SchoolUserModel";
import tokenAxios from "../Utils/Interceptors";
import TeacherUserModel from "../Models/TeacherUserModel";
import StudentUserModel from "../Models/StudentUserModel";
import { fetchStudentsAction, fetchTransportationAction } from "../Redux/SchoolDirectorState";
import store from "../Redux/Store";
import Cause from "../Models/Cause";
import TransportationModel from "../Models/TransportationModel";
import StationModel from "../Models/StationModel";

class SchoolDirectorService {
    private schoolDirectorUrl = appConfig.schoolDirectorUrl;

    public updateSchool(school: SchoolUserModel): Promise<AxiosResponse<any>> {
        return tokenAxios.put(this.schoolDirectorUrl + "school", school);
    }

    public getSchoolDetails(): Promise<AxiosResponse<SchoolUserModel>> {
        return tokenAxios.get(this.schoolDirectorUrl + "school");
    }

    public addTeacher(teacher: TeacherUserModel): Promise<AxiosResponse<any>> {
        return tokenAxios.post(this.schoolDirectorUrl + "teacher", teacher);
    }

    public updateTeacher(teacher: TeacherUserModel): Promise<AxiosResponse<any>> {
        return tokenAxios.put(this.schoolDirectorUrl + "teacher", teacher);
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
        return tokenAxios.post(this.schoolDirectorUrl + "student", student);
    }

    public updateStudent(student: StudentUserModel): Promise<AxiosResponse<any>> {
        return tokenAxios.put(this.schoolDirectorUrl + "student", student);
    }

    public deleteStudent(studentId: number): Promise<AxiosResponse<any>> {
        return tokenAxios.delete(this.schoolDirectorUrl + "student/" + studentId);
    }

    // public getAllStudents(): Promise<AxiosResponse<StudentUserModel[]>> {
    //     return tokenAxios.get(this.schoolDirectorUrl + "all-students");
    // }
    public async getAllStudents(): Promise<StudentUserModel[]> {
        if (store.getState().schoolState.students.length <= 1) {
            const response = await tokenAxios.get<StudentUserModel[]>(this.schoolDirectorUrl + "all-students");
            const students = response.data;

            store.dispatch(fetchStudentsAction(students));
            return students;
        }
        return store.getState().schoolState.students;
    }

    public getOneStudent(studentId: number): Promise<AxiosResponse<StudentUserModel>> {
        return tokenAxios.get(this.schoolDirectorUrl + "one-student/" + studentId);
    }

    public getAllStudentsByClass(numClass: number): Promise<AxiosResponse<StudentUserModel[]>> {
        return tokenAxios.get(this.schoolDirectorUrl + "all-student-class?all-student-class=" + numClass);
    }

    public setStudentToNotTravel(studentId: number): Promise<AxiosResponse<any>> {
        return tokenAxios.put(this.schoolDirectorUrl + "set-student-to-not-travel/" + studentId);
    }

    public setStudentToTravel(studentId: number): Promise<AxiosResponse<any>> {
        return tokenAxios.put(this.schoolDirectorUrl + "set-student-to-travel/" + studentId);
    }

    public whatCause(studentId: number, cause: string): Promise<AxiosResponse<any>> {
        return tokenAxios.put(this.schoolDirectorUrl + "set-student-cause?set-student-cause=" + cause + "/" + studentId);
    }

    public whichHour(studentId: number, hour: string): Promise<AxiosResponse<any>> {
        return tokenAxios.put(this.schoolDirectorUrl + "set-student-hour?set-student-hour=" + hour + "/" + studentId);
    }

    public getAllStudentsToTravelByBus(numBus: number): Promise<AxiosResponse<StudentUserModel[]>> {
        return tokenAxios.get(this.schoolDirectorUrl + "all-students-to-travel-by-bus?all-students-to-travel-by-bus=" + numBus);
    }
    public addTransportation(transportation: TransportationModel): Promise<AxiosResponse<any>> {
        return tokenAxios.post(this.schoolDirectorUrl + "add-transportation", transportation);
    }

    public addStation(station: StationModel, numBus: number): Promise<AxiosResponse<any>> {
        return tokenAxios.post(this.schoolDirectorUrl + "add-station?add-station=" + numBus, station);
    }

    public updateTransportation(transportation: TransportationModel): Promise<AxiosResponse<any>> {
        return tokenAxios.post(this.schoolDirectorUrl + "update-transportation", transportation);
    }

    public async getAllTransportations(): Promise<TransportationModel[]> {
        if (store.getState().schoolState.transportation.length <= 1) {
            const response = await tokenAxios.get<TransportationModel[]>(this.schoolDirectorUrl + "all-transportation");
            const transportation = response.data;

            store.dispatch(fetchTransportationAction(transportation));
            return transportation;
        }
        return store.getState().schoolState.transportation;
    }

    public deleteStation(station: StationModel): Promise<AxiosResponse<any>> {
        return tokenAxios.delete(this.schoolDirectorUrl + station);
    }
}

const schoolDirectorService = new SchoolDirectorService();
export default schoolDirectorService;