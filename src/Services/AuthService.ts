import axios, { AxiosResponse } from "axios";
import appConfig from "../Utils/Config";
import CredentialsModel from "../Models/CredentialsModel";
import { AuthActionType } from "../Redux/AuthState";
import store from "../Redux/Store";
import ClientType from "../Models/ClientType";

class AuthService {

    private loginUrl = appConfig.authUrl;

    // public login(userCredentials: CredentialsModel): Promise<AxiosResponse<string>> {

    //     return axios.post(this.loginUrl, userCredentials);

    // }

    // Login to backend:
    public async login(credentials: CredentialsModel): Promise<void> {

        const response = await axios.post<string>(appConfig.authUrl, credentials);
        // Extract token: 
        const token = response.data;
        // Update redux:
        store.dispatch({ type: AuthActionType.Login, payload: token });
    }

    // Logout: 
    public logout(): void {
        // Update redux: 
        store.dispatch({ type: AuthActionType.Logout });
    }

}

const authService = new AuthService();

export default authService;
