import axios from "axios";

const instance = axios.create({
  baseURL: "https://ash-and-joh-server.onrender.com/api/v1",
});

const useAxios = () => {
  return instance;
};

export default useAxios;
