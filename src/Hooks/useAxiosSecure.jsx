import axios from "axios";
import useAuth from "./useAuth";

const instance = axios.create({
    baseURL: "https://ash-and-joh-server.onrender.com/api/v1",
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { signOutUser } = useAuth();
    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("access-token");
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
