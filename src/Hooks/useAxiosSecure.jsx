import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const instance = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { signOutUser } = useAuth();
    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("access-token");
            console.log("token mama", token);
            config.headers.authorization = `bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const status = error.response?.status;
            if (status == 401 || status == 403) {
                signOutUser();
                console.log("problem ase");
            }
            return Promise.reject(error);
        }
    );
    return instance;
};

export default useAxiosSecure;
