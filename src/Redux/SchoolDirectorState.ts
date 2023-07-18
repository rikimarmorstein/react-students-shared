import SchoolUserModel from "../Models/SchoolUserModel";
import StationModel from "../Models/StationModel";
import StudentUserModel from "../Models/StudentUserModel";
import TeacherUserModel from "../Models/TeacherUserModel";
import TransportationModel from "../Models/TransportationModel";


//1. schools state-the data we need at global application level
export class SchoolDirectorState {
    public schools: SchoolUserModel[] = [];
    public teachers: TeacherUserModel[] = [];
    public students : StudentUserModel[] = [];
    public transportation: TransportationModel[]=[];
    public station: StationModel[]=[];
}

//2. Action Types - list of actions - enum
export enum SchoolDirectorActionType {
    FetchStudents = "FetchStudents",//get
    AddStudent = "AddStudent",//post
    UpdateStudent = "UpdateStudent",//put
    DeleteStudent = "DeleteStudent",//delete

    FetchTeachers = "FetchTeachers",//get
    AddTeacher = "AddTeacher",//post
    UpdateTeacher = "UpdateTeacher",//put
    DeleteTeacher = "DeleteTeacher",//delete

    FetchSchools = "FetchSchools",//get
    AddSchool = "AddSchool",//post
    UpdateSchool = "UpdateSchool",//put
    DeleteSchool = "DeleteSchool",//delete

    FetchTransportations = "FetchTransportations",//get
    AddTransportation = "AddTransportation",//post
    UpdateTransportation = "UpdateTransportation",//put
    DeleteTransportation = "DeleteTransportation",//delete

    FetchStations = "FetchStations",//get
    AddStation = "AddStation",//post
    UpdateStation = "UpdateStation",//put
    DeleteStation = "DeleteStation",//delete

    Logout = "Logout"

}

//3. Action -  an interface describing a single command
export interface SchoolDirectorsAction {
    type: SchoolDirectorActionType;//action type
    payload: any; //action data
}

//4. action creators - functions to create action objects
export function fetchStudentsAction(students: StudentUserModel[]): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.FetchStudents, payload: students };
}
export function addStudentsAction(student: StudentUserModel): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.AddStudent, payload: student};
}
export function updateStudentsAction(student:StudentUserModel): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.UpdateStudent, payload: student};
}
export function deleteStudentsAction(id: number): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.DeleteStudent, payload: id};
}

export function fetchTeacherAction(teachers: TeacherUserModel[]): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.FetchTeachers, payload: teachers };
}
export function addTeacherAction(teacher: TeacherUserModel): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.AddTeacher, payload: teacher};
}
export function updateTeacherAction(teacher: TeacherUserModel): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.UpdateTeacher, payload: teacher};
}
export function deleteTeacherAction(id: number): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.DeleteTeacher, payload: id};
}

export function fetchSchoolAction(schools: SchoolUserModel[]): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.FetchSchools, payload: schools };
}
export function addSchoolAction(school: SchoolUserModel): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.AddSchool, payload: school};
}
export function updateSchoolAction(school: SchoolUserModel): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.UpdateSchool, payload: school};
}
export function deleteSchoolAction(id: number): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.DeleteSchool, payload: id};
}

export function fetchTransportationAction(transportation: TransportationModel[]): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.FetchTransportations, payload: transportation };
}
export function addTransportationAction(transportation: TransportationModel): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.AddTransportation, payload: transportation};
}
export function updateTransportationAction(transportation: TransportationModel): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.UpdateTransportation, payload: transportation};
}
export function deleteTransportationAction(id: number): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.DeleteTransportation, payload: id};
}

export function fetchStationAction(station: StationModel[]): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.FetchStations, payload: station };
}
export function addStationAction(station: StationModel): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.AddStation, payload: station};
}
export function updateStationAction(station: StationModel): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.UpdateStation, payload: station};
}
export function deleteStationAction(id: number): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.DeleteStation, payload: id};
}

export function logoutAction(): SchoolDirectorsAction {
    return { type: SchoolDirectorActionType.Logout, payload: {} };
}

//5. reducer - a single function performing any of the above actions
export function schoolReducer(currentState: SchoolDirectorState = new SchoolDirectorState(), action: SchoolDirectorsAction): SchoolDirectorState {
    const newState = { ...currentState };//duplicate current state

    switch (action.type) {
        case SchoolDirectorActionType.FetchStudents://here payload is all schools
            newState.students = action.payload;
            break;
        case SchoolDirectorActionType.AddStudent://here payload is a single school to add
            newState.students.push(action.payload);
            break;
        case SchoolDirectorActionType.UpdateStudent://here payload is a single school to update
            const indexToUpdateStudents = newState.students.findIndex(p => p.id === action.payload.id);
            if (indexToUpdateStudents >= 0) newState.students[indexToUpdateStudents] = action.payload;
            break;
        case SchoolDirectorActionType.DeleteStudent://here payload is an id of school to delete
            const indexToDeleteStudents = newState.students.findIndex(p => p.id === action.payload);
            if (indexToDeleteStudents >= 0) newState.students.splice(indexToDeleteStudents, 1);
            break;

        case SchoolDirectorActionType.FetchTeachers://here payload is all schools
            newState.teachers = action.payload;
            break;
        case SchoolDirectorActionType.AddTeacher://here payload is a single school to add
            newState.teachers.push(action.payload);
            break;
        case SchoolDirectorActionType.UpdateTeacher://here payload is a single school to update
            const indexToUpdateTeacher = newState.teachers.findIndex(p => p.id === action.payload.id);
            if (indexToUpdateTeacher >= 0) newState.teachers[indexToUpdateTeacher] = action.payload;
            break;
        case SchoolDirectorActionType.DeleteTeacher://here payload is an id of school to delete
            const indexToDeleteTeacher = newState.teachers.findIndex(p => p.id === action.payload);
            if (indexToDeleteTeacher >= 0) newState.teachers.splice(indexToDeleteTeacher, 1);
            break;

        case SchoolDirectorActionType.FetchTransportations://here payload is all schools
            newState.transportation = action.payload;
            break;
        case SchoolDirectorActionType.AddTransportation://here payload is a single school to add
            newState.transportation.push(action.payload);
            break;
        case SchoolDirectorActionType.UpdateTransportation://here payload is a single school to update
            const indexToUpdate = newState.transportation.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) newState.transportation[indexToUpdate] = action.payload;
            break;
        case SchoolDirectorActionType.DeleteTransportation://here payload is an id of school to delete
            const indexToDelete = newState.transportation.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) newState.transportation.splice(indexToDelete, 1);
            break;

        case SchoolDirectorActionType.FetchStations://here payload is all schools
            newState.station = action.payload;
            break;
        case SchoolDirectorActionType.AddStation://here payload is a single school to add
            newState.station.push(action.payload);
            break;
        case SchoolDirectorActionType.UpdateStation://here payload is a single school to update
            const indexToUpdateStation = newState.station.findIndex(p => p.id === action.payload.id);
            if (indexToUpdateStation >= 0) newState.station[indexToUpdateStation] = action.payload;
            break;
        case SchoolDirectorActionType.DeleteStation://here payload is an id of school to delete
            const indexToDeleteStation = newState.station.findIndex(p => p.id === action.payload);
            if (indexToDeleteStation >= 0) newState.station.splice(indexToDeleteStation, 1);
            break;
        case SchoolDirectorActionType.Logout://here payload is an id of school to delete
            newState.schools=[];
            newState.students=[];
            newState.teachers=[];
            newState.transportation=[];
            newState.station=[];
            break;
    }
    return newState;
}
