import axios from "axios";
import store from "../Redux/Store";

const tokenAxios = axios.create();

tokenAxios.interceptors.request.use(request => {
    if (store.getState().authState.token) {
        request.headers.Authorization = "Bearer " + store.getState().authState.token;
    }
    return request;
})

export default tokenAxios;