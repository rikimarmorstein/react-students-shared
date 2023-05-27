import axios, { AxiosResponse } from "axios";
import appConfig from "../Utils/Config";
import CredentialsModel from "../Models/CredentialsModel";
import SchoolUserModel from "../Models/SchoolUserModel";
import tokenAxios from "../Utils/Interceptors";

class AdminService{
    private adminUrl = appConfig.adminUrl;

    public admin(UserCredentials: CredentialsModel): Promise<AxiosResponse<string>> {
        return axios.post(this.adminUrl, UserCredentials);
    }

    
    public addSchool(school: SchoolUserModel): Promise<AxiosResponse<any>> {
        return tokenAxios.post(this.adminUrl + "school", school);
    }

    // public updateCompany(company: CompanyModel): Promise<AxiosResponse<any>> {
    //     return tokenAxios.put(this.adminUrl + "company", company);
    // }

    // public deleteCompany(companyId: number): Promise<AxiosResponse<any>> {
    //     return tokenAxios.delete(this.adminUrl + "company/" + companyId);
    // }

    // public getOneCompany(companyId: number): Promise<AxiosResponse<CompanyModel>> {
    //     return tokenAxios.get(this.adminUrl + "company/" + companyId);
    // }

    // public getAllCompanies(): Promise<AxiosResponse<CompanyModel[]>> {
    //     return tokenAxios.get(this.adminUrl + "companies");
    // }
}

const adminService = new AdminService();
export default adminService;