import axios, { AxiosResponse } from "axios";
import appConfig from "../Utils/Config";
import CredentialsModel from "../Models/CredentialsModel";
import SchoolUserModel from "../Models/SchoolUserModel";
import tokenAxios from "../Utils/Interceptors";
import store from "../Redux/Store";
import { fetchSchoolAction } from "../Redux/SchoolDirectorState";

class AdminService{
    private adminUrl = appConfig.adminUrl;

    public login(UserCredentials: CredentialsModel): Promise<AxiosResponse<string>> {
        return axios.post(this.adminUrl + "login", UserCredentials);
    }

    public admin(UserCredentials: CredentialsModel): Promise<AxiosResponse<string>> {
        return axios.post(this.adminUrl, UserCredentials);
    }

    
    public addSchool(school: SchoolUserModel): Promise<AxiosResponse<any>> {
        return tokenAxios.post(this.adminUrl + "school", school);
    }

    public updateSchool(school: SchoolUserModel): Promise<AxiosResponse<any>> {
        return tokenAxios.put(this.adminUrl +  "school", school);
    }

    public deleteSchool(schoolId: number): Promise<AxiosResponse<any>> {
        return tokenAxios.delete(this.adminUrl + "school/" + schoolId);
    }

    public getOneSchool(schoolId: number): Promise<AxiosResponse<SchoolUserModel>> {
        return tokenAxios.get(this.adminUrl + "one-school/" + schoolId);
    }

    public async getAllSchools(): Promise<SchoolUserModel[]> {
        if(store.getState().schoolState.schools.length>=1){
            return store.getState().schoolState.schools;
       }const response = await tokenAxios.get(this.adminUrl + "all-schools");
       const schools = response.data;

       store.dispatch(fetchSchoolAction(schools));
       return schools;
    } 
}

const adminService = new AdminService();
export default adminService;