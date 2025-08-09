import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { use } from "react";
import { getAuth } from "firebase/auth";
const axiosInstance = axios.create({
  baseURL: 'https://sports-server-one.vercel.app',
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = use(AuthContext);

  axiosInstance.interceptors.request.use(async (config) => {
    const currentUser = getAuth().currentUser;

    if (currentUser) {
      const token = await currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
    //   console.log(error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        signOutUser()
          .then(() => {
            console.log("sign out user for 401 status code");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;
