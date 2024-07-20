import apiService from "../api/api-service";
import axiosInstance from "../api/axios";

class userAutenticationService {
    urlBase = apiService.autentication;
    
    getUser({ userId }: { userId: number; }) {
        return axiosInstance.get(`${this.urlBase}/user/${userId}`);
    }

    getUsers({ page = 1, per_page = 6 }: { page?: number; per_page?: number; } = {}) {
        const query = `?page=${page}&per_page=${per_page}`;
        return axiosInstance.get(`${this.urlBase}/users${query}`);
    }

    deleteUser(userId: string) {
        return axiosInstance.delete(`${this.urlBase}/users/${userId}`);
    }
}

export default new userAutenticationService();