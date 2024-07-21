import apiService from "../api/api-service";
import axiosInstance from "../api/axios";

class userAutenticationService {
    urlBase = apiService.autentication;
    
    getUser(userId: string) {
        return axiosInstance.get(`${this.urlBase}/users/${userId}`);
    }

    getUsers({ page = 1, per_page = 6 }: { page?: number; per_page?: number; } = {}) {
        const query = `?page=${page}&per_page=${per_page}`;
        return axiosInstance.get(`${this.urlBase}/users${query}`);
    }

    editUser(userId: string) {
        return axiosInstance.put(`${this.urlBase}/users/${userId}`  );
    }

    deleteUser(userId: string) {
        return axiosInstance.delete(`${this.urlBase}/users/${userId}`);
    }
}

export default new userAutenticationService();