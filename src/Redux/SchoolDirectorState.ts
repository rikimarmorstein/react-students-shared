import SchoolUserModel from "../Models/SchoolUserModel";
import StudentUserModel from "../Models/StudentUserModel";
import TeacherUserModel from "../Models/TeacherUserModel";


//1. schools state-the data we need at global application level
export class SchoolDirectorState {
    public schools: SchoolUserModel[] = [];
    public teachers: TeacherUserModel[] = [];
    public students : StudentUserModel[] = [];
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
        case SchoolDirectorActionType.FetchSchools://here payload is all schools
            newState.schools = action.payload;
            break;
        case SchoolDirectorActionType.AddSchool://here payload is a single school to add
            newState.schools.push(action.payload);
            break;
        case SchoolDirectorActionType.UpdateSchool://here payload is a single school to update
            const indexToUpdate = newState.schools.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) newState.schools[indexToUpdate] = action.payload;
            break;
        case SchoolDirectorActionType.DeleteSchool://here payload is an id of school to delete
            const indexToDelete = newState.schools.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) newState.schools.splice(indexToDelete, 1);
            break;
        case SchoolDirectorActionType.Logout://here payload is an id of school to delete
            newState.schools=[];
            newState.students=[];
            newState.teachers=[];
            break;
    }
    return newState;
}
