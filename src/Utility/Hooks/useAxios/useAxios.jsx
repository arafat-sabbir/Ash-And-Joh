import axios from "axios";

const instance = axios.create({
  baseURL: "https://meta-mansion-server.vercel.app/api",
});

const useAxios = () => {
  return instance;
};

export default useAxios;
