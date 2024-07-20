import apiService from "../api/api-service";
import axiosInstance from "../api/axios";

class userAutenticationService {
    urlBase = apiService.autentication;
    
    getUser({ name, email, password }: { name: string; email: string; password: string }) {
        return axiosInstance.get(`${this.urlBase}/register`, { name, email, password });
    }

    getUsers({ name, email, password }: { name: string; email: string; password: string }) {
        return axiosInstance.get(`${this.urlBase}/register`, { name, email, password });
    }
}

export default new userAutenticationService();